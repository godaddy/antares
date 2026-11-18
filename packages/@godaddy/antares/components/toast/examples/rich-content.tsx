import { Button, ToastQueue, ToastRegion } from '@godaddy/antares';

const queue = new ToastQueue();

/**
 * `title` and `message` take any React node, such as formatted text or a translated
 * `<FormattedMessage />`. The content renders inside your app, so it keeps your context. Avoid
 * links or buttons in a toast that times out; use `timeout: null` when the user needs to act.
 * @order 5
 */
export function RichContentExample() {
  return (
    <>
      <ToastRegion queue={queue} />
      <Button
        variant="secondary"
        onPress={function showToast() {
          queue.add({
            title: <span data-rich-title="">example.com</span>,
            message: (
              <>
                Renewed for <strong>1 year</strong>. Your next payment is on{' '}
                <time dateTime="2027-11-17">Nov 17, 2027</time>.
              </>
            ),
            emphasis: 'success'
          });
        }}
      >
        Show rich toast
      </Button>
    </>
  );
}
