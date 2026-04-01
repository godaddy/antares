import { Select, SelectItem, type SelectProps } from '@godaddy/antares';

/** Props for the select playground example. */
export interface PlaygroundExampleProps
  extends Pick<
    SelectProps<object>,
    | 'label'
    | 'placeholder'
    | 'description'
    | 'errorMessage'
    | 'size'
    | 'labelStyle'
    | 'selectionMode'
    | 'isDisabled'
    | 'isRequired'
    | 'isInvalid'
  > {}

export function PlaygroundExample({
  label = 'Pick a drink',
  placeholder = 'Select an option',
  description,
  errorMessage,
  size = 'md',
  labelStyle = 'default',
  selectionMode = 'single',
  isDisabled = false,
  isRequired = false,
  isInvalid = false
}: PlaygroundExampleProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      description={description}
      errorMessage={errorMessage}
      size={size}
      labelStyle={labelStyle}
      selectionMode={selectionMode}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
    >
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
