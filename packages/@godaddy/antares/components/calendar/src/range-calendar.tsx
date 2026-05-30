import type { CalendarDate } from '@internationalized/date';
import {
  CalendarCell as RACCalendarCell,
  CalendarGrid as RACCalendarGrid,
  RangeCalendar as RACRangeCalendar,
  type RangeCalendarProps as RACRangeCalendarProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { CalendarHeader } from './calendar-header';
import styles from './index.module.css';

export interface RangeCalendarProps extends Omit<RACRangeCalendarProps<CalendarDate>, 'children' | 'visibleDuration'> {}

/**
 * Two-month side-by-side date grid for picking a contiguous range, typed for `CalendarDate`.
 * Each grid has its own header; selecting a month/year on either side scrolls both together,
 * and `pageBehavior="single"` makes the arrows page one month at a time.
 *
 * @param props - {@link RangeCalendarProps}
 *
 * @example
 * ```tsx
 * import { parseDate } from '@internationalized/date';
 *
 * <RangeCalendar
 *   defaultValue={{ start: parseDate('2024-03-01'), end: parseDate('2024-03-07') }}
 * />
 * ```
 */
export function RangeCalendar(props: RangeCalendarProps) {
  return (
    <RACRangeCalendar<CalendarDate>
      {...props}
      visibleDuration={{ months: 2 }}
      pageBehavior="single"
      className={styles.calendar}
    >
      <Flex direction="row" gap="lg" wrap="nowrap" padding="md">
        <Flex direction="column" gap="md">
          <CalendarHeader range="start" />
          <RACCalendarGrid className={styles.grid}>
            {function renderStartCell(date) {
              return <RACCalendarCell date={date} className={styles.cell} />;
            }}
          </RACCalendarGrid>
        </Flex>
        <Flex direction="column" gap="md">
          <CalendarHeader range="end" />
          <RACCalendarGrid offset={{ months: 1 }} className={styles.grid}>
            {function renderEndCell(date) {
              return <RACCalendarCell date={date} className={styles.cell} />;
            }}
          </RACCalendarGrid>
        </Flex>
      </Flex>
    </RACRangeCalendar>
  );
}
