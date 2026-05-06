import { MixedIdsExample } from '../examples/mixed-ids.tsx';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

/** Pulls every `data-id="..."` value out of a rendered HTML string in document order. */
function extractDataIds(html: string): string[] {
  const re = /data-id="([^"]+)"/g;
  return [...html.matchAll(re)].map(function unwrap(match) {
    return match[1] ?? '';
  });
}

describe('@godaddy/antares', function antares() {
  describe('#useNormalizedSeries', function useNormalizedSeriesTests() {
    describe('#mixed-ids', function mixedIdsTests() {
      it('preserves an explicit id when rendered on the server', function preservesExplicitId() {
        const html = renderToString(<MixedIdsExample />);
        const ids = extractDataIds(html);
        expect(ids).toHaveLength(3);
        expect(ids[0]).toBe('revenue');
      });

      it('generates unique ids for items missing them when rendered on the server', function generatesUniqueIds() {
        const html = renderToString(<MixedIdsExample />);
        const ids = extractDataIds(html);
        expect(ids[1]).toBeTruthy();
        expect(ids[2]).toBeTruthy();
        expect(ids[1]).not.toBe('revenue');
        expect(ids[2]).not.toBe('revenue');
        expect(ids[1]).not.toBe(ids[2]);
      });
    });
  });
});
