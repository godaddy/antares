import { FieldError, Flex, Label, Radio, RadioGroup, Text } from '@godaddy/antares';

/**
 * Compose the interior when the default layout is not enough.
 * @title Composed
 * @order 10
 */
export function ComposedExample() {
  return (
    <RadioGroup defaultValue="basic">
      <Label>Select your plan</Label>
      <Flex direction="column" gap="md">
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </Flex>
      <Text slot="description">Choose one plan</Text>
      <FieldError />
    </RadioGroup>
  );
}
