import { Radio, RadioGroup } from '@godaddy/antares';
import { useState } from 'react';

export interface PlaygroundExampleProps {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  description?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  defaultValue?: string;
}

export function PlaygroundExample({
  orientation = 'vertical',
  label = 'Select your plan',
  description,
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  errorMessage = 'Please make a selection',
  defaultValue
}: PlaygroundExampleProps) {
  const [selected, setSelected] = useState(defaultValue ?? 'standard');

  return (
    <RadioGroup
      orientation={orientation}
      label={label}
      description={description}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? errorMessage : undefined}
      value={selected}
      onChange={setSelected}
    >
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
