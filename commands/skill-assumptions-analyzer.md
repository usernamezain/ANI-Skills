---
name: skill:assumptions-analyzer
description: Deeply analyzes codebase for a phase and returns structured assumptions with evidence. Spawned by discuss-phase assumptions mode.
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
Trigger and execute the Antigravity skill: assumptions-analyzer.
Load the prompt instructions from skills/assumptions-analyzer/SKILL.md and consult the copy-pasteable references or guidelines inside skills/assumptions-analyzer/references/ to complete the task.
</objective>

<execution_context>
@skills/assumptions-analyzer/SKILL.md
</execution_context>
