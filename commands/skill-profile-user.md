---
name: skill:profile-user
description: Generate developer behavioral profile and create Claude-discoverable artifacts
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
Trigger and execute the Antigravity skill: profile-user.
Load the prompt instructions from skills/profile-user/SKILL.md and consult the copy-pasteable references or guidelines inside skills/profile-user/references/ to complete the task.
</objective>

<execution_context>
@skills/profile-user/SKILL.md
</execution_context>
