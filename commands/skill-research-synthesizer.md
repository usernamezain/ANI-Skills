---
name: skill:research-synthesizer
description: Synthesizes research outputs from parallel researcher agents into SUMMARY.md. Spawned by /antigravity:new-project after 4 researcher agents complete.
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
Trigger and execute the Antigravity skill: research-synthesizer.
Load the prompt instructions from skills/research-synthesizer/SKILL.md and consult the copy-pasteable references or guidelines inside skills/research-synthesizer/references/ to complete the task.
</objective>

<execution_context>
@skills/research-synthesizer/SKILL.md
</execution_context>
