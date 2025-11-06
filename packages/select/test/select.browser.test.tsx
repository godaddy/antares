import { Select } from '@bento/select';
import { ListBoxItem } from '@bento/listbox';
import { render } from 'vitest-browser-react';
import { describe, it, vi, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import assume from 'assume';
import React from 'react';

describe('@bento/select', function bento() {
  describe('Select', function selectTests() {
    it('should render a select button', function test() {
      const { container } = render(
        <Select aria-label="Choose a fruit" placeholder="Select a fruit">
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
        </Select>
      );
      const button = container.querySelector('button');

      expect(button).toBeTruthy();
      expect(button).toHaveAttribute('aria-label', 'Choose a fruit');
    });

    it('should display placeholder when no option is selected', function test() {
      const { container } = render(
        <Select aria-label="Choose a fruit" placeholder="Select a fruit">
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
        </Select>
      );
      const button = container.querySelector('button');

      expect(button).toHaveTextContent('Select a fruit');
    });

    it('should open the popover when button is clicked', async function test() {
      const { container } = render(
        <Select aria-label="Choose a fruit" placeholder="Select a fruit">
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="banana" textValue="Banana">
            Banana
          </ListBoxItem>
        </Select>
      );
      const button = container.querySelector('button');

      expect(container.querySelector('[role="listbox"]')).toBeFalsy();
      await userEvent.click(button!);
      expect(container.querySelector('[role="listbox"]')).toBeTruthy();
    });

    it('should close the popover when an option is selected', async function test() {
      const { container } = render(
        <Select aria-label="Choose a fruit" placeholder="Select a fruit">
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="banana" textValue="Banana">
            Banana
          </ListBoxItem>
        </Select>
      );
      const button = container.querySelector('button');

      await userEvent.click(button!);
      const listbox = container.querySelector('[role="listbox"]');
      expect(listbox).toBeTruthy();

      const firstOption = container.querySelector('[role="option"]');
      await userEvent.click(firstOption!);

      // Popover should close after selection
      expect(container.querySelector('[role="listbox"]')).toBeFalsy();
    });

    it('should display selected value in button', async function test() {
      const { container } = render(
        <Select aria-label="Choose a fruit" placeholder="Select a fruit">
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="banana" textValue="Banana">
            Banana
          </ListBoxItem>
        </Select>
      );
      const button = container.querySelector('button');

      await userEvent.click(button!);
      const firstOption = container.querySelector('[role="option"]');
      await userEvent.click(firstOption!);

      expect(button).toHaveTextContent('Apple');
    });

    it('should call onSelectionChange when option is selected', async function test() {
      const onSelectionChange = vi.fn();
      const { container } = render(
        <Select aria-label="Choose a fruit" placeholder="Select a fruit" onSelectionChange={onSelectionChange}>
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="banana" textValue="Banana">
            Banana
          </ListBoxItem>
        </Select>
      );
      const button = container.querySelector('button');

      await userEvent.click(button!);
      const firstOption = container.querySelector('[role="option"]');
      await userEvent.click(firstOption!);

      expect(onSelectionChange).toHaveBeenCalledTimes(1);
      // onSelectionChange receives a Selection which is a Set<Key> or "all"
      const callArgs = onSelectionChange.mock.calls[0];
      expect(callArgs[0]).toBeInstanceOf(Set);
      expect(callArgs[0].has('apple')).toBe(true);
    });

    it('should be disabled when isDisabled prop is true', function test() {
      const { container } = render(
        <Select aria-label="Choose a fruit" placeholder="Select a fruit" isDisabled>
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
        </Select>
      );
      const button = container.querySelector('button');

      expect(button).toBeDisabled();
    });

    it('should pass down props to the select container', function test() {
      const { container } = render(
        <Select aria-label="Choose a fruit" className="my-select" style={{ color: 'red' }}>
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
        </Select>
      );
      const selectContainer = container.querySelector('[slot="select"]');

      expect(selectContainer).toHaveClass('my-select');
      expect(selectContainer).toHaveStyle({ color: 'red' });
    });

    describe('Accessibility', function accessibilityTests() {
      it('should have correct aria attributes', function test() {
        const { container } = render(
          <Select aria-label="Choose a fruit" placeholder="Select a fruit">
            <ListBoxItem id="apple" textValue="Apple">
              Apple
            </ListBoxItem>
          </Select>
        );
        const button = container.querySelector('button');

        expect(button).toHaveAttribute('aria-label', 'Choose a fruit');
        expect(button).toHaveAttribute('aria-haspopup', 'listbox');
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });

      it('should update aria-expanded when opened', async function test() {
        const { container } = render(
          <Select aria-label="Choose a fruit" placeholder="Select a fruit">
            <ListBoxItem id="apple" textValue="Apple">
              Apple
            </ListBoxItem>
          </Select>
        );
        const button = container.querySelector('button');

        expect(button).toHaveAttribute('aria-expanded', 'false');
        await userEvent.click(button!);
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });
});
