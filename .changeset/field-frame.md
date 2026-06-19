---
'@godaddy/antares': minor
---

refactor(antares): field primitives + ListBox, rebuild Select, align Radio/Checkbox

Splits the internal field box into composable primitives — `Field`, `FieldLabel`,
`FieldGroup`, `FieldDescription`, `FieldError`, `Input`, `TextArea`, `FieldButton` —
and rebuilds `TextField`, `NumberField`, and `Select` on top. `FieldGroup` styles its
children through `data-field-group-{start,middle,end}` markers in CSS instead of
per-element RAC context injection.

Adds an optional `size?: 'sm' | 'md'` prop on `TextField`, `NumberField`, and
`Select`. In `sm`, the input/textarea/select font-size shrinks to `calc(1em / 1.125)`,
the input/textarea block-padding switches to `sm` (inline-padding stays at `md` so
the gutter against the border is unchanged), and `FieldButton` shrinks both axes —
keeping NumberField steppers naturally square.

Adds a standalone `ListBox` / `ListBoxItem` primitive. Migrates `Radio` and `Checkbox`
off the deprecated RAC `Radio` / `Checkbox` to `RadioField` + `RadioButton` /
`CheckboxField` + `CheckboxButton`. `RadioGroup` and `CheckboxGroup` now share the
field primitives for consistent label/description/error rendering.

Drops `Button`'s base `:not(.inline)` selector specificity by wrapping it in `:where()` to align with the rest of selectors.

Breaking:

- `Select`: drops `labelStyle`, `SelectSection`, `SelectHeader`, `items`, and
  render-function children; controlled API is `value` / `onChange`. (`size` is
  reintroduced under the new field-primitives cascade)
- `CheckboxGroup`: `direction` → `orientation: 'horizontal' | 'vertical'`.
- `TextField` / `NumberField` / `Select`: `description` and `errorMessage` are
  `ReactNode`.
