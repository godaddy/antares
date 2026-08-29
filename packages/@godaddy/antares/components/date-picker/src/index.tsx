import { useContext, useMemo } from 'react';
import { DateFormatter, getLocalTimeZone, type CalendarDate } from '@internationalized/date';
import {
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  DatePickerStateContext,
  DateRangePicker as RACDateRangePicker,
  type DateRangePickerProps as RACDateRangePickerProps,
  DateRangePickerStateContext,
  useLocale
} from 'react-aria-components';
import { Field, type FieldOwnProps } from '#components/_internal/field';
import { FieldError } from '#components/field-error';
import { Label, Text } from '#components/text';
import { Group, Content, type FieldSize } from '#components/structure';
import { ControlButton } from '#components/control-button';
import { Icon } from '#components/icon';
import { Popover } from '#components/popover';
import { Calendar, RangeCalendar } from '#components/calendar';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

export interface DatePickerProps extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'size'>, FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Intl.DateTimeFormat options controlling how the selected date renders in the trigger. @default DEFAULT_FORMAT */
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

  return (
    <Field as={RACDatePicker} size={size} {...racProps}>
      {label ? <Label>{label}</Label> : null}
      <Group alignItems="center">
        <ControlButton flex={1} gap="sm" data-variant="select">
          <Icon icon="calendar" />
          <DatePickerValue formatOptions={formatOptions} placeholder={placeholder} />
        </ControlButton>
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </Field>
  );
}

export interface DateRangePickerProps
  extends Omit<RACDateRangePickerProps<CalendarDate>, 'children' | 'size'>,
    FieldOwnProps {
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

  return (
    <Field as={RACDateRangePicker} size={size} {...racProps}>
      {label ? <Label>{label}</Label> : null}
      <Group alignItems="center">
        <ControlButton flex={1} gap="sm" data-variant="select">
          <Icon icon="calendar" />
          <DateRangePickerValue formatOptions={formatOptions} placeholder={placeholder} />
        </ControlButton>
      </Group>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
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
