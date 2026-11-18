import { Button, ToastRegion, toast } from '@godaddy/antares';

/**
 * Mount one `ToastRegion` per app, then call `toast.add()` from anywhere. Toasts close on their
 * own after 5 seconds, and the timer pauses while the pointer or focus is on them.
 * @order 1
 */
export function DefaultExample() {
  return (
    <>
      <ToastRegion />
      <Button
        variant="secondary"
        onPress={function showToast() {
          toast.add({ title: 'Domain connected', message: 'Your site is now live.', emphasis: 'success' });
        }}
      >
        Show toast
      </Button>
    </>
  );
}
