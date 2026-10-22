import {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ContextType,
  type Dispatch,
  type SetStateAction
} from 'react';
import {
  endOfMonth,
  getWeeksInMonth,
  isSameMonth,
  startOfMonth,
  type CalendarDate,
  type DateValue
} from '@internationalized/date';
import {
  Calendar as RACCalendar,
  RangeCalendar as RACRangeCalendar,
  CalendarHeading as RACCalendarHeading,
  CalendarStateContext as RACCalendarStateContext,
  RangeCalendarStateContext as RACRangeCalendarStateContext,
  CalendarContext as RACCalendarContext,
  RangeCalendarContext as RACRangeCalendarContext,
  useLocale,
  useSlottedContext
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { sizeScaleClassName, useDeclaredSize } from '#components/size-provider';
import { composeClassName } from '#utils/render-props.ts';
import type { CalendarProps, RangeCalendarProps } from './index.tsx';
import { CalendarGrid, type CalendarGridProps } from './calendar-grid.tsx';
import { MonthControls } from './calendar-header.tsx';
import styles from './index.module.css';

/** Internal single-date calendar laid out vertically inside a picker's drawer. */
export function ScrollCalendar({ pageCount = 3, className, ...props }: CalendarProps) {
  const size = useDeclaredSize();
  const [months, setMonths] = useState(pageCount * 2 + 1);
  return (
    <Flex
      as={RACCalendar<CalendarDate>}
      {...props}
      selectionAlignment="center"
      direction="column"
      visibleDuration={{ months }}
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    >
      <ScrollCalendarBody type="single" pageCount={pageCount} setMonths={setMonths} />
    </Flex>
  );
}

/** Internal range calendar with React Aria's selection and navigation behavior. */
export function ScrollRangeCalendar({
  pageCount = 3,
  className,
  commitBehavior = 'reset',
  ...props
}: RangeCalendarProps) {
  const size = useDeclaredSize();
  const [months, setMonths] = useState(pageCount * 2 + 1);
  return (
    <Flex
      as={RACRangeCalendar<CalendarDate>}
      {...props}
      selectionAlignment="center"
      commitBehavior={commitBehavior}
      direction="column"
      visibleDuration={{ months }}
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    >
      <ScrollCalendarBody type="range" pageCount={pageCount} setMonths={setMonths} />
    </Flex>
  );
}

interface ScrollCalendarBodyProps extends Pick<CalendarGridProps, 'type'> {
  /** Number of months to load on either side of the visible month. */
  pageCount: number;

  /** Keep React Aria's logical range large enough for the rendered months. */
  setMonths: Dispatch<SetStateAction<number>>;
}

interface ScrollAnchor {
  month: string;
  offset: number;
}

function monthDistance(from: CalendarDate, to: CalendarDate) {
  const direction = from.compare(to) <= 0 ? 1 : -1;
  let cursor = startOfMonth(from);
  let distance = 0;
  while (!isSameMonth(cursor, to)) {
    const next = cursor.add({ months: direction });
    if (isSameMonth(cursor, next)) break;
    cursor = next;
    distance += direction;
  }
  return distance;
}

function surroundingMonths(date: CalendarDate, count: number, min?: DateValue | null, max?: DateValue | null) {
  const months: CalendarDate[] = [];
  for (let offset = -count; offset <= count; offset++) {
    const month = startOfMonth(date.add({ months: offset }));
    if ((min && endOfMonth(month).compare(min) < 0) || (max && month.compare(max) > 0)) continue;
    if (!months.some((value) => isSameMonth(value, month))) months.push(month);
  }
  return months;
}

function ScrollCalendarBody({ type, pageCount, setMonths }: ScrollCalendarBodyProps) {
  const calendarState = useContext(RACCalendarStateContext);
  const rangeState = useContext(RACRangeCalendarStateContext);
  const calendarProps = useSlottedContext(RACCalendarContext);
  const rangeProps = useSlottedContext(RACRangeCalendarContext);
  const bounds = calendarProps ?? rangeProps ?? {};
  const state = calendarState ?? rangeState;
  const { locale } = useLocale();
  if (!state) return null;

  return (
    <MonthScroller
      key={`${locale}/${state.focusedDate.calendar.identifier}/${bounds.minValue}/${bounds.maxValue}/${bounds.firstDayOfWeek}/${bounds.weeksInMonth}`}
      state={state}
      bounds={bounds}
      type={type}
      pageCount={pageCount}
      setMonths={setMonths}
    />
  );
}

interface MonthScrollerProps extends ScrollCalendarBodyProps {
  /** Shared React Aria owner of focus and selection. */
  state:
    | NonNullable<ContextType<typeof RACCalendarStateContext>>
    | NonNullable<ContextType<typeof RACRangeCalendarStateContext>>;

  /** Original bounds and grid options, before pending ranges narrow selectable dates. */
  bounds: Pick<CalendarProps, 'minValue' | 'maxValue' | 'firstDayOfWeek' | 'weeksInMonth'>;
}

function MonthScroller({ state, bounds, type, pageCount, setMonths }: MonthScrollerProps) {
  const { locale } = useLocale();
  const count = Math.max(1, pageCount);
  const viewport = useRef<HTMLDivElement>(null);
  const anchor = useRef<ScrollAnchor | null>(null);
  const visibleAnchor = useRef<ScrollAnchor | null>(null);
  const scrollToFocus = useRef(true);
  const [metrics, setMetrics] = useState({ row: 0, chrome: 0 });
  const [window, setWindow] = useState(function initialMonths() {
    return {
      months: surroundingMonths(state.focusedDate, count, bounds.minValue, bounds.maxValue),
      active: startOfMonth(state.focusedDate)
    };
  });
  const [lastFocus, setLastFocus] = useState(state.focusedDate);
  if (lastFocus.compare(state.focusedDate) !== 0) {
    setLastFocus(state.focusedDate);
    if (!window.months.some((month) => isSameMonth(month, state.focusedDate))) {
      resetWindow(state.focusedDate);
    }
  }

  const first = window.months[0] ?? startOfMonth(state.focusedDate);
  const last = window.months.at(-1) ?? first;
  const focusedIndex = window.months.findIndex((month) => isSameMonth(month, state.focusedDate));
  const needed = 2 * Math.max(count, focusedIndex, window.months.length - 1 - focusedIndex) + 1;
  useLayoutEffect(
    function coverMonths() {
      setMonths(needed);
    },
    [needed, setMonths]
  );

  function readAnchor(): ScrollAnchor | null {
    const root = viewport.current;
    if (!root) return null;
    const top = root.getBoundingClientRect().top;
    const element = Array.from(root.children).find((child) => child.getBoundingClientRect().bottom > top + 1) as
      | HTMLElement
      | undefined;
    return element
      ? {
          month: element.dataset.calendarMonth!,
          offset: element.getBoundingClientRect().top - top
        }
      : null;
  }

  useLayoutEffect(function preservePosition() {
    const root = viewport.current;
    if (!root) return;
    const target = scrollToFocus.current
      ? { month: startOfMonth(state.focusedDate).toString(), offset: 0 }
      : anchor.current;
    if (target) {
      const element = Array.from(root.children).find(
        (child) => (child as HTMLElement).dataset.calendarMonth === target.month
      );
      if (element) {
        root.scrollTop += element.getBoundingClientRect().top - root.getBoundingClientRect().top - target.offset;
        visibleAnchor.current = readAnchor();
      }
    }
    scrollToFocus.current = false;
    anchor.current = null;
  });

  useLayoutEffect(function measureMonths() {
    const table = viewport.current?.querySelector('table');
    const month = table?.parentElement;
    const rows = table?.tBodies[0]?.rows;
    if (!table || !month || !rows?.length) return;
    function measure() {
      if (!table || !month || !rows) return;
      const gap = Number.parseFloat(getComputedStyle(table).borderSpacing.split(' ').at(-1) ?? '0');
      const row = rows[0].getBoundingClientRect().height + gap;
      const chrome = month.getBoundingClientRect().height - row * rows.length;
      if (Math.abs(metrics.row - row) < 0.5 && Math.abs(metrics.chrome - chrome) < 0.5) return;
      anchor.current ??= visibleAnchor.current ?? readAnchor();
      setMetrics({ row, chrome });
    }
    measure();
    let frame = 0;
    const observer = new ResizeObserver(function scheduleMeasurement() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(table);
    observer.observe(month);
    return function disconnect() {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  });

  useLayoutEffect(
    function revealFocusedDate() {
      const root = viewport.current;
      const cell = root?.querySelector<HTMLElement>('[tabindex="0"]');
      if (!root || !cell) return;
      const view = root.getBoundingClientRect();
      const date = cell.getBoundingClientRect();
      // Reveal off-screen focus without moving visible cells during pointer interaction.
      if (date.bottom <= view.top || date.top >= view.bottom) cell.scrollIntoView({ block: 'nearest' });
    },
    [state.focusedDate.toString()]
  );

  function scroll() {
    const current = readAnchor();
    if (!current) return;
    visibleAnchor.current = current;
    const index = window.months.findIndex((month) => month.toString() === current.month);
    const active = window.months[index];
    if (!active) return;
    const before =
      index < count
        ? surroundingMonths(first, count, bounds.minValue, bounds.maxValue).filter((month) => month.compare(first) < 0)
        : [];
    const after =
      index >= window.months.length - count - 1
        ? surroundingMonths(last, count, bounds.minValue, bounds.maxValue).filter((month) => month.compare(last) > 0)
        : [];
    if (before.length || after.length || !isSameMonth(active, window.active)) {
      anchor.current = current;
      setWindow({ months: [...before, ...window.months, ...after], active });
    }
  }

  function resetWindow(date: CalendarDate) {
    scrollToFocus.current = true;
    setWindow({
      months: surroundingMonths(date, count, bounds.minValue, bounds.maxValue),
      active: startOfMonth(date)
    });
  }

  function navigate(date: CalendarDate) {
    state.setFocusedDate(date);
    resetWindow(date);
  }

  const firstOffset = monthDistance(state.visibleRange.start, first);
  const activeIndex = window.months.findIndex((month) => isSameMonth(month, window.active));

  return (
    <>
      <Flex as="header" justifyContent="center" className={styles.scrollHeader}>
        <MonthControls date={window.active} minValue={bounds.minValue} maxValue={bounds.maxValue} onChange={navigate} />
      </Flex>
      <div ref={viewport} className={styles.monthViewport} onScroll={scroll}>
        {window.months.map(function renderMonth(month, index) {
          const mounted = Math.abs(index - activeIndex) < Math.max(2, count) || index === focusedIndex;
          const offset = firstOffset + index;
          return (
            <div
              key={month.toString()}
              data-calendar-month={month.toString()}
              className={styles.month}
              style={
                !mounted && metrics.row
                  ? {
                      blockSize:
                        metrics.chrome +
                        metrics.row * (bounds.weeksInMonth ?? getWeeksInMonth(month, locale, bounds.firstDayOfWeek))
                    }
                  : undefined
              }
            >
              {mounted && (
                <>
                  <RACCalendarHeading offset={{ months: offset }} className={styles.monthLabel} />
                  <CalendarGrid type={type} offset={{ months: offset }} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
