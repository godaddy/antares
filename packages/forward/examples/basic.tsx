import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface BasicExampleProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Basic example showing withForwardRef with a component that has 2 parameters.
 * In React 18, this will be automatically wrapped with forwardRef.
 * In React 19, it returns the component unchanged (refs are passed as props).
 *
 * @public
 */
export const BasicExample = withForwardRef<BasicExampleProps>(function BasicExample(
  props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  );
});
