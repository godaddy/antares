import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-bpPIrQxj.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C8eHxHmm.js";import{t as c}from"./mdx-react-shim-Cu2ESsbd.js";import{Arrow as l,MultipleSeries as u,Props as d,SingleSeries as f,n as p,t as m}from"./tooltip.stories-DGi3NdvE.js";var h,g=e((()=>{h=`import { Tooltip, type TooltipProps } from '../src/index.tsx';
import type { TooltipData } from '@visx/xychart';
import type { DataPoint } from '../../../types.ts';

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
`})),_,v=e((()=>{_=`import { Tooltip, type TooltipProps } from '../src/index.tsx';
import type { TooltipData } from '@visx/xychart';
import type { DataPoint } from '../../../types.ts';

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
`})),y,b=e((()=>{y=`import { Tooltip, type TooltipProps } from '../src/index.tsx';
import type { TooltipData } from '@visx/xychart';
import type { DataPoint } from '../../../types.ts';

export function ArrowExample(props: Partial<TooltipProps>) {
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

  return <Tooltip tooltipData={defaultTooltipData} series={defaultSeries} showArrow={true} {...props} />;
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:p,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`tooltip`,children:`Tooltip`}),`
`,(0,C.jsx)(t.p,{children:`An internal component used for displaying tooltip information in chart components.`}),`
`,(0,C.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Multiple series`}),`: Shows all series that have a datum at the hovered X position in a single tooltip.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Series matching`}),`: Rows are built from `,(0,C.jsx)(t.code,{children:`series`}),` by matching `,(0,C.jsx)(t.code,{children:`series[].id`}),` to keys in `,(0,C.jsx)(t.code,{children:`tooltipData.datumByKey`}),` (from visx at the hovered X).`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Value formatting`}),`: You can supply a function to format each value; if you don't, the tooltip shows the point's `,(0,C.jsx)(t.code,{children:`y`}),` (or nothing when null). Use the formatter for custom data shapes.`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,C.jsxs)(t.p,{children:[`This component is `,(0,C.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is intended for use inside chart components.`]}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsxs)(t.p,{children:[`The `,(0,C.jsx)(t.code,{children:`Tooltip`}),` component accepts the following props:`]}),`
`,(0,C.jsx)(a,{of:d}),`
`,(0,C.jsx)(t.h2,{id:`value-formatting`,children:`Value formatting`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`Default:`}),` When `,(0,C.jsx)(t.code,{children:`formatValue`}),` is not provided, the tooltip uses a formatter that reads the data point’s `,(0,C.jsx)(t.code,{children:`y`}),` property (same as the chart's default Y accessor), converts it to a string, and returns an empty string for null. This is correct for the default `,(0,C.jsx)(t.code,{children:`DataPoint`}),` shape (`,(0,C.jsx)(t.code,{children:`{ x, y }`}),`).`]}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`Custom:`}),` Pass `,(0,C.jsx)(t.code,{children:`formatValue`}),` to control display. The function receives the datum and returns a string. Use it to both extract and format (e.g. currency, percentage, custom units). For custom data point shapes (generic `,(0,C.jsx)(t.code,{children:`TooltipProps<YourDatum>`}),`), you must pass `,(0,C.jsx)(t.code,{children:`formatValue`}),` because the default only reads `,(0,C.jsx)(t.code,{children:`y`}),`.`]}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-tsx`,children:`<Tooltip
  tooltipData={tooltipData}
  series={series}
  formatValue={(d) => \`$\${d.y?.toLocaleString() ?? ''}\`}
/>
`})}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`single-series`,children:`Single Series`}),`
`,(0,C.jsx)(t.p,{children:`Basic tooltip with a single series and default formatting.`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(t.h3,{id:`multiple-series`,children:`Multiple Series`}),`
`,(0,C.jsx)(t.p,{children:`Tooltip with multiple series; all series at the same X position are shown together.`}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(t.h3,{id:`arrow`,children:`Arrow`}),`
`,(0,C.jsxs)(t.p,{children:[`Use the `,(0,C.jsx)(t.code,{children:`showArrow`}),` prop to set whether the tooltip arrow is visible or not.`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(i,{of:l,inline:!0})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),m(),g(),v(),b()}))();export{S as default};