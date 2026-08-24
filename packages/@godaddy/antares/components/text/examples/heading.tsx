import { Flex, Heading } from '@godaddy/antares';

/**
 * `Heading` renders a semantic `h1`-`h6` element via the `level` prop (default `2`).
 * Inside a `Modal`/`Dialog`, add `slot="title"` and it labels the dialog automatically.
 * @order 2
 */
export function HeadingExample() {
  return (
    <Flex direction="column" gap="sm">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
    </Flex>
  );
}
