#!/usr/bin/env node

/**
 * LULCODE Transform Tests
 */

const fs = require('fs');
const path = require('path');
const { transform } = require('../src/transform');

let passed = 0;
let failed = 0;

function test(name, input, expected) {
  const actual = transform(input);
  if (actual === expected) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Actual:   ${actual}`);
    failed++;
  }
}

console.log('Running LULCODE transform tests...\n');

// Test 1: String literal key access
test(
  'String literal key access',
  'arr["key"]',
  "arr'Z key"
);

// Test 2: String literal key assignment
test(
  'String literal key assignment',
  'arr["key"] = "value"',
  'arr\'Z key R "value"'
);

// Test 3: Numeric literal key access
test(
  'Numeric literal key access',
  'arr[0]',
  "arr'Z SRS 0"
);

// Test 4: Numeric literal key assignment
test(
  'Numeric literal key assignment',
  'arr[42] = "answer"',
  'arr\'Z SRS 42 R "answer"'
);

// Test 5: Variable key access
test(
  'Variable key access',
  'arr[index]',
  "arr'Z SRS index"
);

// Test 6: Variable key assignment
test(
  'Variable key assignment',
  'arr[key] = value',
  "arr'Z SRS key R value"
);

// Test 7: Multiple transformations
test(
  'Multiple transformations',
  'arr[0] = "first"\narr[1] = "second"',
  'arr\'Z SRS 0 R "first"\narr\'Z SRS 1 R "second"'
);

// Test 8: Mixed with standard LOLCODE
test(
  'Mixed with standard LOLCODE',
  'I HAS A arr ITZ A BUKKIT\narr["key"] = "value"',
  'I HAS A arr ITZ A BUKKIT\narr\'Z key R "value"'
);

// Test 9: Access in expression
test(
  'Access in expression',
  'VISIBLE SMOOSH "Value: " arr["key"] MKAY',
  'VISIBLE SMOOSH "Value: " arr\'Z key MKAY'
);

// Test 10: File fixture test
const simpleInput = fs.readFileSync(
  path.join(__dirname, 'fixtures/simple.lul'),
  'utf-8'
);
const simpleExpected = fs.readFileSync(
  path.join(__dirname, 'fixtures/simple.expected.lol'),
  'utf-8'
);
test(
  'Simple fixture file',
  simpleInput,
  simpleExpected
);

// Test 11: String interpolation - simple
test(
  'String interpolation - simple variable',
  'VISIBLE "Hello {name}"',
  'VISIBLE "Hello :{name}"'
);

// Test 12: String interpolation - multiple variables
test(
  'String interpolation - multiple variables',
  'VISIBLE "{x} + {y} = {result}"',
  'VISIBLE ":{x} + :{y} = :{result}"'
);

// Test 13: String interpolation - escaped braces
test(
  'String interpolation - escaped braces',
  'VISIBLE "Use {{braces}} like {this}"',
  'VISIBLE "Use {braces} like :{this}"'
);

// Test 14: String interpolation - no interpolation
test(
  'String interpolation - plain string unchanged',
  'VISIBLE "Hello World"',
  'VISIBLE "Hello World"'
);

// Test 15: String interpolation - mixed with BUKKIT
test(
  'String interpolation with BUKKIT',
  'arr["key"] = "Value: {val}"',
  'arr\'Z key R "Value: :{val}"'
);

// Test 16: String slice - basic
test(
  'String slice - basic range',
  'HAI 1.2\nI HAS A sub ITZ str[0:5]',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW IZ I __LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR __slice_loop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR __slice_loop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR 0 AN YR 5 MKAY'
);

// Test 17: String slice - from start
test(
  'String slice - from index to end',
  'HAI 1.2\nI HAS A sub ITZ str[5:]',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW IZ I __LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR __slice_loop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR __slice_loop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR 5 AN YR LENGZ OF str MKAY'
);

// Test 18: String slice - to end
test(
  'String slice - from beginning to index',
  'HAI 1.2\nI HAS A sub ITZ str[:5]',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW IZ I __LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR __slice_loop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR __slice_loop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR 0 AN YR 5 MKAY'
);

// Test 19: String slice - negative index
test(
  'String slice - negative index (last N chars)',
  'HAI 1.2\nI HAS A sub ITZ str[-5:]',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW IZ I __LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR __slice_loop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR __slice_loop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR DIFF OF LENGZ OF str AN 5 AN YR LENGZ OF str MKAY'
);

// Test 20: String slice - no injection when no slice used
test(
  'No runtime library when no slice',
  'HAI 1.2\nVISIBLE "Hello"',
  'HAI 1.2\nVISIBLE "Hello"'
);

// Test 21: VAR declaration - single
test(
  'VAR single declaration',
  'VAR x',
  'I HAS A x'
);

// Test 22: VAR declaration - with initialization
test(
  'VAR with ITZ initialization',
  'VAR age ITZ 30',
  'I HAS A age ITZ 30'
);

// Test 23: VAR declaration - multiple
test(
  'VAR multiple declarations',
  'VAR x, y, z',
  'I HAS A x\nI HAS A y\nI HAS A z'
);

// Test 24: BREAK statement
test(
  'BREAK to GTFO',
  'BREAK',
  'GTFO'
);

// Test 25: Assignment operator
test(
  'Assignment = to R',
  'x = 5',
  'x R 5'
);

// Test 26: Comparison operator ==
test(
  'Comparison ==',
  'x == y',
  'BOTH SAEM x AN y'
);

// Test 27: Comparison operator !=
test(
  'Comparison !=',
  'x != y',
  'DIFFRINT x AN y'
);

// Test 28: Comparison operator >=
test(
  'Comparison >=',
  'x >= y',
  'BOTH SAEM x AN BIGGR OF x AN y'
);

// Test 29: Logical operator &&
test(
  'Logical &&',
  'x && y',
  'BOTH OF x AN y'
);

// Test 30: Logical operator ||
test(
  'Logical ||',
  'x || y',
  'EITHER OF x AN y'
);

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
