---
name: skill:debug-session-manager
description: Manages multi-cycle /antigravity:debug checkpoint and continuation loop in isolated context. Spawns debugger agents, handles checkpoints via AskUserQuestion, dispatches specialist skills, applies fixes. Returns compact summary to main context. Spawned by /antigravity:debug command.
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
Trigger and execute the Antigravity skill: debug-session-manager.
Load the prompt instructions from skills/debug-session-manager/SKILL.md and consult the copy-pasteable references or guidelines inside skills/debug-session-manager/references/ to complete the task.
</objective>

<execution_context>
@skills/debug-session-manager/SKILL.md
</execution_context>
