import { useNormalizedSeries } from '../src/index.tsx';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';

function NormalizedSeriesIds({ series }: { series: { id?: string; name: string; data: never[] }[] }) {
  const normalized = useNormalizedSeries(series);
  return (
    <ul>
      {normalized.map(function renderItem(item) {
        return (
          <li key={item.id} data-id={item.id}>
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

describe('@godaddy/uxcore', function uxcore() {
  describe('#useNormalizedSeries', function useNormalizedSeriesTests() {
    describe('#generates-ids', function generatesIdsTests() {
      it('assigns generated ids when series items have no id', async function generatesIds() {
        const series = [
          { name: 'A', data: [] },
          { name: 'B', data: [] }
        ];
        const { container } = await render(<NormalizedSeriesIds series={series} />);
        const items = container.querySelectorAll('[data-id]');
        expect(items).toHaveLength(2);
        const id0 = items[0]?.getAttribute('data-id') ?? '';
        const id1 = items[1]?.getAttribute('data-id') ?? '';
        expect(id0).toBeTruthy();
        expect(id1).toBeTruthy();
        expect(id0).not.toBe(id1);
      });
    });

    describe('#preserves-ids', function preservesIdsTests() {
      it('keeps existing ids when provided', async function preservesIds() {
        const series = [
          { id: 'my-series', name: 'A', data: [] },
          { id: 'other-series', name: 'B', data: [] }
        ];
        const { container } = await render(<NormalizedSeriesIds series={series} />);
        const items = container.querySelectorAll('[data-id]');
        expect(items[0]?.getAttribute('data-id')).toBe('my-series');
        expect(items[1]?.getAttribute('data-id')).toBe('other-series');
      });
    });
  });
});
