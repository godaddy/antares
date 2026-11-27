---
'@godaddy/antares': minor
---

Redesign GaugeChart with a composable center and range.

Replace `label` and `subLabel` with `Text` in the `value` and `description` slots of `GaugeChartCenter`. Replace `rangeLabel` with `GaugeChartRange` and `Text` in its `min` and `max` slots. The center slots can appear in either order. Use `Text size` to override the responsive default and `valueLabel` for the meter's accessible value text.

The meter role now lives on the arc so center controls remain accessible. The mounted description slot describes the meter alongside any caller-provided `aria-describedby` references.
