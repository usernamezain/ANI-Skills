---
name: ai:recipe-batch-invite-to-event
description: "Add a list of attendees to an existing Google Calendar event and send notifications."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "scheduling"
    requires:
      bins:
        - gws
      skills:
        - gws-calendar
---

# Add Multiple Attendees to a Calendar Event

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-calendar`

Add a list of attendees to an existing Google Calendar event and send notifications.

## Steps

1. Get the event: `gws calendar events get --params '{"calendarId": "primary", "eventId": "EVENT_ID"}'`
2. Add attendees: `gws calendar events patch --params '{"calendarId": "primary", "eventId": "EVENT_ID", "sendUpdates": "all"}' --json '{"attendees": [{"email": "alice@company.com"}, {"email": "bob@company.com"}, {"email": "carol@company.com"}]}'`
3. Verify attendees: `gws calendar events get --params '{"calendarId": "primary", "eventId": "EVENT_ID"}'`



## When to Use
- Use this skill when the task involves `recipe-batch-invite-to-event` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-batch-invite-to-event`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
