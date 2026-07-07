import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text } from '@godaddy/antares';

export function SidebarNavExample() {
  return (
    <Flex direction="row" style={{ height: 300, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="left" defaultExpanded minSize={56} maxSize={220}>
        <InlineDrawerTrigger>Menu</InlineDrawerTrigger>
        <InlineDrawerPanel>
          {/* Fixed width + nowrap: the rail clips the labels when collapsed
              instead of reflowing them. */}
          <Flex as="nav" direction="column" gap="sm" padding="sm" style={{ inlineSize: 220, whiteSpace: 'nowrap' }}>
            <Text>Home</Text>
            <Text>Settings</Text>
            <Text>Profile</Text>
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1, borderInlineStart: '1px solid var(--bd-base)' }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
