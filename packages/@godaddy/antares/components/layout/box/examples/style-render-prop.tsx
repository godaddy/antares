import { Box } from '@godaddy/antares';
import { ProgressBar as RACProgressBar } from 'react-aria-components';

/**
 * Test-only style render prop example.
 * @ignore
 */
export function StyleRenderPropExample({ isIndeterminate = true }: { isIndeterminate?: boolean }) {
  return (
    <Box
      as={RACProgressBar}
      aria-label="Loading"
      isIndeterminate={isIndeterminate}
      padding="md"
      value={isIndeterminate ? undefined : 50}
      style={function getStyle({ defaultStyle, isIndeterminate: isProgressIndeterminate }) {
        return { ...defaultStyle, opacity: isProgressIndeterminate ? 0.5 : 1 };
      }}
    />
  );
}
