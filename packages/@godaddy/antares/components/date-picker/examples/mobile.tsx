import { useState } from 'react';
import {
  Button,
  DatePicker,
  DatePickerCalendar,
  DateRangePicker,
  DateRangePickerCalendar,
  Label,
  type RangeCalendarProps,
  type ScaleSize
} from '@godaddy/antares';
import { parseDate, type DateValue } from '@godaddy/antares/date';

interface MobileExampleProps {
  /** Whether to choose a range. */
  range?: boolean;

  /** Override responsive presentation. */
  overlay?: 'responsive' | 'popover';

  /** Start with the overlay open. */
  defaultOpen?: boolean;

  /** Controlled open state, when supplied. */
  isOpen?: boolean;

  /** Keep the overlay open after selection. */
  keepOpen?: boolean;

  /** Calendar focus supplied by the consumer. */
  focusedDate?: string;

  /** Initial focus when no controlled focus is supplied. */
  defaultFocusedDate?: string;

  /** Initial selection. */
  selectedDate?: string;

  /** Earliest selectable date. */
  min?: string;

  /** Latest selectable date. */
  max?: string;

  /** Mark the twentieth day of each month unavailable. */
  unavailable?: boolean;

  /** Allow a range to cross unavailable dates. */
  allowsNonContiguousRanges?: boolean;

  /** React Aria's behavior when an unfinished range loses focus. */
  commitBehavior?: RangeCalendarProps['commitBehavior'];

  /** Component size. */
  size?: ScaleSize;
}

/**
 * Responsive picker states exercised by tests.
 * @ignore
 */
export function MobileExample({
  range = false,
  overlay,
  defaultOpen,
  isOpen,
  keepOpen,
  focusedDate,
  defaultFocusedDate = '2026-09-15',
  selectedDate,
  min,
  max,
  unavailable,
  allowsNonContiguousRanges,
  commitBehavior,
  size
}: MobileExampleProps) {
  const [selection, setSelection] = useState('');
  const [focus, setFocus] = useState(focusedDate);
  const [lastFocusedDate, setLastFocusedDate] = useState(focusedDate);
  if (lastFocusedDate !== focusedDate) {
    setLastFocusedDate(focusedDate);
    setFocus(focusedDate);
  }
  const calendarProps = {
    overlay,
    focusedValue: focus ? parseDate(focus) : undefined,
    defaultFocusedValue: defaultFocusedDate ? parseDate(defaultFocusedDate) : undefined,
    onFocusChange: focus
      ? function changeFocus(date: ReturnType<typeof parseDate>) {
          setFocus(date.toString());
        }
      : undefined
  };
  const shared = {
    defaultOpen,
    isOpen,
    shouldCloseOnSelect: !keepOpen,
    minValue: min ? parseDate(min) : undefined,
    maxValue: max ? parseDate(max) : undefined,
    isDateUnavailable: unavailable
      ? function unavailableDate(date: DateValue) {
          return date.day === 20;
        }
      : undefined,
    size
  };
  const children = (
    <>
      <Label>Event dates</Label>
      <Button slot="trigger" />
      {range ? (
        <DateRangePickerCalendar
          {...calendarProps}
          allowsNonContiguousRanges={allowsNonContiguousRanges}
          commitBehavior={commitBehavior}
        />
      ) : (
        <DatePickerCalendar {...calendarProps} />
      )}
    </>
  );

  return (
    <>
      {range ? (
        <DateRangePicker
          {...shared}
          defaultValue={
            selectedDate ? { start: parseDate(selectedDate), end: parseDate(selectedDate).add({ days: 3 }) } : undefined
          }
          onChange={function selected(value) {
            setSelection(value ? `${value.start}/${value.end}` : '');
          }}
        >
          {children}
        </DateRangePicker>
      ) : (
        <DatePicker
          {...shared}
          defaultValue={selectedDate ? parseDate(selectedDate) : undefined}
          onChange={function selected(value) {
            setSelection(value?.toString() ?? '');
          }}
        >
          {children}
        </DatePicker>
      )}
      <output aria-label="Selected dates">{selection}</output>
    </>
  );
}
