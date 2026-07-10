# Skill Reference: clickhouse-managed-postgres-rca

This directory contains reference documentation and execution guidelines for the `clickhouse-managed-postgres-rca` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `clickhouse-managed-postgres-rca`
- **Purpose**: MUST USE when investigating performance issues on a ClickHouse-managed Postgres instance. Provides an evidence-based RCA workflow that scrapes the Prometheus endpoint for system signal, pulls per-digest evidence from the Slow Query Patterns API, and recommends (does not apply) a fix.
- **Integration Prefix**: `antigravity:clickhouse-managed-postgres-rca`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
