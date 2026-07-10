---
name: skill:clickhousectl-cloud-deploy
description: Use when a user wants to deploy ClickHouse to the cloud, go to production, use ClickHouse Cloud, host a managed ClickHouse service, or migrate from a local ClickHouse setup to ClickHouse Cloud.
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
Trigger and execute the Antigravity skill: clickhousectl-cloud-deploy.
Load the prompt instructions from skills/clickhousectl-cloud-deploy/SKILL.md and consult the copy-pasteable references or guidelines inside skills/clickhousectl-cloud-deploy/references/ to complete the task.
</objective>

<execution_context>
@skills/clickhousectl-cloud-deploy/SKILL.md
</execution_context>
