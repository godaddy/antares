import { Tooltip, type TooltipProps } from '../src/index.tsx';
import type { TooltipData } from '@visx/xychart';
import type { DataPoint } from '../../types.ts';

export function MultipleSeriesExample(props: Partial<TooltipProps>) {
  const defaultTooltipData: TooltipData<DataPoint> = {
    datumByKey: {
      'series-1': {
        key: 'series-1',
        datum: { x: 'Jan', y: 100 },
        index: 0
      },
      'series-2': {
        key: 'series-2',
        datum: { x: 'Jan', y: 150 },
        index: 0
      },
      'series-3': {
        key: 'series-3',
        datum: { x: 'Jan', y: 200 },
        index: 0
      }
    }
  };

  const defaultSeries = [
    {
      id: 'series-1',
      name: 'Product A',
      data: []
    },
    {
      id: 'series-2',
      name: 'Product B',
      data: []
    },
    {
      id: 'series-3',
      name: 'Product C',
      data: []
    }
  ];

  return <Tooltip tooltipData={defaultTooltipData} series={defaultSeries} {...props} />;
}
