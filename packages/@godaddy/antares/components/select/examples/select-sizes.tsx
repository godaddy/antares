import { Flex, Select, SelectItem } from '@godaddy/antares';

export function SelectSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select aria-label="Small select" size="sm">
        <SelectItem id="item1">Item 1</SelectItem>
        <SelectItem id="item2">Item 2</SelectItem>
      </Select>

      <Select aria-label="Medium select" size="md">
        <SelectItem id="item1">Item 1</SelectItem>
        <SelectItem id="item2">Item 2</SelectItem>
      </Select>
    </Flex>
  );
}
