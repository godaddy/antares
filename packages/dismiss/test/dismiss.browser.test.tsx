import React from 'react';
import { Dismiss } from '@bento/dismiss';
import { render, screen } from 'vitest-browser-react';
import { describe, it, vi, expect } from 'vitest';
import assume from 'assume';
import { userEvent } from '@testing-library/user-event';

describe('@bento/dismiss', function bento() {
  describe('Dismiss', function dismissTests() {
    it('should render a dismiss button', function test() {
      const onDismiss = vi.fn();
      render(<Dismiss onDismiss={onDismiss} />);
      const button = screen.getByRole('button', { name: 'Dismiss' });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Dismiss');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('tabindex', '-1');
    });

    it('should call onDismiss when clicked', async function test() {
      const onDismiss = vi.fn();
      render(<Dismiss onDismiss={onDismiss} />);
      const button = screen.getByRole('button', { name: 'Dismiss' });

      await userEvent.click(button);

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('should use custom aria-label when provided', function test() {
      const onDismiss = vi.fn();
      render(<Dismiss onDismiss={onDismiss} ariaLabel="Close dialog" />);
      const button = screen.getByRole('button', { name: 'Close dialog' });

      expect(button).toHaveAttribute('aria-label', 'Close dialog');
    });

    it('should be visually hidden but accessible', function test() {
      const onDismiss = vi.fn();
      const { container } = render(<Dismiss onDismiss={onDismiss} />);
      const button = screen.getByRole('button', { name: 'Dismiss' });

      // Button should be in the DOM and accessible
      expect(button).toBeInTheDocument();

      // Check that it's wrapped in visually hidden element
      const visuallyHidden = container.querySelector('.react-aria-VisuallyHidden');
      assume(visuallyHidden).is.not.null();
    });

    it('should be keyboard accessible', async function test() {
      const onDismiss = vi.fn();
      render(<Dismiss onDismiss={onDismiss} />);
      const button = screen.getByRole('button', { name: 'Dismiss' });

      // Focus the button
      button.focus();
      expect(button).toHaveFocus();

      // Press Enter
      await userEvent.keyboard('{Enter}');
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('should apply slot customization', function test() {
      const onDismiss = vi.fn();
      const { container } = render(
        <Dismiss
          onDismiss={onDismiss}
          slots={{
            hidden: {
              className: 'custom-hidden'
            }
          }}
        />
      );

      const visuallyHidden = container.querySelector('.custom-hidden');
      assume(visuallyHidden).is.not.null();
    });

    it('should render without onDismiss callback', function test() {
      render(<Dismiss />);
      const button = screen.getByRole('button', { name: 'Dismiss' });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Dismiss');
    });

    it('should render with children', function test() {
      const onDismiss = vi.fn();
      render(<Dismiss onDismiss={onDismiss}>Close</Dismiss>);
      const button = screen.getByRole('button', { name: 'Dismiss' });

      expect(button).toHaveTextContent('Close');
    });

    it('should not throw when clicked without onDismiss', async function test() {
      render(<Dismiss />);
      const button = screen.getByRole('button', { name: 'Dismiss' });

      // Should not throw when clicking without onDismiss
      await userEvent.click(button);
      expect(button).toBeInTheDocument();
    });
  });
});

