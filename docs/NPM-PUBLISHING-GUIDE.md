# LULCODE npm Publishing Guide

**Status**: Ready for publication  
**Version**: 0.2.0  
**Date Prepared**: 2026-05-20

## Prerequisites

Before publishing to npm, ensure:

1. **npm is installed**:
   ```bash
   node --version  # Should be >= 14.0.0
   npm --version   # Should be >= 6.0.0
   ```

2. **Dependencies are installed**:
   ```bash
   cd /home/lib/Code/LULCODE
   npm install
   ```

3. **Tests pass**:
   ```bash
   npm test
   # Should show: 47 passed, 0 failed
   ```

4. **npm account created**:
   - Create account: https://www.npmjs.com/signup
   - Or login: `npm login`

## Pre-Publication Checklist

### ✅ Files Prepared

- [x] **package.json** - Complete with all metadata
  - name, version, description ✅
  - repository, homepage, bugs ✅
  - bin, main, files ✅
  - keywords, license ✅
  - dependencies ✅

- [x] **LICENSE** - MIT license file created

- [x] **.npmignore** - Excludes development files
  - specs/, docs/research, test scripts ✅

- [x] **README.md** - Updated with npm installation

- [x] **INSTALLATION.md** - Comprehensive setup guide

- [x] **bin/lulcode** - Executable CLI wrapper ✅

- [x] **src/** - All source files ready
  - cli.js, transpiler.js, transform.js ✅
  - commands/, utils/ ✅

- [x] **examples/** - Example .lul files for users

### ✅ Testing Checklist

Before publishing, test the package locally:

1. **Link package locally**:
   ```bash
   cd /home/lib/Code/LULCODE
   npm link
   ```

2. **Test CLI commands**:
   ```bash
   lulcode --version
   lulcode --help
   lulcode compile examples/arrays-simple.lul
   lulcode run examples/arrays-simple.lul  # If LCI installed
   ```

3. **Test in another directory**:
   ```bash
   cd /tmp
   lulcode init test-project
   cd test-project
   lulcode compile main.lul
   ```

4. **Verify package contents**:
   ```bash
   npm pack --dry-run
   # Lists files that will be included in package
   ```

## Publishing Steps

### Step 1: Login to npm

```bash
npm login
# Enter username, password, email
# Enter OTP if 2FA enabled
```

### Step 2: Verify package.json

```bash
cd /home/lib/Code/LULCODE
cat package.json
# Verify version is correct (0.2.0)
# Verify repository URLs are correct
```

### Step 3: Run final tests

```bash
npm test
# Ensure all 47 tests pass
```

### Step 4: Create git tag (optional but recommended)

```bash
git add -A
git commit -m "Release v0.2.0"
git tag -a v0.2.0 -m "LULCODE v0.2.0: Arrays, String Operations, Enhanced CLI"
git push origin main --tags
```

### Step 5: Publish to npm

```bash
npm publish
```

**Note**: First-time publishing may require email verification.

### Step 6: Verify publication

```bash
# Wait 1-2 minutes for npm to propagate
npm view lulcode
npm install -g lulcode
lulcode --version  # Should show 0.2.0
```

### Step 7: Test global installation

```bash
cd /tmp
npm install -g lulcode
lulcode --version
lulcode compile /home/lib/Code/LULCODE/examples/arrays-simple.lul
```

## Post-Publication Tasks

### 1. Update Documentation

- [ ] Add npm badge to README:
  ```markdown
  [![npm version](https://badge.fury.io/js/lulcode.svg)](https://www.npmjs.com/package/lulcode)
  [![npm downloads](https://img.shields.io/npm/dm/lulcode.svg)](https://www.npmjs.com/package/lulcode)
  ```

- [ ] Update INSTALLATION.md with verified npm instructions

- [ ] Create release announcement (GitHub, forums, social media)

### 2. Monitor npm Page

- [ ] Check https://www.npmjs.com/package/lulcode
- [ ] Verify README renders correctly
- [ ] Verify keywords are helpful
- [ ] Monitor download statistics

### 3. Set up CI/CD (Future)

- [ ] GitHub Actions for automated testing
- [ ] Automated npm publishing on git tags
- [ ] Automated changelog generation

### 4. Prepare Next Release

- [ ] Create development branch for v0.3.0
- [ ] Update CHANGELOG.md (to be created)
- [ ] Plan next features (EPIC-004, remaining EPIC-005 stories)

## Troubleshooting

### Error: "Package name taken"

If `lulcode` is already taken:
- Try scoped package: `@lulcode/lulcode`
- Or alternative name: `lulcode-transpiler`
- Update package.json name field

### Error: "Need to login"

```bash
npm login
# Follow prompts
```

### Error: "402 Payment Required"

This means the package name is reserved. Choose a different name.

### Error: "File not found"

Verify all files in `files` array exist:
```bash
ls -R src/ bin/ examples/ | grep -E "\.js$|\.lul$"
```

## Version Management

### Semantic Versioning

LULCODE follows semantic versioning (semver):
- **Major (x.0.0)**: Breaking changes
- **Minor (0.x.0)**: New features, backward compatible
- **Patch (0.0.x)**: Bug fixes

### Bumping Versions

```bash
npm version patch   # 0.2.0 → 0.2.1
npm version minor   # 0.2.0 → 0.3.0
npm version major   # 0.2.0 → 1.0.0
```

This automatically:
1. Updates package.json
2. Creates git commit
3. Creates git tag

Then: `npm publish`

## Package Maintenance

### Updating Dependencies

```bash
npm outdated              # Check for updates
npm update                # Update to latest compatible
npm audit                 # Check for vulnerabilities
npm audit fix             # Auto-fix vulnerabilities
```

### Deprecating Versions

If a version has critical bugs:
```bash
npm deprecate lulcode@0.2.0 "Critical bug, please upgrade to 0.2.1"
```

### Unpublishing (Use Cautiously)

Only within 72 hours of publishing:
```bash
npm unpublish lulcode@0.2.0
```

**Warning**: Breaks dependent projects. Use deprecate instead.

## Success Metrics

After publication, track:
- **Downloads**: `npm view lulcode downloads`
- **Dependents**: `npm view lulcode dependents`
- **GitHub Stars**: Watch repository growth
- **Issues**: Community feedback and bug reports

## Next Steps After v0.2.0

**Immediate**:
1. ✅ Publish to npm
2. ✅ Test global installation
3. ✅ Update documentation

**Short-term** (EPIC-005 continuation):
1. Story 005.9: Pre-compiled binaries
2. Story 005.10: Homebrew formula
3. Story 005.11: VS Code extension

**Medium-term** (EPIC-004):
1. First-class functions
2. Anonymous functions
3. Higher-order functions

**Long-term**:
1. Language Server Protocol (LSP)
2. Online playground
3. Documentation website
4. Community growth

## References

- npm documentation: https://docs.npmjs.com/
- Semantic Versioning: https://semver.org/
- npm CLI commands: https://docs.npmjs.com/cli/
- Package.json spec: https://docs.npmjs.com/cli/v8/configuring-npm/package-json

---

**Status**: Package ready for publication when npm is available ✅  
**Prepared by**: Story 005.8 - npm Package Setup  
**Last updated**: 2026-05-20
