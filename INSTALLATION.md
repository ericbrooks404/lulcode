# LULCODE Installation Guide

## Installation

LULCODE is a pure JavaScript package with a bundled LOLCODE runtime. No external dependencies, no compiling C code, no hassle.

### Via npm (Recommended)

```bash
npm install -g lulcode
```

That's it. You now have the `lulcode` command with everything bundled.

### From Source (For Development)

```bash
git clone https://github.com/ericbrooks404/lulcode.git
cd lulcode
npm install
npm link
```

The `lulcode` command is now available globally.

## Verify Installation

```bash
lulcode --version
```

You should see the LULCODE version number.

## Test It Out

Create a test file:

```bash
cat > test.lul << 'EOF'
HAI 1.2
VISIBLE "Hello from LULCODE!"
KTHXBYE
EOF
```

Run it:

```bash
lulcode run test.lul
```

You should see: `Hello from LULCODE!`

## What's Bundled

LULCODE includes:
- **Transpiler** - Converts .lul files to .lol files
- **Runtime** - lol-coffee LOLCODE interpreter (JavaScript-based)
- **CLI** - Full command-line interface with compile, run, init, check commands

Everything runs in Node.js. No native binaries required.

## Requirements

- **Node.js** 14.0.0 or higher
- **npm** (comes with Node.js)

That's it!

## Troubleshooting

### Command not found

If `lulcode` command isn't found after npm install:

1. Check npm global bin directory is in your PATH:
   ```bash
   npm config get prefix
   ```

2. Add npm bin to PATH if needed:
   ```bash
   # Add to ~/.bashrc or ~/.zshrc
   export PATH="$(npm config get prefix)/bin:$PATH"
   ```

### Runtime errors

If you get "LOLCODE runtime not found" errors:

1. Reinstall the package:
   ```bash
   npm install -g lulcode --force
   ```

2. Or if from source:
   ```bash
   cd lulcode
   npm install
   ```

The runtime files should be in `node_modules/lulcode/runtime/lol-coffee/` (or `runtime/lol-coffee/` if installed from source).

## Uninstall

```bash
npm uninstall -g lulcode
```

## Need Help?

Report issues at: https://github.com/ericbrooks404/lulcode/issues
