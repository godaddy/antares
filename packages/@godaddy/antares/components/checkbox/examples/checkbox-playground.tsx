import { Checkbox, CheckboxGroup, FieldError, Flex, Label, Text } from '@godaddy/antares';
import { useState } from 'react';

export interface PlaygroundExampleProps {
  orientation?: 'horizontal' | 'vertical';
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
  orientation = 'vertical',
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
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      value={selected}
      onChange={setSelected}
    >
      <Label>{label}</Label>
      <Flex
        direction={orientation === 'horizontal' ? 'row' : 'column'}
        gap={orientation === 'horizontal' ? 'lg' : 'md'}
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
      </Flex>
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{isInvalid ? errorMessage : undefined}</FieldError>
    </CheckboxGroup>
  );
}
