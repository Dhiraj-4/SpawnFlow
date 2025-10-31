// startWorkspace.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn, execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function startWorkspace(workspaceName) {
  const workspaceDir = path.join(__dirname, `../../workspaces/${workspaceName}`);
  const configPath = path.join(workspaceDir, "config.json");

  if (!fs.existsSync(configPath)) {
    console.log(`❌ No config.json found for "${workspaceName}".`);
    return;
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    console.log(`⚠️ Invalid JSON in config.json for "${workspaceName}".`);
    return;
  }

  console.log(`\n🚀 Starting workspace: ${config.name}\n`);

  for (const entry of config.entries) {
    const entryPath = entry.path;

    if (!fs.existsSync(entryPath)) {
      console.log(`⚠️ Skipping missing path: ${entryPath}`);
      continue;
    }

    console.log(`📁 Setting up: ${entryPath}`);

    // Open editor
    if (entry.openInEditor && config.editor !== "none") {
      openInEditor(entryPath, config.editor);
    }

    // Launch commands
    if (entry.commands && entry.commands.length > 0) {
      openSystemTerminal(entryPath, entry.commands);
    }

    console.log(`✅ Entry launched: ${entry.path}\n`);
  }

  console.log("🎉 All entries launched successfully!\n");
}

// 🧠 Open the path in the configured editor
function openInEditor(entryPath, editor) {
  const editorMap = {
    vscode: "code",
    cursor: "cursor",
    vim: "vim",
    neovim: "nvim",
  };

  const editorCmd = editorMap[editor];
  if (!editorCmd) return;

  console.log(`📝 Opening ${entryPath} in ${editor}...`);
  spawn(editorCmd, [entryPath], {
    stdio: "ignore",
    detached: true,
  }).unref();
}

// 🔍 Find which terminal is available
function getAvailableTerminal() {
  const terminals = [
    "konsole",
    "gnome-terminal",
    "tilix",
    "alacritty",
    "kitty",
    "xterm",
  ];

  for (const term of terminals) {
    try {
      execSync(`command -v ${term}`, { stdio: "ignore" });
      return term;
    } catch {}
  }

  return null;
}

// 💡 Open a fully working native terminal for the entry
function openSystemTerminal(entryPath, commands) {
  const terminal = getAvailableTerminal();
  const shell = process.env.SHELL || "bash";

  if (!terminal) {
    console.log(`⚠️ No supported terminal emulator found.`);
    return;
  }

  const fullCommand = commands.join(" && ");
  const safeCmd = `cd "${entryPath}" && echo "📂 Working directory: ${entryPath}" && ${fullCommand}; exec ${shell}`;

  let args;

  switch (terminal) {
    case "konsole":
      args = ["-e", `${shell}`, "-ic", safeCmd];
      break;

    case "gnome-terminal":
      args = ["--", shell, "-ic", safeCmd];
      break;

    case "tilix":
      args = ["-e", `${shell}`, "-ic", safeCmd];
      break;

    case "alacritty":
      args = ["-e", shell, "-ic", safeCmd];
      break;

    case "kitty":
      args = [shell, "-ic", safeCmd];
      break;

    case "xterm":
      args = ["-e", `${shell}`, "-ic", safeCmd];
      break;

    default:
      args = ["-e", `${shell}`, "-ic", safeCmd];
      break;
  }

  console.log(`▶️ Opening ${terminal} → ${entryPath}`);
  console.log(`💬 Command: ${fullCommand}\n`);

  const proc = spawn(terminal, args, {
    cwd: entryPath,
    stdio: "ignore",
    detached: true,
  });

  proc.on("error", (err) => {
    console.error(`❌ Failed to launch ${terminal}:`, err.message);
  });

  proc.unref();
}
