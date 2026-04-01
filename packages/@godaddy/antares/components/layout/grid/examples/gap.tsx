import { Grid, Flex } from '@godaddy/antares';

export function GapExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xs</Flex>
        <Grid columns="repeat(3, 1fr)" gap="xs">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: md</Flex>
        <Grid columns="repeat(3, 1fr)" gap="md">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xl</Flex>
        <Grid columns="repeat(3, 1fr)" gap="xl">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">rowGap: lg, columnGap: xs</Flex>
        <Grid columns="repeat(3, 1fr)" rowGap="lg" columnGap="xs">
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
      </Flex>
    </Flex>
  );
}
