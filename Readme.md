___________________________________________________________________________________________

SpawnFlow CLI
Automate Your Entire Dev Environment with One Command

SpawnFlow is a lightweight, cross-platform CLI tool that lets developers launch complete multi-project environments instantly.
Open editors, spin up terminals, run commands, and launch apps — all from a single workspace definition.

If you switch between frontend/backend, run multiple scripts, or repeatedly set up local dev sessions, SpawnFlow eliminates all of that manual effort.

Designed by a developer. For developers.
___________________________________________________________________________________________

🚀 Features

Workspace Automation

Create isolated workspaces that define:

• Project paths

• Commands to run

• Editors to open

• Apps / URLs to launch

Multi-Entry Support

Each workspace supports unlimited entries (frontend, backend, microservices, etc.).

Automatic Terminal Launch

SpawnFlow opens real system terminals:

• Linux: kgx, GNOME Terminal, Konsole, Tilix, Kitty, Xterm, Alacritty

• Windows: Terminal (wt), PowerShell, CMD

• macOS: Shell-compatible terminals

Each terminal runs your commands and stays open interactively.

Editor Integration

Built-in support for:
```vscode```, ```cursor```, ```vim```, ```nvim```, ```subl```, ```atom```, ```kate```, ```gedit```, ```nano```, ```JetBrains IDEs```, etc.

App Launcher

Automatically launches:

• Browsers (google-chrome-stable, brave, firefox)

• Tools (obsidian, postman, etc.)

• Local files and URLs

Cross-Platform & Lightweight

100% Node.js. No background daemons. No heavy dependencies.
___________________________________________________________________________________________

📦 Installation

Global install (recommended)
```bash
sudo npm install -g spawnflow
```

Confirm installation:
```bash
spawnflow --version
```
___________________________________________________________________________________________

🧑‍💻 Local Development Setup

```bash
git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd SpawnFlow
npm install
sudo npm link
```

Any changes you make will instantly apply to the global CLI.
___________________________________________________________________________________________

⚙️ Usage

1. Create a Workspace

```bash
spawnflow create <WorkspaceName>
```

You will be guided through:

• Workspace name

• Editor selection

• Entry paths

• Commands (comma-separated)

• App launchers

Example:

```yaml
🚀 Creating new workspace: DevsCorner

✔ Workspace name: DevsCorner
✔ Choose your editor: vscode
✔ Path: /home/dhiraj/Desktop/DevsCorner/frontend
✔ Open in editor? Yes
✔ Commands: npm run dev

✔ Add another entry? Yes
✔ Path: /home/dhiraj/Desktop/DevsCorner/backend
✔ Open in editor? Yes
✔ Commands: npm run dev

✔ Add another app? Yes
✔ App name: google-chrome-stable
✔ App url: http://localhost:5173

✔ Add another app? No
```

SpawnFlow then creates:

```arduino
workspaces/
└── DevsCorner/
    └── config.json
```
___________________________________________________________________________________________

2. Start a Workspace
```bash
spawnflow start <WorkspaceName>
```

Example:
```arduino
🚀 Starting workspace: DevsCorner

📁 Setting up: /home/dhiraj/Desktop/DevsCorner/frontend
📝 Opening in vscode...
💬 Launching terminal → npm run dev

📁 Setting up: /home/dhiraj/Desktop/DevsCorner/backend
📝 Opening in vscode...
💬 Launching terminal → npm run dev

🧩 Launching additional apps...
🧭 Launching app: google-chrome-stable http://localhost:5173

🎉 All entries and apps launched successfully!
```

Everything opens automatically — terminals, editors, commands, and browser windows.
___________________________________________________________________________________________

3. List All Workspaces
```bash
spawnflow ls
```

Output:
```yaml
📂 Available Workspaces:

- DevsCorner (editor: vscode, apps: google-chrome-stable)
- Portfolio (editor: cursor, apps: none)
```
___________________________________________________________________________________________

4. Remove a Workspace
```bash
spawnflow remove <WorkspaceName>
```


Example:
```arduino
🗑️ Workspace "DevsCorner" removed successfully.
```
___________________________________________________________________________________________

🧩 Workspace Structure

Each workspace has a simple JSON file describing your environment.

Example: workspaces/devscorner/config.json

```json
{
  "name": "devscorner",
  "editor": "vscode",
  "entries": [
    {
      "path": "/home/dhiraj/Desktop/DevsCorner/frontend",
      "openInEditor": true,
      "commands": ["npm run dev"]
    },
    {
      "path": "/home/dhiraj/Desktop/DevsCorner/backend",
      "openInEditor": true,
      "commands": ["npm run dev"]
    }
  ],
  "apps": [
    {
      "name": "google-chrome-stable",
      "url": "http://localhost:5173"
    }
  ]
}
```
Everything SpawnFlow does comes from this one config.
___________________________________________________________________________________________

🧠 Developer Documentation
Project Structure

```pgsql
SpawnFlow/
├── src/
│   └── commands/
│       ├── createWorkspace.js
│       ├── listWorkspaces.js
│       ├── removeWorkspace.js
│       └── startWorkspace.js
│
├── workspaces/
│   └── <workspace-name>/config.json
│
├── index.js
├── package.json
└── README.md
```
___________________________________________________________________________________________

🛠 Supported Editors

| Editor   | Command    |
| -------- | ---------- |
| VSCode   | `code`     |
| Cursor   | `cursor`   |
| Vim      | `vim`      |
| Neovim   | `nvim`     |
| Sublime  | `subl`     |
| Atom     | `atom`     |
| Emacs    | `emacs`    |
| WebStorm | `webstorm` |
| PyCharm  | `pycharm`  |
| IntelliJ | `idea`     |
| Eclipse  | `eclipse`  |
| Gedit    | `gedit`    |
| Kate     | `kate`     |
| Nano     | `nano`     |
| None     | —          |
___________________________________________________________________________________________

🖥 Supported Terminals

SpawnFlow auto-detects these:

```js
Windows Terminal (wt.exe)
PowerShell
CMD
kgx (GNOME Console)
gnome-terminal
konsole
tilix
alacritty
kitty
xterm
```

Fallback:
You can override terminal manually:

```bash 
TERMINAL=kgx spawnflow start DevsCorner 
```
___________________________________________________________________________________________

🤝 Contributing

Pull requests are welcome!

```bash
git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd SpawnFlow
npm install
git checkout -b feature/<name>
```

Commit + push:

```bash
git add .
git commit -m "Added <feature>"
git push origin feature/<name>
```


Open a PR on GitHub.
___________________________________________________________________________________________

🪪 License

MIT License © 2025 Dhiraj Londhe
___________________________________________________________________________________________


❤️ Credits

SpawnFlow is built to eliminate repetitive dev setup tasks and give developers the freedom to focus on building instead of configuring.

___________________________________________________________________________________________