import { Flex, Box, type FlexOwnProps } from '@godaddy/antares';

/** Props for the flex playground example. */
export interface PlaygroundExampleProps
  extends Pick<FlexOwnProps, 'direction' | 'wrap' | 'justifyContent' | 'alignItems' | 'gap'> {
  /** HTML element to render as. */
  as?: 'div' | 'section' | 'article' | 'aside';
}

export function PlaygroundExample({
  direction = 'row',
  wrap,
  justifyContent,
  alignItems,
  gap = 'md',
  as = 'div'
}: PlaygroundExampleProps) {
  return (
    <Flex
      as={as}
      direction={direction}
      wrap={wrap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      style={{ minHeight: 120, border: '1px dashed gray' }}
    >
      <Box padding="sm" style={{ background: 'lavender' }}>
        Item 1
      </Box>
      <Box padding="sm" style={{ background: 'lightyellow' }}>
        Item 2
      </Box>
      <Box padding="sm" style={{ background: 'mistyrose' }}>
        Item 3
      </Box>
      <Box padding="sm" style={{ background: 'honeydew' }}>
        Item 4
      </Box>
    </Flex>
  );
}
