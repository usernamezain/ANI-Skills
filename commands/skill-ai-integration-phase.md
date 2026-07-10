---
name: skill:ai-integration-phase
description: Generate an AI-SPEC.md design contract for phases that involve building AI systems.
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
Trigger and execute the Antigravity skill: ai-integration-phase.
Load the prompt instructions from skills/ai-integration-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ai-integration-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/ai-integration-phase/SKILL.md
</execution_context>
