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
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW DUZ I LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR sliceLoop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR sliceLoop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ LULCODE_SLICE str 0 5'
);

// Test 17: String slice - from start
test(
  'String slice - from index to end',
  'HAI 1.2\nI HAS A sub ITZ str[5:]',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW DUZ I LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR sliceLoop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR sliceLoop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ LULCODE_SLICE str 5 LENGZ OF str'
);

// Test 18: String slice - to end
test(
  'String slice - from beginning to index',
  'HAI 1.2\nI HAS A sub ITZ str[:5]',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW DUZ I LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR sliceLoop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR sliceLoop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ LULCODE_SLICE str 0 5'
);

// Test 19: String slice - negative index
test(
  'String slice - negative index (last N chars)',
  'HAI 1.2\nI HAS A sub ITZ str[-5:]',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW String slice function: str[start:end]\nHOW DUZ I LULCODE_SLICE YR str AN YR start AN YR end\n  I HAS A result ITZ ""\n  I HAS A i ITZ start\n  IM IN YR sliceLoop UPPIN YR i TIL BOTH SAEM i AN end\n    I HAS A char ITZ str AT i\n    result R SMOOSH result AN char MKAY\n  IM OUTTA YR sliceLoop\n  FOUND YR result\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nI HAS A sub ITZ LULCODE_SLICE str DIFF OF LENGZ OF str AN 5 LENGZ OF str'
);

// Test 20: String slice - no injection when no slice used
test(
  'No runtime library when no slice',
  'HAI 1.2\nVISIBLE "Hello"',
  'HAI 1.2\nVISIBLE "Hello"'
);

// Test 21: WTV declaration - single
test(
  'WTV single declaration',
  'WTV x',
  'I HAS A x'
);

// Test 22: WTV declaration - with initialization
test(
  'WTV with ITZ initialization',
  'WTV age ITZ 30',
  'I HAS A age ITZ 30'
);

// Test 23: WTV declaration - multiple
test(
  'WTV multiple declarations',
  'WTV x, y, z',
  'I HAS A x\nI HAS A y\nI HAS A z'
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
  'WTV arr ITZ []',
  'I HAS A arr ITZ A BUKKIT\narr HAS A __length ITZ 0\narr HAS A __is_array ITZ WIN'
);

// Test 32: Array literal with elements
test(
  'Array literal with elements',
  'WTV nums ITZ [1, 2, 3]',
  'I HAS A nums ITZ A BUKKIT\nnums HAS A __length ITZ 3\nnums HAS A __is_array ITZ WIN\nnums HAS A __0 ITZ 1\nnums HAS A __1 ITZ 2\nnums HAS A __2 ITZ 3'
);

// Test 33: Array literal with strings
test(
  'Array literal with strings',
  'WTV names ITZ ["Alice", "Bob"]',
  'I HAS A names ITZ A BUKKIT\nnames HAS A __length ITZ 2\nnames HAS A __is_array ITZ WIN\nnames HAS A __0 ITZ "Alice"\nnames HAS A __1 ITZ "Bob"'
);

// Test 34: ITZ AN ARRAY syntax
test(
  'ITZ AN ARRAY',
  'WTV list ITZ AN ARRAY',
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
  'YEET 42 INTO arr',
  'LULCODE_ARRAY_PUSH arr 42'
);

// Test 38: POP operation
test(
  'YOINK LAST FROM array',
  'YOINK LAST FROM arr',
  'LULCODE_ARRAY_POP arr'
);

// Test 39: POP with assignment
test(
  'POP with variable assignment',
  'WTV x ITZ YOINK LAST FROM arr',
  'I HAS A x ITZ LULCODE_ARRAY_POP arr'
);

// Test 40: SHIFT operation
test(
  'YOINK FIRST FROM array',
  'YOINK FIRST FROM arr',
  'LULCODE_ARRAY_SHIFT arr'
);

// Test 41: Array operations with runtime injection
test(
  'Array operations inject runtime',
  'HAI 1.2\nYEET 1 INTO arr',
  'HAI 1.2\nBTW === LULCODE Runtime Library ===\n\nBTW Array PUSH: Add element to end\nHOW DUZ I LULCODE_ARRAY_PUSH YR arr AN YR value\n  I HAS A len ITZ arr\'Z __length\n  I HAS A key ITZ SMOOSH "__" AN len MKAY\n  arr\'Z SRS key R value\n  arr\'Z __length R SUM OF len AN 1\nIF U SAY SO\n\nBTW === End LULCODE Runtime ===\n\nLULCODE_ARRAY_PUSH arr 1'
);

// Test 42: FOREACH without index
test(
  'IM CHECKIN YR array FER element',
  'IM CHECKIN YR arr FER x\n  VISIBLE x\nKTHX',
  'I HAS A __foreach_idx_1 ITZ 0\nI HAS A __foreach_len_1 ITZ arr\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR __foreach_idx_1 TIL BOTH SAEM __foreach_idx_1 AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN __foreach_idx_1 MKAY\n  I HAS A x ITZ arr\'Z SRS __foreach_key_1\n  VISIBLE x\nIM OUTTA YR __foreach_loop_1'
);

// Test 43: FOREACH with index
test(
  'IM CHECKIN YR array FER element AT i',
  'IM CHECKIN YR arr FER x AT i\n  VISIBLE i\n  VISIBLE x\nKTHX',
  'I HAS A i ITZ 0\nI HAS A __foreach_len_1 ITZ arr\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR i TIL BOTH SAEM i AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN i MKAY\n  I HAS A x ITZ arr\'Z SRS __foreach_key_1\n  VISIBLE i\n  VISIBLE x\nIM OUTTA YR __foreach_loop_1'
);

// Test 44: FOREACH with array literal
test(
  'FOREACH with inline array',
  'WTV arr ITZ [1, 2, 3]\nIM CHECKIN YR arr FER num\n  VISIBLE num\nKTHX',
  'I HAS A arr ITZ A BUKKIT\narr HAS A __length ITZ 3\narr HAS A __is_array ITZ WIN\narr HAS A __0 ITZ 1\narr HAS A __1 ITZ 2\narr HAS A __2 ITZ 3\nI HAS A __foreach_idx_1 ITZ 0\nI HAS A __foreach_len_1 ITZ arr\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR __foreach_idx_1 TIL BOTH SAEM __foreach_idx_1 AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN __foreach_idx_1 MKAY\n  I HAS A num ITZ arr\'Z SRS __foreach_key_1\n  VISIBLE num\nIM OUTTA YR __foreach_loop_1'
);

// Test 45: String SPLIT operation
test(
  'UNSMOOSH string BY delimiter',
  'UNSMOOSH "a,b,c" BY ","',
  'LULCODE_SPLIT "a,b,c" ","'
);

// Test 46: SPLIT with variable
test(
  'SPLIT with variable',
  'WTV parts ITZ UNSMOOSH str BY ","',
  'I HAS A parts ITZ LULCODE_SPLIT str ","'
);

// Test 47: SPLIT and FOREACH together
test(
  'SPLIT with FOREACH',
  'WTV parts ITZ UNSMOOSH "a:b" BY ":"\nIM CHECKIN YR parts FER part\n  VISIBLE part\nKTHX',
  'I HAS A parts ITZ LULCODE_SPLIT "a:b" ":"\nI HAS A __foreach_idx_1 ITZ 0\nI HAS A __foreach_len_1 ITZ parts\'Z __length\nIM IN YR __foreach_loop_1 UPPIN YR __foreach_idx_1 TIL BOTH SAEM __foreach_idx_1 AN __foreach_len_1\n  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN __foreach_idx_1 MKAY\n  I HAS A part ITZ parts\'Z SRS __foreach_key_1\n  VISIBLE part\nIM OUTTA YR __foreach_loop_1'
);

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
