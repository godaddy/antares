---
"@godaddy/antares": patch
---

fix(BarChart, LineChart): axis margins now follow the labels that actually render

- Axis margins are measured from the rendered tick labels, so long labels, custom `tickFormat` output, and large `numTicks` values no longer overflow the plot area or get clipped by the container.
- When labels need more room than the container provides, the chart grows past the viewport and the parent scrolls instead of squeezing or cropping.
- `xLabelsOrientation="auto"` (the default) is driven by the same measurements: X-axis labels flip vertical as soon as the horizontal layout would collide with the Y-axis, and rotate clockwise under `rtl` so they mirror the writing direction.
- `BarChart` in RTL: plot area, axis backdrops, and tooltip placement now agree — fixes a horizontal offset where the right-side Y-axis backdrop and tooltip arrow pointed at the wrong column.
- Raised `BarChart`'s minimum height so bottom-axis tick marks render fully on short containers.
