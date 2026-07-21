import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { TelephoneFieldBasicExample } from '../examples/basic';
import { TelephoneFieldControlledExample } from '../examples/controlled';
import { TelephoneFieldDisabledExample } from '../examples/disabled';
import { TelephoneFieldInvalidExample } from '../examples/invalid';

describe('@godaddy/antares', function antares() {
  describe('#TelephoneField', function telephoneFieldSuite() {
    it('renders the country control and the phone number input', async function basicRender() {
      await render(<TelephoneFieldBasicExample />);

      const trigger = page.getByRole('button', { name: /US \+1/ });
      const input = page.getByRole('textbox');
      assume(trigger).is.not.equal(null);
      assume(input).is.not.equal(null);
    });

    it('updates the controlled country on selection and the phone number on typing', async function controlledInteraction() {
      const { locator } = await render(<TelephoneFieldControlledExample />);

      const trigger = page.getByRole('button', { name: /US \+1/ });
      await userEvent.setup().click(trigger);

      const mexico = page.getByRole('option', { name: 'MX +52' });
      await userEvent.setup().click(mexico);

      const updatedTrigger = page.getByRole('button', { name: /MX \+52/ });
      assume(updatedTrigger).is.not.equal(null);

      const textbox = locator.getByRole('textbox');
      await textbox.fill('5551234');
      assume(locator.getByText('5551234').element()).exists();
    });

    it('marks the group and input invalid from the controlled isInvalid prop', async function controlledInvalid() {
      const { container } = await render(<TelephoneFieldInvalidExample />);

      const invalidElements = container.querySelectorAll('[data-invalid="true"]');
      assume(invalidElements.length).greaterThan(0);
    });

    it('disables the country control and the phone number input', async function disabledRender() {
      const { container, locator } = await render(<TelephoneFieldDisabledExample />);

      const trigger = locator.getByRole('button').element();
      const input = container.querySelector('input') as HTMLInputElement;

      assume(trigger.hasAttribute('disabled')).equals(true);
      assume(input.hasAttribute('disabled')).equals(true);
    });
  });
});
