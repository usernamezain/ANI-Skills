---
name: skill:defuddle
description: Extract clean markdown content from web pages using Defuddle CLI, removing clutter and navigation to save tokens. Use instead of WebFetch when the user provides a URL to read or analyze, for online documentation, articles, blog posts, or any standard web page. Do NOT use for URLs ending in .md — those are already markdown, use WebFetch directly.
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
Trigger and execute the Antigravity skill: defuddle.
Load the prompt instructions from skills/defuddle/SKILL.md and consult the copy-pasteable references or guidelines inside skills/defuddle/references/ to complete the task.
</objective>

<execution_context>
@skills/defuddle/SKILL.md
</execution_context>
