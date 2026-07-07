import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Box, Text } from '@godaddy/antares';

export function SidebarNavExample() {
  return (
    <Flex direction="row" style={{ height: 300, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="left" defaultExpanded minSize={56} maxSize={220}>
        <Box style={{ background: '#e0e7ff', blockSize: '100%' }}>
          <InlineDrawerTrigger>Menu</InlineDrawerTrigger>
          <InlineDrawerPanel>
            <Flex as="nav" direction="column" gap="sm" padding="sm">
              <Text>Home</Text>
              <Text>Settings</Text>
              <Text>Profile</Text>
            </Flex>
          </InlineDrawerPanel>
        </Box>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1, background: '#f8fafc' }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
