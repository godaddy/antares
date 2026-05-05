# @godaddy/antares

## 0.1.1

### Patch Changes

- feat(LineChart): RTL support

  `LineChart` now follows the current **layout direction** (LTR or RTL). By default the direction is detected automatically from the browser or system settings, and it can also be controlled by wrapping the chart in an ancestor `I18nProvider`. When the direction is RTL, the X-axis reverses, the Y-axis renders on the inline-end edge, and tick labels and the tooltip dismiss strip mirror to match the writing direction. See the new "Right-to-Left" example in the LineChart README. ([#169](https://github.com/godaddy/bento/pull/169) by @rmojica-godaddy)

- fix(BarChart, LineChart): axis margins now follow the labels that actually render

  - Axis margins are measured from the rendered tick labels, so long labels, custom `tickFormat` output, and large `numTicks` values no longer overflow the plot area or get clipped by the container.
  - When labels need more room than the container provides, the chart grows past the viewport and the parent scrolls instead of squeezing or cropping.
  - `xLabelsOrientation="auto"` (the default) is driven by the same measurements: X-axis labels flip vertical as soon as the horizontal layout would collide with the Y-axis, and rotate clockwise under `rtl` so they mirror the writing direction.
  - `BarChart` in RTL: plot area, axis backdrops, and tooltip placement now agree — fixes a horizontal offset where the right-side Y-axis backdrop and tooltip arrow pointed at the wrong column.
  - Raised `BarChart`'s minimum height so bottom-axis tick marks render fully on short containers. ([#161](https://github.com/godaddy/bento/pull/161) by @rmojica-godaddy)

## 0.1.0

### Minor Changes

- feat: remove styles from @bento/icon and fix build issues in antares ([#162](https://github.com/godaddy/bento/pull/162) by @rmarkins-godaddy)

### Patch Changes

<details>
<summary>Updated dependencies</summary>

- @bento/icon@0.2.0
</details>
