import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it, expect, vi } from 'vitest';
import assume from 'assume';
import { userEvent } from '@testing-library/user-event';
import {
  ButtonExample,
  ButtonWithAriaExample,
  ButtonWithDataAttributesExample,
  ButtonInFormExample,
  DisabledButtonExample,
  ButtonWithRenderPropExample
} from '../examples/button';
import { ButtonVariantsExample } from '../examples/variants';

describe('@bento/button examples', function examples() {
  describe('Button', function buttonExamples() {
    it('renders the button', function rendersButton() {
      const { container } = render(<ButtonExample>Click me!</ButtonExample>);
      const result = container.innerHTML;
      assume(result).matches(/^<button[^>]*>Click me!<\/button>$/);
    });

    it('renders button with default children', function rendersButtonDefault() {
      const { container } = render(<ButtonExample />);
      const button = container.querySelector('button');
      expect(button?.textContent).toBe('Click me');
    });

    it('renders the button with variants', function rendersButtonVariants() {
      const { container } = render(<ButtonVariantsExample type="submit">Submit</ButtonVariantsExample>);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button?.textContent).toBe('Submit');
    });

    it('renders button variants with default children', function rendersVariantsDefault() {
      const { container } = render(<ButtonVariantsExample />);
      const button = container.querySelector('button');
      expect(button?.textContent).toBe('Click me!');
    });

    it('renders button with ARIA example', function rendersAriaExample() {
      const { container } = render(<ButtonWithAriaExample />);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('renders button with data attributes example', function rendersDataExample() {
      const { container } = render(<ButtonWithDataAttributesExample />);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('data-testid', 'my-button');
      expect(button).toHaveAttribute('data-foo', 'bar');
      expect(button).toHaveAttribute('data-select-trigger', 'true');
    });

    it('renders button in form example', function rendersFormExample() {
      const { container } = render(<ButtonInFormExample />);
      const button = container.querySelector('button');
      const form = container.querySelector('form');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
      expect(button).toHaveAttribute('name', 'action');
      expect(button).toHaveAttribute('value', 'submit');
      expect(form).toHaveAttribute('id', 'test-form');
    });

    it('renders disabled button example', function rendersDisabledExample() {
      const { container } = render(<DisabledButtonExample />);
      const button = container.querySelector('button');
      expect(button).toBeDisabled();
    });

    it('renders button with render prop example', function rendersRenderPropExample() {
      // Mock console.log to capture the call
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(function mockLog() {
        // Intentionally empty
      });

      const { container } = render(<ButtonWithRenderPropExample />);
      const button = container.querySelector('button');
      expect(button?.textContent).toBe('Click me');

      consoleSpy.mockRestore();
    });

    it('calls onPress in render prop example', async function callsOnPressRenderProp() {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(function mockLog() {
        // Intentionally empty
      });

      const { container } = render(<ButtonWithRenderPropExample />);
      const button = container.querySelector('button')!;

      await userEvent.click(button);
      expect(consoleSpy).toHaveBeenCalledWith('pressed');

      consoleSpy.mockRestore();
    });

    it('updates content on hover in render prop example', async function updatesOnHover() {
      const { container } = render(<ButtonWithRenderPropExample />);
      const button = container.querySelector('button')!;

      expect(button.textContent).toBe('Click me');

      await userEvent.hover(button);
      expect(button.textContent).toBe('Hover!');

      await userEvent.unhover(button);
      expect(button.textContent).toBe('Click me');
    });
  });
});
