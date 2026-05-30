import type { CalendarDate } from '@internationalized/date';
import { useContext, useMemo } from 'react';
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

/**
 * Position of this header within its parent calendar.
 *
 * - `'single'` — both prev/next arrows. Used by single-month `Calendar`.
 * - `'left'` — prev arrow only. Used by the left grid of `RangeCalendar`.
 * - `'right'` — next arrow only, dropdowns reflect the second visible month.
 *   Used by the right grid of `RangeCalendar`.
 */
type CalendarHeaderPosition = 'single' | 'left' | 'right';

interface CalendarHeaderProps {
  position?: CalendarHeaderPosition;
}

/**
 * Renders a calendar header with prev/next nav and Month + Year `Select` dropdowns.
 *
 * The pickers are powered by RAC's `<CalendarMonthPicker>` / `<CalendarYearPicker>`,
 * which expose `{ aria-label, value, onChange, items }` via render props. We spread
 * those into our `Select` so styling stays in the antares design system while RAC
 * owns locale-aware month formatting and year-range derivation.
 *
 * For `position='right'` the picker components read a state proxy that shifts
 * `focusedDate` forward by one month and translates `setFocusedDate` back, so the
 * right-side dropdowns reflect the second visible month and selecting a value
 * scrolls both grids together.
 */
export function CalendarHeader({ position = 'single' }: CalendarHeaderProps) {
  const calendarState = useContext(CalendarStateContext);
  const rangeState = useContext(RangeCalendarStateContext);
  const baseState = calendarState ?? rangeState;
  const monthOffset = position === 'right' ? 1 : 0;

  const shiftedState = useMemo(
    function buildShiftedState() {
      if (!baseState || monthOffset === 0) return baseState;
      return new Proxy(baseState, {
        get(target, prop, receiver) {
          if (prop === 'focusedDate') return target.focusedDate.add({ months: monthOffset });
          if (prop === 'setFocusedDate') {
            return function shiftedSetFocusedDate(date: CalendarDate) {
              target.setFocusedDate(date.subtract({ months: monthOffset }));
            };
          }
          return Reflect.get(target, prop, receiver);
        }
      });
    },
    [baseState, monthOffset]
  );

  if (!baseState) return null;

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

  if (monthOffset === 0) return headerContent;

  if (calendarState) {
    return (
      <CalendarStateContext.Provider value={shiftedState as typeof calendarState}>
        {headerContent}
      </CalendarStateContext.Provider>
    );
  }
  return (
    <RangeCalendarStateContext.Provider value={shiftedState as typeof rangeState}>
      {headerContent}
    </RangeCalendarStateContext.Provider>
  );
}
