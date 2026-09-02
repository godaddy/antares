import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { DisabledExample } from '../examples/disabled';
import { FormatOptionsExample } from '../examples/format-options';
import { HideStepperExample } from '../examples/hide-stepper';
import { InvalidExample } from '../examples/invalid';
import { ValueScaleExample } from '../examples/value-scale';
import { TextSteppersExample } from '../examples/text-steppers';
import { waitForSelector } from '#test/utils/wait-for-selector.ts';

describe('@godaddy/antares', function antares() {
  describe('#NumberField', function numberField() {
    describe('#basic', function basic() {
      it('renders label and input with the stepper preset', async function renders() {
        const { locator, container } = await render(<DefaultExample />);
        const input = locator.getByRole('textbox', { name: 'Quantity' });

        assume(locator.getByText('Quantity').element()).exists();
        assume(input.element()).exists();

        await waitForSelector(container, 'svg');

        assume(container.querySelector('svg[data-icon="minus"]')).exists();
        assume(container.querySelector('svg[data-icon="plus"]')).exists();
      });
    });

    describe('#controlled', function controlled() {
      it('updates value when user types', async function updatesValue() {
        const { locator } = await render(<ControlledExample />);
        const input = locator.getByRole('textbox', { name: 'Quantity' });

        await input.fill('25');

        assume(input.element().getAttribute('value')).equals('25');
      });
    });

    describe('#invalid', function invalid() {
      it('renders error message and data-invalid on frame and input', async function invalidState() {
        const { locator } = await render(<InvalidExample />);
        const frame = locator.getByRole('group').element();
        const input = locator.getByRole('textbox', { name: 'Quantity' }).element();

        assume(locator.getByText('Please enter a value between 0 and 100').element()).exists();
        assume(frame.getAttribute('data-invalid')).equals('true');
        assume(input.getAttribute('data-invalid')).equals('true');
      });
    });

    describe('#disabled', function disabled() {
      it('renders disabled input and data-disabled on frame', async function disabledState() {
        const { locator } = await render(<DisabledExample />);
        const input = locator.getByRole('textbox', { name: 'Quantity' }).element();
        const frame = locator.getByRole('group').element();

        assume(input.hasAttribute('disabled')).equals(true);
        assume(frame.getAttribute('data-disabled')).equals('true');
      });
    });

    describe('#hideStepper', function hideStepper() {
      it('renders without increment and decrement buttons', async function noStepperButtons() {
        const { locator, container } = await render(<HideStepperExample />);
        const input = locator.getByRole('textbox', { name: 'Quantity' });

        assume(input.element()).exists();
        assume(input.element().getAttribute('placeholder')).equals('0');
        const buttons = await locator.getByRole('button').all();
        assume(buttons.length).equals(0);

        const icons = container.querySelectorAll('svg');
        assume(icons.length).equals(0);
      });
    });

    describe('#valueScale', function valueScale() {
      it('renders label and steps from the minimum', async function valueScaleRenders() {
        const { locator } = await render(<ValueScaleExample />);
        assume(locator.getByText('Step value').element()).exists();

        await locator.getByRole('button', { name: 'Increase Step value' }).click();
        assume(locator.getByRole('textbox', { name: 'Step value' }).element().getAttribute('value')).equals('2');

        await locator.getByRole('button', { name: 'Increase Step value' }).click();
        assume(locator.getByRole('textbox', { name: 'Step value' }).element().getAttribute('value')).equals('5');
      });
    });

    describe('#formatOptions', function formatOptions() {
      it('renders with custom numbering system', async function formatOptionsRenders() {
        const { locator } = await render(<FormatOptionsExample />);
        assume(locator.getByText('Number (Devanagari)').element()).exists();
        const value = locator.getByRole('textbox', { name: 'Number (Devanagari)' }).element().getAttribute('value');
        assume(value != null && value.length > 0).equals(true);
      });
    });

    describe('#text-steppers', function textSteppers() {
      it('increments through composed stepper slots', async function composedSteppers() {
        const { locator } = await render(<TextSteppersExample />);
        const incrementButton = locator.getByRole('button', { name: 'Increase Quantity' });

        await incrementButton.click();
        assume(locator.getByRole('textbox', { name: 'Quantity' }).element().getAttribute('value')).equals('2');
      });
    });

    describe('#stepper', function stepper() {
      it('renders increment and decrement buttons that are clickable', async function stepperRendersAndClicks() {
        const { locator } = await render(<DefaultExample defaultValue={10} />);
        const incrementButton = locator.getByRole('button', { name: 'Increase Quantity' });
        const decrementButton = locator.getByRole('button', { name: 'Decrease Quantity' });

        assume(incrementButton.element()).exists();
        assume(decrementButton.element()).exists();

        await incrementButton.click();
        assume(locator.getByRole('textbox', { name: 'Quantity' }).element().getAttribute('value')).equals('11');

        await decrementButton.click();
        assume(locator.getByRole('textbox', { name: 'Quantity' }).element().getAttribute('value')).equals('10');
      });
    });
  });
});
