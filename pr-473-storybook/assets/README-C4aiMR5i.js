import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,s as o,u as s}from"./blocks-Bke2qnEB.js";import{n as c,r as l,t as u}from"./chart-region.stories-CrKyfJhN.js";function d(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{of:c,name:`Overview`}),`
`,(0,p.jsx)(t.h1,{id:`chartregion`,children:`ChartRegion`}),`
`,(0,p.jsx)(t.p,{children:`ChartRegion renders a composed chart region, such as a center or range, in the place its chart gives it.`}),`
`,(0,p.jsx)(t.h2,{id:`for-use-with-chart-components-not-exported`,children:`For use with chart components (not exported)`}),`
`,(0,p.jsxs)(t.p,{children:[`Each public region defines its name, its public context, and its text slots once, then renders `,(0,p.jsx)(t.code,{children:`ChartRegion`}),`. The chart provides placement for each region through `,(0,p.jsx)(t.code,{children:`ChartRegionsContext`}),`.`]}),`
`,(0,p.jsx)(t.pre,{children:(0,p.jsx)(t.code,{className:`language-tsx`,children:`const centerRegion: ChartRegionDefinition = { name: 'center', context: CenterContext, slots: { value: styles.value } };

export function Center(props: CenterProps) {
  return <ChartRegion {...props} region={centerRegion} />;
}
`})}),`
`,(0,p.jsx)(t.p,{children:`Consumer props and context overrides apply over the region's defaults. The chart's placement class and slot props always apply, so overrides cannot break the chart layout.`}),`
`,(0,p.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,p.jsx)(t.h3,{id:`placement`,children:`Placement`}),`
`,(0,p.jsxs)(t.p,{children:[`A chart provides placement through `,(0,p.jsx)(t.code,{children:`ChartRegionsContext`}),`. The region keeps that placement when a consumer adds their
own class name, and a slot receives the chart's extra props.`]}),`
`,(0,p.jsx)(a,{of:u,inline:!0}),`
`,(0,p.jsx)(i,{code:`import { Text } from '@godaddy/antares';
import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import {
  ChartRegion,
  ChartRegionsContext,
  type ChartRegionDefinition,
  type ChartRegionPlacements,
  type ChartRegionProps
} from '../src/index.tsx';

const ExampleRegionContext = createContext<ContextValue<ChartRegionProps, HTMLDivElement>>(null);

const exampleRegion: ChartRegionDefinition = {
  name: 'summary',
  context: ExampleRegionContext,
  slots: { title: 'example-title', note: 'example-note' }
};

const placements: ChartRegionPlacements = {
  summary: { className: 'example-placement', slots: { note: { id: 'example-note-id' } } }
};

export function PlacementExample() {
  return (
    <ChartRegionsContext.Provider value={placements}>
      <ExampleRegionContext.Provider value={{ className: 'consumer-override' }}>
        <ChartRegion region={exampleRegion} data-testid="region">
          <Text slot="title">Revenue</Text>
          <Text slot="note">Last 30 days</Text>
        </ChartRegion>
      </ExampleRegionContext.Provider>
    </ChartRegionsContext.Provider>
  );
}`,language:`tsx`})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;function m(){return(m=e((()=>{p=t(),n(),s(),l()})))()}m();export{f as default};