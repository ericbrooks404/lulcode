# EPIC-007: String Operations Library

**Priority**: 1 (Critical for Self-Hosting)  
**Status**: Not Started  
**Goal**: Add essential string operations for pattern matching without regex

## Overview

To enable self-hosting (transpiling LULCODE with LULCODE), we need string operations that allow pattern detection and manipulation. The current JavaScript transpiler uses 41 regex operations. We can replace most of these with a library of string utility functions.

## Why This Matters

**Current State**:
- LULCODE has: SMOOSH (concat), slice `str[start:end]`, SPLIT, interpolation `{var}`
- Missing: startsWith, contains, indexOf, replace, trim, case conversion

**After EPIC-007**:
- Can detect patterns in lines: "does this line start with VAR?"
- Can extract substrings: "get everything after 'VAR '"
- Can replace patterns: "change 'VAR x' to 'I HAS A x'"
- Can build a line-by-line transpiler **without regex**

**Use Case**: Self-hosted transpiler that transforms:
```lulcode
VAR x ITZ 5
x = x + 1
```

Into:
```lolcode
I HAS A x ITZ 5
x R SUM OF x AN 1
```

## Core String Operations (Priority 1)

### 1. startsWith(str, prefix) → TROOF
**Usage**: `I IZ startsWith YR line AN YR "VAR " MKAY`  
**Returns**: WIN if str starts with prefix, FAIL otherwise

**Example**:
```lulcode
startsWith("VAR x", "VAR ")  → WIN
startsWith("x = 5", "VAR ")  → FAIL
```

**Implementation**: Compare `str[0:LENGZ OF prefix]` with prefix

---

### 2. endsWith(str, suffix) → TROOF
**Usage**: `I IZ endsWith YR line AN YR "END" MKAY`  
**Returns**: WIN if str ends with suffix, FAIL otherwise

**Example**:
```lulcode
endsWith("END", "END")       → WIN
endsWith("ENDIF", "END")     → FAIL
```

**Implementation**: Compare `str[(LENGZ OF str) - (LENGZ OF suffix):]` with suffix

---

### 3. indexOf(str, pattern) → NUMBR
**Usage**: `I IZ indexOf YR line AN YR "=" MKAY`  
**Returns**: Position of pattern (0-indexed), or -1 if not found

**Example**:
```lulcode
indexOf("x = 5", "=")        → 2
indexOf("x = 5", "z")        → -1
```

**Implementation**: Loop through str, check each substring

---

### 4. contains(str, pattern) → TROOF
**Usage**: `I IZ contains YR line AN YR "==" MKAY`  
**Returns**: WIN if pattern exists in str, FAIL otherwise

**Example**:
```lulcode
contains("x == y", "==")     → WIN
contains("x = y", "==")      → FAIL
```

**Implementation**: `indexOf(str, pattern) >= 0`

---

### 5. replace(str, old, new) → YARN
**Usage**: `I IZ replace YR line AN YR "VAR " AN YR "I HAS A " MKAY`  
**Returns**: New string with **first** occurrence replaced

**Example**:
```lulcode
replace("VAR x", "VAR ", "I HAS A ")  → "I HAS A x"
replace("x x x", "x", "y")            → "y x x"
```

**Implementation**: 
- Find position with indexOf
- Build: `str[0:pos] + new + str[pos+len(old):]`

---

### 6. replaceAll(str, old, new) → YARN
**Usage**: `I IZ replaceAll YR line AN YR "x" AN YR "y" MKAY`  
**Returns**: New string with **all** occurrences replaced

**Example**:
```lulcode
replaceAll("x x x", "x", "y")  → "y y y"
```

**Implementation**: Loop, replace until indexOf returns -1

---

### 7. trim(str) → YARN
**Usage**: `I IZ trim YR line MKAY`  
**Returns**: String with leading/trailing whitespace removed

**Example**:
```lulcode
trim("  hello  ")     → "hello"
trim("\ntest\n")      → "test"
```

**Implementation**: 
- Find first non-space character
- Find last non-space character
- Return slice between them

---

### 8. toUpper(str) / toLower(str) → YARN
**Usage**: `I IZ toUpper YR str MKAY`  
**Returns**: String converted to uppercase/lowercase

**Example**:
```lulcode
toUpper("Hello")  → "HELLO"
toLower("Hello")  → "hello"
```

**Implementation**: 
- Loop through characters
- Check ASCII range (97-122 for lowercase, 65-90 for uppercase)
- Convert using ASCII math (a=97, A=65, diff=32)

## Stories

### Story 007.1: Design String Operations API
**Status**: Not Started

Design the API for string operations:
- [ ] Choose syntax: `I IZ funcName YR arg1 AN YR arg2 MKAY` (LOLCODE function style)
- [ ] Define return types (TROOF for boolean, NUMBR for index, YARN for string)
- [ ] Document all 8 functions with examples
- [ ] Consider edge cases (empty strings, not found, etc.)
- [ ] Plan runtime library injection strategy

**Output**: API specification document

### Story 007.2: Implement Core Functions (indexOf, contains, startsWith, endsWith)
**Status**: Not Started (after 007.1)

Implement the 4 core detection functions:
- [ ] **indexOf**: Loop-based substring search
- [ ] **contains**: Wrapper around indexOf
- [ ] **startsWith**: Slice comparison
- [ ] **endsWith**: Slice comparison
- [ ] Add to runtime library generator
- [ ] Test each function with examples

**Output**: 4 working functions in runtime library

### Story 007.3: Implement String Manipulation (replace, replaceAll, trim)
**Status**: Not Started (after 007.2)

Implement string transformation functions:
- [ ] **replace**: Single replacement with indexOf + slice
- [ ] **replaceAll**: Loop until no more matches
- [ ] **trim**: Remove leading/trailing whitespace
- [ ] Handle edge cases (empty strings, no match)
- [ ] Add to runtime library

**Output**: 3 working manipulation functions

### Story 007.4: Implement Case Conversion (toUpper, toLower)
**Status**: Not Started (after 007.3)

Implement case conversion:
- [ ] **toUpper**: Convert a-z (97-122) to A-Z (65-90)
- [ ] **toLower**: Convert A-Z (65-90) to a-z (97-122)
- [ ] Handle non-alphabetic characters (pass through)
- [ ] Add to runtime library

**Output**: 2 working case conversion functions

### Story 007.5: Transpiler Integration
**Status**: Not Started (after 007.4)

Integrate string operations into LULCODE transpiler:
- [ ] Add pattern: `I IZ funcName YR ... MKAY` (pass through)
- [ ] Smart injection: Only include used functions
- [ ] Update tests to verify integration
- [ ] Create examples demonstrating usage

**Output**: String operations available in LULCODE programs

### Story 007.6: Self-Hosting Test Suite
**Status**: Not Started (after 007.5)

Test string operations with transpiler use cases:
- [ ] Detect "VAR " at start of line
- [ ] Extract variable name after "VAR "
- [ ] Replace "VAR x" with "I HAS A x"
- [ ] Detect operators (==, &&, ||)
- [ ] Replace operators with LOLCODE equivalents
- [ ] Verify all operations work correctly

**Output**: Test suite proving operations are sufficient for transpiler

## Implementation Strategy

### Runtime Library Approach

All functions implemented as LOLCODE functions in runtime library:

```lolcode
BTW === String Operations Library ===

HOW IZ I indexOf YR str AN YR pattern
  I HAS A strLen ITZ LENGZ OF str
  I HAS A patLen ITZ LENGZ OF pattern
  I HAS A i ITZ 0
  
  IM IN YR search UPPIN YR i TIL BOTH SAEM i AN DIFF OF strLen AN patLen
    I HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR i AN YR SUM OF i AN patLen MKAY
    BOTH SAEM sub AN pattern, O RLY?
      YA RLY
        FOUND YR i
    OIC
  IM OUTTA YR search
  
  FOUND YR -1
IF U SAY SO

HOW IZ I startsWith YR str AN YR prefix
  I HAS A prefixLen ITZ LENGZ OF prefix
  I HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR 0 AN YR prefixLen MKAY
  BOTH SAEM sub AN prefix, O RLY?
    YA RLY
      FOUND YR WIN
  OIC
  FOUND YR FAIL
IF U SAY SO

BTW ... more functions ...
```

### Smart Injection

Like array operations and slice, only inject functions that are used:

```javascript
// In transform.js
let needsIndexOf = false;
let needsStartsWith = false;
// ... detect usage ...

if (needsIndexOf || needsStartsWith) {
  const runtimeOptions = {
    indexOf: needsIndexOf,
    startsWith: needsStartsWith,
    // ...
  };
  output = injectStringOps(output, runtimeOptions);
}
```

## Acceptance Criteria

After EPIC-007:
- [ ] All 8 string operations implemented and tested
- [ ] Functions available in LULCODE programs via `I IZ funcName YR ... MKAY`
- [ ] Smart injection (only includes used functions)
- [ ] Test suite demonstrates pattern matching capabilities
- [ ] Ready for use in self-hosted transpiler (EPIC-008)

## Timeline

**Week 1**: Stories 007.1-007.4 (design + implement all 8 functions)  
**Week 2**: Stories 007.5-007.6 (integration + testing)

**Total**: ~2 weeks

## Success Metrics

**Phase 1**: All 8 functions implemented ✅  
**Phase 2**: Test suite passing (pattern matching) ✅  
**Phase 3**: Used in self-hosted transpiler (EPIC-008) ✅

## Next EPIC

After EPIC-007 → **EPIC-008: Self-Hosted Transpiler**

---

**Epic Status**: Ready to start  
**First Story**: 007.1 - Design String Operations API  
**Blocking For**: Self-hosting (EPIC-008)
