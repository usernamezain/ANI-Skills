# Skill Reference: doc-classifier

This directory contains reference documentation and execution guidelines for the `doc-classifier` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `doc-classifier`
- **Purpose**: Classifies a single planning document as ADR, PRD, SPEC, DOC, or UNKNOWN. Extracts title, scope summary, and cross-references. Spawned in parallel by /antigravity:ingest-docs. Writes a JSON classification file and returns a one-line confirmation.
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
