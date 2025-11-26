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

      // Close modal
      const closeButton = getButton('Close');
      assume(closeButton).exist();
      closeButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Modal should be closed
      assume(document.body.innerHTML).does.not.include('Modal Dialog');
    });

    it('closes modal via dismiss buttons', async function testModalDismissButtons() {
      render(<Modal />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      // Test first dismiss button
      const openButton = getButton('Open Modal');
      assume(openButton).exist();
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      assume(document.body.innerHTML).includes('Modal Dialog');

      const dismissButtons = document.querySelectorAll<HTMLButtonElement>('button[aria-label="Dismiss"]');
      assume(dismissButtons.length).equals(2);

      dismissButtons[0]?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      assume(document.body.innerHTML).does.not.include('Modal Dialog');

      // Test second dismiss button
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      assume(document.body.innerHTML).includes('Modal Dialog');

      const dismissButtons2 = document.querySelectorAll<HTMLButtonElement>('button[aria-label="Dismiss"]');
      dismissButtons2[1]?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      assume(document.body.innerHTML).does.not.include('Modal Dialog');
    });

    it('confirms action and closes modal', async function testModalConfirm() {
      render(<Modal />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      const openButton = getButton('Open Modal');
      assume(openButton).exist();
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      assume(document.body.innerHTML).includes('Modal Dialog');
      assume(document.body.innerHTML).does.not.include('Action confirmed');

      const confirmButton = getButton('Confirm');
      assume(confirmButton).exist();
      confirmButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      assume(document.body.innerHTML).does.not.include('Modal Dialog');
      assume(document.body.innerHTML).includes('Action confirmed');
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

    it('closes drawer via dismiss buttons', async function testDrawerDismissButtons() {
      render(<Drawer />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      // Test first dismiss button
      const openButton = getButton('Open Drawer');
      assume(openButton).exist();
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      assume(document.body.innerHTML).includes('Side Drawer');

      const dismissButtons = document.querySelectorAll<HTMLButtonElement>('button[aria-label="Dismiss"]');
      assume(dismissButtons.length).equals(2);

      dismissButtons[0]?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      assume(document.body.innerHTML).does.not.include('Side Drawer');

      // Test second dismiss button
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      assume(document.body.innerHTML).includes('Side Drawer');

      const dismissButtons2 = document.querySelectorAll<HTMLButtonElement>('button[aria-label="Dismiss"]');
      dismissButtons2[1]?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      assume(document.body.innerHTML).does.not.include('Side Drawer');
    });

    it('closes drawer via backdrop click', async function testDrawerBackdropClick() {
      render(<Drawer />);
      const getButton = (text: string) =>
        Array.from(document.querySelectorAll('button')).find((btn) => btn.textContent === text);

      const openButton = getButton('Open Drawer');
      assume(openButton).exist();
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

      assume(document.body.innerHTML).includes('Side Drawer');

      // Find backdrop by its unique styling (fixed position with inset: 0 and semi-transparent background)
      const backdrop = Array.from(document.querySelectorAll('div')).find((el) => {
        const style = window.getComputedStyle(el);
        return style.position === 'fixed' && style.backgroundColor === 'rgba(0, 0, 0, 0.5)' && style.zIndex === '999';
      });

      assume(backdrop).exist();
      backdrop?.click();
      await new Promise((resolve) => setTimeout(resolve, 100));

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
