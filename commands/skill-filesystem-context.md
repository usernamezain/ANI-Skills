---
name: skill:filesystem-context
description: This skill should be used when the user asks to "offload context to files", "implement dynamic context discovery", "use filesystem for agent memory", "reduce context window bloat", or mentions file-based context management, tool output persistence, agent scratch pads, or just-in-time context loading.
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
Trigger and execute the Antigravity skill: filesystem-context.
Load the prompt instructions from skills/filesystem-context/SKILL.md and consult the copy-pasteable references or guidelines inside skills/filesystem-context/references/ to complete the task.
</objective>

<execution_context>
@skills/filesystem-context/SKILL.md
</execution_context>
