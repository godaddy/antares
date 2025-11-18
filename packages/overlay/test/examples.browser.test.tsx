import { Basic } from '../examples/basic.tsx';
import { Modal } from '../examples/modal.tsx';
import { Drawer } from '../examples/drawer.tsx';
import { Popover } from '../examples/popover.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/overlay examples', function overlayExamples() {
  describe('Basic', function basicExample() {
    it('renders the basic overlay example', function renderBasic() {
      const { container } = render(<Basic />);
      const result = container.innerHTML;

      // Should have the trigger button
      assume(result).includes('Open Overlay');

      // Overlay content should not be visible initially
      assume(result).does.not.include('Basic Overlay');
    });
  });

  describe('Modal', function modalExample() {
    it('renders the modal overlay example', function renderModal() {
      const { container } = render(<Modal />);
      const result = container.innerHTML;

      // Should have the trigger button
      assume(result).includes('Open Modal');

      // Modal content should not be visible initially
      assume(result).does.not.include('Modal Dialog');
    });
  });

  describe('Drawer', function drawerExample() {
    it('renders the drawer overlay example', function renderDrawer() {
      const { container } = render(<Drawer />);
      const result = container.innerHTML;

      // Should have the trigger button
      assume(result).includes('Open Drawer');

      // Drawer content should not be visible initially
      assume(result).does.not.include('Side Drawer');
    });
  });

  describe('Popover', function popoverExample() {
    it('renders the popover overlay example', function renderPopover() {
      const { container } = render(<Popover />);

      // Container should be present
      assume(container).to.exist;
      assume(container.innerHTML).includes('Open Popover');
    });
  });
});
