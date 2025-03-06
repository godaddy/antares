import { createStore } from '@bento/create-external-store';
import { useEffect, useSyncExternalStore } from 'react';
import { withSlots } from '@bento/slots';

const store = createStore({ initial: 'data' });

export const CreateStore = withSlots('CreatedStore', function Stored(props) {
  const data = useSyncExternalStore(store.subscribe, store.getSnapshot);

  useEffect(
    function addProps() {
      store.set(props);
    },
    [props]
  );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
});
