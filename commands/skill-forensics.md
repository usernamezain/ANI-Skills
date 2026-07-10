---
name: skill:forensics
description: Post-mortem investigation for failed antigravity workflows — diagnoses what went wrong.
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
Trigger and execute the Antigravity skill: forensics.
Load the prompt instructions from skills/forensics/SKILL.md and consult the copy-pasteable references or guidelines inside skills/forensics/references/ to complete the task.
</objective>

<execution_context>
@skills/forensics/SKILL.md
</execution_context>
