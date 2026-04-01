import { Grid, Flex } from '@godaddy/antares';

export function AreasExample() {
  return (
    <Grid
      areas={['header header header', 'sidebar main main', 'footer footer footer']}
      columns="200px 1fr 1fr"
      rows="auto 1fr auto"
      gap="sm"
      style={{ height: '300px' }}
    >
      <Flex gridArea="header" padding="sm" style={{ background: '#c0c0c0' }}>
        Header
      </Flex>
      <Flex gridArea="sidebar" padding="sm" style={{ background: '#d0d0d0' }}>
        Sidebar
      </Flex>
      <Flex gridArea="main" padding="sm" style={{ background: '#e0e0e0' }}>
        Main Content
      </Flex>
      <Flex gridArea="footer" padding="sm" style={{ background: '#c0c0c0' }}>
        Footer
      </Flex>
    </Grid>
  );
}
