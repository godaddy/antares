import type { CalendarDate, DateDuration, DateValue } from '@internationalized/date';
import { useCallback } from 'react';
import {
  CalendarGrid as RACCalendarGrid,
  RangeCalendar as RACRangeCalendar,
  type RangeCalendarProps as RACRangeCalendarProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { CalendarHeader } from './calendar-header';
import { DayCell } from './day-cell';
import type { GetDayIndicators } from './types';
import styles from './index.module.css';

/**
 * RAC's RangeCalendar passes the in-progress anchor date as the second argument to
 * `isDateUnavailable`. Wider than RAC's exported `(date: DateValue) => boolean` shape.
 */
type RangeIsDateUnavailable = (date: DateValue, anchorDate: CalendarDate | null) => boolean;

/**
 * Props for the {@link RangeCalendar} component.
 *
 * @public
 */
export interface RangeCalendarProps
  extends Omit<RACRangeCalendarProps<CalendarDate>, 'children' | 'visibleDuration' | 'isDateUnavailable'> {
  /**
   * Per-day indicator function. Returns up to 3 colored dots rendered beneath the day number.
   *
   * @example
   *   <RangeCalendar getDayIndicators={(date) => date.day % 5 === 0 ? [{ color: 'info' }] : []} />
   */
  getDayIndicators?: GetDayIndicators;

  /**
   * Predicate to disable specific dates. Receives the in-progress anchor date as the
   * second argument so duration constraints can be expressed by the consumer if needed
   * — `minDuration` and `maxDuration` already cover the common cases.
   *
   * @see https://react-spectrum.adobe.com/react-aria/RangeCalendar.html#unavailable-dates
   */
  isDateUnavailable?: RangeIsDateUnavailable;

  /**
   * Minimum duration of the selected range. Disables end-date candidates that would
   * produce a shorter range during an in-progress pick.
   *
   * @example
   *   <RangeCalendar minDuration={{ days: 3 }} />
   */
  minDuration?: DateDuration;

  /**
   * Maximum duration of the selected range. Disables end-date candidates that would
   * produce a longer range during an in-progress pick.
   *
   * @example
   *   <RangeCalendar maxDuration={{ days: 7 }} />
   */
  maxDuration?: DateDuration;
}

/**
 * RangeCalendar is a two-month side-by-side date grid for picking a contiguous range.
 * Mirrors React Aria RangeCalendar typed for `CalendarDate`. Adds `minDuration` /
 * `maxDuration` constraints (not in RAC) and a Month + Year `Select` header.
 *
 * Out-of-month days in either grid are NOT rendered (per AC) so the visible cells
 * always belong to one of the two visible months.
 *
 * @param props - {@link RangeCalendarProps}
 *
 * @example
 * ```tsx
 * import { parseDate } from '@internationalized/date';
 *
 * <RangeCalendar
 *   defaultValue={{ start: parseDate('2024-03-01'), end: parseDate('2024-03-07') }}
 *   minDuration={{ days: 3 }}
 *   maxDuration={{ days: 14 }}
 * />
 * ```
 *
 * @see https://react-spectrum.adobe.com/react-aria/RangeCalendar.html
 */
export function RangeCalendar(props: RangeCalendarProps) {
  const { getDayIndicators, minValue, maxValue, minDuration, maxDuration, isDateUnavailable, ...racProps } = props;

  const wrappedIsDateUnavailable = useCallback<RangeIsDateUnavailable>(
    function check(date, anchorDate) {
      if (isDateUnavailable?.(date, anchorDate)) return true;
      if (!anchorDate) return false;

      const candidate = date as CalendarDate;
      if (candidate.compare(anchorDate) < 0) return false;

      if (minDuration) {
        const minBoundary = anchorDate.add(minDuration);
        if (candidate.compare(minBoundary) < 0) return true;
      }

      if (maxDuration) {
        const maxBoundary = anchorDate.add(maxDuration);
        if (candidate.compare(maxBoundary) > 0) return true;
      }

      return false;
    },
    [isDateUnavailable, minDuration, maxDuration]
  );

  return (
    <RACRangeCalendar<CalendarDate>
      {...racProps}
      minValue={minValue}
      maxValue={maxValue}
      visibleDuration={{ months: 2 }}
      isDateUnavailable={wrappedIsDateUnavailable as (date: DateValue) => boolean}
      className={styles.calendar}
    >
      <CalendarHeader minValue={minValue ?? null} maxValue={maxValue ?? null} />
      <Flex direction="row" gap="lg" className={styles.rangeGrids}>
        <RACCalendarGrid className={styles.grid}>
          {(date) => <DayCell date={date} hideOutsideMonth getDayIndicators={getDayIndicators} />}
        </RACCalendarGrid>
        <RACCalendarGrid offset={{ months: 1 }} className={styles.grid}>
          {(date) => <DayCell date={date} hideOutsideMonth getDayIndicators={getDayIndicators} />}
        </RACCalendarGrid>
      </Flex>
    </RACRangeCalendar>
  );
}
