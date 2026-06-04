import type { CalendarDate } from '@internationalized/date';
import { getLocalTimeZone } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

/**
 * Default prose format for a date value. Locale ordering is applied by the formatter —
 * `en-US` renders `Aug 12, 2022`, `en-GB` renders `12 Aug 2022`.
 */
export const DEFAULT_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
};

/**
 * Locale-aware prose string for a single `CalendarDate` (e.g. `12 Aug 2022`).
 * Returns `undefined` when there is no value.
 */
export function useFormattedDate(
  value: CalendarDate | null | undefined,
  options: Intl.DateTimeFormatOptions = DEFAULT_FORMAT_OPTIONS
): string | undefined {
  const formatter = useDateFormatter(options);
  return value ? formatter.format(value.toDate(getLocalTimeZone())) : undefined;
}

/**
 * Locale-aware prose string for a date range (e.g. `Aug 12 – 20, 2022`). The formatter
 * collapses shared month/year parts per locale. Returns `undefined` unless both endpoints
 * are present.
 */
export function useFormattedRange(
  start: CalendarDate | null | undefined,
  end: CalendarDate | null | undefined,
  options: Intl.DateTimeFormatOptions = DEFAULT_FORMAT_OPTIONS
): string | undefined {
  const formatter = useDateFormatter(options);
  if (!start || !end) return undefined;
  const tz = getLocalTimeZone();
  return formatter.formatRange(start.toDate(tz), end.toDate(tz));
}
