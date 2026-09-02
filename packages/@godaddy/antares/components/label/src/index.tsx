import { forwardRef, type ReactNode, type Ref } from 'react';
import {
  Label as RACLabel,
  LabelContext as RACLabelContext,
  type LabelProps as RACLabelProps
} from 'react-aria-components';

export const LabelContext = RACLabelContext;

export interface LabelProps extends Omit<RACLabelProps, 'elementType'> {
  /** HTML element to render as. */
  as?: RACLabelProps['elementType'];

  /** Label content. */
  children?: ReactNode;
}

/** Names a form field. Field injects chrome via LabelContext. */
export const Label = forwardRef<HTMLElement, LabelProps>(function Label(props, ref) {
  const { as, ...rest } = props;

  return <RACLabel {...rest} ref={ref as Ref<HTMLLabelElement>} elementType={as} />;
});
