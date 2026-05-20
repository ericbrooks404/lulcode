/**
 * lol-coffee execution utilities
 *
 * Executes LOLCODE programs using the lol-coffee runtime
 * (transpilation-based, preserves LULCODE → LOLCODE → JavaScript chain)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Cache for loaded lol-coffee modules
let LOLCoffeeCache = null;

/**
 * Load lol-coffee modules into a VM context
 * @returns {Object} LOLCoffee namespace
 */
function loadLOLCoffee() {
  if (LOLCoffeeCache) {
    return LOLCoffeeCache;
  }

  // Create sandbox context with Error constructor
  const sandbox = {
    console: console,
    Error: Error  // Pass Error constructor so TokenizerError/ParserError work
  };
  const context = vm.createContext(sandbox);

  // Load modules in dependency order
  const runtimePath = path.join(__dirname, '../../runtime/lol-coffee');
  const modules = ['base.js', 'machine.js', 'ast.js', 'tokenizer.js', 'parser.js'];

  for (const mod of modules) {
    const modulePath = path.join(runtimePath, mod);
    const code = fs.readFileSync(modulePath, 'utf8');
    vm.runInContext(code, context);
  }

  LOLCoffeeCache = sandbox.LOLCoffee;
  return LOLCoffeeCache;
}

/**
 * Execute a LOLCODE program with lol-coffee
 * @param {string} lolFile - Path to .lol file
 * @param {Object} options - Execution options
 * @param {boolean} options.verbose - Show verbose output
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
function executeLOLCOFFEE(lolFile, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      // Read LOLCODE source
      const source = fs.readFileSync(lolFile, 'utf8');

      // Load lol-coffee
      const LOLCoffee = loadLOLCoffee();

      // Tokenize
      let tokenized;
      try {
        tokenized = new LOLCoffee.Tokenizer(source).tokenize();
        if (options.verbose) {
          console.log(`[DEBUG] Tokenized: ${tokenized.length} tokens`);
        }
      } catch (e) {
        reject(new Error(`Tokenization error: ${e.message}`));
        return;
      }

      // Parse
      let parsed;
      try {
        parsed = new LOLCoffee.Parser(tokenized).parseProgram();
        if (options.verbose) {
          console.log(`[DEBUG] Parsed successfully`);
        }
      } catch (e) {
        reject(new Error(`Parse error: ${e.message}`));
        return;
      }

      // Generate code
      let codegenContext;
      try {
        codegenContext = new LOLCoffee.CodeGenContext();
        parsed.codegen(codegenContext);
        if (options.verbose) {
          console.log(`[DEBUG] Generated ${codegenContext.instructions.length} instructions`);
        }
      } catch (e) {
        reject(new Error(`Code generation error: ${e.message}`));
        return;
      }

      // Execute
      let stdout = '';
      let stderr = '';

      const machine = new LOLCoffee.Machine(
        codegenContext,

        // Input callback
        function() {
          // For now, we'll handle input synchronously by throwing an error
          // TODO: Implement proper async input handling
          const readline = require('readline');
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });

          rl.question('', (answer) => {
            machine.resume(answer);
            rl.close();
          });
        },

        // Output callback
        function(output) {
          stdout += output + '\n';
          process.stdout.write(output + '\n');
          machine.resume();
        },

        // Error callback
        function(error) {
          stderr += error.message + '\n';
          reject(new Error(`Runtime error: ${error.message}`));
        },

        // Halt callback
        function() {
          resolve({
            stdout,
            stderr,
            code: 0
          });
        }
      );

      // Start execution
      machine.run();

    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Get lol-coffee version info
 * @returns {string} Version string
 */
function getLOLCOFFEEVersion() {
  return 'lol-coffee 1.0 (bundled with LULCODE)';
}

/**
 * Check if lol-coffee runtime is available
 * @returns {boolean} True if runtime files exist
 */
function hasLOLCOFFEE() {
  try {
    const runtimePath = path.join(__dirname, '../../runtime/lol-coffee');
    const modules = ['base.js', 'machine.js', 'ast.js', 'tokenizer.js', 'parser.js'];

    for (const mod of modules) {
      const modulePath = path.join(runtimePath, mod);
      if (!fs.existsSync(modulePath)) {
        return false;
      }
    }

    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  executeLOLCOFFEE,
  getLOLCOFFEEVersion,
  hasLOLCOFFEE,
  loadLOLCoffee,
};
