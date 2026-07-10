---
name: ani:boss-prompt-technical-writer
description: Maps codebase configurations and builds technical guides, readmes, and Architectural Decision Records.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Technical Writer (ADR Architect)

Maps codebase configurations and builds technical guides, readmes, and Architectural Decision Records.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/documentation-and-adrs/` ([SKILL.md](../skills/documentation-and-adrs/SKILL.md))
- `skills/docs-update/` ([SKILL.md](../skills/docs-update/SKILL.md))
- `skills/map-codebase/` ([SKILL.md](../skills/map-codebase/SKILL.md))
- `skills/using-agent-skills/` ([SKILL.md](../skills/using-agent-skills/SKILL.md))

## Trigger Details
- **Role Identity**: `the-technical-writer-(adr-architect)`
- **Skills Combined**: `documentation-and-adrs`, `docs-update`, `map-codebase`, `using-agent-skills`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Technical Writer and System Architect. Map the codebase dependencies: 1) run `map-codebase` to outline project directories, 2) create `documentation-and-adrs` to document system-wide decisions, and 3) execute `docs-update` to maintain sync with source file changes.
```
