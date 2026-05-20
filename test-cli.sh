#!/bin/bash
# Test script for enhanced CLI
# Run after `npm install`

set -e

echo "Testing LULCODE Enhanced CLI"
echo "=============================="
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "❌ Dependencies not installed. Run: npm install"
  exit 1
fi

echo "✅ Dependencies found"
echo ""

# Test version
echo "Testing: lulcode --version"
node src/cli.js --version
echo ""

# Test help
echo "Testing: lulcode --help"
node src/cli.js --help | head -n 10
echo ""

# Test compile with existing example
if [ -f "examples/syntactic-sugar-demo.lul" ]; then
  echo "Testing: lulcode compile examples/syntactic-sugar-demo.lul"
  node src/cli.js compile examples/syntactic-sugar-demo.lul -o /tmp/test-output.lol
  echo ""

  echo "Testing: lulcode check examples/syntactic-sugar-demo.lul"
  node src/cli.js check examples/syntactic-sugar-demo.lul
  echo ""
fi

# Test init
echo "Testing: lulcode init /tmp/test-project"
rm -rf /tmp/test-project
node src/cli.js init /tmp/test-project
echo ""

echo "Checking created files:"
ls -la /tmp/test-project/
echo ""

echo "✅ All CLI tests passed!"
echo ""
echo "To test run command (requires LCI):"
echo "  lulcode run /tmp/test-project/main.lul"
