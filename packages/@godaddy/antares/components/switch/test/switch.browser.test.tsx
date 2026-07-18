import { SwitchControlled } from '../examples/controlled';
import { SwitchDefault } from '../examples/default';
import { SwitchDisabled } from '../examples/disabled';
import { SwitchNoLabel } from '../examples/no-label';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Switch', function switchTests() {
    it('toggles when the track is clicked', async function trackClick() {
      await render(<SwitchDefault />);

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });
      assume((switchInput.element() as HTMLInputElement).checked).is.false();

      await switchInput.click({ force: true });

      await vi.waitFor(function checkSelection() {
        assume((switchInput.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('toggles when the label text is clicked', async function labelClick() {
      const user = userEvent.setup();
      await render(<SwitchDefault />);

      const label = page.getByText('Wi-Fi');
      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });

      await user.click(label);

      await vi.waitFor(function checkSelection() {
        assume((switchInput.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('toggles with the Space key when focused', async function spaceKeyToggle() {
      const user = userEvent.setup();
      await render(<SwitchDefault />);

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });

      await user.tab();
      assume(document.activeElement).equals(switchInput.element());

      await user.keyboard(' ');

      await vi.waitFor(function checkSelection() {
        assume((switchInput.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('does not toggle when disabled', async function disabledClick() {
      const user = userEvent.setup();
      await render(<SwitchDisabled />);

      const switchInput = page.getByRole('switch', { name: 'Disabled off' });
      assume((switchInput.element() as HTMLInputElement).checked).is.false();

      await user.click(switchInput, { force: true });
      assume((switchInput.element() as HTMLInputElement).checked).is.false();
    });

    it('fires onChange with the new value in SwitchControlled', async function controlledToggle() {
      await render(<SwitchControlled />);

      const switchInput = page.getByRole('switch', { name: 'Off' });

      await switchInput.click({ force: true });

      await vi.waitFor(function checkLabelUpdated() {
        assume(page.getByRole('switch', { name: 'On' })).is.not.equal(null);
      });
    });

    it('renders SwitchNoLabel with an accessible name', async function noLabelRender() {
      await render(<SwitchNoLabel />);

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });
      assume(switchInput).is.not.equal(null);
    });
  });
});
