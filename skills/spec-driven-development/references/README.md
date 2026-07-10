# Skill Reference: spec-driven-development

This directory contains reference documentation and execution guidelines for the `spec-driven-development` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `spec-driven-development`
- **Purpose**: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when requirements are unclear, ambiguous, or only exist as a vague idea.
- **Integration Prefix**: `antigravity:spec-driven-development`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
