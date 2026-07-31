import { Select, SelectItem, type SelectProps } from '@godaddy/antares';

/**
 * Minimal usage with a label and a placeholder.
 * @order 1
 */
export function DefaultExample(props: Omit<SelectProps<object>, 'children'> = {}) {
  return (
    <Select label="Coffee" placeholder="Pick a drink" description="Select your favorite coffee" {...props}>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
