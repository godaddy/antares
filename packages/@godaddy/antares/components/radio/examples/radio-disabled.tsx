import { Flex, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * Disabled group and individually disabled radio options.
 * @title Disabled States
 * @order 4
 */
export function DisabledExample() {
  return (
    <Flex direction="column" gap="md">
      <RadioGroup defaultValue="basic" isDisabled>
        <Label>Disabled group</Label>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>

      <RadioGroup defaultValue="standard">
        <Label>Individual disabled options</Label>
        <Radio value="basic" isDisabled>
          Basic (disabled)
        </Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>
    </Flex>
  );
}
