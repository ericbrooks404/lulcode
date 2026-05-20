#!/usr/bin/env node

/**
 * LULCODE CLI
 *
 * Enhanced command-line interface with subcommands
 */

const { Command } = require('commander');
const chalk = require('chalk');
const packageJson = require('../package.json');

const program = new Command();

// Configure main program
program
  .name('lulcode')
  .description('LULCODE to LOLCODE transpiler')
  .version(packageJson.version, '-v, --version', 'Show version information')
  .option('--no-color', 'Disable colored output')
  .option('--verbose', 'Show verbose output');

// Import commands
const compileCommand = require('./commands/compile');
const runCommand = require('./commands/run');
const initCommand = require('./commands/init');
const checkCommand = require('./commands/check');

// Register commands
program
  .command('compile <file>')
  .description('Transpile LULCODE to LOLCODE (default command)')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .option('-r, --run', 'Execute with LCI after transpiling')
  .option('-w, --watch', 'Watch for changes and re-transpile')
  .option('--lci-path <path>', 'Custom LCI executable location')
  .action(compileCommand);

program
  .command('run <file>')
  .description('Transpile and execute in one step')
  .option('--keep', 'Keep transpiled .lol file')
  .option('--lci-path <path>', 'Custom LCI path')
  .action(runCommand);

program
  .command('init [directory]')
  .description('Initialize a new LULCODE project')
  .option('--template <name>', 'Use template (basic, game, cli)')
  .action(initCommand);

program
  .command('check <file>')
  .description('Validate LULCODE syntax without transpiling')
  .action(checkCommand);

// Make compile the default command
program
  .arguments('<file> [output]')
  .action((file, output) => {
    compileCommand(file, { output });
  });

// Parse arguments
program.parse(process.argv);

// Show help if no arguments
if (process.argv.length === 2) {
  program.help();
}

module.exports = { program };
