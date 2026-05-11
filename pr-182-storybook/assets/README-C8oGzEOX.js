import{j as e}from"./iframe-D3IkG1Ed.js";import{useMDXComponents as r}from"./index-Ddicd04g.js";import{M as a,A as l,S as o,a as s}from"./blocks-FKYUA1FL.js";import{S as p,P as d,a as c,M as h,A as m}from"./tooltip.stories-BaKqJgsZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CSLt56KL.js";import"./index-BSPbgUvt.js";import"./index-DyaOTb0A.js";import"./index-BiJGYWgF.js";import"./index-ytT8Ai6N.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-2-tMoyXX.js";import"./index-CvWDc_MF.js";import"./Text-BC_MRJIf.js";import"./mergeProps-C5YhgRrt.js";import"./SSRProvider-CjQrmtNM.js";import"./useObjectRef-BwsbJwwA.js";import"./utils-DWdmbL63.js";const u=`import { Tooltip, type TooltipProps } from '../src/index.tsx';
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
`,x=`import { Tooltip, type TooltipProps } from '../src/index.tsx';
import type { TooltipData } from '@visx/xychart';
import type { DataPoint } from '../../types.ts';

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
`,f=`import { Tooltip, type TooltipProps } from '../src/index.tsx';
import type { TooltipData } from '@visx/xychart';
import type { DataPoint } from '../../types.ts';

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
`;function i(n){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:p,name:"Overview"}),`
`,e.jsx(t.h1,{id:"tooltip",children:"Tooltip"}),`
`,e.jsx(t.p,{children:"An internal component used for displaying tooltip information in chart components."}),`
`,e.jsx(t.h2,{id:"features",children:"Features"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Multiple series"}),": Shows all series that have a datum at the hovered X position in a single tooltip."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Series matching"}),": Rows are built from ",e.jsx(t.code,{children:"series"})," by matching ",e.jsx(t.code,{children:"series[].id"})," to keys in ",e.jsx(t.code,{children:"tooltipData.datumByKey"})," (from visx at the hovered X)."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Value formatting"}),": You can supply a function to format each value; if you don't, the tooltip shows the point's ",e.jsx(t.code,{children:"y"})," (or nothing when null). Use the formatter for custom data shapes."]}),`
`]}),`
`,e.jsx(t.h2,{id:"internal-component",children:"Internal Component"}),`
`,e.jsxs(t.p,{children:["This component is ",e.jsx(t.strong,{children:"internal-only"})," and not exported from the package. It is intended for use inside chart components."]}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Tooltip"})," component accepts the following props:"]}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(t.h2,{id:"value-formatting",children:"Value formatting"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Default:"})," When ",e.jsx(t.code,{children:"formatValue"})," is not provided, the tooltip uses a formatter that reads the data point’s ",e.jsx(t.code,{children:"y"})," property (same as the chart's default Y accessor), converts it to a string, and returns an empty string for null. This is correct for the default ",e.jsx(t.code,{children:"DataPoint"})," shape (",e.jsx(t.code,{children:"{ x, y }"}),")."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Custom:"})," Pass ",e.jsx(t.code,{children:"formatValue"})," to control display. The function receives the datum and returns a string. Use it to both extract and format (e.g. currency, percentage, custom units). For custom data point shapes (generic ",e.jsx(t.code,{children:"TooltipProps<YourDatum>"}),"), you must pass ",e.jsx(t.code,{children:"formatValue"})," because the default only reads ",e.jsx(t.code,{children:"y"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`<Tooltip
  tooltipData={tooltipData}
  series={series}
  formatValue={(d) => \`$\${d.y?.toLocaleString() ?? ''}\`}
/>
`})}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"single-series",children:"Single Series"}),`
`,e.jsx(t.p,{children:"Basic tooltip with a single series and default formatting."}),`
`,e.jsx(o,{language:"tsx",code:x}),`
`,e.jsx(s,{of:c,inline:!0}),`
`,e.jsx(t.h3,{id:"multiple-series",children:"Multiple Series"}),`
`,e.jsx(t.p,{children:"Tooltip with multiple series; all series at the same X position are shown together."}),`
`,e.jsx(o,{language:"tsx",code:u}),`
`,e.jsx(s,{of:h,inline:!0}),`
`,e.jsx(t.h3,{id:"arrow",children:"Arrow"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"showArrow"})," prop to set whether the tooltip arrow is visible or not."]}),`
`,e.jsx(o,{language:"tsx",code:f}),`
`,e.jsx(s,{of:m,inline:!0})]})}function K(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{K as default};
