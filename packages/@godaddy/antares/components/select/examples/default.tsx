import { Label, Select, SelectControl, SelectItem, SelectOptions, Text } from '@godaddy/antares';

/**
 * Minimal usage with a `Label`, items, and a placeholder.
 * @order 1
 */
export function DefaultExample() {
  return (
    <Select placeholder="Pick a drink">
      <Label>Coffee</Label>
      <SelectControl />
      <Text slot="description">Select your favorite coffee</Text>
      <SelectOptions>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </SelectOptions>
    </Select>
  );
}
