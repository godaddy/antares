import { Checkbox, CheckboxGroup } from '@godaddy/antares';

/**
 * Group multiple checkboxes together with a shared label and description.
 * @title Checkbox Group
 * @order 3
 */
export function CheckboxGroupBasicExample() {
  return (
    <CheckboxGroup label="Favorite colors">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
