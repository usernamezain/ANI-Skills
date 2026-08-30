# marketing:churn-risk

Score customer segments for churn risk from behavioral signals — email engagement decline, purchase recency, usage drops, support sentiment — producing a 0-100 risk scorecard with four tiers, per-tier intervention playbooks (actions, timing windows, channels, messaging), LTV-at-risk totals, and retention-ROI prioritization. Assesses and recommends; it does not send outreach or launch campaigns. Triggers on \"/digital-marketing-pro:churn-risk\", \"which customers are about to churn\", \"score our segments for churn risk\", \"email engagement is dropping, who is at risk\", \"build a retention intervention plan\". Pulls behavioral data from a connected CRM MCP (Salesforce or HubSpot) or user-provided exports, runs scripts/churn-predictor.py, and reads the brand profile for lifecycle context.

**Skill folder:** `skills/digital-marketing-pro-churn-risk/`
**Namespace:** `marketing`
