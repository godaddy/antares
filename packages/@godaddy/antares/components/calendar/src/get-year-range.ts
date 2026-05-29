import type { CalendarDate, DateValue } from '@internationalized/date';

/**
 * Years either side of `today` to include in the year `Select` when no bounds are set.
 */
export const DEFAULT_YEAR_PADDING = 100;

/**
 * Derive the list of years to surface in the calendar's year `Select`.
 *
 * - If `minValue` and/or `maxValue` is provided, the range is the inclusive span
 *   between them — falling back to today's year on the unset side.
 * - If neither is provided, returns `today.year ± DEFAULT_YEAR_PADDING`.
 * - If `minValue.year > maxValue.year` (consumer error), returns `[today.year]`
 *   rather than throwing — the calendar still renders.
 *
 * @param minValue - lower bound from the consumer
 * @param maxValue - upper bound from the consumer
 * @param today - reference date (typically `today(getLocalTimeZone())`)
 */
export function getYearRange(
  minValue: DateValue | undefined | null,
  maxValue: DateValue | undefined | null,
  today: CalendarDate
): number[] {
  if (!minValue && !maxValue) {
    const start = today.year - DEFAULT_YEAR_PADDING;
    const end = today.year + DEFAULT_YEAR_PADDING;
    return range(start, end);
  }

  const startYear = minValue?.year ?? today.year;
  const endYear = maxValue?.year ?? today.year;

  if (startYear > endYear) {
    return [today.year];
  }

  return range(startYear, endYear);
}

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let year = start; year <= end; year += 1) {
    out.push(year);
  }
  return out;
}
