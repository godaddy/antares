---
'@godaddy/antares': minor
---

Redesign DonutChart with a composable center and legend.

Replace `label` and `subLabel` with `Text` in the `value` and `description` slots of `DonutChartCenter`. Replace `legend` and `legendLabel` with `ChartLegend` and its optional `label`. The legend appears below by default. Set `legendPosition="end"` on `DonutChart` for a legend at the inline end. The chart root now accepts Grid layout props instead of Flex props, so Flex-only props such as `direction` and `wrap` are no longer accepted.

Ring and tooltip colors match the legend when zero or negative values are present.
