import { Checkbox, CheckboxGroup } from '@godaddy/antares';

/**
 * Mark a checkbox group as required with visual indicator and validation.
 * @title Required Indicator
 * @order 7
 */
export function CheckboxGroupRequiredExample() {
  return (
    <CheckboxGroup
      label="Favorite colors"
      errorMessage="At least one color must be selected"
      description="Choose your favorite color"
      isRequired
    >
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
