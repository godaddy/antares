import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * A radio group with a default selection.
 * @order 1
 */
export function DefaultExample() {
  return (
    <RadioGroup defaultValue="basic">
      <Label>Select your plan</Label>
      <Group>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </Group>
    </RadioGroup>
  );
}
