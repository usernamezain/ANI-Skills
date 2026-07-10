# Skill Reference: tinybird-cli-guidelines

This directory contains reference documentation and execution guidelines for the `tinybird-cli-guidelines` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `tinybird-cli-guidelines`
- **Purpose**: Tinybird CLI commands, workflows, and operations. Use when running tb commands, managing local development, deploying, or working with data operations.
- **Integration Prefix**: `antigravity:tinybird-cli-guidelines`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
