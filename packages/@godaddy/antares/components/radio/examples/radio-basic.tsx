import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioBasicExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="basic">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
