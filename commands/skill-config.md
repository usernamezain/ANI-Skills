---
name: skill:config
description: Configure antigravity settings — workflow toggles, advanced knobs, integrations, and model profile
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
Trigger and execute the Antigravity skill: config.
Load the prompt instructions from skills/config/SKILL.md and consult the copy-pasteable references or guidelines inside skills/config/references/ to complete the task.
</objective>

<execution_context>
@skills/config/SKILL.md
</execution_context>
