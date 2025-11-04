⚡️ SpawnFlow CLI

SpawnFlow is a sleek, cross-platform workflow manager CLI that helps developers launch entire dev environments — terminals, editors, commands, and apps — all at once with a single command.

No more opening folders and running scripts one by one. SpawnFlow does it all for you ⚙️💨

___________________________________________________________________________________________

🚀 Features

🏗 Workspace Management — Create, list, start, and remove workspaces

🧩 Multi-entry Support — Manage multiple folders (frontend, backend, etc.) per workspace

💬 Command Runner — Launch real, persistent system terminals that run your dev commands

🧰 Editor Integration — Works with VSCode, Cursor, Vim, Neovim, and more

🌐 Browser & App Launching — Open links or files automatically (e.g., Chrome → localhost, Obsidian → notes)

💻 Cross-Platform — Runs on Linux, Windows, and macOS

🪶 Lightweight — 100% Node.js, no heavy dependencies

___________________________________________________________________________________________

📦 Installation
Global (Recommended)

⚠️ Always run with sudo (Linux/macOS) or Administrator privileges (Windows).

```bash
sudo npm install -g spawnflow
```

Now you can use SpawnFlow anywhere:

```bash
spawnflow
```

___________________________________________________________________________________________

🧑‍💻 Local Development

```bash
git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd spawnflow
npm install
sudo npm link
```
___________________________________________________________________________________________

⚙️ Usage

🧱 1. Create a Workspace

```bash
spawnflow create <workspace-name>
```

You’ll be prompted to enter:

Workspace name, editor, and browser

Paths for your projects

Commands to run (e.g., npm run dev)

Apps to launch (e.g., Chrome, Obsidian, etc.)

Example:

```yaml
$ spawnflow create DevsCorner

🚀 Creating new workspace: DevsCorner
✔ Choose your editor: vscode
✔ Choose your browser: chrome
✔ Path: /home/dark/Desktop/DevsCorner/frontend
✔ Open in editor? Yes
✔ Commands: npm run dev
✔ Add another entry? Yes
✔ Path: /home/dark/Desktop/DevsCorner/backend
✔ Open in editor? Yes
✔ Commands: npm run dev
✔ Add another entry? No
✔ App name: chrome
✔ App url/path: http://localhost:5173
✔ Add another app? Yes
✔ App name: obsidian
✔ App url/path:
✔ Add another app? No

✅ Workspace created successfully!

```
___________________________________________________________________________________________

📋 2. List All Workspaces

```bash
spawnflow list
```

Example Output:

```bash
📂 Available Workspaces:
- DevsCorner (editor: vscode, browser: chrome)
- Portfolio (editor: cursor, browser: brave)
```
___________________________________________________________________________________________

🚀 3. Start a Workspace

```bash
spawnflow start <workspace-name>
```

This will:

Open all configured paths in your chosen editor

Launch each project’s commands in independent terminals

Open configured apps or URLs (e.g., Chrome → localhost)

Example:

```arduino
🚀 Starting workspace: DevsCorner

📁 /home/dark/Desktop/DevsCorner/backend
📝 Opening in vscode...
💬 Running: npm run dev

📁 /home/dark/Desktop/DevsCorner/frontend
📝 Opening in vscode...
💬 Running: npm run dev

🌐 Launching apps:
→ chrome http://localhost:5173
→ obsidian

```
___________________________________________________________________________________________

❌ 4. Remove a Workspace

```bash
spawnflow remove <workspace-name>
```

```arduino
🗑️  Workspace "DevsCorner" removed successfully.
```
___________________________________________________________________________________________

🧩 Workspace Structure

Every workspace lives under the workspaces/ directory.

```arduino
workspaces/
└── DevsCorner/
    └── config.json
```
Example config.json

```json
{
  "name": "DevsCorner",
  "editor": "vscode",
  "browser": "chrome",
  "entries": [
    {
      "path": "/home/dark/Desktop/DevsCorner/frontend",
      "openInEditor": true,
      "commands": ["npm run dev"]
    },
    {
      "path": "/home/dark/Desktop/DevsCorner/backend",
      "openInEditor": true,
      "commands": ["npm run dev"]
    }
  ],
  "apps": [
    {
      "name": "google-chrome-stable",
      "url": "http://localhost:5173"
    },
    {
      "name": "obsidian",
      "url": ""
    }
  ]
}
```
___________________________________________________________________________________________

🧠 Developer Notes

Project Structure

```pgsql
spawnflow/
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

Supported Editors

| Editor    | Command      |
| --------- | ------------ |
| VSCode    | `code`       |
| Cursor    | `cursor`     |
| Vim       | `vim`        |
| Neovim    | `nvim`       |
| Sublime   | `subl`       |
| Atom      | `atom`       |
| Emacs     | `emacs`      |
| WebStorm  | `webstorm`   |
| PyCharm   | `pycharm`    |
| IntelliJ  | `idea`       |
| Eclipse   | `eclipse`    |
| Nano      | `nano`       |
| Gedit     | `gedit`      |
| Kate      | `kate`       |
| None      | —            |


Supported Terminals

Automatically detects and uses:

```objectivec
Windows Terminal • PowerShell • CMD
Konsole • GNOME Terminal • Tilix • Alacritty • Kitty • xterm
```
Each command runs in an isolated interactive shell:

```bash
cd "<entryPath>" && <command> ; exec $SHELL
```
___________________________________________________________________________________________

🤝 Contributing

Pull requests are welcome!

```bash
git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd spawnflow
npm install
git checkout -b feature/<feature-name>
```

Make changes, then:
```bash
git add .
git commit -m "Added <feature>"
git push origin feature/<feature-name>
```

Open a PR on GitHub 🚀
___________________________________________________________________________________________

🪪 License

MIT License © 2025 Dhiraj Londhe

___________________________________________________________________________________________

❤️ Credits

Built with 🧠 and 🤖 — by a developer, for developers —
to make multi-project setups as effortless as running a single command.
___________________________________________________________________________________________