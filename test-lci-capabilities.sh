#!/bin/bash
#
# Test LCI's BUKKIT Capabilities
# Run this after LCI is installed
#

set -e

echo "Testing LCI BUKKIT capabilities..."
echo ""

# Check if lci exists
if ! command -v lci &> /dev/null; then
    echo "❌ LCI not found in PATH"
    echo "Please install LCI first (see LCI-SETUP.md)"
    exit 1
fi

echo "✓ LCI found: $(which lci)"
echo ""

# Test 1: Basic BUKKIT
echo "Test 1: Basic BUKKIT access..."
cat > /tmp/test1.lol <<'EOF'
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr'Z key R "value"
VISIBLE arr'Z key
KTHXBYE
EOF

if lci /tmp/test1.lol 2>&1 | grep -q "value"; then
    echo "✓ Basic BUKKIT works"
else
    echo "❌ Basic BUKKIT failed"
fi
echo ""

# Test 2: LENGZ OF bukkit
echo "Test 2: LENGZ OF bukkit..."
cat > /tmp/test2.lol <<'EOF'
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr'Z a R 1
arr'Z b R 2
VISIBLE LENGZ OF arr
KTHXBYE
EOF

if lci /tmp/test2.lol 2>&1; then
    echo "✓ LENGZ OF bukkit works"
else
    echo "❌ LENGZ OF bukkit not supported"
fi
echo ""

# Test 3: HAS A as boolean check
echo "Test 3: HAS A as boolean expression..."
cat > /tmp/test3.lol <<'EOF'
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr HAS A key ITZ "value"
arr HAS A key, O RLY?
  YA RLY
    VISIBLE "found"
OIC
KTHXBYE
EOF

if lci /tmp/test3.lol 2>&1 | grep -q "found"; then
    echo "✓ HAS A as boolean works"
else
    echo "❌ HAS A as boolean not supported"
fi
echo ""

# Test 4: Numeric indexing
echo "Test 4: Numeric indexing with SRS..."
cat > /tmp/test4.lol <<'EOF'
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr'Z SRS 0 R "first"
arr'Z SRS 1 R "second"
VISIBLE arr'Z SRS 0
VISIBLE arr'Z SRS 1
KTHXBYE
EOF

if lci /tmp/test4.lol 2>&1 | grep -q "first"; then
    echo "✓ Numeric indexing works"
else
    echo "❌ Numeric indexing failed"
fi
echo ""

# Test 5: Mixed keys
echo "Test 5: Mixed string and numeric keys..."
cat > /tmp/test5.lol <<'EOF'
HAI 1.2
I HAS A arr ITZ A BUKKIT
arr'Z name R "Alice"
arr'Z SRS 0 R "zero"
VISIBLE arr'Z name
VISIBLE arr'Z SRS 0
KTHXBYE
EOF

if lci /tmp/test5.lol 2>&1 | grep -q "Alice"; then
    echo "✓ Mixed keys work"
else
    echo "❌ Mixed keys failed"
fi
echo ""

echo "=== Summary ==="
echo "Save these results for implementation decisions!"
