import type { CalendarDate } from '@internationalized/date';
import { useContext } from 'react';
import {
  CalendarMonthPicker as RACCalendarMonthPicker,
  CalendarStateContext,
  RangeCalendarStateContext,
  useLocale
} from 'react-aria-components';
import { Button } from '#components/button';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { NumberField } from '#components/number-field';
import { Select, SelectItem } from '#components/select';
import styles from './index.module.css';

interface CalendarHeaderProps {
  /**
   * `'start'` / `'end'` for the two grids of `RangeCalendar`. Omit for the single
   * grid of `Calendar`. Names match the range value (`{ start, end }`) and are
   * locale-direction-agnostic — in RTL the start grid renders on the right.
   */
  range?: 'start' | 'end';
}

/**
 * Header with prev/next + Month/Year selects, powered by RAC's `<CalendarMonthPicker>` /
 * `<CalendarYearPicker>` rendered through the antares `Select`.
 *
 * RAC's pickers read state from context and key off `focusedDate`. We pin `focusedDate`
 * to `visibleRange.start` (plus a one-month offset for `range='end'`) and translate
 * `setFocusedDate` back, so the dropdowns track the visible month and selecting on
 * either side scrolls both grids together.
 *
 * Chevron icons flip in RTL so "previous" always points opposite the reading direction.
 */
export function CalendarHeader({ range }: CalendarHeaderProps) {
  const calendarState = useContext(CalendarStateContext);
  const rangeState = useContext(RangeCalendarStateContext);
  const baseState = calendarState ?? rangeState;
  const { direction } = useLocale();
  const monthOffset = range === 'end' ? 1 : 0;

  if (!baseState) return null;

  const pickerState = {
    ...baseState,
    focusedDate: baseState.visibleRange.start.add({ months: monthOffset }),
    setFocusedDate(date: CalendarDate) {
      baseState.setFocusedDate(date.subtract({ months: monthOffset }));
    }
  };

  const showPrev = range !== 'end';
  const showNext = range !== 'start';
  const isRtl = direction === 'rtl';

  const headerContent = (
    <Flex gap="sm" alignItems="center" className={styles.header}>
      {showPrev && (
        <Button slot="previous" variant="minimal" size="sm" aria-label="Previous">
          <Icon icon={isRtl ? 'chevron-right' : 'chevron-left'} />
        </Button>
      )}
      <RACCalendarMonthPicker format="long">
        {function renderMonthPicker(picker) {
          return (
            <Select
              aria-label={picker['aria-label']}
              value={picker.value}
              onChange={picker.onChange}
              className={styles.headerSelect}
            >
              {picker.items.map(function renderMonthItem(item) {
                return (
                  <SelectItem key={item.id} id={item.id} textValue={item.formatted}>
                    {item.formatted}
                  </SelectItem>
                );
              })}
            </Select>
          );
        }}
      </RACCalendarMonthPicker>
      <NumberField
        aria-label="Year"
        hideStepper
        formatOptions={{ useGrouping: false }}
        value={pickerState.focusedDate.year}
        minValue={baseState.minValue?.year}
        maxValue={baseState.maxValue?.year}
        onChange={function handleYearChange(year) {
          if (Number.isNaN(year)) return;
          pickerState.setFocusedDate(pickerState.focusedDate.set({ year }));
        }}
        className={styles.headerYear}
      />
      {showNext && (
        <Button slot="next" variant="minimal" size="sm" aria-label="Next">
          <Icon icon={isRtl ? 'chevron-left' : 'chevron-right'} />
        </Button>
      )}
    </Flex>
  );

  if (calendarState) {
    return (
      <CalendarStateContext.Provider value={pickerState as typeof calendarState}>
        {headerContent}
      </CalendarStateContext.Provider>
    );
  }
  return (
    <RangeCalendarStateContext.Provider value={pickerState as typeof rangeState}>
      {headerContent}
    </RangeCalendarStateContext.Provider>
  );
}
