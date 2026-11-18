import { useState } from 'react';
import { Button, Content, Drawer } from '@godaddy/antares';

/** @ignore */
export function RejectedDismissalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer
        placement="right"
        isOpen={open}
        onOpenChange={function keepOpen(next) {
          if (next) setOpen(true);
        }}
        aria-label="Guarded"
      >
        <Content>
          <Button variant="secondary" onPress={() => setOpen(false)}>
            Discard
          </Button>
        </Content>
      </Drawer>
    </>
  );
}
