# Skill Reference: browser-testing-with-devtools

This directory contains reference documentation and execution guidelines for the `browser-testing-with-devtools` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `browser-testing-with-devtools`
- **Purpose**: Tests in real browsers via Chrome DevTools MCP. Use when building or debugging anything that runs in a browser. Use when you need to inspect the DOM, capture console errors, analyze network requests, profile performance, or verify visual output with real runtime data. Requires the chrome-devtools MCP server to be configured.
- **Integration Prefix**: `antigravity:browser-testing-with-devtools`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
