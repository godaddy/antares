import { Switch } from '@godaddy/antares';
import { createRef } from 'react';
import { SwitchControlledExample } from '../examples/controlled';
import { DefaultExample } from '../examples/default';
import { SwitchDisabledExample } from '../examples/disabled';
import { SwitchNoLabelExample } from '../examples/no-label';
import { SwitchRootCustomizationExample } from '../examples/root-customization';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Switch', function switchTests() {
    it('toggles when the track is clicked', async function trackClick() {
      const user = userEvent.setup();
      const { container } = await render(<DefaultExample />);

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
      await render(<DefaultExample />);

      const label = page.getByText('Wi-Fi');
      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });

      await user.click(label);

      await vi.waitFor(function checkSelection() {
        assume((switchInput.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('toggles with the Space key when focused', async function spaceKeyToggle() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

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
      await render(<SwitchDisabledExample />);

      const switchInput = page.getByRole('switch', { name: 'Disabled off' });
      assume((switchInput.element() as HTMLInputElement).checked).is.false();

      await user.click(switchInput, { force: true });
      assume((switchInput.element() as HTMLInputElement).checked).is.false();
    });

    it('fires onChange with the new value in SwitchControlledExample', async function controlledToggle() {
      await render(<SwitchControlledExample />);

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });

      await switchInput.click({ force: true });

      await vi.waitFor(function checkSelection() {
        assume((switchInput.element() as HTMLInputElement).checked).is.true();
      });
    });

    it('renders SwitchNoLabelExample with an accessible name', async function noLabelRender() {
      await render(<SwitchNoLabelExample />);

      const switchInput = page.getByRole('switch', { name: 'Wi-Fi' });
      assume(switchInput).exists();
    });

    it('applies className and style to the field container', async function rootCustomization() {
      const { container } = await render(<SwitchRootCustomizationExample />);

      const fieldContainer = container.querySelector('.custom-switch') as HTMLElement;
      assume(fieldContainer.style.opacity).equals('0.5');
      assume(fieldContainer.tagName).equals('DIV');
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
