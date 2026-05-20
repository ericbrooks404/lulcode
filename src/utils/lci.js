/**
 * LCI detection and management utilities
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Find LCI executable
 * @returns {string|null} Path to LCI or null if not found
 */
function findLCI() {
  // Check custom path from options
  if (process.env.LCI_PATH && fs.existsSync(process.env.LCI_PATH)) {
    return process.env.LCI_PATH;
  }

  // Check common locations
  const locations = [
    path.join(os.homedir(), '.lulcode', 'bin', 'lci'),
    '/usr/local/bin/lci',
    '/usr/bin/lci',
    'lci', // In PATH
  ];

  for (const loc of locations) {
    try {
      if (loc === 'lci') {
        // Check if in PATH
        execSync('which lci', { stdio: 'ignore' });
        return 'lci';
      } else if (fs.existsSync(loc)) {
        return loc;
      }
    } catch (e) {
      // Not found
    }
  }

  return null;
}

/**
 * Execute a LOLCODE program with LCI
 * @param {string} lolFile - Path to .lol file
 * @param {string} lciPath - Path to LCI executable
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
function executeLCI(lolFile, lciPath) {
  return new Promise((resolve, reject) => {
    const lci = spawn(lciPath, [lolFile], {
      stdio: ['inherit', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    lci.stdout.on('data', (data) => {
      stdout += data;
      process.stdout.write(data);
    });

    lci.stderr.on('data', (data) => {
      stderr += data;
      process.stderr.write(data);
    });

    lci.on('close', (code) => {
      resolve({ stdout, stderr, code });
    });

    lci.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Get LCI version
 * @param {string} lciPath - Path to LCI executable
 * @returns {string|null} Version string or null if error
 */
function getLCIVersion(lciPath) {
  try {
    const output = execSync(`${lciPath} --version`, { encoding: 'utf-8' });
    return output.trim();
  } catch (e) {
    return null;
  }
}

module.exports = {
  findLCI,
  executeLCI,
  getLCIVersion,
};
