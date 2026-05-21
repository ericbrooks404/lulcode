# LULCODE Language Specification Ultra Final
## Version 1.0

**Authors**: Eric Brooks, Claude Sonnet 4.5  
**Date**: 2026-05-20  
**Status**: Ultra Final (no really, this is it)

---

## Abstract

LULCODE is a superset of LOLCODE 1.2 that adds practical features for real-world programming while maintaining complete backward compatibility and the lolcat-inspired aesthetic. It transpiles to valid LOLCODE 1.2, which can then be executed by standard LOLCODE interpreters.

This specification defines the LULCODE language syntax, semantics, and transpilation rules. It is prescriptive: implementations MUST conform to this specification.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Lexical Structure](#2-lexical-structure)
3. [Types and Values](#3-types-and-values)
4. [Variables and Declarations](#4-variables-and-declarations)
5. [Operators](#5-operators)
6. [Collections (BUKKIT)](#6-collections-bukkit)
7. [Array Operations](#7-array-operations)
8. [String Operations](#8-string-operations)
9. [Control Flow](#9-control-flow)
10. [Runtime Library](#10-runtime-library)
11. [Transpilation Rules](#11-transpilation-rules)
12. [Compatibility and Limitations](#12-compatibility-and-limitations)
13. [Examples](#13-examples)
14. [Appendices](#appendices)

---

## 1. Introduction

### 1.1 What is LULCODE?

LULCODE (LUL + LOLCODE) is a transpiled programming language that extends LOLCODE 1.2 with modern programming features. It was created through collaborative AI-assisted development to make LOLCODE actually usable for real applications while preserving its whimsical character.

### 1.2 Relationship to LOLCODE 1.2

LULCODE is a **strict superset** of LOLCODE 1.2:
- All valid LOLCODE 1.2 programs are valid LULCODE programs
- LULCODE adds new syntax that transpiles to valid LOLCODE 1.2
- LULCODE does not modify or remove any LOLCODE 1.2 features

### 1.3 Design Philosophy

**Core Principles**:
1. **Backward Compatibility**: Never break existing LOLCODE code
2. **Ergonomic Extensions**: Reduce verbosity without losing character
3. **Transparent Transpilation**: Users should understand what LULCODE generates
4. **Practical Utility**: Enable real applications, not just toy programs
5. **Lolcat Aesthetic**: Keep the meme language vibes

### 1.4 Transpilation Model

```
┌─────────────┐
│ LULCODE     │  .lul source file
│ (.lul)      │
└──────┬──────┘
       │ Transpiler (written in JavaScript)
       ▼
┌─────────────┐
│ LOLCODE 1.2 │  .lol output file
│ (.lol)      │
└──────┬──────┘
       │ LOLCODE Interpreter (lol-coffee)
       ▼
┌─────────────┐
│ Execution   │
└─────────────┘
```

The transpiler performs **source-to-source transformation** with these properties:
- **Deterministic**: Same input always produces same output
- **Readable**: Generated LOLCODE is human-readable
- **Traceable**: Line structure is preserved where possible
- **Optimized**: No unnecessary code generation

### 1.5 Notation Conventions

In this specification:
- `MONOSPACE` indicates literal keywords or syntax
- *Italic* indicates metavariables or placeholders
- **Bold** indicates important terms or emphasis
- `→` indicates "transpiles to" or "becomes"
- Grammar uses Extended Backus-Naur Form (EBNF)

---

## 2. Lexical Structure

### 2.1 Character Set

LULCODE source files are UTF-8 encoded text. All LOLCODE 1.2 characters are supported, plus additional punctuation for new features.

### 2.2 Keywords

#### 2.2.1 Inherited from LOLCODE 1.2

All LOLCODE 1.2 keywords are valid in LULCODE:
```
HAI        KTHXBYE    BTW        OBTW       TLDR
I          HAS        A          ITZ        R
SUM        DIFF       PRODUKT    QUOSHUNT   MOD
BIGGR      SMALLR     BOTH       SAEM       DIFFRINT
WIN        FAIL       AN         OR         NOT
VISIBLE    GIMMEH     O          RLY        YA
NO         WAI        OIC        MEBBE      WTF
OMG        OMGWTF     GTFO       IM         IN
YR         UPPIN      NERFIN     TIL        WILE
OUTTA      HOW        IZ         DUZ        IF
U          SAY        SO         FOUND      SMOOSH
MAEK       IS         NOW        LENGZ      OF
NOOB       NUMBAR     NUMBR      YARN       TROOF
BUKKIT     AT
```

#### 2.2.2 LULCODE Extensions

New keywords introduced by LULCODE:

| Keyword | Purpose | Category |
|---------|---------|----------|
| `WTV` | Variable declaration ("whatever") | Declaration |
| `ORLY` | Conditional (reused from LOLCODE) | Control Flow |
| `NOWAI` | Else clause ("no way") | Control Flow |
| `MEBE` | Else-if clause ("maybe") | Control Flow |
| `KTHX` | Universal block closer | Control Flow |
| `YEET` | Add element to array | Array Ops |
| `YOINK` | Remove element from array | Array Ops |
| `INTO` | Direction for YEET | Array Ops |
| `LAST` | Target for YOINK | Array Ops |
| `FIRST` | Target for YOINK | Array Ops |
| `FROM` | Source for YOINK | Array Ops |
| `UNSMOOSH` | Split string into array | String Ops |
| `BY` | Delimiter for UNSMOOSH | String Ops |
| `CHECKIN` | Part of foreach | Control Flow |
| `FER` | Foreach variable | Control Flow |
| `AT` | Foreach index variable | Control Flow |

#### 2.2.3 Reserved Identifiers

The following identifier patterns are **reserved** and MUST NOT be used by user code:

- **`LULCODE_*`**: Reserved for runtime library functions
- **`__foreach_*`**: Reserved for foreach loop variables
- **`__length`**: Reserved array metadata
- **`__is_array`**: Reserved array metadata
- **`__0`, `__1`, `__2`, ...**: Reserved numeric array keys

### 2.3 Operators

#### 2.3.1 New Operator Symbols

LULCODE adds symbolic operators:

| Operator | Meaning | Transpiles To |
|----------|---------|---------------|
| `=` | Assignment | `R` |
| `==` | Equality | `BOTH SAEM ... AN ...` |
| `!=` | Inequality | `DIFFRINT ... AN ...` |
| `<` | Less than | `BOTH SAEM (right) AN BIGGR OF ...` |
| `>` | Greater than | `BOTH SAEM (left) AN BIGGR OF ...` |
| `<=` | Less or equal | `BOTH SAEM (right) AN BIGGR OF ...` |
| `>=` | Greater or equal | `BOTH SAEM (left) AN BIGGR OF ...` |
| `&&` | Logical AND | `BOTH OF ... AN ...` |
| `\|\|` | Logical OR | `EITHER OF ... AN ...` |
| `[...]` | Bracket notation | `'Z SRS ...` or `'Z ...` |

### 2.4 Literals

LULCODE inherits all LOLCODE literals plus array literals.

#### 2.4.1 Array Literals

**Syntax**:
```ebnf
array-literal = "[" [element-list] "]" ;
element-list = expression ("," expression)* ;
```

**Examples**:
```lulcode
[]                    BTW Empty array
[1, 2, 3]            BTW Numeric array
["a", "b", "c"]      BTW String array
[WIN, FAIL, WIN]     BTW Boolean array
```

**Semantics**: Array literals create a BUKKIT with:
- `__length` property set to element count
- `__is_array` property set to `WIN`
- Elements stored with numeric keys `__0`, `__1`, etc.

### 2.5 Comments

LULCODE supports all LOLCODE comment styles:

```lolcode
BTW Single line comment

OBTW
  Multi-line comment block
  Can span multiple lines
TLDR
```

Comments are **preserved** during transpilation.

---

## 3. Types and Values

### 3.1 Type System

LULCODE inherits LOLCODE's dynamic type system:

| Type | LOLCODE Name | Description |
|------|--------------|-------------|
| Null | `NOOB` | Uninitialized or null value |
| Boolean | `TROOF` | `WIN` (true) or `FAIL` (false) |
| Integer | `NUMBR` | Signed integer |
| Float | `NUMBAR` | Floating-point number |
| String | `YARN` | Text string |
| Collection | `BUKKIT` | Dictionary/array hybrid |

### 3.2 BUKKIT Type

LULCODE extends BUKKIT with array semantics.

#### 3.2.1 BUKKIT as Dictionary

**String keys** for dictionary-style access:
```lulcode
I HAS A dict ITZ A BUKKIT
dict["name"] = "Alice"
dict["age"] = 30
```

#### 3.2.2 BUKKIT as Array

**Numeric keys** for array-style access:
```lulcode
I HAS A arr ITZ A BUKKIT
arr[0] = "first"
arr[1] = "second"
```

**Internal representation**: Numeric indices are stored as string keys with `__` prefix:
- `arr[0]` → stored as key `__0`
- `arr[42]` → stored as key `__42`

#### 3.2.3 Array Metadata

Arrays created via literals or operations include metadata:
- **`__length`**: Number of elements (NUMBR)
- **`__is_array`**: Always `WIN` for arrays (TROOF)

**Example**:
```lulcode
WTV arr ITZ [10, 20, 30]
BTW arr'Z __length is 3
BTW arr'Z __is_array is WIN
```

### 3.3 Type Coercion

Type coercion follows LOLCODE 1.2 rules. LULCODE adds no new coercion rules.

---

## 4. Variables and Declarations

### 4.1 WTV Declaration

**Syntax**:
```ebnf
wtv-declaration = "WTV" identifier-list [initialization] ;
identifier-list = identifier ("," identifier)* ;
initialization = "ITZ" expression ;
```

**Transpilation**: `WTV` → `I HAS A`

#### 4.1.1 Simple Declaration

**LULCODE**:
```lulcode
WTV x
```

**Transpiles to LOLCODE**:
```lolcode
I HAS A x
```

#### 4.1.2 Declaration with Initialization

**LULCODE**:
```lulcode
WTV age ITZ 25
```

**Transpiles to LOLCODE**:
```lolcode
I HAS A age ITZ 25
```

#### 4.1.3 Multiple Declarations

**LULCODE**:
```lulcode
WTV x, y, z
```

**Transpiles to LOLCODE**:
```lolcode
I HAS A x
I HAS A y
I HAS A z
```

#### 4.1.4 Mixed Declarations

**LULCODE**:
```lulcode
WTV a ITZ 1, b ITZ 2, c
```

**Transpiles to LOLCODE**:
```lolcode
I HAS A a ITZ 1
I HAS A b ITZ 2
I HAS A c
```

### 4.2 Scope Rules

LULCODE inherits LOLCODE's scope rules:
- Variables are **function-scoped**
- No block-level scope
- Variables declared in loops/conditionals are visible in entire function

---

## 5. Operators

### 5.1 Assignment Operator

**Syntax**: *variable* `=` *expression*

**Transpilation**: `=` → `R`

**Example**:
```lulcode
x = 42                →    x R 42
name = "Alice"        →    name R "Alice"
```

**Constraints**:
- Left-hand side MUST be a variable identifier or bracket expression
- Right-hand side can be any expression

### 5.2 Comparison Operators

| LULCODE | LOLCODE Transpilation |
|---------|----------------------|
| `x == y` | `BOTH SAEM x AN y` |
| `x != y` | `DIFFRINT x AN y` |
| `x > y` | `BOTH SAEM x AN BIGGR OF x AN y` |
| `x < y` | `BOTH SAEM y AN BIGGR OF x AN y` |
| `x >= y` | `BOTH SAEM x AN BIGGR OF x AN y` |
| `x <= y` | `BOTH SAEM y AN BIGGR OF x AN y` |

**Examples**:
```lulcode
ORLY x == 5          →    BOTH SAEM x AN 5, O RLY?
ORLY age >= 18       →    BOTH SAEM age AN BIGGR OF age AN 18, O RLY?
```

### 5.3 Logical Operators

| LULCODE | LOLCODE Transpilation |
|---------|----------------------|
| `x && y` | `BOTH OF x AN y` |
| `x \|\| y` | `EITHER OF x AN y` |

**Examples**:
```lulcode
x && y               →    BOTH OF x AN y
x \|\| y             →    EITHER OF x AN y
```

### 5.4 Operator Precedence

**Evaluation Order**:
1. Operators are processed **left-to-right**
2. Operators must appear on **same line** as operands
3. Complex expressions should use explicit LOLCODE grouping

**Not Supported** (use LOLCODE syntax instead):
- Parentheses for grouping
- Operator precedence (all equal precedence)
- Multi-line operator expressions

**Example** (ambiguous):
```lulcode
BTW Don't do this - ambiguous:
x && y \|\| z

BTW Do this instead - explicit:
BOTH OF x AN EITHER OF y AN z MKAY
```

---

## 6. Collections (BUKKIT)

### 6.1 BUKKIT Creation

#### 6.1.1 Empty BUKKIT

**LOLCODE syntax** (inherited):
```lolcode
I HAS A dict ITZ A BUKKIT
```

**LULCODE sugar**:
```lulcode
WTV dict ITZ A BUKKIT
```

#### 6.1.2 Array Literal

**LULCODE**:
```lulcode
WTV arr ITZ []
WTV nums ITZ [1, 2, 3]
```

**Transpiles to LOLCODE**:
```lolcode
I HAS A arr ITZ A BUKKIT
arr HAS A __length ITZ 0
arr HAS A __is_array ITZ WIN

I HAS A nums ITZ A BUKKIT
nums HAS A __length ITZ 3
nums HAS A __is_array ITZ WIN
nums HAS A __0 ITZ 1
nums HAS A __1 ITZ 2
nums HAS A __2 ITZ 3
```

#### 6.1.3 Alternative Array Syntax

**LULCODE**:
```lulcode
WTV arr ITZ AN ARRAY
```

**Transpiles to** (same as `[]`):
```lolcode
I HAS A arr ITZ A BUKKIT
arr HAS A __length ITZ 0
arr HAS A __is_array ITZ WIN
```

### 6.2 Bracket Notation

#### 6.2.1 String Key Access

**Syntax**: *bukkit*`["`*key*`"]`

**Transpilation**: `arr["key"]` → `arr'Z key`

**Example**:
```lulcode
scores["Alice"]      →    scores'Z Alice
dict["name"]         →    dict'Z name
```

#### 6.2.2 Numeric Key Access (Literal)

**Syntax**: *array*`[`*number*`]`

**Transpilation**: `arr[n]` → `arr'Z __n`

**Example**:
```lulcode
arr[0]               →    arr'Z __0
arr[42]              →    arr'Z __42
```

#### 6.2.3 Numeric Key Access (Variable)

**Syntax**: *array*`[`*variable*`]`

**Transpilation**: `arr[i]` → `arr'Z SRS SMOOSH "__" AN i MKAY`

**Example**:
```lulcode
arr[i]               →    arr'Z SRS SMOOSH "__" AN i MKAY
arr[index]           →    arr'Z SRS SMOOSH "__" AN index MKAY
```

**Rationale**: Variable indices require runtime key generation because we can't know the value at transpile-time.

#### 6.2.4 Assignment with Brackets

**String key**:
```lulcode
dict["key"] = "value"    →    dict'Z key R "value"
```

**Numeric key (literal)**:
```lulcode
arr[0] = 10              →    arr'Z __0 R 10
```

**Numeric key (variable)**:
```lulcode
arr[i] = value           →    arr'Z SRS SMOOSH "__" AN i MKAY R value
```

### 6.3 Direct Property Access

Users can still use LOLCODE's `'Z` syntax directly:

```lolcode
dict'Z key               BTW String key
arr'Z __0                BTW Numeric array index
arr'Z SRS idx            BTW Dynamic key (works for both)
```

This is **equivalent** to bracket notation and is valid LULCODE.

### 6.4 Array Length

**Accessing length**:
```lulcode
arr'Z __length           BTW Standard BUKKIT access
```

**NOT supported**:
```lulcode
LENGZ OF arr             BTW Only works for strings, not arrays
```

**Rationale**: `LENGZ OF` is a LOLCODE operator for strings. Arrays are BUKKIT-based, so standard property access is used.

---

## 7. Array Operations

### 7.1 YEET INTO (Push)

**Syntax**: `YEET` *value* `INTO` *array*

**Semantics**: Adds *value* to the end of *array*, incrementing `__length`.

**Transpilation**: Generates call to `LULCODE_ARRAY_PUSH`.

**Example**:
```lulcode
YEET 42 INTO arr
```

**Transpiles to**:
```lolcode
LULCODE_ARRAY_PUSH arr 42
```

**Runtime behavior**:
1. Read current `__length`
2. Store value at `__<length>` key
3. Increment `__length`

### 7.2 YOINK LAST FROM (Pop)

**Syntax**: `YOINK LAST FROM` *array*

**Semantics**: Removes and returns the last element from *array*, decrementing `__length`.

**Transpilation**: Generates call to `LULCODE_ARRAY_POP`.

**Example**:
```lulcode
WTV last ITZ YOINK LAST FROM arr
```

**Transpiles to**:
```lolcode
I HAS A last ITZ LULCODE_ARRAY_POP arr
```

**Runtime behavior**:
1. Return `NOOB` if array is empty
2. Read element at `__<length-1>`
3. Clear that key
4. Decrement `__length`
5. Return the value

### 7.3 YOINK FIRST FROM (Shift)

**Syntax**: `YOINK FIRST FROM` *array*

**Semantics**: Removes and returns the first element from *array*, shifting all remaining elements down.

**Transpilation**: Generates call to `LULCODE_ARRAY_SHIFT`.

**Example**:
```lulcode
WTV first ITZ YOINK FIRST FROM arr
```

**Transpiles to**:
```lolcode
I HAS A first ITZ LULCODE_ARRAY_SHIFT arr
```

**Runtime behavior**:
1. Return `NOOB` if array is empty
2. Read element at `__0`
3. Shift all elements down: `__1` → `__0`, `__2` → `__1`, etc.
4. Clear last key
5. Decrement `__length`
6. Return the value

**Performance Note**: Shift is O(n) operation due to element movement.

### 7.4 IM CHECKIN YR (Foreach)

#### 7.4.1 Without Index

**Syntax**:
```ebnf
foreach = "IM CHECKIN YR" array "FER" element-var body "KTHX" ;
```

**Example**:
```lulcode
IM CHECKIN YR arr FER item
  VISIBLE item
KTHX
```

**Transpiles to**:
```lolcode
I HAS A __foreach_idx_1 ITZ 0
I HAS A __foreach_len_1 ITZ arr'Z __length
IM IN YR __foreach_loop_1 UPPIN YR __foreach_idx_1 TIL BOTH SAEM __foreach_idx_1 AN __foreach_len_1
  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN __foreach_idx_1 MKAY
  I HAS A item ITZ arr'Z SRS __foreach_key_1
  VISIBLE item
IM OUTTA YR __foreach_loop_1
```

#### 7.4.2 With Index

**Syntax**:
```ebnf
foreach-indexed = "IM CHECKIN YR" array "FER" element-var "AT" index-var body "KTHX" ;
```

**Example**:
```lulcode
IM CHECKIN YR arr FER item AT i
  VISIBLE i
  VISIBLE item
KTHX
```

**Transpiles to**:
```lolcode
I HAS A i ITZ 0
I HAS A __foreach_len_1 ITZ arr'Z __length
IM IN YR __foreach_loop_1 UPPIN YR i TIL BOTH SAEM i AN __foreach_len_1
  I HAS A __foreach_key_1 ITZ SMOOSH "__" AN i MKAY
  I HAS A item ITZ arr'Z SRS __foreach_key_1
  VISIBLE i
  VISIBLE item
IM OUTTA YR __foreach_loop_1
```

**Difference**: When index variable is specified, it's used directly instead of generating `__foreach_idx_N`.

#### 7.4.3 Loop Counter

Each `IM CHECKIN YR` gets a unique counter suffix (`_1`, `_2`, etc.) to avoid variable name collisions in nested loops.

---

## 8. String Operations

### 8.1 String Interpolation

**Syntax**: `"{`*variable*`}"`

**Semantics**: Replaces `{var}` with the value of *variable* at runtime.

**Transpilation**: `{var}` → `:{var}`

**Example**:
```lulcode
VISIBLE "Hello {name}!"
```

**Transpiles to**:
```lolcode
VISIBLE "Hello :{name}!"
```

**LOLCODE Semantics**: LOLCODE's `:{ }` is variable interpolation syntax.

### 8.2 Escaped Braces

**Syntax**: `"{{` or `"}}"`

**Semantics**: Literal brace characters in strings.

**Transpilation**: `{{` → `{`, `}}` → `}`

**Example**:
```lulcode
VISIBLE "Use {{braces}} like {this}"
```

**Transpiles to**:
```lolcode
VISIBLE "Use {braces} like :{this}"
```

### 8.3 String Slicing

**Syntax**:
```ebnf
string-slice = identifier "[" [start] ":" [end] "]" ;
start = integer | "-" integer | identifier ;
end = integer | "-" integer | identifier ;
```

**Semantics**: Extracts substring from *start* index to *end* index (exclusive).

**Transpilation**: Generates call to `LULCODE_SLICE`.

#### 8.3.1 Basic Slice

**LULCODE**:
```lulcode
str[0:5]
```

**Transpiles to**:
```lolcode
LULCODE_SLICE str 0 5
```

#### 8.3.2 Omitted Start

**LULCODE**:
```lulcode
str[:5]
```

**Transpiles to** (defaults to 0):
```lolcode
LULCODE_SLICE str 0 5
```

#### 8.3.3 Omitted End

**LULCODE**:
```lulcode
str[5:]
```

**Transpiles to** (uses string length):
```lolcode
LULCODE_SLICE str 5 LENGZ OF str
```

#### 8.3.4 Negative Indices

**LULCODE**:
```lulcode
str[-5:]
```

**Transpiles to** (converts to positive):
```lolcode
LULCODE_SLICE str DIFF OF LENGZ OF str AN 5 LENGZ OF str
```

**Semantics**: Negative indices count from the end of the string.

#### 8.3.5 Full Slice

**LULCODE**:
```lulcode
str[:]
```

**Transpiles to**:
```lolcode
LULCODE_SLICE str 0 LENGZ OF str
```

**Result**: Copy of entire string.

### 8.4 String Splitting (UNSMOOSH)

**Syntax**: `UNSMOOSH` *string* `BY` *delimiter*

**Semantics**: Splits *string* by *delimiter*, returning an array.

**Transpilation**: Generates call to `LULCODE_SPLIT`.

**Example**:
```lulcode
WTV parts ITZ UNSMOOSH "a,b,c" BY ","
```

**Transpiles to**:
```lolcode
I HAS A parts ITZ LULCODE_SPLIT "a,b,c" ","
```

**Runtime behavior**:
1. Creates empty array
2. Scans string for delimiter
3. Stores each part as array element
4. Returns array with proper `__length`

**Special case**: Empty delimiter splits into individual characters.

**Rationale**: "UNSMOOSH" is the opposite of LOLCODE's `SMOOSH` (string concatenation).

---

## 9. Control Flow

### 9.1 ORLY (Conditionals)

**Syntax**:
```ebnf
conditional = "ORLY" condition body ["NOWAI" else-body | "MEBE" elif-condition elif-body]* "KTHX" ;
```

**Transpilation**: `ORLY ... KTHX` → `condition, O RLY? ... OIC`

#### 9.1.1 Simple Conditional

**LULCODE**:
```lulcode
ORLY x == 5
  VISIBLE "x is 5"
KTHX
```

**Transpiles to LOLCODE**:
```lolcode
BOTH SAEM x AN 5, O RLY?
  YA RLY
  VISIBLE "x is 5"
OIC
```

#### 9.1.2 If-Else

**LULCODE**:
```lulcode
ORLY x == 5
  VISIBLE "x is 5"
NOWAI
  VISIBLE "x is not 5"
KTHX
```

**Transpiles to LOLCODE**:
```lolcode
BOTH SAEM x AN 5, O RLY?
  YA RLY
  VISIBLE "x is 5"
  NO WAI
  VISIBLE "x is not 5"
OIC
```

#### 9.1.3 Else-If

**LULCODE**:
```lulcode
ORLY x == 5
  VISIBLE "x is 5"
MEBE x == 10
  VISIBLE "x is 10"
NOWAI
  VISIBLE "x is something else"
KTHX
```

**Transpiles to LOLCODE**:
```lolcode
BOTH SAEM x AN 5, O RLY?
  YA RLY
  VISIBLE "x is 5"
  MEBBE BOTH SAEM x AN 10
  VISIBLE "x is 10"
  NO WAI
  VISIBLE "x is something else"
OIC
```

### 9.2 KTHX (Universal Closer)

**Concept**: In LULCODE, `KTHX` ("okay, thanks") is a universal block closer.

**Context-Dependent Transpilation**:
- After `ORLY`/`NOWAI`/`MEBE` → `OIC`
- After `IM CHECKIN YR` → `IM OUTTA YR <loop>`
- After `IM IN YR` (inherited LOLCODE) → `IM OUTTA YR <loop>`

**Examples**:
```lulcode
ORLY x == 5
  BTW ...
KTHX                    BTW → OIC

IM CHECKIN YR arr FER i
  BTW ...
KTHX                    BTW → IM OUTTA YR __foreach_loop_1
```

**Rationale**: Users don't have to remember multiple closers (`OIC`, `IM OUTTA YR`, etc.). The transpiler handles the context.

### 9.3 Loops (Inherited from LOLCODE)

LULCODE inherits all LOLCODE loop constructs:

```lolcode
IM IN YR loop UPPIN YR var TIL condition
  BTW ...
IM OUTTA YR loop

IM IN YR loop NERFIN YR var TIL condition
  BTW ...
IM OUTTA YR loop

IM IN YR loop UPPIN YR var WILE condition
  BTW ...
IM OUTTA YR loop
```

**Note**: In LULCODE, you CAN use `KTHX` instead of `IM OUTTA YR loop` for consistency:

```lulcode
IM IN YR loop UPPIN YR i TIL BOTH SAEM i AN 10
  BTW ...
KTHX                    BTW Transpiles to: IM OUTTA YR loop
```

---

## 10. Runtime Library

### 10.1 Auto-Injection Mechanism

The LULCODE transpiler **automatically injects** runtime library functions when they are used.

**Injection Point**: After the `HAI` line at the start of the program.

**Detection**: Transpiler scans output for function calls (`LULCODE_*`) and injects only the functions that are used.

**Example**:
```lulcode
HAI 1.2
WTV arr ITZ [1, 2, 3]
KTHXBYE
```

**Transpiles to** (with runtime):
```lolcode
HAI 1.2
BTW === LULCODE Runtime Library ===
BTW (function definitions here)
BTW === End LULCODE Runtime ===

I HAS A arr ITZ A BUKKIT
arr HAS A __length ITZ 3
arr HAS A __is_array ITZ WIN
arr HAS A __0 ITZ 1
arr HAS A __1 ITZ 2
arr HAS A __2 ITZ 3
KTHXBYE
```

### 10.2 Reserved Namespace

**Prefix**: `LULCODE_*`

All runtime library functions use this prefix. User code MUST NOT define functions with this prefix.

**Collision Behavior**: If user code defines `LULCODE_*` functions, behavior is undefined (likely error or override).

### 10.3 String Functions

#### 10.3.1 LULCODE_SLICE

**Signature**: `HOW DUZ I LULCODE_SLICE YR str AN YR start AN YR end`

**Parameters**:
- `str`: String to slice (YARN)
- `start`: Start index, inclusive (NUMBR)
- `end`: End index, exclusive (NUMBR)

**Returns**: Substring from *start* to *end* (YARN)

**Behavior**:
- Loops from *start* to *end*, extracting characters with `AT`
- Concatenates with `SMOOSH`
- Returns empty string if *start* >= *end*

**Used by**: String slice syntax `str[start:end]`

#### 10.3.2 indexOf (Self-Hosting)

**Signature**: `HOW DUZ I indexOf YR str AN YR pattern`

**Returns**: Index of first occurrence of *pattern* in *str*, or -1 if not found (NUMBR)

**Used by**: Self-hosted transpiler (not user-facing sugar)

#### 10.3.3 startsWith (Self-Hosting)

**Signature**: `HOW DUZ I startsWith YR str AN YR prefix`

**Returns**: `WIN` if *str* starts with *prefix*, else `FAIL` (TROOF)

**Used by**: Self-hosted transpiler

#### 10.3.4 contains (Self-Hosting)

**Signature**: `HOW DUZ I contains YR str AN YR pattern`

**Returns**: `WIN` if *pattern* exists in *str*, else `FAIL` (TROOF)

**Used by**: Self-hosted transpiler

#### 10.3.5 replace (Self-Hosting)

**Signature**: `HOW DUZ I replace YR str AN YR old AN YR new`

**Returns**: String with first occurrence of *old* replaced by *new* (YARN)

**Used by**: Self-hosted transpiler

#### 10.3.6 replaceAll (Self-Hosting)

**Signature**: `HOW DUZ I replaceAll YR str AN YR old AN YR new`

**Returns**: String with all occurrences of *old* replaced by *new* (YARN)

**Safety**: Max 1000 iterations to prevent infinite loops

**Used by**: Self-hosted transpiler

### 10.4 Array Functions

#### 10.4.1 LULCODE_ARRAY_PUSH

**Signature**: `HOW DUZ I LULCODE_ARRAY_PUSH YR arr AN YR value`

**Parameters**:
- `arr`: Array to modify (BUKKIT)
- `value`: Value to add (any type)

**Returns**: (none, modifies array in-place)

**Behavior**:
1. Read current `arr'Z __length`
2. Create key `__<length>`
3. Store *value* at that key
4. Increment `__length`

**Used by**: `YEET value INTO arr`

#### 10.4.2 LULCODE_ARRAY_POP

**Signature**: `HOW DUZ I LULCODE_ARRAY_POP YR arr`

**Parameters**:
- `arr`: Array to modify (BUKKIT)

**Returns**: Last element, or `NOOB` if array is empty (any type)

**Behavior**:
1. Check if `__length` is 0, return `NOOB`
2. Compute index = `__length - 1`
3. Read element at `__<index>`
4. Clear that key (set to `NOOB`)
5. Decrement `__length`
6. Return the element

**Used by**: `YOINK LAST FROM arr`

#### 10.4.3 LULCODE_ARRAY_SHIFT

**Signature**: `HOW DUZ I LULCODE_ARRAY_SHIFT YR arr`

**Parameters**:
- `arr`: Array to modify (BUKKIT)

**Returns**: First element, or `NOOB` if array is empty (any type)

**Behavior**:
1. Check if `__length` is 0, return `NOOB`
2. Read element at `__0`
3. Loop from 0 to `__length - 2`, shifting elements down
4. Clear last key
5. Decrement `__length`
6. Return the first element

**Used by**: `YOINK FIRST FROM arr`

**Performance**: O(n) due to element shifting

#### 10.4.4 LULCODE_SPLIT

**Signature**: `HOW DUZ I LULCODE_SPLIT YR str AN YR delim`

**Parameters**:
- `str`: String to split (YARN)
- `delim`: Delimiter (YARN)

**Returns**: Array of string parts (BUKKIT)

**Behavior**:
1. Create empty array
2. Scan *str* character by character
3. When *delim* is found, store current part and reset
4. Store final part after loop
5. Return array with proper `__length` and `__is_array`

**Special case**: Empty *delim* splits into individual characters

**Used by**: `UNSMOOSH str BY delim`

### 10.5 Dependency Management

Runtime functions may depend on each other. The transpiler automatically includes dependencies:

**Dependency Graph**:
```
contains → indexOf → LULCODE_SLICE
replace → indexOf → LULCODE_SLICE
replaceAll → replace → indexOf → LULCODE_SLICE
```

**Example**: If `replaceAll` is used, the transpiler injects: `replaceAll`, `replace`, `indexOf`, and `LULCODE_SLICE`.

---

## 11. Transpilation Rules

### 11.1 Transformation Order

Transformations are applied in this order:

1. **Extract strings** (protect from transformation)
2. **Extract comments** (protect from transformation)
3. **Extract array literals** (protect from transformation)
4. **String interpolation** (process extracted strings)
5. **BUKKIT string keys** (`arr["key"]` → `arr'Z key`)
6. **String slicing** (`str[start:end]`)
7. **String splitting** (`UNSMOOSH`)
8. **Block statements** (`IM CHECKIN YR`, `ORLY`)
9. **WTV declarations**
10. **BUKKIT numeric keys** (`arr[0]`, `arr[i]`)
11. **Array operations** (`YEET`, `YOINK`)
12. **Comparison operators** (`==`, `!=`, etc.)
13. **Logical operators** (`&&`, `||`)
14. **Assignment operator** (`=`)
15. **Array literal expansion** (create BUKKIT initialization)
16. **Runtime library injection** (if needed)
17. **Restore strings**
18. **Restore comments**

**Rationale**: Order matters to avoid incorrect transformations. For example, strings must be extracted before operators are processed, or `"x == y"` would be transformed incorrectly.

### 11.2 Context-Dependent Closers

**KTHX Resolution Algorithm**:

1. Track opening keywords during transpilation
2. When `KTHX` is encountered, pop the most recent opener
3. Generate appropriate LOLCODE closer:
   - `ORLY`, `NOWAI`, `MEBE` → `OIC`
   - `IM IN YR`, `IM CHECKIN YR` → `IM OUTTA YR <loop_label>`
   - Function definitions → `IF U SAY SO`

**Example**:
```lulcode
ORLY x == 5
  IM CHECKIN YR arr FER item
    VISIBLE item
  KTHX              BTW Matches "IM CHECKIN YR" → IM OUTTA YR
KTHX                BTW Matches "ORLY" → OIC
```

### 11.3 Variable Name Generation

**Foreach Loops**: Generate unique variables with counter suffix:
- `__foreach_idx_1`, `__foreach_idx_2`, etc.
- `__foreach_len_1`, `__foreach_len_2`, etc.
- `__foreach_key_1`, `__foreach_key_2`, etc.
- `__foreach_loop_1`, `__foreach_loop_2`, etc.

**Counter**: Incremented for each `IM CHECKIN YR` encountered.

**Rationale**: Prevents name collisions in nested loops.

### 11.4 Line Preservation

Where possible, the transpiler preserves line structure:
- One LULCODE line → one LOLCODE line
- Exceptions: Multi-line expansions (e.g., `WTV x, y, z`, array literals, foreach)

**Rationale**: Makes transpiled code easier to debug and understand.

---

## 12. Compatibility and Limitations

### 12.1 LOLCODE 1.2 Compatibility

**Full Compatibility**: All valid LOLCODE 1.2 programs are valid LULCODE programs and will transpile to themselves (with possible formatting changes).

**No Breaking Changes**: LULCODE never modifies or removes LOLCODE features.

### 12.2 Target Interpreter

LULCODE includes a bundled LOLCODE interpreter:
- **lol-coffee** (JavaScript-based interpreter with full BUKKIT support)

The lol-coffee runtime is bundled with LULCODE, so no external interpreter installation is required. The transpiled LOLCODE can also be executed by any LOLCODE 1.2 interpreter that supports the `BUKKIT` type.

### 12.3 Known Limitations

#### 12.3.1 Multi-Dimensional Arrays

**Not Supported**: `arr[0][0]` will not transpile correctly.

**Workaround**: Flatten indices or use nested BUKKIT with string keys:
```lulcode
arr["row0"]["col0"]      BTW Works (nested BUKKIT)
```

#### 12.3.2 Array Concatenation

**Not Supported**: No syntax for merging arrays.

**Workaround**: Manual loop to copy elements:
```lulcode
IM CHECKIN YR arr2 FER item
  YEET item INTO arr1
KTHX
```

#### 12.3.3 Operator Precedence

**Limitation**: All operators have equal precedence, evaluated left-to-right.

**Workaround**: Use explicit LOLCODE grouping for complex expressions.

#### 12.3.4 Bracket Notation in Complex Expressions

**Limitation**: Bracket notation works in simple contexts but may fail in nested expressions.

**Example**:
```lulcode
VISIBLE arr[arr[0]]      BTW May not work correctly
```

**Workaround**: Use intermediate variables:
```lulcode
WTV idx ITZ arr[0]
VISIBLE arr[idx]
```

#### 12.3.5 Runtime Library Overhead

**Impact**: Programs using slicing, array operations, or splitting will have ~100-300 lines of injected runtime code.

**Mitigation**: Transpiler only injects functions that are actually used.

### 12.4 Future Extensions

Features planned for future versions:

- **Multi-dimensional arrays**: `arr[x][y]` syntax
- **Array methods**: `arr.map()`, `arr.filter()`, `arr.reduce()`
- **Destructuring**: `WTV [a, b, c] ITZ arr`
- **First-class functions**: Anonymous functions, lambdas, higher-order functions
- **Pattern matching**: `WTF` enhancement for destructuring
- **Object-oriented features**: Classes, methods, inheritance

---

## 13. Examples

### 13.1 Hello World

**LULCODE**:
```lulcode
HAI 1.2
WTV name ITZ "World"
VISIBLE "Hello, {name}!"
KTHXBYE
```

**LOLCODE Output**:
```lolcode
HAI 1.2
I HAS A name ITZ "World"
VISIBLE "Hello, :{name}!"
KTHXBYE
```

### 13.2 Array Example

**LULCODE**:
```lulcode
HAI 1.2
WTV nums ITZ [10, 20, 30]

IM CHECKIN YR nums FER num AT i
  VISIBLE "nums[{i}] = {num}"
KTHX

YEET 40 INTO nums
VISIBLE "Added 40, length is now {nums'Z __length}"

WTV last ITZ YOINK LAST FROM nums
VISIBLE "Popped: {last}"

KTHXBYE
```

**Output** (when run):
```
nums[0] = 10
nums[1] = 20
nums[2] = 30
Added 40, length is now 4
Popped: 40
```

### 13.3 String Manipulation

**LULCODE**:
```lulcode
HAI 1.2
WTV text ITZ "apple,banana,cherry"
WTV fruits ITZ UNSMOOSH text BY ","

IM CHECKIN YR fruits FER fruit AT i
  WTV upper ITZ fruit[0:1]
  VISIBLE "Fruit {i}: {upper}..."
KTHX

KTHXBYE
```

**Output** (when run):
```
Fruit 0: a...
Fruit 1: b...
Fruit 2: c...
```

### 13.4 Conditional Logic

**LULCODE**:
```lulcode
HAI 1.2
WTV score ITZ 85

ORLY score >= 90
  VISIBLE "Grade: A"
MEBE score >= 80
  VISIBLE "Grade: B"
MEBE score >= 70
  VISIBLE "Grade: C"
NOWAI
  VISIBLE "Grade: F"
KTHX

KTHXBYE
```

**Output**:
```
Grade: B
```

### 13.5 Complex Example

**LULCODE**:
```lulcode
HAI 1.2
BTW Grade calculator with array of scores

WTV scores ITZ [85, 92, 78, 90, 88]
WTV total ITZ 0
WTV count ITZ scores'Z __length

IM CHECKIN YR scores FER score
  total = total + score
KTHX

WTV avg ITZ QUOSHUNT OF total AN count
VISIBLE "Average score: {avg}"

ORLY avg >= 90
  VISIBLE "Class grade: A"
MEBE avg >= 80
  VISIBLE "Class grade: B"
NOWAI
  VISIBLE "Class grade: C"
KTHX

KTHXBYE
```

---

## Appendices

### Appendix A: Complete Grammar (EBNF)

```ebnf
(* LULCODE Grammar *)
(* Extended Backus-Naur Form *)

program = "HAI" version line-break statement* "KTHXBYE" ;

statement = declaration
          | assignment
          | control-flow
          | expression
          | comment ;

(* Declarations *)
declaration = wtv-declaration | lolcode-declaration ;

wtv-declaration = "WTV" identifier-list [initialization] ;
lolcode-declaration = "I HAS A" identifier ["ITZ" expression] ;

identifier-list = identifier-with-init ("," identifier-with-init)* ;
identifier-with-init = identifier ["ITZ" expression] ;

(* Assignment *)
assignment = lvalue "=" expression
           | identifier "R" expression ;  (* LOLCODE form *)

lvalue = identifier | bracket-access ;

(* Control Flow *)
control-flow = conditional | loop | foreach ;

conditional = "ORLY" expression line-break
              statement*
              ["MEBE" expression line-break statement*]*
              ["NOWAI" line-break statement*]
              "KTHX" ;

foreach = "IM CHECKIN YR" identifier "FER" identifier ["AT" identifier]
          line-break
          statement*
          "KTHX" ;

loop = "IM IN YR" identifier loop-op "YR" identifier loop-condition
       line-break
       statement*
       "KTHX" ;

loop-op = "UPPIN" | "NERFIN" ;
loop-condition = "TIL" expression | "WILE" expression ;

(* Expressions *)
expression = literal
           | identifier
           | bracket-access
           | comparison
           | logical
           | arithmetic
           | string-slice
           | string-split
           | array-op
           | lolcode-expression ;

literal = number | string | boolean | array-literal ;

array-literal = "[" [expression ("," expression)*] "]" ;

bracket-access = identifier "[" bracket-key "]" ;
bracket-key = number | string | identifier ;

string-slice = identifier "[" [slice-start] ":" [slice-end] "]" ;
slice-start = number | "-" number | identifier ;
slice-end = number | "-" number | identifier ;

string-split = "UNSMOOSH" expression "BY" expression ;

(* Array Operations *)
array-op = push-op | pop-op | shift-op ;

push-op = "YEET" expression "INTO" identifier ;
pop-op = "YOINK LAST FROM" identifier ;
shift-op = "YOINK FIRST FROM" identifier ;

(* Operators *)
comparison = expression comparison-op expression ;
comparison-op = "==" | "!=" | "<" | ">" | "<=" | ">=" ;

logical = expression logical-op expression ;
logical-op = "&&" | "||" ;

(* String Interpolation *)
string = '"' string-char* '"' ;
string-char = normal-char | interpolation | escaped-brace ;
interpolation = "{" identifier "}" ;
escaped-brace = "{{" | "}}" ;

(* Lexical *)
identifier = letter (letter | digit | "_")* ;
number = digit+ ["." digit+] ;
boolean = "WIN" | "FAIL" ;
comment = "BTW" text | "OBTW" text "TLDR" ;

letter = "A" | ... | "Z" | "a" | ... | "z" ;
digit = "0" | "1" | ... | "9" ;
line-break = "\n" ;
```

### Appendix B: Keyword Reference Table

| Keyword | Category | Meaning | Transpiles To |
|---------|----------|---------|---------------|
| WTV | Declaration | Variable declaration ("whatever") | I HAS A |
| ORLY | Control Flow | Conditional ("oh really?") | (condition), O RLY? |
| NOWAI | Control Flow | Else clause ("no way") | NO WAI |
| MEBE | Control Flow | Else-if ("maybe") | MEBBE |
| KTHX | Control Flow | Universal block closer | Context-dependent |
| YEET | Array Op | Push element ("yeet it in") | LULCODE_ARRAY_PUSH |
| YOINK | Array Op | Remove element ("yoink it out") | LULCODE_ARRAY_POP/SHIFT |
| INTO | Array Op | Direction for YEET | (none) |
| LAST | Array Op | Target last element | (none) |
| FIRST | Array Op | Target first element | (none) |
| FROM | Array Op | Source for YOINK | (none) |
| UNSMOOSH | String Op | Split string (opposite of SMOOSH) | LULCODE_SPLIT |
| BY | String Op | Delimiter specifier | (none) |
| CHECKIN | Control Flow | Part of foreach | (none) |
| FER | Control Flow | Foreach variable introducer | (none) |
| AT | Control Flow | Foreach index variable | (none) |

### Appendix C: Operator Transpilation Table

| LULCODE Operator | LOLCODE Equivalent | Notes |
|------------------|-------------------|-------|
| `x = y` | `x R y` | Assignment |
| `x == y` | `BOTH SAEM x AN y` | Equality |
| `x != y` | `DIFFRINT x AN y` | Inequality |
| `x > y` | `BOTH SAEM x AN BIGGR OF x AN y` | Greater than |
| `x < y` | `BOTH SAEM y AN BIGGR OF x AN y` | Less than |
| `x >= y` | `BOTH SAEM x AN BIGGR OF x AN y` | Greater or equal |
| `x <= y` | `BOTH SAEM y AN BIGGR OF x AN y` | Less or equal |
| `x && y` | `BOTH OF x AN y` | Logical AND |
| `x \|\| y` | `EITHER OF x AN y` | Logical OR |
| `arr[key]` | `arr'Z key` or `arr'Z SRS ...` | Bracket access |

### Appendix D: Reserved Identifier Patterns

**Function Namespace**:
- `LULCODE_*` - All runtime library functions

**Array Internals**:
- `__length` - Array length metadata
- `__is_array` - Array type marker
- `__0`, `__1`, `__2`, ... - Numeric array keys

**Foreach Variables**:
- `__foreach_idx_*` - Generated loop index
- `__foreach_len_*` - Generated loop length
- `__foreach_key_*` - Generated key variable
- `__foreach_loop_*` - Generated loop label

**Recommendation**: User code should avoid identifiers starting with `__` (double underscore) to prevent conflicts.

---

## Document Information

**Version**: 1.0 Ultra Final  
**Last Modified**: 2026-05-20  
**Authors**: Eric Brooks, Claude Sonnet 4.5  
**License**: MIT (same as LULCODE project)  
**Repository**: https://github.com/ericbrooks404/lulcode

**Changelog**:
- **v1.0** (2026-05-20): Initial ultra final specification

---

**End of Specification**

This document is the canonical reference for LULCODE v1.0. Implementations MUST conform to this specification. Deviations or extensions should be clearly documented.
