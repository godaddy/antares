import { InlineDrawer, InlineDrawerPanel, Button, Box, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Box style={{ maxInlineSize: 360 }}>
      <InlineDrawer>
        <Button slot="trigger">Toggle details</Button>
        <InlineDrawerPanel>
          <Box padding="md">
            <Text>Collapsible content goes here.</Text>
          </Box>
        </InlineDrawerPanel>
      </InlineDrawer>
    </Box>
  );
}
