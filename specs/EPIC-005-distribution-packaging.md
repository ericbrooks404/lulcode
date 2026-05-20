# EPIC-005: Distribution & Packaging

**Priority**: 2 (After BUKKIT MVP)  
**Status**: Not Started  
**Goal**: "Batteries Included" LULCODE Distribution

## Overview

Bundle LULCODE transpiler with LCI interpreter to provide a complete, zero-dependency installation experience. Users should be able to install LULCODE and immediately start writing and running LULCODE programs without manually installing LCI.

## Why This Matters

**Problem**: 
- LULCODE transpiles to LOLCODE with BUKKIT extensions
- BUKKIT requires LCI interpreter (not supported in lol-coffee)
- Asking users to "install LCI separately" is friction
- Alternative (string-based encoding) is slow and complex

**Solution**:
Bundle LCI with LULCODE → "batteries included" distribution

## Research Phase

### Story 005.1: LCI Build Analysis
**Status**: ✅ Complete (2026-05-15)

Investigated LCI build requirements:
- [x] LCI is written in C, builds with CMake
- [x] Source: https://github.com/justinmeza/lci
- [x] License: MIT-like (permissive, can bundle)
- [x] Build dependencies: gcc, make, cmake, libreadline-dev, libncurses-dev
- [x] Output: ~100KB binary
- [x] Cross-platform: Linux, macOS, Windows (with adjustments)

**Findings**:
- LCI builds easily with standard tools
- Binary is small (~100KB)
- Can be statically linked for portability
- MIT license allows redistribution

**Output**: Install script created (`install.sh`)

### Story 005.2: Distribution Strategy Research
**Status**: Not Started

Research distribution options:
- [ ] npm package with platform-specific binaries
- [ ] Docker container
- [ ] System package managers (brew, apt, pacman)
- [ ] GitHub Releases with pre-built binaries
- [ ] Snap/Flatpak/AppImage
- [ ] Document pros/cons of each approach

**Output**: Distribution strategy document

### Story 005.3: Cross-Platform Build Testing
**Status**: Not Started

Test LCI compilation on multiple platforms:
- [ ] Linux (Ubuntu, Fedora, Arch)
- [ ] macOS (Intel, Apple Silicon)
- [ ] Windows (WSL, MinGW, Cygwin)
- [ ] Document platform-specific build quirks
- [ ] Create platform-specific build scripts

**Output**: Platform compatibility matrix

## Implementation Phase

### Story 005.4: Installer Script (v1)
**Status**: ✅ Complete (2026-05-15)

Created basic installer script:
- [x] Checks prerequisites (gcc, cmake, etc.)
- [x] Provides helpful error messages
- [x] Clones and builds LCI
- [x] Installs to ~/.local/bin
- [x] Adds to PATH

**File**: `install.sh`

**Usage**:
```bash
curl -sSL https://lulcode.dev/install.sh | sh
```

### Story 005.5: Pre-built Binaries
**Status**: Not Started

Build and distribute pre-compiled LCI binaries:
- [ ] Set up CI/CD (GitHub Actions)
- [ ] Build LCI for Linux x64, macOS x64/arm64, Windows
- [ ] Sign binaries
- [ ] Upload to GitHub Releases
- [ ] Update installer to download pre-built if available

**Output**: Automated binary releases

### Story 005.6: npm Package
**Status**: Not Started

Create npm package that bundles LCI:
- [ ] Package structure with optional dependencies
- [ ] Platform-specific packages (lulcode-lci-linux-x64, etc.)
- [ ] Fallback to building from source
- [ ] bin wrappers for `lulcode` and `lci`
- [ ] Publish to npm registry

**Output**: `npm install -g lulcode` works

### Story 005.7: Homebrew Formula
**Status**: Not Started

Create Homebrew formula for macOS:
- [ ] Write lulcode.rb formula
- [ ] Formula depends on lci
- [ ] Submit to homebrew-core
- [ ] Test on Intel and Apple Silicon

**Output**: `brew install lulcode` works on macOS

### Story 005.8: Docker Container
**Status**: Not Started

Create Docker image with everything:
- [ ] Dockerfile with Node.js + LCI
- [ ] LULCODE transpiler
- [ ] Example files
- [ ] Publish to Docker Hub
- [ ] Document usage

**Output**: `docker run lulcode/lulcode myfile.lul` works

### Story 005.9: System Packages
**Status**: Not Started

Create native packages:
- [ ] .deb package (Ubuntu/Debian)
- [ ] .rpm package (Fedora/RHEL)
- [ ] AUR package (Arch Linux)
- [ ] Document packaging for each system

**Output**: Platform-native installation

## Verification Plan

- [ ] One-command install works on fresh systems
- [ ] Both LULCODE and LCI are in PATH
- [ ] `lulcode examples/bukkit-demo.lul | lci` runs successfully
- [ ] Install works without root/sudo (user-local)
- [ ] Uninstall is clean and documented

## Acceptance Criteria

- [ ] User can install LULCODE + LCI with one command
- [ ] No manual LCI installation required
- [ ] Works on Linux, macOS, Windows (WSL)
- [ ] Install time < 2 minutes
- [ ] Binary size < 5MB total
- [ ] Clear error messages if prerequisites missing
- [ ] Documentation for all installation methods

## Dependencies

**Blocks**:
- None (BUKKIT transpiler already works)

**Blocked By**:
- None (can proceed in parallel with other EPICs)

## Timeline

- **Phase 1** (Immediate): ✅ Complete - Basic installer script
- **Phase 2** (Short-term): Pre-built binaries + npm package
- **Phase 3** (Long-term): System packages + Homebrew

## References

- [LCI GitHub Repository](https://github.com/justinmeza/lci)
- [npm Documentation - Creating CLI Tools](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin)
- [Homebrew Formula Cookbook](https://docs.brew.sh/Formula-Cookbook)
- [GitHub Actions - Building and Testing](https://docs.github.com/en/actions/automating-builds-and-tests)

---

**Epic Version**: 1.0  
**Created**: 2026-05-15  
**Status**: Planning
