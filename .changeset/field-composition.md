---
'@godaddy/antares': minor
---

feat: compose field primitives instead of Field* wrappers

`TextField` keeps `label`, `description`, `errorMessage`, `placeholder`, `leadingText`, `trailingText`, `multiline`, and `size` for the common case. Pass `children` to compose `Label`, `Group`, `Input` or `TextArea`, and `FieldError` instead.

`Select` keeps its shorthand field props and its `SelectItem` children. Pass a function child to compose the full interior instead, using the new `SelectValue` component; it receives the Select state so the interior can react to `isOpen` and friends.

Public primitives: `Label`/`LabelContext`, `Group`/`GroupContext`/`FieldSize`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, `ControlButton`/`ControlButtonContext`, `FieldError`/`FieldErrorContext`. Field is an internal shell that merges RAC contexts to inject chrome. `Select` uses `InGroupContext` to share a box with `Input`.
