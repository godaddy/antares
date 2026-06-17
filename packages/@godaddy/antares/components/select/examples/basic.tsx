import { Select, SelectItem, type SelectProps } from '@godaddy/antares';

export function SelectBasic(props: Omit<SelectProps<object>, 'children'> = {}) {
  return (
    <Select label="Coffee" placeholder="Pick a drink" {...props}>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
