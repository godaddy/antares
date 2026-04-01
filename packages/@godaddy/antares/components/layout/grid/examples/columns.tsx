import { Grid, Flex } from '@godaddy/antares';

export function ColumnsExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">columns: repeat(2, 1fr)</Flex>
        <Grid columns="repeat(2, 1fr)" gap="sm">
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
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">columns: 1fr 2fr 1fr</Flex>
        <Grid columns="1fr 2fr 1fr" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Narrow
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Wide
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Narrow
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">columns: auto 1fr auto</Flex>
        <Grid columns="auto 1fr auto" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Auto
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Flexible
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Auto
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
}
