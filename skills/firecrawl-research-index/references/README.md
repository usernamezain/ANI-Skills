# Skill Reference: firecrawl-research-index

This directory contains reference documentation and execution guidelines for the `firecrawl-research-index` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `firecrawl-research-index`
- **Purpose**: Find the papers that answer a research query with Firecrawl Research, using semantic search, semantic and structural expansion, and in-body verification. Always use this skill for any literature-finding / paper-retrieval task — single-paper lookups or full multi-paper sets.
- **Integration Prefix**: `antigravity:firecrawl-research-index`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
