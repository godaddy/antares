---
'@godaddy/antares': minor
---

feat: make field components composition-only

`TextField`, `NumberField`, `Select`, `DatePicker`, `DateRangePicker`, `CheckboxGroup`, and `RadioGroup` no longer take shorthand configuration props (`label`, `description`, `errorMessage`, `leadingText`, `trailingText`, `multiline`, `hideStepper`). `placeholder` moved off the date picker roots onto `DatePickerControl` / `DateRangePickerControl`; `Select` still accepts `placeholder` on the root. `children` is now the field's interior — composed from `Label`, `Group`, `Input`/`TextArea`, `Button`, `Text slot="description"`, and `FieldError` (plus `SelectValue`, `Popover`/`Content`/`ListBox`/`SelectItem` for `Select`, and `Popover`/`Content`/`Calendar`/`RangeCalendar`/`DatePickerValue`/`DateRangePickerValue` for the date pickers). Pass a function to read field state (`isOpen`, …) while composing.

Each field fills in the interior slots you leave empty, so you only write the pieces you want to customize and they keep the order you wrote them in. `Select` and the date pickers add their trigger and popover, `Select` wraps loose `SelectItem`s in that popover, `CheckboxGroup` / `RadioGroup` wrap loose items in a `Group`, and `NumberField` adds a `Group` of stepper `Button`s around the `Input`. Writing any of those yourself replaces the corresponding preset — a `Group`, an `Input` / `TextArea`, or a `Button slot="trigger"` is the control; a `Popover` is the overlay — and nothing is ever moved or dropped.

Only presets that carry configuration are public: `DatePickerControl` / `DateRangePickerControl`, the trigger carrying `formatOptions` / `placeholder` (which moved off the picker root). The rest are not exported, since the field supplies them and a custom interior is composed from the lower-level pieces (as in each component's "Composed" example): `SelectControl`, `SelectOptions`, `DatePickerCalendar`, and `DateRangePickerCalendar`. `DatePickerRenderProps` / `DateRangePickerRenderProps` are gone too — a render function's argument is inferred, and the other composed fields never exported one. `CheckboxIndicator` stays public for `Checkbox`, `Menu`, and other selection UIs.

`NumberField` no longer forwards a `ref` to its input, matching every other field root. Put the `ref` on the `Input` you compose (`<NumberField><Input ref={inputRef} /></NumberField>`), which also works when you replace the stepper `Group`.

A bare `Input` / `TextArea` (no `Group`) picks up field box chrome directly from CSS — no wrapper element is added, so it now renders as a single DOM node.

`CheckboxGroup` and `RadioGroup` take `orientation` to lay out item controls vertically or horizontally. Checkboxes and radios go straight in the group and are wrapped in a `Group` for you, which carries the spacing and axis; wrap them yourself in a `Group` with your own `direction`/`gap` to lay them out differently. `RadioGroup` also forwards `orientation` to React Aria for keyboard navigation and ARIA.

`Group` is now layout-agnostic: boxed field chrome (`TextField`, `NumberField`, `Select`, date pickers) comes from the internal `Field` shell via `GroupContext`, not from hardcoded `Group` defaults. Disabled and invalid chrome is styled from the field root's own `data-disabled`/`data-invalid`, rather than requiring callers to pass those states to `Group`. `FieldSize` is no longer exported from the package root or `@godaddy/antares/Field` (use the `size` prop on boxed field roots).

Leading/trailing adornments (fixed text or an icon beside an input) are composed inside `Group`, positioned by source order - there is no `leadingText`/`trailingText` prop or dedicated adornment component. An interactive affix uses `Button slot="control"`.

`RangeField`, `ProgressBar`, and `CircularProgress` are unchanged: they keep their shorthand props and do not take a composed interior.

Public components: `Label`/`LabelContext`, `Group`/`GroupContext`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, and `FieldError`/`FieldErrorContext`. `TextContext`, `HeadingContext`, and `ButtonContext` are also exported, each of them React Aria's own context. `ButtonContext` is where a parent publishes `variant` and `size` per button slot; `Button` adds `control` and `trigger` variants for field interiors. Field is an internal shell that merges RAC contexts to inject chrome.

`Label` no longer takes `as`: the element follows the field root, so React Aria renders a `span` for group fields such as `Select` and `RadioGroup` and a `label` elsewhere.

Field roots no longer accept the layout props that would redefine their interior axis (`display`, `direction`, `wrap`, `justifyContent`, `alignContent`, `alignItems`, `justifyItems`). Placement props (`gap`, spacing, `alignSelf`, `flex`, `order`, grid placement) still work; wrap the field to lay out its interior differently.

`Heading` is no longer exported from `@godaddy/antares/Text`. Import it from `@godaddy/antares/Heading` or the package root. An omitted `level` now resolves to `3` (previously `2`).
