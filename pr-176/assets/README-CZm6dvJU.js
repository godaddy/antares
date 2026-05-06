import{j as e}from"./iframe-DCWZK8FF.js";import{u as t,M as n,S as o,a as d}from"./blocks-CwTu0JBB.js";import{S as a,M as m}from"./use-normalized-series.stories-CDyDnpDB.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BTiZjbIC.js";import"./index-ns8GPaeO.js";import"./index-C1EBQYjH.js";import"./index-DrFu-skq.js";import"./index-CiMX6YLf.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Text-YXiMITH-.js";import"./mergeProps-Ns9PPALR.js";import"./SSRProvider-z4CqI7qr.js";import"./useObjectRef-cCAFS4Sr.js";import"./index-plX4Cbq-.js";import"./index-BUc3kUPq.js";const c=`import { Box, Text } from '@godaddy/antares';
import { useNormalizedSeries } from '../src/index.tsx';

interface SeriesItem {
  id?: string;
  name: string;
  data: number[];
}

const series: SeriesItem[] = [
  { id: 'revenue', name: 'Revenue', data: [10, 20, 30] },
  { name: 'Expenses', data: [5, 15, 25] },
  { name: 'Profit', data: [5, 5, 5] }
];

export function MixedIdsExample() {
  const normalized = useNormalizedSeries(series);

  return (
    <Box padding="md" style={{ border: '1px solid #ccc', borderRadius: 4 }}>
      <Text as="div" style={{ fontWeight: 'bolder', marginBottom: 8 }}>
        Resolved series ids
      </Text>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {normalized.map(function renderItem(item) {
          return (
            <li key={item.id} data-id={item.id}>
              <Text as="span">
                <code>{item.id}</code> &mdash; {item.name}
              </Text>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
`;function r(s){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:a,name:"Overview"}),`
`,e.jsx(i.h1,{id:"usenormalizedseries",children:"useNormalizedSeries"}),`
`,e.jsx(i.p,{children:"A hook that guarantees every series config has a stable, unique id by filling in missing ones with a component-scoped prefix from useId."}),`
`,e.jsx(i.h2,{id:"for-use-with-chart-components-not-exported",children:"For use with chart components (not exported)"}),`
`,e.jsxs(i.p,{children:["Returns your series list with an ",e.jsx(i.code,{children:"id"})," guaranteed on every item. Ids you provided are kept as-is; missing ones are filled in for you, stay stable across renders, and won't collide when multiple charts share the page."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`const series = useNormalizedSeries(seriesProp);
`})}),`
`,e.jsx(i.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(i.h3,{id:"mixed-ids",children:"Mixed ids"}),`
`,e.jsxs(i.p,{children:["The first item provides an explicit ",e.jsx(i.code,{children:"id"})," and is preserved as-is; the remaining two have no ",e.jsx(i.code,{children:"id"})," and are filled with stable generated ones (",e.jsx(i.code,{children:"<prefix>-1"}),", ",e.jsx(i.code,{children:"<prefix>-2"}),")."]}),`
`,e.jsx(o,{language:"tsx",code:c}),`
`,e.jsx(d,{of:m,inline:!0})]})}function N(s={}){const{wrapper:i}={...t(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(r,{...s})}):r(s)}export{N as default};
