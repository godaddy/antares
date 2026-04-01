import { Select, SelectItem } from '@godaddy/antares';

export function SelectMultipleExample() {
  return (
    <Select aria-label="Coffee drinks" selectionMode="multiple">
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
