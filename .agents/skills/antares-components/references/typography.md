# Typography and size

## Size scopes

`SizeProvider` carries `sm`, `md`, or `lg` through React context. It renders no element, crosses portals,
and replaces an outer size rather than multiplying it. Only components that read the scope follow it;
plain HTML and layout props such as `gap="md"` keep their meaning.

- Read `useDeclaredSize(size)` from `#components/size-provider` to resolve an explicit size over the
  nearest scope. Leave the prop undefined when omitted; defaulting it to `md` would hide the scope.
- If the component uses shared scale values, add `sizeScaleClassName(resolvedSize)` to its own element
  with `composeClassName`. The class supplies `md` values outside a scope. Apply it on the component
  itself so it also works in a portal.
- If `size` should size the whole interior, wrap it in `<SizeProvider size={size}>`, as TextField and
  OverlayDialog do. Button instead picks its own size class and does not create a scope for children.
- Use the shared `--_size-*` values for adopted defaults. For example, TextField's default
  `gap="var(--_size-gap)"` maps to layout `xs`, `sm`, and `md` across the three scales. An explicit `gap`
  still wins. Do not redefine design tokens or compute pixel values in React.

## Text roles and slots

Use `Text` for body copy, `Detail` for captions and metadata, `Heading` for headings, and `Label` for
field labels. Each has its own six-tier ramp (`xs` through `2xl`); the same tier is not the same font
size across roles. Heading `level` controls semantics only. `emphasis` changes color only.

The shared helpers live in `#components/_internal/typography`:

- `useTypographyClassName(role, { size, emphasis })` gives a text element its role, scope, and explicit
  overrides. The roles are `text`, `detail`, `heading`, and `label`.
- `textTreatmentClassName('body' | 'detail' | 'inherit')` lets an owner choose a part's treatment.
  Use `inherit` when a component already sets its own type, such as Button or Chip, so a composed Text
  matches a bare label. A named part's treatment belongs to its owner, whether Text or Detail fills it.
- `textSlotSizeClassName(size)` sets an owner's preferred text tier while allowing the child's
  explicit `size` to win. It selects a tier on the part's role ramp, not a shared pixel size.

Publish these classes through the part's existing React Aria context. When RAC has already supplied
context, merge its props and classes so ids, heading levels, and field associations survive. See
TextFieldBody and OverlayRegions. When the component owns its slots, define them locally and include a
`DEFAULT_SLOT` entry for unslotted children, as TextLockup does:

```tsx
const tier = size ? textSlotSizeClassName(size) : styles.followSize;

const slots = {
  [DEFAULT_SLOT]: { className: tier },
  eyebrow: { className: cx(styles.part, textTreatmentClassName('detail'), tier) },
  body: { className: cx(styles.part, textTreatmentClassName('body'), tier) }
};
```

This is a TextContext slot map; HeadingContext has its own title slot. `slot={null}` opts out of the
parent's React Aria context, not the size scope.

## Overrides

- Text size resolves in this order: the child's explicit `size`, the owner's slot tier, the nearest
  `--antares-size` for an owner that reads it, then the role's scoped tier (`md` outside a scope).
- TextLockup's `size` sets text tiers through slot classes. It does not create a SizeProvider, so a
  nested Button keeps the surrounding control size. Without `size`, `followSize` reads
  `--antares-size` through container style queries, one per tier. The variable is unset by default, so
  the scope still applies unless an application sets it.
- An explicit text size applies only to that element. Do not make it cascade into nested text or tie
  it to heading level.

Use the existing SizeProvider examples and browser tests as references for nested scopes, portals,
Text/Detail slot equivalence, and child overrides. The full design is in
`docs/pdrs/antares/typography.md`.
