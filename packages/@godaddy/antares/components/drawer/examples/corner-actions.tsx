import { Button, CloseButton, Content, CornerActions, Drawer, DrawerTrigger, Heading } from '@godaddy/antares';

/**
 * Place a dismiss action in CornerActions to compose a drawer's corner controls.
 * @title Corner Actions
 * @order 2
 */
export function CornerActionsExample() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer with corner actions</Button>
      <Drawer placement="right" aria-label="Corner actions drawer">
        <Heading slot="title">Corner actions drawer</Heading>
        <CornerActions>
          <CloseButton />
        </CornerActions>
        <Content>Close this drawer from its always-visible corner actions.</Content>
      </Drawer>
    </DrawerTrigger>
  );
}
