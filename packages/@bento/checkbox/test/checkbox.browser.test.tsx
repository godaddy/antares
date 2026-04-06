import React from 'react';
import { CheckboxExample } from '../examples/checkbox';
import { CheckboxGroupExample } from '../examples/checkbox-group';
import { CheckboxGroupIndeterminateExample } from '../examples/checkbox-group-indeterminate';
import { render } from 'vitest-browser-react';
import { describe, vi, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import assume from 'assume';

describe('@bento/checkbox', function bento() {
  describe('Checkbox', function checkboxTests() {
    it('should render a checkbox', async function defaultCheckbox() {
      const { container } = await render(<CheckboxExample />);
      const result = container.innerHTML;
      const checkbox = container.querySelector('input[type="checkbox"]');
      const checkboxLabel = container.querySelector('label');

      assume(result).includes('type="checkbox"');
      expect(checkbox).toHaveAttribute('name', 'checkbox-example');
      expect(checkbox).toHaveAttribute('value', 'checkbox-value');
      expect(checkboxLabel).toHaveTextContent('Checkbox Label');
      expect(checkbox).not.toHaveAttribute('checked');
    });

    it('should render a checkbox with a custom classname', async function customClassCheckbox() {
      const { container } = await render(<CheckboxExample className="custom-checkbox" />);
      const checkboxContainer = container.querySelector('label');
      expect(checkboxContainer).toHaveClass('custom-checkbox');
    });

    it('should be disabled when isDisabled prop is true', async function isDisabledCheckbox() {
      const { container } = await render(<CheckboxExample isDisabled />);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeDisabled();
    });

    it('should not allow selection when isReadOnly prop is true', async function isReadOnlyCheckbox() {
      const { container } = await render(<CheckboxExample isReadOnly />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveAttribute('aria-readonly', 'true');
    });

    describe('Accessibility', function accessibilityTests() {
      it('should have aria-checked attribute for indeterminate state', async function checkboxGroupIndeterminate() {
        const { container } = await render(<CheckboxExample isIndeterminate />);
        const checkboxLabel = container.querySelector('label');
        expect(checkboxLabel).toHaveAttribute('aria-checked', 'mixed');
      });
    });
  });

  describe('CheckboxGroup', function checkboxGroupTests() {
    it('should render a group of checkboxes', async function checkboxGroup() {
      const { container } = await render(<CheckboxGroupExample />);
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');

      expect(checkboxes.length).toBe(2);
    });

    it('should disable all checkboxes in the group when isDisabled prop is true', async function isDisabledGroup() {
      const { container } = await render(<CheckboxGroupExample isDisabled={true} />);
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');

      checkboxes.forEach(function checkDisabled(checkbox) {
        expect(checkbox).toBeDisabled();
      });
    });

    it('should render a group with description', async function checkboxGroupDescription() {
      const { container } = await render(<CheckboxGroupExample label="Checkbox Group with Description" />);
      const group = container.querySelector('[role="group"]');

      expect(group?.innerHTML).includes('Checkbox Group');
      expect(group?.innerHTML).includes('Select your options');
    });

    it('should render a group with an error message', async function checkboxGroupErrorReactNode() {
      const { container } = await render(<CheckboxGroupExample isInvalid />);
      const group = container.querySelector('[role="group"]');

      expect(group?.innerHTML).includes('This is an error message');
    });

    it('should render a group with complex controlled logic (indeterminate)', async function indeterminateCheckbox() {
      const { container } = await render(<CheckboxGroupIndeterminateExample />);
      const group = container.querySelector('[role="group"]');
      const selectAllCheckbox = container.querySelector('[name="select-all"]')?.closest('label');
      const firstCheckbox = container.querySelector('input[type="checkbox"][value="option1"]');

      expect(group).toHaveAttribute('data-value', '');
      expect(selectAllCheckbox).not.toHaveAttribute('data-selected');

      await userEvent.click(selectAllCheckbox!);
      expect(group).toHaveAttribute('data-value', 'option1,option2,option3,select-all');
      expect(selectAllCheckbox).toHaveAttribute('data-selected', 'true');

      await userEvent.click(firstCheckbox!);
      expect(group).toHaveAttribute('data-value', 'option2,option3');
      expect(selectAllCheckbox).toHaveAttribute('aria-checked', 'mixed');

      await userEvent.click(firstCheckbox!);
      expect(group).toHaveAttribute('data-value', 'option2,option3,option1,select-all');
      expect(selectAllCheckbox).toHaveAttribute('data-selected', 'true');

      await userEvent.click(selectAllCheckbox!);
      expect(group).toHaveAttribute('data-value', '');
      expect(selectAllCheckbox).not.toHaveAttribute('data-selected');
    });

    it('should not change the selected state when clicking on a read-only checkbox', async function readOnlyCheckbox() {
      const { container } = await render(<CheckboxGroupExample value={['checkbox-1']} isReadOnly />);
      const checkbox1 = container.querySelector('input[type="checkbox"][value="checkbox-1"]');
      const checkbox2 = container.querySelector('input[type="checkbox"][value="checkbox-2"]');

      expect(checkbox1).toHaveAttribute('checked');
      expect(checkbox2).not.toHaveAttribute('checked');
      await userEvent.click(checkbox2!);
      expect(checkbox1).toHaveAttribute('checked');
      expect(checkbox2).not.toHaveAttribute('checked');
    });

    it('should submit a form using correct values', async function submitForm() {
      const onSubmit = vi.fn(function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        e.target.setAttribute('checked-value', formData.get('checkbox-group-example') as string);
      });

      const { container } = await render(
        <form onSubmit={onSubmit}>
          <CheckboxGroupExample name="checkbox-group-example" />
          <button type="submit">Submit</button>
        </form>
      );

      const form = container.querySelector('form')!;
      const submitButton = container.querySelector('button[type="submit"]')!;
      const firstCheckbox = container.querySelector('input[value="checkbox-1"]')!;

      await userEvent.click(firstCheckbox);
      await userEvent.click(submitButton);

      expect(onSubmit).toHaveBeenCalledTimes(1);
      assume(form.getAttribute('checked-value')).equals('checkbox-1');
    });

    it('should display error message when checkbox group is required but no checkbox is selected', async function requiredCheckboxGroup() {
      const { container } = await render(
        <form>
          <CheckboxGroupExample isRequired validationBehavior="native" />
          <button type="submit">Submit</button>
        </form>
      );
      const submitButton = container.querySelector('button[type="submit"]')!;

      const form = container.querySelector('form');
      assume(form?.innerHTML).does.not.include('This is an error message');

      await userEvent.click(submitButton);

      assume(form?.innerHTML).includes('This is an error message');
    });

    describe('Accessibility', function accessibilityTests() {
      it('should add the correct attributes to the group for accessibility', async function checkboxGroupAria() {
        const { container } = await render(<CheckboxGroupExample />);
        const group = container.querySelector('[role="group"]');
        expect(group).toHaveAttribute('role', 'group');
        expect(group).toHaveAttribute('aria-labelledby');
      });

      it('should associate the visible label with the checkbox group', async function checkboxGroupAria() {
        const { container } = await render(<CheckboxGroupExample />);
        const group = container.querySelector('[role="group"]');
        const labelId = group?.getAttribute('aria-labelledby');
        const labelElement = container.querySelector(`[id="${labelId}"]`);
        expect(labelElement).toHaveTextContent('Checkbox Group');
      });
    });

    describe('Keyboard Navigation', function keyboardTests() {
      it('should be tabbable', async function checkboxGroupTabbable() {
        const { container } = await render(<CheckboxGroupExample />);
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const [firstCheckbox, secondCheckbox] = [checkboxes[0], checkboxes[1]];
        const body = document.body;

        body.focus();
        await userEvent.tab();
        expect(firstCheckbox).toHaveFocus();

        await userEvent.tab();
        expect(firstCheckbox).not.toHaveFocus();
        expect(secondCheckbox).toHaveFocus();
      });

      it('should not allow navigation between checkboxes using arrow keys', async function checkboxGroupKeyboard() {
        const { container } = await render(<CheckboxGroupExample />);
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const firstCheckbox = checkboxes[0];

        (firstCheckbox! as HTMLInputElement).focus();
        await userEvent.keyboard('{ArrowDown}');
        expect(firstCheckbox).toHaveFocus();
        await userEvent.keyboard('{ArrowUp}');
        expect(firstCheckbox).toHaveFocus();
      });

      it('should toggle checkbox selection with space key', async function checkboxGroupToggle() {
        const { container } = await render(<CheckboxGroupExample />);
        const firstCheckbox = container.querySelector('input[type="checkbox"]');
        const body = document.body;

        body.focus();
        await userEvent.tab();
        expect(firstCheckbox).toHaveFocus();
        await userEvent.keyboard('[Space]');
        expect(firstCheckbox).toBeChecked();

        await userEvent.keyboard('[Space]');
        expect(firstCheckbox).not.toBeChecked();
      });
    });
  });
});
