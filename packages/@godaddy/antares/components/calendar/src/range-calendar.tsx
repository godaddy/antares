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

/**
 * Props for the {@link RangeCalendar} component.
 *
 * @public
 */
export interface RangeCalendarProps
  extends Omit<RACRangeCalendarProps<CalendarDate>, 'children' | 'visibleDuration'> {}

/**
 * RangeCalendar is a two-month side-by-side date grid for picking a contiguous range.
 * Mirrors React Aria RangeCalendar typed for `CalendarDate`. Each visible month has its
 * own header — left has prev arrow + Month + Year dropdowns; right has Month + Year
 * dropdowns + next arrow. Selecting a month/year on either side scrolls both grids
 * together; the prev/next arrows page by one month thanks to `pageBehavior="single"`.
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
 *
 * @see https://react-spectrum.adobe.com/react-aria/RangeCalendar.html
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
          <CalendarHeader position="left" />
          <RACCalendarGrid className={styles.grid}>
            {function renderLeftCell(date) {
              return <RACCalendarCell date={date} className={styles.cell} />;
            }}
          </RACCalendarGrid>
        </Flex>
        <Flex direction="column" gap="md">
          <CalendarHeader position="right" />
          <RACCalendarGrid offset={{ months: 1 }} className={styles.grid}>
            {function renderRightCell(date) {
              return <RACCalendarCell date={date} className={styles.cell} />;
            }}
          </RACCalendarGrid>
        </Flex>
      </Flex>
    </RACRangeCalendar>
  );
}
