import { Flex } from '@godaddy/antares';

/**
 * Test-only host composition example.
 * @ignore
 */
export function HostCompositionExample() {
  return (
    <Flex as="span" direction="column" className="custom" gap="md" style={{ opacity: 0.5 }}>
      Item
    </Flex>
  );
}
