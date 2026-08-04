import { Checkbox, CheckboxGroup } from '@godaddy/antares';

/**
 * Display error state and error message for validation feedback.
 * @title Invalid State
 * @order 8
 */
export function CheckboxGroupInvalidExample() {
  return (
    <CheckboxGroup label="Favorite colors" isInvalid description="Choose your favorite color">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
