import { useContext, useMemo, useRef, type ReactNode, type RefObject } from 'react';
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
  PopoverContext,
  Provider as RACProvider,
  useLocale
} from 'react-aria-components';
import { Field, mapFieldChildren, type FieldOwnProps, type FieldSize } from '#components/_internal/field';
import { Calendar, type CalendarProps, RangeCalendar, type RangeCalendarProps } from '#components/calendar';
import { Icon } from '#components/icon';
import { Popover, type PopoverProps } from '#components/popover';
import { Content } from '#components/structure';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const DEFAULT_DATE_PLACEHOLDER = 'Select a date';
const DEFAULT_RANGE_PLACEHOLDER = 'Select dates';

/** Trigger content for either picker: a calendar icon beside the formatted value. */
function triggerSlots(value: ReactNode, ref: RefObject<HTMLButtonElement | null>) {
  return {
    trigger: {
      ref,
      children: (
        <>
          <Icon icon="calendar" />
          {value}
        </>
      )
    }
  };
}

/**
 * React Aria anchors a picker's overlay to its `Group`, which a composed interior need not have, so
 * anchor it to the trigger instead - the same element React Aria's own Select anchors to.
 */
function PickerOverlayAnchor({
  triggerRef,
  children
}: {
  triggerRef: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
}) {
  const popover = useContext(PopoverContext);

  return <RACProvider values={[[PopoverContext, { ...popover, triggerRef }]]}>{children}</RACProvider>;
}

/** Wrap a picker's interior in its overlay anchor, keeping a render-fn child a function. */
function anchorInterior<R>(
  children: ReactNode | ((renderProps: R) => ReactNode),
  triggerRef: RefObject<HTMLButtonElement | null>
) {
  return mapFieldChildren(children, function anchor(node) {
    return <PickerOverlayAnchor triggerRef={triggerRef}>{node}</PickerOverlayAnchor>;
  });
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

/** Configuration shared by both picker roots. */
interface PickerValueOwnProps {
  /** Intl.DateTimeFormat options for the trigger label. */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Placeholder shown until a value is selected. */
  placeholder?: string;
}

export interface DatePickerProps
  extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'size'>,
    FieldOwnProps,
    PickerValueOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Placeholder when no date is selected. @default 'Select a date' */
  placeholder?: string;

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACDatePickerRenderProps) => ReactNode);
}

/**
 * Date-only picker (`CalendarDate`). Compose `Label`, a `Button slot="trigger"`,
 * `DatePickerCalendar`, description, and `FieldError`. An empty trigger picks up a calendar icon
 * and the formatted value from the field.
 *
 * @example
 * ```tsx
 * <DatePicker>
 *   <Label>Event date</Label>
 *   <Button slot="trigger" />
 *   <DatePickerCalendar />
 * </DatePicker>
 * ```
 */
export function DatePicker(props: DatePickerProps) {
  const { children, size, formatOptions, placeholder, ...racProps } = props;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const value = <DatePickerValue formatOptions={formatOptions} placeholder={placeholder} />;

  return (
    <Field
      as={RACDatePicker as typeof RACDatePicker<CalendarDate>}
      interior="box"
      size={size}
      slotDefaults={{ buttons: triggerSlots(value, triggerRef) }}
      {...racProps}
    >
      {anchorInterior(children, triggerRef)}
    </Field>
  );
}

export interface DateRangePickerProps
  extends Omit<RACDateRangePickerProps<CalendarDate>, 'children' | 'size'>,
    FieldOwnProps,
    PickerValueOwnProps {
  /** Visual size of the trigger. @default 'md' */
  size?: FieldSize;

  /** Placeholder when no range is selected. @default 'Select dates' */
  placeholder?: string;

  /** Field interior. Pass a function to read render props such as `isOpen`. */
  children: ReactNode | ((renderProps: RACDateRangePickerRenderProps) => ReactNode);
}

/**
 * Date-only range picker (`CalendarDate`). Compose `Label`, a `Button slot="trigger"`,
 * `DateRangePickerCalendar`, description, and `FieldError`.
 *
 * @example
 * ```tsx
 * <DateRangePicker>
 *   <Label>Trip dates</Label>
 *   <Button slot="trigger" />
 *   <DateRangePickerCalendar />
 * </DateRangePicker>
 * ```
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const { children, size, formatOptions, placeholder, ...racProps } = props;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const value = <DateRangePickerValue formatOptions={formatOptions} placeholder={placeholder} />;

  return (
    <Field
      as={RACDateRangePicker as typeof RACDateRangePicker<CalendarDate>}
      interior="box"
      size={size}
      slotDefaults={{ buttons: triggerSlots(value, triggerRef) }}
      {...racProps}
    >
      {anchorInterior(children, triggerRef)}
    </Field>
  );
}

export interface DatePickerCalendarProps extends CalendarProps {
  /** Props for the popover layer that positions the calendar. */
  popoverProps?: Omit<PopoverProps, 'children'>;
}

/**
 * The calendar a DatePicker opens. Write `Popover`, `Content`, and `Calendar` yourself to replace
 * the whole overlay.
 */
export function DatePickerCalendar(props: DatePickerCalendarProps) {
  const { popoverProps, ...calendarProps } = props;

  return (
    <Popover hideArrow {...popoverProps}>
      <Content>
        <Calendar {...calendarProps} />
      </Content>
    </Popover>
  );
}

export interface DateRangePickerCalendarProps extends RangeCalendarProps {
  /** Props for the popover layer that positions the calendar. */
  popoverProps?: Omit<PopoverProps, 'children'>;
}

/**
 * The calendar a DateRangePicker opens. Write `Popover`, `Content`, and `RangeCalendar` yourself to
 * replace the whole overlay.
 */
export function DateRangePickerCalendar(props: DateRangePickerCalendarProps) {
  const { popoverProps, ...calendarProps } = props;

  return (
    <Popover hideArrow {...popoverProps}>
      <Content>
        <RangeCalendar {...calendarProps} />
      </Content>
    </Popover>
  );
}

export interface DatePickerValueProps extends PickerValueOwnProps {
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

export interface DateRangePickerValueProps extends PickerValueOwnProps {
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
