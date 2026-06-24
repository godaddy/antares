# @godaddy/antares

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
