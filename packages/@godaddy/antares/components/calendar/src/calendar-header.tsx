import type { CalendarDate } from '@internationalized/date';
import { useContext } from 'react';
import {
  Button as RACButton,
  CalendarMonthPicker as RACCalendarMonthPicker,
  CalendarStateContext,
  CalendarYearPicker as RACCalendarYearPicker,
  RangeCalendarStateContext
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { Select, SelectItem } from '#components/select';
import styles from './index.module.css';

type CalendarHeaderPosition = 'single' | 'left' | 'right';

interface CalendarHeaderProps {
  /** `'left'` / `'right'` for the two grids of `RangeCalendar`; `'single'` for `Calendar`. */
  position?: CalendarHeaderPosition;
}

/**
 * Calendar header: prev/next nav + Month + Year `Select` dropdowns powered by RAC's
 * `<CalendarMonthPicker>` / `<CalendarYearPicker>` rendered into the antares `Select`.
 *
 * Pickers read state via context. We feed them a shallow copy of the RAC state with
 * `focusedDate` pinned to `state.visibleRange.start` (plus a one-month offset for
 * `position='right'`) so the dropdowns track the grid month, not the focus.
 * `setFocusedDate` is translated back so picking a value scrolls both grids together.
 */
export function CalendarHeader({ position = 'single' }: CalendarHeaderProps) {
  const calendarState = useContext(CalendarStateContext);
  const rangeState = useContext(RangeCalendarStateContext);
  const baseState = calendarState ?? rangeState;
  const monthOffset = position === 'right' ? 1 : 0;

  if (!baseState) return null;

  const pickerState = {
    ...baseState,
    focusedDate: baseState.visibleRange.start.add({ months: monthOffset }),
    setFocusedDate(date: CalendarDate) {
      baseState.setFocusedDate(date.subtract({ months: monthOffset }));
    }
  };

  const showPrev = position !== 'right';
  const showNext = position !== 'left';

  const headerContent = (
    <Flex gap="sm" alignItems="center" className={styles.header}>
      {showPrev && (
        <RACButton slot="previous" className={styles.navButton} aria-label="Previous">
          <Icon icon="chevron-left" />
        </RACButton>
      )}
      <RACCalendarMonthPicker format="long">
        {function renderMonthPicker(picker) {
          return (
            <Select
              aria-label={picker['aria-label']}
              selectedKey={picker.value}
              onSelectionChange={picker.onChange}
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
      <RACCalendarYearPicker>
        {function renderYearPicker(picker) {
          return (
            <Select
              aria-label={picker['aria-label']}
              selectedKey={picker.value}
              onSelectionChange={picker.onChange}
              className={styles.headerSelect}
            >
              {picker.items.map(function renderYearItem(item) {
                return (
                  <SelectItem key={item.id} id={item.id} textValue={item.formatted}>
                    {item.formatted}
                  </SelectItem>
                );
              })}
            </Select>
          );
        }}
      </RACCalendarYearPicker>
      {showNext && (
        <RACButton slot="next" className={styles.navButton} aria-label="Next">
          <Icon icon="chevron-right" />
        </RACButton>
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
