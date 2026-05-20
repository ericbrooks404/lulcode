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

// Test 3: Numeric literal array access (with array encoding)
test(
  'Numeric literal array access',
  'arr[0]',
  "arr'Z __0"
);

// Test 4: Numeric literal array assignment (with array encoding)
test(
  'Numeric literal array assignment',
  'arr[42] = "answer"',
  'arr\'Z __42 R "answer"'
);

// Test 5: Variable array access (runtime key generation)
test(
  'Variable array access',
  'arr[index]',
  "arr'Z SRS SMOOSH \"__\" AN index MKAY"
);

// Test 6: Variable array assignment (runtime key generation)
test(
  'Variable array assignment',
  'arr[key] = value',
  "arr'Z SRS SMOOSH \"__\" AN key MKAY R value"
);

// Test 7: Multiple array transformations
test(
  'Multiple array transformations',
  'arr[0] = "first"\narr[1] = "second"',
  'arr\'Z __0 R "first"\narr\'Z __1 R "second"'
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

// Test 31: Empty array literal
test(
  'Empty array literal',
  'VAR arr ITZ []',
  'I HAS A arr ITZ A BUKKIT\narr HAS A __length ITZ 0\narr HAS A __is_array ITZ WIN'
);

// Test 32: Array literal with elements
test(
  'Array literal with elements',
  'VAR nums ITZ [1, 2, 3]',
  'I HAS A nums ITZ A BUKKIT\nnums HAS A __length ITZ 3\nnums HAS A __is_array ITZ WIN\nnums HAS A __0 ITZ 1\nnums HAS A __1 ITZ 2\nnums HAS A __2 ITZ 3'
);

// Test 33: Array literal with strings
test(
  'Array literal with strings',
  'VAR names ITZ ["Alice", "Bob"]',
  'I HAS A names ITZ A BUKKIT\nnames HAS A __length ITZ 2\nnames HAS A __is_array ITZ WIN\nnames HAS A __0 ITZ "Alice"\nnames HAS A __1 ITZ "Bob"'
);

// Test 34: ITZ AN ARRAY syntax
test(
  'ITZ AN ARRAY',
  'VAR list ITZ AN ARRAY',
  'I HAS A list ITZ A BUKKIT\nlist HAS A __length ITZ 0\nlist HAS A __is_array ITZ WIN'
);

// Test 35: Array length via metadata
test(
  'Array length metadata',
  "arr'Z __length",
  "arr'Z __length"
);

// Test 36: Array access and assignment combined
test(
  'Array access and assignment',
  'arr[0] = 10\nVISIBLE arr[0]',
  "arr'Z __0 R 10\nVISIBLE arr'Z __0"
);

// Test 37: PUSH operation
test(
  'PUSH TO array',
  'PUSH 42 TO arr',
  'I IZ __LULCODE_ARRAY_PUSH YR arr AN YR 42 MKAY'
);

// Test 38: POP operation
test(
  'POP FROM array',
  'POP FROM arr',
  'I IZ __LULCODE_ARRAY_POP YR arr MKAY'
);

// Test 39: POP with assignment
test(
  'POP with variable assignment',
  'VAR x ITZ POP FROM arr',
  'I HAS A x ITZ I IZ __LULCODE_ARRAY_POP YR arr MKAY'
);

// Test 40: SHIFT operation
test(
  'SHIFT FROM array',
  'SHIFT FROM arr',
  'I IZ __LULCODE_ARRAY_SHIFT YR arr MKAY'
);

// Test 41: Array operations with runtime injection
test(
  'Array operations inject runtime',
  'HAI 1.2\nPUSH 1 TO arr',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW Array PUSH: Add element to end\nHOW IZ I __LULCODE_ARRAY_PUSH YR arr AN YR value\n  I HAS A len ITZ arr\'Z __length\n  I HAS A key ITZ SMOOSH "__" AN len MKAY\n  arr\'Z SRS key R value\n  arr\'Z __length R SUM OF len AN 1\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI IZ __LULCODE_ARRAY_PUSH YR arr AN YR 1 MKAY'
);

// Test 42: FOREACH without index
test(
  'FOREACH element IN array',
  'FOREACH x IN arr\n  VISIBLE x\nEND',
  'I HAS A __foreach_idx_1 ITZ 0\nI HAS A __foreach_len_1 ITZ arr\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR __foreach_idx_1 TIL BOTH SAEM __foreach_idx_1 AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN __foreach_idx_1 MKAY\n  I HAS A x ITZ arr\'Z SRS __foreach_key_1\n  VISIBLE x\nIM OUTTA YR __foreach_loop_1'
);

// Test 43: FOREACH with index
test(
  'FOREACH i, element IN array',
  'FOREACH i, x IN arr\n  VISIBLE i\n  VISIBLE x\nEND',
  'I HAS A i ITZ 0\nI HAS A __foreach_len_1 ITZ arr\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR i TIL BOTH SAEM i AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN i MKAY\n  I HAS A x ITZ arr\'Z SRS __foreach_key_1\n  VISIBLE i\n  VISIBLE x\nIM OUTTA YR __foreach_loop_1'
);

// Test 44: FOREACH with array literal
test(
  'FOREACH with inline array',
  'VAR arr ITZ [1, 2, 3]\nFOREACH num IN arr\n  VISIBLE num\nEND',
  'I HAS A arr ITZ A BUKKIT\narr HAS A __length ITZ 3\narr HAS A __is_array ITZ WIN\narr HAS A __0 ITZ 1\narr HAS A __1 ITZ 2\narr HAS A __2 ITZ 3\nI HAS A __foreach_idx_1 ITZ 0\nI HAS A __foreach_len_1 ITZ arr\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR __foreach_idx_1 TIL BOTH SAEM __foreach_idx_1 AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN __foreach_idx_1 MKAY\n  I HAS A num ITZ arr\'Z SRS __foreach_key_1\n  VISIBLE num\nIM OUTTA YR __foreach_loop_1'
);

// Test 45: String SPLIT operation
test(
  'SPLIT string BY delimiter',
  'SPLIT "a,b,c" BY ","',
  'I IZ __LULCODE_SPLIT YR "a,b,c" AN YR "," MKAY'
);

// Test 46: SPLIT with variable
test(
  'SPLIT with variable',
  'VAR parts ITZ SPLIT str BY ","',
  'I HAS A parts ITZ I IZ __LULCODE_SPLIT YR str AN YR "," MKAY'
);

// Test 47: SPLIT and FOREACH together
test(
  'SPLIT with FOREACH',
  'VAR parts ITZ SPLIT "a:b" BY ":"\nFOREACH part IN parts\n  VISIBLE part\nEND',
  'I HAS A parts ITZ I IZ __LULCODE_SPLIT YR "a:b" AN YR ":" MKAY\nI HAS A __foreach_idx_1 ITZ 0\nI HAS A __foreach_len_1 ITZ parts\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR __foreach_idx_1 TIL BOTH SAEM __foreach_idx_1 AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN __foreach_idx_1 MKAY\n  I HAS A part ITZ parts\'Z SRS __foreach_key_1\n  VISIBLE part\nIM OUTTA YR __foreach_loop_1'
);

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
