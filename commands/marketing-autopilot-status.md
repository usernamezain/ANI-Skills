# marketing:autopilot-status

Campaign autopilot operations dashboard — 0-100 health scores for all active campaigns, a chronological log of auto-corrections taken (bid, budget, audience, creative, pause) with before/after metrics, the current guardrail rule table, campaigns escalated for human attention ranked by urgency, and estimated savings from automated interventions. Triggers on \"/digital-marketing-pro:autopilot-status\", \"how is autopilot doing\", \"what did the autopilot change\", \"which campaigns need my attention\", \"show guardrail settings\". Runs campaign-health-monitor.py for health scores, corrections history, and the savings report; reads the brand profile for KPI targets, naming conventions, and budget constraints.

**Skill folder:** `skills/digital-marketing-pro-autopilot-status/`
**Namespace:** `marketing`
