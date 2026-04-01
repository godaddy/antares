import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioDisabledExample() {
  return (
    <>
      <RadioGroup label="Disabled group" defaultValue="basic" isDisabled>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>

      <RadioGroup label="Individual disabled options" defaultValue="standard">
        <Radio value="basic" isDisabled>
          Basic (disabled)
        </Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>
    </>
  );
}
