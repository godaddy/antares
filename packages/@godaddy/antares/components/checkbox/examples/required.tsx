import { Checkbox, CheckboxGroup, Label, Text } from '@godaddy/antares';

/**
 * Mark a checkbox group as required with visual indicator and validation.
 * @title Required Indicator
 * @order 7
 */
export function RequiredExample() {
  return (
    <CheckboxGroup isRequired>
      <Label>Favorite colors</Label>
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
      <Text slot="description">Choose your favorite color</Text>
    </CheckboxGroup>
  );
}
