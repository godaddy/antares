import type { CalendarDate } from '@internationalized/date';

/**
 * Indicator dot rendered beneath a day cell. Up to 3 per day.
 */
export interface DayIndicator {
  /** Maps to the `--color-feedback-<color>-strong` design token. */
  color: 'critical' | 'highlight' | 'info' | 'passive' | 'success' | 'warning';
  /** Optional accessible label combined with the day's date label for screen readers. */
  label?: string;
}

/**
 * Per-day indicator function, called with the CalendarDate for each visible day cell.
 * Return up to 3 indicators; more are sliced and produce a dev-only `console.warn`.
 */
export type GetDayIndicators = (date: CalendarDate) => DayIndicator[];

/**
 * Maximum indicators rendered per day cell. AC is firm at 3.
 */
export const MAX_INDICATORS = 3;
