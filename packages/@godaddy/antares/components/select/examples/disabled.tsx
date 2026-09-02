import { Label, Select, SelectItem } from '@godaddy/antares';

/**
 * Use `isDisabled` to prevent interaction.
 * @order 5
 */
export function DisabledExample() {
  return (
    <Select defaultValue="latte" isDisabled>
      <Label>Coffee</Label>
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
    </Select>
  );
}
