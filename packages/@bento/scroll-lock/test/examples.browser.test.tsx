import { render } from 'vitest-browser-react';
import { describe, it, afterEach } from 'vitest';
import assume from 'assume';
import { BasicExample } from '../examples/basic.tsx';
import { HookExample } from '../examples/hook.tsx';
import { ModalExample } from '../examples/modal.tsx';

describe('@bento/scroll-lock examples', function bento() {
  afterEach(function cleanup() {
    document.body.removeAttribute('data-scroll-locked');
  });

  describe('BasicExample', function basicExample() {
    it('applies scroll lock when rendered', async function test() {
      await render(<BasicExample />);

      // Should apply scroll lock
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');
    });
  });

  describe('HookExample', function hookExample() {
    it('applies scroll lock using the hook', async function test() {
      await render(<HookExample />);

      // Should apply scroll lock via hook
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');

      // Should render content
      const content = document.querySelector('[data-testid="hook-content"]');
      assume(content).is.not.equal(null);
    });
  });

  describe('ModalExample', function modalExample() {
    it('opens and closes modal with scroll lock', async function test() {
      const { container } = await render(<ModalExample />);

      // Modal starts closed, so no scroll lock initially
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);

      // Find and click the open button
      const openButton = container.querySelector('button');
      assume(openButton).is.not.equal(null);
      openButton?.click();

      // Wait for state to update
      await new Promise((resolve) => setTimeout(resolve, 50));

      // After opening, scroll lock should be active
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');

      // Modal should now be visible
      const modal = document.querySelector('[data-testid="modal-content"]');
      assume(modal).is.not.equal(null);

      // Find and click the close button inside modal
      const closeButton = modal?.querySelector('button');
      assume(closeButton).is.not.equal(null);
      closeButton?.click();

      // Wait for state to update
      await new Promise((resolve) => setTimeout(resolve, 50));

      // After closing, modal should be gone
      const closedModal = document.querySelector('[data-testid="modal-content"]');
      assume(closedModal).equals(null);
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);
    });

    it('closes modal when clicking backdrop', async function test() {
      const { container } = await render(<ModalExample />);

      // Open the modal
      const openButton = container.querySelector('button');
      openButton?.click();
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Modal should be open
      const modal = document.querySelector('[data-testid="modal-content"]');
      assume(modal).is.not.equal(null);
      assume(document.body.getAttribute('data-scroll-locked')).equals('true');

      // Click the backdrop (it's the sibling before the modal content)
      const backdrop = modal?.previousElementSibling;
      assume(backdrop).is.not.equal(null);
      (backdrop as HTMLElement)?.click();

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Modal should be closed
      const closedModal = document.querySelector('[data-testid="modal-content"]');
      assume(closedModal).equals(null);
      assume(document.body.getAttribute('data-scroll-locked')).equals(null);
    });
  });
});
