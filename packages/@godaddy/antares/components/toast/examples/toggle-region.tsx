import { useState } from 'react';
import { Button, Flex, toast, ToastRegion } from '@godaddy/antares';

/**
 * Mounts and unmounts the default region, to test toasts added while no region is mounted.
 * @ignore
 */
export function ToggleRegionExample() {
  const [mounted, setMounted] = useState(false);

  return (
    <>
      {mounted ? <ToastRegion /> : null}
      <Flex gap="sm">
        <Button
          onPress={function toggle() {
            setMounted(!mounted);
          }}
        >
          {mounted ? 'Unmount region' : 'Mount region'}
        </Button>
        <Button
          onPress={function showToast() {
            toast.add({ message: 'Queued toast', timeout: null });
          }}
        >
          Show toast
        </Button>
      </Flex>
    </>
  );
}
