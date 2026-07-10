---
name: skill:workspace
description: Manage antigravity workspaces — create, list, or remove isolated workspace environments
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
Trigger and execute the Antigravity skill: workspace.
Load the prompt instructions from skills/workspace/SKILL.md and consult the copy-pasteable references or guidelines inside skills/workspace/references/ to complete the task.
</objective>

<execution_context>
@skills/workspace/SKILL.md
</execution_context>
