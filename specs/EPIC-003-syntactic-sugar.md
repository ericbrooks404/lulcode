# EPIC-003: Syntactic Sugar

**Priority**: 3  
**Status**: Not Started  
**Goal**: Tier 3 - Comfortable/Productive

## Overview

Add shorthand syntax to reduce verbosity and improve code readability. LOLCODE's verbose syntax is charming but impractical for real applications.

## Why This Matters

Current LOLCODE verbosity:
```lolcode
I HAS A NAME                          BTW 4 tokens just to declare
I HAS A CARD                          
I HAS A RTXT ITZ "NO"                 BTW 6 tokens to declare + assign

BOTH SAEM VERB AN "LOCAL-JOIN", O RLY?    BTW 7 tokens for if statement
  YA RLY
    ...
  OIC
```

With syntactic sugar:
```lulcode
VAR name, card                        BTW Compact declaration
VAR rtxt = "NO"                       BTW Combined declare + assign

IF verb == "LOCAL-JOIN"               BTW Readable conditional
  ...
END
```

## Research Phase

### Story 003.1: Research Variable Declaration Shorthand
**Status**: ✅ Complete (2026-05-19)

Design shorter variable syntax:
- [x] Researched 6 options (VAR, LET, HAS, DECL, CAN HAS, Hybrid)
- [x] Chose **VAR** keyword (63% char reduction, widely recognized)
- [x] Multiple declarations: `VAR x, y, z` → 3x `I HAS A`
- [x] Combined declare+assign: `VAR age ITZ 30`
- [x] Maintained backward compatibility with `I HAS A`
- [x] Considered type hints (deferred to future EPIC)
- [x] Documented transpilation strategy

**Output**: ✅ [`specs/research/003.1-variable-declaration-design.md`](../research/003.1-variable-declaration-design.md)

**Key Design**:
- Syntax: `VAR name`, `VAR x, y, z`, `VAR age ITZ 30`
- Transpiles to: `I HAS A name`, etc.
- Impact: 55-60% reduction in declaration code (17x in game.lol)
- Backward compatible: `I HAS A` still works

### Story 003.2: Research Conditional Statement Shorthand
**Status**: Not Started

Design cleaner conditional syntax:
- [ ] Research alternatives to `O RLY?` / `YA RLY` / `NO WAI`:
  - `IF condition ... END`
  - `IF condition THEN ... ELSE ... END`
  - Keep LOLCODE style: `O RLY? ... NOWAI ... KTHX`?
- [ ] Research alternatives to `BOTH SAEM x AN y`:
  - Infix operators: `x == y`, `x IS y`
  - Keep prefix but shorter: `SAME x y`, `EQ x y`
- [ ] Consider `MEBBE` (else-if) handling
- [ ] Document transpilation strategy

**Output**: Conditional syntax specification

### Story 003.3: Research Assignment Operator Shorthand
**Status**: Not Started

Design shorter assignment syntax:
- [ ] Current: `MYVAR R VALUE` (R = "are")
- [ ] Research alternatives:
  - `MYVAR = VALUE` (common infix)
  - `MYVAR := VALUE` (Pascal-style)
  - Keep `R` but allow `=` as alternative?
- [ ] Consider compound assignments: `+=`, `-=`, etc.
- [ ] Maintain backward compatibility with `R`

**Output**: Assignment operator specification

### Story 003.4: Research Loop Syntax Shorthand
**Status**: Not Started

Design cleaner loop syntax:
- [ ] Current: `IM IN YR loop UPPIN var ... IM OUTTA YR loop`
- [ ] Research alternatives:
  - `FOR var FROM start TO end ... END`
  - `WHILE condition ... END`
  - `LOOP ... END` (infinite)
  - `FOREACH item IN bukkit ... END` (requires BUKKIT)
- [ ] Consider keeping LOLCODE style vs making it practical
- [ ] Document transpilation to `IM IN YR` syntax

**Output**: Loop syntax specification

### Story 003.5: Research Function Syntax Shorthand
**Status**: Not Started

Design cleaner function syntax:
- [ ] Current: `HOW IZ I funcname YR arg1 AN YR arg2 ... IF U SAY SO`
- [ ] Research alternatives:
  - `FUNC funcname(arg1, arg2) ... END`
  - `DEF funcname YR arg1, YR arg2 ... END`
  - Keep LOLCODE flavor but simplify
- [ ] Consider return value syntax beyond `FOUND YR`
- [ ] Document transpilation strategy

**Output**: Function syntax specification

### Story 003.6: Research Comment Syntax
**Status**: Not Started

Consider alternative comment styles:
- [ ] Current: `BTW single line`, `OBTW ... TLDR multi-line`
- [ ] Research if we should add:
  - `// single line` (common)
  - `/* multi line */` (common)
  - Keep BTW/OBTW for LOLCODE flavor?
- [ ] Decide: syntax sugar or strict LOLCODE compatibility?

**Output**: Comment syntax recommendation

## Implementation Phase (Future)

Stories TBD after research phase completes

## Acceptance Criteria

- [ ] Shorter variable declarations work
- [ ] Cleaner conditionals available (still transpile to O RLY?)
- [ ] Alternative assignment operators work
- [ ] Improved loop syntax available
- [ ] Function syntax improvements work
- [ ] game.lol can be significantly shortened using sugar
- [ ] Backward compatible: all LOLCODE syntax still works
- [ ] LULCODE feels more practical without losing LOLCODE charm

## Design Philosophy

Balance two goals:
1. **Practical**: Make LULCODE comfortable for real work
2. **Charming**: Preserve LOLCODE's whimsical character

## References

- game.lol verbosity: `/home/lib/Code/lolpoker/public/game.lol`
- Lua's minimal syntax philosophy
- Python's readability principles
