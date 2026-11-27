import { useState } from 'react';
import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

/**
 * `timeout: null` keeps a toast until the user closes it, or until you call `close()` with the key
 * `add()` returned. A persistent toast always shows its close button.
 * @order 3
 */
export function PersistentExample() {
  const [key, setKey] = useState<string | null>(null);

  return (
    <>
      <ToastRegion queue={queue} />
      <Flex gap="sm" wrap="wrap">
        <Button
          variant="secondary"
          isDisabled={key !== null}
          onPress={function showToast() {
            setKey(
              queue.add({
                message: 'Uploading 3 files…',
                timeout: null,
                onClose: function forget() {
                  setKey(null);
                }
              })
            );
          }}
        >
          Start upload
        </Button>
        <Button
          variant="secondary"
          isDisabled={key === null}
          onPress={function closeToast() {
            if (key) queue.close(key);
          }}
        >
          Finish upload
        </Button>
      </Flex>
    </>
  );
}
