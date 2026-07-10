---
name: skill:clickhouse-managed-postgres-rca
description: MUST USE when investigating performance issues on a ClickHouse-managed Postgres instance. Provides an evidence-based RCA workflow that scrapes the Prometheus endpoint for system signal, pulls per-digest evidence from the Slow Query Patterns API, and recommends (does not apply) a fix.
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
Trigger and execute the Antigravity skill: clickhouse-managed-postgres-rca.
Load the prompt instructions from skills/clickhouse-managed-postgres-rca/SKILL.md and consult the copy-pasteable references or guidelines inside skills/clickhouse-managed-postgres-rca/references/ to complete the task.
</objective>

<execution_context>
@skills/clickhouse-managed-postgres-rca/SKILL.md
</execution_context>
