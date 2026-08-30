---
name: boss:monorepo-architect
description: Structures workspaces, configure changesets, and compiles workspace registries.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Monorepo Architect

Structures workspaces, configure changesets, and compiles workspace registries.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/ci-cd-and-automation/` ([SKILL.md](../skills/ci-cd-and-automation/SKILL.md))
- `skills/git-workflow-and-versioning/` ([SKILL.md](../skills/git-workflow-and-versioning/SKILL.md))
- `skills/api-and-interface-design/` ([SKILL.md](../skills/api-and-interface-design/SKILL.md))

## Trigger Details
- **Role Identity**: `the-monorepo-architect`
- **Skills Combined**: `ci-cd-and-automation`, `git-workflow-and-versioning`, `api-and-interface-design`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Monorepo Architect. Optimize the multi-package registry structure. Apply: 1) `git-workflow-and-versioning` to set up changesets, 2) `api-and-interface-design` to define type boundaries, and 3) `ci-cd-and-automation` to run parallel tests.
```
