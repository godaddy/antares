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
import { classifyDatePickerChildren } from './classify-date-picker-children.tsx';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const DEFAULT_DATE_PLACEHOLDER = 'Select a date';
const DEFAULT_RANGE_PLACEHOLDER = 'Select dates';

/** State passed to a composed DatePicker interior. */
export interface DatePickerRenderProps extends RACDatePickerRenderProps {}

export interface DatePickerProps extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'size'>, FieldOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Intl.DateTimeFormat options for the default trigger label. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the default trigger when no date is selected. @default 'Select a date' */
  placeholder?: string;

  /**
   * Semi-composed: `Label`, `Text slot="description"`, `FieldError`. Omit children and pass
   * `aria-label` when there is no visible label.
   * Composed: full interior with `Group`, `Button`, `Popover`, and `Calendar`.
   * Pass a function to read state such as `isOpen` while composing.
   */
  children?: ReactNode | ((renderProps: DatePickerRenderProps) => ReactNode);
}

function DefaultDatePickerInterior({
  label,
  description,
  error,
  formatOptions,
  placeholder
}: {
  label: ReactNode[];
  description: ReactNode[];
  error: ReactNode[];
  formatOptions?: Intl.DateTimeFormatOptions;
  placeholder?: string;
}) {
  return (
    <>
      {label}
      <Group alignItems="center">
        <Button slot="trigger">
          <Icon icon="calendar" />
          <DatePickerValue formatOptions={formatOptions} placeholder={placeholder} />
        </Button>
      </Group>
      {description}
      {error}
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </>
  );
}

function renderDatePickerChildren(
  children: DatePickerProps['children'],
  formatOptions?: Intl.DateTimeFormatOptions,
  placeholder?: string
): ReactNode | ((renderProps: DatePickerRenderProps) => ReactNode) {
  const classified = classifyDatePickerChildren(children);
  if (classified.mode === 'composed') return classified.children;

  return (
    <DefaultDatePickerInterior
      label={classified.label}
      description={classified.description}
      error={classified.error}
      formatOptions={formatOptions}
      placeholder={placeholder}
    />
  );
}

/**
 * DatePicker shows a read-only formatted date label; the whole field opens a calendar popover for
 * selection. Date-only (`CalendarDate`). Default usage is semi-composed (`Label` only, or
 * `aria-label` with no children). Pass a full interior when you need to customize layout.
 *
 * @param props - {@link DatePickerProps}
 *
 * @example
 * ```tsx
 * <DatePicker>
 *   <Label>Event date</Label>
 * </DatePicker>
 *
 * <DatePicker aria-label="Event date" />
 * ```
 */
export function DatePicker(props: DatePickerProps) {
  const { children, size, formatOptions, placeholder, ...racProps } = props;

  return (
    <Field as={RACDatePicker as typeof RACDatePicker<CalendarDate>} interior="box" size={size} {...racProps}>
      {renderDatePickerChildren(children, formatOptions, placeholder)}
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

  /** Intl.DateTimeFormat options for the default trigger label. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in the default trigger when no range is selected. @default 'Select dates' */
  placeholder?: string;

  /**
   * Semi-composed: `Label`, `Text slot="description"`, `FieldError`. Omit children and pass
   * `aria-label` when there is no visible label.
   * Composed: full interior with `Group`, `Button`, `Popover`, and `RangeCalendar`.
   * Pass a function to read state such as `isOpen` while composing.
   */
  children?: ReactNode | ((renderProps: DateRangePickerRenderProps) => ReactNode);
}

function DefaultDateRangePickerInterior({
  label,
  description,
  error,
  formatOptions,
  placeholder
}: {
  label: ReactNode[];
  description: ReactNode[];
  error: ReactNode[];
  formatOptions?: Intl.DateTimeFormatOptions;
  placeholder?: string;
}) {
  return (
    <>
      {label}
      <Group alignItems="center">
        <Button slot="trigger">
          <Icon icon="calendar" />
          <DateRangePickerValue formatOptions={formatOptions} placeholder={placeholder} />
        </Button>
      </Group>
      {description}
      {error}
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
      </Popover>
    </>
  );
}

function renderDateRangePickerChildren(
  children: DateRangePickerProps['children'],
  formatOptions?: Intl.DateTimeFormatOptions,
  placeholder?: string
): ReactNode | ((renderProps: DateRangePickerRenderProps) => ReactNode) {
  const classified = classifyDatePickerChildren(children);
  if (classified.mode === 'composed') return classified.children;

  return (
    <DefaultDateRangePickerInterior
      label={classified.label}
      description={classified.description}
      error={classified.error}
      formatOptions={formatOptions}
      placeholder={placeholder}
    />
  );
}

/**
 * DateRangePicker shows a read-only `start - end` label; the whole field opens a range calendar
 * popover. Date-only (`CalendarDate`). Default usage is semi-composed (`Label` only, or
 * `aria-label` with no children).
 *
 * @param props - {@link DateRangePickerProps}
 *
 * @example
 * ```tsx
 * <DateRangePicker>
 *   <Label>Trip dates</Label>
 * </DateRangePicker>
 *
 * <DateRangePicker aria-label="Trip dates" />
 * ```
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const { children, size, formatOptions, placeholder, ...racProps } = props;

  return (
    <Field as={RACDateRangePicker as typeof RACDateRangePicker<CalendarDate>} interior="box" size={size} {...racProps}>
      {renderDateRangePickerChildren(children, formatOptions, placeholder)}
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
