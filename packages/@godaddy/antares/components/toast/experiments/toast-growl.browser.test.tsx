import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import {
  AvoidScenario,
  CoexistScenario,
  ForwardScenario,
  LeadScenario,
  MigrationShimScenario,
  MultipleCopiesScenario
} from './scenarios.tsx';

const HOST = '[data-antares-toast-host="1"]';

function badges(root: ParentNode | null) {
  return Array.from(root?.querySelectorAll('[data-context]') ?? [], (el) => el.textContent?.trim());
}

const growlShell = () => document.querySelector('[data-simulated-growl]');
const antaresHost = () => document.querySelector(HOST);

async function press(name: string) {
  await userEvent.click(page.getByRole('button', { name, exact: true }));
}

// Verifies the claims on the experiment page, so the decision table reflects real behavior.
describe('@godaddy/antares', function antares() {
  describe('#Toast × Growl experiment', function experiment() {
    beforeAll(preloadTestIcons);

    beforeAll(async function viewport() {
      await page.viewport(1280, 900);
    });

    afterEach(async function cleanup() {
      document.querySelectorAll(`${HOST} [slot="close"]`).forEach((b) => (b as HTMLElement).click());
      await vi.waitFor(function empty() {
        expect(document.querySelectorAll(`${HOST} [role="alertdialog"]`).length).toBe(0);
      });
    });

    it('elects Growl 2500 over 2400, whatever the mount order', async function election() {
      const { unmount } = await render(<CoexistScenario />);
      await press('Growl 2400');
      await press('Growl 2500');

      await vi.waitFor(function drawn() {
        expect(growlShell()?.getAttribute('data-simulated-growl')).toBe('2500');
        expect(badges(growlShell())).toHaveLength(2);
      });
      // 2400's message renders in 2500's tree, so it gets the wrong context: today's bug.
      expect(badges(growlShell())).toEqual([
        'Your changes are live. ❌ expected en-US, got es-MX',
        'Your changes are live. ✅ es-MX'
      ]);
      await unmount();
    });

    it('A1 coexist: Antares keeps its own context in its own stack', async function coexist() {
      const { unmount } = await render(<CoexistScenario />);
      await press('Antares toast');

      await vi.waitFor(function shown() {
        expect(badges(antaresHost())).toEqual(['Your changes are live. ✅ fr-CA']);
      });
      await unmount();
    });

    it('A2 avoid: the Antares stack moves below Growl', async function avoid() {
      const { unmount } = await render(<AvoidScenario />);
      await press('Growl 2500');
      await press('Antares toast');

      await vi.waitFor(function stacked() {
        const growlBottom = (growlShell() as HTMLElement).getBoundingClientRect().bottom;
        const antaresTop = (antaresHost() as HTMLElement).getBoundingClientRect().top;
        expect(antaresTop).toBeGreaterThanOrEqual(growlBottom - 1);
      });
      expect(badges(antaresHost())).toEqual(['Your changes are live. ✅ fr-CA']);
      await unmount();
    });

    it('A3 forward: the Growl leader draws Antares toasts, with the wrong context', async function forward() {
      const { unmount } = await render(<ForwardScenario />);
      await press('Antares toast');

      await vi.waitFor(function drawn() {
        expect(badges(growlShell())).toEqual(['Your changes are live. ❌ expected fr-CA, got es-MX']);
      });
      expect(antaresHost()?.querySelector('[role="alertdialog"]') ?? null).toBe(null);
      await unmount();
    });

    it('A4 lead: Antares draws Growl messages, with the wrong context', async function lead() {
      const { unmount } = await render(<LeadScenario />);
      await press('Growl 2400');
      await press('Growl 2500');

      await vi.waitFor(function drawn() {
        expect(badges(antaresHost())).toHaveLength(2);
      });
      expect(growlShell()).toBe(null);
      expect(badges(antaresHost()).every((b) => b?.includes('got fr-CA'))).toBe(true);
      await unmount();
    });

    it('B1 two Antares copies share one host and keep their own context', async function copies() {
      const { unmount } = await render(<MultipleCopiesScenario />);
      await press('Header toast');
      await press('App toast');

      await vi.waitFor(function shown() {
        expect(badges(antaresHost())).toHaveLength(2);
      });
      expect(document.querySelectorAll(HOST)).toHaveLength(1);
      expect(badges(antaresHost()).every((b) => b?.includes('✅'))).toBe(true);
      await unmount();
    });

    it('B2 shim maps Growl calls onto Antares', async function shim() {
      const { unmount } = await render(<MigrationShimScenario />);
      await press('addGrowlMessage (no lifetime)');
      await expect.element(page.getByRole('alertdialog', { name: 'Persistent' })).toBeVisible();

      await press('removeGrowlMessage');
      await vi.waitFor(function closed() {
        expect(page.getByRole('alertdialog', { name: 'Persistent' }).query()).toBe(null);
      });
      await unmount();
    });
  });
});
