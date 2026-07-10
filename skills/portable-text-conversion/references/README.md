# Skill Reference: portable-text-conversion

This directory contains reference documentation and execution guidelines for the `portable-text-conversion` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `portable-text-conversion`
- **Purpose**: Convert HTML and Markdown content into Portable Text blocks for Sanity. Use when migrating content from legacy CMSs, importing HTML or Markdown into Sanity, building content pipelines that ingest external content, converting rich text between formats, or programmatically creating Portable Text documents. Covers @portabletext/markdown (markdownToPortableText), @portabletext/block-tools (htmlToBlocks), custom deserializers, and the Portable Text specification for manual block construction.
- **Integration Prefix**: `antigravity:portable-text-conversion`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
