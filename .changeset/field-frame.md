---
'@godaddy/antares': minor
---

refactor(antares): public field primitives + FieldSelect, rebuild Select, align Radio/Checkbox

Splits the field box into composable, **public** primitives — `Field`, `FieldLabel`,
`FieldGroup`, `FieldDescription`, `FieldError`, `Input`, `TextArea`, `FieldButton` — and
rebuilds `TextField`, `NumberField`, and `Select` on top. The primitives are exported from
the package root and the `@godaddy/antares/Field` subpath so consumers can compose their own
fields.

Controls declare their position inside a `FieldGroup` with the typed `edge` prop
(`"start" | "middle" | "end"`, omit for a lone control that rounds both edges), which maps to
an internal `data-field-edge` marker styled by descendant CSS — no per-element RAC context
injection.

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
- `TextField` / `NumberField` / `Select`: `description` and `errorMessage` are `ReactNode`.
