// startWorkspace.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn, execSync } from "child_process";
import os from "os";
import open from "open";

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

  // 🧱 1️⃣ Launch all workspace entries
  for (const entry of config.entries) {
    const entryPath = entry.path;

    if (!fs.existsSync(entryPath)) {
      console.log(`⚠️ Skipping missing path: ${entryPath}`);
      continue;
    }

    console.log(`📁 Setting up: ${entryPath}`);

    // Open in configured editor
    if (entry.openInEditor && config.editor !== "none") {
      await openInEditor(entryPath, config.editor);
    }

    // Run commands inside terminal
    if (entry.commands && entry.commands.length > 0) {
      openSystemTerminal(entryPath, entry.commands);
    }

    console.log(`✅ Entry launched: ${entry.path}\n`);
  }

  // 🌐 2️⃣ Launch all configured apps
  if (config.apps && config.apps.length > 0) {
    console.log("🧩 Launching additional apps...\n");
    for (const app of config.apps) {
      await launchApp(app);
    }
  }

  console.log("🎉 All entries and apps launched successfully!\n");
}

// 📝 Open folder in chosen editor
async function openInEditor(entryPath, editor) {
  const editorMap = {
  vscode: "code",
  cursor: "cursor",
  vim: "vim",
  neovim: "nvim",
  sublime: "subl",
  atom: "atom",
  emacs: "emacs",
  webstorm: "webstorm",
  pycharm: "pycharm",
  intellij: "idea",
  eclipse: "eclipse",
  nano: "nano",
  gedit: "gedit",
  kate: "kate",
  none: null,
};

  const appName = editorMap[editor];
  if (!appName) return;

  console.log(`📝 Opening ${entryPath} in ${editor}...`);
  try {
    await open(entryPath, { app: { name: appName } });
  } catch (err) {
    console.error(`❌ Failed to open editor: ${err.message}`);
  }
}

// ⚙️ Detect available terminal
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

// 💻 Open terminal per entry
function openSystemTerminal(entryPath, commands) {
  const platform = os.platform();

  if (platform === "win32") {
    const cwd = path.resolve(entryPath);
    const cmdChain = commands.map((cmd) => cmd.trim()).join(" && ");
    console.log(`▶️ Opening terminal → ${cwd}`);
    console.log(`💬 Command: ${cmdChain}\n`);

    try {
      const psCmd = `Start-Process powershell -ArgumentList '-NoExit','-Command','cd "${cwd}"; Write-Host "📂 Working directory: ${cwd}"; ${cmdChain}'`;
      spawn("powershell.exe", ["-NoExit", "-Command", psCmd], {
        cwd,
        stdio: "ignore",
        shell: true,
        detached: true,
      }).unref();
    } catch (err) {
      console.error(`❌ Failed to launch PowerShell: ${err.message}`);
    }

    return;
  }

  // 🐧 Linux / macOS
  const shell = process.env.SHELL || "bash";
  const fullCommand = commands.join(" && ");
  const safeCmd = `cd "${entryPath}" && echo "📂 Working directory: ${entryPath}" && ${fullCommand}; exec ${shell}`;

  const terminal = getAvailableTerminal();
  const args =
    {
      konsole: ["-e", shell, "-ic", safeCmd],
      "gnome-terminal": ["--", shell, "-ic", safeCmd],
      tilix: ["-e", shell, "-ic", safeCmd],
      alacritty: ["-e", shell, "-ic", safeCmd],
      kitty: [shell, "-ic", safeCmd],
      xterm: ["-e", shell, "-ic", safeCmd],
    }[terminal] || ["-e", shell, "-ic", safeCmd];

  const proc = spawn(terminal, args, {
    cwd: entryPath,
    stdio: "ignore",
    detached: true,
  });
  proc.on("error", (err) => console.error(`❌ Failed to launch ${terminal}:`, err.message));
  proc.unref();
}

// 🌍 Launch apps like "chrome http://localhost:5173" or "obsidian <path>"
async function launchApp(app) {
  if (!app.name) return;

  const command = app.url ? `${app.name} ${app.url}` : app.name;
  console.log(`🧭 Launching app: ${command}`);

  try {
    if (isWindows) {
      spawn("cmd", ["/c", "start", "", app.name, app.url || ""], {
        stdio: "ignore",
        detached: true,
      }).unref();
    } else {
      // Linux/macOS
      spawn(app.name, app.url ? [app.url] : [], {
        stdio: "ignore",
        detached: true,
      }).unref();
    }
  } catch (err) {
    console.error(`❌ Failed to launch app "${app.name}": ${err.message}`);
  }
}
