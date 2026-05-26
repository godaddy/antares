import { createRef } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Text } from '@godaddy/antares';

export const drawerRef = createRef<HTMLDivElement>();
export const panelRef = createRef<HTMLDivElement>();

export function RefForwardingExample() {
  return (
    <InlineDrawer ref={drawerRef} defaultExpanded>
      <InlineDrawerTrigger>Trigger</InlineDrawerTrigger>
      <InlineDrawerPanel ref={panelRef}>
        <Text>Content</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
