import { Group, Label, Radio, RadioGroup, Text } from '@godaddy/antares';

/**
 * A radio group with helper description text.
 * @title Description Text
 * @order 6
 */
export function DescriptionExample() {
  return (
    <RadioGroup defaultValue="email">
      <Label>Notification preferences</Label>
      <Group>
        <Radio value="email">Email</Radio>
        <Radio value="sms">SMS</Radio>
        <Radio value="push">Push Notifications</Radio>
      </Group>
      <Text slot="description">Choose how you'd like to receive updates</Text>
    </RadioGroup>
  );
}
