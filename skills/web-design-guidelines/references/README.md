# Skill Reference: web-design-guidelines

This directory contains reference documentation and execution guidelines for the `web-design-guidelines` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `web-design-guidelines`
- **Purpose**: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
