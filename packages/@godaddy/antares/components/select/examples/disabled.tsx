import { Select, SelectItem } from '@godaddy/antares';

export function SelectDisabledExample() {
  return (
    <Select label="Coffee" defaultValue="latte" isDisabled>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}
