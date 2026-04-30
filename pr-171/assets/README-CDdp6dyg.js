import{j as o}from"./iframe-CXq8dscT.js";import{useMDXComponents as n}from"./index-DeJayPHI.js";import{M as r,A as s,a as p,S as l}from"./blocks-CsMHUZB-.js";import{S as a,P as m,B as c}from"./tooltip-dismiss-strip.stories-CIK20R7o.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6mFRbdBS.js";import"./index-CSZn66pI.js";import"./index-DqyoxfBT.js";import"./index-DHlMLMRM.js";import"./debounce-C__iI4G3.js";import"./useTooltip-Iv0l3GnR.js";import"./index-BZYddRPU.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-0EmXUKHn.js";import"./index-Js53Gbz-.js";import"./Text-y2HQxSdE.js";import"./mergeProps-CioQwTky.js";import"./SSRProvider-MXfK5wd5.js";import"./useObjectRef-Dd0hiFt9.js";const x=`import { TooltipContext, TooltipProvider } from '@visx/xychart';
import { useContext } from 'react';
import { TooltipDismissStrip, type TooltipDismissStripProps } from '../src/index.tsx';
import { Box } from '#components/layout/box';
import { Flex } from '#components/layout/flex';
import { Text } from '#components/text';

function TooltipToolbar() {
  const tooltipContext = useContext(TooltipContext);
  const open = tooltipContext?.tooltipOpen === true;

  function handleOpen() {
    tooltipContext?.updateTooltip({
      tooltipOpen: true,
      tooltipLeft: 0,
      tooltipTop: 0,
      tooltipData: { datumByKey: {} }
    });
  }

  return (
    <Flex gap="sm" alignItems="center" wrap="wrap">
      <button type="button" onClick={handleOpen}>
        Open tooltip
      </button>
      <span data-open-state={open ? 'true' : 'false'} role="status">
        Visx tooltip context: {open ? 'open' : 'closed'}
      </span>
    </Flex>
  );
}

export function BasicExample(props: Partial<TooltipDismissStripProps>) {
  const { width = 200, height = 200, ...boxProps } = props;

  return (
    <TooltipProvider hideTooltipDebounceMs={0}>
      <Flex direction="column" gap="sm">
        <TooltipToolbar />
        <Box style={{ position: 'relative', width, height }}>
          <TooltipDismissStrip width={width} height={height} {...boxProps} elevation="card">
            <Text>Hover this region to update the visx tooltip (pointer enter closes it).</Text>
          </TooltipDismissStrip>
        </Box>
      </Flex>
    </TooltipProvider>
  );
}
`;function i(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...n(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(r,{of:a,name:"Overview"}),`
`,o.jsx(t.h1,{id:"tooltipdismissstrip",children:"TooltipDismissStrip"}),`
`,o.jsx(t.p,{children:"Internal visx XYChart helper that closes the tooltip when the pointer enters a leading-edge strip over scroll-synced axis chrome"}),`
`,o.jsx(t.h2,{id:"internal-component",children:"Internal Component"}),`
`,o.jsxs(t.p,{children:["This component is ",o.jsx(t.strong,{children:"internal-only"})," and not exported from the package. It is designed for use within chart components."]}),`
`,o.jsx(t.h2,{id:"props",children:"Props"}),`
`,o.jsxs(t.p,{children:["The ",o.jsx(t.code,{children:"TooltipDismissStrip"})," component accepts the following props:"]}),`
`,o.jsx(s,{of:m}),`
`,o.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,o.jsx(t.h3,{id:"basic",children:"Basic"}),`
`,o.jsx(t.p,{children:"Tooltip provider, relative container, optional controls to open the visx tooltip and the dismiss strip on the leading edge."}),`
`,o.jsx(p,{of:c,inline:!0}),`
`,o.jsx(l,{language:"tsx",code:x})]})}function X(e={}){const{wrapper:t}={...n(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{X as default};
