#!/usr/bin/env node
/**
 * Test full LULCODE → LOLCODE → JavaScript chain
 */

const fs = require('fs');
const path = require('path');
const { transform } = require('./src/transform');
const { executeLOLCOFFEE } = require('./src/utils/lolcoffee');

console.log('Testing LULCODE → LOLCODE → JavaScript chain...\n');

// Create a LULCODE test program
const lulcodeProgram = `HAI 1.2

BTW Test LULCODE features
VISIBLE "Testing LULCODE transpilation chain!"

BTW Variable declaration with VAR
VAR x ITZ 42
VISIBLE x

BTW String operations
VAR message ITZ "Hello, World"
VAR pos ITZ I IZ indexOf YR message AN YR "World" MKAY
VISIBLE "Position of 'World': {pos}"

BTW BUKKIT test
I HAS A scores ITZ A BUKKIT
scores'Z Alice R 100
scores'Z Bob R 85

VISIBLE "Alice's score: {scores'Z Alice}"
VISIBLE "Bob's score: {scores'Z Bob}"

KTHXBYE
`;

console.log('1. LULCODE source:');
console.log('─'.repeat(40));
console.log(lulcodeProgram);
console.log('─'.repeat(40));

// Transpile to LOLCODE
console.log('\n2. Transpiling to LOLCODE...');
let lolcode;
try {
  lolcode = transform(lulcodeProgram);
  console.log('✓ Transpilation successful');
} catch (error) {
  console.error(`✗ Transpilation failed: ${error.message}`);
  process.exit(1);
}

// Save transpiled LOLCODE
const lolFile = path.join(__dirname, 'test-full-chain-temp.lol');
fs.writeFileSync(lolFile, lolcode, 'utf8');
console.log(`✓ Saved to ${lolFile}\n`);

console.log('3. Transpiled LOLCODE (first 20 lines):');
console.log('─'.repeat(40));
console.log(lolcode.split('\n').slice(0, 20).join('\n'));
console.log('...');
console.log('─'.repeat(40));

// Execute with lol-coffee
console.log('\n4. Executing with lol-coffee...');
console.log('─'.repeat(40));

executeLOLCOFFEE(lolFile, { verbose: false })
  .then((result) => {
    console.log('─'.repeat(40));
    console.log('\n✓ Execution completed successfully');
    console.log(`  Exit code: ${result.code}`);

    // Clean up
    fs.unlinkSync(lolFile);

    console.log('\n✅ FULL CHAIN WORKING!');
    console.log('   LULCODE → LOLCODE → JavaScript ✓\n');
    process.exit(0);
  })
  .catch((error) => {
    console.log('─'.repeat(40));
    console.error(`\n✗ Execution failed: ${error.message}`);
    console.error(error.stack);

    // Clean up
    if (fs.existsSync(lolFile)) {
      fs.unlinkSync(lolFile);
    }

    process.exit(1);
  });
