import { useState } from 'react';
import { Button, Content, Drawer, Flex, type DrawerPlacement } from '@godaddy/antares';

const PLACEMENTS: DrawerPlacement[] = ['left', 'right', 'top', 'bottom'];

/**
 * The drawer slides in from whichever edge you set with `placement`.
 * @title Placements
 * @order 3
 */
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
      <Drawer
        placement={placement}
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        aria-label={`${placement} drawer`}
      >
        <Content>Placement: {placement}</Content>
      </Drawer>
    </Flex>
  );
}
