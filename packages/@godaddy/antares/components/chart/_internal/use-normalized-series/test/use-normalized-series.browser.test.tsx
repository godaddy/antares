import { MixedIdsExample } from '../examples/mixed-ids.tsx';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';

describe('@godaddy/antares', function antares() {
  describe('#useNormalizedSeries', function useNormalizedSeriesTests() {
    describe('#mixed-ids', function mixedIdsTests() {
      it('preserves an explicit id', async function preservesExplicitId() {
        const { container } = await render(<MixedIdsExample />);
        const items = container.querySelectorAll('[data-id]');
        expect(items).toHaveLength(3);
        expect(items[0]?.getAttribute('data-id')).toBe('revenue');
      });

      it('generates unique ids for items missing them', async function generatesUniqueIds() {
        const { container } = await render(<MixedIdsExample />);
        const items = container.querySelectorAll('[data-id]');
        const generated1 = items[1]?.getAttribute('data-id') ?? '';
        const generated2 = items[2]?.getAttribute('data-id') ?? '';
        expect(generated1).toBeTruthy();
        expect(generated2).toBeTruthy();
        expect(generated1).not.toBe('revenue');
        expect(generated2).not.toBe('revenue');
        expect(generated1).not.toBe(generated2);
      });
    });
  });
});
