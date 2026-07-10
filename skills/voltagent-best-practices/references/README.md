# Skill Reference: voltagent-best-practices

This directory contains reference documentation and execution guidelines for the `voltagent-best-practices` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `voltagent-best-practices`
- **Purpose**: VoltAgent architectural patterns and conventions. Covers agents vs workflows, project layout, memory, servers, and observability.
- **Integration Prefix**: `antigravity:voltagent-best-practices`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
