# LCI Setup Instructions

## Current Status

**Missing Dependencies**:
- ❌ cmake (build system)
- ❌ libreadline-dev (interactive shell support)
- ❌ libncurses-dev (terminal handling)

**Available**:
- ✅ gcc (compiler)
- ✅ make (build tool)

## Installation Commands

### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install cmake libreadline-dev libncurses-dev
```

### After Installing Dependencies

```bash
# Build LCI
cd /tmp/lci-build  # Already cloned
cmake .
make

# Test
./lci --help

# Install to user bin
cp lci ~/.local/bin/
export PATH="$HOME/.local/bin:$PATH"
```

## Testing BUKKIT Operations

Once LCI is installed, run:
```bash
cd ~/Code/LULCODE
./test-lci-capabilities.sh
```

This will test:
1. Basic BUKKIT access
2. LENGZ OF bukkit support
3. HAS A as boolean expression
4. Key iteration methods

## Status

**Action Required**: Install cmake, libreadline-dev, libncurses-dev with sudo privileges

Once installed, LCI can be built and BUKKIT operations tested.
