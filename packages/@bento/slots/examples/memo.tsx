/* v8 ignore next */
import React, { useId, useMemo, useRef } from 'react';
import { Nested } from './nested.tsx';

/**
 * Memo component demonstrating memoization of slot props and refs.
 *
 * @returns {JSX.Element} The rendered Nested component with memoized slots.
 * @public
 */
export function Memo() {
  const ref = useRef<HTMLButtonElement>(null);
  const id = useId();

  //
  // Always use React.useMemo to memoize when you pass an object to a prop
  // in order to prevent unnecessary re-renders as each object is considered
  // a new object on each render, even if the values are the same.
  //
  // NOTE: This only applies when you're not using the new React compiler as
  //       it will automatically memoize objects for you.
  //
  // Learn more at: https://react.dev/learn/react-compiler
  //
  const slots = useMemo(
    () => ({
      'example-container': {
        // This is where you would put your slot props
        id
      },
      'example-container.button': {
        // Slots can also be used to add refs to elements
        ref: ref,
        onClick: function handleClick() {
          console.log('Button ref:', ref.current);
        }
      }
    }),
    [id]
  );

  return <Nested slots={slots} />;
}
