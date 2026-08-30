# marketing:save-knowledge

Save a single piece of brand knowledge — a campaign learning, guideline, competitive finding, performance insight, or approved asset — to the persistent memory layer with SHA-256 deduplication, auto-suggested tags, provenance tracking, priority, and optional expiration. Stores via a connected vector-DB MCP (e.g. Pinecone) when one exists, otherwise in the always-available local index; no memory backend is bundled by default. Triggers on \"/digital-marketing-pro:save-knowledge\", \"remember this for next time\", \"save that email analysis we just did\", \"store this competitor intel\", \"keep this learning about subject lines\". Pairs with /digital-marketing-pro:search-knowledge for retrieval and /digital-marketing-pro:sync-memory for bulk session syncing.

**Skill folder:** `skills/digital-marketing-pro-save-knowledge/`
**Namespace:** `marketing`
