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
import { Field, type FieldOwnProps } from '#components/_internal/field';
import type { FieldSize } from '#components/structure';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const DEFAULT_DATE_PLACEHOLDER = 'Select a date';
const DEFAULT_RANGE_PLACEHOLDER = 'Select dates';

/** State passed to a composed DatePicker interior. */
export interface DatePickerRenderProps extends RACDatePickerRenderProps {}

export interface DatePickerProps extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'size'>, FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /**
   * The interior: a `Label`, a `Group` with a trigger `Button` (an `Icon` plus a
   * `DatePickerValue`), a `Text slot="description"`, a `FieldError`, and a `Popover`
   * with a `Calendar`. Pass a function to read state such as `isOpen` while composing.
   */
  children: ReactNode | ((renderProps: DatePickerRenderProps) => ReactNode);
}

/**
 * DatePicker shows a read-only formatted date label; the whole field opens a calendar popover for
 * selection. Date-only (`CalendarDate`). Built on React Aria's DatePicker shell - keeping its value
 * state, hidden form input, and validation - without an editable segmented input.
 *
 * @param props - {@link DatePickerProps}
 *
 * @example
 * ```tsx
 * <DatePicker>
 *   <Label>Event date</Label>
 *   <Group alignItems="center">
 *     <Button variant="trigger">
 *       <Icon icon="calendar" />
 *       <DatePickerValue />
 *     </Button>
 *   </Group>
 *   <FieldError />
 *   <Popover hideArrow>
 *     <Content>
 *       <Calendar />
 *     </Content>
 *   </Popover>
 * </DatePicker>
 * ```
 */
export function DatePicker(props: DatePickerProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field as={RACDatePicker as typeof RACDatePicker<CalendarDate>} size={size} {...racProps}>
      {children}
    </Field>
  );
}

/** State passed to a composed DateRangePicker interior. */
export interface DateRangePickerRenderProps extends RACDateRangePickerRenderProps {}

export interface DateRangePickerProps
  extends Omit<RACDateRangePickerProps<CalendarDate>, 'children' | 'size'>,
    FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /**
   * The interior: a `Label`, a `Group` with a trigger `Button` (an `Icon` plus a
   * `DateRangePickerValue`), a `Text slot="description"`, a `FieldError`, and a `Popover`
   * with a `RangeCalendar`. Pass a function to read state such as `isOpen` while composing.
   */
  children: ReactNode | ((renderProps: DateRangePickerRenderProps) => ReactNode);
}

/**
 * DateRangePicker shows a read-only `start - end` label; the whole field opens a range calendar
 * popover. Date-only (`CalendarDate`). Built on React Aria's DateRangePicker shell.
 *
 * @param props - {@link DateRangePickerProps}
 *
 * @example
 * ```tsx
 * <DateRangePicker>
 *   <Label>Trip dates</Label>
 *   <Group alignItems="center">
 *     <Button variant="trigger">
 *       <Icon icon="calendar" />
 *       <DateRangePickerValue />
 *     </Button>
 *   </Group>
 *   <FieldError />
 *   <Popover hideArrow>
 *     <Content>
 *       <RangeCalendar />
 *     </Content>
 *   </Popover>
 * </DateRangePicker>
 * ```
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const { children, size, ...racProps } = props;

  return (
    <Field as={RACDateRangePicker as typeof RACDateRangePicker<CalendarDate>} size={size} {...racProps}>
      {children}
    </Field>
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
  const { locale } = useLocale();
  const value = state?.value;

  const formatter = useMemo(
    function getFormatter() {
      return new DateFormatter(locale, formatOptions);
    },
    [locale, formatOptions]
  );

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
  const { locale } = useLocale();
  const formatter = useMemo(() => new DateFormatter(locale, formatOptions), [locale, formatOptions]);
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
