# marketing:connect

Guide the connection of a known MCP integration to the plugin — looks up the connector registry via connector-status.py, checks current status, and returns transport-specific setup steps (OAuth for HTTP connectors, env-var credentials plus the exact .mcp.json block for npx connectors), verification steps, and the skills each connector unlocks. Triggers on \"/digital-marketing-pro:connect\", \"connect Google Ads\", \"hook up Slack to the plugin\", \"set up the HubSpot integration\", \"how do I add Mailchimp\". Guidance and status checks only — the user adds credentials themselves; unknown or custom servers route to /digital-marketing-pro:add-integration.

**Skill folder:** `skills/digital-marketing-pro-connect/`
**Namespace:** `marketing`
