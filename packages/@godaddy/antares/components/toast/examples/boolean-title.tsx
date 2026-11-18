import { useState } from 'react';
import { Button, ToastQueue, ToastRegion } from '@godaddy/antares';

/** @ignore */
export function BooleanTitleExample({ title = true }: { title?: boolean }) {
  const [queue] = useState(() => new ToastQueue());

  return (
    <>
      <ToastRegion queue={queue} />
      <Button
        onPress={function showToast() {
          queue.add({ title, message: 'Saved', timeout: null });
        }}
      >
        Show toast
      </Button>
    </>
  );
}
