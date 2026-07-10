---
name: skill:deprecation-and-migration
description: Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users from one implementation to another. Use when deciding whether to maintain or sunset existing code.
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---
<objective>
Trigger and execute the Antigravity skill: deprecation-and-migration.
Load the prompt instructions from skills/deprecation-and-migration/SKILL.md and consult the copy-pasteable references or guidelines inside skills/deprecation-and-migration/references/ to complete the task.
</objective>

<execution_context>
@skills/deprecation-and-migration/SKILL.md
</execution_context>
