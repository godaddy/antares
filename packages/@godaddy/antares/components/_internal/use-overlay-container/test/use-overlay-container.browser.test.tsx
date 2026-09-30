import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, StrictMode } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#useOverlayContainer', function overlayContainerTests() {
    afterEach(async function reset() {
      await cleanup();
      vi.unstubAllGlobals();
      await page.viewport(1024, 768);
    });

    it('keeps its container until the next opening across the breakpoint', async function resize() {
      await page.viewport(639, 768);
      const screen = await render(
        <StrictMode>
          <DefaultExample />
        </StrictMode>
      );
      await screen.getByRole('button', { name: 'Open' }).click();
      await expect.element(screen.getByRole('status')).toHaveTextContent('drawer');
      await page.viewport(640, 768);
      await expect.element(screen.getByRole('status')).toHaveTextContent('drawer');
      await screen.getByRole('button', { name: 'Close' }).click();
      await expect.element(screen.getByRole('status')).toHaveTextContent('drawer');
      await screen.getByRole('button', { name: 'Open' }).click();
      await expect.element(screen.getByRole('status')).toHaveTextContent('popover');
      await page.viewport(639, 768);
      await expect.element(screen.getByRole('status')).toHaveTextContent('popover');
      await screen.getByRole('button', { name: 'Close' }).click();
      await screen.getByRole('button', { name: 'Open' }).click();
      await expect.element(screen.getByRole('status')).toHaveTextContent('drawer');
    });

    it('applies an explicit popover preference on the next open', async function optOut() {
      await page.viewport(320, 768);
      const screen = await render(<DefaultExample defaultOpen />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('drawer');
      await screen.rerender(<DefaultExample defaultOpen overlay="popover" />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('drawer');
      await screen.getByRole('button', { name: 'Close' }).click();
      await screen.getByRole('button', { name: 'Open' }).click();
      await expect.element(screen.getByRole('status')).toHaveTextContent('popover');
    });

    it('preserves an initially open popover during narrow hydration', async function hydrate() {
      vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
      await page.viewport(320, 768);
      const container = document.createElement('div');
      container.innerHTML = renderToString(<DefaultExample defaultOpen />);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      let root: Root | undefined;
      try {
        await act(async function mount() {
          root = hydrateRoot(container, <DefaultExample defaultOpen />, { onRecoverableError });
        });
        await expect.element(page.getByRole('status')).toHaveTextContent('popover');
        await act(async function reopen() {
          await page.getByRole('button', { name: 'Close' }).click();
          await page.getByRole('button', { name: 'Open' }).click();
        });
        await expect.element(page.getByRole('status')).toHaveTextContent('drawer');
        expect(onRecoverableError).not.toHaveBeenCalled();
      } finally {
        await act(async function unmount() {
          root?.unmount();
        });
        container.remove();
      }
    });
  });
});
