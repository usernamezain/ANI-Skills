---
name: skill:context-compression
description: This skill should be used when the user asks to "compress context", "summarize conversation history", "implement compaction", "reduce token usage", or mentions context compression, structured summarization, tokens-per-task optimization, or long-running agent sessions exceeding context limits.
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
Trigger and execute the Antigravity skill: context-compression.
Load the prompt instructions from skills/context-compression/SKILL.md and consult the copy-pasteable references or guidelines inside skills/context-compression/references/ to complete the task.
</objective>

<execution_context>
@skills/context-compression/SKILL.md
</execution_context>
