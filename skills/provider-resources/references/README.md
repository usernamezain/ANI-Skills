# Skill Reference: provider-resources

This directory contains reference documentation and execution guidelines for the `provider-resources` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `provider-resources`
- **Purpose**: Implement Terraform Provider resources and data sources using the Plugin Framework. Use when developing CRUD operations, schema design, state management, and acceptance testing for provider resources.
- **Integration Prefix**: `antigravity:provider-resources`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
