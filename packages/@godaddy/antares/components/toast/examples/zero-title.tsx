import { Button, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

/**
 * A title of `0`, a valid React node, to test it renders instead of being treated as "no title".
 * @ignore
 */
export function ZeroTitleExample() {
  return (
    <>
      <ToastRegion queue={queue} />
      <Button
        onPress={function showToast() {
          queue.add({ title: 0, message: 'Items left', timeout: null });
        }}
      >
        Show toast
      </Button>
    </>
  );
}
