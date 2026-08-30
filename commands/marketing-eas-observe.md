# marketing:eas-observe

EAS service (paid). Use for anything related to EAS Observe - adding `expo-observe` to an Expo project (AppMetricsRoot/ObserveRoot HOC, markInteractive and ObserveInteractiveMarker, the useObserve hook, the Expo Router / React Navigation integrations for per-route metrics, user-defined events via `Observe.logEvent`, error reporting via ObserveErrorBoundary and `Observe.reportError`, and runtime config such as sampleRate and dispatchInDebug), querying via the EAS CLI (`eas observe:metrics-summary`, `observe:metrics`, `observe:routes`, `observe:events`, `observe:session`, `observe:versions`), interpreting the resulting metrics (cold/warm launch, TTR, TTI, navigation cold/warm TTR, update download, and the TTI frameRate/device/network params for triaging slow startups), or shipping an Observe integration inside a third-party package.

**Skill folder:** `skills/skills-eas-observe/`
**Namespace:** `marketing`
