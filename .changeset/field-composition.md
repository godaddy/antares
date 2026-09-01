---
'@godaddy/antares': minor
---

feat: compose field components instead of Field* wrappers

`TextField` keeps `label`, `description`, `errorMessage`, `placeholder`, `leadingText`, `trailingText`, `multiline`, and `size` for the common case. Pass `children` to compose `Label`, `Group`, `Input` or `TextArea`, and `FieldError` instead.

`Select` keeps its shorthand field props and its `SelectItem` children, including components that wrap `SelectItem`. Its `children` also accept a composed interior built from Antares components and the new `SelectValue`, or a function returning that interior when it needs Select state. Use `variant="control"` when Select shares another field's Group.

`DatePicker` and `DateRangePicker` keep their shorthand field props. Pass `children` to compose the interior, including `DatePickerValue` / `DateRangePickerValue`, or a function returning that interior when it needs picker state.

`CheckboxGroup` and `RadioGroup` keep `label` / `description` / `errorMessage` / `orientation`. Item children stay the default; a composed interior is detected from `Label`, `Text`, and `FieldError`. `Checkbox` and `Radio` keep children-as-label next to the indicator.

`ProgressBar` and `CircularProgress` keep their shorthand props and use Antares `Label`. They do not take a composed interior.

Public components: `Label`/`LabelContext`, `Group`/`GroupContext`/`FieldSize`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, and `FieldError`/`FieldErrorContext`. `Button` adds `control` and `trigger` variants for field interiors. Field is an internal shell that merges RAC contexts to inject chrome.
