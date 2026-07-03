import { Icon } from '#components/icon';
import { Flex } from '#components/layout/flex';
import { NumberField } from '#components/number-field';
import { Select, SelectItem } from '#components/select';
import { Button } from '#components/button';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { type ReactElement, useContext, useMemo } from 'react';
import {
  CalendarStateContext as RACCalendarStateContext,
  RangeCalendarStateContext as RACRangeCalendarStateContext,
  useLocale
} from 'react-aria-components';
import styles from './index.module.css';

/**
 * Month `Select` + year `NumberField` header flanked by prev/next arrows. Reads whichever calendar
 * state context is present (Calendar or RangeCalendar) and moves the visible month via
 * `setFocusedDate`. Year is a typeable numeric input; month is a dropdown.
 */
export function CalendarHeader(): ReactElement {
  const calendarState = useContext(RACCalendarStateContext);
  const rangeState = useContext(RACRangeCalendarStateContext);
  const state = calendarState ?? rangeState;
  const { locale } = useLocale();
  const focusedDate = state?.focusedDate ?? null;

  // Localized month names for the dropdown; recompute only when locale or visible year changes.
  const monthNames = useMemo(
    function computeMonthNames() {
      const formatter = new DateFormatter(locale, { month: 'long' });
      const year = focusedDate?.year ?? 2024;
      return Array.from({ length: 12 }, (_, index) =>
        formatter.format(new CalendarDate(year, index + 1, 1).toDate(getLocalTimeZone()))
      );
    },
    [locale, focusedDate?.year]
  );

  if (!state || !focusedDate) {
    return <></>;
  }

  return (
    <Flex as="header" direction="row" justifyContent="space-between" gap="sm">
      <Button slot="previous" aria-label="Previous">
        <Icon icon="chevron-left" />
      </Button>

      <Flex direction="row" gap="sm">
        <Select
          aria-label="Month"
          value={String(focusedDate.month)}
          onChange={(key) => state.setFocusedDate(focusedDate.set({ month: Number(key) }))}
        >
          {monthNames.map((name, index) => (
            <SelectItem key={index + 1} id={String(index + 1)}>
              {name}
            </SelectItem>
          ))}
        </Select>
        <NumberField
          aria-label="Year"
          hideStepper
          formatOptions={{ useGrouping: false }}
          value={focusedDate.year}
          onChange={function handleYearChange(year) {
            if (!Number.isNaN(year)) {
              state.setFocusedDate(focusedDate.set({ year }));
            }
          }}
          className={styles.yearField}
        />
      </Flex>

      <Button slot="next" aria-label="Next">
        <Icon icon="chevron-right" />
      </Button>
    </Flex>
  );
}
