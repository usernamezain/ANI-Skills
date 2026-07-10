# Skill Reference: doubt-driven-development

This directory contains reference documentation and execution guidelines for the `doubt-driven-development` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `doubt-driven-development`
- **Purpose**: Subjects every non-trivial decision to a fresh-context adversarial review before it stands. Use when correctness matters more than speed, when working in unfamiliar code, when stakes are high (production, security-sensitive logic, irreversible operations), or any time a confident output would be cheaper to verify now than to debug later.
- **Integration Prefix**: `antigravity:doubt-driven-development`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
