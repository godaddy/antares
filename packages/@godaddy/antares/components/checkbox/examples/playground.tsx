import { Checkbox, CheckboxGroup } from '@godaddy/antares';
import { useState } from 'react';

export interface PlaygroundExampleProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  label?: string;
  description?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  defaultValue?: string[];
  isIndeterminate?: boolean;
}

export function PlaygroundExample({
  direction = 'column',
  label = 'Select your preferences',
  description,
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  errorMessage = 'Please make a selection',
  defaultValue,
  isIndeterminate = false
}: PlaygroundExampleProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue || ['option2']);

  return (
    <CheckboxGroup
      direction={direction}
      label={label}
      description={description}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? errorMessage : undefined}
      value={selected}
      onChange={setSelected}
    >
      <Checkbox value="option1" isIndeterminate={isIndeterminate}>
        Option 1
      </Checkbox>
      <Checkbox value="option2" isIndeterminate={isIndeterminate}>
        Option 2
      </Checkbox>
      <Checkbox value="option3" isIndeterminate={isIndeterminate}>
        Option 3
      </Checkbox>
    </CheckboxGroup>
  );
}
