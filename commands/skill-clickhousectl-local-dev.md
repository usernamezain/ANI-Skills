---
name: skill:clickhousectl-local-dev
description: Use when a user wants to build an application with ClickHouse, set up a local ClickHouse development environment, install ClickHouse, create a local server, create tables, or start developing with ClickHouse. Covers the full flow from zero to a working local ClickHouse setup.
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
Trigger and execute the Antigravity skill: clickhousectl-local-dev.
Load the prompt instructions from skills/clickhousectl-local-dev/SKILL.md and consult the copy-pasteable references or guidelines inside skills/clickhousectl-local-dev/references/ to complete the task.
</objective>

<execution_context>
@skills/clickhousectl-local-dev/SKILL.md
</execution_context>
