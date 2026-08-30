# marketing:client-report

Generate a white-labeled client report in agency voice — weekly pulse, monthly review, or QBR — with a KPI scorecard vs targets and comparison period, channel breakdowns, top wins with attribution, root-cause analysis of misses, 3-5 strategic recommendations, and budget efficiency. Requires explicit approval before any external send; only then can it deliver via connected Slack, email, or Google Sheets MCPs and log the delivery. Triggers on \"/digital-marketing-pro:client-report\", \"prepare the monthly report for the client\", \"build the QBR for this account\", \"send the weekly performance pulse\", \"white-labeled performance report\". Reads the brand profile and pulls data via campaign-tracker.py, execution-tracker.py, and connected platform MCPs; formats via report-generator.py.

**Skill folder:** `skills/digital-marketing-pro-client-report/`
**Namespace:** `marketing`
