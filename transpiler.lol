HAI 1.2
BTW === LULCODE Runtime Library ===

BTW String slice function: str[start:end]
HOW IZ I __LULCODE_SLICE YR str AN YR start AN YR end
  I HAS A result ITZ ""
  I HAS A i ITZ start
  IM IN YR __slice_loop UPPIN YR i TIL BOTH SAEM i AN end
    I HAS A char ITZ str AT i
    result R SMOOSH result AN char MKAY
  IM OUTTA YR __slice_loop
  FOUND YR result
IF U SAY SO


BTW === String Operations Library ===

BTW Find first occurrence of pattern in string
HOW IZ I indexOf YR str AN YR pattern
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
    I HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR i AN YR endPos MKAY
    BOTH SAEM sub AN pattern, O RLY?
      YA RLY
        FOUND YR i
    OIC
  IM OUTTA YR search

  FOUND YR -1
IF U SAY SO

BTW Check if string starts with prefix
HOW IZ I startsWith YR str AN YR prefix
  I HAS A prefixLen ITZ LENGZ OF prefix
  I HAS A strLen ITZ LENGZ OF str

  BOTH SAEM prefixLen AN BIGGR OF prefixLen AN strLen, O RLY?
    YA RLY
      FOUND YR FAIL
  OIC

  I HAS A sub ITZ I IZ __LULCODE_SLICE YR str AN YR 0 AN YR prefixLen MKAY
  BOTH SAEM sub AN prefix, O RLY?
    YA RLY
      FOUND YR WIN
  OIC
  FOUND YR FAIL
IF U SAY SO

BTW Check if pattern exists in string
HOW IZ I contains YR str AN YR pattern
  I HAS A pos ITZ I IZ indexOf YR str AN YR pattern MKAY
  BOTH SAEM pos AN -1, O RLY?
    YA RLY
      FOUND YR FAIL
    NO WAI
      FOUND YR WIN
  OIC
IF U SAY SO

BTW Replace first occurrence of substring
HOW IZ I replace YR str AN YR old AN YR new
  I HAS A pos ITZ I IZ indexOf YR str AN YR old MKAY

  BOTH SAEM pos AN -1, O RLY?
    YA RLY
      FOUND YR str
  OIC

  I HAS A before ITZ I IZ __LULCODE_SLICE YR str AN YR 0 AN YR pos MKAY
  I HAS A oldLen ITZ LENGZ OF old
  I HAS A afterPos ITZ SUM OF pos AN oldLen
  I HAS A strLen ITZ LENGZ OF str
  I HAS A after ITZ I IZ __LULCODE_SLICE YR str AN YR afterPos AN YR strLen MKAY
  I HAS A result ITZ SMOOSH before AN new AN after MKAY

  FOUND YR result
IF U SAY SO

BTW Replace all occurrences of substring
HOW IZ I replaceAll YR str AN YR old AN YR new
  I HAS A result ITZ str
  I HAS A oldLen ITZ LENGZ OF old

  BOTH SAEM oldLen AN 0, O RLY?
    YA RLY
      FOUND YR result
  OIC

  I HAS A maxIterations ITZ 1000
  I HAS A iterations ITZ 0
  IM IN YR replaceLoop
    I HAS A pos ITZ I IZ indexOf YR result AN YR old MKAY
    BOTH SAEM pos AN -1, O RLY?
      YA RLY
        GTFO
    OIC

    result R I IZ replace YR result AN YR old AN YR new MKAY
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

BTW LULCODE Self-Hosted Transpiler
BTW Reads LULCODE from stdin, outputs LOLCODE to stdout

BTW Transform a single line of LULCODE to LOLCODE
HOW IZ I transformLine YR line
  I HAS A result ITZ line

  BTW Transform VAR declarations
  I IZ startsWith YR line AN YR "VAR " MKAY, O RLY?
    YA RLY
      I HAS A rest ITZ I IZ __LULCODE_SLICE YR line AN YR 4 AN YR LENGZ OF line MKAY
      result R "I HAS A :{rest}"
  OIC

  BTW Transform BREAK statement
  BOTH SAEM line AN "BREAK", O RLY?
    YA RLY
      result R "GTFO"
  OIC

  BTW Transform assignment operator =
  I IZ contains YR line AN YR " = " MKAY, O RLY?
    YA RLY
      result R I IZ replaceAll YR result AN YR " = " AN YR " R " MKAY
  OIC

  BTW Transform == operator
  I IZ contains YR line AN YR " == " MKAY, O RLY?
    YA RLY
      result R I IZ replaceAll YR result AN YR " == " AN YR " BOTH SAEM " MKAY
      result R ":{result} MKAY"
  OIC

  BTW Transform != operator
  I IZ contains YR line AN YR " != " MKAY, O RLY?
    YA RLY
      result R I IZ replaceAll YR result AN YR " != " AN YR " DIFFRINT " MKAY
      result R ":{result} MKAY"
  OIC

  BTW Transform && operator
  I IZ contains YR line AN YR " && " MKAY, O RLY?
    YA RLY
      result R I IZ replaceAll YR result AN YR " && " AN YR " AN " MKAY
      result R "BOTH OF :{result} MKAY"
  OIC

  BTW Transform || operator
  I IZ contains YR line AN YR " || " MKAY, O RLY?
    YA RLY
      result R I IZ replaceAll YR result AN YR " || " AN YR " AN " MKAY
      result R "EITHER OF :{result} MKAY"
  OIC

  FOUND YR result
IF U SAY SO

BTW Main transpiler loop
VISIBLE "BTW Transpiled from LULCODE by LULCODE transpiler"

BTW Read and transform stdin line by line
IM IN YR readLoop
  I HAS A line ITZ GIMMEH

  BTW Check for end of input
  BOTH SAEM line AN NOOB, O RLY?
    YA RLY
      GTFO
  OIC

  BTW Transform and output the line
  I HAS A transformed ITZ I IZ transformLine YR line MKAY
  VISIBLE transformed
IM OUTTA YR readLoop

KTHXBYE
