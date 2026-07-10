# Skill Reference: clickhouse-architecture-advisor

This directory contains reference documentation and execution guidelines for the `clickhouse-architecture-advisor` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `clickhouse-architecture-advisor`
- **Purpose**: MUST USE when designing ClickHouse architectures, selecting between ingestion or modeling patterns, or translating best practices into workload-specific system designs. Complements clickhouse-best-practices with decision frameworks and explicit provenance labels.
- **Integration Prefix**: `antigravity:clickhouse-architecture-advisor`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
