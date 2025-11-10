import React from 'react';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { VisuallyHidden as AriaVisuallyHidden, VisuallyHiddenProps as AriaVisuallyHiddenProps } from 'react-aria';

export interface VisuallyHiddenProps extends AriaVisuallyHiddenProps {
  /** The element type to render the component as. Community standard (preferred) @default 'span' */
  as?: keyof JSX.IntrinsicElements;

  /** The element type to render the component as. For React Aria compatibility. @default 'span' */
  elementType?: keyof JSX.IntrinsicElements;
}

/**
 * The `VisuallyHidden` component is used to hide content visually while keeping it accessible to screen readers and assistive technologies.
 */
export const VisuallyHidden = withSlots('BentoVisuallyHidden', function VisuallyHidden(args: VisuallyHiddenProps) {
  const { props } = useProps(args);
  const { children, as, elementType, ...rest } = props;

  // Support both `as` (community standard) and `elementType` (React Aria)
  // Prefer `as` if provided, otherwise use `elementType`, default to 'span'
  const element = as ?? elementType ?? 'span';

  return (
    <AriaVisuallyHidden {...rest} elementType={element}>
      {children}
    </AriaVisuallyHidden>
  );
});
