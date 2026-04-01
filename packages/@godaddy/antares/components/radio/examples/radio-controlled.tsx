import { Radio, RadioGroup } from '@godaddy/antares';
import { useState } from 'react';

export function RadioControlledExample() {
  const [selected, setSelected] = useState('standard');

  return (
    <>
      <RadioGroup label="Select your plan" value={selected} onChange={setSelected}>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>
      <p>Current selection: {selected}</p>
    </>
  );
}
