/* v8 ignore next */
import React, { type ReactNode, useContext } from 'react';
import { Box, defaults } from '@bento/box';

/**
 * Example component demonstrating slot namespace usage.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} [props.children] - Optional children elements.
 * @returns {JSX.Element} The rendered example component.
 * @public
 */
function Example(props: { children?: ReactNode }) {
  const { slots } = useContext(Box);

  return (
    <>
      <p>Slot namespace: {slots.namespace.join(' > ')}</p>
      {props.children}
    </>
  );
};

//
// We are declaring our default context state outside of our component scope
// to ensure that the values that are passed to the context provider are not
// re-created on each render as that causes the context to be re-created.
//
const context = defaults();

/**
 * Example component demonstrating context usage.
 *
 * @returns {JSX.Element} The rendered context example component.
 * @public
 */
export function ContextExample() {
  return (
    <Box.Provider value={context}>
      <Example slot="level 1">
        <Example slot="level 2">
          <Example slot="level 3" />
        </Example>
      </Example>
    </Box.Provider>
  );
}
