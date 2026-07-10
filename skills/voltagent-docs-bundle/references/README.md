# Skill Reference: voltagent-docs-bundle

This directory contains reference documentation and execution guidelines for the `voltagent-docs-bundle` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `voltagent-docs-bundle`
- **Purpose**: Look up VoltAgent documentation embedded in node_modules/@voltagent/core/docs for version-matched docs. Use for API signatures, guides, and examples.
- **Integration Prefix**: `antigravity:voltagent-docs-bundle`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
