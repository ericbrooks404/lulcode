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

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
