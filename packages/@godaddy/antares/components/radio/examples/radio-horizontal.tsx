import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioHorizontalExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="standard" orientation="horizontal">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
