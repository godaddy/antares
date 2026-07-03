# Multi-month Calendar & RangeCalendar — Design

Date: 2026-07-03
Component: `packages/@godaddy/antares/components/calendar`

## Problem

`Calendar` and `RangeCalendar` render exactly one month grid. We need to display
multiple months, driven by React Aria's `visibleDuration`, with `RangeCalendar`
defaulting to two months. The header must adapt so each visible month has its own
month/year controls while navigation stays shared.

## Goals

- Support `visibleDuration` (RAC prop, `DateDuration`) to render N month grids in
  both `Calendar` and `RangeCalendar`.
- `RangeCalendar` defaults to `{ months: 2 }`; `Calendar` stays `{ months: 1 }`.
- Header shows per-month editable Month `Select` + Year `NumberField`, flanked by a
  single shared prev/next arrow pair.
- Keep RAC prop names as passthrough (`visibleDuration`, `pageBehavior`); no new prop
  surface.

## Non-goals

- No new examples.
- No README callout for `visibleDuration`.
- No change to `pageBehavior` default (stays RAC `'visible'` — prev/next pages by the
  full visible window).
- No restructure of the `Flex as={RACCalendar<CalendarDate>}` root. The earlier
  polymorphic-generic type error was already fixed by instantiating the generic at the
  `as` site; `FlexOwnProps` is retained on both prop types.
- Non-month `visibleDuration` granularity (weeks/days) does not change grid count.

## Design

### Prop API

- `CalendarProps` / `RangeCalendarProps` already inherit `visibleDuration?: DateDuration`
  and `pageBehavior?` from the RAC props they extend, and both keep `FlexOwnProps`. No
  new props.
- Grid count: `months = clampMin1(props.visibleDuration?.months ?? DEFAULT)` where
  `DEFAULT` is `1` for `Calendar` and `2` for `RangeCalendar`.
- `RangeCalendar` sets `visibleDuration={{ months: 2 }}` **before** `{...rest}` so callers
  can override it (and any other RAC prop) as usual.

### Component structure

Inside the existing `Flex as={RACCalendar<CalendarDate>}` (and `RACRangeCalendar`) root:

```tsx
<Flex as={RACCalendar<CalendarDate>} direction="column" {...rest} className={cx(styles.calendar, className)}>
  <Flex direction="row" gap="sm" alignItems="start" justifyContent="space-between">
    <NavButton direction="previous" />
    <Flex direction="row" gap="lg">
      {Array.from({ length: months }, (_, offset) => (
        <Flex key={offset} direction="column" gap="md">
          <MonthHeading offset={offset} />
          <CalendarGrid type="single" offset={{ months: offset }} />
        </Flex>
      ))}
    </Flex>
    <NavButton direction="next" />
  </Flex>
</Flex>
```

Pairing each `MonthHeading` with its grid in a column keeps the heading aligned directly
above its grid without width math. The prev/next buttons flank the whole months block,
top-aligned (`alignItems="start"`). `RangeCalendar` is identical with
`RACRangeCalendar<CalendarDate>` and `type="range"`.

For `months === 1` this collapses to today's visual layout (one heading between the two
arrows, one grid below).

### Header refactor (`CalendarHeader.tsx`)

Today's single `CalendarHeader` (arrows + one month/year bar reading `state.focusedDate`)
splits into two offset-aware pieces:

- **`MonthHeading({ offset }: { offset: number })`** — reads
  `RACCalendarStateContext ?? RACRangeCalendarStateContext`. Computes
  `displayDate = state.focusedDate.add({ months: offset })`, renders the Month `Select`
  (value `displayDate.month`) + Year `NumberField` (value `displayDate.year`). On change:
  - month → `state.setFocusedDate(displayDate.set({ month }).subtract({ months: offset }))`
  - year (guard `!Number.isNaN`) → `state.setFocusedDate(displayDate.set({ year }).subtract({ months: offset }))`

  Subtracting `offset` keeps `focusedDate` anchored to month 0, so every heading and grid
  stays consistent. The localized `monthNames` memo is retained, keyed on `locale` and
  `displayDate.year`.

- **`NavButton({ direction: 'previous' | 'next' })`** — a `Button` with `slot={direction}`
  and the chevron icon. RAC drives navigation through context regardless of DOM position,
  so the buttons work while flanking the block. Rendered by `Calendar`/`RangeCalendar`.

If `state`/`focusedDate` is absent, `MonthHeading` renders nothing (as today).

### CSS (`index.module.css`)

Minimal. Between-month spacing comes from the `gap="lg"` Flex prop; `.calendar`'s
`max-width: max-content` already adapts to N grids. `.grid`/`.cell` unchanged. Add a
class only if a spacing/border tweak proves necessary during implementation.

### Edge cases

- `visibleDuration.months` undefined → default (1 / 2).
- `months <= 0` → clamp to 1.
- `visibleDuration` in weeks/days → `months` undefined → 1 grid (RAC still honors the
  duration within that grid).
- Year `NaN` guard retained.

## Testing

- **Node snapshots:** `range` example now renders 2 months → regenerate with
  `:test:node:update`. Single-`Calendar` snapshot unchanged.
- **Browser tests** (add cases):
  - prev/next moves the visible window (default `'visible'` pages the range by 2 months);
  - changing the month-0 dropdown shifts both grids; changing the month-1 dropdown anchors
    `focusedDate` correctly;
  - range selection spanning the two visible months.
- **Visual tests:** `range` screenshot updates; Linux baseline regenerated by the
  `/update-screenshots` CI bot after the PR opens. No new visual tests (no new examples).

## Stories

Add a `visibleDuration` control to the **existing** playground (`argType`: month count
1–3, mapped to `visibleDuration={{ months }}` in `render`). This is an enhancement to the
current playground story, not a new example. Leave README untouched.

## Files touched

- `src/index.tsx` — grid mapping, `RangeCalendar` default, flanked layout, `NavButton` usage.
- `src/CalendarHeader.tsx` — `MonthHeading` (offset-aware) + `NavButton`.
- `src/index.module.css` — minor, only if needed.
- `calendar.stories.tsx` — playground `visibleDuration` control.
- `test/calendar.node.test.tsx` — regenerate `range` snapshot.
- `test/calendar.browser.test.tsx` — multi-month nav + per-month dropdown cases.
- `examples/range.tsx` — no code change (output now 2 months).
- `README.mdx` — no change.
