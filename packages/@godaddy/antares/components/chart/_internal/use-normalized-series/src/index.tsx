import { useId, useMemo } from 'react';

/**
 * Normalizes a series array by ensuring each item has a stable unique id.
 * When a series item has no id, one is generated using a component-scoped prefix
 * from `useId` so IDs remain unique across multiple chart instances on the same page.
 *
 * @param series - Array of series configs (id is optional)
 * @returns Memoized array of series configs with ids guaranteed to be set
 */
export function useNormalizedSeries<T extends object>(series: (T & { id?: string })[]): (T & { id: string })[] {
  const seriesIdPrefix = useId();
  return useMemo(
    function normalizeSeries(): (T & { id: string })[] {
      return series.map(function addId(item, index) {
        return { ...item, id: item.id ?? `${seriesIdPrefix}-${index}` };
      });
    },
    [series, seriesIdPrefix]
  );
}
