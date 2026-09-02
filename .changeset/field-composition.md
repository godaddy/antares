---
'@godaddy/antares': minor
---

feat: make field components composition-only

`TextField`, `NumberField`, `Select`, `DatePicker`, `DateRangePicker`, `CheckboxGroup`, and `RadioGroup` no longer take shorthand configuration props (`label`, `description`, `errorMessage`, `placeholder`, `leadingText`, `trailingText`, `multiline`, `hideStepper`, layout-driving `orientation`'s auto layout). `children` is now the field's whole interior — composed from `Label`, `Group`, `Input`/`TextArea`, `Button`, `Text slot="description"`, and `FieldError` (plus `SelectValue`, `Popover`/`Content`/`ListBox`/`SelectItem` for `Select`, and `Popover`/`Content`/`Calendar`/`RangeCalendar`/`DatePickerValue`/`DateRangePickerValue` for the date pickers). Pass a function to read field state (`isOpen`, …) while composing.

`Select` and the date pickers ship presets for the common layout instead of detecting it from `children`: `SelectControl` / `SelectOptions` for `Select`, and `DatePickerControl` / `DatePickerCalendar` (`DateRangePickerControl` / `DateRangePickerCalendar` for the range picker) for the date pickers. Each is just a component with its defaults pre-filled — compose the lower-level pieces directly (as in each component's "Composed" example) for a custom layout. `formatOptions` / `placeholder` moved from the picker root onto `DatePickerControl` / `DateRangePickerControl`, since those are what render the trigger label.

A bare `Input` / `TextArea` (no `Group`) picks up field box chrome directly from CSS — no wrapper element is added, so it now renders as a single DOM node.

`CheckboxGroup` and `RadioGroup` take `orientation` to lay out item controls vertically or horizontally. Wrap checkboxes or radios in `Group` — the field injects spacing and axis through `GroupContext`. `RadioGroup` also forwards `orientation` to React Aria for keyboard navigation and ARIA.

`Group` is now layout-agnostic: boxed field chrome (`TextField`, `NumberField`, `Select`, date pickers) and stack layouts (`CheckboxGroup`, `RadioGroup`) come from the internal `Field` shell via `GroupContext`, not from hardcoded `Group` defaults. `FieldSize` is no longer exported from `@godaddy/antares/structure`.

Leading/trailing adornments (fixed text or an icon beside an input) are composed inside `Group`, positioned by source order — there is no `leadingText`/`trailingText` prop or dedicated adornment component. An interactive affix uses `Button variant="control"`.

`RangeField`, `ProgressBar`, and `CircularProgress` are unchanged: they keep their shorthand props and do not take a composed interior.

Public components: `Label`/`LabelContext`, `Group`/`GroupContext`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, and `FieldError`/`FieldErrorContext`. `Button` adds `control` and `trigger` variants for field interiors. Field is an internal shell that merges RAC contexts to inject chrome.
