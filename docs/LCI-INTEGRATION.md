# LCI Integration Guide

## What is LCI?

**LCI** (LOLCODE Interpreter in C) is the official LOLCODE interpreter created by Justin Meza.

- **Source**: https://github.com/justinmeza/lci
- **Language**: C (portable, fast)
- **License**: MIT-like (permissive)
- **Features**: Full LOLCODE 1.2 + BUKKIT support
- **Size**: ~100KB compiled binary

## Why We Need LCI

LULCODE transpiles to LOLCODE with **BUKKIT extensions** (arrays/dictionaries):

```lulcode
arr["key"] = "value"  → transpiles to → arr'Z key R "value"
```

The `'Z` syntax with BUKKIT support requires **LCI**. Other interpreters:
- **lol-coffee**: ❌ No BUKKIT support
- **Other interpreters**: ❌ Inconsistent or missing BUKKIT

**LCI is the only interpreter with full, stable BUKKIT support.**

## Build Requirements

### Prerequisites

| Tool | Ubuntu/Debian | Fedora/RHEL | macOS |
|------|---------------|-------------|-------|
| gcc | `apt install gcc` | `dnf install gcc` | Xcode CLI tools |
| make | `apt install make` | `dnf install make` | Xcode CLI tools |
| cmake | `apt install cmake` | `dnf install cmake` | `brew install cmake` |
| readline | `apt install libreadline-dev` | `dnf install readline-devel` | `brew install readline` |
| ncurses | `apt install libncurses-dev` | `dnf install ncurses-devel` | `brew install ncurses` |

### Building LCI

```bash
# Clone repository
git clone https://github.com/justinmeza/lci.git
cd lci

# Configure and build
cmake .
make

# Install (optional)
sudo make install
# Or copy to user bin:
cp lci ~/.local/bin/
```

**Build time**: ~30 seconds  
**Binary size**: ~100KB

## Using LCI with LULCODE

### Workflow

```bash
# 1. Write LULCODE
vim myfile.lul

# 2. Transpile to LOLCODE
lulcode myfile.lul > myfile.lol

# 3. Run with LCI
lci myfile.lol
```

### One-liner

```bash
lulcode myfile.lul | lci
```

### Example

**Input**: `example.lul`
```lulcode
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr["Alice"] = 100
VISIBLE arr["Alice"]
KTHXBYE
```

**Transpile and run**:
```bash
$ lulcode example.lul | lci
100
```

## Distribution Strategy

### Current Approach: Bundle LCI

LULCODE will bundle LCI to provide "batteries included" installation:

**Option 1**: Install script (auto-build)
```bash
curl -sSL https://lulcode.dev/install.sh | sh
# Installs LULCODE + builds LCI
```

**Option 2**: Pre-built binaries (future)
```bash
npm install -g lulcode
# Downloads LULCODE + pre-built LCI binary
```

**Option 3**: System packages (future)
```bash
brew install lulcode  # macOS
apt install lulcode   # Ubuntu
```

### Why Bundle?

**Without bundling**:
- ❌ User must manually install LCI
- ❌ Installation friction
- ❌ Version mismatches possible

**With bundling**:
- ✅ One-command install
- ✅ Guaranteed compatibility
- ✅ Version locked together
- ✅ Better user experience

## LCI Features Used by LULCODE

### BUKKIT (Arrays/Dictionaries)

```lolcode
I HAS A arr ITZ A BUKKIT    BTW Create BUKKIT
arr'Z key R "value"          BTW Set key
VISIBLE arr'Z key            BTW Get key
arr'Z SRS 0 R "first"        BTW Numeric index
VISIBLE arr'Z SRS 0
```

### Standard LOLCODE 1.2

All standard LOLCODE features work:
- Variables, functions, loops
- Math, logic, string operations
- I/O (VISIBLE, GIMMEH)

### LCI Extensions (Future)

LCI provides additional libraries via `CAN HAS`:
- `CAN HAS STDIO?` - File I/O
- `CAN HAS SOCKS?` - Network sockets
- `CAN HAS STRING?` - String manipulation

LULCODE may use these in future EPICs.

## Testing LCI Integration

### Verify BUKKIT Support

```bash
# Create test file
cat > test.lol <<'EOF'
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr'Z key R "works"
VISIBLE arr'Z key
KTHXBYE
EOF

# Run with LCI
lci test.lol
# Expected output: works
```

### Verify LULCODE → LCI Pipeline

```bash
# Create LULCODE file
cat > test.lul <<'EOF'
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr["key"] = "works"
VISIBLE arr["key"]
KTHXBYE
EOF

# Transpile and run
lulcode test.lul | lci
# Expected output: works
```

## Troubleshooting

### LCI not found

```bash
$ lci test.lol
bash: lci: command not found
```

**Solution**: Install LCI or add to PATH:
```bash
export PATH="$HOME/.local/bin:$PATH"
```

### Build errors

**Missing cmake**:
```bash
sudo apt install cmake  # Ubuntu
brew install cmake      # macOS
```

**Missing readline**:
```bash
sudo apt install libreadline-dev  # Ubuntu
brew install readline             # macOS
```

### BUKKIT not working

**Error**: `Error: invalid statement`

**Cause**: Using non-LCI interpreter (e.g., lol-coffee)

**Solution**: Use LCI, not other interpreters:
```bash
lci myfile.lol  # ✓ Works
# NOT: lolcoffee myfile.lol
```

## Future Work

- [ ] Pre-build LCI binaries for all platforms
- [ ] Ship via npm with platform-specific packages
- [ ] Statically link to remove ncurses/readline dependencies
- [ ] Contribute BUKKIT documentation back to LCI project

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-15  
**Status**: Integration planned, installer created
