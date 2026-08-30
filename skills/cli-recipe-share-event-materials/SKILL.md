---
name: ai:recipe-share-event-materials
description: "Share Google Drive files with all attendees of a Google Calendar event."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "productivity"
    requires:
      bins:
        - gws
      skills:
        - gws-calendar
        - gws-drive
---

# Share Files with Meeting Attendees

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-calendar`, `gws-drive`

Share Google Drive files with all attendees of a Google Calendar event.

## Steps

1. Get event attendees: `gws calendar events get --params '{"calendarId": "primary", "eventId": "EVENT_ID"}'`
2. Share file with each attendee: `gws drive permissions create --params '{"fileId": "FILE_ID"}' --json '{"role": "reader", "type": "user", "emailAddress": "attendee@company.com"}'`
3. Verify sharing: `gws drive permissions list --params '{"fileId": "FILE_ID"}' --format table`



## When to Use
- Use this skill when the task involves `recipe-share-event-materials` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-share-event-materials`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
