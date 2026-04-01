import { Grid, Flex, type GridProps } from '@godaddy/antares';

export function DefaultExample(props: GridProps) {
  return (
    <Grid columns="repeat(3, 1fr)" gap="sm" {...props}>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 1
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 2
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 3
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 4
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 5
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 6
      </Flex>
    </Grid>
  );
}
