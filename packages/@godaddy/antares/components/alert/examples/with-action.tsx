import { Alert, Button } from '@godaddy/antares';

/**
 * Pass a `Button` to the `actions` slot to give the user a clear path to resolve the alert.
 * @order 4
 */
export function WithActionExample() {
  return (
    <Alert
      emphasis="warning"
      title="Your payment method is expiring"
      actions={
        <Button variant="secondary" size="sm">
          Update Payment Method
        </Button>
      }
      onClose={() => undefined}
    >
      Please update your payment method before it expires.
    </Alert>
  );
}
