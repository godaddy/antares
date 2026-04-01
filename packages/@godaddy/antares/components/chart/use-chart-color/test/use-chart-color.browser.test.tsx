import { FreedIndexReuseExample } from '../examples/freed-index-reuse.tsx';
import { MultiSeriesExample } from '../examples/multi-series.tsx';
import { SingleSeriesExample } from '../examples/single-series.tsx';
import { StrictMode } from 'react';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';

/** Matches a CSS variable value */
const CSS_VAR_PATTERN = /^var\(--[^)]+\)$/;

describe('@godaddy/uxcore', function uxcore() {
  describe('#useChartColor', function useChartColorTests() {
    describe('#single-series', function singleSeriesTests() {
      it('renders single-series example with a CSS variable', async function singleSeries() {
        const { container } = await render(<SingleSeriesExample />);
        const items = container.querySelectorAll('li');
        expect(items).toHaveLength(1);
        const text = items[0]?.textContent?.trim() ?? '';
        expect(text).toMatch(CSS_VAR_PATTERN);
      });
    });

    describe('#multi-series', function multiSeriesTests() {
      it('renders multi-series example with CSS variables', async function multiSeries() {
        const { container } = await render(<MultiSeriesExample />);
        const items = container.querySelectorAll('li');
        expect(items).toHaveLength(3);
        for (const li of Array.from(items)) {
          const text = li.textContent?.trim() ?? '';
          expect(text).toMatch(CSS_VAR_PATTERN);
        }
      });
    });

    describe('#freed-index-reuse', function freedIndexReuseTests() {
      it('recycles the freed index when middle consumer unmounts and a new one mounts', async function recyclesFreedIndex() {
        const { container } = await render(<FreedIndexReuseExample />);
        const bars = container.querySelectorAll('[data-testid="chart-bar"]');
        expect(bars).toHaveLength(3);
        const middleColorBefore = bars[1]?.getAttribute('data-color') ?? '';
        expect(middleColorBefore).toMatch(CSS_VAR_PATTERN);

        const replaceButton = container.querySelector('button');
        expect(replaceButton).toBeTruthy();
        await replaceButton!.click();

        const barsAfter = container.querySelectorAll('[data-testid="chart-bar"]');
        expect(barsAfter).toHaveLength(3);
        const middleColorAfter = barsAfter[1]?.getAttribute('data-color') ?? '';
        expect(middleColorAfter).toBe(middleColorBefore);
      });
    });

    describe('#strict-mode', function strictModeTests() {
      it('assigns the same color after double effect execution', async function sameColorAfterDoubleEffect() {
        const { container } = await render(
          <StrictMode>
            <SingleSeriesExample />
          </StrictMode>
        );
        const colorEl = container.querySelector('[data-color]');
        expect(colorEl?.getAttribute('data-color')).toBe('var(--viz1)');
      });
    });
  });
});
