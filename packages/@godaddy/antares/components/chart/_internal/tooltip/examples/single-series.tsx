import { Tooltip, type TooltipProps } from '../src/index.tsx';
import type { TooltipData } from '@visx/xychart';
import type { DataPoint } from '../../../types.ts';

/**
 * Basic tooltip with a single series and default formatting.
 * @order 1
 */
export function SingleSeriesExample(props: Partial<TooltipProps>) {
  const defaultTooltipData: TooltipData<DataPoint> = {
    datumByKey: {
      'series-1': {
        key: 'series-1',
        datum: { x: 'Jan', y: 100 },
        index: 0
      }
    }
  };

  const defaultSeries = [
    {
      id: 'series-1',
      name: 'Sales',
      data: []
    }
  ];

  return <Tooltip tooltipData={defaultTooltipData} series={defaultSeries} {...props} />;
}
