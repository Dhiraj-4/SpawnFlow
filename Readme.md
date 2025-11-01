# ⚡️ SpawnFlow CLI

**SpawnFlow** is a lightweight cross-platform workflow manager CLI that helps developers instantly launch entire development environments with a single command.  
It opens multiple projects, editors, and terminals — each running their own commands — just like magic.

---

## 🧩 Features

- 🏗️ Create, list, start, and remove workspaces  
- 🧠 Each workspace can have multiple entries (like `frontend`, `backend`, etc.)  
- 🖥️ Opens real system terminals  
- 🧰 Supports editors like VSCode, Cursor, Vim, and Neovim  
- 🌐 Lets you pick your preferred browser (for future integrations)  
- 💻 Works on **Windows**, **Linux**, and **macOS**  
- 🪶 Built entirely in Node.js — no heavy dependencies  

---

## 📦 Installation

### Global (Recommended)
```bash
npm install -g spawnflow
Local Development
bash
Copy code
git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd spawnflow
npm install
sudo npm link
Now the spawnflow command is available system-wide:

bash
Copy code
spawnflow
⚙️ Usage
🧱 1. Create a Workspace
bash
Copy code
spawnflow create <workspace-name>
This will:

Prompt for workspace details (editor, browser, etc.)

Ask for each project’s path, whether to open it in an editor, and the commands to run

Generate a configuration file at
workspaces/<workspace-name>/config.json

Example:

bash
Copy code
$ spawnflow create DevsCorner

🚀 Creating new workspace: DevsCorner
✔ Choose your editor: vscode
✔ Choose your browser: chrome
✔ Entry complete path: C:\Users\LENOVO\Desktop\DevsCorner\backend
✔ Open in editor? Yes
✔ Commands: npm run dev
✔ Add another entry? Yes
✔ Entry complete path: C:\Users\LENOVO\Desktop\DevsCorner\frontend
✔ Open in editor? Yes
✔ Commands: npm run dev
✔ Add another entry? No

✅ Workspace created successfully!
📋 2. List All Workspaces
bash
Copy code
spawnflow list
Example output:

less
Copy code
📂 Available Workspaces:

- DevsCorner (editor: vscode, browser: chrome)
- Portfolio (editor: cursor, browser: brave)
🚀 3. Start a Workspace
bash
Copy code
spawnflow start <workspace-name>
This will:

Open each configured path in your chosen editor (using the open package)

Launch all commands in separate, fully functional system terminals

Keep each terminal interactive and persistent

Example output:

mathematica
Copy code
🚀 Starting workspace: DevsCorner

📁 Setting up: C:\Users\LENOVO\Desktop\DevsCorner\backend
📝 Opening in vscode...
▶️ Opening terminal → C:\Users\LENOVO\Desktop\DevsCorner\backend
💬 Command: npm run dev

📁 Setting up: C:\Users\LENOVO\Desktop\DevsCorner\frontend
📝 Opening in vscode...
▶️ Opening terminal → C:\Users\LENOVO\Desktop\DevsCorner\frontend
💬 Command: npm run dev

🎉 All entries launched successfully!
❌ 4. Remove a Workspace
bash
Copy code
spawnflow remove <workspace-name>
Deletes the workspace directory and its config:

arduino
Copy code
🗑️ Workspace "DevsCorner" removed successfully.
🧩 Workspace Structure
Each workspace is stored in the workspaces/ directory.

arduino
Copy code
workspaces/
└── DevsCorner/
    └── config.json
Example config.json:

json
Copy code
{
  "name": "DevsCorner",
  "editor": "vscode",
  "browser": "chrome",
  "entries": [
    {
      "path": "C:/Users/LENOVO/Desktop/DevsCorner/backend",
      "openInEditor": true,
      "commands": ["npm run dev"]
    },
    {
      "path": "C:/Users/LENOVO/Desktop/DevsCorner/frontend",
      "openInEditor": true,
      "commands": ["npm run dev"]
    }
  ]
}
🧠 Developer Notes
Project Structure
bash
Copy code
spawnflow/
├── src/
│   └── commands/
│       ├── createWorkspace.js   # Interactive workspace creation
│       ├── listWorkspaces.js    # Lists all saved workspaces
│       ├── removeWorkspace.js   # Deletes a workspace
│       └── startWorkspace.js    # Launches editors & terminals
│
├── workspaces/                  # Auto-created on first workspace
│   └── <workspace-name>/config.json
│
├── index.js                     # CLI entry point
├── package.json
└── README.md
Supported Editors
Editor	Launch Command
vscode	code
cursor	cursor
vim	vim
neovim	nvim
none	(skips editor opening)

Supported Terminals
Automatically detects one of the following:

Windows Terminal (wt)

PowerShell

CMD

konsole

gnome-terminal

tilix

alacritty

kitty

xterm

Each command runs in its own shell environment:

bash
Copy code
cd "<entryPath>" && <command> ; exec $SHELL
🧑‍💻 Contributing
We’d love your help improving SpawnFlow!

Fork the repository

Clone your fork

bash
Copy code
git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd spawnflow
Install dependencies

bash
Copy code
npm install
Create a new branch

bash
Copy code
git checkout -b feature/<feature-name>
Make your changes

Commit and push

bash
Copy code
git add .
git commit -m "Added new feature"
git push origin feature/<feature-name>
Open a Pull Request on GitHub

🪪 License
MIT License © 2025 [Dhiraj Londhe]

❤️ Credits
Built with 🧠 and 🤖 — by developer and AI, for developers —
to make multi-project setups as effortless as running a single command.