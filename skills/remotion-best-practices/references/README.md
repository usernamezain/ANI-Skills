# Skill Reference: remotion-best-practices

This directory contains reference documentation and execution guidelines for the `remotion-best-practices` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `remotion-best-practices`
- **Purpose**: Best practices and domain knowledge for building videos programmatically with Remotion (videos in React/TypeScript, rendered to MP4). Use whenever writing or editing Remotion code — scaffolding a video project, animating with interpolate/spring over useCurrentFrame(), sequencing scenes and transitions, captions/subtitles, audio, GIFs/Lottie/3D, charts, visual effects, dynamic duration via calculateMetadata, or rendering. Consult before reaching for a Remotion API, since its components and props evolve (e.g. @remotion/media).
- **Integration Prefix**: `antigravity:remotion-best-practices`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
