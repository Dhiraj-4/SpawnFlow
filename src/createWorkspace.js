import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Convert import.meta.url → __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createWorkspace(workspaceName) {

  const devflowRoot = path.resolve(__dirname, "..");
  const workspaceRoot = path.join(devflowRoot, "workspaces");
  const targetPath = path.join(workspaceRoot, workspaceName);


  if(!fs.existsSync(workspaceRoot)) {
    fs.mkdirSync(workspaceRoot, { recursive: true });
  }

  if(fs.existsSync(targetPath)) {
    console.log(`Workspace "${workspaceName}" already exists.`);
    return;
  }

  fs.mkdirSync(targetPath, {recursive: true});

  const configPath = path.join(targetPath, "config.json");

  const config = {
    name: workspaceName,
    createdAt: new Date().toISOString()
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ Workspace "${workspaceName}" created successfully!`);
}