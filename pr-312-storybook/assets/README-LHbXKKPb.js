import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,s as o,u as s}from"./blocks-DHUUK51X.js";import{n as c,r as l,t as u}from"./use-normalized-series.stories-BD7PGr8r.js";function d(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{of:l,name:`Overview`}),`
`,(0,p.jsx)(t.h1,{id:`usenormalizedseries`,children:`useNormalizedSeries`}),`
`,(0,p.jsx)(t.p,{children:`A hook that guarantees every series config has a stable, unique id by filling in missing ones with a component-scoped prefix from useId.`}),`
`,(0,p.jsx)(t.h2,{id:`for-use-with-chart-components-not-exported`,children:`For use with chart components (not exported)`}),`
`,(0,p.jsxs)(t.p,{children:[`Returns your series list with an `,(0,p.jsx)(t.code,{children:`id`}),` guaranteed on every item. Ids you provided are kept as-is; missing ones are filled in for you, stay stable across renders, and won't collide when multiple charts share the page.`]}),`
`,(0,p.jsx)(t.pre,{children:(0,p.jsx)(t.code,{className:`language-tsx`,children:`const series = useNormalizedSeries(seriesProp);
`})}),`
`,(0,p.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,p.jsx)(t.h3,{id:`mixed-ids`,children:`Mixed ids`}),`
`,(0,p.jsxs)(t.p,{children:[`The first item provides an explicit `,(0,p.jsx)(t.code,{children:`id`}),` and is preserved as-is; the remaining two have no `,(0,p.jsx)(t.code,{children:`id`}),` and are filled with stable generated ones (`,(0,p.jsx)(t.code,{children:`<prefix>-1`}),`, `,(0,p.jsx)(t.code,{children:`<prefix>-2`}),`).`]}),`
`,(0,p.jsx)(a,{of:u,inline:!0}),`
`,(0,p.jsx)(i,{code:`import { Box, Text } from '@godaddy/antares';
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
}`,language:`tsx`})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;function m(){return(m=e((()=>{p=t(),n(),s(),c()})))()}m();export{f as default};