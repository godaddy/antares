import { Button, type ButtonProps } from '@godaddy/antares';

/**
 * The primary button should be used to indicate the most important action for the user to take in their current experience.
 * @order 2
 */
export function PrimaryExample(props: ButtonProps) {
  return (
    <Button {...props} variant="primary">
      Primary Button
    </Button>
  );
}
