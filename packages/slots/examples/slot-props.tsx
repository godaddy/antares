import { Nested } from './nested.tsx';
/* v8 ignore next */
import React from 'react';

//
// We define the slots object outside of the component scope to avoid
// introducing a new object reference on each render which would cause
// the Nested component to re-render unnecessarily.
//
const slots = {
  'example-container.button': {
    style: {
      background: 'red',
      border: '2px solid black'
    },
    onClick: () => console.log('Button clicked!')
  }
};

/**
 * SlotProps component demonstrating how to pass slot-specific props.
 *
 * @returns {JSX.Element} The rendered Nested component with slot props.
 * @public
 */
export function SlotProps() {
  return <Nested slots={slots} />;
}
