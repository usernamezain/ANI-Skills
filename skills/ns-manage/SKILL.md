---
name: meta:manage
description: "config workspace | workstreams thread update ship inbox"
argument-hint: ""
allowed-tools:
  - Read
  - Skill
requires: [config, workspace, workstreams, thread, pause-work, resume-work, update, ship, inbox, pr-branch, undo]
---

Route to the appropriate management skill based on the user's intent.
`config` (settings + advanced + integrations + profile) and `workspace`
(new + list + remove) are post-#2790 consolidated entries.

| User wants | Invoke |
|---|---|
| Configure antigravity settings (basic / advanced / integrations / profile) | config |
| Manage workspaces (create / list / remove) | workspace |
| Manage parallel workstreams | workstreams |
| Continue work in a fresh context thread | thread |
| Pause current work | pause-work |
| Resume paused work | resume-work |
| Update the antigravity installation | update |
| Ship completed work | ship |
| Process inbox items | inbox |
| Create a clean PR branch | pr-branch |
| Undo the last antigravity action | undo |

Invoke the matched skill directly using the Skill tool.

