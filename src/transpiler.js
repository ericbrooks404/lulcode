#!/usr/bin/env node

/**
 * LULCODE Transpiler CLI
 *
 * Usage: node src/transpiler.js input.lul [output.lol]
 *        lulcode input.lul [output.lol]
 */

const fs = require('fs');
const path = require('path');
const { transform } = require('./transform');

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
LULCODE Transpiler v0.1.0

Usage:
  lulcode <input.lul> [output.lol]
  lulcode <input.lul> > output.lol

Options:
  -h, --help     Show this help message
  -v, --version  Show version

Examples:
  lulcode examples/bukkit-demo.lul output.lol
  lulcode input.lul > output.lol
  cat input.lul | lulcode > output.lol
    `);
    process.exit(0);
  }

  if (args[0] === '--version' || args[0] === '-v') {
    console.log('LULCODE Transpiler v0.1.0');
    process.exit(0);
  }

  const inputFile = args[0];
  const outputFile = args[1];

  // Read input
  let source;
  if (inputFile === '-' || !inputFile) {
    // Read from stdin
    source = fs.readFileSync(0, 'utf-8');
  } else {
    // Read from file
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: Input file not found: ${inputFile}`);
      process.exit(1);
    }
    source = fs.readFileSync(inputFile, 'utf-8');
  }

  // Transform
  const output = transform(source);

  // Write output
  if (outputFile) {
    fs.writeFileSync(outputFile, output, 'utf-8');
    console.error(`Transpiled ${inputFile} → ${outputFile}`);
  } else {
    // Write to stdout
    process.stdout.write(output);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
