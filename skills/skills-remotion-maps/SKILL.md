---
name: ui:remotion-maps
description: Remotion Map animation knowledge
version: 4.0.518
---

# Remotion Maps

Choose exactly one technique from the intended shot, then load only that technique's `TECHNIQUE.md`.
Every technique directory is self-contained and may be removed without breaking the others.

## [Static map](techniques/static-map/TECHNIQUE.md)

- Requires you grab a satellite image and mount it in a `<Img>` tag, and animate on top

## [Mapbox](techniques/mapbox/TECHNIQUE.md)

- Requires a Mapbox key
- Nicer styles by default
- Map can display a round globe when zoomed out
- Includes nice 3D buildings such as the Eiffel tower

## [MapLibre](techniques/maplibre/TECHNIQUE.md)

- Requires no API key, fully free
- Does not include 3D building

## [MapTiler](techniques/maptiler/TECHNIQUE.md)

- Uses MapTiler
- Annotations can be drawn on top of geographic features: borders, rivers, labels

## [CesiumJS](techniques/cesium/TECHNIQUE.md)

- Flythroughs through terrain and mountains
- "Flight simulator" perspective


## When to Use
- Use this skill when the task involves `remotion-maps` workflows, tooling, or domain requirements from `remotion-dev/skills`.
- Trigger on user keywords: `remotion-maps`, `skills`, `ui`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
