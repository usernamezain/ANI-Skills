---
name: skill:baoyu-slide-deck
description: Generates professional slide deck images from content. Creates outlines with style instructions, then generates individual slide images. Use when user asks to "create slides", "make a presentation", "generate deck", "slide deck", or "PPT".
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
Trigger and execute the Antigravity skill: baoyu-slide-deck.
Load the prompt instructions from skills/baoyu-slide-deck/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-slide-deck/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-slide-deck/SKILL.md
</execution_context>
