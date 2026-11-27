---
'@godaddy/antares': minor
---

Redesign DonutChart with a composable center and legend.

Replace `label` and `subLabel` with `Text` in the `value` and `description` slots of `DonutChartCenter`. Replace `legend` and `legendLabel` with `ChartLegend` and its optional `label`. The legend appears below by default. Set `legendPosition="end"` on `DonutChart` for a legend at the inline end. The chart root now accepts Grid layout props instead of Flex props, so Flex-only props such as `direction` and `wrap` are no longer accepted.

`DonutChartCenter` now uses Grid layout props in place of Flex props. Replace Flex-only props such as `direction` and `wrap` with Grid layout. The center slots can appear in either order. Use `Text size` to override the responsive default. The mounted description slot describes the ring alongside any caller-provided `aria-describedby` references.

Ring and tooltip colors match the legend when zero or negative values are present.
