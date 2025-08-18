import { Control, ControlGroup } from '@bento/control';
/* v8 ignore next */
import React, { useRef } from 'react';

export function InputRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ControlGroup label="Control label">
      <Control
        inputRef={inputRef}
        inputProps={{ id: 'dateId', type: 'date' }}
        labelProps={{ htmlFor: 'dateId' }}
        label="Control 1"
      />
      <Control
        inputRef={inputRef}
        inputProps={{ id: 'radioId', type: 'radio' }}
        labelProps={{ htmlFor: 'radioId' }}
        label="Control 2"
      />
    </ControlGroup>
  );
}
