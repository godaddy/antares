import { Box } from '@godaddy/antares';

/**
 * Test-only host composition example.
 * @ignore
 */
export function HostCompositionExample() {
  return (
    <Box as="span" className="custom" padding="md" style={{ opacity: 0.5 }}>
      Save
    </Box>
  );
}
