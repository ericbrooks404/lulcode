HAI 1.2
BTW String Interpolation Demo - LULCODE Sugar

BTW ===== SIMPLE INTERPOLATION =====
VISIBLE "=== Simple Interpolation ==="
I HAS A name ITZ "Alice"
I HAS A age ITZ 30

VISIBLE "Hello :{name}!"
VISIBLE "You are :{age} years old."

BTW ===== MULTIPLE VARIABLES =====
VISIBLE ""
VISIBLE "=== Multiple Variables ==="
I HAS A x ITZ 10
I HAS A y ITZ 20
I HAS A sum ITZ SUM OF x AN y

VISIBLE ":{x} + :{y} = :{sum}"

BTW ===== WITH BUKKIT =====
VISIBLE ""
VISIBLE "=== With BUKKIT ==="
I HAS A player ITZ A BUKKIT
player HAS A playerName ITZ "Bob"
player HAS A playerScore ITZ 100

BTW Extract to variables for interpolation
I HAS A pName ITZ player'Z playerName
I HAS A pScore ITZ player'Z playerScore

VISIBLE "Player: :{pName}"
VISIBLE "Score: :{pScore}"

BTW Note: Can't interpolate BUKKIT properties directly
BTW Must extract to variables first

BTW ===== ESCAPED BRACES =====
VISIBLE ""
VISIBLE "=== Escaped Braces ==="
I HAS A var ITZ "value"
VISIBLE "Use {braces} to show literal :{var}"

BTW ===== COMPARISON =====
VISIBLE ""
VISIBLE "=== Old vs New ==="
VISIBLE "Old: " BTW SMOOSH style
VISIBLE SMOOSH "Hello " name "!" MKAY
VISIBLE "New: Hello :{name}!"

VISIBLE ""
VISIBLE "String interpolation demo complete!"

KTHXBYE
