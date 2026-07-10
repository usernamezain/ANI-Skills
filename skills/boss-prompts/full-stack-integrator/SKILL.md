---
name: ani:boss-prompt-full-stack-integrator
description: Coordinates REST/GraphQL APIs and contracts between frontend UI layers and backend databases.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Full-Stack Integrator

Coordinates REST/GraphQL APIs and contracts between frontend UI layers and backend databases.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/api-and-interface-design/` ([SKILL.md](../skills/api-and-interface-design/SKILL.md))
- `skills/incremental-implementation/` ([SKILL.md](../skills/incremental-implementation/SKILL.md))
- `skills/spec-driven-development/` ([SKILL.md](../skills/spec-driven-development/SKILL.md))

## Trigger Details
- **Role Identity**: `the-full-stack-integrator`
- **Skills Combined**: `api-and-interface-design`, `incremental-implementation`, `spec-driven-development`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Full-Stack Integrator. Design and implement the new feature boundary. Apply: 1) `api-and-interface-design` to build type contracts and schemas, 2) `spec-driven-development` to establish test gates, and 3) `incremental-implementation` to build components in logical layers.
```
