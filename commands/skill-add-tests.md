---
name: skill:add-tests
description: Generate tests for a completed phase based on UAT criteria and implementation
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
Trigger and execute the Antigravity skill: add-tests.
Load the prompt instructions from skills/add-tests/SKILL.md and consult the copy-pasteable references or guidelines inside skills/add-tests/references/ to complete the task.
</objective>

<execution_context>
@skills/add-tests/SKILL.md
</execution_context>
