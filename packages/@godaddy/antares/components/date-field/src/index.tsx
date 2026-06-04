import type { CalendarDate } from '@internationalized/date';
import { useContext } from 'react';
import {
  Button as RACButton,
  DatePicker as RACDatePicker,
  DatePickerStateContext,
  Dialog as RACDialog,
  Popover as RACPopover,
  type DatePickerProps as RACDatePickerProps
} from 'react-aria-components';
import { Calendar } from '#components/calendar';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { useFormattedDate } from './format.ts';
import styles from './index.module.css';

/**
 * Extended props for the DateField component. Typed for `CalendarDate` (date-only, no time,
 * no timezone). Wraps RAC `DatePicker`; all RAC props not listed below pass through
 * (e.g. `placeholderValue`, `isDateUnavailable`, `granularity`).
 */
export interface DateFieldProps
  extends Omit<RACDatePickerProps<CalendarDate>, 'children' | 'errorMessage'>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {
  /**
   * Allow keyboard / segment entry. `false` (default) shows a non-editable localized value that
   * opens the calendar on click; `true` shows editable segments with an icon-only calendar trigger.
   */
  allowsKeyboardInput?: boolean;

  /**
   * Intl options for the prose display. Ignored when `allowsKeyboardInput` is set.
   * @default { day: 'numeric', month: 'short', year: 'numeric' }
   */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in prose mode when no date is selected (e.g. "Select a date"). */
  placeholder?: string;

  /** Selected date value (controlled). */
  value?: CalendarDate | null;

  /** Default date value (uncontrolled). */
  defaultValue?: CalendarDate | null;

  /** Absolute lower bound. Disables out-of-range entry and out-of-range calendar days. */
  minValue?: CalendarDate;

  /** Absolute upper bound. */
  maxValue?: CalendarDate;

  /** Placeholder date used to seed the segments and the initially-visible calendar month. */
  placeholderValue?: CalendarDate;

  /** Helper text shown below the frame. */
  description?: string;

  /** Error message shown when invalid. Use with `isInvalid`. */
  errorMessage?: string;

  /** Label text shown above the frame. */
  label?: string;

  /** Whether the input is disabled. */
  isDisabled?: boolean;

  /** Whether the value is invalid. Use with `errorMessage`. */
  isInvalid?: boolean;

  /** Whether user input is required before form submission. */
  isRequired?: boolean;

  /** Whether the input is read-only. */
  isReadOnly?: boolean;

  /** Name of the underlying form element. */
  name?: string;

  /** Handler called when the value changes. */
  onChange?: RACDatePickerProps<CalendarDate>['onChange'];
}

/**
 * Renders the non-editable localized value (or placeholder) for prose mode. Reads the selected
 * value from `DatePickerStateContext`, so it must render under `<RACDatePicker>`.
 */
function ProseValue({
  formatOptions,
  placeholder
}: {
  formatOptions?: Intl.DateTimeFormatOptions;
  placeholder?: string;
}) {
  const state = useContext(DatePickerStateContext);
  const value = (state?.value ?? null) as CalendarDate | null;
  const formatted = useFormattedDate(value, formatOptions);

  if (formatted) {
    return <span className={styles.value}>{formatted}</span>;
  }
  return (
    <span className={styles.placeholder} data-placeholder="true">
      {placeholder}
    </span>
  );
}

/**
 * Date input that shows a localized value (e.g. `12 Aug 2022`) and opens a `Calendar` popover on
 * click. Typed for `CalendarDate` (date-only). Set `allowsKeyboardInput` for editable segments.
 * Wraps RAC `DatePicker` in antares `FieldFrame`.
 *
 * @param props - {@link DateFieldProps}
 *
 * @example
 * ```tsx
 * import { parseDate } from '@internationalized/date';
 *
 * <DateField label="Start date" defaultValue={parseDate('2024-03-15')} />
 * ```
 */
export function DateField(props: DateFieldProps) {
  const { description, errorMessage, label, formatOptions, placeholder, allowsKeyboardInput, minValue, maxValue, ...racProps } =
    props;
  const { isDisabled, isRequired, isReadOnly } = racProps;

  return (
    <RACDatePicker {...racProps} minValue={minValue} maxValue={maxValue}>
      <FieldFrame
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        label={label}
        gap="sm"
      >
        <Flex
          as={RACButton}
          display="inline-flex"
          alignItems="center"
          gap="sm"
          inlinePadding="md"
          blockPadding="md"
          flex={1}
          aria-label={label}
          className={styles.proseTrigger}
        >
          <Icon icon="calendar" />
          <ProseValue formatOptions={formatOptions} placeholder={placeholder} />
        </Flex>
      </FieldFrame>
      <RACPopover className={styles.popover} placement="bottom start">
        <RACDialog className={styles.dialog}>
          <Calendar aria-label={label ?? 'Calendar'} minValue={minValue} maxValue={maxValue} />
        </RACDialog>
      </RACPopover>
    </RACDatePicker>
  );
}
