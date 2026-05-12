import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text } from '@godaddy/antares';

export function VerticalExample() {
  return (
    <Flex direction="column" style={{ height: 400, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="top" defaultExpanded minSize={32} maxSize={120}>
        <InlineDrawerTrigger>Header</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Flex padding="sm">
            <Text>Top drawer content, collapses vertically.</Text>
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1 }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
