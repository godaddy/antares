import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { Button, Content, Drawer, DrawerTrigger, Modal, ModalTrigger, Text } from '@godaddy/antares';

/**
 * A Modal opened from inside a Drawer must paint above the drawer's backdrop. Painting order
 * for portaled overlays follows DOM order while every overlay keeps `z-index: auto`; a fixed
 * `z-index` on one of them pins it above the others regardless of open order.
 */
function NestedModalInDrawer() {
  return (
    <DrawerTrigger>
      <Button variant="primary">Open drawer</Button>
      <Drawer placement="right" aria-label="Drawer">
        <Content>
          <ModalTrigger>
            <Button variant="primary">Open modal</Button>
            <Modal aria-label="Nested modal">
              <Content>
                <Text>Modal on top</Text>
              </Content>
            </Modal>
          </ModalTrigger>
        </Content>
      </Drawer>
    </DrawerTrigger>
  );
}

describe('@godaddy/antares', function packageTests() {
  describe('#Drawer', function drawerTests() {
    it('paints a nested Modal above the drawer backdrop', async function nestedStacking() {
      await render(<NestedModalInDrawer />);

      await userEvent.click(page.getByRole('button', { name: 'Open drawer' }));
      await expect.element(page.getByRole('dialog', { name: 'Drawer' })).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      const modal = await page.getByRole('dialog', { name: 'Nested modal' }).element();
      await expect.element(page.getByRole('dialog', { name: 'Nested modal' })).toBeVisible();

      // The topmost element at the modal's centre must be the modal itself (or a descendant),
      // not the drawer's backdrop painted over it.
      const box = modal.getBoundingClientRect();
      const topmost = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      expect(modal.contains(topmost)).toBe(true);
    });
  });
});
