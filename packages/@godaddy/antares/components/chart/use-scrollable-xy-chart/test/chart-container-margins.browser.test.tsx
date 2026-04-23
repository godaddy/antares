/**
 * Browser (Playwright) unit tests for `use-scrollable-xy-chart/src/chart-container-margins.ts`.
 * Run with: `npm run test:browser -- chart-container-margins` or `use-scrollable-xy-chart` from `packages/@godaddy/antares`
 * (requires Chromium for Vitest browser mode, e.g. `npx playwright install`).
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getAxisTickAt,
  getBottomMargin,
  getHalfFirstXAxisTickLabelWidth,
  getLeftMargin,
  getRightMargin,
  getTickLabelText,
  getTopMargin,
  isElementDisplayed
} from '../src/chart-container-margins.ts';

const SVG_NS = 'http://www.w3.org/2000/svg';

function createAxisWithTwoTicks(): {
  svg: SVGSVGElement;
  xAxis: SVGGElement;
  firstTick: SVGGElement;
  firstText: SVGTextElement;
  lastTick: SVGGElement;
  lastText: SVGTextElement;
  detach: () => void;
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

  return {
    svg,
    xAxis,
    firstTick,
    firstText,
    lastTick,
    lastText,
    detach() {
      svg.remove();
    }
  };
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
        const g = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        document.body.append(g);
        expect(getAxisTickAt(g, 'first')).toBe(null);
        g.remove();
      });

      it('returns first and last tick groups', function firstLast() {
        const { xAxis, firstTick, lastTick, detach } = createAxisWithTwoTicks();
        expect(getAxisTickAt(xAxis, 'first')).toBe(firstTick);
        expect(getAxisTickAt(xAxis, 'last')).toBe(lastTick);
        detach();
      });
    });

    describe('#getTickLabelText', function getTickLabelTextTests() {
      it('returns null when tick is null', function nullTick() {
        expect(getTickLabelText(null)).toBe(null);
      });

      it('returns SVGTextElement child when present', function textChild() {
        const { firstTick, firstText, detach } = createAxisWithTwoTicks();
        expect(getTickLabelText(firstTick)).toBe(firstText);
        detach();
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
      it('returns 0 when label is display none', function hiddenLabel() {
        const { xAxis, firstText, detach } = createAxisWithTwoTicks();
        firstText.style.display = 'none';
        expect(getHalfFirstXAxisTickLabelWidth(xAxis)).toBe(0);
        detach();
      });

      it('returns ceil(half width) when first label is visible', function visibleLabel() {
        const { xAxis, detach } = createAxisWithTwoTicks();
        const bboxSpy = vi.spyOn(SVGTextElement.prototype, 'getBBox').mockReturnValue({
          x: 0,
          y: 0,
          width: 47,
          height: 12
        } as DOMRect);
        expect(getHalfFirstXAxisTickLabelWidth(xAxis)).toBe(24);
        bboxSpy.mockRestore();
        detach();
      });
    });

    describe('#getLeftMargin', function getLeftMarginTests() {
      it('uses max of y-axis width and half first x tick label width', function maxOfBoth() {
        const { xAxis, detach } = createAxisWithTwoTicks();
        const yAxis = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        document.body.append(yAxis);
        const yBBoxSpy = vi.spyOn(SVGGraphicsElement.prototype, 'getBBox').mockImplementation(function yImpl(
          this: SVGGraphicsElement
        ) {
          if (this === yAxis) {
            return { x: 0, y: 0, width: 10, height: 40 } as DOMRect;
          }
          return { x: 0, y: 0, width: 30, height: 10 } as DOMRect;
        });
        expect(getLeftMargin(yAxis, xAxis)).toBe(15);
        yBBoxSpy.mockRestore();
        yAxis.remove();
        detach();
      });
    });

    describe('#getBottomMargin', function getBottomMarginTests() {
      it('returns 0 when axis is null', function nullAxis() {
        expect(getBottomMargin(null)).toBe(0);
      });

      it('returns axis group bbox height', function bboxHeight() {
        const g = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        const spy = vi.spyOn(SVGGraphicsElement.prototype, 'getBBox').mockReturnValue({
          x: 0,
          y: 0,
          width: 1,
          height: 33
        } as DOMRect);
        expect(getBottomMargin(g)).toBe(33);
        spy.mockRestore();
      });
    });

    describe('#getRightMargin', function getRightMarginTests() {
      it('returns 0 when last tick label is hidden', function hidden() {
        const { xAxis, lastText, detach } = createAxisWithTwoTicks();
        lastText.style.display = 'none';
        expect(getRightMargin(xAxis, 12)).toBe(0);
        detach();
      });

      it('returns half label width when last tick overflows svg right edge', function overflow() {
        const { svg, xAxis, lastTick, detach } = createAxisWithTwoTicks();
        vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
          top: 0,
          left: 0,
          bottom: 200,
          right: 100,
          width: 100,
          height: 200,
          x: 0,
          y: 0,
          toJSON() {
            return '';
          }
        });
        vi.spyOn(lastTick, 'getBoundingClientRect').mockReturnValue({
          top: 0,
          left: 0,
          bottom: 10,
          right: 120,
          width: 120,
          height: 10,
          x: 0,
          y: 0,
          toJSON() {
            return '';
          }
        });
        const bboxSpy = vi.spyOn(SVGTextElement.prototype, 'getBBox').mockReturnValue({
          x: 0,
          y: 0,
          width: 50,
          height: 10
        } as DOMRect);
        expect(getRightMargin(xAxis, 7)).toBe(25);
        bboxSpy.mockRestore();
        detach();
      });

      it('returns previous margin when there is no horizontal overflow', function noOverflow() {
        const { svg, xAxis, lastTick, detach } = createAxisWithTwoTicks();
        vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
          top: 0,
          left: 0,
          bottom: 200,
          right: 400,
          width: 400,
          height: 200,
          x: 0,
          y: 0,
          toJSON() {
            return '';
          }
        });
        vi.spyOn(lastTick, 'getBoundingClientRect').mockReturnValue({
          top: 0,
          left: 0,
          bottom: 10,
          right: 200,
          width: 200,
          height: 10,
          x: 0,
          y: 0,
          toJSON() {
            return '';
          }
        });
        vi.spyOn(SVGTextElement.prototype, 'getBBox').mockReturnValue({
          x: 0,
          y: 0,
          width: 99,
          height: 10
        } as DOMRect);
        expect(getRightMargin(xAxis, 42)).toBe(42);
        detach();
      });
    });

    describe('#getTopMargin', function getTopMarginTests() {
      it('returns 0 when last tick label is hidden', function hidden() {
        const { svg, xAxis, detach } = createAxisWithTwoTicks();
        const yAxis = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        const yTick = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        yTick.setAttribute('class', 'visx-axis-tick');
        const yText = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
        yText.style.display = 'none';
        yTick.appendChild(yText);
        yAxis.appendChild(yTick);
        svg.insertBefore(yAxis, xAxis);
        expect(getTopMargin(yAxis, 5)).toBe(0);
        detach();
      });

      it('returns half label height when last tick is above svg top', function overflowUp() {
        const { svg, xAxis, detach } = createAxisWithTwoTicks();
        const yAxis = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        const yTick = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        yTick.setAttribute('class', 'visx-axis-tick');
        const yText = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
        yTick.appendChild(yText);
        yAxis.appendChild(yTick);
        svg.insertBefore(yAxis, xAxis);

        vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
          top: 40,
          left: 0,
          bottom: 200,
          right: 400,
          width: 400,
          height: 160,
          x: 0,
          y: 40,
          toJSON() {
            return '';
          }
        });
        vi.spyOn(yTick, 'getBoundingClientRect').mockReturnValue({
          top: 20,
          left: 0,
          bottom: 30,
          right: 10,
          width: 10,
          height: 10,
          x: 0,
          y: 20,
          toJSON() {
            return '';
          }
        });
        const bboxSpy = vi.spyOn(SVGTextElement.prototype, 'getBBox').mockReturnValue({
          x: 0,
          y: 0,
          width: 10,
          height: 31
        } as DOMRect);
        expect(getTopMargin(yAxis, 9)).toBe(16);
        bboxSpy.mockRestore();
        detach();
      });

      it('returns previous margin when last tick is not above svg top', function noOverflow() {
        const { svg, xAxis, detach } = createAxisWithTwoTicks();
        const yAxis = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        const yTick = document.createElementNS(SVG_NS, 'g') as SVGGElement;
        yTick.setAttribute('class', 'visx-axis-tick');
        const yText = document.createElementNS(SVG_NS, 'text') as SVGTextElement;
        yTick.appendChild(yText);
        yAxis.appendChild(yTick);
        svg.insertBefore(yAxis, xAxis);

        vi.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
          top: 0,
          left: 0,
          bottom: 200,
          right: 400,
          width: 400,
          height: 200,
          x: 0,
          y: 0,
          toJSON() {
            return '';
          }
        });
        vi.spyOn(yTick, 'getBoundingClientRect').mockReturnValue({
          top: 50,
          left: 0,
          bottom: 60,
          right: 10,
          width: 10,
          height: 10,
          x: 0,
          y: 50,
          toJSON() {
            return '';
          }
        });
        vi.spyOn(SVGTextElement.prototype, 'getBBox').mockReturnValue({
          x: 0,
          y: 0,
          width: 10,
          height: 20
        } as DOMRect);
        expect(getTopMargin(yAxis, 3)).toBe(3);
        detach();
      });
    });
  });
});
