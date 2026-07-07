import { createRef } from 'react';
import { InlineDrawer, InlineDrawerPanel, Button, Text } from '@godaddy/antares';

export const drawerRef = createRef<HTMLDivElement>();
export const panelRef = createRef<HTMLDivElement>();

export function RefForwardingExample() {
  return (
    <InlineDrawer ref={drawerRef} defaultExpanded minSize={40} maxSize="12rem">
      <Button slot="trigger">Trigger</Button>
      <InlineDrawerPanel ref={panelRef}>
        <Text>Content</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
