import { Radio, RadioGroup } from '@godaddy/antares';

/**
 * A radio group with helper description text.
 * @title Description Text
 * @order 6
 */
export function RadioDescriptionExample() {
  return (
    <RadioGroup
      label="Notification preferences"
      description="Choose how you'd like to receive updates"
      defaultValue="email"
    >
      <Radio value="email">Email</Radio>
      <Radio value="sms">SMS</Radio>
      <Radio value="push">Push Notifications</Radio>
    </RadioGroup>
  );
}
