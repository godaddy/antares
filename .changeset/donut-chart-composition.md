---
'@godaddy/antares': minor
---

Redesign DonutChart with a composable center and legend.

Replace `label` and `subLabel` with `Text` in the `value` and `description` slots of `DonutChartCenter`. Replace `legend` and `legendLabel` with `DonutChartLegend` and its optional `label`. The legend appears below by default. Set `legendPlacement="end"` on `DonutChart` for a legend at the inline end. The chart root now accepts Grid layout props.
