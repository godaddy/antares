import { useState } from 'react';
import { Button, CloseButton, Content, Drawer, Heading } from '@godaddy/antares';

/**
 * Use `preventDismissal` when the drawer must close through an explicit action. Swiping, the
 * Escape key, and pressing the backdrop no longer close it, so compose a `CloseButton`.
 * @title Prevent Dismissal
 * @order 5
 */
export function PreventDismissalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open
      </Button>
      <Drawer placement="right" isOpen={open} onOpenChange={setOpen} preventDismissal>
        <Heading slot="title">Unsaved changes</Heading>
        <CloseButton />
        <Content>Only the close button closes this drawer.</Content>
      </Drawer>
    </>
  );
}
