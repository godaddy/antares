import { type CalendarDate } from '@internationalized/date';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import {
  CalendarCell as RACCalendarCell,
  CalendarGrid as RACCalendarGrid,
  Calendar as RACCalendar,
  type CalendarProps as RACCalendarProps,
  RangeCalendar as RACRangeCalendar,
  type RangeCalendarProps as RACRangeCalendarProps,
  type CalendarGridProps as RACCalendarGridProps
} from 'react-aria-components';
import { CalendarHeader } from './CalendarHeader.tsx';
import styles from './index.module.css';
import { cx } from 'cva';

interface CalendarGridProps extends RACCalendarGridProps {
  /** The type of the calendar grid. */
  type: 'single' | 'range';
}

/**
 * The grid of the calendar.
 *
 * @param props - {@link CalendarGridProps} The props for the calendar grid.
 */
function CalendarGrid(props: CalendarGridProps) {
  const { className, type, ...rest } = props;

  return (
    <Box as={RACCalendarGrid} weekdayStyle="short" {...rest} className={cx(styles.grid, className)}>
      {(date) => (
        <Flex
          as={RACCalendarCell}
          date={date}
          alignItems="center"
          justifyContent="center"
          data-type={type}
          rounding={type === 'single' ? 'full' : 'lg'}
          className={styles.cell}
        />
      )}
    </Box>
  );
}

export interface CalendarProps extends FlexOwnProps, RACCalendarProps<CalendarDate> {
  /** Additional class names merged onto the calendar root. */
  className?: string;
}

/**
 * Standalone single-date calendar grid built on React Aria's Calendar. Date-only (`CalendarDate`).
 * Used on its own or inside `DatePicker`'s popover.
 *
 * @param props - {@link CalendarProps} The props for the calendar.
 *
 * @example
 * ```tsx
 * <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} />
 * ```
 */
export function Calendar(props: CalendarProps) {
  const { className, ...rest } = props;
  return (
    <Flex
      direction="column"
      gap="md"
      {...rest}
      as={RACCalendar<CalendarDate>}
      className={cx(styles.calendar, className)}
      // selectionMode="single"
      // visibleDuration={{ months: 3 }}
    >
      <CalendarHeader />
      <CalendarGrid type="single" />
    </Flex>
  );
}

export interface RangeCalendarProps extends FlexOwnProps, RACRangeCalendarProps<CalendarDate> {
  /** Additional class names merged onto the calendar root. */
  className?: string;
}

/**
 * Standalone range calendar grid built on React Aria's RangeCalendar. Date-only (`CalendarDate`).
 * Used on its own or inside `DateRangePicker`'s popover.
 *
 * @param props - {@link RangeCalendarProps} The props for the range calendar.
 *
 * @example
 * ```tsx
 * <RangeCalendar aria-label="Trip dates" />
 * ```
 */
export function RangeCalendar(props: RangeCalendarProps) {
  const { className, ...rest } = props;
  return (
    <Flex
      direction="column"
      gap="md"
      {...rest}
      as={RACRangeCalendar<CalendarDate>}
      className={cx(styles.calendar, className)}
    >
      <CalendarHeader />
      <CalendarGrid type="range" />
    </Flex>
  );
}
