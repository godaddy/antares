import { useState } from 'react';
import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

/**
 * Two regions on one queue, as when two micro front-ends share one copy of Antares. Only the first
 * region mounted shows toasts; the other takes over if it unmounts.
 * @ignore
 */
export function SharedQueueExample() {
  const [first, setFirst] = useState(true);

  return (
    <>
      {first ? <ToastRegion queue={queue} ariaLabels={{ region: 'First notifications' }} /> : null}
      <ToastRegion queue={queue} ariaLabels={{ region: 'Second notifications' }} />
      <Flex gap="sm">
        <Button
          onPress={function showToast() {
            queue.add({ message: 'Shared toast', timeout: null });
          }}
        >
          Show toast
        </Button>
        <Button
          onPress={function toggle() {
            setFirst(!first);
          }}
        >
          {first ? 'Unmount first region' : 'Mount first region'}
        </Button>
      </Flex>
    </>
  );
}
