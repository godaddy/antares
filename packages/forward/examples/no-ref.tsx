import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface NoRefProps {
  children?: React.ReactNode;
}

/**
 * Example showing withForwardRef with a component that doesn't accept a ref.
 * The component is returned unchanged since it doesn't need ref forwarding.
 *
 * @public
 */
export const NoRef = withForwardRef<NoRefProps>(
  function NoRef(props) {
    return <div>{props.children}</div>;
  }
);

