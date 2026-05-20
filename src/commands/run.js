/**
 * Run command: Transpile and execute in one step
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { transform } = require('../transform');
const { success, error, emoji, colors } = require('../utils/colors');
const { fileNotFoundError, lciNotFoundError } = require('../utils/errors');
const { findLCI, executeLCI } = require('../utils/lci');

async function run(file, options) {
  // Validate input file
  if (!fs.existsSync(file)) {
    fileNotFoundError(file);
    process.exit(1);
  }

  // Find LCI
  const lciPath = options.lciPath || findLCI();
  if (!lciPath) {
    lciNotFoundError();
    process.exit(1);
  }

  try {
    // Read source
    const source = fs.readFileSync(file, 'utf-8');

    // Transform
    const output = transform(source);

    // Determine temp file location
    let tempFile;
    if (options.keep) {
      // Keep in same directory
      tempFile = file.replace(/\.lul$/, '.lol');
    } else {
      // Use temp directory
      const tmpDir = os.tmpdir();
      const basename = path.basename(file, '.lul');
      tempFile = path.join(tmpDir, `${basename}-${Date.now()}.lol`);
    }

    // Write transpiled output
    fs.writeFileSync(tempFile, output, 'utf-8');

    if (options.verbose) {
      console.log(colors.dim(`[DEBUG] Transpiled to ${tempFile}`));
    }

    // Execute
    console.log(`${emoji.rocket} Running ${colors.cyan(file)}...`);
    console.log(colors.dim('─'.repeat(40)));

    const startTime = Date.now();
    const result = await executeLCI(tempFile, lciPath);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(colors.dim('─'.repeat(40)));

    // Clean up temp file
    if (!options.keep) {
      fs.unlinkSync(tempFile);
    } else {
      console.log(colors.dim(`Kept transpiled file: ${tempFile}`));
    }

    if (result.code === 0) {
      success(`Execution completed (${elapsed}s)`);
    } else {
      error(`Execution failed with code ${result.code}`);
      process.exit(result.code);
    }
  } catch (err) {
    error(`Error: ${err.message}`);
    if (options.verbose) {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

module.exports = run;
