#!/usr/bin/env node

import { Command } from 'commander';
import { createWorkspace } from './src/createWorkspace.js';

const program = new Command();

program
    .name("DevFlow")
    .description("A tool to manage and launch workspace setup")
    .version("1.0.0");


program.command("create")
    .arguments("<WorkspaceName>", "Name for workspace")
    .action(async(workspaceName) => {
        if(workspaceName) {
            await createWorkspace(workspaceName);
        }
    });

program.parse();