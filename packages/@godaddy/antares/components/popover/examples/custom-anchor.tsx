import { Popover, Box, Content, Flex, Button } from '@godaddy/antares';
import { useRef, useState } from 'react';

/**
 * To position a popover relative to a different element than its trigger, use the `triggerRef` and `isOpen` props instead of `<PopoverTrigger>`. `onOpenChange` is called when the user opens or closes the popover.
 * @title Custom Anchor
 * @order 2
 */
export function CustomAnchorExample() {
  const [isOpen, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <Flex gap="sm" alignItems="center">
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open Popover
      </Button>

      <Box elevation="card" ref={triggerRef}>
        Popover will be positioned relative to me
      </Box>

      <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen} aria-label="Popover">
        <Content>Popover content!</Content>
      </Popover>
    </Flex>
  );
}
