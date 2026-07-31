import { Checkbox, CheckboxGroup } from '@godaddy/antares';

/**
 * Display checkboxes in a horizontal row instead of vertical stack.
 * @title Horizontal Layout
 * @order 5
 */
export function CheckboxGroupHorizontalExample() {
  return (
    <CheckboxGroup label="Favorite colors" orientation="horizontal">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
