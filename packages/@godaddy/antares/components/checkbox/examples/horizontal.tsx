import { Checkbox, CheckboxGroup, Group, Label } from '@godaddy/antares';

/**
 * Display checkboxes in a horizontal row instead of vertical stack.
 * @title Horizontal Layout
 * @order 5
 */
export function HorizontalExample() {
  return (
    <CheckboxGroup orientation="horizontal">
      <Label>Favorite colors</Label>
      <Group>
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Group>
    </CheckboxGroup>
  );
}
