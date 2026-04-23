/**
 * Browser (Playwright) tests for `useScrollableXYChart`.
 * Run: `npm run test:browser -- use-scrollable-xy-chart.browser` from `packages/@godaddy/antares`.
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { AutoLayoutExample } from '../examples/auto-layout.tsx';

describe('@godaddy/antares', function antares() {
  describe('#useScrollableXYChart', function useScrollableXYChartTests() {
    it('forces xLabelsVertical when xLabelsOrientation is vertical', async function verticalOrientation() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample xLabelsOrientation="vertical" />);
      const parent = container.querySelector('[data-testid="scroll-parent"]');
      expect(parent?.getAttribute('data-x-labels-vertical')).toBe('true');
    });

    it('forces horizontal X labels when xLabelsOrientation is horizontal', async function horizontalOrientation() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample xLabelsOrientation="horizontal" />);
      const parent = container.querySelector('[data-testid="scroll-parent"]');
      expect(parent?.getAttribute('data-x-labels-vertical')).toBe('false');
    });

    it('exposes non-zero chart dimensions after parent size is measured', async function chartDimensions() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement | null;
      expect(parent).toBeTruthy();

      await vi.waitFor(
        function waitForSize() {
          const w = Number(parent?.getAttribute('data-chart-width') ?? '0');
          expect(w).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      const h = Number(parent?.getAttribute('data-chart-height') ?? '0');
      expect(h).toBeGreaterThan(0);
    });

    it('updates scrollLeft when the scroll container is scrolled', async function scrollOffset() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement | null;
      expect(parent).toBeTruthy();

      await vi.waitFor(
        function waitForSize() {
          expect(Number(parent?.getAttribute('data-chart-width') ?? 0)).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      parent!.scrollLeft = 41;
      parent!.dispatchEvent(new Event('scroll', { bubbles: false }));

      await vi.waitFor(
        function waitForScroll() {
          expect(parent?.getAttribute('data-scroll-left')).toBe('41');
        },
        { timeout: 2000, interval: 20 }
      );
    });

    it('updates scrollTop when the scroll container is scrolled', async function scrollOffset() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement | null;
      expect(parent).toBeTruthy();

      await vi.waitFor(
        function waitForSize() {
          expect(Number(parent?.getAttribute('data-chart-height') ?? 0)).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      parent!.scrollTop = 41;
      parent!.dispatchEvent(new Event('scroll', { bubbles: false }));

      await vi.waitFor(
        function waitForScroll() {
          expect(parent?.getAttribute('data-scroll-top')).toBe('41');
        },
        { timeout: 2000, interval: 20 }
      );
    });
  });
});
