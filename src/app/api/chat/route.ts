import { NextResponse } from "next/server";
import { generateSystemPrompt } from "@/data/resumeContext";
import fs from "fs";
import path from "path";

// Helper to manually parse .env.local file if Next.js has not hot-reloaded process.env
const getEnvKeys = () => {
  let geminiKey = process.env.GEMINI_API_KEY;
  let openaiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey || !openaiKey) {
    try {
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf-8");
        const lines = envContent.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#")) {
            const parts = trimmed.split("=");
            if (parts.length >= 2) {
              const key = parts[0].trim();
              const value = parts.slice(1).join("=").trim();
              if (key === "GEMINI_API_KEY" && !geminiKey) {
                geminiKey = value;
              }
              if (key === "OPENAI_API_KEY" && !openaiKey) {
                openaiKey = value;
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn("[API Chat] Manual .env.local parsing warning:", e);
    }
  }

  return { geminiKey, openaiKey };
};

export async function GET() {
  const { geminiKey, openaiKey } = getEnvKeys();
  
  const providers: string[] = [];
  if (geminiKey) providers.push("Gemini");
  if (openaiKey) providers.push("OpenAI");

  console.log(`[API Chat Status] GET check. Active providers: ${providers.join(", ") || "None"}`);

  return NextResponse.json({
    online: providers.length > 0,
    providers,
    hasKeys: providers.length > 0
  });
}

interface AttemptedError {
  provider: "Gemini" | "OpenAI";
  status?: number;
  errorType: "KEY_INVALID" | "QUOTA_EXCEEDED" | "RATE_LIMITED" | "WRONG_MODEL" | "NETWORK_ERROR" | "TIMEOUT" | "SERVER_ERROR";
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages payload." },
        { status: 400 }
      );
    }

    const { geminiKey, openaiKey } = getEnvKeys();
    const systemPrompt = generateSystemPrompt();
    
    const errorsList: AttemptedError[] = [];

    // 1. Try Google Gemini API first
    if (geminiKey) {
      const startTime = Date.now();
      const model = "gemini-2.5-flash";
      console.log(`[API Chat] Attempting Gemini | Model: ${model} | Key Exists: true`);
      try {
        const contents = messages.map((m: Record<string, string>) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemPrompt }]
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800
              }
            })
          }
        );

        const duration = Date.now() - startTime;

        if (response.ok) {
          const data = await response.json();
          const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (responseText) {
            console.log(`[API Chat] Gemini SUCCESS in ${duration}ms. Status: ${response.status}`);
            return NextResponse.json({ response: responseText });
          } else {
            console.warn(`[API Chat] Gemini returned empty response candidates. Data:`, JSON.stringify(data));
            errorsList.push({
              provider: "Gemini",
              status: response.status,
              errorType: "SERVER_ERROR",
              message: "Empty response text candidates received from model."
            });
          }
        } else {
          const errText = await response.text();
          console.error(`[API Chat] Gemini FAILED in ${duration}ms. Status: ${response.status}. Error: ${errText}`);
          
          let errorType: AttemptedError["errorType"] = "SERVER_ERROR";
          if (response.status === 400 || response.status === 403) {
            errorType = "KEY_INVALID";
          } else if (response.status === 429) {
            errorType = errText.toLowerCase().includes("quota") ? "QUOTA_EXCEEDED" : "RATE_LIMITED";
          }

          errorsList.push({
            provider: "Gemini",
            status: response.status,
            errorType,
            message: errText
          });
        }
      } catch (geminiError: unknown) {
        const duration = Date.now() - startTime;
        console.error(`[API Chat] Gemini Connection Exception after ${duration}ms:`, geminiError);
        errorsList.push({
          provider: "Gemini",
          errorType: "NETWORK_ERROR",
          message: (geminiError as Error).message || "Gemini connection error"
        });
      }
    }

    // 2. Try OpenAI API second
    if (openaiKey) {
      const startTime = Date.now();
      const model = "gpt-4o-mini";
      console.log(`[API Chat] Attempting OpenAI | Model: ${model} | Key Exists: true`);
      try {
        const openAIMessages = [
          { role: "system", content: systemPrompt },
          ...messages.map((m: Record<string, string>) => ({
            role: m.role,
            content: m.content
          }))
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model,
            messages: openAIMessages,
            temperature: 0.7,
            max_tokens: 500
          })
        });

        const duration = Date.now() - startTime;

        if (response.ok) {
          const data = await response.json();
          const responseText = data.choices?.[0]?.message?.content;

          if (responseText) {
            console.log(`[API Chat] OpenAI SUCCESS in ${duration}ms. Status: ${response.status}`);
            return NextResponse.json({ response: responseText });
          } else {
            console.warn(`[API Chat] OpenAI returned empty choices response.`);
            errorsList.push({
              provider: "OpenAI",
              status: response.status,
              errorType: "SERVER_ERROR",
              message: "Empty choices list returned by OpenAI completions."
            });
          }
        } else {
          const errText = await response.text();
          console.error(`[API Chat] OpenAI FAILED in ${duration}ms. Status: ${response.status}. Error: ${errText}`);
          
          let errorType: AttemptedError["errorType"] = "SERVER_ERROR";
          let parsedError = errText;
          try {
            const errJson = JSON.parse(errText);
            parsedError = errJson.error?.message || errText;
            if (errJson.error?.code === "insufficient_quota") {
              errorType = "QUOTA_EXCEEDED";
            } else if (response.status === 401) {
              errorType = "KEY_INVALID";
            } else if (response.status === 429) {
              errorType = "RATE_LIMITED";
            } else if (response.status === 404) {
              errorType = "WRONG_MODEL";
            }
          } catch {
            // non-json error page
            if (response.status === 401) errorType = "KEY_INVALID";
            else if (response.status === 429) errorType = "RATE_LIMITED";
          }

          errorsList.push({
            provider: "OpenAI",
            status: response.status,
            errorType,
            message: parsedError
          });
        }
      } catch (openaiError: unknown) {
        const duration = Date.now() - startTime;
        console.error(`[API Chat] OpenAI Connection Exception after ${duration}ms:`, openaiError);
        errorsList.push({
          provider: "OpenAI",
          errorType: "NETWORK_ERROR",
          message: (openaiError as Error).message || "OpenAI connection error"
        });
      }
    }

    // 3. Fallback: No API keys configured or both failed, trigger client fallback with specific errors info
    if (errorsList.length === 0) {
      console.warn("[API Chat] Chat POST called but no API keys were loaded in process.env or .env.local.");
      return NextResponse.json({
        response: null,
        fallback: true,
        errorType: "MISSING_KEYS",
        reason: "No AI providers are configured on this server. Set GEMINI_API_KEY or OPENAI_API_KEY variables.",
        message: "No active API keys found."
      });
    }

    // Return the primary error of the provider attempted
    const primaryError = errorsList[errorsList.length - 1]; // return latest attempted failure
    console.log(`[API Chat] Fallback triggered. Primary error type: ${primaryError.errorType}. Reason: ${primaryError.message}`);
    return NextResponse.json({
      response: null,
      fallback: true,
      errorType: primaryError.errorType,
      reason: primaryError.message,
      errors: errorsList
    });
  } catch (globalError: unknown) {
    console.error("Global Chat API Route error:", globalError);
    return NextResponse.json(
      { error: (globalError as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
