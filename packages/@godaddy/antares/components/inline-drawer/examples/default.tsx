import { InlineDrawer, InlineDrawerPanel, Button, Box, Text } from '@godaddy/antares';

/**
 * Put a `<Button slot="trigger">` and an `<InlineDrawerPanel>` inside `InlineDrawer`. The panel hides when collapsed and animates open.
 * @order 1
 */
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
