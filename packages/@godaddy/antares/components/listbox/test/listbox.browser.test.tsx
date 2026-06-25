import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { ListBoxBasic } from '../examples/basic';
import { ListBoxControlledExample } from '../examples/controlled';
import { ListBoxMultipleExample } from '../examples/multiple';

describe('@godaddy/antares', function antares() {
  describe('#ListBox', function listBoxSuite() {
    it('renders the basic example with options', async function basicRender() {
      await render(<ListBoxBasic />);

      const listbox = page.getByRole('listbox');
      assume(listbox).is.not.equal(null);

      const espresso = page.getByRole('option', { name: 'Espresso' });
      assume(espresso).is.not.equal(null);
    });

    it('updates the controlled selection on click', async function controlledInteraction() {
      await render(<ListBoxControlledExample />);

      const espresso = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espresso);

      const selected = document.querySelectorAll('[role="option"][data-selected="true"]');
      assume(selected.length).equals(1);
      assume(selected[0]?.textContent).contains('Espresso');
    });

    it('toggles items in multiple selection', async function multipleInteraction() {
      await render(<ListBoxMultipleExample />);

      const espresso = page.getByRole('option', { name: 'Espresso' });
      await userEvent.setup().click(espresso);

      const selected = document.querySelectorAll('[role="option"][data-selected="true"]');
      assume(selected.length).greaterThan(0);
    });
  });
});
