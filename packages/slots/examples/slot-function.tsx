/* v8 ignore next */
import React from 'react';
import { Nested } from './nested.tsx';

//
// We define the slots object outside of the component scope to avoid
// introducing a new object reference on each render wich would cause
// the Nested component to re-render unnecessarily.
//
const slots = {
  'example-container.label': function example({ props }: { props: Record<string, any> }) {
    return (
      <label {...props}>
        <strong>{props.children}</strong>
      </label>
    );
  }
};

/**
 * SlotFunction component demonstrating how to pass a slot as a function.
 *
 * @returns {JSX.Element} The rendered Nested component with a slot function.
 * @public
 */
export function SlotFunction() {
  return <Nested slots={slots} />;
}
