# Skill Reference: firecrawl-build-scrape

This directory contains reference documentation and execution guidelines for the `firecrawl-build-scrape` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `firecrawl-build-scrape`
- **Purpose**: Integrate Firecrawl `/scrape` into product code for single-page extraction. Use when an app already has a URL and needs markdown, HTML, links, screenshots, metadata, or structured page output. Prefer this skill over broader crawl patterns when the feature is page-level.
- **Integration Prefix**: `antigravity:firecrawl-build-scrape`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
