# LULCODE Specifications

This directory contains EPICs and user stories for planning LULCODE features.

## EPIC Structure

Each EPIC represents a major feature area with:
- **Overview**: What the feature is and why it matters
- **Research Phase**: Stories for investigating implementation approaches
- **Implementation Phase**: Stories for building the feature (added after research)
- **Acceptance Criteria**: How we know the feature is complete
- **References**: Links to relevant resources

## EPICs

| EPIC | Priority | Status | Goal |
|------|----------|--------|------|
| [EPIC-001: Arrays/Dictionaries](./EPIC-001-arrays-dictionaries.md) | 1 (Highest) | Research | Tier 2: Genuinely Useful |
| [EPIC-002: String Manipulation](./EPIC-002-string-manipulation.md) | 2 | Research | Tier 2: Genuinely Useful |
| [EPIC-003: Syntactic Sugar](./EPIC-003-syntactic-sugar.md) | 3 | Research | Tier 3: Comfortable |
| [EPIC-004: First-Class Functions](./EPIC-004-first-class-functions.md) | 4 | Research | Tier 3: Comfortable |

## Language Tier Progression

**Tier 0: Turing Complete** (LOLCODE already has this)
- Variables, conditionals, loops, functions

**Tier 1: Minimally Practical** (LOLCODE already has this)
- Basic types, operators, I/O

**Tier 2: Genuinely Useful** (Priorities 1-2)
- Arrays/dictionaries, string manipulation

**Tier 3: Comfortable/Productive** (Priorities 3-4)
- Syntactic sugar, first-class functions

## Current Phase: Research

All EPICs are currently in the research phase. Each EPIC has research stories to investigate:
- Syntax design options
- Semantic behavior
- Transpilation strategies
- Edge cases and tradeoffs

Once research completes for an EPIC, we'll add implementation stories and begin development.

## Story Format

Stories follow this pattern:

```markdown
### Story XXX.Y: Story Title
**Status**: Not Started | In Progress | Complete

Description and acceptance criteria:
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

**Output**: What this story produces
```

## Working on Stories

1. Pick a story from an EPIC (start with Priority 1)
2. Update status to "In Progress"
3. Complete the research/implementation
4. Check off all tasks
5. Update status to "Complete"
6. Commit changes with story reference

## Next Steps

Start with EPIC-001 Story 001.1: Research BUKKIT Syntax Proposals
