import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Box, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Box style={{ maxInlineSize: 360 }}>
      <InlineDrawer>
        <InlineDrawerTrigger>Toggle details</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Box padding="md" style={{ background: '#eef2ff' }}>
            <Text>Collapsible content goes here.</Text>
          </Box>
        </InlineDrawerPanel>
      </InlineDrawer>
    </Box>
  );
}
