import { Alert, type AlertProps, Button } from '@godaddy/antares';
import { useState } from 'react';

/**
 * When an `onClose` callback is provided, a dismiss button is rendered. The component does not manage its own visibility — the parent is responsible for unmounting or hiding the alert when `onClose` fires.
 * @order 3
 */
export function DismissibleExample(props?: Partial<AlertProps>) {
  const [visible, setVisible] = useState(true);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show alert</Button>;

  return (
    <Alert emphasis="success" title="Your account's been verified" onClose={() => setVisible(false)} {...props}>
      We've successfully verified your identity.
    </Alert>
  );
}
