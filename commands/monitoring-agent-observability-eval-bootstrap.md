# monitoring:agent-observability-eval-bootstrap

Bootstrap evaluators from production traces — by default propose online LLM-judge evaluators and, after you confirm, create them in Datadog as disabled drafts (never auto-enabled); on request emit Python SDK code or a framework-agnostic JSON spec instead. Use when user says "bootstrap evaluators", "generate evaluators", "create evals from traces", "eval bootstrap", "write evaluators", "build eval suite", "publish evaluators", or wants to generate BaseEvaluator/LLMJudge code or online judge configs from production LLM trace data. Works with ml_app and optional RCA report or failure hypothesis.

**Skill folder:** `skills/agent-skills-agent-observability-eval-bootstrap/`
**Namespace:** `monitoring`
