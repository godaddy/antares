import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Box, Text } from '@godaddy/antares';

export function AnimationExample() {
  return (
    <Flex direction="column" gap="lg" style={{ maxInlineSize: 360 }}>
      <InlineDrawer defaultExpanded minSize={40} maxSize={200}>
        <InlineDrawerTrigger>Animated (default)</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Box padding="sm" style={{ background: '#eef2ff' }}>
            <Text>Expands and collapses with a transition.</Text>
          </Box>
        </InlineDrawerPanel>
      </InlineDrawer>

      <InlineDrawer defaultExpanded animate={false} minSize={40} maxSize={200}>
        <InlineDrawerTrigger>No animation</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Box padding="sm" style={{ background: '#ecfdf5' }}>
            <Text>Snaps open and closed (animate=false).</Text>
          </Box>
        </InlineDrawerPanel>
      </InlineDrawer>
    </Flex>
  );
}
