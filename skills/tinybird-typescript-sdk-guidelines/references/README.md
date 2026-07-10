# Skill Reference: tinybird-typescript-sdk-guidelines

This directory contains reference documentation and execution guidelines for the `tinybird-typescript-sdk-guidelines` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `tinybird-typescript-sdk-guidelines`
- **Purpose**: Tinybird TypeScript SDK for defining datasources, pipes, and queries with full type inference. Use when working with @tinybirdco/sdk, TypeScript Tinybird projects, or type-safe data ingestion and queries.
- **Integration Prefix**: `antigravity:tinybird-typescript-sdk-guidelines`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
