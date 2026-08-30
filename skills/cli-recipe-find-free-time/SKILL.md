---
name: ai:recipe-find-free-time
description: "Query Google Calendar free/busy status for multiple users to find a meeting slot."
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

# Find Free Time Across Calendars

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-calendar`

Query Google Calendar free/busy status for multiple users to find a meeting slot.

## Steps

1. Query free/busy: `gws calendar freebusy query --json '{"timeMin": "2024-03-18T08:00:00Z", "timeMax": "2024-03-18T18:00:00Z", "items": [{"id": "user1@company.com"}, {"id": "user2@company.com"}]}'`
2. Review the output to find overlapping free slots
3. Create event in the free slot: `gws calendar +insert --summary 'Meeting' --attendee user1@company.com --attendee user2@company.com --start '2024-03-18T14:00:00' --end '2024-03-18T14:30:00'`



## When to Use
- Use this skill when the task involves `recipe-find-free-time` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-find-free-time`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
