import {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type SetStateAction
} from 'react';
import {
  endOfMonth,
  isSameMonth,
  startOfMonth,
  toCalendar,
  toCalendarDate,
  type CalendarDate
} from '@internationalized/date';
import {
  Calendar as RACCalendar,
  RangeCalendar as RACRangeCalendar,
  CalendarHeading as RACCalendarHeading,
  CalendarStateContext as RACCalendarStateContext,
  RangeCalendarStateContext as RACRangeCalendarStateContext,
  CalendarContext as RACCalendarContext,
  RangeCalendarContext as RACRangeCalendarContext,
  useSlottedContext
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { sizeScaleClassName, useDeclaredSize } from '#components/size-provider';
import { composeClassName } from '#utils/render-props.ts';
import type { CalendarProps, RangeCalendarProps } from './index.tsx';
import { CalendarGrid, type CalendarGridProps } from './calendar-grid.tsx';
import { MonthControls } from './calendar-header.tsx';
import styles from './index.module.css';

/** Months added on each side of the focused month whenever scrolling nears an edge. */
const BUFFER = 3;

/** Months rendered as grids after the first visible one; others are sized placeholders. */
const AHEAD = 3;

/** Internal single-date calendar that scrolls through months inside a picker's drawer. */
export function ScrollCalendar({ className, ...props }: Omit<CalendarProps, 'pageCount'>) {
  const size = useDeclaredSize();
  const [months, setMonths] = useState(BUFFER * 2 + 1);
  return (
    <Flex
      as={RACCalendar<CalendarDate>}
      pageBehavior="single"
      {...props}
      selectionAlignment="center"
      visibleDuration={{ months }}
      direction="column"
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    >
      <MonthScroller type="single" months={months} setMonths={setMonths} />
    </Flex>
  );
}

/** Internal range calendar that scrolls through months inside a picker's drawer. */
export function ScrollRangeCalendar({ className, ...props }: Omit<RangeCalendarProps, 'pageCount'>) {
  const size = useDeclaredSize();
  const [months, setMonths] = useState(BUFFER * 2 + 1);
  return (
    <Flex
      as={RACRangeCalendar<CalendarDate>}
      pageBehavior="single"
      {...props}
      selectionAlignment="center"
      visibleDuration={{ months }}
      direction="column"
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    >
      <MonthScroller type="range" months={months} setMonths={setMonths} />
    </Flex>
  );
}

interface MonthScrollerProps extends Pick<CalendarGridProps, 'type'> {
  /** Months in React Aria's visible range. */
  months: number;

  /** Widens the visible range around the focused month. */
  setMonths: Dispatch<SetStateAction<number>>;
}

function MonthScroller({ type, months, setMonths }: MonthScrollerProps) {
  const calendarState = useContext(RACCalendarStateContext);
  const rangeState = useContext(RACRangeCalendarStateContext);
  const state = (calendarState ?? rangeState)!;
  const calendarProps = useSlottedContext(RACCalendarContext);
  const rangeProps = useSlottedContext(RACRangeCalendarContext);
  // A pending range narrows the state's bounds, so months are filtered by the calendar's own props.
  const { minValue, maxValue } = calendarProps ?? rangeProps ?? {};
  const viewport = useRef<HTMLDivElement>(null);
  const anchor = useRef<{ month: string; offset: number } | null>({
    month: startOfMonth(state.focusedDate).toString(),
    offset: 0
  });
  const [active, setActive] = useState(() => startOfMonth(state.focusedDate));

  const start = state.visibleRange.start;
  const offsets = Array.from({ length: months }, (_, offset) => offset).filter(function inBounds(offset) {
    const month = start.add({ months: offset });
    return !(minValue && endOfMonth(month).compare(minValue) < 0) && !(maxValue && month.compare(maxValue) > 0);
  });

  useLayoutEffect(
    function revealFocusedDate() {
      const root = viewport.current;
      const cell = root?.querySelector<HTMLElement>('[role="gridcell"] [tabindex="0"]');
      if (!root || !cell) return;
      const view = root.getBoundingClientRect();
      const date = cell.getBoundingClientRect();
      if (date.bottom <= view.top || date.top >= view.bottom) cell.scrollIntoView({ block: 'nearest' });
    },
    [state.focusedDate.toString()]
  );

  useLayoutEffect(function restoreAnchor() {
    const root = viewport.current;
    const target = anchor.current;
    const element = target && root?.querySelector(`[data-calendar-month="${target.month}"]`);
    if (!root || !element) return;
    const distance = () => element.getBoundingClientRect().top - root.getBoundingClientRect().top - target.offset;
    root.scrollTop += distance();
    // Keep the anchor until enough months exist around it to reach its position.
    if (Math.abs(distance()) < 1 || !grow(distance() < 0, distance() > 0)) anchor.current = null;
  });

  function grow(up: boolean, down: boolean) {
    if (!(up && !state.isPreviousVisibleRangeInvalid()) && !(down && !state.isNextVisibleRangeInvalid())) return false;
    const focused = offsets.find((offset) => isSameMonth(start.add({ months: offset }), state.focusedDate)) ?? 0;
    setMonths(2 * (Math.max(focused, months - 1 - focused) + BUFFER) + 1);
    return true;
  }

  function scroll() {
    const root = viewport.current!;
    const top = root.getBoundingClientRect().top;
    const index = Array.from(root.children).findIndex((child) => child.getBoundingClientRect().bottom > top + 1);
    const element = root.children[index] as HTMLElement | undefined;
    if (!element) return;
    const month = start.add({ months: offsets[index] });
    if (!isSameMonth(month, active)) setActive(month);

    const remaining = root.scrollHeight - root.scrollTop - root.clientHeight;
    if (anchor.current || !grow(root.scrollTop < root.clientHeight, remaining < root.clientHeight)) return;
    anchor.current = { month: element.dataset.calendarMonth!, offset: element.getBoundingClientRect().top - top };
  }

  function navigate(next: CalendarDate) {
    let date = next;
    if (minValue && date.compare(minValue) < 0) date = toCalendar(toCalendarDate(minValue), date.calendar);
    if (maxValue && date.compare(maxValue) > 0) date = toCalendar(toCalendarDate(maxValue), date.calendar);
    anchor.current = { month: startOfMonth(date).toString(), offset: 0 };
    setActive(startOfMonth(date));
    state.setFocusedDate(date);
  }

  return (
    <>
      <Flex as="header" justifyContent="center" className={styles.scrollHeader}>
        <MonthControls date={active} onChange={navigate} />
      </Flex>
      <div ref={viewport} className={styles.monthViewport} onScroll={scroll}>
        {offsets.map(function renderMonth(offset) {
          const month = start.add({ months: offset });
          const isNear =
            isSameMonth(month, state.focusedDate) ||
            (month.compare(active.subtract({ months: 1 })) >= 0 && month.compare(active.add({ months: AHEAD })) <= 0);
          return (
            <div key={month.toString()} data-calendar-month={month.toString()} className={styles.month}>
              <RACCalendarHeading offset={{ months: offset }} className={styles.monthLabel} />
              {isNear ? (
                <CalendarGrid type={type} offset={{ months: offset }} />
              ) : (
                <div
                  className={styles.monthPlaceholder}
                  style={{ '--weeks': state.getWeeksInMonth(month) } as CSSProperties}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
