import { Checkbox, CheckboxGroup, Flex, Label, Text } from '@godaddy/antares';

/**
 * Display error state and error message for validation feedback.
 * @title Invalid State
 * @order 8
 */
export function CheckboxGroupInvalidExample() {
  return (
    <CheckboxGroup isInvalid>
      <Label>Favorite colors</Label>
      <Flex direction="column" gap="md">
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Flex>
      <Text slot="description">Choose your favorite color</Text>
    </CheckboxGroup>
  );
}
