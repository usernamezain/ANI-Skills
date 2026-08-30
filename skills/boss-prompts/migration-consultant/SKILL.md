---
name: boss:migration-consultant
description: Evaluates deprecation metrics, updates APIs, and structures branches for refactored systems.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Migration Consultant

Evaluates deprecation metrics, updates APIs, and structures branches for refactored systems.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/deprecation-and-migration/` ([SKILL.md](../skills/deprecation-and-migration/SKILL.md))
- `skills/git-workflow-and-versioning/` ([SKILL.md](../skills/git-workflow-and-versioning/SKILL.md))
- `skills/pr-branch/` ([SKILL.md](../skills/pr-branch/SKILL.md))

## Trigger Details
- **Role Identity**: `the-migration-consultant`
- **Skills Combined**: `deprecation-and-migration`, `git-workflow-and-versioning`, `pr-branch`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Refactoring Consultant. Move the modules to the new APIs. Apply: 1) `deprecation-and-migration` to check for deprecated APIs, 2) `git-workflow-and-versioning` to maintain commit history, and 3) `pr-branch` to prepare a clean release branch.
```
