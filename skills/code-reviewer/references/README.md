# Skill Reference: code-reviewer

This directory contains reference documentation and execution guidelines for the `code-reviewer` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `code-reviewer`
- **Purpose**: Reviews source files for bugs, security issues, and code quality problems. Produces structured REVIEW.md with severity-classified findings. Spawned by /antigravity:code-review.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
