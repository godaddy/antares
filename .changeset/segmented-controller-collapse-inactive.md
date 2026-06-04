---
'@godaddy/antares': minor
---

feat(segmented-controller): add `collapseInactive` mode and `icon` prop on items. When enabled, only the selected segment shows its label; others collapse to icon-only and surface their label via tooltip on hover/focus. The container reserves a `min-width` sized to the worst-case label state so the outer footprint stays stable across selections, and labels animate width 0 ↔ auto on the same 200ms timeline as the selection indicator.
