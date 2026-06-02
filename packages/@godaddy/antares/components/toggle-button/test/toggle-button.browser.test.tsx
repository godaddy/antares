import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { IconOnlyExample } from '../examples/icon-only.tsx';
import { RTLExample } from '../examples/rtl.tsx';
import { WithDropdownExample } from '../examples/with-dropdown.tsx';
import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';
import type { Key } from 'react-aria-components';

describe('@godaddy/antares', function antares() {
  describe('#ToggleButtonGroup', function buttonGroupTests() {
    it('renders as a radiogroup with radio items in single mode', async function singleModeRoles() {
      await render(<DefaultExample />);

      assume(page.getByRole('radiogroup').query()).is.not.equal(null);
      assume(page.getByRole('radio', { name: 'Day' }).query()).is.not.equal(null);
      assume(page.getByRole('radio', { name: 'Week' }).query()).is.not.equal(null);
      assume(page.getByRole('radio', { name: 'Month' }).query()).is.not.equal(null);
    });

    it('renders as a group with toggle buttons in multiple mode', async function multipleModeRoles() {
      await render(<MultipleSelectionExample />);

      assume(page.getByRole('toolbar').query()).is.not.equal(null);
      assume(page.getByRole('button', { name: 'Bold' }).query()).is.not.equal(null);
    });

    it('selects an item on click and deselects the previous in single mode', async function singleClickSelection() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      const day = page.getByRole('radio', { name: 'Day' });
      const week = page.getByRole('radio', { name: 'Week' });
      const month = page.getByRole('radio', { name: 'Month' });

      // Day is selected by default
      assume(day.element().getAttribute('aria-checked')).equals('true');

      await user.click(week);
      assume(week.element().getAttribute('aria-checked')).equals('true');
      assume(day.element().getAttribute('aria-checked')).equals('false');

      await user.click(month);
      assume(month.element().getAttribute('aria-checked')).equals('true');
      assume(week.element().getAttribute('aria-checked')).equals('false');
    });

    it('allows multiple items to be selected in multiple mode', async function multipleClickSelection() {
      const user = userEvent.setup();
      await render(<MultipleSelectionExample />);

      const bold = page.getByRole('button', { name: 'Bold' });
      const italic = page.getByRole('button', { name: 'Italic' });

      // Bold selected by default
      assume(bold.element().getAttribute('aria-pressed')).equals('true');

      await user.click(italic);
      assume(italic.element().getAttribute('aria-pressed')).equals('true');
      assume(bold.element().getAttribute('aria-pressed')).equals('true');
    });

    it('deselects an item on second click in multiple mode', async function multipleDeselect() {
      const user = userEvent.setup();
      await render(<MultipleSelectionExample />);

      const bold = page.getByRole('button', { name: 'Bold' });
      assume(bold.element().getAttribute('aria-pressed')).equals('true');

      await user.click(bold);
      assume(bold.element().getAttribute('aria-pressed')).equals('false');
    });

    it('navigates with ArrowRight and ArrowLeft in single mode', async function keyboardNavigation() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      const day = page.getByRole('radio', { name: 'Day' });
      const week = page.getByRole('radio', { name: 'Week' });
      const month = page.getByRole('radio', { name: 'Month' });

      await user.click(day);
      assume(document.activeElement).equals(day.element());

      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(week.element());

      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(month.element());

      await user.keyboard('{ArrowLeft}');
      assume(document.activeElement).equals(week.element());

      await user.keyboard('{ArrowLeft}');
      assume(document.activeElement).equals(day.element());
    });

    it('updates controlled state and calls onSelectionChange in ControlledExample', async function controlledSelection() {
      const user = userEvent.setup();
      await render(<ControlledExample />);

      const paragraph = document.querySelector('p');
      assume(paragraph?.textContent).includes('week');

      const day = page.getByRole('radio', { name: 'Day' });
      await user.click(day);

      assume(day.element().getAttribute('aria-checked')).equals('true');
      assume(paragraph?.textContent).includes('day');
    });

    it('calls onSelectionChange with a Set<Key>', async function onSelectionChangeCallback() {
      const onSelectionChange = vi.fn<(keys: Set<Key>) => void>();
      const user = userEvent.setup();

      await render(
        <ToggleButtonGroup
          aria-label="View"
          selectionMode="single"
          defaultSelectedKeys={['day']}
          onSelectionChange={onSelectionChange}
        >
          <ToggleButton id="day">Day</ToggleButton>
          <ToggleButton id="week">Week</ToggleButton>
        </ToggleButtonGroup>
      );

      await user.click(page.getByRole('radio', { name: 'Week' }));

      assume(onSelectionChange.mock.calls.length).is.above(0);
      const receivedKeys = onSelectionChange.mock.calls[0]?.[0];
      assume(receivedKeys instanceof Set).equals(true);
      assume(receivedKeys?.has('week')).equals(true);
    });

    it('marks all items as disabled when isDisabled is on the group', async function groupDisabled() {
      await render(<DisabledExample />);

      const radiogroups = document.querySelectorAll('[role="radiogroup"]');
      const firstGroup = radiogroups[0];
      const radios = firstGroup?.querySelectorAll('[role="radio"]');

      radios?.forEach(function checkDisabled(radio) {
        assume(radio.hasAttribute('disabled')).equals(true);
      });
    });

    it('only marks the disabled item as disabled when per-item isDisabled is set', async function itemDisabled() {
      const user = userEvent.setup();
      await render(<DisabledExample />);

      const radiogroups = document.querySelectorAll('[role="radiogroup"]');
      const secondGroup = radiogroups[1];
      const radios = secondGroup?.querySelectorAll('[role="radio"]');

      const day = radios?.[0];
      const week = radios?.[1]; // disabled
      const month = radios?.[2];

      assume(week?.hasAttribute('disabled')).equals(true);
      assume(day?.hasAttribute('disabled')).equals(false);
      assume(month?.hasAttribute('disabled')).equals(false);

      // Keyboard skips the disabled item
      await user.click(day as Element);
      await user.keyboard('{ArrowRight}');
      assume(document.activeElement).equals(month);
    });

    it('renders icon-only items with accessible labels', async function iconOnlyLabels() {
      await render(<IconOnlyExample />);

      assume(page.getByRole('radio', { name: 'List view' }).query()).is.not.equal(null);
      assume(page.getByRole('radio', { name: 'Grid view' }).query()).is.not.equal(null);
    });

    it('selects icon-only items by click', async function iconOnlyClickSelection() {
      const user = userEvent.setup();
      await render(<IconOnlyExample />);

      const listItem = page.getByRole('radio', { name: 'List view' });
      const gridItem = page.getByRole('radio', { name: 'Grid view' });

      await user.click(gridItem);
      assume(gridItem.element().getAttribute('aria-checked')).equals('true');
      assume(listItem.element().getAttribute('aria-checked')).equals('false');
    });

    it('applies dir="rtl" attribute to the container in RTLExample', async function rtlDirAttribute() {
      await render(<RTLExample />);

      const radiogroup = page.getByRole('radiogroup').element();
      assume(radiogroup.getAttribute('dir')).equals('rtl');
    });

    it('navigates in RTL direction with ArrowLeft moving to next item', async function rtlKeyboardNavigation() {
      const user = userEvent.setup();
      await render(<RTLExample />);

      const day = page.getByRole('radio', { name: 'Day' });
      const week = page.getByRole('radio', { name: 'Week' });

      await user.click(day);
      assume(document.activeElement).equals(day.element());

      await user.keyboard('{ArrowLeft}');
      assume(document.activeElement).equals(week.element());
    });

    it('returns tab focus to the selected item', async function tabFocusToSelected() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      const week = page.getByRole('radio', { name: 'Week' });

      await user.click(week);
      assume(week.element().getAttribute('aria-checked')).equals('true');

      await user.click(document.body);
      await user.tab();
      assume(document.activeElement).equals(week.element());
    });

    it('disallows empty selection when disallowEmptySelection is set', async function disallowEmptySelection() {
      const user = userEvent.setup();

      await render(
        <ToggleButtonGroup
          aria-label="View"
          selectionMode="single"
          defaultSelectedKeys={['day']}
          disallowEmptySelection
        >
          <ToggleButton id="day">Day</ToggleButton>
          <ToggleButton id="week">Week</ToggleButton>
        </ToggleButtonGroup>
      );

      const day = page.getByRole('radio', { name: 'Day' });
      assume(day.element().getAttribute('aria-checked')).equals('true');

      // Re-clicking should keep it selected
      await user.click(day);
      assume(day.element().getAttribute('aria-checked')).equals('true');
    });

    it('opens the alignment dropdown and shows all three options', async function withDropdownOpensMenu() {
      const user = userEvent.setup();
      await render(<WithDropdownExample />);

      await user.click(page.getByRole('button', { name: 'Align Left' }));

      assume(page.getByRole('menuitemradio', { name: 'Align Left' }).query()).is.not.equal(null);
      assume(page.getByRole('menuitemradio', { name: 'Align Center' }).query()).is.not.equal(null);
      assume(page.getByRole('menuitemradio', { name: 'Align Right' }).query()).is.not.equal(null);
    });

    it('clicking an alignment option updates the trigger label', async function withDropdownClickSelection() {
      const user = userEvent.setup();
      await render(<WithDropdownExample />);

      await user.click(page.getByRole('button', { name: 'Align Left' }));
      await user.click(page.getByRole('menuitemradio', { name: 'Align Right' }));

      assume(page.getByRole('button', { name: 'Align Right' }).query()).is.not.equal(null);
    });

    it('selects an alignment option with keyboard navigation', async function withDropdownKeyboardSelection() {
      const user = userEvent.setup();
      await render(<WithDropdownExample />);

      await user.click(page.getByRole('button', { name: 'Align Left' }));
      await user.keyboard('{ArrowDown}{Enter}');

      assume(page.getByRole('button', { name: 'Align Center' }).query()).is.not.equal(null);
    });
  });
});
