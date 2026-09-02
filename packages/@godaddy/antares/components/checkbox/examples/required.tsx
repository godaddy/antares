import { Checkbox, CheckboxGroup, FieldError, Flex, Label, Text } from '@godaddy/antares';

/**
 * Mark a checkbox group as required with visual indicator and validation.
 * @title Required Indicator
 * @order 7
 */
export function CheckboxGroupRequiredExample() {
  return (
    <CheckboxGroup isRequired>
      <Label>Favorite colors</Label>
      <Flex direction="column" gap="md">
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Flex>
      <Text slot="description">Choose your favorite color</Text>
      <FieldError>At least one color must be selected</FieldError>
    </CheckboxGroup>
  );
}
