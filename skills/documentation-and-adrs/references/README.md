# Skill Reference: documentation-and-adrs

This directory contains reference documentation and execution guidelines for the `documentation-and-adrs` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `documentation-and-adrs`
- **Purpose**: Records decisions and documentation. Use when making architectural decisions, changing public APIs, shipping features, or when you need to record context that future engineers and agents will need to understand the codebase.
- **Integration Prefix**: `antigravity:documentation-and-adrs`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
