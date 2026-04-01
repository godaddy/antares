import { Grid, Box, type GridOwnProps } from '@godaddy/antares';

/** Props for the grid playground example. */
export interface PlaygroundExampleProps
  extends Pick<GridOwnProps, 'columns' | 'gap' | 'justifyContent' | 'alignItems'> {
  /** HTML element to render as. */
  as?: 'div' | 'section' | 'article' | 'aside';
}

export function PlaygroundExample({
  columns = 'repeat(3, 1fr)',
  gap = 'md',
  justifyContent,
  alignItems,
  as = 'div'
}: PlaygroundExampleProps) {
  return (
    <Grid
      as={as}
      columns={columns}
      gap={gap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      style={{ border: '1px dashed gray' }}
    >
      <Box padding="sm" style={{ background: 'lavender' }}>
        Cell 1
      </Box>
      <Box padding="sm" style={{ background: 'lightyellow' }}>
        Cell 2
      </Box>
      <Box padding="sm" style={{ background: 'mistyrose' }}>
        Cell 3
      </Box>
      <Box padding="sm" style={{ background: 'honeydew' }}>
        Cell 4
      </Box>
      <Box padding="sm" style={{ background: 'aliceblue' }}>
        Cell 5
      </Box>
    </Grid>
  );
}
