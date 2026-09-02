import { Label, Select, SelectItem, Text } from '@godaddy/antares';

/**
 * Minimal usage with a `Label`, items, and a placeholder.
 * @order 1
 */
export function DefaultExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Coffee</Label>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
      <Text slot="description">Select your favorite coffee</Text>
    </Select>
  );
}
