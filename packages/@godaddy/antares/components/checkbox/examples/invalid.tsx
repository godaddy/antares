import { Checkbox, CheckboxGroup, FieldError, Label, Text } from '@godaddy/antares';

/**
 * Display error state and error message for validation feedback.
 * @title Invalid State
 * @order 8
 */
export function InvalidExample() {
  return (
    <CheckboxGroup isInvalid>
      <Label>Favorite colors</Label>
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
      <Text slot="description">Choose your favorite color</Text>
      <FieldError>At least one color must be selected</FieldError>
    </CheckboxGroup>
  );
}
