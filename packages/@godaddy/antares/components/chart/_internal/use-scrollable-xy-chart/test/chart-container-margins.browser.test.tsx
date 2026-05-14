/**
 * Browser (Playwright) unit tests for `use-scrollable-xy-chart/src/chart-container-margins.ts`.
 * Run with: `npm run test:browser -- chart-container-margins` or `use-scrollable-xy-chart` from `packages/@godaddy/antares`
 * (requires Chromium for Vitest browser mode, e.g. `npx playwright install`).
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getAxisTickAt,
  getBlockEndMargin,
  getBlockStartMargin,
  getHalfFirstXAxisTickLabelWidth,
  getHalfFirstYAxisTickLabelHeight,
  getInlineEndMargin,
  getInlineStartMargin,
  getTickLabelText,
  isElementDisplayed
} from '../src/chart-container-margins.ts';

const SVG_NS = 'http://www.w3.org/2000/svg';

// Tests stub element measurements rather than relying on real layout: real layout depends on font
// rendering, DPR, and Chromium version, which would make assertions like `expect(...).toBe(25)` flaky.
// Stubbing keeps the math exact while leaving the DOM traversal in `chart-container-margins.ts` honest.

function mockRect(element: Element, rect: Partial<DOMRect>): void {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => '',
    ...rect
  } as DOMRect);
}

function mockBBox(element: SVGGraphicsElement, bbox: Partial<DOMRect>): void {
  vi.spyOn(element, 'getBBox').mockReturnValue({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ...bbox
  } as DOMRect);
}

function createAxisWithTwoTicks(): {
  svg: SVGSVGElement;
  xAxis: SVGGElement;
  firstTick: SVGGElement;
  firstText: SVGTextElement;
  lastTick: SVGGElement;
  lastText: SVGTextElement;
} {
  const svg = document.createElementNS(SVG_NS, 'svg') as SVGSVGElement;
  svg.setAttribute('width', '400');
  svg.setAttribute('height', '200');
  const xAxis = document.createElementNS(SVG_NS, 'g') as SVGGElement;

  const firstTick = document.createElementNS(SVG_NS, 'g') as SVGGElement;
  firstTick.setAttribute('class', 'visx-axis-tick');
  const firstText = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
  firstTick.appendChild(firstText);

  const lastTick = document.createElementNS(SVG_NS, 'g') as SVGGElement;
  lastTick.setAttribute('class', 'visx-axis-tick');
  const lastText = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
  lastTick.appendChild(lastText);

  xAxis.append(firstTick, lastTick);
  svg.appendChild(xAxis);
  document.body.append(svg);

  return { svg, xAxis, firstTick, firstText, lastTick, lastText };
}

function appendYAxisWithTick(
  svg: SVGSVGElement,
  before?: Node
): {
  yAxis: SVGGElement;
  yTick: SVGGElement;
  yText: SVGTextElement;
} {
  const yAxis = document.createElementNS(SVG_NS, 'g') as SVGGElement;
  const yTick = document.createElementNS(SVG_NS, 'g') as SVGGElement;
  yTick.setAttribute('class', 'visx-axis-tick');
  const yText = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
  yTick.appendChild(yText);
  yAxis.appendChild(yTick);
  if (before) {
    svg.insertBefore(yAxis, before);
  } else {
    svg.appendChild(yAxis);
  }
  return { yAxis, yTick, yText };
}

describe('@godaddy/antares', function antares() {
  describe('#chart-container-margins', function chartContainerMargins() {
    afterEach(function cleanupDom() {
      vi.restoreAllMocks();
      document.body.querySelectorAll('svg').forEach(function removeSvg(svg) {
        svg.remove();
      });
    });

    describe('#getAxisTickAt', function getAxisTickAtTests() {
      it('returns null when axis element is null', function nullAxis() {
        expect(getAxisTickAt(null, 'first')).toBe(null);
        expect(getAxisTickAt(null, 'last')).toBe(null);
      });

      it('returns null when there are no tick nodes', function noTicks() {
        const { xAxis } = createAxisWithTwoTicks();
        // Strip the ticks added by the fixture to simulate an axis that has not rendered any.
        xAxis.replaceChildren();

        expect(getAxisTickAt(xAxis, 'first')).toBe(null);
      });

      it('returns first and last tick groups', function firstLast() {
        const { xAxis, firstTick, lastTick } = createAxisWithTwoTicks();

        expect(getAxisTickAt(xAxis, 'first')).toBe(firstTick);
        expect(getAxisTickAt(xAxis, 'last')).toBe(lastTick);
      });
    });

    describe('#getTickLabelText', function getTickLabelTextTests() {
      it('returns null when tick is null', function nullTick() {
        expect(getTickLabelText(null)).toBe(null);
      });

      it('returns SVGTextElement child when present', function textChild() {
        const { firstTick, firstText } = createAxisWithTwoTicks();

        expect(getTickLabelText(firstTick)).toBe(firstText);
      });

      it('returns null when tick has no text child', function noTextChild() {
        const { firstTick, firstText } = createAxisWithTwoTicks();
        firstText.remove();

        expect(getTickLabelText(firstTick)).toBe(null);
      });
    });

    describe('#isElementDisplayed', function isElementDisplayedTests() {
      it('returns false for null', function nullEl() {
        expect(isElementDisplayed(null)).toBe(false);
      });

      it('returns false when display is none', function displayNone() {
        const el = document.createElement('div');
        el.style.display = 'none';
        document.body.append(el);

        expect(isElementDisplayed(el)).toBe(false);
        el.remove();
      });

      it('returns true when display is not none', function displayBlock() {
        const el = document.createElement('div');
        el.style.display = 'block';
        document.body.append(el);

        expect(isElementDisplayed(el)).toBe(true);
        el.remove();
      });
    });

    describe('#getHalfFirstXAxisTickLabelWidth', function halfFirstTests() {
      it('returns 0 when axis is null', function nullAxis() {
        expect(getHalfFirstXAxisTickLabelWidth(null)).toBe(0);
      });

      it('returns 0 when label is display none', function hiddenLabel() {
        const { xAxis, firstText } = createAxisWithTwoTicks();
        firstText.style.display = 'none';

        expect(getHalfFirstXAxisTickLabelWidth(xAxis)).toBe(0);
      });

      it('returns ceil(half width) when first label is visible', function visibleLabel() {
        const { xAxis, firstText } = createAxisWithTwoTicks();
        mockRect(firstText, { width: 47, height: 12 });

        expect(getHalfFirstXAxisTickLabelWidth(xAxis)).toBe(24);
      });

      it('uses the post-transform rect width so vertical labels report their rotated footprint', function rotated() {
        const { xAxis, firstText } = createAxisWithTwoTicks();
        firstText.setAttribute('transform', 'rotate(-90)');
        // Real browser-reported rect for a 50x10 text rotated -90° would be 10x50.
        mockRect(firstText, { width: 10, height: 50 });

        expect(getHalfFirstXAxisTickLabelWidth(xAxis)).toBe(5);
      });
    });

    describe('#getInlineStartMargin', function getInlineStartMarginTests() {
      it('returns 0 when y-axis is null and x-axis defaults to null', function bothMissing() {
        expect(getInlineStartMargin(null)).toBe(0);
      });

      it('returns y-axis width when no x-axis is provided', function yAxisOnly() {
        const { yAxis } = appendYAxisWithTick(document.createElementNS(SVG_NS, 'svg') as SVGSVGElement);
        mockBBox(yAxis, { width: 22, height: 40 });

        expect(getInlineStartMargin(yAxis)).toBe(22);
      });

      it('uses half first x tick label width when greater than y-axis width', function xLabelWins() {
        const { svg, xAxis, firstText } = createAxisWithTwoTicks();
        const { yAxis } = appendYAxisWithTick(svg, xAxis);
        mockBBox(yAxis, { width: 5, height: 40 });
        mockRect(firstText, { width: 30, height: 10 });

        expect(getInlineStartMargin(yAxis, xAxis)).toBe(15);
      });

      it('uses y-axis width when greater than half first x tick label width', function yAxisWins() {
        const { svg, xAxis, firstText } = createAxisWithTwoTicks();
        const { yAxis } = appendYAxisWithTick(svg, xAxis);
        mockBBox(yAxis, { width: 40, height: 40 });
        mockRect(firstText, { width: 10, height: 10 });

        expect(getInlineStartMargin(yAxis, xAxis)).toBe(40);
      });
    });

    describe('#getHalfFirstYAxisTickLabelHeight', function halfFirstYTests() {
      it('returns 0 when axis is null', function nullAxis() {
        expect(getHalfFirstYAxisTickLabelHeight(null)).toBe(0);
      });

      it('returns 0 when label is display none', function hiddenLabel() {
        const { xAxis, firstText } = createAxisWithTwoTicks();
        firstText.style.display = 'none';

        expect(getHalfFirstYAxisTickLabelHeight(xAxis)).toBe(0);
      });

      it('returns ceil(half height) when first label is visible', function visibleLabel() {
        const { xAxis, firstText } = createAxisWithTwoTicks();
        mockRect(firstText, { width: 12, height: 13 });

        expect(getHalfFirstYAxisTickLabelHeight(xAxis)).toBe(7);
      });
    });

    describe('#getBlockEndMargin', function getBlockEndMarginTests() {
      it('returns 0 when both axes are null', function nullAxes() {
        expect(getBlockEndMargin(null)).toBe(0);
      });

      it('returns x-axis bbox height when greater than half first y-tick label height', function xAxisWins() {
        const { xAxis } = createAxisWithTwoTicks();
        mockBBox(xAxis, { height: 33 });

        expect(getBlockEndMargin(xAxis)).toBe(33);
      });

      it('uses half first y-tick label height when greater than x-axis height', function yAxisWins() {
        const { svg, xAxis } = createAxisWithTwoTicks();
        const { yAxis, yText } = appendYAxisWithTick(svg, xAxis);
        mockBBox(xAxis, { height: 0 });
        mockRect(yText, { height: 31 });

        expect(getBlockEndMargin(xAxis, yAxis)).toBe(16);
      });
    });

    describe('#getInlineEndMargin', function getInlineEndMarginTests() {
      it('returns 0 when last tick label is hidden', function hidden() {
        const { xAxis, lastText } = createAxisWithTwoTicks();
        lastText.style.display = 'none';

        expect(getInlineEndMargin(xAxis)).toBe(0);
      });

      it('returns half label width when last tick overflows svg right edge', function overflow() {
        const { svg, xAxis, lastText } = createAxisWithTwoTicks();
        mockRect(svg, { right: 100, width: 100 });
        mockRect(lastText, { left: 70, right: 120, width: 50 });

        expect(getInlineEndMargin(xAxis)).toBe(25);
      });

      it('uses the post-transform rect width when the last tick has a rotate transform', function rotated() {
        const { svg, xAxis, lastText } = createAxisWithTwoTicks();
        lastText.setAttribute('transform', 'rotate(-90)');
        // Real browser-reported rect for a 50x10 text rotated -90° would be 10x50.
        mockRect(svg, { right: 100, width: 100 });
        mockRect(lastText, { left: 100, right: 110, width: 10, height: 50 });

        expect(getInlineEndMargin(xAxis)).toBe(5);
      });

      it('returns 0 when there is no horizontal overflow', function noOverflow() {
        const { svg, xAxis, lastText } = createAxisWithTwoTicks();
        mockRect(svg, { right: 400, width: 400 });
        mockRect(lastText, { right: 200, width: 200 });

        expect(getInlineEndMargin(xAxis)).toBe(0);
      });

      it('keeps the previous margin when the label fits only because of it', function sticky() {
        const { svg, xAxis, lastText } = createAxisWithTwoTicks();
        // SVG right edge at 400. Last label sits with its right edge exactly at 400 thanks
        // to the existing 25px inline-end margin. Removing the margin would shift it to 425.
        mockRect(svg, { right: 400, width: 400 });
        mockRect(lastText, { left: 350, right: 400, width: 50 });

        expect(getInlineEndMargin(xAxis, 25)).toBe(25);
      });

      it('returns 0 when the label fits with comfortable slack regardless of prev', function slack() {
        const { svg, xAxis, lastText } = createAxisWithTwoTicks();
        // Label right edge at 200, far inside the SVG (right=400). Even removing the prev
        // margin (25) would leave it at 225, still well inside.
        mockRect(svg, { right: 400, width: 400 });
        mockRect(lastText, { left: 150, right: 200, width: 50 });

        expect(getInlineEndMargin(xAxis, 25)).toBe(0);
      });

      // In RTL the X-scale's range is reversed (`[innerWidth, 0]`), so the last DOM tick
      // (largest domain value) is rendered at the visual left of the chart and can overflow
      // the SVG's left edge instead of its right.
      describe('RTL', function rtlTests() {
        it('returns half label width when last tick overflows svg left edge', function overflowLeft() {
          const { svg, xAxis, lastText } = createAxisWithTwoTicks();
          // SVG left at 0; last label sits at left=-30 (overflow) with width=50.
          mockRect(svg, { left: 0, right: 400, width: 400 });
          mockRect(lastText, { left: -30, right: 20, width: 50 });

          expect(getInlineEndMargin(xAxis, 0, true)).toBe(25);
        });

        it('returns 0 when there is no horizontal overflow on the left', function noOverflowLeft() {
          const { svg, xAxis, lastText } = createAxisWithTwoTicks();
          mockRect(svg, { left: 0, right: 400, width: 400 });
          mockRect(lastText, { left: 100, right: 150, width: 50 });

          expect(getInlineEndMargin(xAxis, 0, true)).toBe(0);
        });

        it('keeps the previous margin when the label fits only because of it', function stickyLeft() {
          const { svg, xAxis, lastText } = createAxisWithTwoTicks();
          // SVG left edge at 0. Last label sits with its left edge exactly at 0 thanks to the
          // existing 25px margin. Removing the margin would shift it to -25 (overflow).
          mockRect(svg, { left: 0, right: 400, width: 400 });
          mockRect(lastText, { left: 0, right: 50, width: 50 });

          expect(getInlineEndMargin(xAxis, 25, true)).toBe(25);
        });

        it('returns 0 when the label fits with comfortable slack regardless of prev', function slackLeft() {
          const { svg, xAxis, lastText } = createAxisWithTwoTicks();
          // Label left edge at 200, far inside the SVG (left=0). Even removing the prev
          // margin (25) would leave it at 175, still well inside.
          mockRect(svg, { left: 0, right: 400, width: 400 });
          mockRect(lastText, { left: 200, right: 250, width: 50 });

          expect(getInlineEndMargin(xAxis, 25, true)).toBe(0);
        });
      });
    });

    describe('#getBlockStartMargin', function getBlockStartMarginTests() {
      it('returns 0 when last tick label is hidden', function hidden() {
        const { svg, xAxis } = createAxisWithTwoTicks();
        const { yAxis, yText } = appendYAxisWithTick(svg, xAxis);
        yText.style.display = 'none';

        expect(getBlockStartMargin(yAxis)).toBe(0);
      });

      it('returns half label height when last tick is above svg top', function overflowUp() {
        const { svg, xAxis } = createAxisWithTwoTicks();
        const { yAxis, yText } = appendYAxisWithTick(svg, xAxis);
        mockRect(svg, { top: 40, right: 400, bottom: 200, width: 400, height: 160 });
        mockRect(yText, { top: 20, right: 10, bottom: 51, width: 10, height: 31 });

        expect(getBlockStartMargin(yAxis)).toBe(16);
      });

      it('returns 0 when last tick is not above svg top', function noOverflow() {
        const { svg, xAxis } = createAxisWithTwoTicks();
        const { yAxis, yText } = appendYAxisWithTick(svg, xAxis);
        mockRect(svg, { right: 400, bottom: 200, width: 400, height: 200 });
        mockRect(yText, { top: 50, right: 10, bottom: 60, width: 10, height: 10 });

        expect(getBlockStartMargin(yAxis)).toBe(0);
      });

      it('keeps the previous margin when the label fits only because of it', function sticky() {
        const { svg, xAxis } = createAxisWithTwoTicks();
        const { yAxis, yText } = appendYAxisWithTick(svg, xAxis);
        // SVG top at 0. Topmost label is at top=8 thanks to the existing 16px margin.
        // Removing the margin would shift it to top=-8 (overflow).
        mockRect(svg, { right: 400, bottom: 200, width: 400, height: 200 });
        mockRect(yText, { top: 8, right: 10, bottom: 18, width: 10, height: 10 });

        expect(getBlockStartMargin(yAxis, 16)).toBe(16);
      });

      it('returns 0 when the label fits with comfortable slack regardless of prev', function slack() {
        const { svg, xAxis } = createAxisWithTwoTicks();
        const { yAxis, yText } = appendYAxisWithTick(svg, xAxis);
        // Topmost label far inside the SVG (top=80). Even removing the 16px prev margin
        // would leave it at 64, still well inside.
        mockRect(svg, { right: 400, bottom: 200, width: 400, height: 200 });
        mockRect(yText, { top: 80, right: 10, bottom: 90, width: 10, height: 10 });

        expect(getBlockStartMargin(yAxis, 16)).toBe(0);
      });
    });
  });
});
