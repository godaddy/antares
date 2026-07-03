import { useContext, useMemo } from 'react';
import { DateFormatter, getLocalTimeZone, type CalendarDate } from '@internationalized/date';
import {
  Button as RACButton,
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  DatePickerStateContext,
  DateRangePicker as RACDateRangePicker,
  type DateRangePickerProps as RACDateRangePickerProps,
  DateRangePickerStateContext,
  useLocale
} from 'react-aria-components';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  type FieldOwnProps,
  type FieldSize
} from '#components/field';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { Calendar, RangeCalendar } from '#components/calendar';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

export interface DatePickerProps
  extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'className' | 'size'>,
    FieldOwnProps {
  /** Additional class names applied to the field root. */
  className?: string;

  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Intl.DateTimeFormat options controlling how the selected date renders in the trigger. @default { dateStyle: 'long' } */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no date is selected. @default 'Select a date' */
  placeholder?: string;
}

/**
 * DatePicker shows a read-only formatted date label; the whole field opens a calendar popover for
 * selection. Date-only (`CalendarDate`). Built on React Aria's DatePicker shell — keeping its value
 * state, hidden form input, and validation — without an editable segmented input.
 *
 * @param props - {@link DatePickerProps}
 *
 * @example
 * ```tsx
 * <DatePicker label="Event date" />
 * <DatePicker label="Booking" formatOptions={{ dateStyle: 'medium' }} />
 * ```
 */
export function DatePicker(props: DatePickerProps) {
  const {
    label,
    description,
    errorMessage,
    size,
    formatOptions = DEFAULT_FORMAT,
    placeholder = 'Select a date',
    ...racProps
  } = props;
  const { isDisabled, isRequired } = racProps;

  return (
    <Field as={RACDatePicker} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} size={size} alignItems="center">
        <Flex
          as={RACButton}
          flex={1}
          alignItems="center"
          justifyContent="space-between"
          gap="sm"
          className={styles.trigger}
        >
          <DatePickerValue formatOptions={formatOptions} placeholder={placeholder} />
          <Icon icon="calendar" />
        </Flex>
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow>
        <Calendar />
      </Popover>
    </Field>
  );
}

export interface DateRangePickerProps
  extends Omit<RACDateRangePickerProps<CalendarDate>, 'children' | 'className' | 'size'>,
    FieldOwnProps {
  /** Additional class names applied to the field root. */
  className?: string;

  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Intl.DateTimeFormat options controlling how each date renders in the trigger. @default DEFAULT_FORMAT */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no range is selected. @default 'Select dates' */
  placeholder?: string;
}

/**
 * DateRangePicker shows a read-only `start – end` label; the whole field opens a range calendar
 * popover. Date-only (`CalendarDate`). Built on React Aria's DateRangePicker shell.
 *
 * @param props - {@link DateRangePickerProps}
 *
 * @example
 * ```tsx
 * <DateRangePicker label="Trip dates" />
 * ```
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const {
    label,
    description,
    errorMessage,
    size,
    formatOptions = DEFAULT_FORMAT,
    placeholder = 'Select dates',
    ...racProps
  } = props;
  const { isDisabled, isRequired } = racProps;

  return (
    <Field as={RACDateRangePicker} {...racProps}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} size={size} alignItems="center">
        <Flex
          as={RACButton}
          flex={1}
          alignItems="center"
          justifyContent="space-between"
          gap="sm"
          className={styles.trigger}
        >
          <DateRangePickerValue formatOptions={formatOptions} placeholder={placeholder} />
          <Icon icon="calendar" />
        </Flex>
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow>
        <RangeCalendar />
      </Popover>
    </Field>
  );
}

interface DatePickerValueProps {
  /** Intl.DateTimeFormat options controlling how the selected date renders in the trigger. */
  formatOptions: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no date is selected. */
  placeholder: string;
}

/** Reads the picker value from context and renders it as a formatted label, or the placeholder. */
function DatePickerValue(props: DatePickerValueProps) {
  const { formatOptions, placeholder } = props;
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

interface DateRangePickerValueProps {
  /** Intl.DateTimeFormat options controlling how each date renders in the trigger. */
  formatOptions: Intl.DateTimeFormatOptions;

  /** Text shown in the trigger when no range is selected. */
  placeholder: string;
}

/** Reads the range value from context and renders `start – end`, or the placeholder. */
function DateRangePickerValue(props: DateRangePickerValueProps) {
  const { formatOptions, placeholder } = props;
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
