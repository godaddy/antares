---
'@godaddy/antares': minor
---

Make ProgressBar value output opt-in, following RangeField. Add `valueLabel={true}` to keep the formatted value visible, or pass custom content or a render function. Omitting `valueLabel`, or passing `null` or `false`, hides visible value output while preserving accessible progress. Labels and value output can be displayed independently.
