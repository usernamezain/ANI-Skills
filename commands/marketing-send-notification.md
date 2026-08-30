# marketing:send-notification

Send internal team notifications through a connected Slack or Intercom MCP — campaign status updates, performance alerts, and approval requests formatted by urgency tier (info/warning/critical with @here escalation), with inline campaign or approval context, call-to-action blocks, and a 24-hour alert-fatigue check on the target channel. Strictly internal team messaging, never customer outreach, and every send passes a mandatory approval gate with a formatted preview first. Triggers on \"/digital-marketing-pro:send-notification\", \"ping the team that the campaign launched\", \"alert #marketing about the bounce-rate spike\", \"send an approval request to Slack\", \"notify leadership before EOD\". Reads the brand profile and the channel's recent notification history.

**Skill folder:** `skills/digital-marketing-pro-send-notification/`
**Namespace:** `marketing`
