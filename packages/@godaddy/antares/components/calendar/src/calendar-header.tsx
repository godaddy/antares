import { Icon } from '#components/icon';
import { Flex } from '#components/layout/flex';
import { Input } from '#components/input';
import { NumberField } from '#components/number-field';
import { Select, SelectItem, SelectValue } from '#components/select';
import { Content, Group } from '#components/structure';
import { Popover } from '#components/popover';
import { ListBox } from '#components/listbox';
import { Button } from '#components/button';
import {
  type CalendarDate,
  type DateValue,
  DateFormatter,
  getLocalTimeZone,
  toCalendar
} from '@internationalized/date';
import { useCallback, useContext, useMemo, useState } from 'react';
import {
  CalendarStateContext as RACCalendarStateContext,
  RangeCalendarStateContext as RACRangeCalendarStateContext,
  useLocale,
  type Key as RACKey
} from 'react-aria-components';
import styles from './index.module.css';

/**
 * Previous/next navigation arrow (RAC `slot`). `hidden` renders an inert, space-retaining
 * placeholder so inward-facing arrows in a multi-month layout keep the controls centered.
 */
export function NavButton(props: { direction: 'previous' | 'next'; hidden?: boolean }) {
  const { direction, hidden = false } = props;
  // Slot is always set (RAC requires it); navHidden's visibility:hidden makes the placeholder inert.
  return (
    <Button
      slot={direction}
      aria-label={direction === 'previous' ? 'Previous' : 'Next'}
      className={hidden ? styles.navHidden : undefined}
    >
      <Icon icon={direction === 'previous' ? 'chevron-left' : 'chevron-right'} />
    </Button>
  );
}

/**
 * Editable month/year controls for the month `offset` months into the visible range. Subtracting
 * `offset` on change keeps the edit anchored to the first visible month.
 */
export function MonthHeading(props: { offset: number }) {
  const { offset } = props;
  const calendarState = useContext(RACCalendarStateContext);
  const rangeState = useContext(RACRangeCalendarStateContext);
  const state = calendarState ?? rangeState;
  if (!state) return null;

  return (
    <MonthControls
      date={state.visibleRange.start.add({ months: offset })}
      minValue={state.minValue?.add({ months: offset })}
      maxValue={state.maxValue}
      onChange={function changeMonth(date) {
        state.setFocusedDate(date.subtract({ months: offset }));
      }}
    />
  );
}

interface MonthControlsProps {
  /** Month displayed by the controls. */
  date: CalendarDate;

  /** Earliest navigable date. */
  minValue?: DateValue | null;

  /** Latest navigable date. */
  maxValue?: DateValue | null;

  /** Navigate after a month selection or committed year edit. */
  onChange: (date: CalendarDate) => void;
}

export function MonthControls({ date: displayDate, minValue, maxValue, onChange }: MonthControlsProps) {
  const { locale } = useLocale();
  const [editingYear, setEditingYear] = useState<number | null>(null);
  const min = minValue && toCalendar(minValue, displayDate.calendar);
  const max = maxValue && toCalendar(maxValue, displayDate.calendar);
  const monthNames = useMemo(
    function computeMonthNames() {
      const formatter = new DateFormatter(locale, { month: 'long', calendar: displayDate.calendar.identifier });
      return Array.from({ length: displayDate.calendar.getMonthsInYear(displayDate) }, function monthName(_, index) {
        return formatter.format(displayDate.set({ month: index + 1, day: 1 }).toDate(getLocalTimeZone()));
      });
    },
    [locale, displayDate]
  );

  const handleMonthChange = useCallback(
    function handleMonthChange(key: RACKey | null) {
      if (key !== null) onChange(displayDate.set({ month: Number(key) }));
    },
    [displayDate, onChange]
  );

  const handleYearChange = useCallback(
    function handleYearChange(year: number) {
      if (Number.isFinite(year)) {
        setEditingYear(year);
        onChange(displayDate.set({ year }));
      }
    },
    [displayDate, onChange]
  );

  return (
    <Flex direction="row" gap="sm" alignItems="center" justifyContent="center" wrap="wrap">
      <Select aria-label="Month" value={String(displayDate.month)} onChange={handleMonthChange}>
        <Group alignItems="center">
          <Button slot="trigger">
            <SelectValue />
            <Icon icon="chevron-down" />
          </Button>
        </Group>
        <Popover hideArrow>
          <Content blockPadding="xs" inlinePadding="0">
            <ListBox>
              {monthNames.map(function mapMonthNames(name, index) {
                return (
                  <SelectItem key={index + 1} id={String(index + 1)}>
                    {name}
                  </SelectItem>
                );
              })}
            </ListBox>
          </Content>
        </Popover>
      </Select>
      <NumberField
        aria-label="Year"
        formatOptions={{ useGrouping: false }}
        value={editingYear ?? displayDate.year}
        minValue={min?.era === displayDate.era ? min.year : 1}
        maxValue={max?.era === displayDate.era ? max.year : displayDate.calendar.getYearsInEra(displayDate)}
        onFocus={function beginEdit() {
          setEditingYear(displayDate.year);
        }}
        onBlur={function finishEdit() {
          setEditingYear(null);
        }}
        onChange={handleYearChange}
        className={styles.yearField}
      >
        <Input />
      </NumberField>
    </Flex>
  );
}
