import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// 1. Create an MCP client
const client = new Client({
    name: "playwright-mcp-demo",
    version: "1.0.0",
});

// 2. Create a transport that spawns the Playwright MCP server
const transport = new StdioClientTransport({
    command: "npx",
    args: ["@playwright/mcp@latest"],
});

// 3. Connect the client to the server
console.log("🔌 Connecting to Playwright MCP server...");
await client.connect(transport);
console.log("✅ Connected!");

// 4. List available tools
const { tools } = await client.listTools();
console.log(`📦 ${tools.length} tools available:`, tools.map(t => t.name).join(", "));

// 5. Use the browser_navigate tool to open Google
console.log("\n🌐 Navigating to google.com...");
const result = await client.callTool({
    name: "browser_navigate",
    arguments: { url: "https://www.google.com" },
});
console.log("✅ Navigation result:", JSON.stringify(result.content, null, 2));

// Keep the browser open
console.log("\n🟢 Google.com is open via Playwright MCP! Press Ctrl+C to close.");
await new Promise(() => { });
