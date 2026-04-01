import { Flex, Select, SelectItem } from '@godaddy/antares';

export function SelectValidationExample() {
  return (
    <Flex direction="column" gap="md">
      <Select label="Required field" description="This field is required" isRequired>
        <SelectItem id="item1">Item 1</SelectItem>
        <SelectItem id="item2">Item 2</SelectItem>
      </Select>

      <Select label="Invalid field" errorMessage="Please select a valid option" isInvalid>
        <SelectItem id="item1">Item 1</SelectItem>
        <SelectItem id="item2">Item 2</SelectItem>
      </Select>
    </Flex>
  );
}
