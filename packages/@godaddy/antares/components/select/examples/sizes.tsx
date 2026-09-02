import { Flex, Label, Select, SelectControl, SelectItem, SelectOptions } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes.
 * @title Sizes
 * @order 7
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select placeholder="Pick a drink">
        <Label>Coffee (md)</Label>
        <SelectControl />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
        </SelectOptions>
      </Select>
      <Select placeholder="Pick a drink" size="sm">
        <Label>Coffee (sm)</Label>
        <SelectControl />
        <SelectOptions>
          <SelectItem id="espresso">Espresso</SelectItem>
          <SelectItem id="latte">Latte</SelectItem>
          <SelectItem id="cappuccino">Cappuccino</SelectItem>
        </SelectOptions>
      </Select>
    </Flex>
  );
}
