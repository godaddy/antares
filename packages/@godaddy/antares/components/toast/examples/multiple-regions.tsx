import { Button, Flex, ToastQueue, ToastRegion } from '@godaddy/antares';

const header = new ToastQueue();
const app = new ToastQueue();

/**
 * Each queue stands in for a separate copy of Antares, such as a shared header and the app it wraps.
 * Both regions render into one page-wide host, so their toasts stack instead of overlapping.
 * @title Multiple Regions
 * @order 5
 */
export function MultipleRegionsExample() {
  return (
    <>
      <ToastRegion queue={header} ariaLabels={{ region: 'Header notifications' }} />
      <ToastRegion queue={app} ariaLabels={{ region: 'App notifications' }} />
      <Flex gap="sm" wrap="wrap">
        <Button
          variant="secondary"
          onPress={function showHeaderToast() {
            header.add({ message: 'You have 2 new messages.' });
          }}
        >
          Header toast
        </Button>
        <Button
          variant="secondary"
          onPress={function showAppToast() {
            app.add({ message: 'Settings saved.', emphasis: 'success' });
          }}
        >
          App toast
        </Button>
      </Flex>
    </>
  );
}
