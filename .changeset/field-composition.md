---
'@godaddy/antares': minor
---

feat: compose field primitives instead of Field* wrappers

`TextField` keeps `label`, `description`, `errorMessage`, `placeholder`, `leadingText`, `trailingText`, `multiline`, and `size` for the common case. Pass `children` to compose `Label`, `Group`, `Input` or `TextArea`, and `FieldError` instead.

`Select` keeps its shorthand field props and its `SelectItem` children. Its `children` now also accept a composed interior built from field primitives and the new `SelectValue` component, or a function returning that interior when it needs the Select state (`isOpen` and friends).

Public primitives: `Label`/`LabelContext`, `Group`/`GroupContext`/`FieldSize`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, `ControlButton`/`ControlButtonContext`, `FieldError`/`FieldErrorContext`. Field is an internal shell that merges RAC contexts to inject chrome. `Select` uses `InGroupContext` to share a box with `Input`.
