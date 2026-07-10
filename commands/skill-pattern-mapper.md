---
name: skill:pattern-mapper
description: Analyzes codebase for existing patterns and produces PATTERNS.md mapping new files to closest analogs. Read-only codebase analysis spawned by /antigravity:plan-phase orchestrator before planning.
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
Trigger and execute the Antigravity skill: pattern-mapper.
Load the prompt instructions from skills/pattern-mapper/SKILL.md and consult the copy-pasteable references or guidelines inside skills/pattern-mapper/references/ to complete the task.
</objective>

<execution_context>
@skills/pattern-mapper/SKILL.md
</execution_context>
