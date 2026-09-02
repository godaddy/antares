---
'@godaddy/antares': minor
---

feat: make field components composition-only

`TextField`, `NumberField`, `Select`, `DatePicker`, `DateRangePicker`, `CheckboxGroup`, and `RadioGroup` no longer take shorthand configuration props (`label`, `description`, `errorMessage`, `placeholder`, `leadingText`, `trailingText`, `multiline`, `hideStepper`, `orientation`'s auto layout). `children` is now the field's whole interior — composed from `Label`, `Group`, `Input`/`TextArea`, `Button`, `Text slot="description"`, and `FieldError` (plus `SelectValue`, `Popover`/`Content`/`ListBox`/`SelectItem` for `Select`, and `Popover`/`Content`/`Calendar`/`RangeCalendar`/`DatePickerValue`/`DateRangePickerValue` for the date pickers). Pass a function to read field state (`isOpen`, …) while composing.

`RadioGroup`'s `orientation` still forwards to React Aria for keyboard-navigation direction and ARIA — match your composed layout's `direction` to it yourself. `CheckboxGroup` has no `orientation`; compose your own layout direction.

Leading/trailing adornments (fixed text or an icon beside an input) are composed inside `Group`, positioned by source order — there is no `leadingText`/`trailingText` prop or dedicated adornment component. An interactive affix uses `Button variant="control"`.

`RangeField`, `ProgressBar`, and `CircularProgress` are unchanged: they keep their shorthand props and do not take a composed interior.

Public components: `Label`/`LabelContext`, `Group`/`GroupContext`/`FieldSize`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, and `FieldError`/`FieldErrorContext`. `Button` adds `control` and `trigger` variants for field interiors. Field is an internal shell that merges RAC contexts to inject chrome.
