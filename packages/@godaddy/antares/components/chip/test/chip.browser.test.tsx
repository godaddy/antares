import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { Chip, ChipGroup, ChipList } from '@godaddy/antares';
import { RouterProvider } from 'react-aria-components';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { ControlledSelectionExample } from '../examples/controlled-selection.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { EmptyStateExample } from '../examples/empty-state.tsx';
import { InteractionStatesExample } from '../examples/interaction-states.tsx';
import { LabelLengthExample } from '../examples/label-length.tsx';
import { PrimitiveAndComposedExample } from '../examples/primitive-and-composed.tsx';
import { RemovableChipsExample } from '../examples/removable-chips.tsx';
import { SelectionModesExample } from '../examples/selection-modes.tsx';
import { ToggleChipsExample } from '../examples/toggle-chips.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  afterEach(resetHover);

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

    it('exposes accessible names for composed content and links', async function accessibleNames() {
      await render(<PrimitiveAndComposedExample />);

      assume(page.getByRole('row', { name: '42' }).query()).is.not.equal(null);
      assume(page.getByRole('row', { name: 'Composed value' }).query()).is.not.equal(null);

      const link = page.getByRole('row', { name: 'Filters' }).element();
      assume(link.getAttribute('data-href')).equals('/filters');
    });

    it('supports linked Chips', async function linkedChips() {
      const user = userEvent.setup();
      const onAction = vi.fn();
      const navigate = vi.fn();

      await render(
        <RouterProvider navigate={navigate}>
          <ChipGroup aria-label="Filters">
            <ChipList>
              <Chip id="filters" href="/filters" onAction={onAction}>
                Filters
              </Chip>
            </ChipList>
          </ChipGroup>
        </RouterProvider>
      );

      const chip = page.getByRole('row', { name: 'Filters' });
      const element = chip.element();

      expect(element.getAttribute('role')).toBe('row');
      expect(element.getAttribute('data-href')).toBe('/filters');
      expect(element.hasAttribute('data-react-aria-pressable')).toBe(true);

      await user.click(chip);

      expect(onAction).toHaveBeenCalledOnce();
      expect(navigate).toHaveBeenCalledWith('/filters', undefined);
    });

    it('truncates long labels with CSS while preserving the accessible name', async function labelLength() {
      await render(<LabelLengthExample />);

      const shortLabel = 'Category';
      const longLabel = 'Discounted price up to twenty thousand dollars';
      const truncated = page.getByRole('row', { name: longLabel, exact: true }).element();
      const label = truncated.querySelector<HTMLElement>('span');

      if (!label) throw new Error('Expected a Chip label');

      assume(page.getByRole('row', { name: shortLabel, exact: true }).element().textContent).equals(shortLabel);
      assume(label.textContent).equals(longLabel);
      assume(getComputedStyle(label).textOverflow).equals('ellipsis');
      assume(label.scrollWidth).is.greaterThan(label.clientWidth);
      assume(truncated.getAttribute('aria-label')).equals(longLabel);
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

    it('supports single selection and required multiple selection', async function selectionConstraints() {
      const user = userEvent.setup();
      await render(<SelectionModesExample />);

      const singleA = page.getByRole('row', { name: 'Single A' });
      const singleB = page.getByRole('row', { name: 'Single B' });
      const required = page.getByRole('row', { name: 'Required' });

      assume(singleA.element().getAttribute('aria-selected')).equals('true');
      await user.click(singleB);
      assume(singleA.element().getAttribute('aria-selected')).equals('false');
      assume(singleB.element().getAttribute('aria-selected')).equals('true');

      await user.click(required);
      assume(required.element().getAttribute('aria-selected')).equals('true');
    });

    it('reports hover state without changing selection', async function hoverState() {
      const user = userEvent.setup();
      await render(<InteractionStatesExample />);

      const selected = page.getByRole('row', { name: 'Selected' });
      assume(selected.element().getAttribute('aria-selected')).equals('true');

      await user.hover(selected);

      assume(selected.element().getAttribute('data-hovered')).equals('true');
      assume(selected.element().getAttribute('aria-selected')).equals('true');
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

    it('shows a hover surface on the remove control', async function removeHover() {
      const user = userEvent.setup();
      await render(<RemovableChipsExample />);

      const remove = page.getByRole('button', { name: 'Remove Austin' });
      const initialBackground = getComputedStyle(remove.element(), '::before').backgroundColor;

      await user.hover(remove);

      const removeTargetStyle = getComputedStyle(remove.element(), '::before');
      expect(remove).toHaveAttribute('data-hovered', 'true');
      expect(removeTargetStyle.backgroundColor).not.toBe(initialBackground);
    });

    it('focuses the remove control with the keyboard', async function removalFocus() {
      const user = userEvent.setup();
      await render(<RemovableChipsExample />);

      const remove = page.getByRole('button', { name: 'Remove Austin' });
      remove.element().focus();
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      await user.keyboard('{Tab}');

      expect(document.activeElement).toBe(remove.element());
    });

    it('removes an item from the keyboard', async function keyboardRemoval() {
      const user = userEvent.setup();
      await render(<RemovableChipsExample />);

      const removeAustin = page.getByRole('button', { name: 'Remove Austin' });
      removeAustin.element().focus();
      await user.keyboard('{Enter}');

      assume(page.getByRole('row', { name: 'Austin' }).query()).equals(null);
      assume(page.getByRole('row', { name: 'Active' }).query()).is.not.equal(null);
    });

    it('adds and removes the first item from an empty collection', async function emptyCollection() {
      const user = userEvent.setup();
      await render(<EmptyStateExample />);

      assume(page.getByText('No categories yet').query()).is.not.equal(null);

      await user.click(page.getByRole('button', { name: 'Add category' }));
      assume(page.getByRole('row', { name: 'News' }).query()).is.not.equal(null);

      await user.click(page.getByRole('button', { name: 'Remove News' }));
      assume(page.getByText('No categories yet').query()).is.not.equal(null);
    });
  });
});
