---
name: skill:multi-agent-patterns
description: This skill should be used when the user asks to "design multi-agent system", "implement supervisor pattern", "create swarm architecture", "coordinate multiple agents", or mentions multi-agent patterns, context isolation, agent handoffs, sub-agents, or parallel agent execution.
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
Trigger and execute the Antigravity skill: multi-agent-patterns.
Load the prompt instructions from skills/multi-agent-patterns/SKILL.md and consult the copy-pasteable references or guidelines inside skills/multi-agent-patterns/references/ to complete the task.
</objective>

<execution_context>
@skills/multi-agent-patterns/SKILL.md
</execution_context>
