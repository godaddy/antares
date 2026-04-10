/* v8 ignore next */
import { type ReactNode, useContext } from 'react';
import { Box, defaults } from '@bento/box';

/**
 * Example component demonstrating slot namespace usage.
 * Manually updates the Box context namespace to simulate what withSlots does,
 * since withSlots lives in @bento/slots and may resolve to a separate React instance
 * when used as a cross-package dependency in browser tests.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.slot] - The slot name to add to the namespace.
 * @param {ReactNode} [props.children] - Optional children elements.
 * @returns {JSX.Element} The rendered example component.
 * @public
 */
function Example(props: { slot?: string; children?: ReactNode }) {
  const ctx = useContext(Box);
  const namespace = [...ctx.slots.namespace, props.slot].filter(Boolean) as string[];

  const updatedContext = {
    ...ctx,
    slots: {
      ...ctx.slots,
      namespace
    }
  };

  return (
    <Box.Provider value={updatedContext}>
      <p>Slot namespace: {namespace.join(' > ')}</p>
      {props.children}
    </Box.Provider>
  );
}

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
