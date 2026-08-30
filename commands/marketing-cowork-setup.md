# marketing:cowork-setup

One-shot setup that wires Digital Marketing Pro for team use in Anthropic Cowork — verifies the sandbox via plugin-metadata.py, checks a Google Drive MCP is connected, creates the canonical Drive folder skeleton (_brands/, _runs/, _plans/), and writes the routing config via drive-sync-state.py so brand profiles, plans, and run checkpoints persist across sessions. Triggers on \"/digital-marketing-pro:cowork-setup\", \"set up DMP for my team in Cowork\", \"brand profiles aren't persisting between sessions\", \"route outputs to our shared Drive\", \"first-time Cowork install\". Run once per team; in local Claude Code it only offers optional Drive mirroring. Pairs with /digital-marketing-pro:brand-setup next and /digital-marketing-pro:doctor to verify routing.

**Skill folder:** `skills/digital-marketing-pro-cowork-setup/`
**Namespace:** `marketing`
