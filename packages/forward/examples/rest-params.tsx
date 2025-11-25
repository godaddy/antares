import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface RestParamsProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Example showing withForwardRef with rest parameters (...args).
 * This pattern is useful for the future useProps(...args) API.
 * In React 18, this will be automatically wrapped with forwardRef.
 *
 * @public
 */
export const RestParams = withForwardRef<RestParamsProps>(
  function RestParams(...args: any[]) {
    // Future API pattern: const { props, ref } = useProps(args, state);
    // For now, just demonstrate the pattern
    const [props, ref] = args;
    
    return (
      <div ref={ref} className={props?.className}>
        {props?.children}
      </div>
    );
  }
);

