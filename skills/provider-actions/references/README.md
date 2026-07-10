# Skill Reference: provider-actions

This directory contains reference documentation and execution guidelines for the `provider-actions` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `provider-actions`
- **Purpose**: Implement Terraform Provider actions using the Plugin Framework. Use when developing imperative operations that execute at lifecycle events (before/after create, update, destroy).
- **Integration Prefix**: `antigravity:provider-actions`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
