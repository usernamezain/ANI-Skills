---
name: skill:baoyu-url-to-markdown
description: Fetch any URL and convert to markdown using baoyu-fetch CLI (Chrome CDP with site-specific adapters). Built-in adapters for X/Twitter, YouTube transcripts, Hacker News threads, and generic pages via Defuddle. Handles login/CAPTCHA via interaction wait modes. Use when user wants to save a webpage as markdown.
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
Trigger and execute the Antigravity skill: baoyu-url-to-markdown.
Load the prompt instructions from skills/baoyu-url-to-markdown/SKILL.md and consult the copy-pasteable references or guidelines inside skills/baoyu-url-to-markdown/references/ to complete the task.
</objective>

<execution_context>
@skills/baoyu-url-to-markdown/SKILL.md
</execution_context>
