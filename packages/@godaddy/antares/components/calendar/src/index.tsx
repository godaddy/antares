import { cx } from 'cva';
import { type ReactElement, useContext, useMemo } from 'react';
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import {
  Button as RACButton,
  Calendar as RACCalendar,
  type CalendarProps as RACCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarStateContext,
  RangeCalendar as RACRangeCalendar,
  type RangeCalendarProps as RACRangeCalendarProps,
  RangeCalendarStateContext,
  useLocale
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { Select, SelectItem } from '#components/select';
import { NumberField } from '#components/number-field';
import styles from './index.module.css';

/**
 * Month `Select` + year `NumberField` header flanked by prev/next arrows. Reads whichever calendar
 * state context is present (Calendar or RangeCalendar) and moves the visible month via
 * `setFocusedDate`. Year is a typeable numeric input; month is a dropdown.
 */
function CalendarHeader(): ReactElement {
  const calendarState = useContext(CalendarStateContext);
  const rangeState = useContext(RangeCalendarStateContext);
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
    <Flex as="header" direction="row" alignItems="center" justifyContent="space-between" gap="sm">
      <RACButton slot="previous" aria-label="Previous" className={styles.navButton}>
        <Icon icon="chevron-left" />
      </RACButton>
      <Flex direction="row" alignItems="center" gap="xs">
        <Select
          aria-label="Month"
          size="sm"
          selectedKey={String(focusedDate.month)}
          onSelectionChange={(key) => state.setFocusedDate(focusedDate.set({ month: Number(key) }))}
        >
          {monthNames.map((name, index) => (
            <SelectItem key={index + 1} id={String(index + 1)}>
              {name}
            </SelectItem>
          ))}
        </Select>
        <NumberField
          aria-label="Year"
          size="sm"
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
      <RACButton slot="next" aria-label="Next" className={styles.navButton}>
        <Icon icon="chevron-right" />
      </RACButton>
    </Flex>
  );
}

function CalendarGridBody(): ReactElement {
  return (
    <CalendarGrid className={styles.grid}>
      {(date) => <CalendarCell date={date} className={styles.cell} />}
    </CalendarGrid>
  );
}

export interface CalendarProps extends Omit<RACCalendarProps<CalendarDate>, 'className'> {
  /** Additional class names merged onto the calendar root. */
  className?: string;
}

/**
 * Standalone single-date calendar grid built on React Aria's Calendar. Date-only (`CalendarDate`).
 * Used on its own or inside {@link DatePicker}'s popover.
 *
 * @example
 * ```tsx
 * <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} />
 * ```
 */
export function Calendar(props: CalendarProps): ReactElement {
  const { className, ...rest } = props;
  return (
    <RACCalendar {...rest} className={cx(styles.calendar, className)}>
      <CalendarHeader />
      <CalendarGridBody />
    </RACCalendar>
  );
}

export interface RangeCalendarProps extends Omit<RACRangeCalendarProps<CalendarDate>, 'className'> {
  /** Additional class names merged onto the calendar root. */
  className?: string;
}

/**
 * Standalone range calendar grid built on React Aria's RangeCalendar. Date-only (`CalendarDate`).
 * Used on its own or inside {@link DateRangePicker}'s popover.
 *
 * @example
 * ```tsx
 * <RangeCalendar aria-label="Trip dates" />
 * ```
 */
export function RangeCalendar(props: RangeCalendarProps): ReactElement {
  const { className, ...rest } = props;
  return (
    <RACRangeCalendar {...rest} className={cx(styles.calendar, className)}>
      <CalendarHeader />
      <CalendarGridBody />
    </RACRangeCalendar>
  );
}
