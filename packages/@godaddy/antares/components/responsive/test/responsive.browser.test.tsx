import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, StrictMode } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { viewportQueries } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { ViewportLayoutExample } from '../examples/viewport-layout.tsx';
import { ContainerLayoutExample } from '../examples/container-layout.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#Responsive', function responsiveTests() {
    let originalWidth: number;
    let originalHeight: number;

    beforeEach(function rememberViewport() {
      originalWidth = window.innerWidth;
      originalHeight = window.innerHeight;
    });

    afterEach(async function reset() {
      await cleanup();
      vi.restoreAllMocks();
      vi.unstubAllGlobals();
      await page.viewport(originalWidth, originalHeight);
    });

    it.each([
      ['sm', 640],
      ['md', 768],
      ['lg', 1024],
      ['xl', 1280]
    ] as const)('matches %s inclusively and updates in both directions', async function breakpoint(name, width) {
      await page.viewport(width - 1, 768);
      const screen = await render(<DefaultExample query={viewportQueries[name]} ssrMatch />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Does not match');

      await page.viewport(width, 768);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Matches');

      await page.viewport(width - 1, 768);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Does not match');
    });

    it('supports custom queries', async function customQuery() {
      await page.viewport(400, 768);
      const screen = await render(<DefaultExample query="(max-width: 500px)" />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Matches');

      await page.viewport(600, 768);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Does not match');
    });

    it('switches queries and removes subscriptions on query changes and unmount', async function subscriptions() {
      await page.viewport(1100, 768);
      const matchMedia = window.matchMedia.bind(window);
      const large = matchMedia(viewportQueries.lg);
      const extraLarge = matchMedia(viewportQueries.xl);
      const removeLarge = vi.spyOn(large, 'removeEventListener');
      const removeExtraLarge = vi.spyOn(extraLarge, 'removeEventListener');
      vi.spyOn(window, 'matchMedia').mockImplementation(function matchQuery(query) {
        if (query === viewportQueries.lg) return large;
        if (query === viewportQueries.xl) return extraLarge;
        return matchMedia(query);
      });

      const screen = await render(<DefaultExample />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Matches');

      await screen.rerender(<DefaultExample query={viewportQueries.xl} />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Does not match');
      expect(removeLarge).toHaveBeenCalledWith('change', expect.any(Function));

      await page.viewport(1280, 768);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Matches');
      await screen.unmount();
      expect(removeExtraLarge).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('continues observing queries in StrictMode', async function strictMode() {
      await page.viewport(800, 768);
      const screen = await render(
        <StrictMode>
          <DefaultExample />
        </StrictMode>
      );
      await expect.element(screen.getByRole('status')).toHaveTextContent('Does not match');
      await page.viewport(1200, 768);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Matches');
    });

    it('uses the explicit fallback when matchMedia is unavailable', async function unavailable() {
      vi.stubGlobal('matchMedia', undefined);
      const screen = await render(<DefaultExample ssrMatch />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Matches');
      await screen.rerender(<DefaultExample ssrMatch={false} />);
      await expect.element(screen.getByRole('status')).toHaveTextContent('Does not match');
    });

    it.each([
      false,
      true
    ])('hydrates the %s fallback before adopting the browser match', async function hydrate(ssrMatch) {
      vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
      await page.viewport(ssrMatch ? 800 : 1200, 768);
      const container = document.createElement('div');
      container.innerHTML = renderToString(<DefaultExample ssrMatch={ssrMatch} />);
      document.body.append(container);
      expect(container.textContent).toBe(ssrMatch ? 'Matches' : 'Does not match');

      const onRecoverableError = vi.fn();
      let root: Root | undefined;
      try {
        await act(async function hydrateExample() {
          root = hydrateRoot(container, <DefaultExample ssrMatch={ssrMatch} />, { onRecoverableError });
        });
        expect(container.textContent).toBe(ssrMatch ? 'Does not match' : 'Matches');
        expect(onRecoverableError).not.toHaveBeenCalled();
      } finally {
        await act(async function unmountExample() {
          root?.unmount();
        });
        container.remove();
      }
    });

    it('keeps native viewport CSS aligned with the exported lg query', async function viewportStyles() {
      await page.viewport(1023, 768);
      const screen = await render(<ViewportLayoutExample />);
      const grid = screen.getByRole('region', { name: 'Viewport layout' }).element();
      expect(getComputedStyle(grid).gridTemplateColumns.split(' ')).toHaveLength(1);
      expect(matchMedia(viewportQueries.lg).matches).toBe(false);

      await page.viewport(1024, 768);
      expect(getComputedStyle(grid).gridTemplateColumns.split(' ')).toHaveLength(2);
      expect(matchMedia(viewportQueries.lg).matches).toBe(true);
    });

    it('responds to a container independently of the viewport', async function containerStyles() {
      await page.viewport(1200, 768);
      const screen = await render(<ContainerLayoutExample width={320} />);
      const grid = screen.getByRole('region', { name: 'Container layout' }).element();
      expect(getComputedStyle(grid).gridTemplateColumns.split(' ')).toHaveLength(1);

      await screen.rerender(<ContainerLayoutExample width={640} />);
      expect(getComputedStyle(grid).gridTemplateColumns.split(' ')).toHaveLength(2);
    });
  });
});
