import { FieldError, type FieldErrorProps } from '@bento/field-error';
/* v8 ignore next */
import React from 'react';

export function DefaultExample(args: FieldErrorProps) {
  return <FieldError {...args}>This field is required</FieldError>;
}
