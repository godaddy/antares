import { Alert, type AlertProps } from '@godaddy/antares';

/**
 * A minimal alert with a title and body text.
 * @order 1
 */
export function DefaultExample(props: Partial<AlertProps>) {
  return (
    <Alert emphasis="info" title="Your domain is ready" {...props}>
      You can now start building your website.
    </Alert>
  );
}
