# EPIC-004: First-Class Functions

**Priority**: 4 (Nice-to-Have)  
**Status**: Not Started  
**Goal**: Tier 3 - Comfortable/Productive

## Overview

Enable functions to be treated as values: stored in variables, passed as arguments, returned from other functions, and used in functional programming patterns.

## Why This Matters

Current LOLCODE functions:
- Fixed arity, must be called by name
- Cannot be passed to other functions
- No closures (functions can't access outer scope)
- No anonymous functions

With first-class functions:
```lulcode
VAR handler = FUNC(x) -> x + 1 END     BTW Anonymous function
APPLY(handler, 5)                       BTW Returns 6

VAR handlers = [onJoin, onVote, onReset]   BTW Array of functions
FOREACH h IN handlers
  CALL h
END
```

This enables:
- Callbacks for event handling
- Higher-order functions (map, filter, reduce)
- Functional programming patterns
- More flexible code architecture

## Research Phase

### Story 004.1: Research Anonymous Function Syntax
**Status**: Not Started

Design syntax for anonymous/lambda functions:
- [ ] Research syntax options:
  - `FUNC(arg1, arg2) -> expression`
  - `LAMBDA YR arg1 AN YR arg2 ... END`
  - `{|arg1, arg2| ... }` (block syntax)
- [ ] Single-expression vs multi-statement lambdas
- [ ] Consider LOLCODE flavor vs practicality
- [ ] Document relationship to named functions (`HOW IZ I`)

**Output**: Anonymous function syntax specification

### Story 004.2: Research Function Variables and Assignment
**Status**: Not Started

How to store and reference functions:
- [ ] Syntax for assigning function to variable:
  - `VAR func = FUNC(x) -> x + 1`
  - `VAR func = functionName` (reference existing function)
- [ ] Calling a function variable:
  - `func(arg)` vs `CALL func WITH arg` vs `I IZ func YR arg MKAY`
- [ ] Type system implications (function type?)
- [ ] Document transpilation challenges

**Output**: Function variable specification

### Story 004.3: Research Higher-Order Functions
**Status**: Not Started

Functions that accept/return functions:
- [ ] Design syntax for function parameters:
  - `HOW IZ I map YR bukkit AN YR func`
  - Type annotations for function parameters?
- [ ] Returning functions from functions
- [ ] Research common HOF patterns to support:
  - map, filter, reduce
  - forEach, find, some, every
- [ ] Consider if these should be built-ins or user-defined

**Output**: Higher-order function specification

### Story 004.4: Research Closures and Scope
**Status**: Not Started

Functions capturing outer scope:
- [ ] LOLCODE limitation: functions can't access outer variables
- [ ] Research closure implementation strategies:
  - Capture by value
  - Capture by reference
  - Explicit capture lists
- [ ] Transpilation challenges (LOLCODE has no closures)
- [ ] Consider if closures are MVP or future enhancement

**Output**: Closure design document

### Story 004.5: Research Partial Application and Currying
**Status**: Not Started

Advanced functional patterns:
- [ ] Partial application: `add5 = partial(add, 5)`
- [ ] Currying: `add(x)(y)` vs `add(x, y)`
- [ ] Research if these should be built-in or library functions
- [ ] Determine if this is MVP or future nice-to-have
- [ ] Document use cases in LOLCODE context

**Output**: Partial application design document

### Story 004.6: Research Transpilation Strategy
**Status**: Not Started

How to transpile first-class functions to LOLCODE:
- [ ] Challenge: LOLCODE doesn't have function values
- [ ] Options:
  - Defunctionalization (convert to data + dispatch)
  - Generate named functions with unique names
  - Extend lol-coffee VM to support function values
  - Use function-like data structures (BUKKIT with metadata)
- [ ] Consider performance and complexity tradeoffs
- [ ] Document recommended approach

**Output**: First-class function transpilation strategy

## Implementation Phase (Future)

Stories TBD after research phase completes

## Acceptance Criteria

- [ ] Anonymous functions can be defined
- [ ] Functions can be stored in variables
- [ ] Functions can be passed as arguments
- [ ] Functions can be returned from functions
- [ ] Higher-order functions work (at least map/filter)
- [ ] Closures work (if in scope)
- [ ] Transpiles correctly to LOLCODE (or extended LOLCODE)
- [ ] Enables functional programming patterns

## Design Considerations

**MVP vs Future:**
- MVP: Anonymous functions, function variables, basic HOF
- Future: Full closures, partial application, advanced patterns

**Complexity Warning:**
This is the most complex feature. May require:
- Significant transpiler work
- Extending lol-coffee VM
- Breaking changes to LOLCODE model

Consider implementing after Priorities 1-3 are stable.

## References

- Lua's first-class functions and closures
- JavaScript's function model
- Scheme's lambda and continuations
- lol-coffee function implementation: `/home/lib/Code/lolpoker/vendor/lol-coffee/src/machine.coffee`
