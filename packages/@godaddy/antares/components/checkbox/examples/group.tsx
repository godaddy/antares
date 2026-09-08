import { Checkbox, CheckboxGroup, Group, Label } from '@godaddy/antares';

/**
 * Group multiple checkboxes together with a shared label.
 * @title Checkbox Group
 * @order 3
 */
export function GroupExample() {
  return (
    <CheckboxGroup>
      <Label>Favorite colors</Label>
      <Group>
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Group>
    </CheckboxGroup>
  );
}
