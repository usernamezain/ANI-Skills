---
name: skill:brand-guidelines
description: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
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
Trigger and execute the Antigravity skill: brand-guidelines.
Load the prompt instructions from skills/brand-guidelines/SKILL.md and consult the copy-pasteable references or guidelines inside skills/brand-guidelines/references/ to complete the task.
</objective>

<execution_context>
@skills/brand-guidelines/SKILL.md
</execution_context>
