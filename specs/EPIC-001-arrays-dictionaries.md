# EPIC-001: Arrays and Dictionaries (BUKKIT Implementation)

**Priority**: 1 (Highest)  
**Status**: Not Started  
**Goal**: Tier 2 - Genuinely Useful

## Overview

Implement arrays and dictionaries using the reserved BUKKIT type. This is the most requested feature in the LOLCODE community (GitHub issue #11 since 2018) and would eliminate ~40% of string manipulation workarounds in real-world code.

## Why This Matters

Real-world LOLCODE (like game.lol) currently manages structured data as delimited strings:
```lolcode
VOTES R SMOOSH VOTES NAME "::?," MKAY    BTW Manual string building
VOTES R SMOOSH VOTES NAME "::" CARD "," MKAY
```

With BUKKIT, this becomes:
```lulcode
VOTES[NAME] R CARD    BTW Direct dictionary access
```

## Research Phase

### Story 001.1: Research BUKKIT Syntax Proposals
**Status**: ✅ Complete (2026-05-15)

Research how BUKKIT should work in LULCODE:
- [x] Review GitHub issue #11 on lolcode-spec for community proposals
- [x] Examine LCI's BUKKIT implementation (if available)
- [x] Study implementations that have BUKKIT support
- [x] Document proposed syntax patterns:
  - Creation: `I HAS A arr ITZ A BUKKIT`
  - Access: `arr'Z key` vs `arr[key]` vs other
  - Assignment: `PUTZ value INTA arr AT key`
  - Iteration: How to loop over BUKKIT contents

**Output**: ✅ [`specs/research/001.1-bukkit-design.md`](../research/001.1-bukkit-design.md)

**Key Decisions Made**:
1. **Hybrid semantics**: BUKKIT supports both array (numeric) and dictionary (string) keys
2. **Bracket sugar**: `arr[key]` transpiles to `arr'Z key` or `arr'Z SRS index`
3. **Standard creation**: `I HAS A arr ITZ A BUKKIT` (LCI-compatible)
4. **Multiple access patterns**: Support both `'Z` (standard) and `[...]` (sugar)
5. **FOREACH sugar**: Future enhancement for iteration (EPIC-003)

### Story 001.2: Research Array vs Dictionary Semantics
**Status**: ✅ Complete (2026-05-15) - Resolved in Story 001.1

Determine if BUKKIT should be:
- [x] Pure arrays (integer-indexed only) - Rejected
- [x] Pure dictionaries (string-keyed only) - Rejected
- [x] **Hybrid (both, like Lua tables or PHP arrays)** - ✅ CHOSEN
- [x] Research Lua's table implementation (universal data structure)
- [x] Research PHP's array implementation (auto-incrementing + associative)
- [x] Document tradeoffs and recommendation

**Output**: ✅ See Decision 1 in [`specs/research/001.1-bukkit-design.md`](../research/001.1-bukkit-design.md)

**Decision**: Hybrid array/dictionary following Lua-table semantics, matching LCI's implementation

### Story 001.3: Research Transpilation Strategy
**Status**: Not Started

How to transpile BUKKIT to LOLCODE (which doesn't have it):
- [ ] Option 1: Transpile to lol-coffee extensions (if they exist)
- [ ] Option 2: Transpile to string-based encoding (like current game.lol)
- [ ] Option 3: Use LCI's CAN HAS STRING library functions
- [ ] Option 4: Extend lol-coffee to support BUKKIT natively
- [ ] Document pros/cons of each approach

**Output**: Transpilation strategy recommendation

### Story 001.4: Research Built-in BUKKIT Operations
**Status**: Not Started

What operations should BUKKIT support:
- [ ] Length/size: `LENGZ OF bukkit`
- [ ] Key existence check: `bukkit HAS KEY`
- [ ] Key deletion: `REMOVE KEY FROM bukkit`
- [ ] Iteration: `IM IN YR LOOP THRU bukkit`
- [ ] Merge/concatenation
- [ ] Document which operations are essential vs nice-to-have

**Output**: BUKKIT operations specification

## Implementation Phase (Future)

Stories TBD after research phase completes

## Acceptance Criteria

- [ ] LULCODE can declare BUKKIT variables
- [ ] LULCODE can read/write BUKKIT elements
- [ ] LULCODE can iterate over BUKKIT contents
- [ ] Transpiles correctly to LOLCODE (or extended LOLCODE)
- [ ] game.lol can be refactored using BUKKIT with significant simplification
- [ ] Backward compatible: existing LOLCODE still works

## References

- [GitHub Issue #11: Possible BUKKIT Implementation](https://github.com/justinmeza/lolcode-spec/issues/11)
- [LOLCODE 1.2 Spec](https://github.com/justinmeza/lolcode-spec/blob/master/v1.2/lolcode-spec-v1.2.md)
- game.lol: `/home/lib/Code/lolpoker/public/game.lol`
