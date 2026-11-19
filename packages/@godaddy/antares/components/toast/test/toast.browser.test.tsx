import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { toast } from '@godaddy/antares';
import assume from 'assume';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
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

    it('renders nothing until a toast is added', async function emptyRegion() {
      await render(<DefaultExample />);

      assume(page.getByRole('region').query()).equals(null);
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
      assume(document.querySelector(`${HOST} [data-rich-title]`)).is.not.equal(null);
      assume(document.querySelector(`${HOST} strong`)?.textContent).equals('1 year');
      assume(document.querySelector(`${HOST} time`)?.getAttribute('datetime')).equals('2027-11-17');
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

    it('closes when the close button is pressed', async function closeButton() {
      await render(<DefaultExample />);
      await showToast();

      await userEvent.click(page.getByRole('button', { name: 'Close' }));

      await vi.waitFor(function closed() {
        assume(toasts().length).equals(0);
      });
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

    it('keeps a persistent toast open', async function persistent() {
      await render(<PlaygroundExample timeout={0} />);
      await showToast();

      await new Promise((resolve) => setTimeout(resolve, 600));
      assume(toasts().length).equals(1);
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

    it('stacks several toasts, newest first', async function stacks() {
      await render(<PlaygroundExample timeout={0} />);
      await showToast();
      await showToast();
      await showToast();

      await vi.waitFor(function three() {
        assume(toasts().length).equals(3);
      });
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

    it('can add a replacement from onClose after the exit animation', async function replacementAfterExit() {
      await render(<DefaultExample />);
      const onClose = vi.fn(function complete() {
        toast.add({ message: 'Upload finished', timeout: null });
      });
      const key = toast.add({ message: 'Uploading', timeout: null, onClose });
      await expect.element(page.getByRole('alertdialog', { name: 'Uploading' })).toBeVisible();
      await userEvent.click(page.getByRole('alertdialog').getByRole('button', { name: 'Close' }));

      await expect.element(page.getByRole('alertdialog', { name: 'Upload finished' })).toBeVisible();
      assume(page.getByRole('alertdialog', { name: 'Uploading' }).query()).equals(null);
      expect(onClose).toHaveBeenCalledTimes(1);
      toast.close(key);
      expect(onClose).toHaveBeenCalledTimes(1);
      assume(toasts().length).equals(1);
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

    it('shows one button per emphasis', async function emphases() {
      await render(<EmphasesExample />);

      for (const emphasis of ['none', 'success', 'critical', 'warning']) {
        await userEvent.click(page.getByRole('button', { name: `Show ${emphasis}` }));
      }

      await vi.waitFor(function four() {
        assume(toasts().length).equals(4);
      });
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

    it('uses translated labels', async function translated() {
      await render(<AriaLabelsExample />);
      await userEvent.click(page.getByRole('button', { name: 'Mostrar aviso' }));

      await expect.element(page.getByRole('region', { name: 'Notificaciones' })).toBeVisible();
      await userEvent.click(page.getByRole('button', { name: 'Cerrar' }));
      await vi.waitFor(function closed() {
        assume(toasts().length).equals(0);
      });
    });

    it('renders several regions into one shared host', async function sharedHost() {
      await render(<MultipleRegionsExample />);

      await userEvent.click(page.getByRole('button', { name: 'Header toast' }));
      await userEvent.click(page.getByRole('button', { name: 'App toast' }));

      await expect.element(page.getByRole('region', { name: 'Header notifications' })).toBeVisible();
      await expect.element(page.getByRole('region', { name: 'App notifications' })).toBeVisible();
      assume(document.querySelectorAll(HOST).length).equals(1);
      assume(document.querySelectorAll(`${HOST} > [role="region"]`).length).equals(2);
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
