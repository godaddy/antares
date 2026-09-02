import { Checkbox, CheckboxGroup, Flex, Label } from '@godaddy/antares';

/**
 * Group multiple checkboxes together with a shared label.
 * @title Checkbox Group
 * @order 3
 */
export function CheckboxGroupBasicExample() {
  return (
    <CheckboxGroup>
      <Label>Favorite colors</Label>
      <Flex direction="column" gap="md">
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Flex>
    </CheckboxGroup>
  );
}
