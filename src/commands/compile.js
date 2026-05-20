/**
 * Compile command: Transpile LULCODE to LOLCODE
 */

const fs = require('fs');
const path = require('path');
const ora = require('ora');
const chokidar = require('chokidar');
const { transform } = require('../transform');
const { success, error, emoji, colors } = require('../utils/colors');
const { fileNotFoundError } = require('../utils/errors');
const { findLCI, executeLCI } = require('../utils/lci');

async function compile(file, options) {
  // Validate input file
  if (!fs.existsSync(file)) {
    fileNotFoundError(file);
    process.exit(1);
  }

  // Determine output file
  const outputFile = options.output || null;

  // Watch mode
  if (options.watch) {
    return watchMode(file, options);
  }

  // Single transpilation
  const startTime = Date.now();
  let spinner;

  if (outputFile && !options.run) {
    spinner = ora('Transpiling...').start();
  }

  try {
    // Read source
    const source = fs.readFileSync(file, 'utf-8');

    // Transform
    const output = transform(source);

    // Write output
    if (outputFile) {
      fs.writeFileSync(outputFile, output, 'utf-8');
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(3);

      if (spinner) {
        spinner.succeed(`Transpiled ${colors.cyan(file)} → ${colors.cyan(outputFile)} ${colors.dim(`(${elapsed}s)`)}`);
      } else {
        success(`Transpiled ${file} → ${outputFile} (${elapsed}s)`);
      }
    } else {
      // Write to stdout
      process.stdout.write(output);
    }

    // Execute if --run flag
    if (options.run) {
      await runAfterCompile(file, outputFile || getDefaultOutputFile(file), options);
    }
  } catch (err) {
    if (spinner) {
      spinner.fail('Transpilation failed');
    }
    error(`Error: ${err.message}`);
    if (options.verbose) {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

async function watchMode(file, options) {
  console.log(`${emoji.search} Watching ${colors.cyan(file)} for changes...`);

  // Initial compilation
  await compile(file, { ...options, watch: false });

  console.log(`\n${emoji.watch} Watching for changes... (Ctrl+C to stop)\n`);

  // Watch file
  const watcher = chokidar.watch(file, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher.on('change', async () => {
    console.log(`\n${emoji.reload} Changes detected, recompiling...`);
    await compile(file, { ...options, watch: false });
  });

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n\nStopping watch mode...');
    watcher.close();
    process.exit(0);
  });
}

async function runAfterCompile(sourceFile, outputFile, options) {
  const lciPath = options.lciPath || findLCI();

  if (!lciPath) {
    const { lciNotFoundError } = require('../utils/errors');
    lciNotFoundError();
    process.exit(1);
  }

  console.log(`\n${emoji.rocket} Running with LCI...`);
  console.log(colors.dim('─'.repeat(40)));

  const startTime = Date.now();

  try {
    const result = await executeLCI(outputFile, lciPath);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(colors.dim('─'.repeat(40)));

    if (result.code === 0) {
      success(`Execution completed (${elapsed}s)`);
    } else {
      error(`Execution failed with code ${result.code}`);
      process.exit(result.code);
    }
  } catch (err) {
    error(`Failed to execute: ${err.message}`);
    process.exit(1);
  }
}

function getDefaultOutputFile(inputFile) {
  return inputFile.replace(/\.lul$/, '.lol');
}

module.exports = compile;
