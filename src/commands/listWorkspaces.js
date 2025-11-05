//listWorkspaces.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function listWorkspaces() {
  const devflowRoot = path.resolve(__dirname, "../..");
  const workspaceRoot = path.join(devflowRoot, "workspaces");

  if (!fs.existsSync(workspaceRoot)) {
    console.log("⚠️  No workspaces directory found.");
    return;
  }

  const workspaces = fs.readdirSync(workspaceRoot).filter((f) => {
    const fullPath = path.join(workspaceRoot, f);
    return fs.statSync(fullPath).isDirectory();
  });

  if (workspaces.length === 0) {
    console.log("⚠️  No workspaces found.");
    return;
  }

  console.log("📂 Available Workspaces:\n");

  for (const name of workspaces) {
    const configPath = path.join(workspaceRoot, name, "config.json");
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        console.log(`- ${name} (editor: ${config.editor}, apps: ${config.apps.map(app => app.name).join(", ") || "none"})`);
      } catch {
        console.log(`- ${name} (⚠️ invalid config.json)`);
      }
    } else {
      console.log(`- ${name} (no config.json)`);
    }
  }

  console.log();
}
