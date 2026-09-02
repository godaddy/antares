import { Flex, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * A radio group arranged horizontally. Match the layout `Flex`'s `direction` to `orientation`.
 * @title Horizontal Layout
 * @order 3
 */
export function RadioHorizontalExample() {
  return (
    <RadioGroup defaultValue="standard" orientation="horizontal">
      <Label>Select your plan</Label>
      <Flex direction="row" gap="lg">
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </Flex>
    </RadioGroup>
  );
}
