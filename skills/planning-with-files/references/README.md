# Skill Reference: planning-with-files

This directory contains reference documentation and execution guidelines for the `planning-with-files` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `planning-with-files`
- **Purpose**: Implements Manus-style file-based planning to organize and track progress on complex tasks. Creates task_plan.md, findings.md, and progress.md. Use when asked to plan out, break down, or organize a multi-step project, research task, or any work requiring 5+ tool calls. Supports automatic session recovery after /clear.
- **Allowed Tools**: `"Read Write Edit Bash Glob Grep"`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
