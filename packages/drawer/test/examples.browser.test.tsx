import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { BasicDrawerExample } from '../examples/basic.tsx';
import { ConstrainedDrawerExample } from '../examples/constrained.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { GestureDrawerExample } from '../examples/gestures.tsx';
import userEvent from '@testing-library/user-event';

describe('@bento/drawer examples', function examples() {
  describe('BasicDrawerExample', function basicExample() {
    it('should render BasicDrawerExample', function test() {
      const { container } = render(<BasicDrawerExample />);
      expect(container).toBeTruthy();
    });

    it('should have aria-expanded="false" when drawer is closed', function test() {
      const { container } = render(<BasicDrawerExample />);
      const drawer = container.querySelector('[aria-expanded]');
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

    it('should change aria-expanded to "true" when drawer opens', async function test() {
      const { container } = render(<BasicDrawerExample />);
      const button = container.querySelector('button') as HTMLElement;
      const drawer = container.querySelector('[aria-expanded]') as HTMLElement;

      expect(drawer).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');
    });

    it('should change aria-expanded back to "false" when drawer closes', async function test() {
      const { container } = render(<BasicDrawerExample />);
      const button = container.querySelector('button') as HTMLElement;
      const drawer = container.querySelector('[aria-expanded]') as HTMLElement;

      // Open drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');

      // Close drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('ConstrainedDrawerExample', function constrainedExample() {
    it('should render ConstrainedDrawerExample', function test() {
      const { container } = render(<ConstrainedDrawerExample />);
      expect(container).toBeTruthy();
    });

    it('should have aria-expanded="false" when drawer is closed', function test() {
      const { container } = render(<ConstrainedDrawerExample />);
      const drawer = container.querySelector('[aria-expanded]');
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

    it('should change aria-expanded to "true" when drawer opens', async function test() {
      const { container } = render(<ConstrainedDrawerExample />);
      const button = container.querySelector('button') as HTMLElement;
      const drawer = container.querySelector('[aria-expanded]') as HTMLElement;

      expect(drawer).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');
    });

    it('should change aria-expanded back to "false" when drawer closes', async function test() {
      const { container } = render(<ConstrainedDrawerExample />);
      const button = container.querySelector('button') as HTMLElement;
      const drawer = container.querySelector('[aria-expanded]') as HTMLElement;

      // Open drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');

      // Close drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('BottomSheetExample', function bottomSheetExample() {
    it('should render BottomSheetExample', function test() {
      const { container } = render(<BottomSheetExample />);
      expect(container).toBeTruthy();
    });

    it('should have aria-expanded="false" when drawer is closed', function test() {
      render(<BottomSheetExample />);
      const drawer = document.querySelector('[aria-expanded]');
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

    it('should change aria-expanded to "true" when drawer opens', async function test() {
      render(<BottomSheetExample />);
      const button = document.querySelector('#bottom-sheet button') as HTMLElement;
      const drawer = document.querySelector('[aria-expanded]') as HTMLElement;

      expect(drawer).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');
    });

    it('should change aria-expanded back to "false" when drawer closes', async function test() {
      render(<BottomSheetExample />);
      const button = document.querySelector('#bottom-sheet button') as HTMLElement;
      const drawer = document.querySelector('[aria-expanded]') as HTMLElement;

      // Open drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');

      // Close drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

    it('should change aria-expanded to "false" when overlay is clicked', async function test() {
      render(<BottomSheetExample />);
      const button = document.querySelector('#bottom-sheet button') as HTMLElement;
      const drawer = document.querySelector('[aria-expanded]') as HTMLElement;

      // Open drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');

      // Click overlay to close
      const overlay = document.querySelector('.drawer-overlay') as HTMLElement;
      await userEvent.click(overlay);
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

    it('should change aria-expanded to "false" when close button is clicked', async function test() {
      render(<BottomSheetExample />);
      const button = document.querySelector('#bottom-sheet button') as HTMLElement;
      const drawer = document.querySelector('[aria-expanded]') as HTMLElement;

      // Open drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');

      // Click close button inside drawer
      const buttons = document.querySelectorAll('button');
      const closeButton = Array.from(buttons).find((btn) => btn.textContent === 'Close' && btn !== button) as HTMLElement;
      await userEvent.click(closeButton);
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

  });

  describe('GestureDrawerExample', function gestureExample() {
    it('should render GestureDrawerExample', function test() {
      const { container } = render(<GestureDrawerExample />);
      expect(container).toBeTruthy();
    });

    it('should have aria-expanded="false" when drawer is closed', function test() {
      render(<GestureDrawerExample />);
      const drawer = document.querySelector('[aria-expanded]');
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });

    it('should change aria-expanded to "true" when drawer opens', async function test() {
      render(<GestureDrawerExample />);
      const button = document.querySelector('#gestures button') as HTMLElement;
      const drawer = document.querySelector('[aria-expanded]') as HTMLElement;

      expect(drawer).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');
    });

    it('should change aria-expanded back to "false" when drawer closes', async function test() {
      render(<GestureDrawerExample />);
      const button = document.querySelector('#gestures button') as HTMLElement;
      const drawer = document.querySelector('[aria-expanded]') as HTMLElement;

      // Open drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'true');

      // Close drawer
      await userEvent.click(button);
      expect(drawer).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
