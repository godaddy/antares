import { type CalendarDate, type DateDuration } from '@internationalized/date';
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
import { MonthHeading, NavButton } from './CalendarHeader.tsx';
import styles from './index.module.css';
import { cx } from 'cva';

interface CalendarGridProps extends RACCalendarGridProps {
  /** The type of the calendar grid. */
  type: 'single' | 'range';
}

/**
 * The grid of a single visible month.
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

/** Number of month grids to render for a given visible duration (at least one). */
function getMonthCount(visibleDuration: DateDuration | undefined, fallback: number): number {
  return Math.max(1, visibleDuration?.months ?? fallback);
}

/**
 * Shared calendar body: a row of month columns — each an offset-aware {@link MonthHeading} stacked
 * over its {@link CalendarGrid} — flanked by a shared previous/next {@link NavButton} pair.
 * `alignItems="start"` keeps the arrows level with the headings; each month column stretches its
 * heading to the grid's width, so every heading sits directly above its own grid.
 *
 * @param props.type - Visual style forwarded to each grid's cells.
 * @param props.months - Number of month grids to render.
 */
function CalendarBody(props: { type: 'single' | 'range'; months: number }) {
  const { type, months } = props;

  return (
    <Flex direction="row" gap="sm" alignItems="start">
      <NavButton direction="previous" />
      <Flex direction="row" gap="lg">
        {Array.from({ length: months }, function renderMonth(_, offset) {
          return (
            <Flex key={offset} direction="column" gap="md">
              <MonthHeading offset={offset} />
              <CalendarGrid type={type} offset={{ months: offset }} />
            </Flex>
          );
        })}
      </Flex>
      <NavButton direction="next" />
    </Flex>
  );
}

export interface CalendarProps extends FlexOwnProps, RACCalendarProps<CalendarDate> {
  /** Additional class names merged onto the calendar root. */
  className?: string;
}

/**
 * Standalone single-date calendar grid built on React Aria's Calendar. Date-only (`CalendarDate`).
 * Renders one month by default; pass `visibleDuration={{ months: n }}` to show more.
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
  const { className, visibleDuration, ...rest } = props;
  const months = getMonthCount(visibleDuration, 1);

  return (
    <Flex
      direction="column"
      gap="md"
      {...rest}
      visibleDuration={visibleDuration}
      as={RACCalendar<CalendarDate>}
      className={cx(styles.calendar, className)}
    >
      <CalendarBody type="single" months={months} />
    </Flex>
  );
}

export interface RangeCalendarProps extends FlexOwnProps, RACRangeCalendarProps<CalendarDate> {
  /** Additional class names merged onto the calendar root. */
  className?: string;
}

/**
 * Standalone range calendar grid built on React Aria's RangeCalendar. Date-only (`CalendarDate`).
 * Shows two months by default; pass `visibleDuration={{ months: n }}` to override.
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
  const { className, visibleDuration, ...rest } = props;
  const resolvedDuration = visibleDuration ?? { months: 2 };
  const months = getMonthCount(resolvedDuration, 2);

  return (
    <Flex
      direction="column"
      gap="md"
      {...rest}
      visibleDuration={resolvedDuration}
      as={RACRangeCalendar<CalendarDate>}
      className={cx(styles.calendar, className)}
    >
      <CalendarBody type="range" months={months} />
    </Flex>
  );
}
