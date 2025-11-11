import React from 'react';
import { withSlots } from '@bento/slots';
import { Text, type TextProps } from '@bento/text';
import { useProps } from '@bento/use-props';
import type { ValidationResult } from '@react-types/shared';

export interface FieldErrorProps extends TextProps, React.HTMLAttributes<HTMLElement>, Partial<ValidationResult> {}

/**
 * The `FieldError` component is used to display error messages in form primitives, such as `RadioGroup` or `CheckboxGroup`.
 */
export const FieldError = withSlots('BentoFieldError', function FieldError(args: FieldErrorProps) {
  const { props } = useProps(args);
  return props.isInvalid ? <Text {...props} /> : null;
});
