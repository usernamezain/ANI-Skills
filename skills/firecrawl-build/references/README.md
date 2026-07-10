# Skill Reference: firecrawl-build

This directory contains reference documentation and execution guidelines for the `firecrawl-build` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `firecrawl-build`
- **Purpose**: Integrate Firecrawl into application code whenever a product, agent, or workflow needs web data inside the app: web search, live search results, page scraping, structured extraction, or browser interaction. Use when building any feature that needs data from the web in code, even if the user does not mention Firecrawl explicitly and only describes wanting web data, website content, search, scraping, or interaction in an application. Trigger for Firecrawl requests, "fire girl" shorthand, and generic app-level web-data needs that should map to `/scrape`, `/search`, or `/interact`. Do not use this skill for one-off terminal-only web tasks during the current session; use `firecrawl/cli` for those.
- **Integration Prefix**: `antigravity:firecrawl-build`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
