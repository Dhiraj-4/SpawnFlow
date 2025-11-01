// startWorkspace.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn, execSync } from "child_process";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isWindows = process.platform === "win32";

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

    if (entry.openInEditor && config.editor !== "none") {
      openInEditor(entryPath, config.editor);
    }

    if (entry.commands && entry.commands.length > 0) {
      openSystemTerminal(entryPath, entry.commands);
    }

    console.log(`✅ Entry launched: ${entry.path}\n`);
  }

  console.log("🎉 All entries launched successfully!\n");
}

// 🧠 Open folder in chosen editor
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
  spawn(editorCmd, [entryPath], { stdio: "ignore", detached: true }).unref();
}

// 🔍 Detect available terminal
function getAvailableTerminal() {
  if (isWindows) {
    try {
      execSync("where wt.exe", { stdio: "ignore" });
      return "wt";
    } catch {}
    try {
      execSync("where powershell.exe", { stdio: "ignore" });
      return "powershell";
    } catch {}
    return "cmd";
  }

  const terminals = ["konsole", "gnome-terminal", "tilix", "alacritty", "kitty", "xterm"];
  for (const term of terminals) {
    try {
      execSync(`command -v ${term}`, { stdio: "ignore" });
      return term;
    } catch {}
  }
  return null;
}

// 💡 Open a terminal window per entry
function openSystemTerminal(entryPath, commands) {
  const terminal = getAvailableTerminal();
  const platform = os.platform();

  if (platform === "win32") {
    const isPowerShell = terminal === "powershell";
    const cmdChain = commands.join(isPowerShell ? "; " : " && ");

    console.log(`▶️ Opening ${terminal} → ${entryPath}`);
    console.log(`💬 Command: ${cmdChain}\n`);

    try {
      if (terminal === "wt") {
        // Windows Terminal
        const psCmd = `Set-Location '${entryPath}'; Write-Host '📂 Working directory: ${entryPath}'; ${cmdChain}`;
        spawn("wt.exe", ["new-tab", "powershell", "-NoExit", "-Command", psCmd], {
          detached: true,
          stdio: "ignore",
        }).unref();
      } else if (isPowerShell) {
        // PowerShell
        const psCmd = `Set-Location '${entryPath}'; Write-Host '📂 Working directory: ${entryPath}'; ${cmdChain}`;
        spawn("powershell.exe", ["-NoExit", "-Command", psCmd], {
          detached: true,
          stdio: "ignore",
        }).unref();
      } else {
        // Fallback: CMD
        const cmd = `cd /d "${entryPath}" && echo 📂 Working directory: ${entryPath} && ${cmdChain}`;
        spawn("cmd.exe", ["/c", "start", "cmd.exe", "/k", cmd], {
          detached: true,
          stdio: "ignore",
        }).unref();
      }
    } catch (err) {
      console.error(`❌ Failed to launch ${terminal}:`, err.message);
    }

    return;
  }

  // 🐧 Linux / 🍎 macOS
  const shell = process.env.SHELL || "bash";
  const fullCommand = commands.join(" && ");
  const safeCmd = `cd "${entryPath}" && echo "📂 Working directory: ${entryPath}" && ${fullCommand}; exec ${shell}`;

  const args =
    {
      konsole: ["-e", shell, "-ic", safeCmd],
      "gnome-terminal": ["--", shell, "-ic", safeCmd],
      tilix: ["-e", shell, "-ic", safeCmd],
      alacritty: ["-e", shell, "-ic", safeCmd],
      kitty: [shell, "-ic", safeCmd],
      xterm: ["-e", shell, "-ic", safeCmd],
    }[terminal] || ["-e", shell, "-ic", safeCmd];

  console.log(`▶️ Opening ${terminal} → ${entryPath}`);
  console.log(`💬 Command: ${fullCommand}\n`);

  const proc = spawn(terminal, args, { cwd: entryPath, stdio: "ignore", detached: true });
  proc.on("error", (err) => console.error(`❌ Failed to launch ${terminal}:`, err.message));
  proc.unref();
}