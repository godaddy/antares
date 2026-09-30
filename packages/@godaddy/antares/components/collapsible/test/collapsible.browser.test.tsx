import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Input } from '@godaddy/antares';
import { preloadTestIcons, resetPointer } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { PlaygroundExample } from '../examples/collapsible-playground.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetPointer);
  describe('#Collapsible', function collapsibleTests() {
    it('preserves entered details when the panel closes and reopens', async function persistentContent() {
      await render(
        <PlaygroundExample
          headingText="Contact details"
          content={<Input aria-label="Additional details" />}
          contentProps={{ padding: 'sm' }}
          defaultExpanded
        />
      );
      const trigger = page.getByRole('button', { name: 'Contact details' });
      const input = page.getByRole('textbox', { name: 'Additional details' });
      const inputElement = input.element();

      await userEvent.tab();
      await expect.element(trigger).toHaveFocus();
      await userEvent.tab();
      await expect.element(input).toHaveFocus();
      await userEvent.fill(input, 'Keep these details');
      await userEvent.tab({ shift: true });
      await expect.element(trigger).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect.element(inputElement).not.toBeVisible();
      await userEvent.tab();
      await expect.element(inputElement).not.toHaveFocus();

      await userEvent.click(trigger);

      await expect.element(input).toBeVisible();
      await expect.element(input).toHaveValue('Keep these details');
      await userEvent.tab();
      await expect.element(input).toHaveFocus();
    });

    it('supports a standalone disclosure and an optional region', async function standalone() {
      await render(<DefaultExample />);
      const trigger = page.getByRole('button', { name: 'Advanced settings' });

      await userEvent.click(trigger);

      await expect.element(page.getByRole('region', { name: 'Advanced settings' })).toBeVisible();
      await expect.element(page.getByRole('heading', { level: 2, name: 'Advanced settings' })).toBeVisible();

      await userEvent.click(trigger);

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('keeps the status in the accessible name and toggles from the indicator', async function statusAndIndicator() {
      await render(<PlaygroundExample headingText="Contact details" showStatus defaultExpanded />);
      const trigger = page.getByRole('button', { name: 'Contact details (Completed)' });
      const indicator = trigger.element().querySelector<SVGSVGElement>('[data-icon="chevron-down"]');
      if (!indicator) throw new Error('Missing disclosure indicator');

      await userEvent.click(indicator);

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates boolean controlled state and accepts external changes', async function controlledState() {
      const onChange = vi.fn();
      await render(<ControlledExample onChange={onChange} />);
      const trigger = page.getByRole('button', { name: 'Account details' });

      await userEvent.click(trigger);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(page.getByRole('button', { name: 'Toggle details externally' }));

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it.each([
      false,
      true
    ])('skips a disabled section with initial expansion %s', async function disabledState(defaultExpanded) {
      await render(
        <PlaygroundExample headingText="Unavailable settings" isDisabled defaultExpanded={defaultExpanded} />
      );
      const trigger = page.getByRole('button', { name: 'Unavailable settings' });

      await expect.element(trigger).toBeDisabled();

      await userEvent.tab();
      await expect.element(trigger).not.toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');

      await expect.element(trigger).toHaveAttribute('aria-expanded', String(defaultExpanded));
    });

    it.each([
      { showStatus: false, showIndicator: false },
      { showStatus: false, showIndicator: true },
      { showStatus: true, showIndicator: false },
      { showStatus: true, showIndicator: true }
    ])('supports keyboard and ARIA with status $showStatus and indicator $showIndicator', async function keyboardAndAria({
      showStatus,
      showIndicator
    }) {
      await render(
        <PlaygroundExample
          headingText="Transfer details"
          content="Unlock your domain before requesting a transfer."
          showStatus={showStatus}
          showIndicator={showIndicator}
        />
      );
      const name = showStatus ? 'Transfer details (Completed)' : 'Transfer details';
      const trigger = page.getByRole('button', { name });

      await userEvent.tab();

      await expect.element(trigger).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect.element(trigger).toHaveFocus();
      await expect.element(page.getByRole('group', { name })).toBeVisible();
      await expect.element(page.getByText('Unlock your domain before requesting a transfer.')).toBeVisible();

      await userEvent.keyboard(' ');

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect.element(page.getByText('Unlock your domain before requesting a transfer.')).not.toBeVisible();
      await expect.element(trigger).toHaveFocus();
    });
  });
});
