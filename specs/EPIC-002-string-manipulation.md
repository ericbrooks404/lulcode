# EPIC-002: String Manipulation Enhancements

**Priority**: 2  
**Status**: Not Started  
**Goal**: Tier 2 - Genuinely Useful

## Overview

Enhance string handling beyond basic concatenation (SMOOSH). Real-world LOLCODE uses SMOOSH extensively (22 times in game.lol), making code verbose and hard to read.

## Why This Matters

Current LOLCODE string operations:
```lolcode
VISIBLE SMOOSH "WIRE JOIN " NAME MKAY               BTW 5 tokens for simple concat
VISIBLE SMOOSH "STATE revealed=" RTXT " votes=" VOTES MKAY   BTW Very verbose
```

With LULCODE enhancements:
```lulcode
VISIBLE "WIRE JOIN {NAME}"                          BTW String interpolation
VISIBLE "STATE revealed={RTXT} votes={VOTES}"       BTW Clean and readable
```

## Research Phase

### Story 002.1: Research String Interpolation Syntax
**Status**: Not Started

Design string interpolation to replace SMOOSH:
- [ ] Research interpolation syntax options:
  - `"text {VAR} more"` (common in many languages)
  - `"text :{VAR}: more"` (LOLCODE-style with colons)
  - `"text ${VAR} more"` (shell/JS style)
- [ ] Consider how to escape literal braces/syntax
- [ ] Document how LOLCODE's existing `:{VAR}:` escape works in strings
- [ ] Ensure backward compatibility with LOLCODE strings

**Output**: String interpolation syntax specification

### Story 002.2: Research String Split Operation
**Status**: Not Started

Add ability to split strings into arrays:
- [ ] Research split syntax options:
  - `SPLIT str BY delimiter` → BUKKIT
  - `str'Z SPLIT delimiter` → BUKKIT
- [ ] Determine edge cases (empty string, no match, etc.)
- [ ] Consider if this requires BUKKIT (EPIC-001) to be implemented first
- [ ] Document transpilation strategy

**Output**: Split operation specification

### Story 002.3: Research String Substring/Slice Operation
**Status**: Not Started

Add substring extraction beyond single-character AT:
- [ ] Review lol-coffee's `AT` operator (single char access)
- [ ] Research substring syntax options:
  - `SUBSTRING str FROM start TO end`
  - `str'Z SLICE start end`
  - `str AT start LENGZ len`
- [ ] Handle negative indices (end-relative)
- [ ] Document relationship to existing `AT` operator

**Output**: Substring operation specification

### Story 002.4: Research Additional String Operations
**Status**: Not Started

Identify other useful string operations:
- [ ] Trim/strip whitespace
- [ ] Case conversion (uppercase/lowercase)
- [ ] String replacement/substitution
- [ ] Pattern matching (regex?)
- [ ] Padding/alignment
- [ ] Determine which are MVP vs future enhancements
- [ ] Check if LCI's STRING library provides any of these

**Output**: Extended string operations wishlist

### Story 002.5: Research Transpilation for String Operations
**Status**: Not Started

How to transpile enhanced strings to LOLCODE:
- [ ] String interpolation → series of SMOOSH operations
- [ ] Split → manual parsing with loops + BUKKIT
- [ ] Substring → combination of AT operations
- [ ] Consider using LCI's `CAN HAS STRING` library if available
- [ ] Document complexity and edge cases

**Output**: String operation transpilation strategy

## Implementation Phase (Future)

Stories TBD after research phase completes

## Acceptance Criteria

- [ ] String interpolation works in LULCODE
- [ ] game.lol's 22 SMOOSH operations can be replaced with cleaner syntax
- [ ] Split operation available (depends on BUKKIT)
- [ ] Substring operation available
- [ ] All operations transpile correctly to LOLCODE
- [ ] Backward compatible: LOLCODE strings still work

## References

- lol-coffee string handling: `/home/lib/Code/lolpoker/vendor/lol-coffee/src/parser.coffee`
- game.lol string usage: `/home/lib/Code/lolpoker/public/game.lol`
- LOLCODE escape sequences: spec section on YARN type
