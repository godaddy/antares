import { Checkbox, CheckboxGroup, FieldError, Flex, Label, Text } from '@godaddy/antares';

/**
 * Compose the interior when the default layout is not enough.
 * @title Composed
 * @order 9
 */
export function ComposedExample() {
  return (
    <CheckboxGroup defaultValue={['blue']}>
      <Label>Favorite colors</Label>
      <Flex direction="column" gap="md">
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Flex>
      <Text slot="description">Pick all that apply</Text>
      <FieldError />
    </CheckboxGroup>
  );
}
