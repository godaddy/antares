import { useState } from 'react';
import { I18nProvider, useLocale } from 'react-aria';
import {
  Button,
  DatePicker,
  DatePickerCalendar,
  DateRangePicker,
  DateRangePickerCalendar,
  Label,
  type CalendarProps,
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

  /** Locale used by the calendar and its controls. */
  locale?: string;

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

  /** Number of months per page. */
  pageCount?: number;

  /** Amount to advance using the navigation buttons. */
  pageBehavior?: CalendarProps['pageBehavior'];

  /** React Aria's behavior when focus leaves an unfinished range. */
  commitBehavior?: RangeCalendarProps['commitBehavior'];

  /** Component size. */
  size?: ScaleSize;
}

/**
 * Below 40rem, the picker opens a scrolling drawer. Resize after closing to switch containers.
 * @title Mobile
 * @order 3
 */
export function MobileExample(props: MobileExampleProps) {
  return (
    <I18nProvider locale={props.locale}>
      <MobilePicker {...props} />
    </I18nProvider>
  );
}

function MobilePicker({
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
  pageCount,
  pageBehavior,
  commitBehavior,
  size
}: MobileExampleProps) {
  const { direction } = useLocale();
  const [selection, setSelection] = useState('');
  const [focus, setFocus] = useState(focusedDate);
  const [lastFocusedDate, setLastFocusedDate] = useState(focusedDate);
  if (lastFocusedDate !== focusedDate) {
    setLastFocusedDate(focusedDate);
    setFocus(focusedDate);
  }
  const calendarProps = {
    overlay,
    pageCount,
    pageBehavior,
    dir: direction,
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
