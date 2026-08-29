import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { FieldError, Group, Input, TextField } from '@godaddy/antares';
import { AdornmentsExample } from '../examples/adornments';
import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { DisabledExample } from '../examples/disabled';
import { InvalidExample } from '../examples/invalid';
import { LeadingControlExample } from '../examples/leading-control';
import { MultilineExample } from '../examples/multiline';
import { TrailingControlExample } from '../examples/trailing-control';
import { TelephoneFieldExample } from '../examples/telephone-field';

describe('@godaddy/antares', function antares() {
  describe('#TextField', function textField() {
    describe('#basic', function basic() {
      it('renders label and textbox with placeholder', async function renders() {
        const { locator } = await render(<DefaultExample />);
        const textbox = locator.getByRole('textbox', { name: /name/i });

        assume(locator.getByText('Name').element()).exists();
        assume(textbox.element().getAttribute('placeholder')).equals('Enter your name');
      });
    });

    describe('#controlled', function controlled() {
      it('updates value when user types', async function updatesValue() {
        const { locator } = await render(<ControlledExample />);
        const textbox = locator.getByRole('textbox', { name: /email/i });

        await textbox.fill('test@example.com');

        assume(textbox.element().getAttribute('value')).equals('test@example.com');
        assume(locator.getByText('test@example.com').element()).exists();
      });
    });

    describe('#invalid', function invalid() {
      it('renders error message and data-invalid on frame and input', async function invalidState() {
        const { locator } = await render(<InvalidExample />);
        const frame = locator.getByRole('presentation').element();
        const textbox = locator.getByRole('textbox').element();

        assume(locator.getByText('Please enter a valid email address').element()).exists();
        assume(frame.getAttribute('data-invalid')).equals('true');
        assume(textbox.getAttribute('data-invalid')).equals('true');
      });
    });

    describe('#disabled', function disabled() {
      it('renders disabled input and data-disabled on frame', async function disabledState() {
        const { locator } = await render(<DisabledExample />);
        const textbox = locator.getByRole('textbox').element();
        const frame = locator.getByRole('presentation').element();

        assume(textbox.hasAttribute('disabled')).equals(true);
        assume(frame.getAttribute('data-disabled')).equals('true');
      });
    });

    describe('#adornments', function adornments() {
      it('renders leading and trailing text', async function adornmentsRendered() {
        const { locator } = await render(<AdornmentsExample />);
        const leadingText = locator.getByText('$').element();
        const trailingText = locator.getByText('.00').element();
        const textbox = locator.getByRole('textbox').element();

        assume(leadingText).exists();
        assume(trailingText).exists();
        assume(textbox).exists();
        assume(textbox.getAttribute('placeholder')).equals('0.00');
      });
    });

    describe('#multiline', function multiline() {
      it('renders a textarea', async function textareaRendered() {
        const { locator } = await render(<MultilineExample />);
        const textarea = locator.getByRole('textbox').element();

        assume(locator.getByText('Comment').element()).exists();
        assume(textarea.getAttribute('placeholder')).equals('Enter your comment');
      });

      it('renders textarea with dynamic height for long text', async function rendersTextareaWithDynamicHeightForLongText() {
        const { locator, rerender } = await render(<MultilineExample />);
        const textarea = locator.getByRole('textbox').element();
        const initialHeight = textarea.getBoundingClientRect().height;
        const longText = 'This is a long text '.repeat(10);

        await rerender(<MultilineExample value={longText} />);
        const newHeight = textarea.getBoundingClientRect().height;

        assume(newHeight).is.greaterThan(initialHeight);
      });
    });

    describe('#leading-control', function leadingControl() {
      it('moves focus to the leading button on tab', async function focusOrder() {
        const { locator } = await render(<LeadingControlExample />);
        const button = locator.getByRole('button').element();

        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);
      });
    });

    describe('#trailing-control', function trailingControl() {
      it('moves focus through the input to the trailing button on tab', async function focusOrder() {
        const { locator } = await render(<TrailingControlExample />);
        const button = locator.getByRole('button').element();

        await userEvent.tab();
        await userEvent.tab();
        assume(document.activeElement).equals(button);
        assume(button.hasAttribute('data-focus-visible')).equals(true);
        assume(button.hasAttribute('data-focused')).equals(true);
      });
    });

    describe('#telephone-field', function telephoneField() {
      it('selects a country code from the nested Select', async function selectsCountry() {
        await render(<TelephoneFieldExample />);

        const trigger = page.getByRole('button', { name: /country code/i });
        await userEvent.click(trigger);

        const mexico = page.getByRole('option', { name: 'MX +52' });
        await userEvent.click(mexico);

        const updated = page.getByRole('button', { name: /MX \+52/ });
        assume(updated).is.not.equal(null);
      });
    });

    describe('#validation', function validation() {
      it('marks the group invalid via FieldErrorContext when submit fails validation', async function submitInvalid() {
        const { container } = await render(
          <form>
            <TextField isRequired>
              <Group data-testid="group">
                <Input aria-label="Email" />
              </Group>
              <FieldError />
            </TextField>
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
