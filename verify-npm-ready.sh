#!/bin/bash
# Verify LULCODE package is ready for npm publication

set -e

echo "🔍 Verifying LULCODE npm package readiness..."
echo ""

# Check required files exist
echo "📁 Checking required files..."
files=(
  "package.json"
  "LICENSE"
  ".npmignore"
  "README.md"
  "INSTALLATION.md"
  "bin/lulcode"
  "src/cli.js"
  "src/transform.js"
  "runtime/lol-coffee/ast.js"
  "runtime/lol-coffee/machine.js"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file - MISSING!"
    exit 1
  fi
done

# Check bin/lulcode is executable
if [ -x "bin/lulcode" ]; then
  echo "  ✅ bin/lulcode is executable"
else
  echo "  ❌ bin/lulcode not executable!"
  exit 1
fi

echo ""

# Verify package.json has required fields
echo "📦 Checking package.json fields..."
required_fields=(
  "name"
  "version"
  "description"
  "main"
  "bin"
  "repository"
  "license"
)

for field in "${required_fields[@]}"; do
  if grep -q "\"$field\"" package.json; then
    echo "  ✅ $field"
  else
    echo "  ❌ $field - MISSING!"
    exit 1
  fi
done

echo ""

# Check if Node.js is available
echo "🔧 Checking Node.js..."
if command -v node &> /dev/null; then
  node_version=$(node --version)
  echo "  ✅ Node.js $node_version"
else
  echo "  ❌ Node.js not found!"
  exit 1
fi

echo ""

# Check if dependencies are installed
echo "📚 Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "  ✅ node_modules/ exists"

  # Check for specific dependencies
  deps=("commander" "chalk" "ora" "chokidar")
  for dep in "${deps[@]}"; do
    if [ -d "node_modules/$dep" ]; then
      echo "  ✅ $dep installed"
    else
      echo "  ⚠️  $dep not installed (run npm install)"
    fi
  done
else
  echo "  ⚠️  node_modules/ not found (run npm install)"
fi

echo ""

# Run tests
echo "🧪 Running tests..."
test_summary=""
if command -v node &> /dev/null; then
  test_output=$(node tests/transform.test.js 2>&1)
  if [ $? -eq 0 ]; then
    test_summary=$(echo "$test_output" | tail -1)
    echo "  ✅ Tests passed: $test_summary"
  else
    echo "  ❌ Tests failed!"
    echo "$test_output"
    exit 1
  fi
else
  echo "  ⚠️  Cannot run tests (Node.js required)"
fi

echo ""

# Check examples exist
echo "📖 Checking examples..."
example_count=$(ls examples/*.lul 2>/dev/null | wc -l)
if [ "$example_count" -gt 0 ]; then
  echo "  ✅ $example_count example files found"
else
  echo "  ⚠️  No example files found"
fi

echo ""

# Summary
echo "✨ Package verification complete!"
echo ""
echo "📋 Summary:"
echo "  • Version: $(grep '"version"' package.json | sed 's/.*: "\(.*\)".*/\1/')"
echo "  • Tests: ${test_summary:-not run}"
echo "  • Examples: $example_count files"
echo "  • License: MIT"
echo ""
echo "🚀 Ready to publish with: npm publish"
