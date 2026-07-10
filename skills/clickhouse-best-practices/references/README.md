# Skill Reference: clickhouse-best-practices

This directory contains reference documentation and execution guidelines for the `clickhouse-best-practices` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `clickhouse-best-practices`
- **Purpose**: MUST USE when reviewing ClickHouse schemas, queries, or configurations. Contains 31 rules that MUST be checked before providing recommendations. Always read relevant rule files and cite specific rules in responses.
- **Integration Prefix**: `antigravity:clickhouse-best-practices`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
