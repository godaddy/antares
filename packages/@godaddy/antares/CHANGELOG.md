# @godaddy/antares

## 0.8.0

### Minor Changes

- feat(antares): add Avatar components, composed from a new slotted Image and Text
  feat(antares): add Pressable compositions for Avatar Button and Account Menu ([#283](https://github.com/godaddy/bento/pull/283) by @rmojica-godaddy)
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

- feat: add accessible Tabs with Underline, Manila, and automatic overflow treatments ([#309](https://github.com/godaddy/bento/pull/309) by @rmojica-godaddy)

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
