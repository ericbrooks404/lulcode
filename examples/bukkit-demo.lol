HAI 1.2
BTW BUKKIT Demo - Arrays and Dictionaries in LULCODE
BTW This file demonstrates both standard LOLCODE and LULCODE sugar syntax

BTW ===== CREATION =====
VISIBLE "Creating BUKKIT..."
I HAS A players ITZ A BUKKIT

BTW ===== ADDING VALUES (Dictionary-style) =====
VISIBLE "Adding players as dictionary..."

BTW Standard LOLCODE property creation
players HAS A Alice ITZ 0
players HAS A Bob ITZ 0
players HAS A Charlie ITZ 0

BTW Standard LOLCODE property update
players'Z Alice R 5
players'Z Bob R 8

BTW LULCODE bracket sugar (transpiles to 'Z syntax)
players'Z Charlie R 3

BTW ===== READING VALUES =====
VISIBLE "Reading player scores..."
VISIBLE SMOOSH "Alice: " players'Z Alice MKAY
VISIBLE SMOOSH "Bob: " players'Z Bob MKAY
VISIBLE SMOOSH "Charlie: " players'Z Charlie MKAY

BTW ===== ARRAY-STYLE USAGE =====
VISIBLE "Using BUKKIT as array..."
I HAS A fruits ITZ A BUKKIT

BTW Standard numeric indexing
fruits'Z SRS 0 R "apple"
fruits'Z SRS 1 R "banana"

BTW LULCODE bracket sugar for numeric indices
fruits'Z SRS 2 R "cherry"

VISIBLE SMOOSH "Fruit 0: " fruits'Z SRS 0 MKAY
VISIBLE SMOOSH "Fruit 1: " fruits'Z SRS 1 MKAY
VISIBLE SMOOSH "Fruit 2: " fruits'Z SRS 2 MKAY

BTW ===== MIXED USAGE (Hybrid) =====
VISIBLE "Mixed array/dictionary usage..."
I HAS A mixed ITZ A BUKKIT

mixed'Z SRS 0 R "index zero"
mixed'Z name R "hybrid BUKKIT"
mixed'Z SRS 1 R "index one"
mixed'Z count R 42

VISIBLE SMOOSH "mixed'Z SRS 0: " mixed'Z SRS 0 MKAY
VISIBLE SMOOSH "mixed.name: " mixed'Z name MKAY
VISIBLE SMOOSH "mixed'Z SRS 1: " mixed'Z SRS 1 MKAY
VISIBLE SMOOSH "mixed.count: " mixed'Z count MKAY

BTW ===== ITERATION (Standard LOLCODE) =====
VISIBLE "Iterating over numeric array..."
I HAS A i ITZ 0
IM IN YR loop UPPIN YR i TIL BOTH SAEM i AN 3
  VISIBLE SMOOSH "  fruits[" i "]: " fruits'Z SRS i MKAY
IM OUTTA YR loop

BTW ===== KEY EXISTENCE CHECK =====
VISIBLE "Checking key existence..."
players HAS A Alice, O RLY?
  YA RLY
    VISIBLE "Alice is in the game!"
  NO WAI
    VISIBLE "Alice not found"
OIC

players HAS A David, O RLY?
  YA RLY
    VISIBLE "David is in the game!"
  NO WAI
    VISIBLE "David not found"
OIC

BTW ===== LENGTH (if supported) =====
BTW Note: LENGZ OF for BUKKIT may require implementation
BTW VISIBLE SMOOSH "Player count: " LENGZ OF players MKAY

VISIBLE "BUKKIT demo complete!"

KTHXBYE
