import { beforeAll, describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { ControlledSelectionExample } from '../examples/controlled-selection.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { RemovableChipsExample } from '../examples/removable-chips.tsx';
import { ToggleChipsExample } from '../examples/toggle-chips.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  describe('#Chip', function chipTests() {
    it('updates controlled selection on click', async function controlledSelection() {
      const user = userEvent.setup();
      await render(<ControlledSelectionExample />);

      const austin = page.getByRole('row', { name: 'Austin' });
      const active = page.getByRole('row', { name: 'Active' });

      assume(austin.element().getAttribute('aria-selected')).equals('true');
      assume(active.element().getAttribute('aria-selected')).equals('false');

      await user.click(active);

      assume(austin.element().getAttribute('aria-selected')).equals('true');
      assume(active.element().getAttribute('aria-selected')).equals('true');
      assume(document.body.textContent).contains('Selected: austin, active');
    });

    it('navigates and selects with the keyboard', async function keyboardSelection() {
      const user = userEvent.setup();
      await render(<ToggleChipsExample />);

      const home = page.getByRole('row', { name: 'Home' });
      const featured = page.getByRole('row', { name: 'Featured' });

      await user.click(home);
      assume(document.activeElement).equals(home.element());

      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(featured.element());

      await user.keyboard('{Enter}');
      assume(featured.element().getAttribute('aria-selected')).equals('true');
    });

    it('prevents interaction with disabled items', async function disabledItems() {
      const user = userEvent.setup();
      await render(<DisabledExample />);

      const grids = page.getByRole('grid').all();
      const enabled = grids[1].element().querySelector<HTMLElement>('[role="row"][aria-label="Enabled"]');
      const disabled = grids[1].element().querySelector<HTMLElement>('[role="row"][aria-label="Disabled option"]');

      if (!enabled || !disabled) throw new Error('Expected mixed-availability Chips');

      assume(disabled.hasAttribute('data-disabled')).equals(true);
      assume(disabled.getAttribute('aria-disabled')).equals('true');
      assume(disabled.hasAttribute('data-selected')).equals(false);

      await user.click(enabled);
      assume(enabled.getAttribute('aria-selected')).equals('false');

      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(enabled);
    });

    it('removes items and renders the empty state', async function removableItems() {
      const user = userEvent.setup();
      await render(<RemovableChipsExample />);

      await user.click(page.getByRole('button', { name: 'Remove Austin' }));
      assume(page.getByRole('row', { name: 'Austin' }).query()).equals(null);
      assume(page.getByRole('row', { name: 'Active' }).query()).is.not.equal(null);

      await user.click(page.getByRole('button', { name: 'Remove Active' }));
      assume(page.getByRole('row', { name: 'Active' }).query()).equals(null);
      assume(page.getByText('No filters applied').query()).is.not.equal(null);
    });
  });
});
