import { useState } from 'react';
import { Drawer, Button, Flex, Text, type DrawerPlacement, Box } from '@godaddy/antares';

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
      <Drawer
        placement={placement}
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        aria-label={`${placement} drawer`}
      >
        <Box
          padding="md"
          style={{
            minBlockSize: '100%',
            background:
              placement === 'left'
                ? '#eef2ff'
                : placement === 'right'
                  ? '#ecfdf5'
                  : placement === 'top'
                    ? '#fef3c7'
                    : '#fde2e4'
          }}
        >
          <Text>Placement: {placement}</Text>
        </Box>
      </Drawer>
    </Flex>
  );
}
