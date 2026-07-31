import { Radio, RadioGroup } from '@godaddy/antares';

/**
 * A radio group arranged horizontally.
 * @title Horizontal Layout
 * @order 3
 */
export function RadioHorizontalExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="standard" orientation="horizontal">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
