import { useContext, useLayoutEffect, useRef } from 'react';
import type { CalendarDate } from '@internationalized/date';
import {
  Calendar as RACCalendar,
  RangeCalendar as RACRangeCalendar,
  CalendarHeading as RACCalendarHeading,
  CalendarStateContext as RACCalendarStateContext,
  RangeCalendarStateContext as RACRangeCalendarStateContext
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { sizeScaleClassName, useDeclaredSize } from '#components/size-provider';
import { composeClassName } from '#utils/render-props.ts';
import type { CalendarProps, RangeCalendarProps } from './index.tsx';
import { CalendarGrid, type CalendarGridProps } from './calendar-grid.tsx';
import { MonthControls, NavButton } from './calendar-header.tsx';
import styles from './index.module.css';

/** Internal single-date calendar laid out vertically inside a picker's drawer. */
export function ScrollCalendar({ pageCount = 3, className, ...props }: CalendarProps) {
  const size = useDeclaredSize();
  return (
    <Flex
      as={RACCalendar<CalendarDate>}
      selectionAlignment="start"
      {...props}
      direction="column"
      visibleDuration={{ months: pageCount }}
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    >
      <ScrollCalendarBody type="single" pageCount={pageCount} />
    </Flex>
  );
}

/** Internal range calendar with React Aria's selection and navigation behavior. */
export function ScrollRangeCalendar({ pageCount = 3, className, ...props }: RangeCalendarProps) {
  const size = useDeclaredSize();
  return (
    <Flex
      as={RACRangeCalendar<CalendarDate>}
      selectionAlignment="start"
      {...props}
      direction="column"
      visibleDuration={{ months: pageCount }}
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    >
      <ScrollCalendarBody type="range" pageCount={pageCount} />
    </Flex>
  );
}

interface ScrollCalendarBodyProps extends Pick<CalendarGridProps, 'type'> {
  /** Number of month grids on the current page. */
  pageCount: number;
}

function ScrollCalendarBody({ type, pageCount }: ScrollCalendarBodyProps) {
  const calendarState = useContext(RACCalendarStateContext);
  const rangeState = useContext(RACRangeCalendarStateContext);
  const state = calendarState ?? rangeState;
  const viewport = useRef<HTMLDivElement>(null);
  const focusedDate = state?.focusedDate.toString();

  useLayoutEffect(
    function revealFocusedDate() {
      const root = viewport.current;
      const cell = focusedDate && root?.querySelector<HTMLElement>('[tabindex="0"]');
      if (!root || !cell) return;
      const view = root.getBoundingClientRect();
      const date = cell.getBoundingClientRect();
      // Reveal off-screen focus without moving visible cells during pointer interaction.
      if (date.bottom <= view.top || date.top >= view.bottom) cell.scrollIntoView({ block: 'nearest' });
    },
    [focusedDate]
  );

  if (!state) return null;

  return (
    <>
      <Flex as="header" justifyContent="center" className={styles.scrollHeader}>
        <MonthControls
          date={state.focusedDate}
          minValue={state.minValue}
          maxValue={state.maxValue}
          onChange={state.setFocusedDate}
        />
      </Flex>
      <div ref={viewport} className={styles.monthViewport}>
        {Array.from({ length: pageCount }, function renderMonth(_, offset) {
          const month = state.visibleRange.start.add({ months: offset });
          return (
            <div key={month.toString()} data-calendar-month={month.toString()}>
              <RACCalendarHeading offset={{ months: offset }} className={styles.monthLabel} />
              <CalendarGrid type={type} offset={{ months: offset }} />
            </div>
          );
        })}
      </div>
      <Flex as="footer" justifyContent="space-between" className={styles.scrollHeader}>
        <NavButton direction="previous" />
        <NavButton direction="next" />
      </Flex>
    </>
  );
}
