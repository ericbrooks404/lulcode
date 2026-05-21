# LULCODE Language Specification - Planning Document

## Purpose
Before writing the "LULCODE Language Specification Ultra Final," this document analyzes the current implementation, identifies improvements, and establishes the canonical design decisions.

---

## Current Implementation Analysis

### What We Have Built

#### 1. **BUKKIT Extensions (Dictionaries & Arrays)**
- **Bracket notation for access**: `arr[key]`, `arr[index]`
- **Bracket notation for assignment**: `arr[key] = value`
- **String keys**: `arr["name"]` → `arr'Z name`
- **Numeric keys**: `arr[0]` → `arr'Z __0` (double-underscore encoding)
- **Variable keys**: `arr[i]` → `arr'Z SRS SMOOSH "__" AN i MKAY`
- **Array literals**: `[1, 2, 3]` creates BUKKIT with `__length`, `__is_array`, `__0`, `__1`, `__2`
- **Empty array literal**: `[]` → BUKKIT with `__length ITZ 0`
- **Alternative syntax**: `ITZ AN ARRAY` → empty BUKKIT

#### 2. **Array Operations**
- **YEET value INTO arr** - Push to end
- **YOINK LAST FROM arr** - Pop from end
- **YOINK FIRST FROM arr** - Shift from start
- **IM CHECKIN YR arr FER item** - Foreach without index
- **IM CHECKIN YR arr FER item AT i** - Foreach with index
- **Block closer**: KTHX

#### 3. **String Operations**
- **String interpolation**: `"{name}"` → `":{name}"`
- **Escaped braces**: `"{{literal}}"` → `"{literal}"`
- **String slicing**: `str[start:end]`, `str[start:]`, `str[:end]`, `str[-5:]`
- **String splitting**: `UNSMOOSH str BY delim` → returns array

#### 4. **Runtime Library Functions** (auto-injected)
- **LULCODE_SLICE** - String slicing
- **LULCODE_ARRAY_PUSH** - Array push operation
- **LULCODE_ARRAY_POP** - Array pop operation
- **LULCODE_ARRAY_SHIFT** - Array shift operation
- **LULCODE_SPLIT** - String split operation
- **indexOf**, **startsWith**, **contains** - String search (for self-hosting)
- **replace**, **replaceAll** - String replacement (for self-hosting)

#### 5. **Syntactic Sugar**
- **Variable declaration**: `WTV x, y, z` → `I HAS A x; I HAS A y; I HAS A z`
- **Variable initialization**: `WTV x ITZ 5` → `I HAS A x ITZ 5`
- **Assignment operator**: `x = 5` → `x R 5`
- **Comparison operators**: `==`, `!=`, `<`, `>`, `<=`, `>=`
- **Logical operators**: `&&`, `||`

#### 6. **Control Flow Sugar**
- **Conditionals**: `ORLY condition ... KTHX` → `condition, O RLY? ... OIC`
- **Else**: `NOWAI` → `NO WAI`
- **Else-if**: `MEBE condition` → `MEBBE condition`
- **Universal closer**: `KTHX` → context-dependent (OIC, IM OUTTA YR, etc.)

---

## Design Issues & Improvements Needed

### Issue 1: Inconsistent Array/Dictionary Terminology
**Problem**: We use "arr" in examples but BUKKIT is really a dictionary-like structure. Numeric arrays are a special encoding on top.

**Decision for Spec**:
- **BUKKIT = Universal collection type** (like Lua tables)
- Can be used as dictionary (string keys)
- Can be used as array (numeric keys with `__` encoding)
- Spec should clearly explain this hybrid model

### Issue 2: Missing Array Length Accessor
**Problem**: Users must access `arr'Z __length` directly. No sugar for `.length` equivalent.

**Options**:
1. Keep as-is (`arr'Z __length`) - explicit but verbose
2. Add `LENGZ OF arr` for arrays (currently only for strings)
3. Add `arr.length` sugar that transpiles to `arr'Z __length`

**Decision**: Keep as-is for v1.0. Arrays are a BUKKIT encoding, and `'Z` is the standard accessor. Adding special-case sugar here creates inconsistency.

### Issue 3: No Array Concatenation / Spread
**Problem**: Can't easily merge arrays or spread elements.

**For Future**: Could add `SMOOSH arr1 AN arr2 MKAY` for arrays (currently strings only).
**Decision**: Not in v1.0 spec. Defer to future version.

### Issue 4: String Operations Not Accessible via Sugar
**Problem**: String ops like `indexOf`, `replace` are function calls, not operators.

**Current**: Must call `indexOf str pattern` (implicit call style)
**Alternative**: Could add `str.indexOf(pattern)` sugar

**Decision**: Keep function call style for v1.0. Consistency with LOLCODE function call convention.

### Issue 5: Operator Precedence Undefined
**Problem**: What happens with `x == y && z > 5`? Order of evaluation unclear.

**Decision**: Document that operators are processed left-to-right, same line only. Complex expressions should use explicit LOLCODE grouping or parentheses (if we add them).

### Issue 6: Variable Scope Not Documented
**Problem**: LULCODE inherits LOLCODE's scope rules but doesn't document them.

**Decision**: Reference LOLCODE 1.2 spec for scope rules. LULCODE doesn't change scoping.

### Issue 7: KTHX Context Resolution
**Problem**: How does transpiler know which LOLCODE closer to use?

**Current Implementation**: Pattern matching on context (ORLY → OIC, IM IN YR → IM OUTTA YR)

**Decision**: Document the algorithm clearly in spec. This is a key transpilation rule.

### Issue 8: Runtime Library Namespace Pollution
**Problem**: Generated functions like `LULCODE_SLICE` could conflict with user code.

**Decision**: Document the reserved namespace. Convention: `LULCODE_*` prefix is reserved. Users should not define functions with this prefix.

### Issue 9: Comments Don't Pass Through
**Problem**: BTW comments are preserved, but are they handled correctly in all contexts?

**Current**: Comments are extracted, processed, then restored. Seems to work.

**Decision**: Document that comments are preserved. Implementation detail (extraction) doesn't need to be in spec.

### Issue 10: No Multi-dimensional Arrays
**Problem**: Can you do `arr[0][0]`?

**Current**: Not tested. Probably doesn't work cleanly.

**Decision**: Document as "not supported in v1.0". Would require recursive bracket resolution.

---

## Canonical Language Features for Spec

### Core Principle
**LULCODE = LOLCODE 1.2 + Usability Extensions**

All valid LOLCODE 1.2 is valid LULCODE. LULCODE only adds:
1. Bracket notation for BUKKIT
2. Array literals and operations
3. String enhancements (interpolation, slicing, splitting)
4. Syntactic sugar (WTV, ORLY, KTHX, operators)
5. Runtime library (auto-injected)

### Language Goals
1. **Backward Compatible**: Run any LOLCODE 1.2 program
2. **Ergonomic**: Reduce verbosity for common operations
3. **Transparent**: Transpilation rules should be obvious
4. **Practical**: Enable real applications (not just toys)

---

## Specification Structure

### Proposed Outline

```
LULCODE Language Specification Ultra Final
Version 1.0

1. Introduction
   1.1 What is LULCODE?
   1.2 Relationship to LOLCODE 1.2
   1.3 Design Philosophy
   1.4 Transpilation Model

2. Lexical Structure
   2.1 Tokens
   2.2 Keywords
   2.3 Identifiers
   2.4 Literals
   2.5 Operators
   2.6 Comments

3. Types and Values
   3.1 LOLCODE Base Types (inherited)
   3.2 BUKKIT (Collections)
   3.3 Arrays (BUKKIT encoding)
   3.4 Type Coercion (inherited from LOLCODE)

4. Variables and Declarations
   4.1 WTV Declaration
   4.2 Initialization
   4.3 Multiple Declarations
   4.4 Scope (inherited from LOLCODE)

5. Operators
   5.1 Assignment (=)
   5.2 Comparison (==, !=, <, >, <=, >=)
   5.3 Logical (&&, ||)
   5.4 Operator Precedence
   5.5 Transpilation Rules

6. Collections (BUKKIT)
   6.1 BUKKIT Type
   6.2 Dictionary Usage (String Keys)
   6.3 Array Usage (Numeric Keys)
   6.4 Bracket Notation
   6.5 Array Literals
   6.6 Access and Assignment

7. Array Operations
   7.1 YEET INTO (Push)
   7.2 YOINK LAST FROM (Pop)
   7.3 YOINK FIRST FROM (Shift)
   7.4 IM CHECKIN YR (Foreach)
   7.5 Array Length

8. String Operations
   8.1 String Interpolation
   8.2 Escaped Braces
   8.3 String Slicing
   8.4 String Splitting (UNSMOOSH)

9. Control Flow
   9.1 ORLY (Conditionals)
   9.2 NOWAI (Else)
   9.3 MEBE (Else-if)
   9.4 KTHX (Universal Closer)
   9.5 Loop Constructs (inherited from LOLCODE)

10. Runtime Library
    10.1 Auto-injection Mechanism
    10.2 Reserved Namespace (LULCODE_*)
    10.3 String Functions
    10.4 Array Functions
    10.5 Function Reference

11. Transpilation Rules
    11.1 Transformation Order
    11.2 Context-dependent Closers
    11.3 String Extraction/Restoration
    11.4 Bracket Resolution
    11.5 Operator Expansion

12. Compatibility and Limitations
    12.1 LOLCODE 1.2 Compatibility
    12.2 Known Limitations
    12.3 Future Extensions

13. Examples
    13.1 Hello World
    13.2 Arrays and Loops
    13.3 String Manipulation
    13.4 Real-world Program

Appendices
A. Complete Grammar (BNF)
B. Keyword Reference
C. Transpilation Examples
D. Migration Guide (LOLCODE → LULCODE)
```

---

## Key Decisions for Spec

### Decision Matrix

| Feature | Status | V1.0 Spec | Future |
|---------|--------|-----------|--------|
| Bracket notation | ✅ Implemented | ✅ Include | - |
| Array literals `[]` | ✅ Implemented | ✅ Include | - |
| String interpolation | ✅ Implemented | ✅ Include | - |
| String slicing | ✅ Implemented | ✅ Include | - |
| String splitting | ✅ Implemented | ✅ Include | - |
| WTV declarations | ✅ Implemented | ✅ Include | - |
| Assignment `=` | ✅ Implemented | ✅ Include | - |
| Comparison ops | ✅ Implemented | ✅ Include | - |
| Logical ops | ✅ Implemented | ✅ Include | - |
| ORLY conditionals | ✅ Implemented | ✅ Include | - |
| KTHX closer | ✅ Implemented | ✅ Include | - |
| Array operations | ✅ Implemented | ✅ Include | - |
| FOREACH loops | ✅ Implemented | ✅ Include | - |
| Runtime library | ✅ Implemented | ✅ Include | - |
| Multi-dim arrays | ❌ Not implemented | ❌ Exclude | ✅ Consider |
| Array concat/spread | ❌ Not implemented | ❌ Exclude | ✅ Consider |
| Method syntax `.method()` | ❌ Not implemented | ❌ Exclude | ✅ Consider |
| Object-oriented features | ❌ Not implemented | ❌ Exclude | ✅ Defer to v2 |
| First-class functions | ❌ Not implemented | ❌ Exclude | ✅ EPIC-004 |
| Pattern matching | ❌ Not implemented | ❌ Exclude | ✅ Future |

### Reserved Keywords

**New Keywords** (added by LULCODE):
- WTV
- ORLY (used differently than LOLCODE)
- NOWAI
- MEBE
- KTHX
- YEET
- YOINK
- UNSMOOSH
- INTO
- LAST
- FIRST
- FER
- AT

**Reserved Identifiers**:
- LULCODE_* (function namespace)
- __length, __is_array, __0, __1, etc. (array metadata)

---

## Grammar Improvements

### Current Implementation Issues

1. **Regex-based**: Not a real parser, uses regex pattern matching
2. **Order-dependent**: Transformations must happen in specific order
3. **Limited lookahead**: Can't handle complex nested structures well
4. **No AST**: Directly transforms strings

### For Spec

- Define formal grammar independent of implementation
- Grammar should describe LULCODE syntax, not transpilation process
- Implementation can remain regex-based (it works!)
- Future implementations could build proper parser from grammar

### Proposed Grammar Notation

Use **Extended Backus-Naur Form (EBNF)** notation:

```ebnf
program = "HAI" version line-break statement* "KTHXBYE" ;
statement = declaration | assignment | control-flow | expression ;
declaration = "WTV" identifier-list initialization? ;
identifier-list = identifier ("," identifier)* ;
initialization = "ITZ" expression ;
```

---

## Example Improvements to Document

### Example 1: Clear Transpilation Chain

**Input (LULCODE)**:
```lulcode
WTV nums ITZ [1, 2, 3]
IM CHECKIN YR nums FER num AT i
  VISIBLE "Item {i}: {num}"
KTHX
```

**Output (LOLCODE)**:
```lolcode
I HAS A nums ITZ A BUKKIT
nums HAS A __length ITZ 3
nums HAS A __is_array ITZ WIN
nums HAS A __0 ITZ 1
nums HAS A __1 ITZ 2
nums HAS A __2 ITZ 3
I HAS A i ITZ 0
I HAS A __foreach_len_1 ITZ nums'Z __length
IM IN YR __foreach_loop_1 UPPIN YR i TIL BOTH SAEM i AN __foreach_len_1
  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN i MKAY
  I HAS A num ITZ nums'Z SRS __foreach_key_1
  VISIBLE "Item :{i}: :{num}"
IM OUTTA YR __foreach_loop_1
```

**Spec should show this level of detail** for each transformation.

---

## Next Steps

1. Write formal specification document
2. Create comprehensive examples
3. Review implementation against spec
4. Update implementation to match spec exactly
5. Add any missing features identified during spec writing

---

## Questions to Resolve Before Finalizing Spec

### Q1: Should LULCODE support comments in new syntax?
- Current: Only BTW (single-line)
- LOLCODE also has: OBTW...TLDR (multi-line)
- Decision: **Support both, document preservation behavior**

### Q2: Should KTHX be required or can users still use OIC/IM OUTTA YR?
- Current: KTHX is sugar, users can use underlying closers
- Decision: **KTHX is recommended, but LOLCODE closers still work** (backward compat)

### Q3: Error handling - what happens on invalid syntax?
- Current: Regex fails silently or produces garbage
- Decision: **Document expected behavior, note implementation may vary**

### Q4: Line continuation - how to handle long lines?
- Current: LOLCODE uses `...` for continuation
- LULCODE: Inherited, document as-is

### Q5: Operator associativity?
- `x && y || z` - how does this parse?
- Decision: **Left-to-right, single line only. Complex expressions need explicit grouping**

---

## Specification Writing Guidelines

1. **Be Prescriptive**: Say what the language does, not what the implementation does
2. **Be Complete**: Cover every feature, every edge case
3. **Be Clear**: Use examples liberally
4. **Be Formal**: Include grammar, not just prose
5. **Be Practical**: Show real use cases
6. **Be Honest**: Document limitations and future work

---

## Implementation Validation Checklist

After spec is written, validate implementation:

- [ ] All spec features implemented
- [ ] All examples in spec work
- [ ] All tests match spec behavior
- [ ] Grammar is parseable
- [ ] Transpilation rules are correct
- [ ] Reserved keywords/identifiers respected
- [ ] Error cases handled
- [ ] Edge cases covered

---

**Document Status**: Planning Complete ✅  
**Next**: Write LULCODE Language Specification Ultra Final
