import { Box } from '@godaddy/antares';
import { Button as RACButton } from 'react-aria-components';

/**
 * Test-only class name render prop example.
 * @ignore
 */
export function ClassNameRenderPropExample() {
  return (
    <Box
      as={RACButton}
      className={function getClassName({ isHovered }) {
        return isHovered ? 'hover' : 'idle';
      }}
    >
      Hover me
    </Box>
  );
}
