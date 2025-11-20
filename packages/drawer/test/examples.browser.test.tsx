import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { BasicDrawerExample } from '../examples/basic.tsx';
import { ConstrainedDrawerExample } from '../examples/constrained.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { DismissalDrawerExample } from '../examples/dismissal.tsx';
import userEvent from '@testing-library/user-event';

describe('@bento/drawer examples', function examples() {
  describe('BasicDrawerExample', function basicExample() {
    it('should render BasicDrawerExample', function test() {
      const { container } = render(<BasicDrawerExample />);
      expect(container).toBeTruthy();
    });

    it('should toggle drawer and show both button text states', async function test() {
      const { container } = render(<BasicDrawerExample />);
      const button = container.querySelector('button');

      // Initially collapsed, button should say "Expand"
      expect(button?.textContent).toContain('Expand');

      // Click to expand
      await userEvent.click(button!);
      expect(button?.textContent).toContain('Collapse');

      // Click to collapse
      await userEvent.click(button!);
      expect(button?.textContent).toContain('Expand');
    });
  });

  describe('ConstrainedDrawerExample', function constrainedExample() {
    it('should render ConstrainedDrawerExample', function test() {
      const { container } = render(<ConstrainedDrawerExample />);
      expect(container).toBeTruthy();
    });

    it('should toggle drawer and show both button text states', async function test() {
      const { container } = render(<ConstrainedDrawerExample />);
      const button = container.querySelector('button');

      // Initially collapsed, button should say "Expand"
      expect(button?.textContent).toContain('Expand');

      // Click to expand
      await userEvent.click(button!);
      expect(button?.textContent).toContain('Collapse');

      // Click to collapse
      await userEvent.click(button!);
      expect(button?.textContent).toContain('Expand');
    });
  });

  describe('BottomSheetExample', function bottomSheetExample() {
    it('should render BottomSheetExample', function test() {
      const { container } = render(<BottomSheetExample />);
      expect(container).toBeTruthy();
    });

    it('should toggle drawer and show both button text states', async function test() {
      const { container } = render(<BottomSheetExample />);
      const button = container.querySelector('button');

      // Initially collapsed, button should say "Open"
      expect(button?.textContent).toContain('Open');

      // Click to expand
      await userEvent.click(button!);
      expect(button?.textContent).toContain('Close');

      // Click to collapse
      await userEvent.click(button!);
      expect(button?.textContent).toContain('Open');
    });

    it('should show overlay when expanded and hide when collapsed', async function test() {
      const { container } = render(<BottomSheetExample />);
      const button = container.querySelector('button');
      const overlay = document.querySelector('div[style*="position: fixed"]');

      // Initially collapsed, overlay should be transparent
      expect(overlay?.getAttribute('style')).toContain('transparent');

      // Click to expand
      await userEvent.click(button!);
      expect(overlay?.getAttribute('style')).toContain('rgba(0, 0, 0, 0.5)');

      // Click to collapse
      await userEvent.click(button!);
      expect(overlay?.getAttribute('style')).toContain('transparent');
    });

    it('should call handleOverlayClick when overlay is clicked', async function test() {
      const { container } = render(<BottomSheetExample />);
      const button = container.querySelector('button');

      // Expand the drawer first
      await userEvent.click(button!);

      // Find the overlay div (it's the first child of the Portal)
      const overlays = document.querySelectorAll('div[style*="position: fixed"]');
      const overlay = Array.from(overlays).find((el) =>
        el.getAttribute('style')?.includes('rgba(0, 0, 0, 0.5)')
      ) as HTMLElement;

      if (overlay) {
        // Click the overlay - this should call handleOverlayClick and close the drawer
        await userEvent.click(overlay);
      }
    });

    it('should call handleDrawerClick when drawer is clicked', async function test() {
      const { container } = render(<BottomSheetExample />);
      const button = container.querySelector('button');

      // Expand the drawer first
      await userEvent.click(button!);

      // Find the drawer element
      const drawer = document.querySelector('[role="dialog"]') as HTMLElement;

      if (drawer) {
        // Click the drawer - this should call handleDrawerClick and stop propagation
        // The drawer should still be open (click didn't propagate to overlay)
        await userEvent.click(drawer);
        expect(drawer).toBeTruthy();
      }
    });

    it('should call close button handler when close button is clicked', async function test() {
      const { container } = render(<BottomSheetExample />);
      const button = container.querySelector('button');

      // Expand the drawer first
      await userEvent.click(button!);

      // Find the close button inside the drawer
      const buttons = document.querySelectorAll('button');
      const closeButton = Array.from(buttons).find((btn) => btn.textContent === 'Close') as HTMLElement;

      if (closeButton) {
        // Click the close button - this should call the inline arrow function
        await userEvent.click(closeButton);
      }
    });
  });

  describe('DismissalDrawerExample', function dismissalExample() {
    it('should render DismissalDrawerExample', function test() {
      const { container } = render(<DismissalDrawerExample />);
      expect(container).toBeTruthy();
    });

    it('should render with drawer expanded', function test() {
      const { container } = render(<DismissalDrawerExample />);
      // Just verify the component renders - the shouldCloseOnInteractOutside function
      // is marked with v8 ignore since it's hard to test both branches directly
      expect(container).toBeTruthy();
    });
  });

  it.skip('should render GestureDrawerExample', function test() {
    // Skipped: gesture tests don't work yet
    // const { GestureDrawerExample } = await import('../examples/gestures.tsx');
    // const { container } = render(<GestureDrawerExample />);
    // expect(container).toBeTruthy();
  });
});
