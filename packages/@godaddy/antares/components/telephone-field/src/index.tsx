import { forwardRef, type ReactNode } from 'react';
import { TextField as RACTextField, type TextFieldProps as RACTextFieldProps } from 'react-aria-components';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldInput,
  FieldLabel,
  type FieldOwnProps,
  type FieldSize
} from '#components/field';
import { FieldSelect, type FieldSelectProps, type SelectKey } from '#components/select';

type CountryFieldProps = Omit<
  FieldSelectProps<object>,
  'aria-label' | 'children' | 'defaultValue' | 'isDisabled' | 'onChange' | 'value'
>;

export interface TelephoneFieldProps extends Omit<RACTextFieldProps, 'children' | 'className' | 'size'>, FieldOwnProps {
  /** Country/dial-code options — one `SelectItem` per supported country (e.g. `US +1`). */
  children: ReactNode;

  /** Visual size of the field. @default 'md' */
  size?: FieldSize;

  /** HTML input type for the phone number input. @default 'tel' */
  type?: RACTextFieldProps['type'];

  /** Virtual keyboard hint for the phone number input. @default 'tel' */
  inputMode?: RACTextFieldProps['inputMode'];

  /** Autofill hint for the phone number input. @default 'tel-national' */
  autoComplete?: RACTextFieldProps['autoComplete'];

  /** Default phone number (uncontrolled). */
  defaultValue?: string;

  /** Current phone number, exactly as typed (controlled). No masking or formatting is applied. */
  value?: string;

  /** Called with the raw phone number string on every edit. */
  onChange?: RACTextFieldProps['onChange'];

  /** Placeholder shown in the phone number input. */
  placeholder?: string;

  /** Name of the phone number input, used when submitting a form. */
  name?: string;

  /** Default selected country key (uncontrolled). */
  defaultCountry?: SelectKey | null;

  /** Currently selected country key (controlled). */
  country?: SelectKey | null;

  /** Called when the selected country changes. */
  onCountryChange?: (key: SelectKey | null) => void;

  /** Accessible name for the country picker button, since it has no visible label of its own. */
  countryLabel?: string;

  /** Additional props (e.g. `aria-describedby`, `id`) applied to the country picker. */
  countryProps?: CountryFieldProps;

  /** Additional class names applied to the field root. */
  className?: string;
}

/**
 * TelephoneField pairs a country/dial-code picker with a phone number input inside one
 * bordered field. Country and phone number are independent, raw values — TelephoneField
 * applies no masking or E.164 formatting; combine `country`/`value` however the consuming
 * form or backend expects.
 *
 * @param props - {@link TelephoneFieldProps}
 * @param ref - Ref for the phone number input element.
 *
 * @example
 * ```tsx
 * <TelephoneField label="Phone" defaultCountry="us" countryLabel="Country code" placeholder="555-555-5555">
 *   <SelectItem id="us">US +1</SelectItem>
 *   <SelectItem id="mx">MX +52</SelectItem>
 * </TelephoneField>
 * ```
 */
export const TelephoneField = forwardRef<HTMLInputElement, TelephoneFieldProps>(function TelephoneField(props, ref) {
  const {
    autoComplete = 'tel-national',
    children,
    country,
    countryLabel,
    countryProps,
    defaultCountry,
    description,
    errorMessage,
    inputMode = 'tel',
    label,
    onCountryChange,
    placeholder,
    size,
    type = 'tel',
    ...racProps
  } = props;
  const { isDisabled, isRequired } = racProps;

  return (
    <Field as={RACTextField} {...racProps} type={type} inputMode={inputMode} autoComplete={autoComplete}>
      <FieldLabel isRequired={isRequired}>{label}</FieldLabel>
      <FieldGroup isDisabled={isDisabled} size={size}>
        <FieldSelect
          {...countryProps}
          aria-label={countryLabel}
          isDisabled={isDisabled}
          value={country}
          defaultValue={defaultCountry}
          onChange={onCountryChange}
        >
          {children}
        </FieldSelect>
        <FieldInput ref={ref} placeholder={placeholder} />
      </FieldGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
});
