import type { CalendarDate } from '@internationalized/date';
import {
  Calendar as RACCalendar,
  CalendarCell as RACCalendarCell,
  CalendarGrid as RACCalendarGrid,
  type CalendarProps as RACCalendarProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { CalendarHeader } from './calendar-header';
import styles from './index.module.css';

/**
 * Props for the {@link Calendar} component.
 *
 * Wraps {@link RACCalendarProps} typed for `CalendarDate`. `visibleDuration` is fixed
 * at one month — consumers needing a custom layout should compose RAC directly.
 *
 * @public
 */
export interface CalendarProps extends Omit<RACCalendarProps<CalendarDate>, 'children' | 'visibleDuration'> {}

/**
 * Calendar is a single-month date grid for picking one date. It mirrors React Aria
 * Calendar typed for `CalendarDate` (date-only, no time, no timezone) and replaces
 * RAC's default heading with prev/next arrows + Month + Year `Select` dropdowns.
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
  return (
    <RACCalendar<CalendarDate> {...props} visibleDuration={{ months: 1 }} className={styles.calendar}>
      <Flex direction="column" gap="md" padding="md">
        <CalendarHeader position="single" />
        <RACCalendarGrid className={styles.grid}>
          {function renderCell(date) {
            return <RACCalendarCell date={date} className={styles.cell} />;
          }}
        </RACCalendarGrid>
      </Flex>
    </RACCalendar>
  );
}
