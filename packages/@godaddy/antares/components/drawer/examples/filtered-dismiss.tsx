import { useState } from 'react';
import { Button, Content, Drawer, Text } from '@godaddy/antares';

/**
 * Test-only example for filtering outside interaction dismissal.
 * @ignore
 */
export function FilteredDismissExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer
        placement="right"
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        aria-label="Drawer"
        shouldCloseOnInteractOutside={function filter() {
          return false;
        }}
      >
        <Content>
          <Text>Filtered dismiss</Text>
        </Content>
      </Drawer>
    </>
  );
}
