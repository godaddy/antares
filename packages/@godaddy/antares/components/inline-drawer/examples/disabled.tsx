import { InlineDrawer, InlineDrawerPanel, Button, Text } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <InlineDrawer isDisabled>
      <Button slot="trigger">Trigger</Button>
      <InlineDrawerPanel>
        <Text>Content</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
