#!/bin/bash
#
# LULCODE Installer
# Installs LULCODE transpiler + LCI interpreter
#

set -e

echo "╔══════════════════════════════════════════════╗"
echo "║      LULCODE Installation Script             ║"
echo "║  A superset language that transpiles to      ║"
echo "║            LOLCODE                           ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."

MISSING_DEPS=()

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  Node.js not found (required for LULCODE transpiler)"
    MISSING_DEPS+=("nodejs")
fi

# Check for build tools (for LCI)
if ! command -v gcc &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  gcc not found (required to build LCI)"
    MISSING_DEPS+=("gcc")
fi

if ! command -v make &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  make not found (required to build LCI)"
    MISSING_DEPS+=("make")
fi

if ! command -v cmake &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  cmake not found (required to build LCI)"
    MISSING_DEPS+=("cmake")
fi

# Check for readline development library
if ! ldconfig -p | grep -q libreadline; then
    echo -e "${YELLOW}⚠${NC}  libreadline not found (required for LCI)"
    MISSING_DEPS+=("libreadline-dev or readline-devel")
fi

# Check for ncurses development library
if ! ldconfig -p | grep -q libncurses; then
    echo -e "${YELLOW}⚠${NC}  libncurses not found (required for LCI)"
    MISSING_DEPS+=("libncurses-dev or ncurses-devel")
fi

if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
    echo ""
    echo -e "${RED}✗${NC} Missing dependencies: ${MISSING_DEPS[*]}"
    echo ""
    echo "Please install the missing dependencies:"
    echo ""
    echo "  Ubuntu/Debian:"
    echo "    sudo apt-get install nodejs gcc make cmake libreadline-dev libncurses-dev"
    echo ""
    echo "  Fedora/RHEL:"
    echo "    sudo dnf install nodejs gcc make cmake readline-devel ncurses-devel"
    echo ""
    echo "  macOS:"
    echo "    brew install node cmake readline ncurses"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓${NC} All prerequisites found"
echo ""

# Install LULCODE transpiler
echo "Installing LULCODE transpiler..."

if [ -d "$HOME/.lulcode" ]; then
    echo "  Updating existing installation..."
    cd "$HOME/.lulcode"
    git pull
else
    echo "  Cloning LULCODE repository..."
    git clone https://github.com/YOUR-ORG/lulcode.git "$HOME/.lulcode" || {
        # For now, copy from current directory if repo doesn't exist
        if [ -f "$(dirname "$0")/src/transpiler.js" ]; then
            echo "  Installing from local directory..."
            mkdir -p "$HOME/.lulcode"
            cp -r "$(dirname "$0")"/* "$HOME/.lulcode/"
        else
            echo -e "${RED}✗${NC} Could not find LULCODE source"
            exit 1
        fi
    }
fi

# Add to PATH
if ! grep -q 'export PATH="$HOME/.lulcode/bin:$PATH"' "$HOME/.bashrc"; then
    echo ""
    echo "Adding LULCODE to PATH..."
    echo 'export PATH="$HOME/.lulcode/bin:$PATH"' >> "$HOME/.bashrc"
    echo -e "${GREEN}✓${NC} Added to ~/.bashrc"
fi

# Check if LCI is already installed
if command -v lci &> /dev/null; then
    echo ""
    echo -e "${GREEN}✓${NC} LCI already installed: $(which lci)"
    LCI_VERSION=$(lci --version 2>&1 || echo "unknown")
    echo "  Version: $LCI_VERSION"
else
    echo ""
    echo "Installing LCI (LOLCODE Interpreter)..."

    # Clone LCI
    if [ -d "/tmp/lci-install" ]; then
        rm -rf /tmp/lci-install
    fi

    git clone https://github.com/justinmeza/lci.git /tmp/lci-install
    cd /tmp/lci-install

    # Build LCI
    echo "  Building LCI (this may take a minute)..."
    cmake .
    make

    # Install LCI to user bin
    mkdir -p "$HOME/.local/bin"
    cp lci "$HOME/.local/bin/"

    # Add to PATH if needed
    if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$HOME/.bashrc"; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
    fi

    echo -e "${GREEN}✓${NC} LCI installed to ~/.local/bin/lci"

    # Cleanup
    cd -
    rm -rf /tmp/lci-install
fi

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║         Installation Complete! 🎉            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "Usage:"
echo "  1. Restart your shell or run: source ~/.bashrc"
echo "  2. Write LULCODE: vim myfile.lul"
echo "  3. Transpile: lulcode myfile.lul > myfile.lol"
echo "  4. Run: lci myfile.lol"
echo ""
echo "Or in one line:"
echo "  lulcode myfile.lul | lci"
echo ""
echo "Examples:"
echo "  cd $HOME/.lulcode/examples"
echo "  lulcode bukkit-demo.lul | lci"
echo ""
echo "Documentation: $HOME/.lulcode/README.md"
echo ""
