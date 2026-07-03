# DatePicker field-trigger sizing — design

**Date:** 2026-07-03
**Status:** Approved
**Scope:** `@godaddy/antares` — `field`, `date-picker` (Select/NumberField/TextField untouched)

## Problem

`DatePicker` and `DateRangePicker` must sit at the same height, padding, and font
as the other boxed fields (`TextField`, `NumberField`, `Select`) at both `md` and `sm`
sizes, and stay in sync with them over time.

Today they drift. Every boxed field wraps its controls in `FieldGroup`, whose size
rules (`[data-size='sm']` padding/font shrink) and corner-rounding target a fixed set of
classes:

```
.fieldInput, .fieldTextarea, .fieldButton, .fieldSelectFragment
```

The date-picker trigger is a bespoke `Flex as={RACButton}` carrying its own
`.trigger` class (with padding commented out). Because `.trigger` is not in that set, the
trigger participates in none of the FieldGroup sizing — no padding, no `sm` shrink, no
shared corners — so it drifts. `Select` avoids this exact problem by using
`FieldSelectFragment`, a member of the size set.

## Approach

Share the primitive rather than re-derive the size. Extract the transparent, input-like
"value + trailing icon" trigger into a reusable field part, `FieldTrigger`, that is a
first-class member of the FieldGroup size system. `FieldSelectFragment` becomes a thin
wrapper over it; `DatePicker`/`DateRangePicker` use it directly. Two components sharing
one primitive stay locked to the same size by construction.

## Design

### 1. New internal primitive: `FieldTrigger`

A transparent-capable, input-like button laid out as `[value area][trailing icon]`,
participating in the FieldGroup size + corner system. Content is arbitrary children.

```tsx
export interface FieldTriggerProps extends RACButtonProps, FlexOwnProps {
  /** `select` = transparent, input-like (standalone Select, DatePicker).
   *  `control` = filled, for a segment inside a shared group. @default 'control' */
  variant?: 'control' | 'select';
}

export const FieldTrigger = forwardRef<HTMLButtonElement, FieldTriggerProps>(
  function FieldTrigger({ className, variant = 'control', ...rest }, ref) {
    return (
      <Flex alignItems="center" justifyContent="space-between" gap="sm" flex={1}
        {...rest} as={RACButton} data-variant={variant} ref={ref}
        className={cx(styles.fieldTrigger, className)} />
    );
  }
);
```

**Naming.** `FieldButton` stays the generic *action* button (press → does a thing;
steppers; `alignItems: center` only). `FieldTrigger` is a *value-display trigger*
(shows the current value + affordance, opens a picker; `flex: 1`, `space-between`).
Distinct roles, both exist.

**Visibility.** Internal only — not added to `exports/Field.ts`, matching
`FieldSelectFragment`. Its only consumers are in-package (Select via the fragment,
DatePicker). Promote to public later only if an external need appears.

### 2. CSS: swap in `.fieldTrigger`, decouple the rotation

In `field/src/index.module.css`, replace `.fieldSelectFragment` with `.fieldTrigger`
across the three groups that make sizing work:

```css
/* base padding/font — the family all fill controls share */
.fieldInput, .fieldTextarea, .fieldButton, .fieldTrigger { padding: var(--sp-md); font-size: …; … }

/* button chrome (gray default, hover, pressed, focus, disabled, icon sizing) */
.fieldButton, .fieldTrigger { cursor: pointer; background: #f5f5f5; … }
.fieldTrigger[data-variant='select'] { background: transparent; }   /* input-like flavor */

/* sizing — sm shrink */
&:where([data-size='sm']) {
  & :where(.fieldInput, .fieldTextarea, .fieldButton, .fieldTrigger) { font-size: calc(1em / 1.125); }
  & :where(.fieldButton, .fieldTrigger) { padding: var(--sp-sm); }
}

/* corner rounding — first/last child (was .fieldSelectFragment) */
… :where(.fieldTrigger) { border-start-start-radius: …; }
```

The chevron rotation moves off the shared group (it was dead code on `.fieldButton`,
which never gets `aria-expanded`) onto a slim, Select-only class. `FieldSelectFragment`
keeps an extra `.fieldSelectFragment` class purely as the hook:

```css
/* chevron affordance — Select trigger ONLY; never inherited by .fieldTrigger */
.fieldSelectFragment > [data-icon] { transition: transform 0.15s ease; }
.fieldSelectFragment:where([aria-expanded='true']) > [data-icon] { transform: rotate(180deg); }
```

Generic icon sizing (`width/height: 1lh`) stays shared on `.fieldButton, .fieldTrigger`;
the flip is exclusive to the chevron. The date-picker calendar icon stays still when the
popover opens.

### 3. Consumers adopt it

**`FieldSelectFragment`** — thin wrapper; keeps its `variant` prop and
`FieldSelectFragmentProps` so `Select` and `FieldSelect` are untouched:

```tsx
export function FieldSelectFragment({ className, variant = 'control', ...rest }: FieldSelectFragmentProps) {
  return (
    <FieldTrigger variant={variant} {...rest} className={cx(styles.fieldSelectFragment, className)}>
      <Box as={RACSelectValue} className={styles.fieldSelectFragmentValue} flex={1} />
      <Icon icon="chevron-down" />
    </FieldTrigger>
  );
}
```

`Select` and `FieldSelect` source: **no change** — same call, identical behavior and
look. Both variants stay live (`Select` → `select`/transparent; `FieldSelect` →
`control`/filled), so the split must survive the extraction.

**`DatePicker` + `DateRangePicker`** — drop the bespoke trigger, use the primitive:

```tsx
<FieldGroup isDisabled={isDisabled} size={size} alignItems="center">
  <FieldTrigger variant="select">
    <DatePickerValue formatOptions={formatOptions} placeholder={placeholder} />
    <Icon icon="calendar" />
  </FieldTrigger>
</FieldGroup>
```

`flex`, `space-between`, `gap`, padding, font, corners, focus, and the `sm` shrink are
all inherited. Same edit for `DateRangePicker`.

**`date-picker/src/index.module.css`** shrinks to just the placeholder color; the entire
`.trigger` block (border, background, cursor, padding, focus, disabled) is deleted — each
of those now comes from `.fieldTrigger`:

```css
.placeholder { color: var(--ux-1m9ys0v, #767676); }
```

### Accepted consequence

Because the trigger now *is* the Select trigger, it picks up Select's interaction
feedback: a subtle gray hover and the standard `[data-focused]` outline (today it is
transparent with no hover and a `[data-focus-visible]` outline). Background stays
transparent and layout is unchanged. This is the intended cost of keeping the components
in sync, and was explicitly approved.

## Impact

- **Changed:** `field/src/index.tsx`, `field/src/index.module.css`,
  `date-picker/src/index.tsx`, `date-picker/src/index.module.css`.
- **Untouched:** `select/src`, `number-field/src`, `text-field/src`.

## Testing

- **Node snapshots** — change for `field`, `select`, `date-picker` (class/structure
  shift). Regenerate with `test:node:update`; eyeball the diffs to confirm only expected
  changes.
- **Browser tests** — behavior unchanged (same RAC wiring, same popover toggle); should
  pass. Run `select` + `date-picker` browser suites to confirm.
- **Visual tests** — `date-picker` baselines legitimately change (padding/hover/focus);
  `select` should be pixel-identical (verify no diff). darwin PNGs stay gitignored; Linux
  baselines regenerate via the `/update-screenshots` bot after the PR opens.
- **Coverage** — if a `FieldTrigger` branch (e.g. `control` variant) is not hit by an
  existing example, add/adjust an example rather than hand-asserting markup.

## Verification gates

`typecheck` + `lint` clean, targeted `test` green, then commit with `--no-verify`
(package workflow) once confirmed manually.
