//removeWorkspace.js
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function removeWorkspace(name) {
  const workspacesDir = path.join(__dirname, "../../workspaces");
  const workspacePath = path.join(workspacesDir, name);

  if (!fs.existsSync(workspacePath)) {
    console.log(`❌ Workspace "${name}" does not exist.`);
    return;
  }

  fs.rmSync(workspacePath, { recursive: true, force: true });
  console.log(`🗑️  Workspace "${name}" removed successfully.`);
}
