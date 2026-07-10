---
name: ideate
description: "exploration capture | explore sketch spike spec capture"
argument-hint: ""
allowed-tools:
  - Read
  - Skill
requires: [capture, explore, sketch, spike, spec-phase]
---

Route to the appropriate exploration / capture skill based on the user's intent.
`note`, `add-todo`, `add-backlog`, and `plant-seed` were folded
into `capture` (with `--note`, default, `--backlog`, `--seed` modes) by
#2790. The capture target lists pending todos via `--list`.

| User wants | Invoke |
|---|---|
| Explore an idea or opportunity | explore |
| Sketch out a rough design or plan | sketch |
| Time-boxed technical spike | spike |
| Write a spec for a phase | spec-phase |
| Capture a thought (todo / note / backlog / seed) | capture |

Invoke the matched skill directly using the Skill tool.

