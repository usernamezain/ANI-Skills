---
name: ai:recipe-review-meet-participants
description: "Review who attended a Google Meet conference and for how long."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "productivity"
    requires:
      bins:
        - gws
      skills:
        - gws-meet
---

# Review Google Meet Attendance

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-meet`

Review who attended a Google Meet conference and for how long.

## Steps

1. List recent conferences: `gws meet conferenceRecords list --format table`
2. List participants: `gws meet conferenceRecords participants list --params '{"parent": "conferenceRecords/CONFERENCE_ID"}' --format table`
3. Get session details: `gws meet conferenceRecords participants participantSessions list --params '{"parent": "conferenceRecords/CONFERENCE_ID/participants/PARTICIPANT_ID"}' --format table`



## When to Use
- Use this skill when the task involves `recipe-review-meet-participants` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-review-meet-participants`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
