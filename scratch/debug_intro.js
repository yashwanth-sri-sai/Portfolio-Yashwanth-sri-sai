const { spawn } = require("child_process");
const http = require("http");

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log("Starting Chrome headless...");
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-web-security",
    "--user-data-dir=C:\\Temp\\chrome-debug-profile",
    "about:blank"
  ]);
  chrome.stderr.on("data", d => process.stdout.write("[chrome stderr] " + d));
  chrome.on("error", err => console.error("Chrome launch error:", err));
  
  await sleep(3000);

  let targets;
  for (let i = 0; i < 5; i++) {
    try {
      targets = await new Promise((resolve, reject) => {
        const req = http.get("http://127.0.0.1:9222/json", res => {
          let d = "";
          res.on("data", c => d += c);
          res.on("end", () => resolve(JSON.parse(d)));
        });
        req.on("error", reject);
        req.setTimeout(2000, () => { req.destroy(); reject(new Error("timeout")); });
      });
      break;
    } catch (e) {
      console.log(`CDP not ready yet (attempt ${i+1}), retrying...`);
      await sleep(1000);
    }
  }

  if (!targets) { console.error("Could not connect to Chrome CDP"); chrome.kill(); return; }
  
  const page = targets.find(t => t.type === "page");
  if (!page) { console.error("No page target found. Targets:", JSON.stringify(targets)); chrome.kill(); return; }
  
  console.log("Connecting to:", page.webSocketDebuggerUrl);
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let msgId = 1;
  const pendingCalls = new Map();
  
  const send = (method, params = {}) => {
    const id = msgId++;
    return new Promise((resolve) => {
      pendingCalls.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pendingCalls.has(msg.id)) {
      pendingCalls.get(msg.id)(msg.result);
      pendingCalls.delete(msg.id);
    }
  };
  
  ws.onerror = e => console.error("WS error:", e.type);

  await new Promise(r => { ws.onopen = r; });
  console.log("WebSocket connected.");
  
  await send("Runtime.enable");
  await send("Page.enable");

  // Navigate to portfolio
  console.log("Navigating to http://localhost:3000 ...");
  await send("Page.navigate", { url: "http://localhost:3000" });
  
  // Wait for page to fully load
  await sleep(2000);

  // Clear localStorage to force intro
  const clearResult = await send("Runtime.evaluate", {
    expression: `
      localStorage.removeItem('introSeen');
      'cleared: ' + localStorage.getItem('introSeen');
    `
  });
  console.log("localStorage clear result:", JSON.stringify(clearResult));

  // Reload to trigger fresh intro
  await send("Page.navigate", { url: "http://localhost:3000" });
  await sleep(1000);

  // Inject a log collector into the page
  const injectResult = await send("Runtime.evaluate", {
    expression: `
      window.__stageLog = [];
      const origLog = console.log.bind(console);
      console.log = (...args) => {
        window.__stageLog.push(args.join(' '));
        origLog(...args);
      };
      'injected';
    `
  });
  console.log("Log injector:", JSON.stringify(injectResult));

  // Wait for all 5 stages (5000ms + buffer)
  console.log("Waiting 7s for all 5 intro stages...");
  await sleep(7000);

  // Read the collected logs
  const logResult = await send("Runtime.evaluate", {
    expression: "JSON.stringify(window.__stageLog || [])"
  });

  let logs = [];
  try {
    const raw = logResult?.result?.value || "[]";
    logs = JSON.parse(raw);
  } catch (e) {
    console.error("Could not parse logs:", e);
  }

  console.log("\n=== ALL CAPTURED CONSOLE LOGS ===");
  logs.forEach(l => console.log(" ", l));

  const introLogs = logs.filter(l => l.includes("IntroScreen") || l.includes("useIntroManager") || l.includes("Stage"));
  console.log("\n=== INTRO-RELATED LOGS ===");
  introLogs.forEach(l => console.log(" ", l));

  const stagesFound = [2, 3, 4, 5].filter(s => logs.some(l => l.includes(`Stage ${s}`)));
  const completed = logs.some(l => l.includes("onComplete()") || l.includes("Sequence complete"));
  
  console.log(`\nStages fired: ${stagesFound.length ? stagesFound.join(", ") : "NONE"}`);
  console.log(`Completion: ${completed ? "YES ✓" : "NO ✗"}`);
  
  if (stagesFound.length === 4 && completed) {
    console.log("\n✅ PASS: All 5 stages fired and sequence completed!");
  } else {
    console.log("\n❌ FAIL: Stages missing or sequence did not complete.");
    
    // Try to get current stage state
    const stageState = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const info = {
            introSeen: localStorage.getItem('introSeen'),
            bodyHTML: document.body.innerHTML.substring(0, 200),
            hasIntroScreen: !!document.querySelector('[class*="z-[9999]"]'),
          };
          return JSON.stringify(info);
        })()
      `
    });
    console.log("\nPage state:", stageState?.result?.value);
  }

  ws.close();
  chrome.kill();
}

main().catch(e => console.error("Fatal:", e));
