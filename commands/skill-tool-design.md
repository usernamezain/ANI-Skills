---
name: skill:tool-design
description: This skill should be used when the user asks to "design agent tools", "create tool descriptions", "reduce tool complexity", "implement MCP tools", or mentions tool consolidation, architectural reduction, tool naming conventions, or agent-tool interfaces.
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
Trigger and execute the Antigravity skill: tool-design.
Load the prompt instructions from skills/tool-design/SKILL.md and consult the copy-pasteable references or guidelines inside skills/tool-design/references/ to complete the task.
</objective>

<execution_context>
@skills/tool-design/SKILL.md
</execution_context>
