# Date Components PDR

Design review for the date-input component family in Antares: `DateField`, `DatePicker`, `DateRangePicker`, `Calendar`, and `RangeCalendar`.

**Ticket:** [UXP-11890 — Antares Component: Date Field](https://godaddy-corp.atlassian.net/browse/UXP-11890)
**Figma:** [Date Input Specs](https://www.figma.com/design/RYm4VR8yECQH5X2RDL8rhp/branch/RBG1HnhLkuosywFb73CTzG/%F0%9F%93%90-Date-Input-Specs?node-id=0-1)

## Table of Contents

- [Context](#context)
- [Public API](#public-api)
- [Folder Structure](#folder-structure)
- [Value Types & Dependencies](#value-types--dependencies)
- [Validation Surface](#validation-surface)
- [`getDayIndicators` API](#getdayindicators-api)
- [Calendar Internals](#calendar-internals)
- [Granularity, Locale, and i18n](#granularity-locale-and-i18n)
- [Documentation Strategy](#documentation-strategy)
- [Storybook Scope](#storybook-scope)
- [Test Scope](#test-scope)
- [Implementation Sequencing](#implementation-sequencing)
- [Out of Scope / Non-Goals](#out-of-scope--non-goals)
- [Open Questions](#open-questions)
- [References](#references)

---

## Context

The ticket title says "Date Field" but the description matches what React Aria calls a `DatePicker` — a text input trigger plus a popover calendar flyout. Acceptance criteria require both Single and Double / Range variants, an exported `<Calendar>` sub-primitive, typed segment entry via React Aria, min/max bounds, min/max duration constraints (range only), per-day indicator dots, and full keyboard / screen-reader support.

This PDR locks the public API and implementation conventions before code lands, so reviewers and design have one canonical reference.

## Public API

Five exports across three folders:

| Export | Purpose |
| --- | --- |
| `DateField` | Segmented date input, no popover. Peer to `TextField` / `NumberField`. |
| `DatePicker` | `DateField` + button + `Calendar` in a popover. Single date selection. |
| `DateRangePicker` | Two `DateField`s + `RangeCalendar` in a popover. Range selection. |
| `Calendar` | Standalone calendar grid for single-date selection. |
| `RangeCalendar` | Standalone calendar grid for range selection. |

Naming follows React Aria 1:1 to keep RAC docs reusable as a reference for our consumers.

## Folder Structure

Three folders under `packages/@godaddy/antares/components/`, each grouping a concept:

```
components/
  date-field/        → exports DateField
  date-picker/       → exports DatePicker, DateRangePicker
  calendar/          → exports Calendar, RangeCalendar
```

Three corresponding files under `exports/`:

```
exports/
  DateField.ts
  DatePicker.ts      → DatePicker + DateRangePicker
  Calendar.ts        → Calendar + RangeCalendar
```

This mirrors the `select/` pattern (multi-export folder for compound peers) for the picker and calendar pairs, and the `text-field/` pattern (single-export folder) for `DateField` as a sibling field input.

## Value Types & Dependencies

All five components are typed as `<CalendarDate>` (date-only — no time, no timezone). The value/onChange types come straight from React Aria Components:

```ts
// DateField, DatePicker, Calendar
value?: CalendarDate | null;
onChange?: (value: CalendarDate | null) => void;

// DateRangePicker, RangeCalendar
value?: { start: CalendarDate; end: CalendarDate } | null;
onChange?: (value: { start: CalendarDate; end: CalendarDate } | null) => void;
```

### Dependency classification

`@internationalized/date` is a **direct dependency** of `@godaddy/antares` — matching `react-aria-components`. It is **not** a peer dep.

Consumers do NOT add `@internationalized/date` to their `package.json`. They import from it directly:

```ts
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { DatePicker } from '@godaddy/antares';

<DatePicker label="Start" defaultValue={parseDate('2024-03-15')} />
<DatePicker label="Today" defaultValue={today(getLocalTimeZone())} />
```

This works through npm/yarn hoisting. **Caveat for strict pnpm users:** if `node-linker=hoisted` is disabled, the consumer must add `@internationalized/date` to their own `package.json` explicitly. This is documented in the "Working with dates" README section.

### Re-exports

We do **not** re-export anything from `@internationalized/date` — neither values nor types. Adobe React Aria does not re-export it either. Re-exporting some helpers but not others creates an asymmetric surface that breaks down the moment a consumer needs a function we didn't pick.

## Validation Surface

| Prop | Source | Notes |
| --- | --- | --- |
| `minValue?: CalendarDate` | RAC passthrough | Absolute lower bound. Disables out-of-range days, rejects out-of-range typed entry. |
| `maxValue?: CalendarDate` | RAC passthrough | Absolute upper bound. |
| `minDuration?: DateDuration` | **New (ours)** | Range only. Duration constraint on the selection itself. Disables end-date candidates that violate during in-progress pick. |
| `maxDuration?: DateDuration` | **New (ours)** | Range only. |
| `isDateUnavailable?: (date: CalendarDate) => boolean` | RAC passthrough | Standard escape hatch (disable weekends, holidays, etc.). Available on all four grid-bearing components. |
| `validate?: (value) => string \| true \| null \| undefined` | RAC passthrough | Cross-field validation. |
| `isInvalid?: boolean` | RAC passthrough | Drives `FieldFrame` error styling. |
| `errorMessage?: string` | Narrowed from RAC | RAC supports `string \| (ValidationResult) => ReactNode`; we restrict to `string` to match `TextField` / `NumberField` and prevent UX drift. |
| `validationBehavior` | Not exposed | Use RAC default (`'native'`). |
| `name?: string` | RAC passthrough | Native form integration. |
| `placeholderValue?: CalendarDate` | RAC passthrough | Drives which month opens when the picker has no value. |
| `autoFocus`, `isDisabled`, `isReadOnly`, `isRequired`, `aria-*` | RAC passthrough | Same as `TextField` / `NumberField`. |

### Implementation notes

- `minDuration` / `maxDuration` are not in RAC. Implementation: compute a dynamic `isDateUnavailable` that wraps any consumer-supplied `isDateUnavailable` (logically OR them) based on the in-progress range start.
- `validationBehavior` stays at RAC's default to match `TextField` / `NumberField`, which also do not expose it.
- Cross-field "end after start" enforcement in `DateRangePicker` is handled internally by RAC; no extra prop.

## `getDayIndicators` API

Only first-class custom prop in this family. Renders up to **3 indicator dots** per day cell.

```ts
type DayIndicator = {
  /** Maps to the design-token color-feedback-<color>-strong palette. */
  color: 'critical' | 'highlight' | 'info' | 'passive' | 'success' | 'warning';
  /** Optional accessible label combined with the day's date label for screen readers. */
  label?: string;
};

type GetDayIndicators = (date: CalendarDate) => DayIndicator[];

// Available on: Calendar, RangeCalendar, DatePicker, DateRangePicker
getDayIndicators?: GetDayIndicators;
```

### Behavior rules

- Function is called per visible day. Same calling convention as RAC's `isDateUnavailable` — same memoization story.
- Color is constrained to the design-system feedback palette. Raw color strings are rejected at the type level.
- `label` is optional; when present it becomes part of the day cell's accessible name (announced by screen readers).
- If a consumer returns more than 3 indicators, the array is sliced to the first 3 and a `console.warn` fires in development. AC is firm at 3.
- The prop is threaded through to the same Calendar grid used inside DatePicker / DateRangePicker. Same name, same shape, same semantics across all four grid-bearing components.

## Calendar Internals

Implementation rules locked here so the visual contract doesn't drift:

| Concern | Rule |
| --- | --- |
| Header | Month and Year are both `Select` dropdowns. No free-text year entry. Header is **not customizable**; consumers who need a custom header should compose RAC directly. |
| Year range | Derived from `minValue` / `maxValue` if either is set. Otherwise defaults to current year ± 100. |
| Range mode visible duration | `visibleDuration={{ months: 2 }}` hardcoded — two side-by-side months. Right month always trails the left by exactly one. Navigating either side keeps them adjacent. |
| Single mode visible duration | `visibleDuration={{ months: 1 }}` hardcoded. |
| `pageBehavior` | Hardcoded to RAC default `'visible'`. Not exposed. |
| Out-of-month days (single) | Rendered at 40% opacity, not focusable, not selectable. |
| Out-of-month days (range / multi-month) | **Not rendered at all** (AC explicit). |
| "Today" visual state | Distinguished from selected; coexists correctly with selected and in-range states. |
| Range click-earlier behavior | RAC default: clicking a date earlier than the current start resets start to that date. (Design confirmation outstanding — see Open Questions.) |

## Granularity, Locale, and i18n

- **Date-only.** All five components are typed `<CalendarDate>`. No time, no timezone. The `granularity` prop is never surfaced.
- **Locale comes from `<I18nProvider>`** (the host app provides this). No per-component `locale` prop. No `firstDayOfWeek` or `weekdayStyle` props.
- The README "Working with dates" section notes the `<I18nProvider>` requirement. Platform team should confirm this provider is wrapped at the host-app level.

## Documentation Strategy

Three layers, in order of impact for consumers:

### 1. JSDoc on every date-typed prop

`value`, `defaultValue`, `minValue`, `maxValue`, `placeholderValue`, `isDateUnavailable`, etc. Each gets:

```ts
/**
 * Selected date value (controlled). Pass a `CalendarDate` from `@internationalized/date`.
 *
 * @example
 *   import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
 *   <DatePicker value={parseDate('2024-03-15')} />
 *   <DatePicker value={today(getLocalTimeZone())} />
 *
 * @see https://react-spectrum.adobe.com/react-aria/DatePicker.html#value
 */
value?: CalendarDate | null;
```

This is the highest-leverage layer — most engineers never read READMEs but always hover types.

### 2. README per folder

One README each for `date-field`, `date-picker`, `calendar`. Standard sections matching existing components (Features, Installation, Props, Examples).

The `date-picker` README adds a **"Working with dates"** section covering:
- Why `@internationalized/date` (not `Date`)
- How to import (`@internationalized/date` ships transitively — no install required, with a strict-pnpm caveat)
- Three patterns: today, fixed date, controlled state
- Link to RAC docs and `@internationalized/date` docs
- Note on host-app `<I18nProvider>` requirement

The other two READMEs link out to this section rather than duplicating.

### 3. Storybook stories with literal source

Stories use `parseDate('...')` literally so the source is copy-pasteable. No helper functions hide the conversion.

## Storybook Scope

24 stories total, each mapping to an AC line.

### `date-field.stories.tsx` (7 stories)

1. `Default` — empty, with label
2. `WithDefaultValue` — uses `parseDate('2024-03-15')`
3. `Controlled` — useState pattern
4. `WithDescription` and `WithError`
5. `MinMax` — demonstrates rejection of out-of-range typed entry
6. `Disabled / Required / ReadOnly`
7. `Form` — wrapped in `<form>`, native validation

### `date-picker.stories.tsx` (10 stories — covers DatePicker + DateRangePicker)

1. `Default` (single)
2. `DefaultRange`
3. `WithMinMax` (single + range)
4. `WithMinMaxDuration` (range only)
5. `WithUnavailableDates`
6. `WithIndicators` — 1, 2, and 3 dots; demonstrates truncation
7. `WithError`
8. `Controlled`
9. `PlaceholderValue`
10. `Form`

### `calendar.stories.tsx` (7 stories — covers Calendar + RangeCalendar)

1. `Default`
2. `DefaultRange`
3. `WithMinMax` and `WithUnavailableDates`
4. `WithIndicators`
5. `TodayDistinct` — verifies today + selected + in-range coexist visually
6. `OutOfMonthDays` — single shows at 40% opacity, range hides them entirely
7. `WithDuration`

## Test Scope

Three layers. **Principle: don't re-test RAC.** RAC ships its own coverage for keyboard navigation, focus trap, popover dismissal, and segment editing. Our tests target our additions and integrations.

### `test:node` — light (~25 tests total)

- Each component renders without throwing
- Props pass through to RAC (`isDisabled`, `name`, `value`, etc.)
- Type-level: `DatePicker<CalendarDate>` accepts `parseDate('2024-03-15')`, rejects `new Date()`

### `test:browser` — interaction-heavy (~24 tests total)

1. `DateField` typed entry parses and updates value; invalid input flips `isInvalid`
2. `minValue` / `maxValue` rejects out-of-range typed entry; disables out-of-range days
3. `minDuration` / `maxDuration` disables end-date candidates that violate, during in-progress range pick
4. `isDateUnavailable` disables matching days; coexists with `minValue`/`maxValue` (logical AND)
5. `getDayIndicators`: 0, 1, 2, 3 dots render correctly; 4+ slices to 3 and dev `console.warn` fires
6. Indicator `label` appears in day cell's accessible name
7. Month / Year `Select` header — changing either updates visible calendar(s)
8. Year range derivation — with `minValue`/`maxValue` set, year `Select` only shows in-range years
9. Range adjacency — navigating left side keeps right side trailing by exactly one month; same in reverse; year-boundary edge cases
10. Out-of-month rendering — single = reduced opacity, range = not rendered
11. Today + selected + in-range coexistence
12. Form submission — `<form>` with named `DatePicker` submits ISO date string

The `minDuration`/`maxDuration` and adjacency tests are notably more involved than the rest (~3-4h each vs. ~15min). They are not optional — cutting them would make the component fragile in exactly the spots where bugs would be hardest to catch in review.

### `test:visual` — curated screenshot regression

Snapshots auto-generated from a curated subset of stories — primarily the visual-AC stories: `TodayDistinct`, `OutOfMonthDays`, `WithIndicators`, `DefaultRange`, `WithError`. ~10 visual snapshots.

If CI flake on `test:visual` becomes a cost center, drop visual coverage **only** for stories already covered by browser interaction tests. Keep visual tests for stories that are fundamentally visual.

## Implementation Sequencing

Three stacked PRs in dependency order. PRs 2 and 3 branch off the previous one.

### PR 1 — `feat/date-field`

Stand-alone usable on merge.

- `components/date-field/` (component + styles)
- `exports/DateField.ts`
- `date-field.stories.tsx` + 7 example files
- `date-field/test/` — node, browser, visual
- `date-field/README.mdx`

### PR 2 — `feat/calendar` (branched from PR 1)

Stand-alone usable on merge.

- `components/calendar/` — `Calendar` + `RangeCalendar`
- Month/Year `Select` header
- `getDayIndicators` rendering
- `minDuration` / `maxDuration` enforcement (RangeCalendar only)
- Today / in-range / out-of-month visual states
- `exports/Calendar.ts`
- `calendar.stories.tsx` + 7 example files
- `calendar/test/` — node, browser, visual
- `calendar/README.mdx`

### PR 3 — `feat/date-picker` (branched from PR 2)

Closes UXP-11890.

- `components/date-picker/` — `DatePicker` + `DateRangePicker`, composing `DateField` + `Calendar` / `RangeCalendar` in a popover
- Threading `getDayIndicators`, `minDuration`/`maxDuration`, validation through to inner components
- `exports/DatePicker.ts`
- `date-picker.stories.tsx` + 10 example files
- `date-picker/test/` — node, browser, visual
- `date-picker/README.mdx` (includes "Working with dates" canonical section)

## Out of Scope / Non-Goals

Explicitly **not** in v1, to deflect scope-creep during review:

- ❌ Time / date+time / timezone-aware values (`<DatePicker<DateValue>>`)
- ❌ `granularity` prop
- ❌ Per-component `locale` prop (use `<I18nProvider>`)
- ❌ Custom day rendering or day slot (only `getDayIndicators` for marker dots)
- ❌ Custom calendar header (Month + Year `Select`s are fixed)
- ❌ `firstDayOfWeek` prop (comes from locale)
- ❌ `weekdayStyle` prop (comes from locale)
- ❌ Re-exporting types or values from `@internationalized/date`
- ❌ Convenience props like `today` / `tomorrow` defaults (consumer uses `today(getLocalTimeZone())`)
- ❌ Range "swap-anchor" behavior (RAC default reset-start only; design confirms post-launch)
- ❌ Inline (always-open) calendar variant of `DatePicker` — consumer composes `DateField` + `Calendar` themselves
- ❌ Multiple-date selection (non-contiguous)
- ❌ Year-only or month-only pickers

## Open Questions

| # | Question | Default for v1 | Owner |
| --- | --- | --- | --- |
| 1 | Range click-earlier behavior — reset-start (RAC default) vs. swap-anchor? | Reset-start (RAC default) | Design (to confirm post-launch) |
| 2 | Is `<I18nProvider>` already wrapped at the host-app level? | Assume yes (RAC is already a peer dep) | Platform team |

Both are flagged in the corresponding PR description. Neither is a v1 blocker; default behaviors ship and either can change in a follow-up if needed.

## References

- **Ticket:** [UXP-11890](https://godaddy-corp.atlassian.net/browse/UXP-11890)
- **Figma:** [Date Input Specs](https://www.figma.com/design/RYm4VR8yECQH5X2RDL8rhp/branch/RBG1HnhLkuosywFb73CTzG/%F0%9F%93%90-Date-Input-Specs?node-id=0-1)
- **React Aria Components:**
  - [DatePicker](https://react-spectrum.adobe.com/react-aria/DatePicker.html)
  - [DateRangePicker](https://react-spectrum.adobe.com/react-aria/DateRangePicker.html)
  - [DateField](https://react-spectrum.adobe.com/react-aria/DateField.html)
  - [Calendar](https://react-spectrum.adobe.com/react-aria/Calendar.html)
  - [RangeCalendar](https://react-spectrum.adobe.com/react-aria/RangeCalendar.html)
- **`@internationalized/date`:**
  - [Overview](https://react-spectrum.adobe.com/internationalized/date/index.html)
  - [`CalendarDate`](https://react-spectrum.adobe.com/internationalized/date/CalendarDate.html)
