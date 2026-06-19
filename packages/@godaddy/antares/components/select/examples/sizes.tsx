import { Flex, Select, SelectItem } from '@godaddy/antares';

export function SelectSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select label="Coffee (md)" placeholder="Pick a drink">
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
      <Select label="Coffee (sm)" placeholder="Pick a drink" size="sm">
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
      </Select>
    </Flex>
  );
}
