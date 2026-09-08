---
'@godaddy/antares': minor
---

feat: field interiors are written, not inferred

`TextField`, `NumberField`, `Select`, `DatePicker`, `DateRangePicker`, `CheckboxGroup`, and `RadioGroup` no longer take shorthand configuration props (`label`, `description`, `errorMessage`, `leadingText`, `trailingText`, `multiline`, `hideStepper`). `children` is now the field's interior - composed from `Label`, `Group`, `Input`/`TextArea`, `Button`, `Text slot="description"`, and `FieldError` (plus `SelectValue`/`SelectOptions`/`SelectItem` for `Select`, and `DatePickerCalendar`/`DateRangePickerCalendar`/`DatePickerValue`/`DateRangePickerValue` for the date pickers). Pass a function to read field state (`isOpen`, …) while composing.

**The rule is the same for every field: you write the parts, and a part left empty fills its own content in from the field.** Nothing is inserted, moved, or dropped on your behalf - no field inspects what you wrote. An empty `Button slot="trigger"` renders the value (plus a chevron for `Select`, a calendar icon for the pickers); an empty `Button slot="decrement"` / `slot="increment"` renders its stepper icon; a bare `Group` inside `CheckboxGroup` / `RadioGroup` takes its axis and gap from `orientation`. Each of those also inherits `variant`, `size`, and the disabled state from the field, and your own props win over all of it. One control is a direct field child and takes the box chrome; several controls go in a `Group`, which takes the chrome instead.

- **BREAKING (`NumberField`):** the stepper `Group` is no longer added for you. Compose `Group` + `Button slot="decrement"` + `Input` + `Button slot="increment"`, or a bare `Input` for a plain numeric input.
- **BREAKING (`Select`):** compose a `Button slot="trigger"` and `SelectOptions` (new, public) around the `SelectItem`s; loose items are no longer collected into a popover for you. `SelectOptions` is the list in the popover: it takes `ListBox` props - including `items` with a render function, so dynamic collections work - plus `popoverProps` for the overlay layer. A single trigger no longer needs a `Group` wrapper.
- **BREAKING (`DatePicker` / `DateRangePicker`):** compose a `Button slot="trigger"` and `DatePickerCalendar` / `DateRangePickerCalendar` (new, public). `DatePickerControl` and `DateRangePickerControl` are removed, and their `formatOptions` / `placeholder` are now props on the picker roots (`DatePickerValue` / `DateRangePickerValue` keep both for a trigger you write). Each calendar region takes `Calendar` / `RangeCalendar` props plus `popoverProps`, and the overlay is positioned against the trigger rather than a `Group`.
- **BREAKING (`CheckboxGroup` / `RadioGroup`):** write the `Group` that holds the items. A bare `<Group>` inherits the presentational role, axis, and gap from `orientation`; pass your own `direction`/`gap` to lay them out differently.

Write `Popover`, `Content`, and `ListBox` / `Calendar` yourself to replace an overlay region entirely, as each component's "Composed" example shows. `DatePickerRenderProps` / `DateRangePickerRenderProps` are gone too - a render function's argument is inferred, and the other composed fields never exported one. `CheckboxIndicator` stays public for `Checkbox`, `Menu`, and other selection UIs.

`NumberField` no longer forwards a `ref` to its input, matching every other field root. Put the `ref` on the `Input` you compose (`<NumberField><Input ref={inputRef} /></NumberField>`), which also works when you replace the stepper `Group`.

A bare `Input`, `TextArea`, or `Button slot="trigger"` (no `Group`) picks up field box chrome directly from CSS - no wrapper element is added, so it renders as a single DOM node.

`CheckboxGroup` and `RadioGroup` take `orientation` to lay out item controls vertically or horizontally; the `Group` you write around the items picks it up. `RadioGroup` also forwards `orientation` to React Aria for keyboard navigation and ARIA.

`Group` is now layout-agnostic: boxed field chrome (`TextField`, `NumberField`, `Select`, date pickers) comes from the field root via `GroupContext`, not from hardcoded `Group` defaults. Disabled and invalid chrome is styled from the field root's own `data-disabled`/`data-invalid`, rather than requiring callers to pass those states to `Group`. `FieldSize` is no longer exported from the package root or `@godaddy/antares/Field` (use the `size` prop on boxed field roots).

Leading/trailing adornments (fixed text or an icon beside an input) are composed inside `Group`, positioned by source order - there is no `leadingText`/`trailingText` prop or dedicated adornment component. An interactive affix uses `Button slot="control"`.

`RangeField`, `ProgressBar`, and `CircularProgress` are unchanged: they keep their shorthand props and do not take a composed interior.

Public components: `Label`/`LabelContext`, `Group`/`GroupContext`, `Input`/`InputContext`, `TextArea`/`TextAreaContext`, and `FieldError`/`FieldErrorContext`. `TextContext`, `HeadingContext`, and `ButtonContext` are also exported, each of them React Aria's own context. `ButtonContext` is where a parent publishes `variant` and `size` per button slot; `Button` adds `control` and `trigger` variants for field interiors. There is no shared field shell: each field root is a `Flex` column that publishes what its own parts need - the label and control classes, a stepper's icons, a trigger's value - so a root can be read on its own, and the shared field stylesheet is the only thing every field has in common.

`Label` no longer takes `as`: the element follows the field root, so React Aria renders a `span` for group fields such as `Select` and `RadioGroup` and a `label` elsewhere.

Field roots lay their interior out as a column with a `sm` gap, and accept `Flex` layout props to change that (`direction`, `wrap`, `justifyContent`, `alignItems`, `gap`, spacing, `alignSelf`, `flex`, `order`, grid placement). `as` is not accepted: the root element is the React Aria field.

`Heading` is no longer exported from `@godaddy/antares/Text`. Import it from `@godaddy/antares/Heading` or the package root. An omitted `level` now resolves to `3` (previously `2`).
