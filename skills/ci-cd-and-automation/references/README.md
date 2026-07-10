# Skill Reference: ci-cd-and-automation

This directory contains reference documentation and execution guidelines for the `ci-cd-and-automation` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `ci-cd-and-automation`
- **Purpose**: Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. Use when you need to automate quality gates, configure test runners in CI, or establish deployment strategies.
- **Integration Prefix**: `antigravity:ci-cd-and-automation`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
