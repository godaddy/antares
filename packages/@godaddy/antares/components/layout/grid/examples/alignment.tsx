import { Grid, Flex } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyItems: center</Flex>
        <Grid columns="repeat(3, 1fr)" gap="sm" justifyItems="center" elevation="base">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: center (with fixed row height)</Flex>
        <Grid columns="repeat(3, 1fr)" rows="100px" gap="sm" alignItems="center" elevation="base">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyItems: end, alignItems: end</Flex>
        <Grid columns="repeat(3, 1fr)" rows="80px" gap="sm" justifyItems="end" alignItems="end" elevation="base">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
}
