import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface AlreadyWrappedProps {
  children?: React.ReactNode;
}

/**
 * Example showing withForwardRef with a component already using React.forwardRef.
 * The component is returned unchanged since it's already wrapped.
 *
 * @public
 */
export const AlreadyWrapped = withForwardRef(
  React.forwardRef<HTMLDivElement, AlreadyWrappedProps>(
    function AlreadyWrapped(props, ref) {
      return <div ref={ref}>{props.children}</div>;
    }
  )
);

