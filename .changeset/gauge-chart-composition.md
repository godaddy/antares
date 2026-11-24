---
'@godaddy/antares': minor
---

Redesign GaugeChart with a composable center and range.

Replace `label` and `subLabel` with `Text` in the `value` and `description` slots of `GaugeChartCenter`. Replace `rangeLabel` with `GaugeChartRange` and `Text` in its `min` and `max` slots. Set `valueLabel` for the meter's accessible value text; the description now describes the meter.
