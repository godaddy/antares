import { Flex, Label, Radio, RadioGroup, Text } from '@godaddy/antares';

/**
 * A radio group with helper description text.
 * @title Description Text
 * @order 6
 */
export function RadioDescriptionExample() {
  return (
    <RadioGroup defaultValue="email">
      <Label>Notification preferences</Label>
      <Flex direction="column" gap="md">
        <Radio value="email">Email</Radio>
        <Radio value="sms">SMS</Radio>
        <Radio value="push">Push Notifications</Radio>
      </Flex>
      <Text slot="description">Choose how you'd like to receive updates</Text>
    </RadioGroup>
  );
}
