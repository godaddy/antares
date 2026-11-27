/// <reference types="vite/client" />
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { createRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { Button, CircularProgress, toast, ToastQueue, ToastRegion } from '@godaddy/antares';
import assume from 'assume';
import { parse } from 'yaml';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import curatedTokens from '../../../../design-tokens/src/tokens.yml?raw';
import legacyTokens from '../../../../../../apps/docs/.storybook/legacy-tokens.css?raw';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/toast-playground.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { PersistentExample } from '../examples/persistent.tsx';
import { AriaLabelsExample } from '../examples/aria-labels.tsx';
import { MultipleRegionsExample } from '../examples/multiple-regions.tsx';
import { SharedQueueExample } from '../examples/shared-queue.tsx';
import { RichContentExample } from '../examples/rich-content.tsx';
import { FromModalExample } from '../examples/from-modal.tsx';

const HOST = '[data-antares-toast-host="1"]';

function toasts() {
  return Array.from(document.querySelectorAll(`${HOST} [role="alertdialog"]`));
}

async function showToast() {
  await userEvent.click(page.getByRole('button', { name: 'Show toast' }));
}

function luminance(color: string) {
  const [red, green, blue] = color
    .slice(4, -1)
    .split(', ')
    .map(function linearize(channel) {
      const srgb = Number(channel) / 255;
      return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

describe('@godaddy/antares', function antares() {
  describe('#Toast', function toastTests() {
    beforeAll(preloadTestIcons);

    // Wide enough that the top-right host doesn't cover the example's buttons.
    beforeAll(async function viewport() {
      await page.viewport(1024, 768);
    });

    afterEach(async function closeAll() {
      // Toasts live in a page-wide host, outside the rendered container. Closing one can reveal a
      // queued one, so keep closing until none are left.
      await vi.waitFor(function empty() {
        for (const close of document.querySelectorAll<HTMLButtonElement>(`${HOST} [slot="close"]`)) close.click();
        assume(toasts().length).equals(0);
      });
    });

    it('shows a toast in the shared host', async function showsToast() {
      await render(<DefaultExample />);
      await showToast();

      await expect.element(page.getByRole('alertdialog', { name: 'Domain connected' })).toBeVisible();
      assume(document.querySelector(`${HOST} [role="region"]`)).is.not.equal(null);
    });

    it('renders the title, message and status icon', async function content() {
      await render(<DefaultExample />);
      await showToast();

      const toast = page.getByRole('alertdialog', { name: 'Domain connected' });
      await expect.element(toast).toHaveAccessibleDescription('Your site is now live.');
      assume(document.querySelector(`${HOST} [data-emphasis="success"] [data-icon="checkmark"]`)).is.not.equal(null);
    });

    it('labels the toast with its message when there is no title', async function messageOnly() {
      await render(<PlaygroundExample title="" message="Copied to clipboard" />);
      await showToast();

      await expect.element(page.getByRole('alertdialog', { name: 'Copied to clipboard' })).toBeVisible();
    });

    it('renders React nodes in the title and message', async function richContent() {
      await render(<RichContentExample />);
      await userEvent.click(page.getByRole('button', { name: 'Show rich toast' }));

      const toast = page.getByRole('alertdialog', { name: 'example.com' });
      await expect.element(toast).toBeVisible();
      assume(toast.element().querySelector('strong')?.textContent).equals('1 year');
      assume(toast.element().querySelector('time')?.getAttribute('datetime')).equals('2027-11-17');
    });

    it('renders a title of 0', async function zeroTitle() {
      await render(<PlaygroundExample title={0} message="Items left" timeout={0} />);
      await showToast();

      await expect.element(page.getByRole('alertdialog', { name: '0' })).toHaveAccessibleDescription('Items left');
    });

    it('uses the message as the accessible name for a true title', async function trueTitle() {
      await render(<PlaygroundExample title={true} message="Saved" timeout={0} />);
      await showToast();

      await expect.element(page.getByRole('alertdialog', { name: 'Saved' })).toBeVisible();
      await expect.element(page.getByRole('alertdialog')).not.toHaveAccessibleDescription();
    });

    it('uses the message as the accessible name for a false title', async function falseTitle() {
      await render(<PlaygroundExample title={false} message="Saved" timeout={0} />);
      await showToast();

      await expect.element(page.getByRole('alertdialog', { name: 'Saved' })).toBeVisible();
      await expect.element(page.getByRole('alertdialog')).not.toHaveAccessibleDescription();
    });

    it('renders no icon for the none emphasis', async function noIcon() {
      await render(<PlaygroundExample emphasis="none" />);
      await showToast();

      await expect.element(page.getByRole('alertdialog')).toBeVisible();
      assume(document.querySelector(`${HOST} [data-emphasis="none"] [data-icon]:not([data-icon="x"])`)).equals(null);
    });

    it('maps each emphasis to its icon', async function emphasisIcons() {
      const icons = [
        ['success', 'checkmark'],
        ['critical', 'alert'],
        ['warning', 'alert']
      ] as const;

      for (const [emphasis, icon] of icons) {
        const { unmount } = await render(<PlaygroundExample emphasis={emphasis} />);
        await showToast();

        await expect.element(page.getByRole('alertdialog')).toBeVisible();
        assume(document.querySelector(`${HOST} [data-emphasis="${emphasis}"] [data-icon="${icon}"]`)).is.not.equal(
          null
        );
        await userEvent.click(page.getByRole('button', { name: 'Close' }));
        await vi.waitFor(function closed() {
          assume(toasts().length).equals(0);
        });
        await unmount();
      }
    });

    it('keeps emphasis icons legible with curated and legacy colors', async function iconContrast() {
      const tokens = parse(curatedTokens) as Record<string, { $value: string }>;
      const curatedColors = Object.entries(tokens)
        .filter(([name]) => name === 'color-surface-background-raised' || name.startsWith('color-feedback-'))
        .map(([name, token]) => `--${name}: ${token.$value};`)
        .join(' ');
      const icons = [
        ['warning', 'Storage almost full', 'alert', 'rgb(222, 124, 0)'],
        ['critical', 'Payment failed', 'alert', 'rgb(255, 187, 187)'],
        ['success', 'Domain connected', 'checkmark', 'rgb(159, 255, 184)']
      ] as const;
      const palette = document.createElement('style');
      document.head.append(palette);

      try {
        await render(<EmphasesExample />);
        for (const [emphasis] of icons) {
          await userEvent.click(page.getByRole('button', { name: `Show ${emphasis}` }));
        }

        for (const [name, css] of [
          ['curated', `:root { ${curatedColors} }`],
          ['legacy', legacyTokens]
        ]) {
          palette.textContent = css;
          for (const [emphasis, title, glyph, legacyFill] of icons) {
            const notification = page.getByRole('alertdialog', { name: title }).element();
            const icon = notification.querySelector(`[data-icon="${glyph}"]`);
            if (!icon?.parentElement) throw new Error(`Missing ${emphasis} icon`);

            const { fill } = getComputedStyle(icon);
            const { backgroundColor } = getComputedStyle(icon.parentElement);
            const foreground = luminance(fill);
            const background = luminance(backgroundColor);
            const contrast = (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
            expect(contrast, `${name} ${emphasis}: ${fill} on ${backgroundColor}`).toBeGreaterThanOrEqual(3);

            if (name === 'legacy') {
              expect(fill).toBe(legacyFill);
              expect(backgroundColor).toBe('rgb(17, 17, 17)');
            }
          }
        }
      } finally {
        palette.remove();
      }
    });

    it('matches the close glyph color to the toast text when Button styles load last', async function closeColor() {
      const stylesheet = document.createElement('style');
      // Reapply the minimal Button foreground at its original specificity, after Toast's styles.
      stylesheet.textContent = `
        [slot="close"] {
          --_button-text: var(--color-action-text-tertiary-default, var(--ux-ut3xrx, #4169e1));
        }
      `;
      document.head.append(stylesheet);

      try {
        await render(<DefaultExample />);
        await showToast();

        const notification = page.getByRole('alertdialog', { name: 'Domain connected' });
        const close = notification.getByRole('button', { name: 'Close' });
        await expect.element(close).toBeVisible();
        const glyph = close.element().querySelector('[data-icon="x"]');
        if (!glyph) throw new Error('Missing close glyph');

        const title = notification.getByText('Domain connected').element();
        expect(getComputedStyle(glyph).fill).toBe(getComputedStyle(title).color);
      } finally {
        stylesheet.remove();
      }
    });

    it('dims the close button on hover instead of filling it', async function closeHover() {
      await render(<DefaultExample />);
      await showToast();

      const close = page.getByRole('button', { name: 'Close' });
      await userEvent.hover(close);
      await vi.waitFor(function dimmed() {
        const style = getComputedStyle(close.element());
        assume(style.opacity).equals('0.8');
        assume(style.backgroundColor).equals('rgba(0, 0, 0, 0)');
      });
    });

    it('stays inside a 320px viewport', async function narrow() {
      await page.viewport(320, 640);

      try {
        await render(<DefaultExample />);
        await showToast();

        const toast = page.getByRole('alertdialog').element().getBoundingClientRect();
        assume(toast.left).is.at.least(0);
        assume(toast.right).is.at.most(320);
      } finally {
        await page.viewport(1024, 768);
      }
    });

    it('scrolls when the toasts are taller than the viewport', async function scrolls() {
      await page.viewport(1024, 300);

      try {
        await render(
          <PlaygroundExample timeout={0} message="A long message that wraps onto a second line in the toast." />
        );
        for (let i = 0; i < 5; i++) await showToast();
        await vi.waitFor(function five() {
          assume(toasts().length).equals(5);
        });

        const host = document.querySelector(HOST) as HTMLElement;
        assume(host.scrollHeight).is.above(host.clientHeight);
        // The host's padding lets clicks through to the page underneath.
        const box = host.getBoundingClientRect();
        assume(document.elementFromPoint(box.right - 2, box.top + 2)).does.not.equal(host);
        host.scrollTop = host.scrollHeight;
        const last = toasts()[4].getBoundingClientRect();
        assume(last.bottom).is.at.most(300);
      } finally {
        await page.viewport(1024, 768);
      }
    });

    it('shows a toast above a Modal opened after the host', async function aboveModal() {
      await render(<FromModalExample />);
      await userEvent.click(page.getByRole('button', { name: 'Toast before modal' }));
      await expect.element(page.getByRole('alertdialog', { name: 'Before the modal' })).toBeVisible();

      // The host stays empty in the page while the modal opens.
      await userEvent.click(page.getByRole('button', { name: 'Close' }));
      await vi.waitFor(function closed() {
        assume(toasts().length).equals(0);
      });

      await userEvent.click(page.getByRole('button', { name: 'Open modal' }));
      await userEvent.click(page.getByRole('button', { name: 'Toast from modal' }));

      const toast = page.getByRole('alertdialog', { name: 'From the modal' });
      await expect.element(toast).toBeVisible();
      const box = toast.element().getBoundingClientRect();
      const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      assume(top?.closest('[role="alertdialog"]')).equals(toast.element());

      await userEvent.click(page.getByRole('button', { name: 'Close' }).first());
      await userEvent.keyboard('{Escape}');
    });

    it('shows a toast above a Modal opened by the same press', async function aboveSameEventModal() {
      await render(<FromModalExample />);
      await userEvent.click(page.getByRole('button', { name: 'Open modal and show toast' }));
      await expect.element(page.getByRole('dialog', { name: 'Settings' })).toBeVisible();

      const notification = page.getByRole('alertdialog', { name: 'While opening the modal' });
      await vi.waitFor(function onTop() {
        const dialog = notification.element();
        const box = dialog.getBoundingClientRect();
        const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
        expect(top?.closest('[role="alertdialog"]')).toBe(dialog);
      });

      await userEvent.click(notification.getByRole('button', { name: 'Close' }));
      await userEvent.keyboard('{Escape}');
    });

    it('plays its exit before closing when the close button is pressed', async function closeButton() {
      await render(<DefaultExample />);
      await showToast();
      const closing = page.getByRole('alertdialog').element();

      await userEvent.click(page.getByRole('button', { name: 'Close' }));

      assume(closing.hasAttribute('data-exiting')).equals(true);
      await vi.waitFor(function closed() {
        assume(closing.isConnected).equals(false);
      });
    });

    it('hands off focus during keyboard dismissal before each exit finishes', async function keyboardDismissal() {
      await render(<DefaultExample />);
      await showToast();
      toast.add({ message: 'Newest notification', timeout: null });

      const trigger = page.getByRole('button', { name: 'Show toast' }).element();
      const newest = page.getByRole('alertdialog', { name: 'Newest notification' });
      const older = page.getByRole('alertdialog', { name: 'Domain connected' });
      await expect.element(newest).toBeVisible();
      const firstExit = newest.element() as HTMLElement;
      const lastExit = older.element() as HTMLElement;
      const firstClose = newest.getByRole('button', { name: 'Close' }).element() as HTMLElement;
      const lastClose = older.getByRole('button', { name: 'Close' }).element();

      await userEvent.keyboard('{F6}{Tab}{Tab}');
      expect(document.activeElement).toBe(firstClose);
      await userEvent.keyboard('{Enter}');
      expect(firstExit.isConnected).toBe(true);
      expect(document.activeElement).toBe(lastExit);
      expect(firstExit.inert).toBe(true);
      firstClose.focus();
      expect(document.activeElement).toBe(lastExit);

      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(lastClose);
      await userEvent.keyboard('{Space}');
      expect(lastExit.isConnected).toBe(true);
      expect(document.activeElement).toBe(trigger);
      expect(lastExit.inert).toBe(true);
    });

    it('slides out toward the left edge in RTL', async function rtlSlide() {
      const root = document.documentElement;
      const direction = root.getAttribute('dir');
      root.dir = 'rtl';

      try {
        await render(<DefaultExample />);
        const key = toast.add({ message: 'Saved', timeout: null });
        const dialog = page.getByRole('alertdialog', { name: 'Saved' });
        await expect.element(dialog).toBeVisible();
        const shown = dialog.element();
        await Promise.all(shown.getAnimations({ subtree: true }).map((animation) => animation.finished));

        flushSync(function close() {
          toast.close(key);
        });

        const slide = shown
          .getAnimations({ subtree: true })
          .find((animation) => animation instanceof CSSTransition && animation.transitionProperty === 'translate');
        const effect = slide?.effect;
        expect(effect instanceof KeyframeEffect && effect.getKeyframes().at(-1)?.translate).toBe('-100%');
      } finally {
        if (direction === null) root.removeAttribute('dir');
        else root.dir = direction;
      }
    });

    it('closes on its own after the timeout', async function timeout() {
      await render(<PlaygroundExample timeout={300} />);
      await showToast();
      await expect.element(page.getByRole('alertdialog')).toBeVisible();

      // Move the pointer off the region, which pauses the timer while hovered.
      await userEvent.hover(page.getByRole('button', { name: 'Show toast' }));

      await vi.waitFor(
        function closed() {
          assume(toasts().length).equals(0);
        },
        { timeout: 3000 }
      );
    });

    it.each(['hover', 'keyboard focus'])('preserves the remaining timeout during %s', async function paused(input) {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });

      try {
        await render(<DefaultExample />);
        await showToast();
        const trigger = page.getByRole('button', { name: 'Show toast' });
        const notification = page.getByRole('alertdialog', { name: 'Domain connected' });
        await expect.element(notification).toBeVisible();
        const shown = notification.element();
        await Promise.all(shown.getAnimations({ subtree: true }).map((animation) => animation.finished));
        await vi.advanceTimersByTimeAsync(2000);

        if (input === 'hover') {
          await userEvent.hover(notification);
        } else {
          await userEvent.keyboard('{F6}{Tab}');
          expect(document.activeElement).toBe(shown);
        }

        await vi.advanceTimersByTimeAsync(5000);
        expect(shown.hasAttribute('data-exiting')).toBe(false);
        expect(shown.isConnected).toBe(true);

        if (input === 'hover') {
          await userEvent.hover(trigger);
        } else {
          await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
          expect(shown.closest('[role="region"]')?.contains(document.activeElement)).toBe(false);
        }

        await vi.advanceTimersByTimeAsync(2500);
        expect(shown.hasAttribute('data-exiting')).toBe(false);
        expect(shown.isConnected).toBe(true);
        await vi.advanceTimersByTimeAsync(1000);
        await vi.waitFor(function startsExit() {
          expect(shown.hasAttribute('data-exiting')).toBe(true);
        });
      } finally {
        vi.useRealTimers();
      }
    });

    it.each(['hover', 'keyboard focus'])('pauses a newly visible toast during %s', async function pausedArrival(input) {
      const queue = new ToastQueue();
      await render(<PlaygroundExample queue={queue} timeout={0} />);
      await showToast();
      const first = page.getByRole('alertdialog', { name: 'Toast title' });
      await expect.element(first).toBeVisible();
      await Promise.all(
        first
          .element()
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished)
      );

      if (input === 'hover') await userEvent.hover(first);
      else {
        await userEvent.keyboard('{F6}{Tab}');
        expect(document.activeElement).toBe(first.element());
      }

      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      try {
        queue.add({ message: 'Timed arrival', timeout: 2000 });
        const arrival = page.getByRole('alertdialog', { name: 'Timed arrival' });
        await expect.element(arrival).toBeVisible();
        const shown = arrival.element();
        await vi.advanceTimersByTimeAsync(2500);
        expect(shown.hasAttribute('data-exiting')).toBe(false);

        const trigger = page.getByRole('button', { name: 'Show toast' });
        if (input === 'hover') await userEvent.hover(trigger);
        else (trigger.element() as HTMLElement).focus();
        await vi.advanceTimersByTimeAsync(2100);
        await vi.waitFor(function startsExit() {
          expect(shown.hasAttribute('data-exiting')).toBe(true);
        });
      } finally {
        vi.useRealTimers();
      }
    });

    it('pauses a promoted toast while keyboard focus stays in the stack', async function pausedPromotion() {
      const queue = new ToastQueue({ maxVisibleToasts: 2 });
      queue.add({ message: 'Waiting notification', timeout: 2000 });
      queue.add({ message: 'Focus destination', timeout: null });
      queue.add({ message: 'Close to promote', timeout: null });
      await render(<PlaygroundExample queue={queue} />);
      const trigger = page.getByRole('button', { name: 'Show toast' }).element() as HTMLElement;
      const closing = page.getByRole('alertdialog', { name: 'Close to promote' });
      await expect.element(closing).toBeVisible();
      const waiting = page.getByRole('alertdialog', { name: 'Waiting notification' });
      expect(waiting.query()).toBeNull();

      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      try {
        trigger.focus();
        await userEvent.keyboard('{F6}{Tab}{Tab}');
        expect(document.activeElement).toBe(closing.getByRole('button', { name: 'Close' }).element());
        await userEvent.keyboard('{Enter}');
        await expect.element(waiting).toBeVisible();
        expect(document.activeElement).toBe(page.getByRole('alertdialog', { name: 'Focus destination' }).element());
        const shown = waiting.element();

        await vi.advanceTimersByTimeAsync(2500);
        expect(shown.hasAttribute('data-exiting')).toBe(false);
        trigger.focus();
        await vi.advanceTimersByTimeAsync(2100);
        await vi.waitFor(function startsExit() {
          expect(shown.hasAttribute('data-exiting')).toBe(true);
        });
      } finally {
        vi.useRealTimers();
      }
    });

    it('keeps a persistent toast open', async function persistent() {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });

      try {
        await render(<DefaultExample />);
        toast.add({ message: 'Still working', timeout: 0 });
        const notification = page.getByRole('alertdialog', { name: 'Still working' });
        await expect.element(notification).toBeVisible();

        await vi.advanceTimersByTimeAsync(5100);

        await expect.element(notification).not.toHaveAttribute('data-exiting');
      } finally {
        vi.useRealTimers();
      }
    });

    it('hides the close button only when the toast has a timeout', async function dismissible() {
      await render(<PlaygroundExample dismissible={false} timeout={500} />);
      await showToast();

      await expect.element(page.getByRole('alertdialog')).toBeVisible();
      assume(page.getByRole('button', { name: 'Close' }).query()).equals(null);

      // It can't be closed by hand, so let the timeout clear it for the next test.
      await userEvent.hover(page.getByRole('button', { name: 'Show toast' }));
      await vi.waitFor(
        function closed() {
          assume(toasts().length).equals(0);
        },
        { timeout: 3000 }
      );
    });

    it('forces the close button on a persistent toast', async function forcedClose() {
      await render(<PlaygroundExample dismissible={false} timeout={0} />);
      await showToast();

      await expect.element(page.getByRole('button', { name: 'Close' })).toBeVisible();
    });

    it('normalizes out-of-range timeouts', async function timeoutRange() {
      await render(<DefaultExample />);
      const keys: string[] = [];
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      try {
        for (const timeout of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
          keys.push(toast.add({ message: `Timeout ${timeout}`, timeout, dismissible: false }));
        }
        keys.push(toast.add({ message: 'Large finite timeout', timeout: 2 ** 32 }));
        const large = page.getByRole('alertdialog', { name: 'Large finite timeout' });
        await expect.element(large).toBeVisible();
        const shown = large.element();
        await vi.advanceTimersByTimeAsync(1000);
        expect(shown.hasAttribute('data-exiting')).toBe(false);
        for (const timeout of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
          const dialog = page.getByRole('alertdialog', { name: `Timeout ${timeout}` });
          expect(dialog.element().hasAttribute('data-exiting')).toBe(false);
          await expect.element(dialog.getByRole('button', { name: 'Close' })).toBeVisible();
        }

        await vi.advanceTimersByTimeAsync(2 ** 31 - 1);
        await vi.waitFor(function startsExit() {
          expect(shown.hasAttribute('data-exiting')).toBe(true);
        });
      } finally {
        vi.useRealTimers();
        for (const key of keys) toast.close(key);
      }
    });

    it('stacks several toasts, newest first', async function stacks() {
      await render(<DefaultExample />);
      for (const message of ['First toast', 'Second toast', 'Third toast']) {
        toast.add({ message, timeout: null });
      }

      const dialogs = page.getByRole('alertdialog');
      await expect.element(dialogs.nth(0)).toHaveAccessibleName('Third toast');
      await expect.element(dialogs.nth(1)).toHaveAccessibleName('Second toast');
      await expect.element(dialogs.nth(2)).toHaveAccessibleName('First toast');
      expect(dialogs.elements()).toHaveLength(3);
    });

    it('caps visible toasts at 5 and shows the next one when a toast closes', async function cap() {
      await render(<DefaultExample />);
      for (let i = 0; i < 6; i++) toast.add({ message: `Toast ${i}`, timeout: null });

      await vi.waitFor(function five() {
        assume(toasts().length).equals(5);
      });

      assume(page.getByRole('alertdialog', { name: 'Toast 0' }).query()).equals(null);
      const closing = page.getByRole('alertdialog', { name: 'Toast 5' }).element();
      await userEvent.click(page.getByRole('alertdialog', { name: 'Toast 5' }).getByRole('button', { name: 'Close' }));
      await vi.waitFor(function stillFive() {
        assume(closing.isConnected).equals(false);
        assume(toasts().length).equals(5);
      });
      await expect.element(page.getByRole('alertdialog', { name: 'Toast 0' })).toBeVisible();
    });

    it('finishes a closing toast pushed out by a new one', async function closeThenReplace() {
      const queue = new ToastQueue({ maxVisibleToasts: 1 });
      const onClose = vi.fn();
      await render(<PlaygroundExample queue={queue} />);
      const key = queue.add({ message: 'Original toast', timeout: null, onClose });
      await expect.element(page.getByRole('alertdialog', { name: 'Original toast' })).toBeVisible();

      flushSync(function replace() {
        queue.close(key);
        queue.add({ message: 'Replacement toast', timeout: null });
      });

      await expect.element(page.getByRole('alertdialog', { name: 'Replacement toast' })).toBeVisible();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('finishes a closing toast when its region unmounts', async function closeThenUnmount() {
      const onClose = vi.fn();
      const key = toast.add({ message: 'Closing toast', timeout: null, onClose });

      function App() {
        const [isMounted, setIsMounted] = useState(true);

        return (
          <>
            {isMounted ? <ToastRegion /> : null}
            <Button
              onPress={function closeAndUnmount() {
                toast.close(key);
                setIsMounted(false);
              }}
            >
              Leave
            </Button>
          </>
        );
      }

      await render(<App />);
      await expect.element(page.getByRole('alertdialog')).toBeVisible();
      await userEvent.click(page.getByRole('button', { name: 'Leave' }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it.each(['close button', 'focused region'])(
      'can add a replacement from onClose with a %s',
      async function replacementAfterExit(input) {
        await render(<DefaultExample />);
        const keepFocus = input === 'focused region';
        vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
        try {
          const onClose = vi.fn(function complete() {
            toast.add({ message: 'Upload finished', timeout: keepFocus ? 1000 : null });
          });
          const key = toast.add({ message: 'Uploading', timeout: null, onClose });
          const uploading = page.getByRole('alertdialog', { name: 'Uploading' });
          await expect.element(uploading).toBeVisible();

          const triggerButton = page.getByRole('button', { name: 'Show toast' });
          const trigger = triggerButton.element() as HTMLElement;
          const region = page.getByRole('region').element();
          if (keepFocus) {
            await userEvent.hover(triggerButton);
            trigger.focus();
            await userEvent.keyboard('{F6}');
            expect(document.activeElement).toBe(region);
            toast.close(key);
          } else {
            await userEvent.click(uploading.getByRole('button', { name: 'Close' }));
          }

          const replacement = page.getByRole('alertdialog', { name: 'Upload finished' });
          await expect.element(replacement).toBeVisible();
          assume(uploading.query()).equals(null);
          expect(onClose).toHaveBeenCalledTimes(1);
          toast.close(key);
          expect(onClose).toHaveBeenCalledTimes(1);
          assume(toasts().length).equals(1);

          if (keepFocus) {
            const shown = replacement.element();
            expect(document.activeElement).toBe(region);
            await vi.advanceTimersByTimeAsync(1500);
            expect(shown.hasAttribute('data-exiting')).toBe(false);
            expect(shown.isConnected).toBe(true);
            trigger.focus();
            expect(document.activeElement).toBe(trigger);
            await vi.advanceTimersByTimeAsync(1100);
            await vi.waitFor(function startsExit() {
              expect(!shown.isConnected || shown.hasAttribute('data-exiting')).toBe(true);
            });
          }
        } finally {
          vi.useRealTimers();
        }
      }
    );

    it('starts a fresh timer after the focused region detaches', async function detachedRegion() {
      const queue = new ToastQueue();
      const ref = createRef<HTMLDivElement>();
      await render(<ToastRegion queue={queue} ref={ref} />);
      const key = queue.add({ message: 'First notification', timeout: null });
      const region = page.getByRole('region');
      await expect.element(region).toBeVisible();
      const oldRegion = region.element() as HTMLElement;
      expect(ref.current).toBe(oldRegion);
      oldRegion.focus();
      expect(document.activeElement).toBe(oldRegion);
      queue.close(key);
      await vi.waitFor(function detached() {
        expect(oldRegion.isConnected).toBe(false);
      });
      expect(ref.current).toBeNull();

      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      try {
        queue.add({ message: 'Second notification', timeout: 1000 });
        const second = page.getByRole('alertdialog', { name: 'Second notification' });
        await expect.element(second).toBeVisible();
        expect(ref.current).toBe(region.element());
        const shown = second.element();
        await vi.advanceTimersByTimeAsync(1250);
        expect(!shown.isConnected || shown.hasAttribute('data-exiting')).toBe(true);
      } finally {
        vi.useRealTimers();
      }
    });

    it('can add a replacement from onClose before a region mounts', async function replacementWithoutRegion() {
      const onClose = vi.fn(function complete() {
        toast.add({ message: 'Upload finished', timeout: null });
      });

      const key = toast.add({ message: 'Uploading', timeout: null, onClose });
      toast.close(key);
      expect(onClose).toHaveBeenCalledTimes(1);
      await render(<DefaultExample />);

      await expect.element(page.getByRole('alertdialog', { name: 'Upload finished' })).toBeVisible();
      assume(page.getByRole('alertdialog', { name: 'Uploading' }).query()).equals(null);
      toast.close(key);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('closes a persistent toast from code', async function closeFromCode() {
      await render(<PersistentExample />);

      await userEvent.click(page.getByRole('button', { name: 'Start upload' }));
      await expect.element(page.getByRole('alertdialog', { name: 'Uploading 3 files…' })).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Finish upload' }));
      await vi.waitFor(function closed() {
        assume(toasts().length).equals(0);
      });

      // onClose ran, so the example re-enabled its button.
      await expect.element(page.getByRole('button', { name: 'Start upload' })).toBeEnabled();
    });

    it('closes a toast whose content animates forever', async function infiniteContent() {
      await render(<DefaultExample />);
      const onClose = vi.fn();
      const key = toast.add({
        message: <CircularProgress isIndeterminate aria-label="Uploading" />,
        timeout: null,
        onClose
      });
      await expect.element(page.getByRole('alertdialog')).toBeVisible();

      toast.close(key);

      await vi.waitFor(function closed() {
        assume(toasts().length).equals(0);
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('uses translated labels', async function translated() {
      await render(<AriaLabelsExample />);
      await userEvent.click(page.getByRole('button', { name: 'Mostrar aviso' }));

      await expect.element(page.getByRole('region', { name: 'Notificaciones' })).toBeVisible();
      await userEvent.click(page.getByRole('button', { name: 'Cerrar' }));
      await vi.waitFor(function closed() {
        assume(toasts().length).equals(0);
      });
    });

    it('preserves independent region contexts for title and message content', async function independentContexts() {
      await render(<MultipleRegionsExample />);
      await userEvent.click(page.getByRole('button', { name: 'Header toast' }));
      await userEvent.click(page.getByRole('button', { name: 'App toast' }));

      const header = page.getByRole('region', { name: 'Header notifications' });
      const app = page.getByRole('region', { name: 'App notifications' });
      await expect
        .element(header.getByRole('alertdialog', { name: 'Header' }))
        .toHaveAccessibleDescription('Header: You have 2 new messages.');
      await expect
        .element(app.getByRole('alertdialog', { name: 'App' }))
        .toHaveAccessibleDescription('App: Settings saved.');
      assume(document.querySelectorAll(HOST).length).equals(1);
      assume(document.querySelectorAll(`${HOST} > [role="region"]`).length).equals(2);
    });

    it('shows each toast once when two regions render the same queue', async function sharedQueue() {
      await render(<SharedQueueExample />);
      await showToast();

      await expect.element(page.getByRole('region', { name: 'First notifications' })).toBeVisible();
      assume(page.getByRole('region', { name: 'Second notifications' }).query()).equals(null);
      assume(toasts().length).equals(1);
    });

    it('hands the queue to the next region when the first unmounts', async function handOver() {
      await render(<SharedQueueExample />);
      await showToast();
      await expect.element(page.getByRole('region', { name: 'First notifications' })).toBeVisible();

      await userEvent.click(page.getByRole('button', { name: 'Unmount first region' }));

      await expect.element(page.getByRole('region', { name: 'Second notifications' })).toBeVisible();
      assume(toasts().length).equals(1);
    });

    it('holds toasts until a region mounts', async function unmounted() {
      toast.add({ message: 'Queued toast', timeout: null });
      assume(toasts().length).equals(0);

      await render(<DefaultExample />);
      await vi.waitFor(function shown() {
        assume(toasts().length).equals(1);
      });
    });

    it('closes a toast that never showed', async function closeUnshown() {
      toast.close(toast.add({ message: 'Never shown', timeout: null }));

      await render(<DefaultExample />);
      await new Promise((resolve) => setTimeout(resolve, 100));
      assume(toasts().length).equals(0);
    });

    it('shows a default toast without an icon for 5 seconds', async function defaults() {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });

      try {
        await render(<DefaultExample />);
        toast.add({ message: 'From code' });
        await expect.element(page.getByRole('alertdialog', { name: 'From code' })).toBeVisible();
        assume(document.querySelector(`${HOST} [data-emphasis="none"]`)).is.not.equal(null);

        const shown = page.getByRole('alertdialog').element();
        vi.advanceTimersByTime(4900);
        assume(shown.hasAttribute('data-exiting')).equals(false);
        vi.advanceTimersByTime(200);
        await expect.element(page.getByRole('alertdialog')).toHaveAttribute('data-exiting');
      } finally {
        vi.useRealTimers();
      }
    });

    it('closes from the default toast API', async function defaultApi() {
      await render(<DefaultExample />);

      const key = toast.add({ message: 'From code', timeout: null });
      await expect.element(page.getByRole('alertdialog', { name: 'From code' })).toBeVisible();

      toast.close(key);
      toast.close(key);
      await vi.waitFor(function closed() {
        assume(toasts().length).equals(0);
      });
    });
  });
});
