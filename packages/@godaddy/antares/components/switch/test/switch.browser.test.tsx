import { Switch } from '@godaddy/antares';
import { createRef } from 'react';
import { SwitchControlled } from '../examples/controlled';
import { SwitchDefault } from '../examples/default';
import { SwitchDisabled } from '../examples/disabled';
import { SwitchNoLabel } from '../examples/no-label';
import { SwitchRootCustomization } from '../examples/root-customization';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Switch', function switchTests() {
    it('toggles when the track is clicked', async function trackClick() {
      const user = userEvent.setup();
      const { container } = await render(<SwitchDefault />);

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });
      const track = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      assume((switchInput.element() as HTMLInputElement).checked).is.false();

      await user.click(track, { force: true });

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

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });

      await switchInput.click({ force: true });

      await vi.waitFor(function checkSelection() {
        assume((switchInput.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('renders SwitchNoLabel with an accessible name', async function noLabelRender() {
      await render(<SwitchNoLabel />);

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });
      assume(switchInput).exists();
    });

    it('applies className and style to the same interactive root', async function rootCustomization() {
      const { container } = await render(<SwitchRootCustomization />);

      const interactiveRoot = container.querySelector('.custom-switch') as HTMLElement;
      assume(interactiveRoot.style.opacity).equals('0.5');
      assume(interactiveRoot.tagName).equals('LABEL');
    });

    it('forwards ref to the interactive root', async function forwardsRef() {
      const ref = createRef<HTMLLabelElement>();
      await render(<Switch ref={ref}>Wi-Fi</Switch>);

      assume(ref.current).is.not.equal(null);
      assume(ref.current?.tagName).equals('LABEL');
      assume(ref.current?.querySelector('[role="switch"]')).is.not.equal(null);
    });
  });
});
