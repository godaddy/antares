import type { CalendarDate } from '@internationalized/date';
import { useContext } from 'react';
import {
  Button as RACButton,
  DateInput as RACDateInput,
  DateRangePicker as RACDateRangePicker,
  DateRangePickerStateContext,
  DateSegment as RACDateSegment,
  Dialog as RACDialog,
  Popover as RACPopover,
  type DateRangePickerProps as RACDateRangePickerProps
} from 'react-aria-components';
import { RangeCalendar } from '#components/calendar';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import { Flex } from '#components/layout/flex';
import { Icon } from '#components/icon';
import { useFormattedRange } from '../../date-field/src/format.ts';
import styles from './index.module.css';

/**
 * Extended props for the DateRangeField component. Typed for `CalendarDate` (date-only). Wraps
 * RAC `DateRangePicker`; all RAC props not listed below pass through (e.g. `placeholderValue`,
 * `isDateUnavailable`, `startName`, `endName`).
 */
export interface DateRangeFieldProps
  extends Omit<RACDateRangePickerProps<CalendarDate>, 'children' | 'errorMessage'>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {
  /**
   * Allow keyboard / segment entry. `false` (default) shows a non-editable localized range that
   * opens the calendar on click; `true` shows editable segments with an icon-only calendar trigger.
   */
  allowsKeyboardInput?: boolean;

  /**
   * Intl options for the prose display. Ignored when `allowsKeyboardInput` is set.
   * @default { day: 'numeric', month: 'short', year: 'numeric' }
   */
  formatOptions?: Intl.DateTimeFormatOptions;

  /** Text shown in prose mode when no range is selected (e.g. "Select dates"). */
  placeholder?: string;

  /** Selected range value (controlled), e.g. `{ start, end }` of `CalendarDate`. */
  value?: RACDateRangePickerProps<CalendarDate>['value'];

  /** Default range value (uncontrolled). */
  defaultValue?: RACDateRangePickerProps<CalendarDate>['defaultValue'];

  /** Absolute lower bound. */
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

  /** Form field name for the range start date. */
  startName?: string;

  /** Form field name for the range end date. */
  endName?: string;

  /** Handler called when the value changes. */
  onChange?: RACDateRangePickerProps<CalendarDate>['onChange'];
}

/**
 * Renders the non-editable localized range (or placeholder) for prose mode. Reads the selected
 * range from `DateRangePickerStateContext`, so it must render under `<RACDateRangePicker>`.
 */
function ProseValue({
  formatOptions,
  placeholder
}: {
  formatOptions?: Intl.DateTimeFormatOptions;
  placeholder?: string;
}) {
  const state = useContext(DateRangePickerStateContext);
  const start = (state?.value?.start ?? null) as CalendarDate | null;
  const end = (state?.value?.end ?? null) as CalendarDate | null;
  const formatted = useFormattedRange(start, end, formatOptions);

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
 * Submits start/end as ISO date strings under `startName` / `endName` in prose mode. RAC's own
 * hidden inputs are detached from the form (`form=""`), and prose mode renders no `DateInput`,
 * so without these the range would not be submitted. Reads `DateRangePickerStateContext`.
 */
function HiddenRangeValue({ startName, endName }: { startName?: string; endName?: string }) {
  const state = useContext(DateRangePickerStateContext);
  const start = (state?.value?.start ?? null) as CalendarDate | null;
  const end = (state?.value?.end ?? null) as CalendarDate | null;

  return (
    <>
      {startName && <input type="hidden" name={startName} value={start ? start.toString() : ''} readOnly />}
      {endName && <input type="hidden" name={endName} value={end ? end.toString() : ''} readOnly />}
    </>
  );
}

/**
 * Date range input that shows a localized range (e.g. `12 – 20 Aug 2022`) and opens a
 * `RangeCalendar` popover on click. Typed for `CalendarDate` (date-only). Set `allowsKeyboardInput`
 * for editable segments. Wraps RAC `DateRangePicker` in antares `FieldFrame`.
 *
 * @param props - {@link DateRangeFieldProps}
 *
 * @example
 * ```tsx
 * import { parseDate } from '@internationalized/date';
 *
 * <DateRangeField
 *   label="Trip"
 *   defaultValue={{ start: parseDate('2024-03-15'), end: parseDate('2024-03-20') }}
 * />
 * ```
 */
export function DateRangeField(props: DateRangeFieldProps) {
  const { description, errorMessage, label, formatOptions, placeholder, allowsKeyboardInput, minValue, maxValue, ...racProps } =
    props;
  const { isDisabled, isRequired, isReadOnly } = racProps;

  return (
    <RACDateRangePicker<CalendarDate> {...racProps} minValue={minValue} maxValue={maxValue}>
      <FieldFrame
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        label={label}
        gap="sm"
      >
        {allowsKeyboardInput ? (
          <Flex alignItems="center" gap="sm" flex={1}>
            <Flex as={RACButton} alignItems="center" aria-label="Open calendar" className={styles.iconTrigger}>
              <Icon icon="calendar" />
            </Flex>
            <Flex
              as={RACDateInput}
              slot="start"
              display="inline-flex"
              alignItems="center"
              inlinePadding="md"
              blockPadding="md"
              className={styles.dateInput}
            >
              {(segment) => <RACDateSegment segment={segment} className={styles.segment} />}
            </Flex>
            <span aria-hidden="true" className={styles.separator}>
              –
            </span>
            <Flex
              as={RACDateInput}
              slot="end"
              display="inline-flex"
              alignItems="center"
              inlinePadding="md"
              blockPadding="md"
              className={styles.dateInput}
            >
              {(segment) => <RACDateSegment segment={segment} className={styles.segment} />}
            </Flex>
          </Flex>
        ) : (
          <>
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
            <HiddenRangeValue startName={racProps.startName} endName={racProps.endName} />
          </>
        )}
      </FieldFrame>
      <RACPopover className={styles.popover} placement="bottom start">
        <RACDialog className={styles.dialog}>
          <RangeCalendar aria-label={label ?? 'Calendar'} minValue={minValue} maxValue={maxValue} />
        </RACDialog>
      </RACPopover>
    </RACDateRangePicker>
  );
}
