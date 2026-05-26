import { Drawer, Text } from '@godaddy/antares';

export function DefaultOpenExample() {
  return (
    <Drawer placement="right" defaultOpen isDismissable title="Default open">
      <Text>Auto-opened</Text>
    </Drawer>
  );
}
