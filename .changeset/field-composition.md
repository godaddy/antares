---
'@godaddy/antares': minor
---

feat: compose field primitives instead of Field* wrappers

`TextField` keeps `label`, `description`, `errorMessage`, `placeholder`, `leadingText`, `trailingText`, `multiline`, and `size` for the common case. Pass `children` to compose `Label`, `Group`, `Input` or `TextArea`, and `FieldError` instead.

Public primitives: `Label`/`LabelContext`, `Group`/`GroupContext`/`FieldSize`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, `ControlButton`/`ControlButtonContext`, `FieldError`/`FieldErrorContext`. Field is an internal shell that merges RAC contexts to inject chrome. One `Select` (plus `FieldSelect` alias) uses `InGroupContext` to share a box with `Input`.
