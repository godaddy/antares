import { Flex } from '@godaddy/antares';
import { Button as RACButton } from 'react-aria-components';

/**
 * Test-only class name render prop example.
 * @ignore
 */
export function ClassNameRenderPropExample() {
  return (
    <Flex
      as={RACButton}
      direction="column"
      className={function getClassName({ isHovered }) {
        return isHovered ? 'hover' : 'idle';
      }}
    >
      Hover me
    </Flex>
  );
}
