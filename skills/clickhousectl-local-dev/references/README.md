# Skill Reference: clickhousectl-local-dev

This directory contains reference documentation and execution guidelines for the `clickhousectl-local-dev` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `clickhousectl-local-dev`
- **Purpose**: Use when a user wants to build an application with ClickHouse, set up a local ClickHouse development environment, install ClickHouse, create a local server, create tables, or start developing with ClickHouse. Covers the full flow from zero to a working local ClickHouse setup.
- **Integration Prefix**: `antigravity:clickhousectl-local-dev`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
