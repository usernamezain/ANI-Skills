---
name: skill:intel-updater
description: Analyzes codebase and writes structured intel files to .planning/intel/.
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
Trigger and execute the Antigravity skill: intel-updater.
Load the prompt instructions from skills/intel-updater/SKILL.md and consult the copy-pasteable references or guidelines inside skills/intel-updater/references/ to complete the task.
</objective>

<execution_context>
@skills/intel-updater/SKILL.md
</execution_context>
