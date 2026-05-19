# LULCODE Bootstrap Strategy

## The Pattern

Following the pattern established by lol-coffee:
- **lol-coffee**: LOLCODE interpreter written in CoffeeScript
- **LULCODE**: LULCODE transpiler written in... LULCODE itself (eventually)

## The Problem

LOLCODE 1.2 lacks file I/O operations (only GIMMEH/VISIBLE for stdin/stdout), making it impractical to write a file-processing transpiler in pure LOLCODE.

## The Solution: Bootstrap

Like Rust, Go, and Python 3, we bootstrap the compiler:

### Phase 1: Bootstrap Transpiler (Current)
**Language**: JavaScript (Node.js)  
**Status**: ✅ In Progress  
**Why**: Fast development, good file I/O, practical

**Files**:
- `src/transpiler.js` - CLI
- `src/transform.js` - Pattern transformer
- `bin/lulcode` - Executable

### Phase 2: Add File I/O to LULCODE
**Epic**: EPIC-002 (Standard Library)  
**Status**: ⏳ Future  
**Options**:
- Use LCI's `CAN HAS STDIO` library
- Add LULCODE file I/O primitives
- Transpile to LCI extensions

### Phase 3: Self-Hosting (The Goal!)
**Status**: ⏳ Future  
**Goal**: Rewrite the LULCODE transpiler **in LULCODE itself**

**The Dream**:
```bash
lulcode src/transpiler.lul > transpiler.lol
lolcoffee transpiler.lol input.lul > output.lol
```

A LULCODE program that transpiles LULCODE!

## Milestones

- [x] **v0.1**: JavaScript bootstrap transpiler (basic bracket syntax)
- [ ] **v0.2**: Complete BUKKIT support
- [ ] **v0.3**: String manipulation (EPIC-002)
- [ ] **v0.4**: File I/O in LULCODE
- [ ] **v0.5**: Transpiler core logic in LULCODE
- [ ] **v1.0**: Fully self-hosting LULCODE transpiler

## Why This Matters

Self-hosting demonstrates that LULCODE is a **real, practical language**, not just a toy. If LULCODE can compile itself, it can compile anything.

## Historical Precedents

- **Rust**: Originally written in OCaml, self-hosted since 2011
- **Go**: Originally written in C, self-hosted since Go 1.5 (2015)
- **Python 3**: Originally written in C (CPython), PyPy is self-hosted
- **gcc**: Originally written in C, now C++ (not self-hosted in strict sense)

## Current Status

**Phase 1 in progress** - JavaScript bootstrap transpiler functional for basic BUKKIT bracket syntax.

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-15  
**Status**: Bootstrap phase active
