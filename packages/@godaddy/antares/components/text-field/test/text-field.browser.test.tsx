import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { TextFieldAdornmentsExample } from '../examples/adornments';
import { TextFieldBasic } from '../examples/basic';
import { TextFieldControlledExample } from '../examples/controlled';
import { TextFieldDisabledExample } from '../examples/disabled';
import { TextFieldInvalidExample } from '../examples/invalid';
import { TextFieldMultilineExample } from '../examples/multiline';

describe('@godaddy/uxcore', function uxcore() {
  describe('#TextField', function textField() {
    describe('#basic', function basic() {
      it('renders label and textbox with placeholder', async function renders() {
        const { locator } = await render(<TextFieldBasic />);
        const textbox = locator.getByRole('textbox', { name: /name/i });

        assume(locator.getByText('Name').element()).exists();
        assume(textbox.element().getAttribute('placeholder')).equals('Enter your name');
      });
    });

    describe('#controlled', function controlled() {
      it('updates value when user types', async function updatesValue() {
        const { locator } = await render(<TextFieldControlledExample />);
        const textbox = locator.getByRole('textbox', { name: /email/i });

        await textbox.fill('test@example.com');

        assume(textbox.element().getAttribute('value')).equals('test@example.com');
        assume(locator.getByText('test@example.com').element()).exists();
      });
    });

    describe('#invalid', function invalid() {
      it('renders error message and data-invalid on frame and input', async function invalidState() {
        const { locator } = await render(<TextFieldInvalidExample />);
        const frame = locator.getByRole('presentation').element();
        const textbox = locator.getByRole('textbox').element();

        assume(locator.getByText('Please enter a valid email address').element()).exists();
        assume(frame.getAttribute('data-invalid')).equals('true');
        assume(textbox.getAttribute('data-invalid')).equals('true');
      });
    });

    describe('#disabled', function disabled() {
      it('renders disabled input and data-disabled on frame', async function disabledState() {
        const { locator } = await render(<TextFieldDisabledExample />);
        const textbox = locator.getByRole('textbox').element();
        const frame = locator.getByRole('presentation').element();

        assume(textbox.hasAttribute('disabled')).equals(true);
        assume(frame.getAttribute('data-disabled')).equals('true');
      });
    });

    describe('#adornments', function adornments() {
      it('renders leadingText and trailingText', async function adornmentsRendered() {
        const { locator } = await render(<TextFieldAdornmentsExample />);
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
      it('renders textarea when multiline', async function textareaRendered() {
        const { locator } = await render(<TextFieldMultilineExample />);
        const textarea = locator.getByRole('textbox').element();

        assume(locator.getByText('Comment').element()).exists();
        assume(textarea.getAttribute('placeholder')).equals('Enter your comment');
      });

      it('renders textarea with dynamic height for long text', async function rendersTextareaWithDynamicHeightForLongText() {
        const { locator, rerender } = await render(<TextFieldMultilineExample />);
        const textarea = locator.getByRole('textbox').element();
        const initialHeight = textarea.getBoundingClientRect().height;
        const longText = 'This is a long text '.repeat(10);

        await rerender(<TextFieldMultilineExample value={longText} />);
        const newHeight = textarea.getBoundingClientRect().height;

        assume(newHeight).is.greaterThan(initialHeight);
      });
    });
  });
});
