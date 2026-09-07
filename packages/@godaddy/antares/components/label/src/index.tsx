import { forwardRef, type Ref } from 'react';
import {
  Label as RACLabel,
  LabelContext as RACLabelContext,
  type LabelProps as RACLabelProps
} from 'react-aria-components';

export const LabelContext = RACLabelContext;

export interface LabelProps extends Omit<RACLabelProps, 'elementType'> {
  /** Label content. */
  children?: RACLabelProps['children'];
}

/**
 * Names a form field. The element type comes from the field root (RAC renders a `span`
 * for group fields), and `data-label` lets a field's CSS find it either way.
 */
export const Label = forwardRef<HTMLElement, LabelProps>(function Label(props, ref) {
  return <RACLabel {...props} ref={ref as Ref<HTMLLabelElement>} data-label="" />;
});
