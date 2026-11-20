---
'@godaddy/antares': minor
---

Make CircularProgress composable with optional Box track/value slots, Label, and Text descriptions. Progress state, formatting, and accessible associations remain coordinated by the root.

Breaking: replace label and helperText props with Label children and Text slot="description". Explicitly compose Box slot="track" for the circular indicator and Box or Text slot="value" for visible progress; the root no longer renders these parts automatically.

Rename the root emphasis prop to status for consistency with ProgressBar. Supported values are default, success, warning, and critical. The existing fill colors are preserved, and status defaults to default.
