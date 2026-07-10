---
name: skill:ultraplan-phase
description: [BETA] Offload plan phase to Claude Code's ultraplan cloud; review in browser and import back.
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
Trigger and execute the Antigravity skill: ultraplan-phase.
Load the prompt instructions from skills/ultraplan-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ultraplan-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/ultraplan-phase/SKILL.md
</execution_context>
