import {
  Label as RACLabel,
  LabelContext as RACLabelContext,
  type LabelProps as RACLabelProps
} from 'react-aria-components';
import { forwardRef } from 'react';

export const LabelContext = RACLabelContext;

export interface LabelProps extends RACLabelProps {}

/**
 * Label is a component that wraps a label for a form field.
 *
 * @param props - {@link LabelProps}
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(props, ref) {
  return <RACLabel {...props} ref={ref} />;
});
