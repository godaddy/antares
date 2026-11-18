import { Button, Flex, ToastQueue, ToastRegion, type ToastEmphasis } from '@godaddy/antares';

const queue = new ToastQueue();

const emphases: ReadonlyArray<readonly [ToastEmphasis, string, string]> = [
  ['none', 'Settings saved', 'Your changes will apply on the next page load.'],
  ['success', 'Domain connected', 'Your site is now live.'],
  ['critical', 'Payment failed', 'Update your card to keep your plan active.'],
  ['warning', 'Storage almost full', 'You have used 90% of your plan.']
];

/**
 * `emphasis` picks the status icon: none, a checkmark for success, and an alert icon for critical and
 * warning, told apart by color.
 * @title Emphasis Variants
 * @order 2
 */
export function EmphasesExample() {
  return (
    <>
      <ToastRegion queue={queue} />
      <Flex gap="sm" wrap="wrap">
        {emphases.map(([emphasis, title, message]) => (
          <Button
            key={emphasis}
            variant="secondary"
            onPress={function showToast() {
              queue.add({ title, message, emphasis });
            }}
          >
            Show {emphasis}
          </Button>
        ))}
      </Flex>
    </>
  );
}
