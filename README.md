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

**Phase**: Distribution & Packaging (EPIC-005)  
**Progress**: 
- ✅ EPIC-001: Arrays/Dictionaries (BUKKIT) - COMPLETE
- ✅ EPIC-002: String Manipulation - COMPLETE (Core Features)
- ✅ EPIC-003: Syntactic Sugar - COMPLETE
- 🔄 EPIC-005: Distribution & Packaging - IN PROGRESS
  - ✅ Story 005.1: CLI Design complete
  - 🔄 Story 005.7: Enhanced CLI implementation (in progress)

**Recent Milestones**:
- **2026-05-19**: ✅ **Syntactic Sugar Complete (EPIC-003)**
  - VAR declarations: `VAR x, y, z` → 60% reduction
  - Modern operators: `=`, `==`, `!=`, `&&`, `||`, `>=`, `<=`
  - Clean conditionals: `IF/ELIF/ELSE` blocks
  - Readable loops: `FOR/WHILE/LOOP` statements
  - All 30 tests passing!
  
- **2026-05-19**: ✅ **Enhanced CLI Designed (Story 005.1)**
  - Professional command structure (compile, run, init, check)
  - Watch mode for development
  - Colored output and progress indicators
  - LCI integration for execution

- **2026-05-15**: ✅ **BUKKIT Transpiler Working (EPIC-001)**
  - Bracket notation `arr[key]` → `arr'Z key` transpilation
  - String interpolation: `{var}` syntax
  - String slice: `str[start:end]` support

## Getting Started

### Installation

See [INSTALLATION.md](INSTALLATION.md) for detailed installation instructions.

**Quick start**:
```bash
cd ~/Code/LULCODE
npm install          # Install CLI dependencies
./install.sh         # Install LCI interpreter (optional, for --run)
npm link            # Make lulcode command globally available
```

### Usage

**Compile LULCODE to LOLCODE**:
```bash
lulcode compile input.lul -o output.lol
lulcode compile input.lul > output.lol      # Stdout
```

**Run directly** (transpile + execute):
```bash
lulcode run program.lul
```

**Watch mode** (auto-reload on changes):
```bash
lulcode compile program.lul --watch --run
```

**Initialize new project**:
```bash
lulcode init my-project
cd my-project
lulcode run main.lul
```

**Check syntax**:
```bash
lulcode check program.lul
```

**Get help**:
```bash
lulcode --help
lulcode compile --help
```

### Example

**Input (LULCODE)**: `example.lul`
```lulcode
HAI 1.2
VAR players ITZ A BUKKIT
players["Alice"] = 100
players["Bob"] = 85

IF players["Alice"] >= 100
  VISIBLE "Alice wins with {players["Alice"]} points!"
ELSE
  VISIBLE "Alice has {players["Alice"]} points"
END

KTHXBYE
```

**Output (LOLCODE)**: `example.lol`
```lolcode
HAI 1.2
I HAS A players ITZ A BUKKIT
players'Z Alice R 100
players'Z Bob R 85

BOTH SAEM players'Z Alice AN BIGGR OF players'Z Alice AN 100, O RLY?
  YA RLY
  VISIBLE "Alice wins with :{players'Z Alice} points!"
  NO WAI
  VISIBLE "Alice has :{players'Z Alice} points"
OIC

KTHXBYE
```

**Run it**:
```bash
lulcode run example.lul
# Output: Alice wins with 100 points!
```

### Running Tests

```bash
node tests/transform.test.js
```

## References

- [LOLCODE 1.2 Specification](https://github.com/justinmeza/lolcode-spec/blob/master/v1.2/lolcode-spec-v1.2.md)
- [lol-coffee LOLCODE Interpreter](https://github.com/replit-archive/lol-coffee)
- [LCI - Official LOLCODE Interpreter](https://github.com/justinmeza/lci)
- [BUKKIT Implementation Discussion](https://github.com/justinmeza/lolcode-spec/issues/11)

## License

(TBD)
