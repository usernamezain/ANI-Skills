# Skill Reference: refactor-module

This directory contains reference documentation and execution guidelines for the `refactor-module` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `refactor-module`
- **Purpose**: Transform monolithic Terraform configurations into reusable, maintainable modules following HashiCorp's module design principles and community best practices.
- **Integration Prefix**: `antigravity:refactor-module`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
