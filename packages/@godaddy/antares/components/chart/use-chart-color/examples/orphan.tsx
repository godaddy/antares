import { useChartColor } from '../src/index.tsx';

/**
 * Example: useChartColor used outside ChartColorProvider. Renders nothing;
 * useChartColor throws when rendered.
 */
export function OrphanExample() {
  useChartColor();
  return null;
}
