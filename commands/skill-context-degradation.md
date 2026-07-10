---
name: skill:context-degradation
description: This skill should be used when the user asks to "diagnose context problems", "fix lost-in-middle issues", "debug agent failures", "understand context poisoning", or mentions context degradation, attention patterns, context clash, context confusion, or agent performance degradation. Provides patterns for recognizing and mitigating context failures.
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
Trigger and execute the Antigravity skill: context-degradation.
Load the prompt instructions from skills/context-degradation/SKILL.md and consult the copy-pasteable references or guidelines inside skills/context-degradation/references/ to complete the task.
</objective>

<execution_context>
@skills/context-degradation/SKILL.md
</execution_context>
