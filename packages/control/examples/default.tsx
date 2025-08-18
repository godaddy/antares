import { Control, ControlGroup } from '@bento/control';
/* v8 ignore next */
import React, { type ComponentProps } from 'react';

export function DefaultExample(props: {
  groupProps?: Partial<ComponentProps<typeof ControlGroup>>;
  controlProps?: Partial<ComponentProps<typeof Control>>;
}) {
  return (
    <ControlGroup
      label="Control label"
      description="Control description"
      errorMessage="Control error message"
      className="random-class-group"
      {...props.groupProps}
    >
      <Control label="Control 1" className="random-class-control" {...props.controlProps} />
      <Control label="Control 2" {...props.controlProps} />
    </ControlGroup>
  );
}
