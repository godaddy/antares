import { Box, type BoxOwnProps } from '@godaddy/antares';

/** Props for the box playground example. */
export interface PlaygroundExampleProps extends Pick<BoxOwnProps, 'padding' | 'elevation' | 'rounding'> {
  /** HTML element to render as. */
  as?: 'div' | 'section' | 'article' | 'aside';
}

export function PlaygroundExample({ padding = 'md', elevation, rounding, as = 'div' }: PlaygroundExampleProps) {
  return (
    <Box as={as} padding={padding} elevation={elevation} rounding={rounding} style={{ border: '1px dashed gray' }}>
      <div style={{ background: 'lavender', padding: 8 }}>Child 1</div>
      <div style={{ background: 'lightyellow', padding: 8 }}>Child 2</div>
      <div style={{ background: 'mistyrose', padding: 8 }}>Child 3</div>
    </Box>
  );
}
