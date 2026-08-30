# marketing:launch-monitor

Use when the user asks to "monitor my launch", "track our Product Hunt / Hacker News ranking", or "watch the launch window"; runs the T-0 to T+30 window watch — pre-launch instrumentation verification (UTM/event checks, the upstream of RAMP P1), HN rank/points/comments polling with a comments-over-points flamewar early-warning (Estimated heuristic), PH votes/featured status, store charts and reviews, news echo, D0/W1/M1 KPI snapshots vs targets, spike-vs-sustain and owned-capture reads, and alert thresholds against the launch-tier KPI targets. Not for launch-day go/rollback calls — use launch-day-conductor; not for metric deep-dives — use performance-analyzer; not for SEO rank tracking — use rank-tracker. 发布监控/排名轮询/火焰战比/spike-sustain

**Skill folder:** `skills/aaron-marketing-skills-launch-monitor/`
**Namespace:** `marketing`
