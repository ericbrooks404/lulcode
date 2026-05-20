/**
 * Color and emoji utilities
 */

const chalk = require('chalk');

// Check if colors are disabled
const colors = process.env.NO_COLOR || process.argv.includes('--no-color')
  ? {
      success: (text) => text,
      error: (text) => text,
      warning: (text) => text,
      info: (text) => text,
      dim: (text) => text,
      bold: (text) => text,
      green: (text) => text,
      red: (text) => text,
      yellow: (text) => text,
      blue: (text) => text,
      cyan: (text) => text,
    }
  : {
      success: chalk.green,
      error: chalk.red,
      warning: chalk.yellow,
      info: chalk.blue,
      dim: chalk.dim,
      bold: chalk.bold,
      green: chalk.green,
      red: chalk.red,
      yellow: chalk.yellow,
      blue: chalk.blue,
      cyan: chalk.cyan,
    };

// Emoji helpers
const emoji = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  rocket: '🚀',
  watch: '👀',
  reload: '🔄',
  search: '🔍',
};

function success(message) {
  console.log(colors.success(`${emoji.success} ${message}`));
}

function error(message) {
  console.error(colors.error(`${emoji.error} ${message}`));
}

function warning(message) {
  console.warn(colors.warning(`${emoji.warning} ${message}`));
}

function info(message) {
  console.log(colors.info(`${emoji.info} ${message}`));
}

module.exports = {
  colors,
  emoji,
  success,
  error,
  warning,
  info,
};
