import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type Dispatch,
  type SetStateAction
} from 'react';
import {
  createCalendar,
  DateFormatter,
  endOfMonth,
  getWeeksInMonth,
  isSameMonth,
  startOfMonth,
  type CalendarDate,
  type DateValue
} from '@internationalized/date';
import { mergeProps, useCalendar, useRangeCalendar, VisuallyHidden } from 'react-aria';
import { filterDOMProps } from 'react-aria/filterDOMProps';
import { useCalendarState, useRangeCalendarState, type CalendarState, type RangeCalendarState } from 'react-stately';
import type { CalendarSelectionMode } from 'react-stately/useCalendarState';
import {
  CalendarStateContext,
  CalendarContext,
  RangeCalendarContext,
  RangeCalendarStateContext,
  useContextProps,
  useLocale,
  useRenderProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { sizeScaleClassName, useDeclaredSize } from '#components/size-provider';
import { composeClassName } from '#utils/render-props.ts';
import type { CalendarProps, RangeCalendarProps } from './index.tsx';
import { CalendarGrid } from './calendar-grid.tsx';
import { MonthControls } from './calendar-header.tsx';
import styles from './index.module.css';

const OVERSCAN = 3;
const WINDOW_MONTHS = 2 * OVERSCAN + 1;

function useDuration() {
  const [months, setMonths] = useState(WINDOW_MONTHS);
  const duration = useMemo(
    function duration() {
      return { months };
    },
    [months]
  );
  return { duration, setMonths };
}

/** Internal single-date view used by a picker's drawer. */
export function ScrollCalendar({ pageCount: _pageCount, className, ...props }: CalendarProps) {
  const size = useDeclaredSize();
  return (
    <Flex
      as={ScrollCalendarRoot}
      {...props}
      direction="column"
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    />
  );
}

function ScrollCalendarRoot(props: CalendarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [merged, ref] = useContextProps(props, rootRef, CalendarContext);
  const { locale } = useLocale();
  const { duration, setMonths } = useDuration();
  const state = useCalendarState({
    ...merged,
    locale,
    createCalendar: merged.createCalendar ?? createCalendar,
    visibleDuration: duration,
    selectionAlignment: 'center',
    pageBehavior: 'single'
  });
  const { calendarProps, nextButtonProps } = useCalendar(merged, state);
  const renderProps = useRenderProps({
    ...merged,
    values: { state, isDisabled: state.isDisabled, isInvalid: state.isValueInvalid },
    defaultClassName: ''
  });

  return (
    <CalendarContext.Provider value={{ firstDayOfWeek: merged.firstDayOfWeek, weeksInMonth: merged.weeksInMonth }}>
      <CalendarStateContext.Provider value={state}>
        <ScrollCalendarView
          {...mergeProps(filterDOMProps(merged, { global: true }), calendarProps)}
          ref={ref}
          aria-label={merged['aria-label']}
          aria-labelledby={merged['aria-labelledby']}
          style={renderProps.style}
          className={renderProps.className}
          state={state}
          type="single"
          bounds={merged}
          setMonths={setMonths}
          nextButtonProps={nextButtonProps}
        />
      </CalendarStateContext.Provider>
    </CalendarContext.Provider>
  );
}

interface ScrollRangeCalendarProps extends RangeCalendarProps {
  /** Clear an unfinished range when closing, even if the exit animation is interrupted. */
  isOpen: boolean;
}

/** Internal range view. Selection is completed by choosing an end date. */
export function ScrollRangeCalendar({ pageCount: _pageCount, className, ...props }: ScrollRangeCalendarProps) {
  const size = useDeclaredSize();
  return (
    <Flex
      as={ScrollRangeCalendarRoot}
      {...props}
      direction="column"
      data-size={size}
      className={composeClassName(className, styles.calendar, styles.scrollCalendar, sizeScaleClassName(size))}
    />
  );
}

function ScrollRangeCalendarRoot({ isOpen, ...props }: ScrollRangeCalendarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [merged, ref] = useContextProps(props, rootRef, RangeCalendarContext);
  const { locale } = useLocale();
  const { duration, setMonths } = useDuration();
  const state = useRangeCalendarState({
    ...merged,
    locale,
    createCalendar: merged.createCalendar ?? createCalendar,
    visibleDuration: duration,
    selectionAlignment: 'center',
    pageBehavior: 'single'
  });
  useEffect(
    function cancelOnClose() {
      if (!isOpen) state.setAnchorDate(null);
    },
    [isOpen, state.setAnchorDate]
  );
  const viewState = {
    ...state,
    // The hook calls this on background pointer-up and blur. Browsing must keep the pending range.
    commitSelection() {
      /* Cells complete the range through selectDate. */
    }
  };
  const { calendarProps, nextButtonProps } = useRangeCalendar({ ...merged, commitBehavior: 'select' }, viewState, ref);
  const renderProps = useRenderProps({
    ...merged,
    values: { state: viewState, isDisabled: state.isDisabled, isInvalid: state.isValueInvalid },
    defaultClassName: ''
  });

  return (
    <RangeCalendarContext.Provider value={{ firstDayOfWeek: merged.firstDayOfWeek, weeksInMonth: merged.weeksInMonth }}>
      <RangeCalendarStateContext.Provider value={viewState}>
        <ScrollCalendarView
          {...mergeProps(filterDOMProps(merged, { global: true }), calendarProps)}
          ref={ref}
          aria-label={merged['aria-label']}
          aria-labelledby={merged['aria-labelledby']}
          style={renderProps.style}
          className={renderProps.className}
          state={viewState}
          type="range"
          bounds={merged}
          setMonths={setMonths}
          nextButtonProps={nextButtonProps}
        />
      </RangeCalendarStateContext.Provider>
    </RangeCalendarContext.Provider>
  );
}

interface ScrollCalendarViewProps extends Omit<ComponentProps<'div'>, 'children'> {
  /** One shared owner of focus, selection, and a pending range. */
  state: CalendarState<CalendarSelectionMode> | RangeCalendarState;

  /** Original bounds, before a pending range narrows selectable dates. */
  bounds?: Pick<CalendarProps, 'minValue' | 'maxValue' | 'firstDayOfWeek' | 'weeksInMonth'>;

  /** Single or range cell presentation. */
  type: 'single' | 'range';

  /** Adjust the logical calendar range without tying grid identities to it. */
  setMonths: Dispatch<SetStateAction<number>>;

  /** Accessible next-page control supplied by React Aria. */
  nextButtonProps: ReturnType<typeof useCalendar>['nextButtonProps'];
}

interface MonthWindow {
  months: CalendarDate[];
  active: CalendarDate;
}

interface ScrollAnchor {
  month: string;
  offset: number;
  scrollTop: number;
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

function monthWindow(date: CalendarDate, min?: DateValue | null, max?: DateValue | null): MonthWindow {
  const months: CalendarDate[] = [];
  for (let offset = -OVERSCAN; offset <= OVERSCAN; offset++) {
    const month = startOfMonth(date.add({ months: offset }));
    if ((min && endOfMonth(month).compare(min) < 0) || (max && month.compare(max) > 0)) continue;
    if (
      !months.some(function exists(value) {
        return isSameMonth(value, month);
      })
    )
      months.push(month);
  }
  return { months, active: startOfMonth(date) };
}

function ScrollCalendarView({
  state,
  type,
  setMonths,
  bounds = {},
  nextButtonProps,
  ...props
}: ScrollCalendarViewProps) {
  const { locale } = useLocale();
  const headingId = useId();
  return (
    <div
      {...props}
      aria-label={undefined}
      aria-labelledby={[props['aria-labelledby'], headingId].filter(Boolean).join(' ')}
      data-disabled={state.isDisabled || undefined}
      data-invalid={state.isValueInvalid || undefined}
    >
      <MonthScroller
        key={`${locale}/${state.focusedDate.calendar.identifier}/${bounds.minValue}/${bounds.maxValue}/${bounds.firstDayOfWeek}/${bounds.weeksInMonth}`}
        state={state}
        type={type}
        setMonths={setMonths}
        bounds={bounds}
        headingId={headingId}
        label={props['aria-label']}
      />
      <VisuallyHidden>
        <button
          aria-label={nextButtonProps['aria-label']}
          disabled={nextButtonProps.isDisabled}
          tabIndex={-1}
          onClick={function nextPage() {
            state.focusNextPage();
          }}
        />
      </VisuallyHidden>
    </div>
  );
}

interface MonthScrollerProps extends Pick<ScrollCalendarViewProps, 'state' | 'type' | 'setMonths' | 'bounds'> {
  /** Heading that names the calendar's active month. */
  headingId: string;

  /** Optional consumer label to include before the active month. */
  label?: string;
}

function MonthScroller({ state, type, setMonths, bounds = {}, headingId, label }: MonthScrollerProps) {
  const { locale } = useLocale();
  const viewport = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ row: 0, chrome: 0 });
  const anchor = useRef<ScrollAnchor | null>(null);
  const visibleAnchor = useRef<ScrollAnchor | null>(null);
  const jump = useRef<CalendarDate | null>(state.focusedDate);
  const [window, setWindow] = useState(function initialWindow() {
    return monthWindow(state.focusedDate, bounds.minValue, bounds.maxValue);
  });
  const [lastFocus, setLastFocus] = useState(state.focusedDate);
  const formatter = useMemo(
    function monthFormatter() {
      return new DateFormatter(locale, {
        month: 'long',
        year: 'numeric',
        calendar: state.focusedDate.calendar.identifier
      });
    },
    [locale, state.focusedDate.calendar.identifier]
  );

  if (lastFocus.compare(state.focusedDate) !== 0) {
    setLastFocus(state.focusedDate);
    if (
      jump.current ||
      !window.months.some(function contains(date) {
        return isSameMonth(date, state.focusedDate);
      })
    ) {
      jump.current = state.focusedDate;
      setWindow(monthWindow(state.focusedDate, bounds.minValue, bounds.maxValue));
    }
  }

  const first = window.months[0] ?? startOfMonth(state.focusedDate);
  const last = window.months.at(-1) ?? first;
  const needed =
    2 * Math.max(Math.abs(monthDistance(state.focusedDate, first)), Math.abs(monthDistance(state.focusedDate, last))) +
    1;
  useLayoutEffect(
    function coverRenderedMonths() {
      setMonths(Math.max(WINDOW_MONTHS, needed));
    },
    [needed, setMonths]
  );

  function readAnchor(): ScrollAnchor | null {
    const root = viewport.current;
    if (!root) return null;
    const top = root.getBoundingClientRect().top;
    const element = Array.from(root.children).find(function visible(child) {
      return child.getBoundingClientRect().bottom > top + 1;
    }) as HTMLElement | undefined;
    return element
      ? {
          month: element.dataset.calendarMonth ?? '',
          offset: element.getBoundingClientRect().top - top,
          scrollTop: root.scrollTop
        }
      : null;
  }

  useLayoutEffect(function preservePosition() {
    const root = viewport.current;
    if (!root) return;
    const target = jump.current
      ? { month: startOfMonth(state.focusedDate).toString(), offset: 0, scrollTop: root.scrollTop }
      : anchor.current;
    if (target) {
      const element = Array.from(root.children).find(function matches(child) {
        return (child as HTMLElement).dataset.calendarMonth === target.month;
      });
      if (element) {
        // Preserve any additional scrolling that happened while React was rendering the next window.
        root.scrollTop +=
          element.getBoundingClientRect().top -
          root.getBoundingClientRect().top -
          target.offset +
          (root.scrollTop - target.scrollTop);
        visibleAnchor.current = readAnchor();
      }
    }
    jump.current = null;
    anchor.current = null;
  });

  useLayoutEffect(function measureMonths() {
    const month = viewport.current?.querySelector<HTMLElement>('[data-calendar-month]:has(table)');
    const table = month?.querySelector('table');
    const label = month?.firstElementChild;
    const rows = table?.tBodies[0]?.rows;
    if (!month || !table || !label || !rows?.length) return;
    function measure() {
      if (!table || !label || !rows) return;
      const gap = Number.parseFloat(getComputedStyle(table).borderSpacing.split(' ').at(-1) ?? '0');
      const row = rows[0].getBoundingClientRect().height + gap;
      const chrome = label.getBoundingClientRect().height + table.getBoundingClientRect().height - row * rows.length;
      if (Math.abs(metrics.row - row) < 0.1 && Math.abs(metrics.chrome - chrome) < 0.1) return;
      anchor.current ??= visibleAnchor.current ?? readAnchor();
      setMetrics({ row, chrome });
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(table);
    observer.observe(label);
    return function disconnect() {
      observer.disconnect();
    };
  });

  function scroll() {
    const current = readAnchor();
    if (!current) return;
    visibleAnchor.current = current;
    const index = window.months.findIndex(function matches(month) {
      return month.toString() === current.month;
    });
    const active = window.months[index];
    if (!active) return;
    const before =
      index < OVERSCAN
        ? monthWindow(first, bounds.minValue, bounds.maxValue).months.filter(function earlier(date) {
            return date.compare(first) < 0;
          })
        : [];
    const after =
      index >= window.months.length - OVERSCAN
        ? monthWindow(last, bounds.minValue, bounds.maxValue).months.filter(function later(date) {
            return date.compare(last) > 0;
          })
        : [];
    if (before.length || after.length || !isSameMonth(active, window.active)) {
      anchor.current = current;
      setWindow({ months: [...before, ...window.months, ...after], active });
    }
  }

  function navigate(date: CalendarDate) {
    state.setFocused(false);
    jump.current = date;
    state.setFocusedDate(date);
    // Also render if a controlled consumer rejects the requested focus.
    setWindow(monthWindow(state.focusedDate, bounds.minValue, bounds.maxValue));
  }

  const activeIndex = window.months.findIndex(function active(month) {
    return isSameMonth(month, window.active);
  });
  return (
    <>
      <VisuallyHidden>
        <h2 id={headingId}>
          {label && `${label}, `}
          {formatter.format(window.active.toDate(state.timeZone))}
        </h2>
      </VisuallyHidden>
      <Flex as="header" justifyContent="center" className={styles.scrollHeader}>
        <MonthControls date={window.active} minValue={bounds.minValue} maxValue={bounds.maxValue} onChange={navigate} />
      </Flex>
      <div ref={viewport} className={styles.monthViewport} onScroll={scroll}>
        {window.months.map(function renderMonth(month, index) {
          const mounted = Math.abs(index - activeIndex) < OVERSCAN || isSameMonth(month, state.focusedDate);
          // Keep the wrapper stable while grids mount; WebKit otherwise clamps scrollTop during the swap.
          return (
            <div
              key={month.toString()}
              data-calendar-month={month.toString()}
              className={styles.scrollMonth}
              style={
                metrics.row
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
                  <div className={styles.monthLabel}>{formatter.format(month.toDate(state.timeZone))}</div>
                  <CalendarGrid type={type} offset={{ months: monthDistance(state.visibleRange.start, month) }} />
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
