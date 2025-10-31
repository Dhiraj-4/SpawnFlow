⚡️ SpawnFlow CLI

SpawnFlow is a lightweight Linux-only workflow manager CLI that helps developers instantly launch entire development environments with a single command.
It opens multiple projects, editors, and terminals — each running their own commands — just like magic.

🧩 Features

🏗️ Create, list, start, and remove workspaces

🧠 Each workspace can have multiple entries (like frontend, backend, etc.)

🖥️ Opens real system terminals — (CTRL + C kill the terminal)

🧰 Supports editors like VSCode, Cursor, Vim, and Neovim

🌐 Lets you pick your preferred browser (for future integrations)

🪶 Built entirely in Node.js, optimized for Linux

📦 Installation

Once published, you’ll be able to install globally via npm:

npm install -g spawnflow


Or, if you’re working locally:

git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd spawnflow
npm install
sudo npm link


Now the spawnflow command is available system-wide:

spawnflow

⚙️ Usage
🧱 1. Create a Workspace
spawnflow create <workspace-name>


This will:

Prompt you for workspace details (editor, browser, etc.)

Ask for each project’s directory, whether to open it in an editor, and the commands to run

Create a configuration file at:

workspaces/<workspace-name>/config.json

Example interaction:
$ spawnflow create DevsCorner
🚀 Creating new workspace: DevsCorner

? Choose your editor: vscode
? Choose your browser: brave
? Entry complete path: /home/user/Desktop/frontend
? Open in editor? Yes
? Commands: npm run dev
? Add another entry? Yes
? Entry complete path: /home/user/Desktop/backend
? Open in editor? Yes
? Commands: npm start
? Add another entry? No
✅ Workspace created successfully!

📋 2. List All Workspaces
spawnflow list


Shows all saved workspaces:

📂 Available Workspaces:

- DevsCorner (editor: vscode, browser: brave)
- Portfolio (editor: cursor, browser: chrome)

🚀 3. Start a Workspace
spawnflow start <workspace-name>


This will:

Open each configured path in your chosen editor

Launch all commands in independent, fully functional system terminals

Keep the terminals interactive (supports CTRL + C, shell history, etc.)

Example output:
🚀 Starting workspace: DevsCorner

📁 Setting up: /home/user/Desktop/frontend
📝 Opening in vscode...
▶️ Opening gnome-terminal → /home/user/Desktop/frontend
💬 Command: npm run dev

📁 Setting up: /home/user/Desktop/backend
📝 Opening in vscode...
▶️ Opening gnome-terminal → /home/user/Desktop/backend
💬 Command: npm start

🎉 All entries launched successfully!

❌ 4. Remove a Workspace
spawnflow remove <workspace-name>


Deletes the workspace directory and its config:

🗑️  Workspace "DevsCorner" removed successfully.

🧩 Workspace Structure

Each workspace is stored in the workspaces/ directory.

workspaces/
└── DevsCorner/
    └── config.json


Example config.json:

{
  "name": "DevsCorner",
  "editor": "vscode",
  "browser": "brave",
  "entries": [
    {
      "path": "/home/user/Desktop/frontend",
      "openInEditor": true,
      "commands": ["npm run dev"]
    },
    {
      "path": "/home/user/Desktop/backend",
      "openInEditor": true,
      "commands": ["npm start"]
    }
  ]
}

🧠 Internals (Developer Notes)
Project Structure
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
├── .gitignore
└── README.md

Supported Editors

vscode → launches via code

cursor → launches via cursor

vim → launches in terminal

neovim → launches via nvim

none → skips opening editor

Supported Terminals

Automatically detects one of these:

konsole

gnome-terminal

tilix

alacritty

kitty

xterm

Each command runs in a proper shell:

cd "<entryPath>" && <command> ; exec $SHELL

🧑‍💻 Contributing

We’d love your help improving SpawnFlow!

Steps to Contribute

Fork the repository

Clone your fork:

git clone https://github.com/Dhiraj-4/SpawnFlow.git
cd spawnflow


Install dependencies:

npm install


Create a new branch:

git checkout -b feature/<feature-name>


Make your changes

Commit and push:

git add .
git commit -m "Added new feature"
git push origin feature/<feature-name>


Open a Pull Request on GitHub

🪪 License

MIT License © 2025 [Dhiraj Londhe]

❤️ Credits
Built with 🧠 and 🤖 ChatGPT — by developer and AI, for developers —
to make multi-project setups as effortless as running a single command.