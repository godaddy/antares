import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { SelectBasic } from '../examples/basic';
import { SelectControlledExample } from '../examples/controlled';
import { SelectMultipleExample } from '../examples/multiple';
import { SelectFormExample } from '../examples/form';
import { SelectInvalidExample } from '../examples/invalid';

describe('@godaddy/antares', function antares() {
  describe('#Select', function selectSuite() {
    it('renders the basic example', async function basicRender() {
      await render(<SelectBasic />);

      const trigger = page.getByRole('button');
      assume(trigger).is.not.equal(null);
    });

    it('updates the controlled selection on click', async function controlledInteraction() {
      await render(<SelectControlledExample />);

      const trigger = page.getByRole('button', { name: /Latte/ });
      await userEvent.setup().click(trigger);

      const espresso = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espresso);

      const updated = page.getByRole('button', { name: /Espresso/ });
      assume(updated).is.not.equal(null);
    });

    it('toggles items in multiple selection', async function multipleInteraction() {
      await render(<SelectMultipleExample />);

      const trigger = page.getByRole('button');
      await userEvent.setup().click(trigger);

      const espresso = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espresso);

      const selected = document.querySelectorAll('[role="option"][data-selected="true"]');
      assume(selected.length).greaterThan(0);
    });

    it('marks the group invalid when a required select fails validation on submit', async function submitInvalid() {
      const { container } = await render(<SelectFormExample />);

      const submit = page.getByRole('button', { name: 'Submit' });
      await userEvent.setup().click(submit);

      const group = container.querySelector('[role="group"]') as HTMLElement;
      assume(group.hasAttribute('data-invalid')).equals(true);
    });

    it('marks the group invalid from the controlled isInvalid prop', async function controlledInvalid() {
      const { container } = await render(<SelectInvalidExample />);

      const group = container.querySelector('[role="group"]') as HTMLElement;
      assume(group.hasAttribute('data-invalid')).equals(true);
    });
  });
});
