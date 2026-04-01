import { MultiSeriesExample } from '../examples/multi-series.tsx';
import { OrphanExample } from '../examples/orphan.tsx';
import { SingleSeriesExample } from '../examples/single-series.tsx';
import { SiblingConsumersExample } from '../examples/sibling-consumers.tsx';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

/** Matches a CSS variable value */
const CSS_VAR_PATTERN = /^var\(--[^)]+\)$/;
function extractDataColorValues(html: string): string[] {
  const re = /data-color="(var\(--[^"]+\))"/g;
  return [...html.matchAll(re)].map((m) => m[1] ?? '');
}

describe('@godaddy/uxcore', function uxcore() {
  describe('#useChartColor', function useChartColorTests() {
    describe('#single-series', function singleSeriesTests() {
      it('renders single-series example with one CSS variable', function singleSeries() {
        const html = renderToString(<SingleSeriesExample />);
        const values = extractDataColorValues(html);
        expect(values).toHaveLength(1);
        values.forEach((v) => expect(v).toMatch(CSS_VAR_PATTERN));
      });
    });

    describe('#multi-series', function multiSeriesTests() {
      it('renders multi-series example with one variable per item', function multiSeries() {
        const html = renderToString(<MultiSeriesExample />);
        const values = extractDataColorValues(html);
        expect(values).toHaveLength(3);
        values.forEach((v) => expect(v).toMatch(CSS_VAR_PATTERN));
      });
    });

    describe('#orphan', function orphanTests() {
      it('throws when used outside ChartColorProvider', function outsideProvider() {
        expect(() => renderToString(<OrphanExample />)).toThrow('useChartColor must be used within ChartColorProvider');
      });
    });

    describe('#sibling-consumers', function siblingConsumersTests() {
      it('returns chart color variables for sibling consumers', function sequentialColors() {
        const html = renderToString(<SiblingConsumersExample />);
        const values = extractDataColorValues(html);
        expect(values).toHaveLength(3);
        values.forEach((v) => expect(v).toMatch(CSS_VAR_PATTERN));
      });
    });
  });
});
