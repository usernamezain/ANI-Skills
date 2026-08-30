# marketing:sync-memory

Batch-sync this session's learnings, insights.json entries, and campaign history into the persistent memory layer — incremental from the last checkpoint so repeat runs are fast and idempotent — and report exactly what was synced, skipped, or failed. Triggers on \"/digital-marketing-pro:sync-memory\", \"save what we learned this session\", \"sync insights to memory\", \"persist campaign learnings before I close\", \"did my session learnings get saved\". Stores via a connected vector-DB MCP when one exists, otherwise the local index; reads the active brand profile and complements /digital-marketing-pro:save-knowledge, which saves single items.

**Skill folder:** `skills/digital-marketing-pro-sync-memory/`
**Namespace:** `marketing`
