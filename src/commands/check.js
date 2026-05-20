/**
 * Check command: Validate LULCODE syntax without transpiling
 */

const fs = require('fs');
const { transform } = require('../transform');
const { success, error, colors } = require('../utils/colors');
const { fileNotFoundError } = require('../utils/errors');

function check(file, options) {
  // Validate input file
  if (!fs.existsSync(file)) {
    fileNotFoundError(file);
    process.exit(1);
  }

  try {
    // Read source
    const source = fs.readFileSync(file, 'utf-8');

    // Try to transform (this validates syntax)
    transform(source);

    // Success
    success(`Syntax OK: ${colors.cyan(file)}`);
  } catch (err) {
    error(`Syntax error in ${file}`);
    console.error(colors.red(err.message));

    if (options.verbose) {
      console.error(err.stack);
    }

    process.exit(1);
  }
}

module.exports = check;
