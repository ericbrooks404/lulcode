/**
 * LULCODE Pattern Transformer
 *
 * Transforms LULCODE bracket notation into LOLCODE 'Z syntax
 * Uses regex-based pattern matching for MVP (not a full parser)
 */

/**
 * Transform LULCODE source to LOLCODE
 * @param {string} source - LULCODE source code
 * @returns {string} - LOLCODE output
 */
function transform(source) {
  let output = source;

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

  return output;
}

module.exports = { transform };
