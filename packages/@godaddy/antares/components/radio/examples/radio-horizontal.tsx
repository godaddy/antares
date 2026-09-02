import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';

/**
 * A radio group arranged horizontally.
 * @title Horizontal Layout
 * @order 3
 */
export function HorizontalExample() {
  return (
    <RadioGroup defaultValue="standard" orientation="horizontal">
      <Label>Select your plan</Label>
      <Group>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </Group>
    </RadioGroup>
  );
}
