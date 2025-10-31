//createWorkspace.js
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createWorkspace(workspaceName) {
  const devflowRoot = path.resolve(__dirname, "../..");
  const workspaceRoot = path.join(devflowRoot, "workspaces");
  const workspacePath = path.join(workspaceRoot, workspaceName);

  // ✅ 1. Handle Ctrl+C before anything else
  const handleExit = () => {
    if (fs.existsSync(workspacePath)) {
      console.log("\n⚠️  Setup cancelled. Cleaning up...");
      fs.rmSync(workspacePath, { recursive: true, force: true });
    }
    process.exit(0);
  };
  process.once("SIGINT", handleExit);

  try {
    // 2️⃣ Ensure /workspaces exists
    if (!fs.existsSync(workspaceRoot)) {
      fs.mkdirSync(workspaceRoot, { recursive: true });
    }

    // 3️⃣ Prevent overwriting existing workspace
    if (fs.existsSync(workspacePath)) {
      console.log(`❌ Workspace "${workspaceName}" already exists.`);
      process.removeListener("SIGINT", handleExit);
      return;
    }

    // 4️⃣ Create the new folder
    fs.mkdirSync(workspacePath, { recursive: true });
    console.log(`\n🚀 Creating new workspace: ${workspaceName}\n`);

    // 5️⃣ Prompt for base details
    const baseAnswers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Workspace name:",
        default: workspaceName,
      },
      {
        type: "list",
        name: "editor",
        message: "Choose your editor:",
        choices: ["vscode", "cursor", "vim", "neovim", "none"],
        default: "vscode",
      },
      {
        type: "list",
        name: "browser",
        message: "Choose your browser:",
        choices: ["chrome", "firefox", "brave"],
        default: "chrome",
      },
    ]);

    // 6️⃣ Collect entries
    const entries = [];
    let addEntry = true;

    while (addEntry) {
      const entryAnswers = await inquirer.prompt([
        {
          type: "input",
          name: "path",
          message: "Entry complete path (e.g., /home/user/Desktop/frontend):"
        },
        {
          type: "confirm",
          name: "openInEditor",
          message: "Open in editor?",
          default: true,
        },
        {
          type: "input",
          name: "commands",
          message: "Commands (comma-separated, in order to execution):",
          default: "npm run dev",
        }
      ]);

      entries.push({
        path: entryAnswers.path,
        openInEditor: entryAnswers.openInEditor,
        commands: entryAnswers.commands
          ? entryAnswers.commands.split(",").map((cmd) => cmd.trim())
          : []
      });

      const { more } = await inquirer.prompt([
        {
          type: "confirm",
          name: "more",
          message: "Add another entry?",
          default: false,
        },
      ]);

      addEntry = more;
    }

    // 7️⃣ Build final config
    const finalConfig = {
      name: baseAnswers.name,
      editor: baseAnswers.editor,
      browser: baseAnswers.browser,
      entries,
    };

    const configPath = path.join(workspacePath, "config.json");
    fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2));

    console.log(`\n✅ Workspace created successfully at ${configPath}\n`);
    process.removeListener("SIGINT", handleExit);
  } catch (error) {
    console.error("❌ Error creating workspace:", error.message);
    if (fs.existsSync(workspacePath)) {
      fs.rmSync(workspacePath, { recursive: true, force: true });
    }
    process.removeListener("SIGINT", handleExit);
  }
}