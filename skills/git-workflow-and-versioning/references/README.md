# Skill Reference: git-workflow-and-versioning

This directory contains reference documentation and execution guidelines for the `git-workflow-and-versioning` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `git-workflow-and-versioning`
- **Purpose**: Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, or when you need to organize work across multiple parallel streams. Use when cutting a release, choosing a semantic version bump, tagging, or writing a changelog.
- **Integration Prefix**: `antigravity:git-workflow-and-versioning`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
