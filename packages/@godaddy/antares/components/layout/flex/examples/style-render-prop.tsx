import { Flex } from '@godaddy/antares';
import { ProgressBar as RACProgressBar } from 'react-aria-components';

/**
 * Test-only style render prop example.
 * @ignore
 */
export function StyleRenderPropExample({ isIndeterminate = true }: { isIndeterminate?: boolean }) {
  return (
    <Flex
      as={RACProgressBar}
      aria-label="Loading"
      isIndeterminate={isIndeterminate}
      gap="md"
      value={isIndeterminate ? undefined : 50}
      style={function getStyle({ defaultStyle, isIndeterminate: isProgressIndeterminate }) {
        return { ...defaultStyle, opacity: isProgressIndeterminate ? 0.5 : 1 };
      }}
    />
  );
}
