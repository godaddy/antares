import { forwardRef, type ReactNode } from 'react';
import {
  Label as RACLabel,
  LabelContext as RACLabelContext,
  type LabelProps as RACLabelProps
} from 'react-aria-components';

export const LabelContext = RACLabelContext;

export interface LabelProps extends Omit<RACLabelProps, 'elementType'> {
  /**
   * The HTML element to render the label as.
   */
  as?: RACLabelProps['elementType'];

  /**
   * The content to display inside the label.
   */
  children?: ReactNode;
}

/**
 * Names a form field. Field injects label chrome via {@link LabelContext}.
 *
 * @param props - {@link LabelProps}
 *
 * @example
 * ```tsx
 * <Label>Email</Label>
 * ```
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(props, ref) {
  const { as, ...rest } = props;

  return <RACLabel {...rest} ref={ref} elementType={as} />;
});
