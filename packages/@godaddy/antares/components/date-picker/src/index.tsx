import { useContext, useMemo, type ReactNode } from 'react';
import { DateFormatter, getLocalTimeZone, type CalendarDate } from '@internationalized/date';
import {
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  type DatePickerRenderProps as RACDatePickerRenderProps,
  DatePickerStateContext,
  DateRangePicker as RACDateRangePicker,
  type DateRangePickerProps as RACDateRangePickerProps,
  type DateRangePickerRenderProps as RACDateRangePickerRenderProps,
  DateRangePickerStateContext,
  useLocale
} from 'react-aria-components';
import { Field, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { Button } from '#components/button';
import { Calendar, RangeCalendar } from '#components/calendar';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { Content, Group } from '#components/structure';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const DEFAULT_DATE_PLACEHOLDER = 'Select a date';
const DEFAULT_RANGE_PLACEHOLDER = 'Select dates';

/** The trigger both pickers present: a calendar `Icon` beside the formatted value. */
function PickerControl({ children }: { children: ReactNode }) {
  return (
    <Group alignItems="center">
      <Button slot="trigger">
        <Icon icon="calendar" />
        {children}
      </Button>
    </Group>
  );
}

/** The popover both pickers open, holding the `Calendar` or `RangeCalendar` the field inserts. */
function PickerOverlay({ children }: { children: ReactNode }) {
  return (
    <Popover hideArrow>
      <Content>{children}</Content>
    </Popover>
  );
}

/** The trigger label's formatter, following the active locale. */
function useTriggerFormatter(formatOptions: Intl.DateTimeFormatOptions) {
  const { locale } = useLocale();

  return useMemo(
    function getFormatter() {
      return new DateFormatter(locale, formatOptions);
    },
    [locale, formatOptions]
  );
}

export interface DatePickerProps extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'size'>, FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /**
   * The interior: a `Label`, an optional `Text slot="description"` and `FieldError`, and whichever
   * of the trigger and the calendar popover you want to customize. Pass a function to read state
   * such as `isOpen` while composing.
   */
  children: ReactNode | ((renderProps: RACDatePickerRenderProps) => ReactNode);
}

/**
 * DatePicker shows a read-only formatted date label; the whole field opens a calendar popover for
 * selection. Date-only (`CalendarDate`). Write the pieces you want to customize - a `Label`, a
 * `Text slot="description"`, a `FieldError`, a `DatePickerControl` to set the label format, or a
 * `Group` / `Popover` interior of your own - and the field fills in the trigger and the calendar it
 * doesn't find, in the order you wrote them.
 *
 * @param props - {@link DatePickerProps}
 *
 * @example
 * ```tsx
 * <DatePicker>
 *   <Label>Event date</Label>
 * </DatePicker>
 * ```
 */
export function DatePicker(props: DatePickerProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field
      as={RACDatePicker as typeof RACDatePicker<CalendarDate>}
      interior="box"
      size={size}
      slots={{
        control: <DatePickerControl />,
        overlay: (
          <PickerOverlay>
            <Calendar />
          </PickerOverlay>
        )
      }}
      {...racProps}
    >
      {children}
    </Field>
  );
}

export interface DatePickerControlProps {
  /** Intl.DateTimeFormat options for the trigger label. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no date is selected. @default 'Select a date' */
  placeholder?: string;
}

/**
 * Preset trigger for `DatePicker`: a `Group` with a calendar `Icon` and the current
 * `DatePickerValue`. `DatePicker` inserts it when the interior has no control of its own - write it
 * explicitly to set `formatOptions` or `placeholder`.
 *
 * @param props - {@link DatePickerControlProps}
 */
export function DatePickerControl({ formatOptions, placeholder }: DatePickerControlProps) {
  return (
    <PickerControl>
      <DatePickerValue formatOptions={formatOptions} placeholder={placeholder} />
    </PickerControl>
  );
}

export interface DateRangePickerProps
  extends Omit<RACDateRangePickerProps<CalendarDate>, 'children' | 'size'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /**
   * The interior: a `Label`, an optional `Text slot="description"` and `FieldError`, and whichever
   * of the trigger and the calendar popover you want to customize. Pass a function to read state
   * such as `isOpen` while composing.
   */
  children: ReactNode | ((renderProps: RACDateRangePickerRenderProps) => ReactNode);
}

/**
 * DateRangePicker shows a read-only `start - end` label; the whole field opens a range calendar
 * popover. Date-only (`CalendarDate`). Write the pieces you want to customize - a `Label`, a
 * `Text slot="description"`, a `FieldError`, a `DateRangePickerControl` to set the label format, or
 * a `Group` / `Popover` interior of your own - and the field fills in the trigger and the calendar
 * it doesn't find, in the order you wrote them.
 *
 * @param props - {@link DateRangePickerProps}
 *
 * @example
 * ```tsx
 * <DateRangePicker>
 *   <Label>Trip dates</Label>
 * </DateRangePicker>
 * ```
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field
      as={RACDateRangePicker as typeof RACDateRangePicker<CalendarDate>}
      interior="box"
      size={size}
      slots={{
        control: <DateRangePickerControl />,
        overlay: (
          <PickerOverlay>
            <RangeCalendar />
          </PickerOverlay>
        )
      }}
      {...racProps}
    >
      {children}
    </Field>
  );
}

export interface DateRangePickerControlProps {
  /** Intl.DateTimeFormat options for the trigger label. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no range is selected. @default 'Select dates' */
  placeholder?: string;
}

/**
 * Preset trigger for `DateRangePicker`: a `Group` with a calendar `Icon` and the current
 * `DateRangePickerValue`. `DateRangePicker` inserts it when the interior has no control of its own -
 * write it explicitly to set `formatOptions` or `placeholder`.
 *
 * @param props - {@link DateRangePickerControlProps}
 */
export function DateRangePickerControl({ formatOptions, placeholder }: DateRangePickerControlProps) {
  return (
    <PickerControl>
      <DateRangePickerValue formatOptions={formatOptions} placeholder={placeholder} />
    </PickerControl>
  );
}

export interface DatePickerValueProps {
  /** Intl.DateTimeFormat options controlling how the selected date renders in the trigger. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no date is selected. @default 'Select a date' */
  placeholder?: string;
}

/** Reads the picker value from context and renders it as a formatted label, or the placeholder. */
export function DatePickerValue(props: DatePickerValueProps) {
  const { formatOptions = DEFAULT_FORMAT, placeholder = DEFAULT_DATE_PLACEHOLDER } = props;
  const state = useContext(DatePickerStateContext);
  const formatter = useTriggerFormatter(formatOptions);
  const value = state?.value;

  if (!value) {
    return <span className={styles.placeholder}>{placeholder}</span>;
  }

  return <span>{formatter.format(value.toDate(getLocalTimeZone()))}</span>;
}

export interface DateRangePickerValueProps {
  /** Intl.DateTimeFormat options controlling how each date renders in the trigger. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no range is selected. @default 'Select dates' */
  placeholder?: string;
}

/** Reads the range value from context and renders `start - end`, or the placeholder. */
export function DateRangePickerValue(props: DateRangePickerValueProps) {
  const { formatOptions = DEFAULT_FORMAT, placeholder = DEFAULT_RANGE_PLACEHOLDER } = props;
  const state = useContext(DateRangePickerStateContext);
  const formatter = useTriggerFormatter(formatOptions);
  const value = state?.value;

  if (!value?.start || !value?.end) {
    return <span className={styles.placeholder}>{placeholder}</span>;
  }

  const formattedStart = formatter.format(value.start.toDate(getLocalTimeZone()));
  const formattedEnd = formatter.format(value.end.toDate(getLocalTimeZone()));

  return (
    <span>
      {formattedStart} - {formattedEnd}
    </span>
  );
}
