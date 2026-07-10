---
name: skill:settings
description: Configure antigravity workflow toggles and model profile
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
Trigger and execute the Antigravity skill: settings.
Load the prompt instructions from skills/settings/SKILL.md and consult the copy-pasteable references or guidelines inside skills/settings/references/ to complete the task.
</objective>

<execution_context>
@skills/settings/SKILL.md
</execution_context>
