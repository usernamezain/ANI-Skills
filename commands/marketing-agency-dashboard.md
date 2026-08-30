# marketing:agency-dashboard

Generate a portfolio-level dashboard across ALL client brands — per-client RAG health scores, campaign activity, budget pacing, aggregate KPIs, team utilization, pending approvals, upcoming deadlines, and an alerts panel — built for agency standups and weekly reviews. Triggers on \"/digital-marketing-pro:agency-dashboard\", \"how are all our clients doing\", \"portfolio health check\", \"budget pacing across accounts\", \"which accounts are at risk\". Enumerates every brand under ~/.claude-marketing/brands/ and pulls data via campaign-tracker.py, execution-tracker.py, and team-manager.py; drill into a single client with /digital-marketing-pro:performance-report or /digital-marketing-pro:client-report.

**Skill folder:** `skills/digital-marketing-pro-agency-dashboard/`
**Namespace:** `marketing`
