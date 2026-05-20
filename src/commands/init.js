/**
 * Init command: Initialize a new LULCODE project
 */

const fs = require('fs');
const path = require('path');
const { success, error, info, colors } = require('../utils/colors');

const TEMPLATES = {
  basic: {
    'main.lul': `HAI 1.2
BTW Hello World in LULCODE

VISIBLE "Hello, World!"

KTHXBYE
`,
    'README.md': `# My LULCODE Project

A LULCODE project.

## Usage

\`\`\`bash
lulcode run main.lul
\`\`\`

## Learn More

- [LULCODE Documentation](https://github.com/lulcode/lulcode)
- [LOLCODE Specification](https://github.com/justinmeza/lolcode-spec)
`,
    '.gitignore': `# Transpiled LOLCODE files
*.lol

# Node modules (if using npm)
node_modules/

# Temp files
.DS_Store
`,
  },
  game: {
    'game.lul': `HAI 1.2
BTW Simple number guessing game in LULCODE

VISIBLE "I'm thinking of a number between 1 and 10..."

VAR secret ITZ 7
VAR guess

GIMMEH guess
guess R MAEK guess A NUMBR

IF guess == secret
  VISIBLE "You got it!"
ELSE
  VISIBLE "Nope, it was {secret}"
END

KTHXBYE
`,
    'README.md': `# LULCODE Game

A simple game written in LULCODE.

## Run

\`\`\`bash
lulcode run game.lul
\`\`\`
`,
    '.gitignore': `*.lol
node_modules/
.DS_Store
`,
  },
};

function init(directory, options) {
  const targetDir = directory || '.';
  const template = options.template || 'basic';

  // Validate template
  if (!TEMPLATES[template]) {
    error(`Unknown template: ${template}`);
    info(`Available templates: ${Object.keys(TEMPLATES).join(', ')}`);
    process.exit(1);
  }

  // Create directory if needed
  if (directory && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Check if directory is empty
  const files = fs.readdirSync(targetDir);
  if (files.length > 0 && !files.every(f => f.startsWith('.'))) {
    error(`Directory ${targetDir} is not empty`);
    process.exit(1);
  }

  // Create files from template
  const templateFiles = TEMPLATES[template];
  for (const [filename, content] of Object.entries(templateFiles)) {
    const filePath = path.join(targetDir, filename);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(colors.dim(`  Created ${filename}`));
  }

  // Success message
  console.log('');
  success(`Initialized LULCODE project in ${colors.cyan(targetDir)}`);

  // Next steps
  console.log('\nNext steps:');
  if (directory) {
    console.log(colors.cyan(`  cd ${directory}`));
  }
  console.log(colors.cyan('  lulcode run main.lul'));
  console.log('');
}

module.exports = init;
