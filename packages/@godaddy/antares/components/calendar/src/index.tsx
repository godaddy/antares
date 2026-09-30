import type { CalendarDate } from '@internationalized/date';
import { Flex, type FlexOwnProps, type FlexProps } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import {
  Calendar as RACCalendar,
  type CalendarProps as RACCalendarProps,
  RangeCalendar as RACRangeCalendar,
  type RangeCalendarProps as RACRangeCalendarProps
} from 'react-aria-components';
import { sizeScaleClassName, useDeclaredSize } from '#components/size-provider';
import { composeClassName } from '#utils/render-props.ts';
import { MonthHeading, NavButton } from './calendar-header.tsx';
import styles from './index.module.css';
import { CalendarGrid, type CalendarGridProps } from './calendar-grid.tsx';

export { ScrollCalendar, ScrollRangeCalendar } from './scroll-calendar.tsx';

export interface CalendarProps extends FlexOwnProps, RACCalendarProps<CalendarDate> {
  /** Number of month grids to display. @default 1 */
  pageCount?: number;
}

/**
 * Standalone single-date calendar grid built on React Aria's Calendar. Date-only (`CalendarDate`).
 * Renders one month by default; pass `pageCount={n}` to show more.
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
  const { className, pageCount = 1, ...rest } = props;
  const size = useDeclaredSize();
  const scale = sizeScaleClassName(size);

  return (
    <Flex
      direction="column"
      gap="md"
      {...rest}
      data-size={size}
      visibleDuration={{ months: pageCount }}
      as={RACCalendar<CalendarDate>}
      className={composeClassName(className, styles.calendar, scale)}
    >
      <CalendarBody type="single" pageCount={pageCount} />
    </Flex>
  );
}

export interface RangeCalendarProps extends FlexOwnProps, RACRangeCalendarProps<CalendarDate> {
  /** Number of month grids to display. @default 2 */
  pageCount?: number;
}

/**
 * Standalone range calendar grid built on React Aria's RangeCalendar. Date-only (`CalendarDate`).
 * Shows two months by default; pass `pageCount={n}` to override.
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
  const { className, pageCount = 2, ...rest } = props;
  const size = useDeclaredSize();
  const scale = sizeScaleClassName(size);

  return (
    <Flex
      direction="column"
      gap="md"
      {...rest}
      data-size={size}
      visibleDuration={{ months: pageCount }}
      as={RACRangeCalendar<CalendarDate>}
      className={composeClassName(className, styles.calendar, scale)}
    >
      <CalendarBody type="range" pageCount={pageCount} />
    </Flex>
  );
}

interface CalendarBodyProps extends Pick<CalendarGridProps, 'type'>, Pick<CalendarProps, 'pageCount'>, FlexProps {}

/**
 * Renders the calendar body. with previous/next arrows and the amount of months to render.
 */
function CalendarBody(props: CalendarBodyProps) {
  const { type, pageCount = 1, ...rest } = props;

  return (
    <Flex direction="row" gap="var(--_calendar-padding)" alignItems="stretch" wrap="wrap" {...rest}>
      {Array.from({ length: pageCount }).flatMap(function renderMonth(_, offset) {
        const showPrevious = offset === 0;
        const showNext = offset === pageCount - 1;
        const monthCard = (
          <Flex key={`month-${offset}`} direction="column" gap="var(--_calendar-padding)">
            <Flex as="header" direction="row" justifyContent="space-between" alignItems="center" gap="sm">
              <NavButton direction="previous" hidden={!showPrevious} />
              <MonthHeading offset={offset} />
              <NavButton direction="next" hidden={!showNext} />
            </Flex>
            <CalendarGrid type={type} offset={{ months: offset }} />
          </Flex>
        );

        return offset === 0
          ? [monthCard]
          : [
              <Box key={`divider-${offset}`} aria-hidden="true" className={styles.monthDivider} flexShrink={0} />,
              monthCard
            ];
      })}
    </Flex>
  );
}
