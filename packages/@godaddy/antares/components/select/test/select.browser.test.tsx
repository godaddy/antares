import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { ComposedExample } from '../examples/composed';
import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { MultipleExample } from '../examples/multiple';
import { FormExample } from '../examples/form';
import { InvalidExample } from '../examples/invalid';

describe('@godaddy/antares', function antares() {
  describe('#Select', function selectSuite() {
    it('renders the basic example', async function basicRender() {
      await render(<DefaultExample />);

      const trigger = page.getByRole('button');
      assume(trigger).is.not.equal(null);
    });

    it('updates the controlled selection on click', async function controlledInteraction() {
      await render(<ControlledExample />);

      const trigger = page.getByRole('button', { name: /Latte/ });
      await userEvent.setup().click(trigger);

      const espresso = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espresso);

      const updated = page.getByRole('button', { name: /Espresso/ });
      assume(updated).is.not.equal(null);
    });

    it('selects an option from a composed interior', async function composedInteraction() {
      await render(<ComposedExample />);

      await userEvent.setup().click(page.getByRole('button', { name: /pick a drink/i }));
      await userEvent.setup().click(page.getByRole('option', { name: 'Tea' }));

      assume(page.getByRole('button', { name: /tea/i })).is.not.equal(null);
    });

    it('toggles items in multiple selection', async function multipleInteraction() {
      await render(<MultipleExample />);

      const trigger = page.getByRole('button');
      await userEvent.setup().click(trigger);

      const espresso = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espresso);

      const selected = document.querySelectorAll('[role="option"][data-selected="true"]');
      assume(selected.length).greaterThan(0);
    });

    it('marks the group invalid when a required select fails validation on submit', async function submitInvalid() {
      const { container } = await render(<FormExample />);

      const submit = page.getByRole('button', { name: 'Submit' });
      await userEvent.setup().click(submit);

      const group = container.querySelector('[role="group"]') as HTMLElement;
      assume(group.hasAttribute('data-invalid')).equals(true);
    });

    it('marks the group invalid from the controlled isInvalid prop', async function controlledInvalid() {
      const { container } = await render(<InvalidExample />);

      const group = container.querySelector('[role="group"]') as HTMLElement;
      assume(group.hasAttribute('data-invalid')).equals(true);
    });
  });
});
