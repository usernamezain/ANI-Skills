# ai:tao-analyze-gaps-visual-changenet

Performs gap analysis on NVIDIA TAO VCN Classify (Visual Component Net) experiments by invoking the data-services container (`tao_toolkit.data_services` from `versions.yaml`) directly via `docker run … gap_analysis vcn_aoi …` — picks the optimal decision threshold, ranks per-sample weakness, and emits a top-K weakest parquet expanded per-lighting for downstream augmentation. Use when analyzing VCN classification failures, picking SDA augmentation targets, or auditing PASS/NO_PASS boundary cases.

**Skill folder:** `skills/skills-tao-analyze-gaps-visual-changenet/`
**Namespace:** `ai`
