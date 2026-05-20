# LULCODE Installation Guide

## Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** (Node Package Manager)
- **LCI** (LOLCODE Interpreter) - optional, required for `--run` functionality

## Installation Steps

### 1. Install npm

If you don't have npm installed:

```bash
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install npm

# On macOS (using Homebrew)
brew install node  # includes npm

# On other systems, download from nodejs.org
```

### 2. Install LULCODE Dependencies

From the LULCODE project directory:

```bash
npm install
```

This will install:
- **commander** (CLI framework)
- **chalk** (colored output)
- **ora** (progress indicators)
- **chokidar** (file watching)

### 3. Install LCI (Optional but Recommended)

LCI is required for the `lulcode run` command.

**Option A: Use the provided installer**
```bash
./install.sh
```

**Option B: Manual installation**
```bash
# Install dependencies
sudo apt-get install cmake libreadline-dev libncurses-dev

# Clone and build LCI
git clone https://github.com/justinmeza/lci.git
cd lci
cmake .
make
sudo make install
```

### 4. Make lulcode executable (if needed)

```bash
chmod +x bin/lulcode
```

### 5. Test the installation

```bash
# Test transpilation
node src/cli.js --version

# Or if installed globally/linked
lulcode --version
```

## Global Installation (Optional)

To use `lulcode` command anywhere:

```bash
npm link
```

Or install globally from npm (once published):

```bash
npm install -g lulcode
```

## Verification

Test that everything works:

```bash
# Create a test file
echo 'HAI 1.2
VISIBLE "Hello from LULCODE!"
KTHXBYE' > test.lul

# Transpile it
lulcode compile test.lul -o test.lol

# Run it (requires LCI)
lulcode run test.lul

# Clean up
rm test.lul test.lol
```

## Troubleshooting

### "Cannot find module 'chalk'" or similar errors

Run `npm install` to install dependencies.

### "LCI interpreter not found"

Install LCI using `./install.sh` or manually as described above.

### "lulcode: command not found"

- Make sure `bin/lulcode` is executable: `chmod +x bin/lulcode`
- Run `npm link` to create a global symlink
- Or use `node src/cli.js` directly

## Next Steps

- Read the [README](README.md) for usage examples
- Try the examples in `examples/`
- Check out the [CLI Design](specs/research/005.1-cli-design.md) document
