import { Grid, Flex } from '@godaddy/antares';

export function ResponsiveExample() {
  return (
    <Grid columns="repeat(auto-fill, minmax(150px, 1fr))" gap="sm">
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 1
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 2
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 3
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 4
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 5
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 6
      </Flex>
    </Grid>
  );
}
