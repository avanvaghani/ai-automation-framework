import { createConnection } from "@playwright/mcp";

// Create a Playwright MCP connection with headed browser
const connection = await createConnection({
  browser: {
    launchOptions: { headless: false }
  }
});

console.log("Playwright MCP server created successfully!");
console.log("Connection type:", typeof connection);
console.log("Connection keys:", Object.keys(connection));