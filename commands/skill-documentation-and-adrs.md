---
name: skill:documentation-and-adrs
description: Records decisions and documentation. Use when making architectural decisions, changing public APIs, shipping features, or when you need to record context that future engineers and agents will need to understand the codebase.
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
Trigger and execute the Antigravity skill: documentation-and-adrs.
Load the prompt instructions from skills/documentation-and-adrs/SKILL.md and consult the copy-pasteable references or guidelines inside skills/documentation-and-adrs/references/ to complete the task.
</objective>

<execution_context>
@skills/documentation-and-adrs/SKILL.md
</execution_context>
