---
name: skill:baoyu-format-markdown
description: Formats plain text or markdown files with frontmatter, titles, summaries, headings, bold, lists, and code blocks. Use when user asks to "format markdown", "beautify article", "add formatting", or improve article layout. Outputs to {filename}-formatted.md.
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
Trigger and execute the Antigravity skill: baoyu-format-markdown.
Load the prompt instructions from skills/baoyu-format-markdown/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-format-markdown/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-format-markdown/SKILL.md
</execution_context>
