HAI 1.2
BTW === LULCODE Runtime Library ===

BTW String slice function: str[start:end]
HOW DUZ I LULCODE_SLICE YR str AN YR start AN YR end
  I HAS A result ITZ ""
  I HAS A i ITZ start
  IM IN YR sliceLoop UPPIN YR i TIL BOTH SAEM i AN end
    I HAS A char ITZ str AT i
    result R SMOOSH result AN char MKAY
  IM OUTTA YR sliceLoop
  FOUND YR result
IF U SAY SO


BTW === String Operations Library ===

BTW Find first occurrence of pattern in string
HOW DUZ I indexOf YR str AN YR pattern
  I HAS A strLen ITZ LENGZ OF str
  I HAS A patLen ITZ LENGZ OF pattern

  BTW Edge case: pattern longer than string
  BOTH SAEM patLen AN BIGGR OF patLen AN strLen, O RLY?
    YA RLY
      FOUND YR -1
  OIC

  I HAS A maxPos ITZ DIFF OF strLen AN patLen
  I HAS A i ITZ 0
  IM IN YR search UPPIN YR i TIL BOTH SAEM i AN SUM OF maxPos AN 1
    I HAS A endPos ITZ SUM OF i AN patLen
    I HAS A sub ITZ LULCODE_SLICE str i endPos
    BOTH SAEM sub AN pattern, O RLY?
      YA RLY
        FOUND YR i
    OIC
  IM OUTTA YR search

  FOUND YR -1
IF U SAY SO

BTW Check if string starts with prefix
HOW DUZ I startsWith YR str AN YR prefix
  I HAS A prefixLen ITZ LENGZ OF prefix
  I HAS A strLen ITZ LENGZ OF str

  BOTH SAEM prefixLen AN BIGGR OF prefixLen AN strLen, O RLY?
    YA RLY
      FOUND YR FAIL
  OIC

  I HAS A sub ITZ LULCODE_SLICE str 0 prefixLen
  BOTH SAEM sub AN prefix, O RLY?
    YA RLY
      FOUND YR WIN
  OIC
  FOUND YR FAIL
IF U SAY SO

BTW Check if pattern exists in string
HOW DUZ I contains YR str AN YR pattern
  I HAS A pos ITZ indexOf str pattern
  BOTH SAEM pos AN -1, O RLY?
    YA RLY
      FOUND YR FAIL
    NO WAI
      FOUND YR WIN
  OIC
IF U SAY SO

BTW Replace first occurrence of substring
HOW DUZ I replace YR str AN YR old AN YR new
  I HAS A pos ITZ indexOf str old

  BOTH SAEM pos AN -1, O RLY?
    YA RLY
      FOUND YR str
  OIC

  I HAS A before ITZ LULCODE_SLICE str 0 pos
  I HAS A oldLen ITZ LENGZ OF old
  I HAS A afterPos ITZ SUM OF pos AN oldLen
  I HAS A strLen ITZ LENGZ OF str
  I HAS A after ITZ LULCODE_SLICE str afterPos strLen
  I HAS A result ITZ SMOOSH before AN new AN after MKAY

  FOUND YR result
IF U SAY SO

BTW Replace all occurrences of substring
HOW DUZ I replaceAll YR str AN YR old AN YR new
  I HAS A result ITZ str
  I HAS A oldLen ITZ LENGZ OF old

  BOTH SAEM oldLen AN 0, O RLY?
    YA RLY
      FOUND YR result
  OIC

  I HAS A maxIterations ITZ 1000
  I HAS A iterations ITZ 0
  IM IN YR replaceLoop
    I HAS A pos ITZ indexOf result old
    BOTH SAEM pos AN -1, O RLY?
      YA RLY
        GTFO
    OIC

    result R replace result old new
    iterations R SUM OF iterations AN 1
    BOTH SAEM iterations AN maxIterations, O RLY?
      YA RLY
        GTFO
    OIC
  IM OUTTA YR replaceLoop

  FOUND YR result
IF U SAY SO

BTW === End String Operations ===
BTW === End LULCODE Runtime ===

BTW LULCODE Self-Hosted Transpiler (MVP)
BTW Transforms basic LULCODE patterns to LOLCODE

BTW Transform a single line of LULCODE to LOLCODE
HOW DUZ I transformLine YR line
  I HAS A result ITZ line

  BTW Transform VAR declarations: VAR x ITZ value -> I HAS A x ITZ value
  I HAS A hasVAR ITZ startsWith line "VAR "
  hasVAR, O RLY?
    YA RLY
      BTW Extract everything after "VAR "
      I HAS A rest ITZ LULCODE_SLICE line 4 LENGZ OF line
      result R SMOOSH "I HAS A " AN rest MKAY
  OIC

  BTW Transform assignment operator: x = value -> x R value
  I HAS A hasEquals ITZ contains result " = "
  hasEquals, O RLY?
    YA RLY
      result R replaceAll result " = " " R "
  OIC

  BTW Transform BREAK -> GTFO
  BOTH SAEM result AN "BREAK", O RLY?
    YA RLY
      result R "GTFO"
  OIC

  BTW Transform == operator
  I HAS A hasEqEq ITZ contains result "=="
  hasEqEq, O RLY?
    YA RLY
      result R replaceAll result "==" "BOTH SAEM"
  OIC

  BTW Transform != operator
  I HAS A hasNotEq ITZ contains result "!="
  hasNotEq, O RLY?
    YA RLY
      result R replaceAll result "!=" "DIFFRINT"
  OIC

  FOUND YR result
IF U SAY SO

BTW Main transpiler - reads from stdin, writes to stdout
VISIBLE "HAI 1.2"

BTW Read and transform each line
BTW (For MVP, we'll just transform a few test lines)
I HAS A line1 ITZ "VAR x ITZ 42"
I HAS A out1 ITZ transformLine line1
VISIBLE out1

I HAS A line2 ITZ "x = 100"
I HAS A out2 ITZ transformLine line2
VISIBLE out2

I HAS A line3 ITZ "BREAK"
I HAS A out3 ITZ transformLine line3
VISIBLE out3

VISIBLE "KTHXBYE"

KTHXBYE
