import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Text } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <InlineDrawer isDisabled>
      <InlineDrawerTrigger>Trigger</InlineDrawerTrigger>
      <InlineDrawerPanel>
        <Text>Content</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
