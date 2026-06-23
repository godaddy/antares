import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { TextField as RACTextField } from 'react-aria-components';
import { Field, FieldError, FieldGroup, FieldInput } from '@godaddy/antares';
import { FieldGroupBasic } from '../examples/basic';
import { FieldGroupLeadingControl } from '../examples/leading-control';
import { FieldGroupTrailingControl } from '../examples/trailing-control';

// Appearance (CSS classes, element presence, layout) is covered by field.visual.test.tsx.
// These tests cover behavior a screenshot can't assert: conditional rendering, keyboard
// focus order, and disabled-state propagation.
describe('@godaddy/antares', function antares() {
  describe('#FieldGroup', function fieldGroupTests() {
    describe('#label', function label() {
      it('does not render label when omitted', async function noLabel() {
        const { container } = await render(<FieldGroupBasic label={undefined} />);
        const labels = container.querySelectorAll('label');
        assume(labels.length).equals(0);
      });
    });

    describe('#description', function description() {
      it('does not render description when omitted', async function noDescription() {
        const { container } = await render(<FieldGroupBasic description={undefined} />);
        const descriptions = container.querySelectorAll('[slot="description"]');
        assume(descriptions.length).equals(0);
      });
    });

    describe('#required', function required() {
      it('renders required asterisk when isRequired', async function rendersRequired() {
        const { locator } = await render(<FieldGroupBasic label="Email" isRequired />);

        const labelEl = locator.getByText('Email').element();
        assume(labelEl.textContent).includes('*');
      });
    });

    describe('#leading-control', function leadingControl() {
      it('moves focus to the leading button on tab', async function focusOrder() {
        const { locator } = await render(<FieldGroupLeadingControl isDisabled={false} />);
        const button = locator.getByRole('button').element();

        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);
      });

      it('marks the group disabled when isDisabled', async function groupDisabled() {
        const { container } = await render(<FieldGroupLeadingControl isDisabled={true} />);
        const group = container.querySelector('[role="group"]') as HTMLElement;

        assume(group.hasAttribute('data-disabled')).equals(true);
      });
    });

    describe('#trailing-control', function trailingControl() {
      it('moves focus through the input to the trailing button on tab', async function focusOrder() {
        const { locator } = await render(<FieldGroupTrailingControl />);
        const button = locator.getByRole('button').element();

        await userEvent.tab();
        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);
      });
    });

    describe('#validation', function validation() {
      // FieldGroup has no isInvalid prop here: it must pick up the field's runtime validation
      // state from RAC's FieldErrorContext.
      it('marks the group invalid via FieldErrorContext when submit fails validation', async function submitInvalid() {
        const { container } = await render(
          <form>
            <Field as={RACTextField} isRequired>
              <FieldGroup data-testid="group">
                <FieldInput aria-label="Email" />
              </FieldGroup>
              <FieldError />
            </Field>
            <button type="submit">Submit</button>
          </form>
        );

        const group = container.querySelector('[data-testid="group"]') as HTMLElement;
        assume(group.hasAttribute('data-invalid')).equals(false);

        await userEvent.click(page.getByRole('button', { name: 'Submit' }));

        assume(group.hasAttribute('data-invalid')).equals(true);
      });
    });
  });
});
