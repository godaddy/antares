import { useState } from 'react';
import { ChartColorProvider, useChartColor } from '../src/index.tsx';

function Bar() {
  const color = useChartColor();
  return <span data-color={color} data-testid="chart-bar" />;
}

/**
 * Example: three bars; a button replaces the middle one. The new bar
 * receives the recycled index (same color as the unmounted one).
 */
export function FreedIndexReuseExample() {
  const [middleKey, setMiddleKey] = useState<'b' | 'd'>('b');
  return (
    <ChartColorProvider>
      <Bar key="a" />
      <Bar key={middleKey} />
      <Bar key="c" />
      <button type="button" onClick={() => setMiddleKey('d')}>
        Replace middle
      </button>
    </ChartColorProvider>
  );
}
