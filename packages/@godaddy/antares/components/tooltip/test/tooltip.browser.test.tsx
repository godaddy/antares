import { DefaultExample } from '../examples/default.tsx';
import { flushSync } from 'react-dom';
import { cdp, page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { resetHover, resetPointer } from '#test/utils/test-helpers.tsx';
import assume from 'assume';

describe('@godaddy/antares', function antares() {
  describe('#Tooltip', function tooltipTests() {
    // Run the first-hover cases before the other tests warm up React Aria's shared tooltip state.
    it.each([
      { name: 'default delay', delay: undefined, expectedDelay: 250 },
      { name: 'explicit delay', delay: 500, expectedDelay: 500 }
    ])(
      'opens on first hover after $expectedDelay ms with the $name',
      async function hoverTiming({ delay, expectedDelay }) {
        await resetPointer();
        const { getByRole } = await render(<DefaultExample tooltipTriggerProps={{ delay }} />);
        const trigger = getByRole('button', { name: 'Hover me' }).element();
        const tooltip = getByRole('tooltip');
        const outside = document.body;
        const pointer = { bubbles: true, pointerType: 'mouse', pointerId: 1, isPrimary: true };

        function advanceClock(ms: number) {
          flushSync(function advanceTimers() {
            vi.advanceTimersByTime(ms);
          });
        }

        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
        try {
          // Start the hover on the fake clock without moving the browser's real pointer.
          trigger.dispatchEvent(new PointerEvent('pointermove', pointer));
          trigger.dispatchEvent(new PointerEvent('pointerover', { ...pointer, relatedTarget: outside }));
          advanceClock(expectedDelay - 1);
          expect(tooltip.query()).toBeNull();

          advanceClock(1);
          expect(tooltip.query()).not.toBeNull();
        } finally {
          try {
            trigger.dispatchEvent(new PointerEvent('pointerout', { ...pointer, relatedTarget: outside }));
            // Let React Aria's shared hover cooldown finish before the next case.
            advanceClock(500);
          } finally {
            vi.useRealTimers();
          }
        }
      }
    );

    it('shows tooltip on focus', async function focusShow() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function open() {
        const tooltip = getByRole('tooltip').query();
        assume(tooltip).is.not.equal(null);
        assume(tooltip?.textContent).includes('This is the tooltip content!');
      });
    });

    it('keeps opacity feedback without spatial motion when reduced motion is preferred', async function reducedMotion() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      const setReducedMotion = (value: 'reduce' | 'no-preference') =>
        session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value }]
        });

      await setReducedMotion('reduce');

      try {
        assume(matchMedia('(prefers-reduced-motion: reduce)').matches).is.true();

        const { getByRole } = await render(<DefaultExample />);
        await userEvent.keyboard('{Tab}');

        const tooltip = getByRole('tooltip').element();
        const style = getComputedStyle(tooltip);

        assume(style.transform).equals('none');
        assume(style.transitionProperty).equals('opacity');
      } finally {
        await setReducedMotion('no-preference');
      }
    });

    it('hides tooltip on Escape', async function escapeHide() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function open() {
        assume(getByRole('tooltip').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');

      await vi.waitFor(async function close() {
        assume(getByRole('tooltip').query()).equals(null);
      });
    });

    it('shows tooltip on hover', async function hoverShow() {
      const { getByRole } = await render(<DefaultExample tooltipTriggerProps={{ delay: 0, closeDelay: 0 }} />);

      await resetHover();
      await page.getByRole('button').hover();

      await vi.waitFor(async function open() {
        const tooltip = getByRole('tooltip').query();
        assume(tooltip).is.not.equal(null);
        assume(tooltip?.textContent).includes('This is the tooltip content!');
      });
    });

    it('hides tooltip on unhover', async function hoverHide() {
      const { getByRole } = await render(<DefaultExample tooltipTriggerProps={{ delay: 0, closeDelay: 0 }} />);

      await resetHover();
      await page.getByRole('button').hover();

      await vi.waitFor(async function open() {
        assume(getByRole('tooltip').query()).is.not.equal(null);
      });

      await resetHover();

      await vi.waitFor(async function close() {
        assume(getByRole('tooltip').query()).equals(null);
      });
    });
  });
});
