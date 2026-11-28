---
'@godaddy/antares': minor
---

Redesign GaugeChart with a composable center and range.

Breaking changes: replace `label` and `subLabel` with the `value` and `description` slots of `GaugeChartCenter`. Replace `rangeLabel` with the `min` and `max` slots of `GaugeChartRange`. The chart root no longer accepts `as`, `areas`, or `rows`.

The visible label and sub-label no longer supply the announced value. Set `valueLabel` for accessible value text. Root ARIA naming and description props now apply to the inner meter. The root keeps its `data-*` attributes. When the description slot mounts, its ID is appended to any caller-provided `aria-describedby` references. The slot preserves a caller-provided ID.
