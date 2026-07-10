# Skill Reference: firecrawl-build-onboarding

This directory contains reference documentation and execution guidelines for the `firecrawl-build-onboarding` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `firecrawl-build-onboarding`
- **Purpose**: Get Firecrawl credentials and SDK setup into a project. Use when an application needs `FIRECRAWL_API_KEY`, when an agent should add Firecrawl to `.env`, when the user wants to authenticate Firecrawl for app code, or when choosing the first SDK and docs for a new Firecrawl integration. This skill includes its own browser auth flow, so it does not depend on the website onboarding skill.
- **Integration Prefix**: `antigravity:firecrawl-build-onboarding`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
