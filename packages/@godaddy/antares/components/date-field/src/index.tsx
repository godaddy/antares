import type { CalendarDate } from '@internationalized/date';
import {
  DateField as RACDateField,
  DateInput as RACDateInput,
  DateSegment as RACDateSegment,
  type DateFieldProps as RACDateFieldProps
} from 'react-aria-components';
import { FieldFrame, type FieldFrameProps } from '#components/_internal/field-frame';
import { Flex } from '#components/layout/flex';
import styles from './index.module.css';

export { I18nProvider, type I18nProviderProps } from 'react-aria-components';

export interface DateFieldProps
  extends Omit<RACDateFieldProps<CalendarDate>, 'children' | 'errorMessage'>,
    Pick<FieldFrameProps, 'description' | 'errorMessage' | 'label'> {
  /** Selected date value (controlled). */
  value?: CalendarDate | null;

  /** Default date value (uncontrolled). */
  defaultValue?: CalendarDate | null;

  /** Absolute lower bound. Disables out-of-range typed entry. */
  minValue?: CalendarDate;

  /** Absolute upper bound. Disables out-of-range typed entry. */
  maxValue?: CalendarDate;

  /** Placeholder date used to hint the segments before a value is entered. */
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
  onChange?: RACDateFieldProps<CalendarDate>['onChange'];
}

/**
 * Segmented date input with editable Year/Month/Day segments, typed for `CalendarDate`
 * (date-only, no time, no timezone). Wraps RAC `DateField` in antares `FieldFrame`.
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
        <Flex
          as={RACDateInput}
          alignItems="center"
          inlinePadding="md"
          blockPadding="md"
          flex={1}
          className={styles.dateInput}
        >
          {(segment) => <RACDateSegment segment={segment} className={styles.segment} />}
        </Flex>
      </FieldFrame>
    </RACDateField>
  );
}
