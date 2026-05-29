import type { CalendarDate } from '@internationalized/date';
import { cx } from 'cva';
import {
  DateField as RACDateField,
  DateInput as RACDateInput,
  DateSegment as RACDateSegment,
  type DateFieldProps as RACDateFieldProps
} from 'react-aria-components';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import styles from './index.module.css';

/**
 * Props for the DateField component.
 *
 * Wraps React Aria {@link RACDateFieldProps} typed for `CalendarDate` (date-only,
 * no time, no timezone). Adds Antares' label/description/error surface via
 * {@link FieldFrame} and narrows `errorMessage` to `string` to match `TextField`
 * and `NumberField`.
 *
 * @public
 */
export interface DateFieldProps
  extends Omit<RACDateFieldProps<CalendarDate>, 'children' | 'errorMessage'>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {
  /**
   * Selected date value (controlled). Pass a `CalendarDate` from `@internationalized/date`.
   *
   * @example
   *   import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
   *   <DateField value={parseDate('2024-03-15')} />
   *   <DateField value={today(getLocalTimeZone())} />
   *
   * @see https://react-spectrum.adobe.com/react-aria/DateField.html#value
   */
  value?: CalendarDate | null;

  /**
   * Default date value (uncontrolled). Pass a `CalendarDate` from `@internationalized/date`.
   *
   * @example
   *   import { parseDate } from '@internationalized/date';
   *   <DateField defaultValue={parseDate('2024-03-15')} />
   *
   * @see https://react-spectrum.adobe.com/react-aria/DateField.html#value
   */
  defaultValue?: CalendarDate | null;

  /**
   * Absolute lower bound. Disables out-of-range typed entry.
   *
   * @example
   *   import { parseDate } from '@internationalized/date';
   *   <DateField minValue={parseDate('2024-01-01')} />
   *
   * @see https://react-spectrum.adobe.com/react-aria/DateField.html#minimum-and-maximum-values
   */
  minValue?: CalendarDate;

  /**
   * Absolute upper bound. Disables out-of-range typed entry.
   *
   * @example
   *   import { parseDate } from '@internationalized/date';
   *   <DateField maxValue={parseDate('2025-12-31')} />
   *
   * @see https://react-spectrum.adobe.com/react-aria/DateField.html#minimum-and-maximum-values
   */
  maxValue?: CalendarDate;

  /**
   * Placeholder date used to hint the segments before a value is entered.
   *
   * @example
   *   import { parseDate } from '@internationalized/date';
   *   <DateField placeholderValue={parseDate('2024-01-01')} />
   *
   * @see https://react-spectrum.adobe.com/react-aria/DateField.html#placeholder-value
   */
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

  /** Name of the underlying form element, used when submitting a form. */
  name?: string;

  /** Handler called when the value changes. */
  onChange?: RACDateFieldProps<CalendarDate>['onChange'];
}

/**
 * DateField is a segmented date input with editable Year, Month, and Day segments.
 * It composes React Aria `DateField<CalendarDate>` with Antares' `FieldFrame` for
 * label, description, and error message.
 *
 * Values are typed as `CalendarDate` from `@internationalized/date` — there is no
 * time and no timezone. See the `Working with dates` README section for patterns.
 *
 * @param props - {@link DateFieldProps}
 *
 * @example
 * ```tsx
 * import { parseDate } from '@internationalized/date';
 *
 * <DateField label="Start date" defaultValue={parseDate('2024-03-15')} />
 * ```
 *
 * @see https://react-spectrum.adobe.com/react-aria/DateField.html
 */
export function DateField(props: DateFieldProps) {
  const { description, errorMessage, label, ...racProps } = props;
  const { isDisabled, isRequired, isReadOnly } = racProps;

  return (
    <RACDateField {...racProps}>
      <FieldFrame
        description={description}
        errorMessage={errorMessage}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        label={label}
        gap="sm"
      >
        <RACDateInput className={styles.dateInput}>
          {(segment) => <RACDateSegment segment={segment} className={cx(styles.segment)} />}
        </RACDateInput>
      </FieldFrame>
    </RACDateField>
  );
}
