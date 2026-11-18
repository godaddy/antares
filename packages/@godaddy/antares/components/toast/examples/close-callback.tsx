import { useState } from 'react';
import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

/** @ignore */
export function CloseCallbackExample({ mounted = true }: { mounted?: boolean }) {
  const [queue] = useState(() => new ToastQueue());
  const [showRegion, setShowRegion] = useState(mounted);
  const [key, setKey] = useState<string | null>(null);
  const [closed, setClosed] = useState(0);

  return (
    <>
      {showRegion ? <ToastRegion queue={queue} /> : null}
      <output aria-label="Close count">{closed}</output>
      <Flex gap="sm">
        <Button
          onPress={function start() {
            setKey(
              queue.add({
                message: 'Uploading',
                timeout: null,
                onClose: function complete() {
                  setClosed((count) => count + 1);
                  queue.add({ message: 'Upload finished', timeout: null });
                }
              })
            );
          }}
        >
          Start upload
        </Button>
        <Button
          onPress={function finish() {
            if (key) queue.close(key);
          }}
        >
          Finish upload
        </Button>
        <Button
          onPress={function mount() {
            setShowRegion(true);
          }}
        >
          Mount region
        </Button>
      </Flex>
    </>
  );
}
