import { SelectItem, TelephoneField, type TelephoneFieldProps } from '@godaddy/antares';

/** Props for the TelephoneField playground example. */
export interface PlaygroundExampleProps
  extends Pick<
    TelephoneFieldProps,
    | 'label'
    | 'placeholder'
    | 'description'
    | 'errorMessage'
    | 'isDisabled'
    | 'isReadOnly'
    | 'isRequired'
    | 'isInvalid'
    | 'size'
  > {}

export function PlaygroundExample({
  label = 'Phone number',
  placeholder = '555-555-5555',
  description,
  errorMessage,
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  isInvalid = false,
  size = 'md'
}: PlaygroundExampleProps) {
  return (
    <TelephoneField
      label={label}
      placeholder={placeholder}
      description={description}
      errorMessage={errorMessage}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={isInvalid}
      size={size}
      defaultCountry="us"
      countryLabel="Country code"
    >
      <SelectItem id="us">US +1</SelectItem>
      <SelectItem id="mx">MX +52</SelectItem>
      <SelectItem id="gb">GB +44</SelectItem>
    </TelephoneField>
  );
}
