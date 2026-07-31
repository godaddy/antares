import { Button, Text } from '@godaddy/antares';

/**
 * The inline button sits within a run of text, styled like a link while retaining button semantics.
 * @order 6
 */
export function InlineExample() {
  return (
    <Text>
      I am an <Button variant="inline">inline button</Button> surrounded by text!
    </Text>
  );
}
