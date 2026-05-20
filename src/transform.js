/**
 * LULCODE Pattern Transformer
 *
 * Transforms LULCODE bracket notation into LOLCODE 'Z syntax
 * Uses regex-based pattern matching for MVP (not a full parser)
 */

/**
 * Generate LULCODE runtime library functions
 * @param {Object} options - What functions to include
 * @returns {string} - LOLCODE function definitions
 */
function generateRuntimeLibrary(options = {}) {
  let library = '\nBTW === LULCODE Runtime Library ===\n';

  // String slice function
  if (options.slice) {
    library += `
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
`;
  }

  // Array PUSH operation
  if (options.arrayPush) {
    library += `
BTW Array PUSH: Add element to end
HOW IZ I __LULCODE_ARRAY_PUSH YR arr AN YR value
  I HAS A len ITZ arr'Z __length
  I HAS A key ITZ SMOOSH "__" AN len MKAY
  arr'Z SRS key R value
  arr'Z __length R SUM OF len AN 1
IF U SAY SO
`;
  }

  // Array POP operation
  if (options.arrayPop) {
    library += `
BTW Array POP: Remove and return last element
HOW IZ I __LULCODE_ARRAY_POP YR arr
  I HAS A len ITZ arr'Z __length
  BOTH SAEM len AN 0, O RLY?
    YA RLY
      FOUND YR NOOB
  OIC

  I HAS A idx ITZ DIFF OF len AN 1
  I HAS A key ITZ SMOOSH "__" AN idx MKAY
  I HAS A value ITZ arr'Z SRS key

  BTW Remove element
  arr'Z SRS key R NOOB
  arr'Z __length R idx

  FOUND YR value
IF U SAY SO
`;
  }

  // Array SHIFT operation
  if (options.arrayShift) {
    library += `
BTW Array SHIFT: Remove and return first element
HOW IZ I __LULCODE_ARRAY_SHIFT YR arr
  I HAS A len ITZ arr'Z __length
  BOTH SAEM len AN 0, O RLY?
    YA RLY
      FOUND YR NOOB
  OIC

  BTW Get first element
  I HAS A value ITZ arr'Z __0

  BTW Shift all elements down by one
  I HAS A i ITZ 0
  IM IN YR shift_loop UPPIN YR i TIL BOTH SAEM i AN DIFF OF len AN 1
    I HAS A next ITZ SUM OF i AN 1
    I HAS A curr_key ITZ SMOOSH "__" AN i MKAY
    I HAS A next_key ITZ SMOOSH "__" AN next MKAY
    arr'Z SRS curr_key R arr'Z SRS next_key
  IM OUTTA YR shift_loop

  BTW Remove last element
  I HAS A last_idx ITZ DIFF OF len AN 1
  I HAS A last_key ITZ SMOOSH "__" AN last_idx MKAY
  arr'Z SRS last_key R NOOB
  arr'Z __length R last_idx

  FOUND YR value
IF U SAY SO
`;
  }

  library += '\nBTW === End LULCODE Runtime ===\n';
  return library;
}

/**
 * Transform LULCODE source to LOLCODE
 * @param {string} source - LULCODE source code
 * @returns {string} - LOLCODE output
 */
function transform(source) {
  let output = source;
  let needsSliceFunction = false;
  let needsArrayHelpers = false;

  // BUKKIT string literal transformations FIRST (before extracting strings)
  // Pattern 1: Assignment with string literal key
  // arr["key"] = value → arr'Z key R value
  output = output.replace(
    /(\w+)\["(\w+)"\]\s*=\s*(.+)/g,
    "$1'Z $2 R $3"
  );

  // Pattern 4: Access with string literal key (in expressions)
  // arr["key"] → arr'Z key
  output = output.replace(
    /(\w+)\["(\w+)"\]/g,
    "$1'Z $2"
  );

  // Store strings, comments, and arrays to protect them from other transformations
  const strings = [];
  const comments = [];
  const arrayLiterals = [];
  const STRING_PLACEHOLDER = '__LULCODE_STRING_';
  const COMMENT_PLACEHOLDER = '__LULCODE_COMMENT_';
  const ARRAY_PLACEHOLDER = '__LULCODE_ARRAY_';

  // Extract and store all single-line comments (BTW)
  output = output.replace(/BTW\s+([^\n]*)/g, (match, content) => {
    const index = comments.length;
    comments.push(content);
    return `BTW ${COMMENT_PLACEHOLDER}${index}__`;
  });

  // Extract and store all strings
  output = output.replace(/"([^"]*)"/g, (match, content) => {
    const index = strings.length;
    strings.push(content);
    return `${STRING_PLACEHOLDER}${index}__`;
  });

  // Extract and store array literals [1, 2, 3]
  // Only extract array literals, NOT array access (identifier[index])
  // Match: ITZ [...]  or  = [...]  or start of line [...]
  // Don't match: identifier[...]
  output = output.replace(/(?:ITZ|=|^|\s)\s*\[([^\[\]]*)\]/gm, (match, content) => {
    const prefix = match.substring(0, match.indexOf('['));
    const index = arrayLiterals.length;
    arrayLiterals.push(content.trim());
    return `${prefix}${ARRAY_PLACEHOLDER}${index}__`;
  });

  // String Interpolation: Process stored strings with {var} → :{var}
  for (let i = 0; i < strings.length; i++) {
    let content = strings[i];

    // Handle escaped braces: {{ → { and }} → }
    let processed = content.replace(/\{\{/g, '\x00LEFTBRACE\x00')
                           .replace(/\}\}/g, '\x00RIGHTBRACE\x00');

    // Replace {var} with :{var}
    processed = processed.replace(/\{(\w+)\}/g, ':{$1}');

    // Restore escaped braces
    processed = processed.replace(/\x00LEFTBRACE\x00/g, '{')
                        .replace(/\x00RIGHTBRACE\x00/g, '}');

    strings[i] = processed;
  }

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

  // === SYNTACTIC SUGAR TRANSFORMATIONS ===

  // === BLOCK STATEMENTS (must come before simple operators) ===
  let loopCounter = 0;

  // FOR loops: FOR i FROM start TO end ... END
  output = output.replace(
    /FOR\s+(\w+)\s+FROM\s+(.+?)\s+TO\s+(.+?)(?:\s+STEP\s+(.+?))?\n([\s\S]*?)END/gm,
    (match, varName, start, end, step, body) => {
      loopCounter++;
      const loopLabel = `__for_loop_${loopCounter}`;

      if (step) {
        // With STEP: manual loop
        return `${varName} R ${start}\n` +
               `IM IN YR ${loopLabel}\n` +
               `  BOTH SAEM ${varName} AN BIGGR OF ${varName} AN ${end}, O RLY?\n` +
               `    YA RLY\n` +
               `      GTFO\n` +
               `  OIC\n` +
               body +
               `  ${varName} R SUM OF ${varName} AN ${step}\n` +
               `IM OUTTA YR ${loopLabel}`;
      } else {
        // Simple UPPIN
        return `${varName} R ${start}\n` +
               `IM IN YR ${loopLabel} UPPIN YR ${varName} TIL BOTH SAEM ${varName} AN ${end}\n` +
               body +
               `IM OUTTA YR ${loopLabel}`;
      }
    }
  );

  // WHILE loops: WHILE condition ... END
  output = output.replace(
    /WHILE\s+(.+?)\n([\s\S]*?)END/gm,
    (match, condition, body) => {
      loopCounter++;
      const loopLabel = `__while_loop_${loopCounter}`;
      return `IM IN YR ${loopLabel}\n` +
             `  NOT ${condition}, O RLY?\n` +
             `    YA RLY\n` +
             `      GTFO\n` +
             `  OIC\n` +
             body +
             `IM OUTTA YR ${loopLabel}`;
    }
  );

  // LOOP (infinite): LOOP ... END
  output = output.replace(
    /LOOP\n([\s\S]*?)END/gm,
    (match, body) => {
      loopCounter++;
      const loopLabel = `__loop_${loopCounter}`;
      return `IM IN YR ${loopLabel}\n` +
             body +
             `IM OUTTA YR ${loopLabel}`;
    }
  );

  // IF statements: Handle simple IF first, then IF/ELSE, then IF/ELIF/ELSE
  // Simple IF...END (no else)
  output = output.replace(
    /^IF\s+(.+?)\n([\s\S]*?)^END$/gm,
    (match, condition, body) => {
      // Check if body contains ELSE or ELIF - if so, don't match (let other patterns handle it)
      if (body.match(/^(ELSE|ELIF)\b/m)) {
        return match; // Don't transform, let other patterns handle it
      }
      return `${condition}, O RLY?\n  YA RLY\n${body}OIC`;
    }
  );

  // IF...ELSE...END
  output = output.replace(
    /^IF\s+(.+?)\n([\s\S]*?)^ELSE\n([\s\S]*?)^END$/gm,
    (match, condition, ifBody, elseBody) => {
      // Check if contains ELIF - if so, let ELIF pattern handle it
      if (ifBody.match(/^ELIF\b/m) || elseBody.match(/^ELIF\b/m)) {
        return match;
      }
      return `${condition}, O RLY?\n  YA RLY\n${ifBody}  NO WAI\n${elseBody}OIC`;
    }
  );

  // IF...ELIF...ELSE...END (most complex)
  output = output.replace(
    /^IF\s+(.+?)\n([\s\S]*?)^END$/gm,
    (match, condition, body) => {
      // This handles cases with ELIF
      if (!body.match(/^ELIF\b/m)) {
        return match; // Already handled by simpler patterns
      }

      let result = `${condition}, O RLY?\n  YA RLY\n`;

      // Split body by ELIF and ELSE
      const parts = body.split(/^(ELIF|ELSE)\b/m);
      let currentSection = 'if';

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === 'ELIF' && i + 1 < parts.length) {
          const elifLine = parts[i + 1].split('\n')[0];
          const elifBody = parts[i + 1].substring(elifLine.length + 1);
          result += `  MEBBE ${elifLine.trim()}\n${elifBody}`;
          i++; // Skip next part (already processed)
        } else if (part === 'ELSE' && i + 1 < parts.length) {
          result += `  NO WAI\n${parts[i + 1]}`;
          i++; // Skip next part
        } else if (i === 0) {
          // First part is the IF body
          result += part;
        }
      }

      result += `OIC`;
      return result;
    }
  );

  // VAR declarations: VAR x, y, z → I HAS A x \n I HAS A y \n I HAS A z
  // Must handle: VAR x, VAR x ITZ value, VAR x, y, z
  output = output.replace(
    /\bVAR\s+((?:\w+(?:\s+ITZ\s+[^\n,]+)?(?:\s*,\s*)?)+)(?=\n|$)/gm,
    (match, varList) => {
      // Split by comma
      const vars = varList.split(',').map(v => v.trim());
      return vars.map(v => {
        // Check if has ITZ initializer
        if (v.includes(' ITZ ')) {
          const parts = v.split(/\s+ITZ\s+/);
          return `I HAS A ${parts[0]} ITZ ${parts[1]}`;
        } else {
          return `I HAS A ${v}`;
        }
      }).join('\n');
    }
  );

  // BREAK → GTFO
  output = output.replace(/\bBREAK\b/g, 'GTFO');

  // ARRAY/BUKKIT NUMERIC ACCESS PATTERNS
  // Using __n encoding for numeric indices (array encoding)

  // Pattern: Assignment with numeric literal index
  // arr[0] = value → arr'Z __0 R value
  output = output.replace(
    /(\w+)\[(\d+)\]\s*=\s*(.+)/g,
    "$1'Z __$2 R $3"
  );

  // Pattern: Assignment with variable index
  // arr[i] = value → arr'Z SRS (SMOOSH "__" AN i) R value
  output = output.replace(
    /(\w+)\[(\w+)\]\s*=\s*(.+)/g,
    (match, arr, idx, value) => {
      needsArrayHelpers = true;
      return `${arr}'Z SRS SMOOSH "__" AN ${idx} MKAY R ${value}`;
    }
  );

  // Pattern: Access with numeric literal index
  // arr[0] → arr'Z __0
  output = output.replace(
    /(\w+)\[(\d+)\]/g,
    "$1'Z __$2"
  );

  // Pattern: Access with variable index
  // arr[i] → arr'Z SRS (SMOOSH "__" AN i)
  output = output.replace(
    /(\w+)\[(\w+)\]/g,
    (match, arr, idx) => {
      needsArrayHelpers = true;
      return `${arr}'Z SRS SMOOSH "__" AN ${idx} MKAY`;
    }
  );

  // === ARRAY OPERATIONS ===
  let needsArrayPush = false;
  let needsArrayPop = false;
  let needsArrayShift = false;

  // PUSH operation: PUSH value TO arr
  output = output.replace(
    /\bPUSH\s+(.+?)\s+TO\s+(\w+)/g,
    (match, value, arr) => {
      needsArrayPush = true;
      return `I IZ __LULCODE_ARRAY_PUSH YR ${arr} AN YR ${value} MKAY`;
    }
  );

  // POP operation: POP FROM arr (returns value)
  // Can be used as: VAR x ITZ POP FROM arr
  // Or standalone: POP FROM arr
  output = output.replace(
    /\bPOP\s+FROM\s+(\w+)/g,
    (match, arr) => {
      needsArrayPop = true;
      return `I IZ __LULCODE_ARRAY_POP YR ${arr} MKAY`;
    }
  );

  // SHIFT operation: SHIFT FROM arr (returns value)
  output = output.replace(
    /\bSHIFT\s+FROM\s+(\w+)/g,
    (match, arr) => {
      needsArrayShift = true;
      return `I IZ __LULCODE_ARRAY_SHIFT YR ${arr} MKAY`;
    }
  );

  // === COMPARISON AND LOGICAL OPERATORS ===
  // Must come BEFORE general = operator to avoid confusing == with =

  // Comparison operators (must be done BEFORE logical operators)
  // Use word boundaries and non-greedy matching to avoid capturing too much
  output = output.replace(/(\w+)\s*==\s*(\w+)/g, 'BOTH SAEM $1 AN $2');
  output = output.replace(/(\w+)\s*!=\s*(\w+)/g, 'DIFFRINT $1 AN $2');
  output = output.replace(/(\w+)\s*>=\s*(\w+)/g, 'BOTH SAEM $1 AN BIGGR OF $1 AN $2');
  output = output.replace(/(\w+)\s*<=\s*(\w+)/g, 'BOTH SAEM $2 AN BIGGR OF $1 AN $2');
  output = output.replace(/(\w+)\s*>\s*(\w+)/g, 'BOTH SAEM $1 AN BIGGR OF $1 AN $2');
  output = output.replace(/(\w+)\s*<\s*(\w+)/g, 'BOTH SAEM $2 AN BIGGR OF $1 AN $2');

  // Symbolic logical operators (after comparisons)
  // Match expressions on either side - must be on same line
  output = output.replace(/([^&|\n]+)\s*&&\s*([^&|\n]+)/g, (match, left, right) => {
    return `BOTH OF ${left.trim()} AN ${right.trim()}`;
  });
  output = output.replace(/([^&|\n]+)\s*\|\|\s*([^&|\n]+)/g, (match, left, right) => {
    return `EITHER OF ${left.trim()} AN ${right.trim()}`;
  });

  // Word-based logical operators
  output = output.replace(/\bAND\b/g, 'AN');
  output = output.replace(/\bOR\b/g, 'OREZ'); // Placeholder, may not use
  output = output.replace(/\bNOT\b/g, 'NOT');

  // General assignment: x = value → x R value
  // Must use negative lookahead to avoid ==, !=, >=, <=
  // And must come AFTER BUKKIT assignments
  output = output.replace(/(\w+)\s*=\s+(?!=|!|>|<)(.+?)(?=\n|$)/gm, '$1 R $2');

  // Process array literals before restoration
  // Convert array placeholders in VAR declarations to BUKKIT initialization
  output = output.replace(
    /I HAS A (\w+) ITZ __LULCODE_ARRAY_(\d+)__/g,
    (match, varName, arrayIndex) => {
      const arrayContent = arrayLiterals[arrayIndex];

      if (arrayContent === '') {
        // Empty array: []
        return `I HAS A ${varName} ITZ A BUKKIT\n` +
               `${varName} HAS A __length ITZ 0\n` +
               `${varName} HAS A __is_array ITZ WIN`;
      } else {
        // Array with elements: [1, 2, 3]
        const elements = arrayContent.split(',').map(e => e.trim()).filter(e => e);
        let result = `I HAS A ${varName} ITZ A BUKKIT\n`;
        result += `${varName} HAS A __length ITZ ${elements.length}\n`;
        result += `${varName} HAS A __is_array ITZ WIN`;

        elements.forEach((element, i) => {
          result += `\n${varName} HAS A __${i} ITZ ${element}`;
        });

        return result;
      }
    }
  );

  // Handle ITZ AN ARRAY syntax (alternative to [])
  output = output.replace(
    /I HAS A (\w+) ITZ AN ARRAY/g,
    (match, varName) => {
      return `I HAS A ${varName} ITZ A BUKKIT\n` +
             `${varName} HAS A __length ITZ 0\n` +
             `${varName} HAS A __is_array ITZ WIN`;
    }
  );

  // Note: LENGZ OF is kept as-is for strings
  // For arrays, users should access arr'Z __length directly
  // We can't distinguish strings from arrays at transpile time without type tracking

  // Inject runtime library if needed
  const needsRuntime = needsSliceFunction || needsArrayPush || needsArrayPop || needsArrayShift;

  if (needsRuntime) {
    // Insert runtime library after HAI line
    const runtimeOptions = {
      slice: needsSliceFunction,
      arrayPush: needsArrayPush,
      arrayPop: needsArrayPop,
      arrayShift: needsArrayShift
    };

    output = output.replace(
      /(HAI\s+[\d.]+)/,
      `$1${generateRuntimeLibrary(runtimeOptions)}`
    );
  }

  // Restore strings
  output = output.replace(/__LULCODE_STRING_(\d+)__/g, (match, index) => {
    return `"${strings[index]}"`;
  });

  // Restore comments
  output = output.replace(/__LULCODE_COMMENT_(\d+)__/g, (match, index) => {
    return comments[index];
  });

  return output;
}

module.exports = { transform };
