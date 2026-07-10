---
name: skill:context
description: codebase intelligence | map graphify docs learnings
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
Trigger and execute the Antigravity skill: context.
Load the prompt instructions from skills/ns-context/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ns-context/references/ to complete the task.
</objective>

<execution_context>
@skills/ns-context/SKILL.md
</execution_context>
