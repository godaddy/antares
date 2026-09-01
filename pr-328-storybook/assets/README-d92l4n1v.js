import{i as e}from"./preload-helper-DME-cQh5.js";import{F as t}from"./iframe-nnAUVtXG.js";import{S as n,c as r,l as i,s as a,u as o}from"./blocks-DQ7EliTm.js";import{t as s}from"./mdx-react-shim-DBrFA3vm.js";import{t as c}from"./runtime-DcPfiwh5.js";import{MixedIds as l,n as u,t as d}from"./use-normalized-series.stories-vWFvZkCz.js";function f(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a,{of:u,name:`Overview`}),`
`,(0,m.jsx)(t.h1,{id:`usenormalizedseries`,children:`useNormalizedSeries`}),`
`,(0,m.jsx)(t.p,{children:`A hook that guarantees every series config has a stable, unique id by filling in missing ones with a component-scoped prefix from useId.`}),`
`,(0,m.jsx)(t.h2,{id:`for-use-with-chart-components-not-exported`,children:`For use with chart components (not exported)`}),`
`,(0,m.jsxs)(t.p,{children:[`Returns your series list with an `,(0,m.jsx)(t.code,{children:`id`}),` guaranteed on every item. Ids you provided are kept as-is; missing ones are filled in for you, stay stable across renders, and won't collide when multiple charts share the page.`]}),`
`,(0,m.jsx)(t.pre,{children:(0,m.jsx)(t.code,{className:`language-tsx`,children:`const series = useNormalizedSeries(seriesProp);
`})}),`
`,(0,m.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,m.jsx)(t.h3,{id:`mixed-ids`,children:`Mixed ids`}),`
`,(0,m.jsxs)(t.p,{children:[`The first item provides an explicit `,(0,m.jsx)(t.code,{children:`id`}),` and is preserved as-is; the remaining two have no `,(0,m.jsx)(t.code,{children:`id`}),` and are filled with stable generated ones (`,(0,m.jsx)(t.code,{children:`<prefix>-1`}),`, `,(0,m.jsx)(t.code,{children:`<prefix>-2`}),`).`]}),`
`,(0,m.jsx)(i,{of:l,inline:!0}),`
`,(0,m.jsx)(r,{code:`import { Box, Text } from '@godaddy/antares';
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
}`,language:`tsx`})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(f,{...e})}):f(e)}var m;e((()=>{m=t(),s(),o(),c(),d()}))();export{p as default};