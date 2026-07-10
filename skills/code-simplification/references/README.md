# Skill Reference: code-simplification

This directory contains reference documentation and execution guidelines for the `code-simplification` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `code-simplification`
- **Purpose**: Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code works but is harder to read, maintain, or extend than it should be. Use when reviewing code that has accumulated unnecessary complexity.
- **Integration Prefix**: `antigravity:code-simplification`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
