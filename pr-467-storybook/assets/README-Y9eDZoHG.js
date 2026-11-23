import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-BhQAtWZS.js";import{i as l,n as u,r as d,t as f}from"./chart-legend.stories-D1I78ewe.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:d,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`chartlegend`,children:`ChartLegend`}),`
`,(0,h.jsx)(t.p,{children:`ChartLegend lists a chart's series names and colors, read from the chart it is placed in.`}),`
`,(0,h.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsxs)(t.p,{children:[`Place `,(0,h.jsx)(t.code,{children:`ChartLegend`}),` inside a chart. It reads the chart's series, so the names and colors always match.`]}),`
`,(0,h.jsx)(a,{of:f,inline:!0}),`
`,(0,h.jsx)(i,{code:`import { ChartLegend, DonutChart } from '@godaddy/antares';

const data = [
  { id: '1', name: 'Online', value: 60 },
  { id: '2', name: 'In store', value: 40 }
];

export function DefaultExample() {
  return (
    <DonutChart data={data} aria-label="Sales by channel">
      <ChartLegend label="Channel" />
    </DonutChart>
  );
}`,language:`tsx`}),`
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsx)(t.p,{children:`Place it as a direct child of a chart. Outside a chart it renders nothing.`}),`
`,(0,h.jsx)(o,{of:u})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),l()})))()}g();export{m as default};