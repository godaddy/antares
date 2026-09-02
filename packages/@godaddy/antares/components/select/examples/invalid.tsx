import { FieldError, Label, Select, SelectControl, SelectItem, SelectOptions } from '@godaddy/antares';

/**
 * Use `isInvalid` with a `FieldError` for validation feedback.
 * @order 4
 */
export function InvalidExample() {
  return (
    <Select placeholder="Pick a drink" isInvalid isRequired>
      <Label>Coffee</Label>
      <SelectControl />
      <FieldError>Please choose a drink</FieldError>
      <SelectOptions>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </SelectOptions>
    </Select>
  );
}
