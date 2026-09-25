import { Card } from '@godaddy/antares';

/**
 * href turns the Card into a native link.
 * @title Link
 * @order 4
 */
export function LinkExample() {
  return (
    <Card href="/" aria-label="Link card">
      This is a link card
    </Card>
  );
}
