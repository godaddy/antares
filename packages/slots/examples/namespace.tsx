import { Slot } from '@bento/slots/context';
import React, { ReactNode, useContext } from 'react';
import { withSlots } from '@bento/slots';

const Example = withSlots('ContextExample', function Example(props: { children?: ReactNode }) {
  const ctx = useContext(Slot);

  return (
    <>
      <p>Slot namespace: {ctx.namespace.join(' > ')}</p>
      {props.children}
    </>
  );
});

//
// We are declaring our default context state outside of our component scope
// to ensure that the values that are passed to the context provider are not
// re-created on each render as that causes the context to be re-created.
//
const context = {
  components: {},
  slots: {},
  override: false,
  namespace: []
};

export function ContextExample() {
  return (
    <Slot.Provider value={context}>
      <Example slot="level 1">
        <Example slot="level 2">
          <Example slot="level 3" />
        </Example>
      </Example>
    </Slot.Provider>
  );
}
