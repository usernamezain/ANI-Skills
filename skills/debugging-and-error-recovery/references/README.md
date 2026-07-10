# Skill Reference: debugging-and-error-recovery

This directory contains reference documentation and execution guidelines for the `debugging-and-error-recovery` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `debugging-and-error-recovery`
- **Purpose**: Guides systematic root-cause debugging. Use when tests fail, builds break, behavior doesn't match expectations, or you encounter any unexpected error. Use when you need a systematic approach to finding and fixing the root cause rather than guessing.
- **Integration Prefix**: `antigravity:debugging-and-error-recovery`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
