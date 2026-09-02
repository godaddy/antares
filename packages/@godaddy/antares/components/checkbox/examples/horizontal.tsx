import { Checkbox, CheckboxGroup, Flex, Label } from '@godaddy/antares';

/**
 * Display checkboxes in a horizontal row instead of vertical stack.
 * @title Horizontal Layout
 * @order 5
 */
export function CheckboxGroupHorizontalExample() {
  return (
    <CheckboxGroup>
      <Label>Favorite colors</Label>
      <Flex direction="row" gap="lg">
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Flex>
    </CheckboxGroup>
  );
}
