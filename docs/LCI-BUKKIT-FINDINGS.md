# LCI BUKKIT Implementation - Test Results

**Date**: 2026-05-15  
**LCI Version**: v0.11.2  
**Tested**: `/tmp/lci-build/lci`

## Summary

LCI's BUKKIT is **dictionary-only** (named keys), NOT a hybrid array/dictionary like we assumed.

## What Works ✅

### 1. Create Properties
```lolcode
I HAS A arr ITZ A BUKKIT
arr HAS A key ITZ "value"  ✓ Works
```

### 2. Read Properties  
```lolcode
VISIBLE arr'Z key  ✓ Works
```

### 3. Update Properties (after creation)
```lolcode
arr HAS A key ITZ "first"
arr'Z key R "updated"  ✓ Works
```

### 4. Multiple Named Keys
```lolcode
arr HAS A Alice ITZ 100
arr HAS A Bob ITZ 85
VISIBLE arr'Z Alice  ✓ Outputs: 100
```

## What Doesn't Work ❌

### 1. Numeric Keys
```lolcode
arr HAS A 0 ITZ "test"
❌ Error: expected identifier at: 0
```

**Finding**: LCI BUKKIT keys MUST be identifiers, not numbers

### 2. SRS Syntax (Numeric Indexing)
```lolcode
arr'Z SRS 0 R "value"
❌ Error: unable to store variable: arr
```

**Finding**: SRS syntax not supported in LCI v0.11.2

### 3. Direct Assignment (without HAS A first)
```lolcode
arr'Z key R "value"  (without prior HAS A)
❌ Error: unable to store variable: arr
```

**Finding**: Must use HAS A to create properties first

### 4. Redefining with HAS A
```lolcode
arr HAS A key ITZ "first"
arr HAS A key ITZ "updated"
❌ Error: redefinition of existing variable at: key
```

**Finding**: Can't use HAS A twice for same key

## Critical Design Impact

### Our Original Assumption (WRONG)
- BUKKIT is hybrid: both array (numeric) + dictionary (string keys)
- Based on: Lua tables, PHP arrays, community proposals

### Actual LCI Implementation
- BUKKIT is **dictionary-only**: named keys (identifiers) only
- No numeric indexing
- No true array behavior

### What This Means for LULCODE

**Problem**: Our transpiler generates:
```lolcode
arr'Z SRS 0 R "value"  ← Doesn't work in LCI!
```

**Options**:
1. **Change design**: BUKKIT is dictionary-only in LULCODE too
2. **Emulate arrays**: Transpile `arr[0]` to `arr'Z __0` (identifier-based)
3. **Document limitation**: Note that numeric indices don't work
4. **Extend LCI**: Fork and add numeric key support (big undertaking)

## Recommended Path Forward

### Option A: Dictionary-Only (Simplest)
- LULCODE BUKKIT = dictionary with string keys only
- `arr["key"]` works ✓
- `arr[0]` doesn't compile ✗
- Document clearly: "BUKKIT is for named keys, not arrays"

### Option B: Emulated Numeric Keys (Pragmatic)
- Transpile `arr[0]` → `arr HAS A __0 ITZ value`
- Use identifier `__0`, `__1`, `__2` for numeric indices
- Works with LCI ✓
- Not "real" numeric indexing (can't do `arr[i]` with variable)

### Option C: Wait for LCI Update (Uncertain)
- Check if newer LCI versions support SRS/numeric keys
- Check LCI's `future` branch
- May not exist or be stable

## LCI BUKKIT Syntax Rules

Based on testing:

1. **Create**: `BUKKIT HAS A identifier ITZ expression`
2. **Update**: `BUKKIT'Z identifier R expression`
3. **Read**: `BUKKIT'Z identifier`
4. **Keys**: Must be valid LOLCODE identifiers (letters, no numbers)
5. **No SRS**: Numeric subscripting not supported in v0.11.2

## Operations Testing (TODO)

Still need to test:
- [ ] `LENGZ OF bukkit` - does it work?
- [ ] `HAS A` as boolean check - partially tested ✓
- [ ] Iteration methods
- [ ] `KEYZ OF bukkit` (if exists)

## Next Steps

1. **Decide**: Dictionary-only or emulated arrays?
2. **Update design docs**: Reflect actual LCI capabilities
3. **Adjust transpiler**: Match LCI's actual syntax
4. **Test more**: LENGZ OF, iteration, other operations

---

**Conclusion**: LCI's BUKKIT is more limited than we thought. We need to adjust LULCODE's design to match reality.
