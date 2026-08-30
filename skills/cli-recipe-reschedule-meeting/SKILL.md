---
name: ai:recipe-reschedule-meeting
description: "Move a Google Calendar event to a new time and automatically notify all attendees."
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

# Reschedule a Google Calendar Meeting

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-calendar`

Move a Google Calendar event to a new time and automatically notify all attendees.

## Steps

1. Find the event: `gws calendar +agenda`
2. Get event details: `gws calendar events get --params '{"calendarId": "primary", "eventId": "EVENT_ID"}'`
3. Update the time: `gws calendar events patch --params '{"calendarId": "primary", "eventId": "EVENT_ID", "sendUpdates": "all"}' --json '{"start": {"dateTime": "2025-01-22T14:00:00", "timeZone": "America/New_York"}, "end": {"dateTime": "2025-01-22T15:00:00", "timeZone": "America/New_York"}}'`



## When to Use
- Use this skill when the task involves `recipe-reschedule-meeting` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-reschedule-meeting`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
