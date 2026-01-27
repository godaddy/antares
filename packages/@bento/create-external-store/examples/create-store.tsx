/* v8 ignore next */
import React, { useEffect, useSyncExternalStore } from 'react';
import { createStore } from '@bento/create-external-store';
import { withSlots } from '@bento/slots';

interface Example {
  [key: string]: any;
}

const store = createStore({ initial: 'data' });

/**
 * CreateStore component demonstrating external store creation and usage.
 *
 * @param {Example} props - The component props.
 * @returns {JSX.Element} The rendered component with store data.
 * @public
 */
export const CreateStore: React.FC<Example> = withSlots('CreatedStore', function Stored(props) {
  const data = useSyncExternalStore(store.subscribe, store.getSnapshot);

  useEffect(
    function addProps() {
      store.set(props);
    },
    [props]
  );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
});
