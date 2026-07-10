---
name: skill:advisor-researcher
description: Researches a single gray area decision and returns a structured comparison table with rationale. Spawned by discuss-phase advisor mode.
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
Trigger and execute the Antigravity skill: advisor-researcher.
Load the prompt instructions from skills/advisor-researcher/SKILL.md and consult the copy-pasteable references or guidelines inside skills/advisor-researcher/references/ to complete the task.
</objective>

<execution_context>
@skills/advisor-researcher/SKILL.md
</execution_context>
