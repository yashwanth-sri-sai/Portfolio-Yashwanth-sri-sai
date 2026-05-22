import { NextResponse } from "next/server";
import { generateSystemPrompt } from "@/data/resumeContext";

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

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const systemPrompt = generateSystemPrompt();
    let errorReason = "";

    // 1. Try Google Gemini API first
    if (geminiKey) {
      try {
        const contents = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
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

        if (!response.ok) {
          const errText = await response.text();
          console.error("Gemini API error status:", response.status, errText);
          throw new Error(`Gemini API error ${response.status}`);
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseText) {
          return NextResponse.json({ response: responseText });
        }
      } catch (geminiError: any) {
        console.error("Failed call to Gemini, falling back to OpenAI/Offline:", geminiError);
        errorReason = geminiError.message || "Gemini API failed";
      }
    }

    // 2. Try OpenAI API second
    if (openaiKey) {
      try {
        const openAIMessages = [
          { role: "system", content: systemPrompt },
          ...messages.map((m: any) => ({
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
            model: "gpt-4o-mini",
            messages: openAIMessages,
            temperature: 0.7,
            max_tokens: 500
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          let parsedError = "";
          try {
            const errJson = JSON.parse(errText);
            parsedError = errJson.error?.message || errText;
          } catch {
            parsedError = errText;
          }
          console.error("OpenAI API error status:", response.status, errText);
          throw new Error(`OpenAI failed (${response.status}): ${parsedError}`);
        }

        const data = await response.json();
        const responseText = data.choices?.[0]?.message?.content;

        if (responseText) {
          return NextResponse.json({ response: responseText });
        }
      } catch (openaiError: any) {
        console.error("Failed call to OpenAI:", openaiError);
        errorReason = openaiError.message || "OpenAI API failed";
      }
    }

    // 3. Fallback: No API keys configured or both failed, trigger client fallback
    return NextResponse.json({
      response: null,
      fallback: true,
      reason: errorReason || "No active API keys found.",
      message: "No active API keys found or queries failed. Re-routing query to local portfolio core module."
    });
  } catch (globalError: any) {
    console.error("Global Chat API Route error:", globalError);
    return NextResponse.json(
      { error: globalError?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
