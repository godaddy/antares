import { type ReactElement, useContext, useMemo } from 'react';
import { DateFormatter, getLocalTimeZone, type CalendarDate } from '@internationalized/date';
import {
  Button as RACButton,
  DatePicker as RACDatePicker,
  type DatePickerProps as RACDatePickerProps,
  DatePickerStateContext,
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
import { Calendar } from '#components/calendar';
import styles from './index.module.css';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { dateStyle: 'long' };

/** Reads the picker value from context and renders it as a formatted label, or the placeholder. */
function DatePickerValueLabel({
  formatOptions,
  placeholder
}: {
  formatOptions: Intl.DateTimeFormatOptions;
  placeholder: string;
}): ReactElement {
  const state = useContext(DatePickerStateContext);
  const { locale } = useLocale();
  const formatter = useMemo(() => new DateFormatter(locale, formatOptions), [locale, formatOptions]);
  const value = state?.value;

  if (!value) {
    return <span className={styles.placeholder}>{placeholder}</span>;
  }
  return <span className={styles.value}>{formatter.format(value.toDate(getLocalTimeZone()))}</span>;
}

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
export function DatePicker(props: DatePickerProps): ReactElement {
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
          <DatePickerValueLabel formatOptions={formatOptions} placeholder={placeholder} />
          <Icon icon="calendar" />
        </Flex>
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow contentProps={{ inlinePadding: '0', blockPadding: '0' }}>
        <Calendar />
      </Popover>
    </Field>
  );
}
