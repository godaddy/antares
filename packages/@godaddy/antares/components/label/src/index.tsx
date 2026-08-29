import { forwardRef } from 'react';
import {
  Label as RACLabel,
  LabelContext as RACLabelContext,
  type LabelProps as RACLabelProps
} from 'react-aria-components';

export const LabelContext = RACLabelContext;

export interface LabelProps extends RACLabelProps {}

/**
 * Names a form field. Field injects label chrome via {@link LabelContext}.
 *
 * @param props - {@link LabelProps}
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(props, ref) {
  return <RACLabel {...props} ref={ref} />;
});
