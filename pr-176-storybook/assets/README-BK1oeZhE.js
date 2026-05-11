import{j as e}from"./iframe-B4Nw7FJe.js";import{u as n,M as t,S as o,a as d}from"./blocks-_qyMzwgH.js";import{S as a,M as m}from"./use-normalized-series.stories-DxKb7i8M.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BCz66L0m.js";import"./index-DhvjJc79.js";import"./index-DnzQElaE.js";import"./index-zKIw8Rv0.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Text-CUA99nQZ.js";import"./mergeProps-DddZCFgK.js";import"./SSRProvider-IKK3NN28.js";import"./useObjectRef-CjrTCwNB.js";import"./index-B6dGqv0q.js";import"./index-CTVFVsUY.js";const c=`import { Box, Text } from '@godaddy/antares';
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
`;function r(s){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...n(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:a,name:"Overview"}),`
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
`,e.jsx(d,{of:m,inline:!0})]})}function T(s={}){const{wrapper:i}={...n(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(r,{...s})}):r(s)}export{T as default};
