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
    it('should render a checkbox', function defaultCheckbox() {
      const { container } = render(<CheckboxExample />);
      const result = container.innerHTML;
      const checkbox = container.querySelector('input[type="checkbox"]');
      const checkboxLabel = container.querySelector('label');

      assume(result).includes('type="checkbox"');
      expect(checkbox).toHaveAttribute('name', 'checkbox-example');
      expect(checkbox).toHaveAttribute('value', 'checkbox-value');
      expect(checkboxLabel).toHaveTextContent('Checkbox Label');
      expect(checkbox).not.toHaveAttribute('checked');
    });

    it('should render a checkbox with a custom classname', function customClassCheckbox() {
      const { container } = render(<CheckboxExample className="custom-checkbox" />);
      const checkboxContainer = container.querySelector('label');
      expect(checkboxContainer).toHaveClass('custom-checkbox');
    });

    it('should be disabled when isDisabled prop is true', function isDisabledCheckbox() {
      const { container } = render(<CheckboxExample isDisabled />);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeDisabled();
    });

    it('should not allow selection when isReadOnly prop is true', function isReadOnlyCheckbox() {
      const { container } = render(<CheckboxExample isReadOnly />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveAttribute('aria-readonly', 'true');
    });

    describe('Accessibility', function accessibilityTests() {
      it('should have aria-checked attribute for indeterminate state', async function checkboxGroupIndeterminate() {
        const { container } = render(<CheckboxExample isIndeterminate />);
        const checkboxLabel = container.querySelector('label');
        expect(checkboxLabel).toHaveAttribute('aria-checked', 'mixed');
      });
    });
  });

  describe('CheckboxGroup', function checkboxGroupTests() {
    it('should render a group of checkboxes', function checkboxGroup() {
      const { container } = render(<CheckboxGroupExample />);
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');

      expect(checkboxes.length).toBe(2);
    });

    it('should disable all checkboxes in the group when isDisabled prop is true', function isDisabledGroup() {
      const { container } = render(<CheckboxGroupExample isDisabled={true} />);
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');

      checkboxes.forEach(function checkDisabled(checkbox) {
        expect(checkbox).toBeDisabled();
      });
    });

    it('should render a group with description', function checkboxGroupDescription() {
      const { container } = render(
        <CheckboxGroupExample label="Checkbox Group with Description" description="Select your options" />
      );
      const group = container.querySelector('[role="group"]');

      expect(group?.innerHTML).includes('Checkbox Group with Description');
      expect(group?.innerHTML).includes('Select your options');
    });

    it('should render a group with an error message', function checkboxGroupError() {
      const { container } = render(<CheckboxGroupExample errorMessage="This is an error message" />);
      const group = container.querySelector('[role="group"]');

      expect(group?.innerHTML).includes('This is an error message');
    });

    it('should render a group with an error message as ReactNode', function checkboxGroupErrorReactNode() {
      const errorMessage = (
        <div data-testid="error-node">
          <span>⚠️</span>
          <span>This is a ReactNode error message</span>
        </div>
      );
      const { container } = render(<CheckboxGroupExample errorMessage={errorMessage} />);
      const group = container.querySelector('[role="group"]');
      const errorNode = container.querySelector('[data-testid="error-node"]');

      expect(group?.innerHTML).includes('This is a ReactNode error message');
      expect(errorNode).toBeDefined();
      expect(errorNode?.innerHTML).includes('⚠️');
    });

    it('should render a group with complex controlled logic (indeterminate)', async function indeterminateCheckbox() {
      const { container } = render(<CheckboxGroupIndeterminateExample />);
      const group = container.querySelector('[role="group"]');
      const selectAllCheckbox = container.querySelector('[name="select-all"]');
      const firstCheckbox = container.querySelector('input[type="checkbox"][value="option1"]');

      expect(group).toHaveAttribute('value', '');
      expect(selectAllCheckbox).not.toHaveAttribute('data-selected');

      await userEvent.click(selectAllCheckbox!);
      expect(group).toHaveAttribute('value', 'option1,option2,option3,select-all');
      expect(selectAllCheckbox).toHaveAttribute('data-selected', 'true');

      await userEvent.click(firstCheckbox!);
      expect(group).toHaveAttribute('value', 'option2,option3');
      expect(selectAllCheckbox).toHaveAttribute('aria-checked', 'mixed');

      await userEvent.click(firstCheckbox!);
      expect(group).toHaveAttribute('value', 'option2,option3,option1,select-all');
      expect(selectAllCheckbox).toHaveAttribute('data-selected', 'true');

      await userEvent.click(selectAllCheckbox!);
      expect(group).toHaveAttribute('value', '');
      expect(selectAllCheckbox).not.toHaveAttribute('data-selected');
    });

    it('should not change the selected state when clicking on a read-only checkbox', async function readOnlyCheckbox() {
      const { container } = render(<CheckboxGroupExample value={['checkbox-1']} isReadOnly />);
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

      const { container } = render(
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
      const { container } = render(
        <form>
          <CheckboxGroupExample
            isRequired={true}
            validationBehavior="native"
            errorMessage={function validate(validation) {
              return validation.isInvalid ? <span>This field is required</span> : null;
            }}
          />
          <button type="submit">Submit</button>
        </form>
      );
      const submitButton = container.querySelector('button[type="submit"]')!;

      const form = container.querySelector('form');
      assume(form?.innerHTML).does.not.include('This field is required');

      await userEvent.click(submitButton);

      assume(form?.innerHTML).includes('This field is required');
    });

    describe('Accessibility', function accessibilityTests() {
      it('should add the correct attributes to the group for accessibility', function checkboxGroupAria() {
        const { container } = render(<CheckboxGroupExample />);
        const group = container.querySelector('[role="group"]');
        expect(group).toHaveAttribute('role', 'group');
        expect(group).toHaveAttribute('aria-labelledby');
      });

      it('should associate the visible label with the checkbox group', function checkboxGroupAria() {
        const { container } = render(<CheckboxGroupExample />);
        const group = container.querySelector('[role="group"]');
        const labelId = group?.getAttribute('aria-labelledby');
        const labelElement = container.querySelector(`[id="${labelId}"]`);
        expect(labelElement).toHaveTextContent('Checkbox Group');
      });
    });

    describe('Keyboard Navigation', function keyboardTests() {
      it('should be tabbable', async function checkboxGroupTabbable() {
        const { container } = render(<CheckboxGroupExample />);
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
        const { container } = render(<CheckboxGroupExample />);
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const firstCheckbox = checkboxes[0];

        (firstCheckbox! as HTMLInputElement).focus();
        await userEvent.keyboard('{ArrowDown}');
        expect(firstCheckbox).toHaveFocus();
        await userEvent.keyboard('{ArrowUp}');
        expect(firstCheckbox).toHaveFocus();
      });

      it('should toggle checkbox selection with space key', async function checkboxGroupToggle() {
        const { container } = render(<CheckboxGroupExample />);
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
