---
name: skill:clickhouse-best-practices
description: MUST USE when reviewing ClickHouse schemas, queries, or configurations. Contains 31 rules that MUST be checked before providing recommendations. Always read relevant rule files and cite specific rules in responses.
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
Trigger and execute the Antigravity skill: clickhouse-best-practices.
Load the prompt instructions from skills/clickhouse-best-practices/SKILL.md and consult the copy-pasteable references or guidelines inside skills/clickhouse-best-practices/references/ to complete the task.
</objective>

<execution_context>
@skills/clickhouse-best-practices/SKILL.md
</execution_context>
