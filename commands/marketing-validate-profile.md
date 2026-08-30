# marketing:validate-profile

Read-only health check that a brand profile is production-ready: required fields, voice and audience completeness, guardrails, compliance-jurisdiction coverage, connector configuration and MCP reachability, output-path writeability, and model-registry age — reported per check as BLOCKER or WARNING without ever printing credential values. Triggers on \"/digital-marketing-pro:validate-profile\", \"is the brand setup correct\", \"check connector credentials\", \"profile sanity check\", \"we rotated an API key — is it wired up\". Reads profile.json and probes connectors via connector-status.py; the prerequisite gate before /digital-marketing-pro:engagement, /digital-marketing-pro:campaign-plan, and /digital-marketing-pro:launch-campaign.

**Skill folder:** `skills/digital-marketing-pro-validate-profile/`
**Namespace:** `marketing`
