/**
 * LULCODE Pattern Transformer
 *
 * Transforms LULCODE bracket notation into LOLCODE 'Z syntax
 * Uses regex-based pattern matching for MVP (not a full parser)
 */

/**
 * Generate LULCODE runtime library functions
 * @returns {string} - LOLCODE function definitions
 */
function generateRuntimeLibrary() {
  return `
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

BTW === End LULCODE Runtime ===
`;
}

/**
 * Transform LULCODE source to LOLCODE
 * @param {string} source - LULCODE source code
 * @returns {string} - LOLCODE output
 */
function transform(source) {
  let output = source;
  let needsSliceFunction = false;

  // String Interpolation: {var} → :{var}
  // Match strings containing {var} and convert to LOLCODE :{var} syntax
  output = output.replace(
    /"([^"]*\{[^}]+\}[^"]*)"/g,
    (match, content) => {
      // First handle escaped braces: {{ → { and }} → }
      let processed = content.replace(/\{\{/g, '\x00LEFTBRACE\x00')
                             .replace(/\}\}/g, '\x00RIGHTBRACE\x00');

      // Replace {var} with :{var}
      processed = processed.replace(/\{(\w+)\}/g, ':{$1}');

      // Restore escaped braces
      processed = processed.replace(/\x00LEFTBRACE\x00/g, '{')
                          .replace(/\x00RIGHTBRACE\x00/g, '}');

      return `"${processed}"`;
    }
  );

  // String Slice: str[start:end] → function call
  // Must come BEFORE BUKKIT patterns (which don't have colons)
  // Handles: [start:end], [start:], [:end], [:]
  output = output.replace(
    /(\w+)\[(-?\d+|\w*):(-?\d+|\w*)\]/g,
    (match, str, start, end) => {
      needsSliceFunction = true;

      // Handle omitted start (defaults to 0)
      const startExpr = start === '' ? '0' : start;

      // Handle omitted end (use string length)
      const endExpr = end === '' ? `LENGZ OF ${str}` : end;

      // Handle negative indices by converting to positive
      let finalStart = startExpr;
      let finalEnd = endExpr;

      if (startExpr.startsWith('-')) {
        // Negative start: convert to (LENGZ OF str) + start
        const offset = startExpr.substring(1);
        finalStart = `DIFF OF LENGZ OF ${str} AN ${offset}`;
      }

      if (endExpr.startsWith('-')) {
        // Negative end: convert to (LENGZ OF str) + end
        const offset = endExpr.substring(1);
        finalEnd = `DIFF OF LENGZ OF ${str} AN ${offset}`;
      }

      return `I IZ __LULCODE_SLICE YR ${str} AN YR ${finalStart} AN YR ${finalEnd} MKAY`;
    }
  );

  // Pattern 1: Assignment with string literal key
  // arr["key"] = value → arr'Z key R value
  output = output.replace(
    /(\w+)\["(\w+)"\]\s*=\s*(.+)/g,
    "$1'Z $2 R $3"
  );

  // Pattern 2: Assignment with numeric literal key
  // arr[0] = value → arr'Z SRS 0 R value
  output = output.replace(
    /(\w+)\[(\d+)\]\s*=\s*(.+)/g,
    "$1'Z SRS $2 R $3"
  );

  // Pattern 3: Assignment with variable key (must come after numeric)
  // arr[key] = value → arr'Z SRS key R value
  output = output.replace(
    /(\w+)\[(\w+)\]\s*=\s*(.+)/g,
    "$1'Z SRS $2 R $3"
  );

  // Pattern 4: Access with string literal key (in expressions)
  // arr["key"] → arr'Z key
  output = output.replace(
    /(\w+)\["(\w+)"\]/g,
    "$1'Z $2"
  );

  // Pattern 5: Access with numeric literal key
  // arr[0] → arr'Z SRS 0
  output = output.replace(
    /(\w+)\[(\d+)\]/g,
    "$1'Z SRS $2"
  );

  // Pattern 6: Access with variable key (must come after numeric)
  // arr[index] → arr'Z SRS index
  output = output.replace(
    /(\w+)\[(\w+)\]/g,
    "$1'Z SRS $2"
  );

  // Inject runtime library if needed
  if (needsSliceFunction) {
    // Insert runtime library after HAI line
    output = output.replace(
      /(HAI\s+[\d.]+)/,
      `$1${generateRuntimeLibrary()}`
    );
  }

  return output;
}

module.exports = { transform };
