import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Text } from '@godaddy/antares';

export function ClassNamePassthroughExample() {
  return (
    <InlineDrawer className="custom-drawer" defaultExpanded>
      <InlineDrawerTrigger className="custom-trigger">Trigger</InlineDrawerTrigger>
      <InlineDrawerPanel className="custom-panel">
        <Text>Content</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
