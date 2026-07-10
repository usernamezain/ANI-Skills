---
name: skill:portable-text-conversion
description: Convert HTML and Markdown content into Portable Text blocks for Sanity. Use when migrating content from legacy CMSs, importing HTML or Markdown into Sanity, building content pipelines that ingest external content, converting rich text between formats, or programmatically creating Portable Text documents. Covers @portabletext/markdown (markdownToPortableText), @portabletext/block-tools (htmlToBlocks), custom deserializers, and the Portable Text specification for manual block construction.
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---
<objective>
Trigger and execute the Antigravity skill: portable-text-conversion.
Load the prompt instructions from skills/portable-text-conversion/SKILL.md and consult the copy-pasteable references or guidelines inside skills/portable-text-conversion/references/ to complete the task.
</objective>

<execution_context>
@skills/portable-text-conversion/SKILL.md
</execution_context>
