#!/usr/bin/env node

import { Command } from "commander";
import { createWorkspace } from "./src/commands/createWorkspace.js";
import { removeWorkspace } from "./src/commands/removeWorkspace.js";
import { listWorkspaces } from "./src/commands/listWorkspaces.js";
import { startWorkspace } from "./src/commands/startWorkspace.js";

const program = new Command();

program
  .name("spawnflow")
  .description("A CLI tool to manage and launch spawnflow workspaces")
  .version("1.0.8");

// ✅ create command
program
  .command("create <WorkspaceName>")
  .description("Create a new workspace")
  .action(async (workspaceName) => {
    await createWorkspace(workspaceName);
  });

program
  .command("start <WorkspaceName>")
  .description("Start a workspace and execute its flows")
  .action(async (workspaceName) => {
    await startWorkspace(workspaceName);
  });


// ✅ remove command (fixed missing '<' in argument)
program
  .command("remove <WorkspaceName>")
  .description("Remove an existing workspace")
  .action(async (workspaceName) => {
    removeWorkspace(workspaceName);
  });

// ✅ list command
program
  .command("ls")
  .description("List all existing workspaces")
  .action(() => {
    listWorkspaces();
  });

program.parse();