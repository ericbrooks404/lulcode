#!/usr/bin/env node
/**
 * Test lol-coffee runtime integration
 */

const fs = require('fs');
const path = require('path');
const { executeLOLCOFFEE, hasLOLCOFFEE, getLOLCOFFEEVersion } = require('./src/utils/lolcoffee');

console.log('Testing lol-coffee runtime integration...\n');

// Check if runtime is available
console.log('1. Checking runtime availability...');
if (!hasLOLCOFFEE()) {
  console.error('✗ Runtime files not found');
  process.exit(1);
}
console.log('✓ Runtime files found');
console.log(`  Version: ${getLOLCOFFEEVersion()}\n`);

// Create a simple test program
console.log('2. Creating test program...');
const testProgram = `HAI 1.2

BTW Simple test program
VISIBLE "Hello from lol-coffee!"

I HAS A x ITZ 5
I HAS A y ITZ 10
I HAS A sum ITZ SUM OF x AN y
VISIBLE sum

KTHXBYE
`;

const testFile = path.join(__dirname, 'test-temp.lol');
fs.writeFileSync(testFile, testProgram, 'utf8');
console.log('✓ Test program created\n');

// Execute the test program
console.log('3. Executing test program...');
console.log('─'.repeat(40));

executeLOLCOFFEE(testFile, { verbose: false })
  .then((result) => {
    console.log('─'.repeat(40));
    console.log('\n✓ Execution completed successfully');
    console.log(`  Exit code: ${result.code}`);

    // Clean up
    fs.unlinkSync(testFile);

    console.log('\n✅ lol-coffee runtime integration working!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.log('─'.repeat(40));
    console.error(`\n✗ Execution failed: ${error.message}`);
    console.error(error.stack);

    // Clean up
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }

    process.exit(1);
  });
