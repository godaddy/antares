import { Select, SelectItem, type SelectProps } from '@godaddy/antares';

/** Props for the Select playground example. */
export interface PlaygroundExampleProps
  extends Pick<
    SelectProps<object>,
    | 'label'
    | 'placeholder'
    | 'description'
    | 'errorMessage'
    | 'selectionMode'
    | 'isDisabled'
    | 'isRequired'
    | 'isInvalid'
    | 'size'
  > {}

export function PlaygroundExample({
  label = 'Coffee',
  placeholder = 'Pick a drink',
  description,
  errorMessage,
  selectionMode = 'single',
  isDisabled = false,
  isRequired = false,
  isInvalid = false,
  size = 'md'
}: PlaygroundExampleProps) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      description={description}
      errorMessage={errorMessage}
      selectionMode={selectionMode}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
      size={size}
    >
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
