import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text } from '@godaddy/antares';

export function SidebarNavExample() {
  return (
    <Flex direction="row" style={{ height: 300, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="left" defaultExpanded minSize={48} maxSize={220}>
        <InlineDrawerTrigger>Menu</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Flex as="nav" direction="column" gap="sm" padding="sm">
            <Text>Home</Text>
            <Text>Settings</Text>
            <Text>Profile</Text>
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1 }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
