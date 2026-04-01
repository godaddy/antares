import { Flex, Select, SelectItem } from '@godaddy/antares';

export function SelectLabelStylesExample() {
  return (
    <Flex direction="column" gap="md">
      <Select label="Default label" labelStyle="default">
        <SelectItem id="item1">Item 1</SelectItem>
        <SelectItem id="item2">Item 2</SelectItem>
      </Select>

      <Select label="Floating label" labelStyle="float">
        <SelectItem id="item1">Item 1</SelectItem>
        <SelectItem id="item2">Item 2</SelectItem>
      </Select>
    </Flex>
  );
}
