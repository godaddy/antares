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

/** Shared trigger: calendar icon beside the formatted value. */
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

/** Shared calendar popover shell. */
function PickerOverlay({ children }: { children: ReactNode }) {
  return (
    <Popover hideArrow>
      <Content>{children}</Content>
    </Popover>
  );
}

/** Locale-aware formatter for the trigger label. */
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

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACDatePickerRenderProps) => ReactNode);
}

/**
 * Date-only picker (`CalendarDate`). Fills in the trigger and calendar popover when omitted.
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

  /** Placeholder when no date is selected. @default 'Select a date' */
  placeholder?: string;
}

/** Preset trigger; write explicitly to set `formatOptions` or `placeholder`. */
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

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACDateRangePickerRenderProps) => ReactNode);
}

/**
 * Date-only range picker (`CalendarDate`). Fills in the trigger and calendar popover when omitted.
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

  /** Placeholder when no range is selected. @default 'Select dates' */
  placeholder?: string;
}

/** Preset trigger; write explicitly to set `formatOptions` or `placeholder`. */
export function DateRangePickerControl({ formatOptions, placeholder }: DateRangePickerControlProps) {
  return (
    <PickerControl>
      <DateRangePickerValue formatOptions={formatOptions} placeholder={placeholder} />
    </PickerControl>
  );
}

export interface DatePickerValueProps {
  /** Format options for the selected date. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Placeholder when no date is selected. @default 'Select a date' */
  placeholder?: string;
}

/** Formatted date label, or the placeholder. */
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
  /** Format options for each date in the range. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Placeholder when no range is selected. @default 'Select dates' */
  placeholder?: string;
}

/** Formatted `start - end` label, or the placeholder. */
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
