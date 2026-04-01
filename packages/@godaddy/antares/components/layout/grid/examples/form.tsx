import { Grid, Flex } from '@godaddy/antares';

export function FormExample() {
  return (
    <Grid columns="auto 1fr" gap="md" alignItems="center" style={{ width: '400px' }}>
      <Flex as="label">Name</Flex>
      <Flex padding="sm" style={{ background: '#f5f5f5' }}>
        Input placeholder
      </Flex>

      <Flex as="label">Email</Flex>
      <Flex padding="sm" style={{ background: '#f5f5f5' }}>
        Input placeholder
      </Flex>

      <Flex as="label">Message</Flex>
      <Flex padding="sm" style={{ background: '#f5f5f5' }}>
        Textarea placeholder
      </Flex>
    </Grid>
  );
}
