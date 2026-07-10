# Skill Reference: code-review-and-quality

This directory contains reference documentation and execution guidelines for the `code-review-and-quality` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `code-review-and-quality`
- **Purpose**: Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when you need to assess code quality across multiple dimensions before it enters the main branch.
- **Integration Prefix**: `antigravity:code-review-and-quality`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
