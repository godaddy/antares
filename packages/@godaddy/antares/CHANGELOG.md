# @godaddy/antares

## 0.8.0

### Minor Changes

- feat(antares): add Avatar components, composed from a new slotted Image and Text
  feat(antares): add Pressable compositions for Avatar Button and Account Menu ([#283](https://github.com/godaddy/bento/pull/283) by @rmojica-godaddy)
- feat(antares): add accessible Chip, ChipGroup, and ChipList components with selection, removal, and composable icon and button presentation ([#328](https://github.com/godaddy/bento/pull/328) by @rmojica-godaddy)
- feat: bring Modal, Drawer, and Popover onto a composition model with shared structural regions

  - Add shared structural containers `Content`, `Header`, `Footer`, and `ButtonGroup` - generic,
    layout-only regions built on `Flex` that render correctly standalone and adopt a parent's
    styling via context (`useContextProps`).
  - Add `CloseButton` (a `Button` preset defaulting to `slot="close"`, an `x` icon, and
    `aria-label="Close"`) and `Heading` (a `Text`-family preset built on React Aria's `Heading`,
    so `slot="title"` labels a dialog via `aria-labelledby`).

  Every overlay renders the same three layers - an optional backdrop, a positioned panel, and the
  dialog holding the regions - but each one used to send props somewhere different. Now the rule is
  the same everywhere: **the dialog is the primary surface**, so `...rest`, `className`, `style`, and
  `ref` land there; layer-specific behavior stays flat; and the other layers are reached through
  `overlayProps` (backdrop) or `containerProps` (positioned panel), on the components that have them.
  Each bag omits whatever is already a flat prop, so nothing is settable in two places, and its
  `className`/`style` merge with the component's own rather than replacing them.

  - **BREAKING (`Modal`):** rebuilt as composition-first, modeled on React Aria / Spectrum's
    `Dialog`. The Modal owns only the overlay, container, dialog shell, and scroll layout (the
    `Content` region scrolls while `Header`/`Footer` stay pinned) and provides the container
    contexts; it no longer decides the interior structure. Compose the interior from `Header`,
    `Content`, `Footer`, `ButtonGroup`, `Heading slot="title"`, and `CloseButton`. Removed all
    config/structure props: `title`, `description`, `actions`, `media` (and `mediaVariant`/
    `mediaDirection`/`mediaPosition`), `centered`, `titleProps`, `descriptionProps`, `closeProps`,
    and `actionProps`. `isOpen`, `defaultOpen`, `onOpenChange`, `isKeyboardDismissDisabled`, and
    `shouldCloseOnInteractOutside` are now flat props, so a Modal can be controlled without a
    `ModalTrigger`. `overlayProps` and `containerProps` keep targeting the backdrop and the
    positioned container, but they no longer accept those open-state props, and `containerProps` no
    longer accepts `Flex` layout props.
  - **BREAKING (`Drawer`):** rebuilt as composition-first, like `Modal`. Compose the interior from
    `Header`, `Content`, `Footer`, `ButtonGroup`, `Heading slot="title"`, and `CloseButton`; a
    `Content` region scrolls while `Header`/`Footer` stay pinned. Removed `showCloseButton` and
    `closeLabel` (compose a `CloseButton` in a `Header`) and `contentProps` (the dialog is now the
    direct target of `className`/`style`/rest). `className` and `style` move from the backdrop to the
    dialog - reach the backdrop with the new `overlayProps`, or set `--drawer-overlay-bg` globally.
    `containerProps` still targets the sliding panel but no longer accepts `Flex` layout props.
  - **BREAKING (`Popover`):** rebuilt as composition-first. Removed `showCloseButton`, `header`, and
    `contentProps`. The panel is no longer padded, so wrap plain children in `<Content>`. `className`,
    `style`, and rest now land on the dialog rather than the positioned panel; reach the panel with
    the new `containerProps`, which is also where a custom background or width belongs (the arrow
    inherits the panel's background, and the panel owns the width clamp). Positioning and open-state
    props - `placement`, `offset`, `containerPadding`, `triggerRef`, and the rest - are now declared
    explicitly instead of inherited wholesale from RAC, and `Flex` layout props are no longer
    accepted. `containerPadding` is passed straight through to React Aria at its documented default
    of 12 (was 10). Added `role`, so a popover can be an `alertdialog`. Fixed the accessible name:
    the hard-coded `aria-label="Content"` is gone and ARIA labelling props now land on the element
    carrying `role="dialog"`, so a `Heading slot="title"` labels the popover as intended.
  - **`Tooltip`** is unchanged. It has no dialog and no backdrop, so its primary surface is the
    positioned panel and it takes neither bag.
  - **Fixed (`Drawer`):** removed a stale `z-index: 100` on the overlay so overlays stack by open
    order again. Its comment claimed to match `Modal`, which no longer sets one.
  - **Fixed (`Select`):** updated its internal `Popover` usage for the new composition-first shape -
    the dropdown listbox now composes a `Content` region instead of relying on the Popover's removed
    default padding, restoring the previous spacing and scrolling for long lists.
  - Every selector in the `modal`, `drawer`, `popover`, and `structure` stylesheets now computes to a
    specificity of 0-1-0, and the `antares-components` skill documents that convention, the
    composition model, and the prop-routing rule above for future components. ([#290](https://github.com/godaddy/bento/pull/290) by @egaitan-godaddy)

- feat: field interiors are written, not inferred

  `TextField`, `NumberField`, `Select`, `DatePicker`, `DateRangePicker`, `CheckboxGroup`, and `RadioGroup` no longer take shorthand configuration props (`label`, `description`, `errorMessage`, `leadingText`, `trailingText`, `multiline`, `hideStepper`). `children` is now the field's interior - composed from `Label`, `Group`, `Input`/`TextArea`, `Button`, `Text slot="description"`, and `FieldError` (plus `SelectValue`/`SelectOptions`/`SelectItem` for `Select`, and `DatePickerCalendar`/`DateRangePickerCalendar`/`DatePickerValue`/`DateRangePickerValue` for the date pickers). Pass a function to read field state (`isOpen`, …) while composing.

  **The rule is the same for every field: you write the parts, and a part left empty fills its own content in from the field.** Nothing is inserted, moved, or dropped on your behalf - no field inspects what you wrote. An empty `Button slot="trigger"` renders the value (plus a chevron for `Select`, a calendar icon for the pickers); an empty `Button slot="decrement"` / `slot="increment"` renders its stepper icon; a bare `Group` inside `CheckboxGroup` / `RadioGroup` takes its axis and gap from `orientation`. Each of those also inherits `variant`, `size`, and the disabled state from the field, and your own props win over all of it. A `Button` with no slot is one the field does not own, so it keeps the `Button` defaults instead. One control is a direct field child and takes the box chrome; several controls go in a `Group`, which takes the chrome instead.

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

  `Heading` is no longer exported from `@godaddy/antares/Text`. Import it from `@godaddy/antares/Heading` or the package root. An omitted `level` now resolves to `3` (previously `2`). ([#326](https://github.com/godaddy/bento/pull/326) by @egaitan-godaddy)

- feat: add accessible Tabs with Underline, Manila, and automatic overflow treatments ([#309](https://github.com/godaddy/bento/pull/309) by @rmojica-godaddy)
- feat: add TextLockup, a composed eyebrow / title / body type group in six sizes

  - Add `TextLockup`. Each part takes a slot (`slot="eyebrow"` on a `Text` or `Tag`,
    `<Heading slot="title">`, `<Text slot="body">`) rather than a config prop, so anything else can
    sit alongside them. Unslotted text is left alone, so a nested component's own text is never
    restyled. `size` sets the tier for all three parts at once; `align` and `legibleLines` round out
    the props. The title steps down one tier in narrow containers at `2xl` and `sm`.

  Supporting changes:

  - **`Heading` takes its weight from the heading ramp** instead of a relative `bolder`, so a themed
    `--font-heading-weight` reaches it.
  - **`Button`/`LinkButton` shadow `TextContext`**, so their label keeps its own type inside a
    container that styles text slots.
  - **`Tag` accepts a `TagContext`**, for parent-supplied per-slot defaults. ([#325](https://github.com/godaddy/bento/pull/325) by @egaitan-godaddy)

### Patch Changes

- fix: make component motion more consistent and accessible

  Improve feedback and spatial continuity across interactive controls and overlays with concise, reversible transitions. Reduced-motion preferences remove spatial movement while preserving clear state changes and interaction behavior. ([#333](https://github.com/godaddy/bento/pull/333) by @rmojica-godaddy)

## 0.7.0

### Minor Changes

- For LineChart component, adds 1. ability to assign colorPalette color and dashed or dotted styles to series manually, and 2. Custom tooltip render override function ([#286](https://github.com/godaddy/bento/pull/286) by @amcmillen-godaddy)
- Menu component revamped to comply with design specs and css design tokens ([#278](https://github.com/godaddy/bento/pull/278) by @egaitan-godaddy)

## 0.6.0

### Minor Changes

- feat(antares): add RangeField component ([#276](https://github.com/godaddy/bento/pull/276) by @rmojica-godaddy)
- feat(antares): add Calendar, RangeCalendar, DatePicker, DateRangePicker and FieldTrigger

  Adds date components built on React Aria Components:

  - `Calendar` / `RangeCalendar` — accessible single-date and date-range calendars. The header
    pairs a month `Select` with a typeable year `NumberField`, flanked by prev/next navigation.
  - `DatePicker` / `DateRangePicker` — date-only (`CalendarDate`) fields that render the selected
    value as a read-only formatted label and open a calendar in a popover (no editable segmented
    input). Built on the field primitives, with `size`, `formatOptions`, and `placeholder` props.
  - `FieldTrigger` — Used in DatePicker and Select as the component sharing their styles.
  - `@godaddy/antares/date` — subpath that re-exports `@internationalized/date` (`CalendarDate`,
    `parseDate`, `today`, …) so consumers construct date values without installing it directly. ([#243](https://github.com/godaddy/bento/pull/243) by @egaitan-godaddy)

- Add React Aria render-prop support for component `className` and `style` props.

  `Checkbox`, `Radio`, and `Switch` now apply these props to their field container rather than the interactive control. Update selectors that target interaction state to use the interactive descendant's data attributes. ([#291](https://github.com/godaddy/bento/pull/291) by @rmojica-godaddy)

- feat: add switch component ([#268](https://github.com/godaddy/bento/pull/268) by @rmojica-godaddy)

### Patch Changes

- fix: remove background from inline Button variant on default/hover states ([#263](https://github.com/godaddy/bento/pull/263) by @rmojica-godaddy)

## 0.5.0

### Minor Changes

- feat: add drop-zone and file-trigger components ([#216](https://github.com/godaddy/bento/pull/216) by @rmojica-godaddy)
- refactor: revamp Drawer + InlineDrawer (RAC state + CSS transitions); remove Drawer snap-points/handle APIs and InlineDrawerTrigger export ([#254](https://github.com/godaddy/bento/pull/254) by @egaitan-godaddy)
- feat: progress-steps component ([#240](https://github.com/godaddy/bento/pull/240) by @egaitan-godaddy)

## 0.4.0

### Minor Changes

- feat: add CircularProgress component ([#230](https://github.com/godaddy/bento/pull/230) by @rmojica-godaddy)

### Patch Changes

- fix(antares): Adds isolation to segmented-controller ([#245](https://github.com/godaddy/bento/pull/245) by @egaitan-godaddy)
- fix(gauge-chart): align sublabel and range label typography to design spec

  - Switch sublabel and range label font-size from fixed token to CQI units so they scale proportionally with the container
  - Isolate range label typography tokens (font-weight, line-height) from sublabel tokens
  - Add overflow: hidden to range labels to clip long values at 4ch
  - Fix explicit grid placement for min/max range labels to avoid auto-placement fragility
  - Add CSS variable fallback values for all --ux-{hash} tokens ([#219](https://github.com/godaddy/bento/pull/219) by @rmojica-godaddy)

- fix(chart): align legend and tooltip spacings with Figma spec ([#238](https://github.com/godaddy/bento/pull/238) by @rmojica-godaddy)

## 0.3.0

### Minor Changes

- refactor(antares): public field primitives + FieldSelect, rebuild Select, align Radio/Checkbox

  Splits the field box into composable, **public** primitives — `Field`, `FieldLabel`,
  `FieldGroup`, `FieldDescription`, `FieldError`, `FieldInput`, `FieldTextArea`, and
  `FieldButton` — and rebuilds `TextField`, `NumberField`, and `Select` on top. The primitives
  are exported from the package root and the `@godaddy/antares/Field` subpath so consumers can
  compose their own fields.

  A `FieldGroup` rounds its outer corners by DOM order — its first and last children round the
  leading and trailing edges respectively (a lone control rounds both) — so controls need no
  per-element edge prop or RAC context injection to sit correctly in a shared box.

  Adds `FieldSelect`, a box-less select that composes inside a shared `FieldGroup` so consumers
  can build composite fields — an input and a select sharing one bordered box (e.g. amount +
  currency, phone + country code, time + AM/PM). It self-provides its own React Aria Select; the
  standalone `Select` shares the same trigger.

  `TextField`'s `leadingText` / `trailingText` now accept `ReactNode` (an icon, not just text).

  Adds an optional `size?: 'sm' | 'md'` prop on `TextField`, `NumberField`, and `Select`. In
  `sm`, the input/textarea/select font-size shrinks to `calc(1em / 1.125)`, the input/textarea
  block-padding switches to `sm` (inline-padding stays at `md` so the gutter against the border
  is unchanged), and `FieldButton` shrinks both axes — keeping NumberField steppers naturally
  square.

  Adds a standalone `ListBox` / `ListBoxItem` primitive. Migrates `Radio` and `Checkbox` off the
  deprecated RAC `Radio` / `Checkbox` to `RadioField` + `RadioButton` / `CheckboxField` +
  `CheckboxButton`. `RadioGroup` and `CheckboxGroup` now share the field primitives for
  consistent label/description/error rendering.

  Drops `Button`'s base `:not(.inline)` selector specificity by wrapping it in `:where()` to
  align with the rest of the selectors.

  Breaking:

  - `Select`: drops `labelStyle`, `SelectSection`, and `SelectHeader`; controlled API is
    `value` / `onChange`. (`size` is reintroduced under the new field-primitives cascade.)
  - `CheckboxGroup`: `direction` → `orientation: 'horizontal' | 'vertical'`.
  - `TextField` / `NumberField` / `Select`: `description` and `errorMessage` are `ReactNode`. ([#234](https://github.com/godaddy/bento/pull/234) by @egaitan-godaddy)

- feat(antares): expose Tag via subpath export (`@godaddy/antares/Tag`) ([#237](https://github.com/godaddy/bento/pull/237) by @egaitan-godaddy)
- feat: add tag component ([#208](https://github.com/godaddy/bento/pull/208) by @rmojica-godaddy)

### Patch Changes

- fix: defaulting icon sizes to 1lh ([#229](https://github.com/godaddy/bento/pull/229) by @egaitan-godaddy)
- fix: align Box/Flex/Grid spacing scale with Figma design system

  The `--sp-*` CSS variables on the `.box` class used an exponential `pow()` formula (`density × 2^n`) that produced values mismatched with the Figma `Computed/Space/Box` variables and legacy `@ux/space` behavior. Replaced with a linear `density × factor` scale: `xs`=×0.5 (2px), `sm`=×1 (4px), `md`=×2 (8px), `lg`=×3 (12px), `xl`=×5 (20px), `2xl`=×8 (32px). `Flex` and `Grid` are fixed automatically. ([#231](https://github.com/godaddy/bento/pull/231) by @rmojica-godaddy)

- fix(antares): antares icon now removes hardcoded fill values from CDN svgs ([#228](https://github.com/godaddy/bento/pull/228) by @egaitan-godaddy)

## 0.2.0

### Minor Changes

- feat: Add ToggleButton component ([#182](https://github.com/godaddy/bento/pull/182) by @rmojica-godaddy)
- feat: add alert component ([#196](https://github.com/godaddy/bento/pull/196) by @rmojica-godaddy)
- feat(antares): add drawer, inline-drawer, also dep fixes for react-aria and react-aria-compoennts ([#186](https://github.com/godaddy/bento/pull/186) by @rmarkins-godaddy)
- feat: modal component ([#145](https://github.com/godaddy/bento/pull/145) by @egaitan-godaddy)

### Patch Changes

- chore: using design tokens in radio, checkbox, text-field and number-field components ([#178](https://github.com/godaddy/bento/pull/178) by @egaitan-godaddy)
- Add ProgressBar component with label, helper text, three sizes (xs, sm, md), and four status intents (default, success, warning, critical) ([#191](https://github.com/godaddy/bento/pull/191) by @rmojica-godaddy)
- fix: correct tsdown migration issues and indeterminate checkbox group behavior

  - `@bento/checkbox`: rewrite indeterminate-group example to drive selection through the group's `value`/`onChange` exclusively, eliminating the mixed-control pattern that prevented `data-value` from settling. Update browser test to click the underlying `input` element so react-aria's press handler fires correctly.
  - `@bento/types`: point the `types` export entry to `dist/index.d.mts` to match the actual file emitted by tsdown for ESM-only packages.
  - `@godaddy/antares`: add explicit `include` to `tsconfig.json` so tsgo does not walk `tsdown.config.ts` and emit stray declaration files into sibling package source directories. ([#205](https://github.com/godaddy/bento/pull/205) by @rmarkins-godaddy)

- using react-aria-components 1.18.0 with new features for calendar and date picker components ([#199](https://github.com/godaddy/bento/pull/199) by @egaitan-godaddy)

## 0.1.1

### Patch Changes

- feat(LineChart): RTL support

  `LineChart` now follows the current **layout direction** (LTR or RTL). By default the direction is detected automatically from the browser or system settings, and it can also be controlled by wrapping the chart in an ancestor `I18nProvider`. When the direction is RTL, the X-axis reverses, the Y-axis renders on the inline-end edge, and tick labels and the tooltip dismiss strip mirror to match the writing direction. See the new "Right-to-Left" example in the LineChart README. ([#169](https://github.com/godaddy/bento/pull/169) by @rmojica-godaddy)

- fix(BarChart, LineChart): axis margins now follow the labels that actually render

  - Axis margins are measured from the rendered tick labels, so long labels, custom `tickFormat` output, and large `numTicks` values no longer overflow the plot area or get clipped by the container.
  - When labels need more room than the container provides, the chart grows past the viewport and the parent scrolls instead of squeezing or cropping.
  - `xLabelsOrientation="auto"` (the default) is driven by the same measurements: X-axis labels flip vertical as soon as the horizontal layout would collide with the Y-axis, and rotate clockwise under `rtl` so they mirror the writing direction.
  - `BarChart` in RTL: plot area, axis backdrops, and tooltip placement now agree — fixes a horizontal offset where the right-side Y-axis backdrop and tooltip arrow pointed at the wrong column.
  - Raised `BarChart`'s minimum height so bottom-axis tick marks render fully on short containers. ([#161](https://github.com/godaddy/bento/pull/161) by @rmojica-godaddy)

## 0.1.0

### Minor Changes

- feat: remove styles from @bento/icon and fix build issues in antares ([#162](https://github.com/godaddy/bento/pull/162) by @rmarkins-godaddy)

### Patch Changes

<details>
<summary>Updated dependencies</summary>

- @bento/icon@0.2.0
</details>
