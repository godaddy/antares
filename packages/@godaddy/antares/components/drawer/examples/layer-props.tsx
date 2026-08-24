import { useState } from 'react';
import { Button, Content, Drawer, Heading } from '@godaddy/antares';

/**
 * Reaches the backdrop and the sliding panel, the two layers `className` does not target.
 * @ignore
 */
export function LayerPropsExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open drawer
      </Button>
      <Drawer
        placement="right"
        isOpen={open}
        onOpenChange={setOpen}
        className="custom-dialog"
        overlayProps={{ className: 'custom-overlay' }}
        containerProps={{ className: 'custom-container' }}
      >
        <Heading slot="title">Layer props</Heading>
        <Content>Each layer carries its own class.</Content>
      </Drawer>
    </>
  );
}
