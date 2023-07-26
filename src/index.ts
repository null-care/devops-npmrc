#! /usr/bin/env node

import { configureGlobalFile } from './globalFile.js';
import { configureProjectFile } from './projectFile.js';
import { program } from 'commander';

async function main() {
  program
    .name('devops-npmrc')
    .description('CLI tool to add a devops registry to your .npmrc file')
    .version('1.0.3');

  program.option('-p, --project', 'Generate a .npmrc file for a project');

  program.parse();

  const options = program.opts();
  const projectFile = options.project;
  if (projectFile) {
    await configureProjectFile();
  } else {
    await configureGlobalFile();
  }
}

main();
