# LULCODE

A superset language that transpiles to LOLCODE, adding practical features while maintaining strict backward compatibility with LOLCODE 1.2.

## Why LULCODE?

LOLCODE is a Turing-complete esoteric language with charming lolcat-inspired syntax. However, it lacks practical features that make it genuinely useful for real applications:
- No arrays or dictionaries (BUKKIT reserved but not implemented)
- Verbose string manipulation (only SMOOSH for concatenation)
- No string interpolation, split, or substring operations
- Lengthy syntax for common operations

LULCODE adds these missing features while preserving LOLCODE's whimsical character.

## Transpilation Chain

```
LULCODE (.lul) → LOLCODE (.lol) → CoffeeScript → JavaScript
```

LULCODE transpiles to valid LOLCODE 1.2, which then runs on existing LOLCODE interpreters like lol-coffee.

## Feature Goals

### Priority 1: Arrays/Dictionaries (BUKKIT)
- Most requested community feature since 2018
- Implement the reserved BUKKIT type
- Support array and dictionary operations

### Priority 2: String Manipulation
- String interpolation to replace verbose SMOOSH
- Split strings into arrays
- Substring/slice operations
- Additional string utilities

### Priority 3: Syntactic Sugar
- Shorter variable declarations
- Cleaner conditionals and loops
- More readable operators
- Reduce verbosity while keeping LOLCODE charm

### Priority 4: First-Class Functions
- Anonymous functions/lambdas
- Functions as values
- Higher-order functions
- Enable functional programming patterns

## Project Structure

```
LULCODE/
├── specs/           # EPICs and user stories for feature planning
├── src/             # Transpiler implementation
├── tests/           # Test suite
├── examples/        # Example .lul files
└── docs/            # Language specification and documentation
```

## Current Status

**Phase**: Research → Specification  
**Progress**: 
- ✅ Project structure created
- ✅ EPICs defined for all priorities
- ✅ BUKKIT research complete (Story 001.1, 001.2)
- ✅ BUKKIT design decisions made
- 🔄 BUKKIT transpilation strategy (Story 001.3)
- ⏳ Language specification (in progress)
- ⏳ Transpiler implementation (pending spec)

**Recent Milestones**:
- **2026-05-15**: Completed BUKKIT syntax research
  - Analyzed GitHub issue #11, LCI implementation, community proposals
  - Decided on hybrid array/dictionary semantics (Lua-table-style)
  - Defined bracket notation sugar: `arr[key]` → `arr'Z key`
  - See: `specs/research/001.1-bukkit-design.md`

## Getting Started

(TBD - Transpiler not yet implemented)

## References

- [LOLCODE 1.2 Specification](https://github.com/justinmeza/lolcode-spec/blob/master/v1.2/lolcode-spec-v1.2.md)
- [lol-coffee LOLCODE Interpreter](https://github.com/replit-archive/lol-coffee)
- [LCI - Official LOLCODE Interpreter](https://github.com/justinmeza/lci)
- [BUKKIT Implementation Discussion](https://github.com/justinmeza/lolcode-spec/issues/11)

## License

(TBD)
