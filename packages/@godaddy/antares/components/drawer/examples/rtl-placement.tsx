import { useState } from 'react';
import { I18nProvider } from 'react-aria-components';
import { Drawer, Button, Text } from '@godaddy/antares';

export function RTLPlacementExample() {
  const [open, setOpen] = useState(false);
  return (
    <I18nProvider locale="ar-AE">
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer placement="left" isOpen={open} onOpenChange={setOpen} isDismissable title="RTL">
        <Text>RTL content</Text>
      </Drawer>
    </I18nProvider>
  );
}
