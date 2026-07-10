---
name: skill:nyquist-auditor
description: Fills Nyquist validation gaps by generating tests and verifying coverage for phase requirements
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
Trigger and execute the Antigravity skill: nyquist-auditor.
Load the prompt instructions from skills/nyquist-auditor/SKILL.md and consult the copy-pasteable references or guidelines inside skills/nyquist-auditor/references/ to complete the task.
</objective>

<execution_context>
@skills/nyquist-auditor/SKILL.md
</execution_context>
