# EPIC-006: True Arrays (Future Enhancement)

**Priority**: Low (Future)  
**Status**: Not Started  
**Goal**: Add numeric-indexed arrays separate from BUKKIT dictionaries

## Overview

BUKKIT (EPIC-001) provides dictionary/hash-map functionality with named keys. This EPIC adds true numeric-indexed arrays for sequential data.

## Why This Matters

**Current State**:
- BUKKIT = dictionary with string keys (name → value)
- Works: `arr["Alice"]`, `arr["key"]`
- Doesn't work: `arr[0]`, `arr[1]`, numeric indexing

**Use Cases for Arrays**:
- Sequential lists: `[1, 2, 3, 4, 5]`
- Iteration by index: `for i from 0 to length`
- Stack/queue operations: push, pop, shift
- Ordered collections

## LCI Limitation

**Finding** (2026-05-15): LCI's BUKKIT only supports identifier keys, NOT numeric indices.

Test result:
```lolcode
arr HAS A 0 ITZ "value"
Error: expected identifier at: 0
```

LCI cannot do numeric indexing with current BUKKIT implementation.

## Proposed Solution

### Option 1: New LOLCODE Type (if spec allows)
```lulcode
I HAS A list ITZ AN ARRAY
list PUSH "first"
list PUSH "second"
VISIBLE list AT 0
```

### Option 2: Transpile to String Encoding
```lulcode
I HAS A list ITZ [1, 2, 3]
→ transpiles to string-based array implementation
```

### Option 3: Wait for LCI Enhancement
Check if LCI's future branch or newer versions support numeric keys

### Option 4: Extend lol-coffee
Add array support to lol-coffee VM directly

## Acceptance Criteria

- [ ] Numeric indexing: `arr[0]`, `arr[1]`
- [ ] Variable indices: `arr[i]`
- [ ] Array literals: `[1, 2, 3]`
- [ ] Length operation: `LENGZ OF arr`
- [ ] Iteration by index
- [ ] Push/pop operations

## Not Started

This EPIC is for **future work**. BUKKIT (dictionaries) alone are sufficient for Tier 2 (Genuinely Useful).

Focus now on:
- EPIC-001: Complete dictionary support ✓
- EPIC-002: String manipulation (Tier 2)

## References

- EPIC-001: BUKKIT dictionaries (current)
- LCI BUKKIT findings: `docs/LCI-BUKKIT-FINDINGS.md`
- Minimal language research: Lua uses tables only, proves one structure sufficient

---

**Epic Status**: Deferred to future based on need
