import { Button, Label, Select, SelectItem, SelectOptions } from '@godaddy/antares';

/**
 * Use `isDisabled` to prevent interaction.
 * @order 5
 */
export function DisabledExample() {
  return (
    <Select defaultValue="latte" isDisabled>
      <Label>Coffee</Label>
      <Button slot="trigger" />
      <SelectOptions>
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </SelectOptions>
    </Select>
  );
}
