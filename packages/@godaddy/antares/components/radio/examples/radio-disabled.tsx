import { Flex, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * Disabled group and individually disabled radio options.
 * @title Disabled States
 * @order 4
 */
export function RadioDisabledExample() {
  return (
    <Flex direction="column" gap="md">
      <RadioGroup defaultValue="basic" isDisabled>
        <Label>Disabled group</Label>
        <Flex direction="column" gap="md">
          <Radio value="basic">Basic</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </Flex>
      </RadioGroup>

      <RadioGroup defaultValue="standard">
        <Label>Individual disabled options</Label>
        <Flex direction="column" gap="md">
          <Radio value="basic" isDisabled>
            Basic (disabled)
          </Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </Flex>
      </RadioGroup>
    </Flex>
  );
}
