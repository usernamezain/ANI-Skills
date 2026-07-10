# Skill Reference: shipping-and-launch

This directory contains reference documentation and execution guidelines for the `shipping-and-launch` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `shipping-and-launch`
- **Purpose**: Prepares production launches. Use when preparing to deploy to production. Use when you need a pre-launch checklist, when setting up monitoring, when planning a staged rollout, or when you need a rollback strategy.
- **Integration Prefix**: `antigravity:shipping-and-launch`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
