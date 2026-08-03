import { InlineDrawer, InlineDrawerPanel, Button, Text } from '@godaddy/antares';

/**
 * Test-only class name passthrough example.
 * @ignore
 */
export function ClassNamePassthroughExample() {
  return (
    <InlineDrawer className="custom-drawer" defaultExpanded>
      <Button slot="trigger">Trigger</Button>
      <InlineDrawerPanel className="custom-panel">
        <Text>Content</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
