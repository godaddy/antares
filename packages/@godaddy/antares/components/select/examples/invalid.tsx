import { Select, SelectItem } from '@godaddy/antares';

export function SelectInvalidExample() {
  return (
    <Select label="Coffee" placeholder="Pick a drink" errorMessage="Please choose a drink" isInvalid isRequired>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}
