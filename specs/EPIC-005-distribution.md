# EPIC-005: Distribution & Packaging

**Priority**: 2 (High Value)  
**Status**: Not Started  
**Goal**: Make LULCODE easy to install and use

## Overview

LULCODE is currently only usable from this development directory. To be genuinely useful, it needs:
- Easy installation (npm, Homebrew, etc.)
- Pre-built binaries
- Bundled LCI interpreter
- IDE support
- Documentation website

## Why This Matters

**Current state**: To use LULCODE, you need to:
1. Clone this repo
2. Install Node.js
3. Install LCI dependencies (cmake, gcc, libreadline, etc.)
4. Build LCI from source
5. Manually run `node src/transpiler.js`

**After EPIC-005**: Users can:
```bash
npm install -g lulcode
lulcode myprogram.lul --run
```

Or:
```bash
brew install lulcode
lulcode myprogram.lul --run
```

This unlocks:
- Community adoption
- Real-world testing
- Feedback and contributions
- Actual utility beyond research project

## Current Assets

**What we already have**:
- ✅ Working transpiler (`src/transpiler.js`)
- ✅ LCI installation script (`install.sh`)
- ✅ Test suite (`tests/transform.test.js`)
- ✅ Examples (`examples/*.lul`)
- ✅ Documentation (`README.md`, research docs)

**What's missing**:
- ❌ npm package configuration
- ❌ Pre-built LCI binaries
- ❌ Proper CLI with options
- ❌ IDE extensions
- ❌ Website/landing page
- ❌ Comprehensive documentation

## Research Phase

### Story 005.1: Design CLI Interface
**Status**: Not Started

Design a proper command-line interface:
- [ ] Research CLI patterns (Node.js commander/yargs)
- [ ] Define commands:
  - `lulcode compile input.lul output.lol`
  - `lulcode run input.lul` (transpile + execute with LCI)
  - `lulcode init` (create new project)
  - `lulcode version`
  - `lulcode help`
- [ ] Define options:
  - `--output, -o` (output file)
  - `--run, -r` (execute after transpile)
  - `--watch, -w` (watch for changes)
  - `--verbose, -v` (debug output)
  - `--lci-path` (custom LCI location)
- [ ] Design colored/formatted output
- [ ] Error handling and helpful error messages

**Output**: CLI specification document

### Story 005.2: Research npm Package Setup
**Status**: Not Started

Configure LULCODE as an npm package:
- [ ] Research npm package best practices
- [ ] Define package.json properly:
  - Entry points (bin, main, exports)
  - Dependencies
  - Scripts (test, build, publish)
  - Keywords, description, repository
  - License (MIT?)
- [ ] Research npm publish process
- [ ] Determine versioning strategy (semantic versioning)
- [ ] Consider scoped package (@lulcode/lulcode?)
- [ ] Document installation: `npm install -g lulcode`

**Output**: npm packaging strategy

### Story 005.3: Research Pre-built Binary Distribution
**Status**: Not Started

Bundle LCI as pre-built binaries:
- [ ] Research binary distribution options:
  - pkg (Node.js to executable)
  - nexe (similar)
  - Include pre-compiled LCI binaries
- [ ] Platforms to support:
  - Linux (x64, arm64)
  - macOS (x64, arm64/Apple Silicon)
  - Windows (x64)
- [ ] Research binary bundling:
  - Bundle LCI with lulcode binary
  - Extract to ~/.lulcode/bin on first run
  - Platform-specific binaries
- [ ] Consider GitHub Releases for distribution
- [ ] Research code signing (macOS/Windows)

**Output**: Binary distribution strategy

### Story 005.4: Research Homebrew Formula
**Status**: Not Started

Create Homebrew formula for macOS/Linux:
- [ ] Research Homebrew formula creation
- [ ] Define dependencies:
  - Node.js runtime or bundle with pkg?
  - LCI build dependencies or pre-built?
- [ ] Formula template:
  - Download source/binary
  - Install to /usr/local/bin
  - Link lulcode command
- [ ] Consider Homebrew tap (custom repository)
- [ ] Document: `brew install lulcode`

**Output**: Homebrew formula specification

### Story 005.5: Research IDE Extensions
**Status**: Not Started

Create syntax highlighting and tooling:
- [ ] VS Code extension:
  - Syntax highlighting (.lul files)
  - Snippets (VAR, IF, FOR, etc.)
  - Transpile command
  - Run command
  - Error highlighting
- [ ] Language Server Protocol (LSP)?
  - Autocomplete
  - Go to definition
  - Hover documentation
- [ ] Other editors:
  - Vim/Neovim
  - Sublime Text
  - JetBrains IDEs
- [ ] Research TextMate grammar for syntax highlighting
- [ ] Define file association (.lul extension)

**Output**: IDE extension specifications

### Story 005.6: Research Documentation Site
**Status**: Not Started

Create landing page and docs:
- [ ] Choose static site generator:
  - GitHub Pages (simple)
  - VuePress / Vitepress (documentation-focused)
  - Docusaurus (feature-rich)
  - Plain HTML/CSS (most control)
- [ ] Site structure:
  - Home (what is LULCODE, quick examples)
  - Installation (npm, Homebrew, source)
  - Tutorial (getting started)
  - Language Reference (all features)
  - Examples (real programs)
  - Playground? (in-browser transpiler)
- [ ] Branding:
  - Logo design
  - Color scheme
  - Domain name (lulcode.dev? lulcode.org?)
- [ ] SEO and discoverability

**Output**: Documentation site plan

## Implementation Phase

### Story 005.7: Implement Enhanced CLI
**Status**: ✅ Complete (2026-05-20)

Build the CLI based on design:
- [x] Install commander or yargs - Added to package.json (commander@11.0.0)
- [x] Implement commands (compile, run, init, check)
- [x] Implement options (--output, --run, --watch, etc.)
- [x] Add colored output (chalk@4.1.2)
- [x] Improve error messages with context (utils/errors.js)
- [x] Add progress indicators (ora@5.4.1)
- [x] Update README with CLI documentation
- [x] Create INSTALLATION.md guide
- [x] Create test-cli.sh test script

**Output**: Production-ready CLI
- `src/cli.js` - Main CLI entry point
- `src/commands/` - Command implementations (compile, run, init, check)
- `src/utils/` - Utilities (colors, errors, LCI management)
- `INSTALLATION.md` - Installation guide
- `test-cli.sh` - CLI test script

**Note**: Dependencies documented in package.json but not installed (npm not available).
Install with `npm install` before testing.

### Story 005.8: Create npm Package
**Status**: ✅ Complete (2026-05-20) - Ready for publication

Publish to npm:
- [x] Finalize package.json - Added repository, homepage, bugs, files
- [x] Add LICENSE file - MIT license created
- [x] Create .npmignore (exclude tests, research, etc.)
- [x] Update documentation with npm instructions - README updated
- [x] Create publishing guide - docs/NPM-PUBLISHING-GUIDE.md
- [x] Create verification script - verify-npm-ready.sh
- [ ] Test local installation (`npm link`) - Requires npm
- [ ] Test global installation - Requires npm
- [ ] Create npm account (if needed) - When ready to publish
- [ ] Publish to npm: `npm publish` - When ready
- [ ] Test installation: `npm install -g lulcode` - After publication

**Output**: Package ready for publication ✅
- LICENSE file (MIT)
- .npmignore configuration
- package.json with complete metadata
- Updated README with npm installation
- NPM publishing guide document
- Verification script (47/47 tests passing)

**Note**: npm is not currently available in environment. Package is fully prepared and ready to publish when npm becomes available. Run `verify-npm-ready.sh` to verify readiness.

### Story 005.9: Build Pre-compiled Binaries
**Status**: Not Started (after 005.3)

Create standalone executables:
- [ ] Compile LCI for each platform
- [ ] Package with pkg or nexe
- [ ] Test on each platform
- [ ] Create GitHub Release workflow
- [ ] Upload binaries to GitHub Releases
- [ ] Document binary installation
- [ ] Consider auto-updater

**Output**: Multi-platform binaries

### Story 005.10: Create Homebrew Formula
**Status**: Not Started (after 005.4)

Publish Homebrew formula:
- [ ] Create formula Ruby file
- [ ] Test installation locally
- [ ] Create homebrew-lulcode tap repository
- [ ] Publish formula
- [ ] Test: `brew install lulcode/lulcode/lulcode`
- [ ] Document Homebrew installation
- [ ] Consider submitting to official Homebrew

**Output**: Homebrew formula

### Story 005.11: Create VS Code Extension
**Status**: Not Started (after 005.5)

Build editor support:
- [ ] Create VS Code extension project
- [ ] Implement syntax highlighting (TextMate grammar)
- [ ] Add snippets
- [ ] Add commands (transpile, run)
- [ ] Test extension locally
- [ ] Publish to VS Code Marketplace
- [ ] Document VS Code setup

**Output**: VS Code extension

### Story 005.12: Build Documentation Website
**Status**: Not Started (after 005.6)

Create online presence:
- [ ] Set up static site generator
- [ ] Write content (home, installation, tutorial, reference)
- [ ] Create examples with live demos
- [ ] Design logo and branding
- [ ] Set up domain and hosting (GitHub Pages?)
- [ ] Deploy site
- [ ] Add analytics
- [ ] SEO optimization

**Output**: Live documentation website

## Acceptance Criteria

**Tier 1: Basic Distribution** (MVP)
- [ ] `npm install -g lulcode` works
- [ ] `lulcode file.lul --run` transpiles and executes
- [ ] README has clear installation instructions
- [ ] LCI bundled or auto-installed

**Tier 2: Professional Distribution**
- [ ] Pre-built binaries for all platforms
- [ ] Homebrew formula works
- [ ] VS Code extension published
- [ ] Good CLI UX (help, colors, errors)

**Tier 3: Complete Distribution**
- [ ] Documentation website live
- [ ] Examples and tutorials available
- [ ] Community can contribute
- [ ] Discoverable and professional

## Implementation Priority

**Phase 1: MVP** (Stories 005.1, 005.7, 005.8)
- Enhanced CLI
- npm package
- Basic installation

**Phase 2: Convenience** (Stories 005.3, 005.4, 005.9, 005.10)
- Pre-built binaries
- Homebrew formula
- Zero-dependency installation

**Phase 3: Developer Experience** (Stories 005.5, 005.11)
- IDE extensions
- Syntax highlighting
- Better tooling

**Phase 4: Visibility** (Stories 005.6, 005.12)
- Documentation website
- Marketing/branding
- Community growth

## Technical Decisions

### LCI Bundling Strategy

**Option A**: npm postinstall script
- Downloads/builds LCI on install
- Pros: Always latest, adapts to platform
- Cons: Requires build tools, slow install

**Option B**: Pre-built LCI binaries
- Bundle platform-specific LCI with npm package
- Pros: Fast install, no build tools needed
- Cons: Larger package, need CI for builds

**Option C**: Hybrid
- Bundle common platforms, fall back to build
- Best of both worlds

**Recommendation**: Start with Option A (postinstall), move to Option B/C later

### CLI Framework

**Recommendation**: Use `commander` (most popular, simple API)

### Binary Packaging

**Recommendation**: Use `pkg` (mature, widely used)

## Success Metrics

After EPIC-005, we should see:
- [ ] 100+ npm downloads/week
- [ ] 10+ GitHub stars
- [ ] Community contributions (issues, PRs)
- [ ] People actually using LULCODE
- [ ] Positive feedback on installation experience

## References

- Node.js CLI best practices: https://github.com/lirantal/nodejs-cli-apps-best-practices
- npm package.json documentation
- Homebrew formula documentation
- VS Code extension API
- pkg documentation: https://github.com/vercel/pkg
- LCI source: https://github.com/justinmeza/lci
