# LULCODE Self-Hosting Roadmap

**Goal**: Build a LULCODE-to-LOLCODE transpiler written in LULCODE  
**Date**: 2026-05-20  
**Status**: Planning Phase

## Strategy: Start Simple, Iterate

We don't need to replicate the full JavaScript transpiler. Instead, build a **minimal viable transpiler** that proves the concept and grows over time.

## Phase 1: Line-by-Line Transformer (MVP)

**Goal**: Transform simple LULCODE patterns without regex

**Features to Support** (in order of difficulty):

### Tier 1: Simple String Replacement (Week 1)
1. **VAR declarations**: `VAR x` → `I HAS A x`
2. **Assignment**: `x = 5` → `x R 5`
3. **BREAK**: `BREAK` → `GTFO`
4. **Comments**: Pass through `BTW` unchanged

**Why these?**: Exact string matching, no parsing needed

### Tier 2: Basic Pattern Matching (Week 2)
5. **VAR with initialization**: `VAR x ITZ 5` → `I HAS A x ITZ 5`
6. **Multiple VAR**: `VAR x, y, z` → three `I HAS A` lines
7. **Comparison operators**: `x == y` → `BOTH SAEM x AN y`
8. **Logical operators**: `x && y` → `BOTH OF x AN y`

**Why these?**: Simple pattern detection using string operations

### Tier 3: Line Context Patterns (Week 3)
9. **BUKKIT string access**: `arr["key"]` → `arr'Z key`
10. **Array numeric access**: `arr[0]` → `arr'Z __0`
11. **String interpolation**: `"{x}"` → `":{x}"`

**Why these?**: Need to detect patterns within lines

### Tier 4: Multi-Line Structures (Week 4)
12. **IF/ELIF/ELSE blocks**: Track state across lines
13. **FOR loops**: Convert to `IM IN YR`
14. **FOREACH loops**: Generate array iteration code

**Why these?**: Require tracking block depth and state

## Architecture: What We Have vs What We Need

### Available in LULCODE:
- ✅ Arrays (store lines, patterns)
- ✅ String operations (SPLIT, slice, interpolation)
- ✅ FOREACH iteration
- ✅ String comparison and manipulation
- ✅ Functions (define transformation logic)
- ✅ File I/O (read/write via LOLCODE)

### Missing (but can work around):
- ❌ Regular expressions → Use exact string matching + manual parsing
- ❌ String replace with patterns → Loop through array, check each line
- ❌ Complex parsing → Build simple line-by-line state machine

## Implementation Plan

### Step 1: File I/O Foundation
**Goal**: Read .lul file, output .lol file

```lulcode
HAI 1.2

BTW Read input file line by line
I HAS A input ITZ GIMMEH
BTW (In reality, need FILE I/O - check LCI support)

BTW Process each line
VAR lines ITZ SPLIT input BY "\n"
VAR output ITZ AN ARRAY

FOREACH line IN lines
  BTW Transform line
  VAR transformed ITZ I IZ transform YR line MKAY
  PUSH transformed TO output
END

BTW Output result
FOREACH result IN output
  VISIBLE result
END

KTHXBYE
```

### Step 2: Simple Transform Function
**Goal**: Transform one line of LULCODE to LOLCODE

```lulcode
HOW IZ I transform YR line
  BTW Check for VAR declaration
  I HAS A result ITZ line
  
  BTW Pattern: "VAR x" -> "I HAS A x"
  I HAS A hasVAR ITZ I IZ startsWith YR line AN YR "VAR " MKAY
  hasVAR, O RLY?
    YA RLY
      BTW Extract variable name after "VAR "
      I HAS A varName ITZ line[4:]  BTW Skip "VAR "
      result R "I HAS A {varName}"
  OIC
  
  BTW Check for BREAK
  BOTH SAEM line AN "BREAK", O RLY?
    YA RLY
      result R "GTFO"
  OIC
  
  FOUND YR result
IF U SAY SO
```

### Step 3: Pattern Detection Functions

Build helper functions for common tasks:

```lulcode
BTW Check if line starts with pattern
HOW IZ I startsWith YR str AN YR prefix
  I HAS A len ITZ LENGZ OF prefix
  I HAS A sub ITZ str[0:len]
  BOTH SAEM sub AN prefix, O RLY?
    YA RLY
      FOUND YR WIN
  OIC
  FOUND YR FAIL
IF U SAY SO

BTW Check if line contains pattern
HOW IZ I contains YR str AN YR pattern
  BTW Loop through string checking for match
  I HAS A strLen ITZ LENGZ OF str
  I HAS A patLen ITZ LENGZ OF pattern
  I HAS A i ITZ 0
  
  IM IN YR search UPPIN YR i TIL BOTH SAEM i AN DIFF OF strLen AN patLen
    I HAS A sub ITZ str[i:SUM OF i AN patLen]
    BOTH SAEM sub AN pattern, O RLY?
      YA RLY
        FOUND YR WIN
    OIC
  IM OUTTA YR search
  
  FOUND YR FAIL
IF U SAY SO

BTW Replace first occurrence
HOW IZ I replace YR str AN YR pattern AN YR replacement
  BTW Find pattern position
  I HAS A pos ITZ I IZ indexOf YR str AN YR pattern MKAY
  
  BOTH SAEM pos AN -1, O RLY?
    YA RLY
      FOUND YR str  BTW Not found, return original
  OIC
  
  BTW Build result: before + replacement + after
  I HAS A before ITZ str[0:pos]
  I HAS A afterPos ITZ SUM OF pos AN LENGZ OF pattern
  I HAS A after ITZ str[afterPos:]
  I HAS A result ITZ SMOOSH before AN replacement AN after MKAY
  
  FOUND YR result
IF U SAY SO
```

## What We Need to Implement

### Missing String Operations (EPIC-007)

To make this practical, we need:

1. **startsWith(str, prefix)** - Check string prefix
2. **endsWith(str, suffix)** - Check string suffix
3. **contains(str, pattern)** - Check if substring exists
4. **indexOf(str, pattern)** - Find position of substring
5. **replace(str, old, new)** - Replace first occurrence
6. **replaceAll(str, old, new)** - Replace all occurrences
7. **trim(str)** - Remove whitespace
8. **toLower(str)** / **toUpper(str)** - Case conversion

These are **essential for line-by-line pattern matching** without regex.

## Roadmap Timeline

### Week 1: String Operations Library (EPIC-007)
- Implement 8 core string functions
- Test with examples
- Document usage

### Week 2: Minimal Transpiler (Tier 1)
- File I/O (read lines from file)
- Transform VAR, =, BREAK, comments
- Output valid LOLCODE

### Week 3: Pattern Matching (Tier 2-3)
- VAR with initialization
- Operators (==, &&, etc.)
- BUKKIT access patterns
- String interpolation

### Week 4: Multi-Line Structures (Tier 4)
- IF/ELIF/ELSE blocks (state machine)
- FOR loops
- FOREACH loops

### Week 5: Self-Hosting Test
- Use LULCODE transpiler to transpile itself
- Verify output is valid LOLCODE
- Identify gaps and iterate

## Success Metrics

**Phase 1 Complete**: Can transpile simple LULCODE programs (VAR, =, operators)  
**Phase 2 Complete**: Can transpile 50% of current examples/  
**Phase 3 Complete**: Can transpile itself (meta-circular transpiler)  
**Phase 4 Complete**: Output matches JavaScript transpiler 95%+

## Next Steps

1. **Start EPIC-007**: String Operations Library
2. **Story 007.1**: Design string operations API
3. **Story 007.2**: Implement core 8 functions
4. **Story 007.3**: Test with transpiler use cases

Then:
5. **EPIC-008**: Self-Hosted Transpiler
6. **Story 008.1**: File I/O and line processing
7. **Story 008.2**: Tier 1 transformations
8. **Story 008.3**: Pattern matching functions

## Key Insight

**We're not replacing the JavaScript transpiler** - we're proving LULCODE is powerful enough to transpile itself. The JavaScript version can handle the complex regex patterns, while the LULCODE version demonstrates the language's maturity.

Both can coexist:
- **JS transpiler**: Production tool (fast, feature-complete)
- **LULCODE transpiler**: Proof of concept (demonstrates language capabilities)

This is similar to:
- C compiler written in C
- Rust compiler written in Rust
- Go compiler written in Go

It's a badge of honor that proves the language is "complete enough" to be self-describing.

---

**Current Status**: Ready to start EPIC-007 (String Operations Library)  
**Next File**: `specs/EPIC-007-string-operations.md`
