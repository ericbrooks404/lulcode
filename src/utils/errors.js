/**
 * Error formatting utilities
 */

const { colors, error: errorLog } = require('./colors');
const fs = require('fs');
const path = require('path');

/**
 * Format a file not found error with suggestions
 */
function fileNotFoundError(filePath) {
  errorLog(`Could not find '${filePath}'`);

  // Try to suggest similar files
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath);

  try {
    const files = fs.readdirSync(dir);
    const suggestions = files
      .filter(f => f.includes('.lul') || f.includes('.lol'))
      .filter(f => levenshteinDistance(f, basename) < 5)
      .slice(0, 3);

    if (suggestions.length > 0) {
      console.error('\nDid you mean one of these?');
      suggestions.forEach(s => {
        console.error(`  • ${s}`);
      });
    }
  } catch (e) {
    // Directory doesn't exist or can't be read
  }
}

/**
 * Format a syntax error with context
 */
function syntaxError(file, line, column, message, hint) {
  errorLog('Transpilation failed\n');

  console.error(colors.dim(`${file}:${line}:${column}`));

  // TODO: Show code context when we have proper parsing
  console.error(`\nError: ${message}`);

  if (hint) {
    console.error(colors.cyan(`\nTip: ${hint}`));
  }
}

/**
 * Format an LCI not found error
 */
function lciNotFoundError() {
  errorLog('LCI interpreter not found\n');

  console.error('LULCODE requires LCI to run programs.\n');
  console.error('To install LCI:');
  console.error(colors.cyan('  ./install.sh'));
  console.error('\nOr download manually from:');
  console.error(colors.dim('  https://github.com/justinmeza/lci'));
}

/**
 * Simple Levenshtein distance for string similarity
 */
function levenshteinDistance(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

module.exports = {
  fileNotFoundError,
  syntaxError,
  lciNotFoundError,
};
