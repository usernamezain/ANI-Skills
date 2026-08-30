# marketing:campaign-status

Unified status dashboard for every tracked campaign across connected platforms — produces a summary table with health indicators, live spend and performance metrics, a 7-day execution history, pending approvals with age, KPI variance classification (on track / at risk / behind), flagged issues, and next scheduled actions. Reports only; it changes nothing on any platform. Triggers on \"/digital-marketing-pro:campaign-status\", \"what campaigns are running right now\", \"any failed executions or stuck approvals\", \"status of the Q1-Launch campaign\", \"which campaigns are behind target\". Reads the brand's campaign registry, execution log, and approval queue via campaign-tracker.py, execution-tracker.py, and approval-manager.py, plus live metrics from connected platform MCPs.

**Skill folder:** `skills/digital-marketing-pro-campaign-status/`
**Namespace:** `marketing`
