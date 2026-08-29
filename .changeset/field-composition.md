---
'@godaddy/antares': minor
---

feat: compose field primitives instead of Field* wrappers

BREAKING (`TextField`): compose `Label`, `Group`, `Input` or `TextArea`, `Text slot="description"`, and `FieldError`. Removed `label`, `description`, `errorMessage`, `leadingText`, `trailingText`, `multiline`, `placeholder`, and `size`. Size lives on `Group`. Placeholder lives on `Input` / `TextArea`.

Public primitives: `Label`/`LabelContext`, `Group`/`GroupContext`/`FieldSize`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, `ControlButton`/`ControlButtonContext`, `FieldError`/`FieldErrorContext`. Field is an internal shell that merges RAC contexts to inject chrome. One `Select` (plus `FieldSelect` alias) uses `InGroupContext` to share a box with `Input`.
