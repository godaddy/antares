import { Basic } from '../examples/basic.tsx';
import { Modal } from '../examples/modal.tsx';
import { Drawer } from '../examples/drawer.tsx';
import { Popover } from '../examples/popover.tsx';
import { UncontrolledWithTrigger } from '../examples/uncontrolled.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import React from 'react';

describe('@bento/overlay examples', function overlayExamples() {
  describe('Basic', function basicExample() {
    it('opens and closes the overlay with button interactions', async function testBasicInteractions() {
      const { container } = render(<Basic />);
      const getButton = (text: string) =>
        Array.from(container.querySelectorAll('button')).find((btn) => btn.textContent === text);

      // Initially closed - trigger button exists but content does not
      const openButton = getButton('Open Overlay');
      assume(openButton).exist();
      assume(container.innerHTML).does.not.include('Basic Overlay');

      // Click to open
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Content should be visible
      assume(container.innerHTML).includes('Basic Overlay');
      assume(container.innerHTML).includes('This is a simple overlay example using only the content slot.');

      // Click close button
      const closeButton = getButton('Close');
      assume(closeButton).exist();
      closeButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Content should be hidden again
      assume(container.innerHTML).does.not.include('Basic Overlay');
    });
  });

  describe('Modal', function modalExample() {
    it('opens and closes modal with full interaction', async function testModalInteractions() {
      render(<Modal />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      // Open modal
      const openButton = getButton('Open Modal');
      assume(openButton).exist();
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify modal content in portal
      assume(document.body.innerHTML).includes('Modal Dialog');
      assume(document.body.innerHTML).includes('backdrop, focus lock, scroll lock');

      // Test confirm button (triggers alert - just verify it exists)
      const confirmButton = getButton('Confirm');
      assume(confirmButton).exist();

      // Close modal
      const closeButton = getButton('Close');
      assume(closeButton).exist();
      closeButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Modal should be closed
      assume(document.body.innerHTML).does.not.include('Modal Dialog');
    });
  });

  describe('Drawer', function drawerExample() {
    it('opens and closes drawer with menu items', async function testDrawerInteractions() {
      render(<Drawer />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      // Open drawer
      const openButton = getButton('Open Drawer');
      assume(openButton).exist();
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify drawer content
      assume(document.body.innerHTML).includes('Side Drawer');
      assume(document.body.innerHTML).includes('Item 1');
      assume(document.body.innerHTML).includes('Item 2');
      assume(document.body.innerHTML).includes('Item 3');

      // Close drawer
      const closeButton = getButton('Close Drawer');
      assume(closeButton).exist();
      closeButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Drawer should be closed
      assume(document.body.innerHTML).does.not.include('Side Drawer');
    });
  });

  describe('Popover', function popoverExample() {
    it('opens and closes popover', async function testPopoverInteractions() {
      render(<Popover />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      // Open popover
      const openButton = getButton('Open Popover');
      assume(openButton).exist();
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify popover content
      assume(document.body.innerHTML).includes('Popover Content');
      assume(document.body.innerHTML).includes('non-modal popover');

      // Close popover
      const closeButton = getButton('Close');
      assume(closeButton).exist();
      closeButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Popover should be closed
      assume(document.body.innerHTML).does.not.include('Popover Content');
    });
  });

  describe('Uncontrolled', function uncontrolledExample() {
    it('toggles uncontrolled overlay', async function testUncontrolledInteractions() {
      render(<UncontrolledWithTrigger />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      // Toggle open
      const toggleButton = getButton('Toggle Overlay');
      assume(toggleButton).exist();
      toggleButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Verify uncontrolled overlay content
      assume(document.body.innerHTML).includes('Uncontrolled Overlay');
      assume(document.body.innerHTML).includes('manages its own state internally');

      // Toggle closed
      toggleButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Overlay should be closed
      assume(document.body.innerHTML).does.not.include('Uncontrolled Overlay');
    });
  });
});
