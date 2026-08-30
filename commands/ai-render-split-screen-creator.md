# ai:render-split-screen-creator

Assemble a split-screen creator ad from a config — a two-zone vertical composite where a supplied AI-creator lip-sync take fills the BOTTOM ~48% while real 16:9 product/demo clips run uncropped in the TOP ~52%, each top clip contain-fit with a darkened blurred cover-scale fill of the same clip (never black bars), a 3px brand-color divider between the zones, the creator slice cover-fit per the per-scene VO timing, scenes hard-concatenated with the body audio being the concatenated creator VO slices, an end card held on the last sharp frame ~3s, then the ASSEMBLED cut transcribed with local Whisper (not the raw VO — concat drops inter-scene silence) and word-level captions burned in the chosen style. This is the FREE deterministic assembly + caption stage (two-zone composite + blurred fill + divider + hard-concat + end card + captions); the VO comes from create-vo-elevenlabs, the anchor from create-image-gpt-image-fal, and the whole-VO lip-sync from a paid VEED Fabric 1.0 take (a no-atom upstream input). Use for the split-screen-creator format.

**Skill folder:** `skills/goose-skills-render-split-screen-creator/`
**Namespace:** `ai`
