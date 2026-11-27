---
'@godaddy/antares': minor
---

Redesign DonutChart with a composable center and legend.

Breaking changes: replace `label` and `subLabel` with the `value` and `description` slots of `DonutChartCenter`. Replace `legend` and `legendLabel` with `ChartLegend` and its optional `label`. The root uses Grid layout props. The root no longer accepts `as`, `direction`, `wrap`, `justifyContent`, or `justifyItems`. Use `display="grid"` or `"inline-grid"` in place of the Flex display values. The chart owns `areas`, `columns`, and `rows`.

The legend appears below by default. Set `legendPosition="end"` for an inline-end legend. Root ARIA naming and description props (`aria-labelledby`, `aria-describedby`, `aria-description`, and `aria-details`) now apply to the chart graphic. The description slot adds to any caller-provided `aria-describedby` references. Ring and tooltip colors match the legend when zero or negative values are present.
