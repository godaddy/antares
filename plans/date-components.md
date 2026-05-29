# Plan: Date Components

Execution plan for the date-input component family (DateField, DatePicker, DateRangePicker, Calendar, RangeCalendar).

**Decisions / rationale:** [`docs/pdrs/antares/date-components.md`](../docs/pdrs/antares/date-components.md)
**Ticket:** [UXP-11890](https://godaddy-corp.atlassian.net/browse/UXP-11890)

Three stacked PRs. PR 2 branches off PR 1, PR 3 branches off PR 2. Each PR is independently shippable.

## Table of Contents

- [PR 1 — `feat/date-field`](#pr-1--featdate-field)
- [PR 2 — `feat/calendar`](#pr-2--featcalendar)
- [PR 3 — `feat/date-picker`](#pr-3--featdate-picker)
- [Post-merge follow-ups](#post-merge-follow-ups)

---

## PR 1 — `feat/date-field`

**Branch:** `feat/date-field` from `main`
**Goal:** Stand-alone segmented date input. Closes the "DateField" portion of the AC.

### Files to create

```
packages/@godaddy/antares/
  components/date-field/
    src/
      index.tsx                              # DateField component
      index.module.css                       # styles
    examples/
      basic.tsx
      with-default-value.tsx
      controlled.tsx
      with-description.tsx
      with-error.tsx
      min-max.tsx
      disabled-required-readonly.tsx
      form.tsx
      date-field-playground.tsx              # matches text-field pattern
    test/
      date-field.node.test.tsx
      date-field.browser.test.tsx
      date-field.visual.test.tsx
    date-field.stories.tsx
    README.mdx
  exports/
    DateField.ts
```

### Files to modify

- `packages/@godaddy/antares/package.json` — add `"@internationalized/date": "^3.x.x"` to dependencies (match the version RAC ships)
- `packages/@godaddy/antares/index.ts` — re-export from `./exports/DateField`

### Implementation tasks

- [ ] `src/index.tsx`: wrap RAC `DateField<CalendarDate>` with `FieldFrame`; mirror `TextField` / `NumberField` props pattern (`Omit<RACDateFieldProps<CalendarDate>, 'children'>` + `Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'>`)
- [ ] JSDoc for every date-typed prop with `@example` (using `parseDate`) and `@see` link to RAC docs (PDR §Documentation Strategy)
- [ ] `errorMessage` typed as `string` only, NOT RAC's `string | (ValidationResult) => ReactNode`
- [ ] Styles: match Figma spec for segmented-input states (default, hover, focus, error, disabled, read-only)

### Storybook tasks

- [ ] 7 stories per PDR §Storybook Scope (Default, WithDefaultValue, Controlled, WithDescription/WithError, MinMax, Disabled/Required/ReadOnly, Form)
- [ ] Each story imports its source from `examples/*.tsx?raw` for `<Source>` blocks
- [ ] Story source uses literal `parseDate('...')` calls — no helper indirection

### Test tasks

`test:node` (~5 tests):
- [ ] Renders without throwing
- [ ] `value`, `defaultValue`, `name`, `isDisabled` pass through to RAC
- [ ] Type-level: `value={parseDate('2024-03-15')}` accepted; `value={new Date()}` rejected
- [ ] `errorMessage` type is `string`, not the RAC union

`test:browser` (~5 tests):
- [ ] Typing valid date updates value; typing invalid input flips `isInvalid` and surfaces `errorMessage`
- [ ] `minValue` / `maxValue` reject out-of-range typed entry
- [ ] `isReadOnly` blocks edits but allows focus
- [ ] Form submission sends ISO date string under the `name` prop
- [ ] Keyboard: arrow keys move between segments; up/down adjust the focused segment

`test:visual` (~3 snapshots):
- [ ] Default, WithError, Disabled

### Documentation tasks

- [ ] `README.mdx` matches existing pattern (Features, Installation, Props auto-generated, Examples)
- [ ] Brief "Working with dates" subsection linking to canonical version in `date-picker/README.mdx` (which lands in PR 3) — or, if PR 3 hasn't merged yet, inline the abbreviated version and replace with link in PR 3

### Definition of Done

- [ ] All files above committed
- [ ] `pnpm test:node`, `pnpm test:browser`, `pnpm test:visual`, `pnpm typecheck`, `pnpm lint` all green
- [ ] Storybook builds; the 7 stories render
- [ ] `DateField` importable from `@godaddy/antares`
- [ ] PR description references PDR and lists the AC lines closed (the DateField subset only — pickers/calendar follow in PR 2/3)

---

## PR 2 — `feat/calendar`

**Branch:** `feat/calendar` from `feat/date-field`
**Goal:** Stand-alone Calendar + RangeCalendar with our header, indicators, and duration constraints.

### Files to create

```
packages/@godaddy/antares/
  components/calendar/
    src/
      index.ts                               # barrel export
      calendar.tsx                           # Calendar component
      range-calendar.tsx                     # RangeCalendar component
      calendar-header.tsx                    # shared Month + Year Select header
      day-cell.tsx                           # shared day cell w/ indicator dots
      get-year-range.ts                      # year-list derivation
      index.module.css
    examples/
      default.tsx
      default-range.tsx
      with-min-max.tsx
      with-unavailable-dates.tsx
      with-indicators.tsx
      today-distinct.tsx
      out-of-month-days.tsx
      with-duration.tsx                      # range only — minDuration/maxDuration
    test/
      calendar.node.test.tsx
      calendar.browser.test.tsx
      calendar.visual.test.tsx
    calendar.stories.tsx
    README.mdx
  exports/
    Calendar.ts                              # exports Calendar + RangeCalendar
```

### Files to modify

- `packages/@godaddy/antares/index.ts` — re-export from `./exports/Calendar`

### Implementation tasks

- [ ] `calendar-header.tsx`: replace RAC's default heading with two `Select` components (Month, Year). Selecting either fires `setFocusedDate` to update the visible calendar(s).
- [ ] `get-year-range.ts`: pure function `(minValue?, maxValue?, today) => number[]`. If either bound set, list those years inclusive; otherwise current year ± 100.
- [ ] `day-cell.tsx`: render day number; if `getDayIndicators` provided, render up to 3 dots underneath; slice to 3 with `console.warn` in dev when more returned; merge indicator `label`s into the cell's `aria-label`.
- [ ] Color: dot colors map to `var(--color-feedback-<color>-strong)` design tokens.
- [ ] `calendar.tsx`: wrap RAC `Calendar<CalendarDate>` with our header + day cell. Single month, `visibleDuration={{ months: 1 }}`.
- [ ] `range-calendar.tsx`: wrap RAC `RangeCalendar<CalendarDate>`. Two months side-by-side, `visibleDuration={{ months: 2 }}`. Out-of-month days hidden (NOT rendered, per AC).
- [ ] `minDuration` / `maxDuration` (RangeCalendar only): compute dynamic `isDateUnavailable` that ANDs the consumer's `isDateUnavailable` with duration constraints based on in-progress range start.
- [ ] Visual states: today, selected, in-range, today-also-in-range, today-also-selected — all distinguishable per Figma.
- [ ] Out-of-month rendering: 40% opacity + non-focusable + non-selectable in single mode; not rendered at all in range mode.
- [ ] Click-earlier-than-start in range: leave RAC default behavior (reset start) — no override needed.
- [ ] JSDoc + `@see` links on every public prop.

### Storybook tasks

- [ ] 7 stories per PDR §Storybook Scope (Default, DefaultRange, WithMinMax + WithUnavailableDates, WithIndicators, TodayDistinct, OutOfMonthDays, WithDuration)
- [ ] WithIndicators story should render at least one day with 1 dot, one with 2, one with 3, and one where the consumer returns 4 (to verify silent slice + dev warn).
- [ ] OutOfMonthDays story renders both single (showing 40% opacity) and range (showing days hidden) variants side-by-side.

### Test tasks

`test:node` (~10 tests):
- [ ] Calendar + RangeCalendar render without throwing
- [ ] Props pass through to RAC
- [ ] Type-level: `<Calendar<CalendarDate>>`, range value shape `{ start, end }`
- [ ] `getYearRange` unit tests: with bounds, without bounds, with only `minValue`, with only `maxValue`, edge case where `minValue` year > `maxValue` year (should not crash)

`test:browser` (~12 tests):
- [ ] Month `Select` change → visible month updates
- [ ] Year `Select` change → visible year updates
- [ ] Year `Select` options reflect derived year range when `minValue`/`maxValue` set
- [ ] `isDateUnavailable` disables matching days
- [ ] `minValue` / `maxValue` disable out-of-range days
- [ ] `getDayIndicators` returning 0/1/2/3 dots renders correctly
- [ ] `getDayIndicators` returning 4+ slices to 3 and fires `console.warn` in dev
- [ ] Indicator `label` shows up in day cell's `aria-label`
- [ ] RangeCalendar: `minDuration={{ days: 3 }}` disables end candidates within 2 days of start during in-progress pick
- [ ] RangeCalendar: `maxDuration={{ days: 7 }}` disables end candidates more than 7 days after start
- [ ] RangeCalendar: navigating left side advances right side; navigating right side rewinds left side; both stay adjacent
- [ ] RangeCalendar: out-of-month days are NOT in the DOM (queryByRole returns null for those days)
- [ ] Today + selected + in-range coexistence: when today is between start and end, both visual states are present in the DOM (verified by class names or data attributes)

`test:visual` (~5 snapshots):
- [ ] WithIndicators, TodayDistinct, OutOfMonthDays (single), OutOfMonthDays (range), WithDuration

### Documentation tasks

- [ ] `README.mdx` per existing pattern. Both Calendar and RangeCalendar documented in one file.
- [ ] Brief "Working with dates" subsection linking to canonical version in `date-picker/README.mdx` (PR 3).

### Definition of Done

- [ ] All files committed
- [ ] All test runners green; `typecheck` and `lint` green
- [ ] Storybook builds; 7 stories render
- [ ] `Calendar` and `RangeCalendar` importable from `@godaddy/antares`
- [ ] PR description references PDR and lists the AC lines closed

---

## PR 3 — `feat/date-picker`

**Branch:** `feat/date-picker` from `feat/calendar`
**Goal:** Compose `DateField` + `Calendar` / `RangeCalendar` in popovers. Closes UXP-11890.

### Files to create

```
packages/@godaddy/antares/
  components/date-picker/
    src/
      index.ts
      date-picker.tsx
      date-range-picker.tsx
      index.module.css
    examples/
      default.tsx
      default-range.tsx
      with-min-max.tsx
      with-min-max-duration.tsx
      with-unavailable-dates.tsx
      with-indicators.tsx
      with-error.tsx
      controlled.tsx
      placeholder-value.tsx
      form.tsx
    test/
      date-picker.node.test.tsx
      date-picker.browser.test.tsx
      date-picker.visual.test.tsx
    date-picker.stories.tsx
    README.mdx                                # canonical "Working with dates" lives here
  exports/
    DatePicker.ts                             # exports DatePicker + DateRangePicker
```

### Files to modify

- `packages/@godaddy/antares/index.ts` — re-export from `./exports/DatePicker`
- `packages/@godaddy/antares/components/date-field/README.mdx` — replace inline "Working with dates" with link to `date-picker/README.mdx`
- `packages/@godaddy/antares/components/calendar/README.mdx` — same replacement

### Implementation tasks

- [ ] `date-picker.tsx`: wrap RAC `DatePicker<CalendarDate>`. Composes `FieldFrame` + segmented input (reusing PR 1 `DateField` internals as appropriate) + Popover trigger button + `Calendar` from PR 2.
- [ ] `date-range-picker.tsx`: wrap RAC `DateRangePicker<CalendarDate>`. Two segmented inputs + Popover + `RangeCalendar`.
- [ ] Thread `getDayIndicators` through to inner Calendar / RangeCalendar.
- [ ] Thread `minValue` / `maxValue` through to both segmented inputs and inner calendar.
- [ ] Thread `minDuration` / `maxDuration` (range only) through to inner RangeCalendar.
- [ ] `errorMessage` constrained to `string`.
- [ ] Esc closes popover, outside-click closes popover, focus returns to trigger on close — verify RAC handles all of these out of the box.
- [ ] JSDoc + `@see` links on every public prop.

### Storybook tasks

- [ ] 10 stories per PDR §Storybook Scope (Default, DefaultRange, WithMinMax, WithMinMaxDuration, WithUnavailableDates, WithIndicators, WithError, Controlled, PlaceholderValue, Form)

### Test tasks

`test:node` (~10 tests):
- [ ] DatePicker + DateRangePicker render without throwing
- [ ] Props pass through to RAC
- [ ] Type-level checks for both single and range variants

`test:browser` (~7 tests, focused on integration not redundant with PR 1/2):
- [ ] Opening DatePicker shows Calendar; selecting a day in Calendar updates the segmented input value
- [ ] Typed entry in segmented input updates the Calendar's selected day
- [ ] Esc closes popover; focus returns to trigger
- [ ] Outside-click closes popover
- [ ] DateRangePicker: selecting start in left calendar then end in right calendar updates both segmented inputs and closes the popover
- [ ] DateRangePicker: typed entry into either input parses and updates calendar selection
- [ ] Form submission sends ISO date string(s)

`test:visual` (~2 snapshots):
- [ ] DatePicker open with Calendar visible, DateRangePicker open with RangeCalendar visible

### Documentation tasks

- [ ] `README.mdx` includes the **canonical** "Working with dates" section. Cover:
  - Why `@internationalized/date` (not JS `Date`)
  - It ships transitively — no install needed (with strict-pnpm caveat)
  - 3 patterns: today, fixed date, controlled state
  - Link to RAC docs and `@internationalized/date` docs
  - `<I18nProvider>` requirement
- [ ] Update PR 1 / PR 2 READMEs to link here

### Definition of Done

- [ ] All files committed
- [ ] All test runners green; `typecheck` and `lint` green
- [ ] Storybook builds; 10 stories render
- [ ] `DatePicker` and `DateRangePicker` importable from `@godaddy/antares`
- [ ] All AC items in UXP-11890 verified — paste the AC checklist into the PR description with each item marked done and pointing to the story or test that verifies it
- [ ] UXP-11890 comment added with the two open questions (range click-earlier behavior, `<I18nProvider>` confirmation) — see Post-merge follow-ups

---

## Post-merge follow-ups

- [ ] Comment on UXP-11890: "Range click-earlier behavior currently ships with RAC's default reset-start. Design — please confirm or open a follow-up if swap-anchor is preferred." (Per PDR Open Question 1.)
- [ ] Update Antares Confluence component index to list DateField, DatePicker, DateRangePicker, Calendar, RangeCalendar.
- [ ] Close UXP-11890.
