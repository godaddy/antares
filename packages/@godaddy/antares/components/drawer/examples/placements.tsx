import { useState } from 'react';
import { Drawer, Button, Flex, Text, type DrawerPlacement } from '@godaddy/antares';

const PLACEMENTS: DrawerPlacement[] = ['left', 'right', 'top', 'bottom'];

export function PlacementsExample() {
  const [placement, setPlacement] = useState<DrawerPlacement>('right');
  const [open, setOpen] = useState(false);

  return (
    <Flex gap="md" wrap="wrap">
      {PLACEMENTS.map(function renderButton(p) {
        return (
          <Button
            key={p}
            variant="primary"
            onPress={function openAt() {
              setPlacement(p);
              setOpen(true);
            }}
          >
            Open {p}
          </Button>
        );
      })}
      <Drawer placement={placement} isOpen={open} onOpenChange={setOpen} isDismissable title={`${placement} drawer`}>
        <Text>Placement: {placement}</Text>
      </Drawer>
    </Flex>
  );
}
