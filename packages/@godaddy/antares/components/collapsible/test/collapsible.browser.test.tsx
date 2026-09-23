import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetPointer } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { WithStatusExample } from '../examples/with-status.tsx';
import { DisabledExample } from '../examples/disabled.tsx';

/** Resolves the real panel controlled by a trigger, failing clearly on broken ARIA wiring. */
function panelFor(trigger: Element): HTMLElement {
  const panelId = trigger.getAttribute('aria-controls');
  const panel = panelId ? document.getElementById(panelId) : null;
  if (!(panel instanceof HTMLElement)) throw new Error('Collapsible trigger has no associated panel');
  return panel;
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetPointer);
  beforeEach(async function resetViewport() {
    await page.viewport(900, 900);
  });
  describe('#Collapsible', function collapsibleTests() {
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
      await render(<WithStatusExample />);
      const trigger = page.getByRole('button', { name: 'Contact details (Completed)' });
      const indicator = trigger.element().querySelector<SVGSVGElement>('[data-icon="chevron-down"]');
      if (!indicator) throw new Error('Missing disclosure indicator');
      const icon = trigger.element().querySelector<SVGSVGElement>('svg:not([data-icon="chevron-down"])');
      if (!icon) throw new Error('Missing default icon');

      expect(icon.hasAttribute('slot')).toBe(false);
      expect(icon.getAttribute('aria-hidden')).toBe('true');
      expect(indicator.getAttribute('aria-hidden')).toBe('true');

      await userEvent.click(indicator);

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger.element().querySelector('button')).toBeNull();
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
    ])('preserves disabled state with initial expansion %s', async function disabledState(defaultExpanded) {
      await render(<DisabledExample defaultExpanded={defaultExpanded} />);
      const trigger = page.getByRole('button', { name: 'Unavailable settings' });

      await expect.element(trigger).toBeDisabled();

      (trigger.element() as HTMLButtonElement).click();

      await expect.element(trigger).toHaveAttribute('aria-expanded', String(defaultExpanded));
    });

    it('toggles by keyboard and maintains the accessible panel relationship', async function keyboardAndAria() {
      await render(<DefaultExample />);
      const trigger = page.getByRole('button', { name: 'Advanced settings' });
      const panel = panelFor(trigger.element());

      expect(panel.getAttribute('aria-labelledby')).toBe(trigger.element().id);

      await userEvent.tab();

      await expect.element(trigger).toHaveFocus();

      await userEvent.keyboard('{Enter}');

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
      await expect.element(trigger).toHaveFocus();

      await userEvent.keyboard(' ');

      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect.poll(() => panel.getAttribute('hidden')).toBe('until-found');
    });
  });
});
