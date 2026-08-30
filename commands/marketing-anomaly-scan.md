# marketing:anomaly-scan

Scan all connected marketing platforms for statistically significant deviations from stored baselines — traffic drops, CPA spikes, deliverability collapse, budget overruns, or unexpected wins — classified critical/warning/info with probable causes, correlation to recent changes, and recommended actions. Triggers on \"/digital-marketing-pro:anomaly-scan\", \"why did our CPA spike\", \"did anything weird happen this week\", \"check for anomalies\", \"our conversions suddenly dropped\". Runs performance-monitor.py for baselines and detection, correlates flags against execution-tracker.py history and the diagnostic framework in skills/analytics-insights/anomaly-diagnosis.md, and persists critical findings as insights via campaign-tracker.py. Reads the brand profile.

**Skill folder:** `skills/digital-marketing-pro-anomaly-scan/`
**Namespace:** `marketing`
