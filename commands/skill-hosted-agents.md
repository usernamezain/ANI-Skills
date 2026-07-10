---
name: skill:hosted-agents
description: This skill should be used when the user asks to "build background agent", "create hosted coding agent", "set up sandboxed execution", "implement multiplayer agent", or mentions background agents, sandboxed VMs, agent infrastructure, Modal sandboxes, self-spawning agents, or remote coding environments.
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
Trigger and execute the Antigravity skill: hosted-agents.
Load the prompt instructions from skills/hosted-agents/SKILL.md and consult the copy-pasteable references or guidelines inside skills/hosted-agents/references/ to complete the task.
</objective>

<execution_context>
@skills/hosted-agents/SKILL.md
</execution_context>
