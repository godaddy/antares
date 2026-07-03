import { Icon } from '#components/icon';
import { Flex } from '#components/layout/flex';
import { NumberField } from '#components/number-field';
import { Select, SelectItem } from '#components/select';
import { Button } from '#components/button';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { useCallback, useContext, useMemo } from 'react';
import {
  CalendarStateContext as RACCalendarStateContext,
  RangeCalendarStateContext as RACRangeCalendarStateContext,
  useLocale,
  type Key as RACKey
} from 'react-aria-components';
import styles from './index.module.css';

/**
 * Previous/next navigation arrow. Uses RAC's `slot` so it drives the calendar through context
 * regardless of where it sits in the tree — a single pair can flank multiple month grids.
 *
 * @param props.direction - Which navigation slot this button fills.
 */
export function NavButton(props: { direction: 'previous' | 'next' }) {
  const { direction } = props;
  return (
    <Button slot={direction} aria-label={direction === 'previous' ? 'Previous' : 'Next'}>
      <Icon icon={direction === 'previous' ? 'chevron-left' : 'chevron-right'} />
    </Button>
  );
}

/**
 * Editable month/year controls for a single visible month. `offset` is the number of months after
 * the calendar's focused date, so a multi-month calendar renders one heading per grid. Reads
 * whichever calendar state context is present (Calendar or RangeCalendar) and keeps `focusedDate`
 * anchored to the first visible month by subtracting `offset` on every change.
 *
 * @param props.offset - Months after the focused date that this heading represents.
 */
export function MonthHeading(props: { offset: number }) {
  const { offset } = props;
  const calendarState = useContext(RACCalendarStateContext);
  const rangeState = useContext(RACRangeCalendarStateContext);
  const state = calendarState ?? rangeState;
  const { locale } = useLocale();
  const displayDate = state?.focusedDate?.add({ months: offset }) ?? null;

  // Localized month names for the dropdown; recompute only when locale or the shown year changes.
  const monthNames = useMemo(
    function computeMonthNames() {
      const formatter = new DateFormatter(locale, { month: 'long' });
      const year = displayDate?.year ?? 2024;
      return Array.from({ length: 12 }, (_, index) =>
        formatter.format(new CalendarDate(year, index + 1, 1).toDate(getLocalTimeZone()))
      );
    },
    [locale, displayDate?.year]
  );

  const handleMonthChange = useCallback(
    function handleMonthChange(key: RACKey | null) {
      if (!state || !displayDate) {
        return;
      }

      state.setFocusedDate(displayDate.set({ month: Number(key) }).subtract({ months: offset }));
    },
    [state, displayDate, offset]
  );

  const handleYearChange = useCallback(
    function handleYearChange(year: number) {
      if (!state || !displayDate || Number.isNaN(year)) {
        return;
      }

      state.setFocusedDate(displayDate.set({ year }).subtract({ months: offset }));
    },
    [state, displayDate, offset]
  );

  if (!state || !displayDate) {
    return null;
  }

  return (
    <Flex as="header" direction="row" gap="sm" justifyContent="center">
      <Select aria-label="Month" value={String(displayDate.month)} onChange={handleMonthChange}>
        {monthNames.map(function mapMonthNames(name, index) {
          return (
            <SelectItem key={index + 1} id={String(index + 1)}>
              {name}
            </SelectItem>
          );
        })}
      </Select>
      <NumberField
        aria-label="Year"
        hideStepper
        formatOptions={{ useGrouping: false }}
        value={displayDate.year}
        onChange={handleYearChange}
        className={styles.yearField}
      />
    </Flex>
  );
}
