# EPIC-006: True Arrays

**Priority**: 1 (Critical for Self-Hosting)  
**Status**: In Progress (2026-05-20)  
**Goal**: Add numeric-indexed arrays separate from BUKKIT dictionaries

**Why Now**: Arrays are essential for self-hosting the transpiler, which needs to store and manipulate collections with numeric indices.

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

## Stories

### Story 006.1: Array Implementation Strategy Research
**Status**: Not Started

Research and choose implementation approach:
- [ ] Evaluate Option 1: New LOLCODE type
- [ ] Evaluate Option 2: String-encoded BUKKIT keys
- [ ] Evaluate Option 3: LCI enhancement/fork
- [ ] Evaluate Option 4: lol-coffee extension
- [ ] Choose optimal approach for self-hosting goal
- [ ] Design LULCODE array syntax
- [ ] Document implementation strategy

**Output**: Implementation strategy document

### Story 006.2: Array Syntax Design
**Status**: Not Started (after 006.1)

Define LULCODE array syntax:
- Array literals: `[1, 2, 3]` or `ITZ AN ARRAY`?
- Access: `arr[index]`
- Assignment: `arr[index] = value`
- Operations: length, push, pop, shift
- Iteration patterns

**Output**: Array syntax specification

### Story 006.3: Array Transpilation Implementation
**Status**: ✅ Complete (2026-05-20)

Implement array support in transpiler:
- [x] Parse array literals - [1, 2, 3]
- [x] Transpile array access/assignment - arr[0], arr[i]
- [x] Generate metadata - __length, __is_array
- [x] Handle empty arrays - []
- [x] ITZ AN ARRAY syntax
- [x] Variable index support - runtime key generation
- [x] All tests passing (36/36)

**Output**: Working array transpilation
- Arrays transpile to BUKKIT with __n encoding
- Literal indices: arr[0] → arr'Z __0
- Variable indices: arr[i] → runtime SMOOSH
- Metadata tracking: __length, __is_array
- Examples: arrays-simple.lul, arrays-basic.lul

### Story 006.4: Array Operations Library
**Status**: Not Started (after 006.3)

Implement essential array operations:
- [ ] LENGZ OF array
- [ ] PUSH element to array
- [ ] POP from array
- [ ] SHIFT from array
- [ ] Iteration helpers

**Output**: Array operations runtime library

### Story 006.5: FOREACH Implementation
**Status**: Not Started (after 006.4)

Now that arrays exist, implement FOREACH:
- [ ] FOREACH element IN array syntax
- [ ] FOREACH index, element IN array syntax
- [ ] Transpile to LOLCODE loops

**Output**: FOREACH support for arrays

## Implementation Priority

**Phase 1: MVP** (Stories 006.1-006.3)
- Research and choose approach
- Design syntax
- Basic array support

**Phase 2: Operations** (Stories 006.4-006.5)
- Array operations library
- FOREACH loops

## Success Criteria

After EPIC-006, we should be able to:
- [ ] Use numeric-indexed arrays: `arr[0]`, `arr[1]`
- [ ] Create array literals: `[1, 2, 3]`
- [ ] Iterate over arrays with FOREACH
- [ ] Use arrays in transpiler for self-hosting

## References

- EPIC-001: BUKKIT dictionaries (current)
- LCI BUKKIT findings: `docs/LCI-BUKKIT-FINDINGS.md`
- Self-hosting requirements (transpiler needs)

---

**Epic Status**: In Progress - Story 006.1 starting
