# marketing:add-integration

Walk through adding a custom MCP server integration to the plugin — searches npm for an existing MCP package (or scaffolds a custom server from the plugin's guide), generates the exact .mcp.json entry, sets up environment-variable credentials, tests connectivity, and documents the tools the new server exposes. Triggers on \"/digital-marketing-pro:add-integration\", \"connect Ahrefs to the plugin\", \"add a new MCP server\", \"integrate our internal API\", \"hook up Stripe data\". Reads the brand profile and agency credential profiles at ~/.claude-marketing/credentials/ to map client-specific keys; custom builds follow skills/context-engine/custom-mcp-guide.md.

**Skill folder:** `skills/digital-marketing-pro-add-integration/`
**Namespace:** `marketing`
