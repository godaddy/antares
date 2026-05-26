import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <InlineDrawer>
      <InlineDrawerTrigger>Toggle details</InlineDrawerTrigger>
      <InlineDrawerPanel>
        <Text>Collapsible content goes here.</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
