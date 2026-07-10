---
name: skill:internal-comms
description: A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.).
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
Trigger and execute the Antigravity skill: internal-comms.
Load the prompt instructions from skills/internal-comms/SKILL.md and consult the copy-pasteable references or guidelines inside skills/internal-comms/references/ to complete the task.
</objective>

<execution_context>
@skills/internal-comms/SKILL.md
</execution_context>
