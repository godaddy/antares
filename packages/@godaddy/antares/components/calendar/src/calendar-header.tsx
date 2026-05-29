import { type CalendarDate, type DateValue, today as todayFn, getLocalTimeZone } from '@internationalized/date';
import { useContext } from 'react';
import {
  CalendarStateContext,
  RangeCalendarStateContext,
  useLocale,
  type Key as RACKey
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { Select, SelectItem } from '#components/select';
import { getYearRange } from './get-year-range';
import styles from './index.module.css';

interface CalendarHeaderProps {
  /** Lower bound passed to the parent calendar. Used to derive the year `Select` range. */
  minValue?: DateValue | null;
  /** Upper bound passed to the parent calendar. Used to derive the year `Select` range. */
  maxValue?: DateValue | null;
}

/**
 * Replaces RAC's default calendar heading with two `Select` dropdowns: Month and Year.
 * Reads the active calendar state from `CalendarStateContext` (single) or
 * `RangeCalendarStateContext` (range), whichever is non-null.
 *
 * Consumes locale via `useLocale` so the month names match the locale supplied by
 * the host-app's `<I18nProvider>`.
 */
export function CalendarHeader({ minValue, maxValue }: CalendarHeaderProps) {
  const calendarState = useContext(CalendarStateContext);
  const rangeState = useContext(RangeCalendarStateContext);
  const state = calendarState ?? rangeState;
  const { locale } = useLocale();

  if (!state) {
    return null;
  }

  const focusedDate = state.focusedDate as CalendarDate;
  const today = todayFn(getLocalTimeZone());

  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
  const months = Array.from({ length: 12 }, function buildMonth(_, index) {
    const referenceDate = focusedDate.set({ month: index + 1, day: 1 });
    return {
      value: index + 1,
      label: monthFormatter.format(referenceDate.toDate(state.timeZone))
    };
  });

  const years = getYearRange(minValue ?? null, maxValue ?? null, today);

  function handleMonthChange(key: RACKey | null) {
    if (key == null) return;
    const month = Number(key);
    state?.setFocusedDate(focusedDate.set({ month }));
  }

  function handleYearChange(key: RACKey | null) {
    if (key == null) return;
    const year = Number(key);
    state?.setFocusedDate(focusedDate.set({ year }));
  }

  return (
    <Flex gap="sm" alignItems="center" className={styles.header}>
      <Select
        aria-label="Month"
        selectedKey={focusedDate.month}
        onSelectionChange={handleMonthChange}
        className={styles.headerSelect}
      >
        {months.map((month) => (
          <SelectItem key={month.value} id={month.value} textValue={month.label}>
            {month.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        aria-label="Year"
        selectedKey={focusedDate.year}
        onSelectionChange={handleYearChange}
        className={styles.headerSelect}
      >
        {years.map((year) => (
          <SelectItem key={year} id={year} textValue={String(year)}>
            {String(year)}
          </SelectItem>
        ))}
      </Select>
    </Flex>
  );
}
