---
"@godaddy/antares": patch
---

feat(LineChart): RTL support

`LineChart` now follows the current **layout direction** (LTR or RTL). By default the direction is detected automatically from the browser or system settings, and it can also be controlled by wrapping the chart in an ancestor `I18nProvider`. When the direction is RTL, the X-axis reverses, the Y-axis renders on the inline-end edge, and tick labels and the tooltip dismiss strip mirror to match the writing direction. See the new "Right-to-Left" example in the LineChart README.