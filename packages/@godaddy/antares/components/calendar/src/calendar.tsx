import type { CalendarDate } from '@internationalized/date';
import {
  Calendar as RACCalendar,
  CalendarGrid as RACCalendarGrid,
  type CalendarProps as RACCalendarProps
} from 'react-aria-components';
import { CalendarHeader } from './calendar-header';
import { DayCell } from './day-cell';
import type { GetDayIndicators } from './types';
import styles from './index.module.css';

/**
 * Props for the {@link Calendar} component.
 *
 * Wraps {@link RACCalendarProps} typed for `CalendarDate`. `visibleDuration` is fixed
 * at one month — consumers needing a custom layout should compose RAC directly.
 *
 * @public
 */
export interface CalendarProps extends Omit<RACCalendarProps<CalendarDate>, 'children' | 'visibleDuration'> {
  /**
   * Per-day indicator function. Returns up to 3 colored dots rendered beneath the
   * day number. Called once per visible day cell.
   *
   * @example
   *   <Calendar getDayIndicators={(date) => date.day === 15 ? [{ color: 'success' }] : []} />
   */
  getDayIndicators?: GetDayIndicators;
}

/**
 * Calendar is a single-month date grid for picking one date. It mirrors React Aria
 * Calendar typed for `CalendarDate` (date-only, no time, no timezone) and adds a
 * Month + Year `Select` header in place of RAC's default heading.
 *
 * @param props - {@link CalendarProps}
 *
 * @example
 * ```tsx
 * import { parseDate } from '@internationalized/date';
 *
 * <Calendar defaultValue={parseDate('2024-03-15')} />
 * ```
 *
 * @see https://react-spectrum.adobe.com/react-aria/Calendar.html
 */
export function Calendar(props: CalendarProps) {
  const { getDayIndicators, minValue, maxValue, ...racProps } = props;

  return (
    <RACCalendar<CalendarDate>
      {...racProps}
      minValue={minValue}
      maxValue={maxValue}
      visibleDuration={{ months: 1 }}
      className={styles.calendar}
    >
      <CalendarHeader minValue={minValue} maxValue={maxValue} />
      <RACCalendarGrid className={styles.grid}>
        {(date) => <DayCell date={date} getDayIndicators={getDayIndicators} />}
      </RACCalendarGrid>
    </RACCalendar>
  );
}
