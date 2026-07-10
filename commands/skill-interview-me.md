---
name: skill:interview-me
description: Extracts what the user actually wants instead of what they think they should want. Achieves this through one-question-at-a-time interview until ~95% confidence about the underlying intent. Use when an ask is underspecified ("build me X" without "for whom" or "why now"), when the user explicitly invokes ("interview me", "grill me", "are we sure?", "stress-test my thinking"), or when you catch yourself silently filling in ambiguous requirements before any plan, spec, or code exists.
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
Trigger and execute the Antigravity skill: interview-me.
Load the prompt instructions from skills/interview-me/SKILL.md and consult the copy-pasteable references or guidelines inside skills/interview-me/references/ to complete the task.
</objective>

<execution_context>
@skills/interview-me/SKILL.md
</execution_context>
