/**
 * Browser (Playwright) tests for `useScrollableXYChart`.
 * Run: `npm run test:browser -- use-scrollable-xy-chart.browser` from `packages/@godaddy/antares`.
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { AutoLayoutExample } from '../examples/auto-layout.tsx';

const SVG_NS = 'http://www.w3.org/2000/svg';

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
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement;

      expect(parent.getAttribute('data-chart-width')).toBe('0');

      await vi.waitFor(
        function waitForSize() {
          const w = Number(parent.getAttribute('data-chart-width') ?? '0');
          expect(w).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );
      const h = Number(parent.getAttribute('data-chart-height') ?? '0');

      expect(h).toBeGreaterThan(0);
    });

    it('updates scrollLeft when the scroll container is scrolled', async function scrollOffset() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement;

      await vi.waitFor(
        function waitForSize() {
          expect(Number(parent.getAttribute('data-chart-width') ?? 0)).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      parent.scrollLeft = 41;
      parent!.dispatchEvent(new Event('scroll', { bubbles: false }));

      await vi.waitFor(
        function waitForScroll() {
          expect(parent.getAttribute('data-scroll-left')).toBe('41');
        },
        { timeout: 2000, interval: 20 }
      );
    });

    it('updates scrollTop when the scroll container is scrolled', async function scrollOffset() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement;

      await vi.waitFor(
        function waitForSize() {
          expect(Number(parent.getAttribute('data-chart-height') ?? 0)).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      parent.scrollTop = 41;
      parent.dispatchEvent(new Event('scroll', { bubbles: false }));

      await vi.waitFor(
        function waitForScroll() {
          expect(parent.getAttribute('data-scroll-top')).toBe('41');
        },
        { timeout: 2000, interval: 20 }
      );
    });

    it('updates minHeight when the Y-axis subtree mutates', async function yAxisSubtreeMutation() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement;
      const yAxis = container.querySelector('svg > g:first-of-type') as SVGGElement;

      await vi.waitFor(
        function waitForSize() {
          expect(Number(parent.getAttribute('data-chart-width') ?? 0)).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      const beforeMinHeight = Number(parent.getAttribute('data-min-height') ?? '0');

      const extraGroup = document.createElementNS(SVG_NS, 'g');
      extraGroup.setAttribute('class', 'visx-group');
      const extraText = document.createElementNS(SVG_NS, 'text');
      extraText.textContent = 'Extra tick';
      extraGroup.appendChild(extraText);
      yAxis.appendChild(extraGroup);

      await vi.waitFor(
        function waitForMinHeight() {
          expect(Number(parent.getAttribute('data-min-height') ?? '0')).toBeGreaterThan(beforeMinHeight);
        },
        { timeout: 2000, interval: 20 }
      );
    });

    it('re-dispatches pointermove on the last pointer target when the scroll container scrolls', async function scrollRedispatchesPointerMove() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement;
      const svg = parent.querySelector('svg') as SVGGraphicsElement;

      await vi.waitFor(
        function waitForSize() {
          expect(Number(parent.getAttribute('data-chart-width') ?? 0)).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      const coords: Array<{ clientX: number; clientY: number }> = [];
      let pointerMovesOnSvg = 0;
      svg.addEventListener('pointermove', function countPointerMove(e: PointerEvent) {
        pointerMovesOnSvg++;
        coords.push({ clientX: e.clientX, clientY: e.clientY });
      });

      svg.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX: 100,
          clientY: 200
        })
      );

      expect(pointerMovesOnSvg).toBe(1);

      parent.scrollLeft = 30;
      parent.dispatchEvent(new Event('scroll', { bubbles: false }));

      expect(pointerMovesOnSvg).toBe(2);
      expect(coords[1].clientX).toBe(100);
      expect(coords[1].clientY).toBe(200);
    });

    it('clears stored pointer target on pointerleave so scroll does not re-dispatch pointermove', async function pointerLeaveClearsTarget() {
      await page.viewport(800, 600);
      const { container } = await render(<AutoLayoutExample />);
      const parent = container.querySelector('[data-testid="scroll-parent"]') as HTMLElement;
      const svg = parent?.querySelector('svg') as SVGGraphicsElement;

      await vi.waitFor(
        function waitForSize() {
          expect(Number(parent?.getAttribute('data-chart-width') ?? 0)).toBeGreaterThan(0);
        },
        { timeout: 3000, interval: 50 }
      );

      let pointerMovesOnSvg = 0;
      svg.addEventListener('pointermove', function countPointerMove() {
        pointerMovesOnSvg++;
      });
      svg.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX: 12,
          clientY: 34
        })
      );

      expect(pointerMovesOnSvg).toBe(1);

      parent.dispatchEvent(new PointerEvent('pointerleave', { bubbles: false }));
      parent.scrollLeft = 55;
      parent.dispatchEvent(new Event('scroll', { bubbles: false }));

      expect(pointerMovesOnSvg).toBe(1);
    });
  });
});
