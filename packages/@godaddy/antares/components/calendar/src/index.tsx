import type { CalendarDate } from '@internationalized/date';
import {
  Calendar as RACCalendar,
  CalendarCell as RACCalendarCell,
  CalendarGrid as RACCalendarGrid,
  RangeCalendar as RACRangeCalendar,
  type CalendarProps as RACCalendarProps,
  type RangeCalendarProps as RACRangeCalendarProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { CalendarHeader } from './calendar-header';
import styles from './index.module.css';

export interface CalendarProps extends Omit<RACCalendarProps<CalendarDate>, 'children' | 'visibleDuration'> {}

/**
 * Single-month date grid typed for `CalendarDate` (date-only, no time, no timezone).
 * Replaces RAC's default heading with prev/next arrows + Month + Year `Select` dropdowns.
 *
 * @param props - {@link CalendarProps}
 *
 * @example
 * ```tsx
 * import { parseDate } from '@internationalized/date';
 *
 * <Calendar defaultValue={parseDate('2024-03-15')} />
 * ```
 */
export function Calendar(props: CalendarProps) {
  return (
    <RACCalendar<CalendarDate> {...props} visibleDuration={{ months: 1 }} className={styles.calendar}>
      <Flex direction="column" gap="md" padding="md">
        <CalendarHeader />
        <RACCalendarGrid className={styles.grid}>
          {function renderCell(date) {
            return <RACCalendarCell date={date} className={styles.cell} />;
          }}
        </RACCalendarGrid>
      </Flex>
    </RACCalendar>
  );
}

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
