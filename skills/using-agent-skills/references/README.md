# Skill Reference: using-agent-skills

This directory contains reference documentation and execution guidelines for the `using-agent-skills` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `using-agent-skills`
- **Purpose**: Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.
- **Integration Prefix**: `antigravity:using-agent-skills`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
