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
**Status**: ✅ Complete (2026-05-15)

Design string interpolation to replace SMOOSH:
- [x] Research interpolation syntax options
- [x] Discovered LOLCODE already has `:{VAR}` syntax
- [x] Chose LULCODE sugar: `{VAR}` → `:{VAR}`
- [x] Implemented escape handling: `{{` → `{`, `}}` → `}`
- [x] Ensured backward compatibility

**Output**: ✅ [`specs/research/002.1-string-interpolation.md`](../research/002.1-string-interpolation.md)

**Implementation**: Working in `src/transform.js`  
**Tests**: 15/15 passing (5 new string interpolation tests)  
**Example**: `examples/string-interpolation.lul` - Tested with LCI ✅

### Story 002.2: Research String Split Operation
**Status**: ⏸️ Deferred (requires arrays from EPIC-006)

Add ability to split strings into arrays:
- [ ] Research split syntax options:
  - `SPLIT str BY delimiter` → BUKKIT
  - `str'Z SPLIT delimiter` → BUKKIT
- [ ] Determine edge cases (empty string, no match, etc.)
- [ ] Requires true arrays (EPIC-006), not just BUKKIT dictionaries
- [ ] Document transpilation strategy

**Output**: Deferred pending EPIC-006 (True Arrays)

### Story 002.3: Research String Substring/Slice Operation
**Status**: ✅ Complete (2026-05-19)

Add substring extraction beyond single-character AT:
- [x] Reviewed lol-coffee's `AT` operator (single char access)
- [x] Researched 5 syntax options (verbose, property-style, extended AT, SLICE, brackets)
- [x] Chose hybrid: LULCODE `str[start:end]` → LOLCODE inline loops
- [x] Designed negative indices support: `str[-5:]` for last 5 chars
- [x] Documented transpilation strategy (inline loops using AT)
- [x] Defined edge cases (bounds, negative indices, invalid ranges)

**Output**: ✅ [`specs/research/002.3-substring-design.md`](../research/002.3-substring-design.md)

**Key Design**:
- LULCODE syntax: `str[start:end]` (Python-style)
- Transpiles to: Character-by-character loop using `AT` operator
- Supports negative indices, optional start/end
- MVP: Inline generation, future: runtime library function

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
