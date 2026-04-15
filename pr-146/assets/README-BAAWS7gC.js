import{j as o}from"./iframe-6GaXOUaT.js";import{useMDXComponents as n}from"./index-Cf9r2Gk8.js";import{M as s,A as r,a as p,S as l}from"./blocks-6xSex4GH.js";import{S as a,P as c,B as m}from"./tooltip-dismiss-strip.stories-5O0FeEAj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bj9gKbGQ.js";import"./index-CMgpeNKa.js";import"./index-D8j4FsKY.js";import"./index-DrFu-skq.js";import"./index-DusvX5uO.js";import"./useTooltip-WWB8x-EY.js";import"./index-C_3Vx422.js";import"./clsx-CgyFOmLt.js";import"./index-D-r1tqzZ.js";import"./mergeProps-DIoepj2e.js";import"./useObjectRef-GZJVnHfU.js";const x=`import { TooltipContext, TooltipProvider } from '@visx/xychart';
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
`;function i(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...n(),...e.components};return o.jsxs(o.Fragment,{children:[o.jsx(s,{of:a,name:"Overview"}),`
`,o.jsx(t.h1,{id:"tooltipdismissstrip",children:"TooltipDismissStrip"}),`
`,o.jsx(t.p,{children:"Internal visx XYChart helper that closes the tooltip when the pointer enters a leading-edge strip over scroll-synced axis chrome"}),`
`,o.jsx(t.h2,{id:"internal-component",children:"Internal Component"}),`
`,o.jsxs(t.p,{children:["This component is ",o.jsx(t.strong,{children:"internal-only"})," and not exported from the package. It is designed for use within chart components."]}),`
`,o.jsx(t.h2,{id:"props",children:"Props"}),`
`,o.jsxs(t.p,{children:["The ",o.jsx(t.code,{children:"TooltipDismissStrip"})," component accepts the following props:"]}),`
`,o.jsx(r,{of:c}),`
`,o.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,o.jsx(t.h3,{id:"basic",children:"Basic"}),`
`,o.jsx(t.p,{children:"Tooltip provider, relative container, optional controls to open the visx tooltip and the dismiss strip on the leading edge."}),`
`,o.jsx(p,{of:m,inline:!0}),`
`,o.jsx(l,{language:"tsx",code:x})]})}function M(e={}){const{wrapper:t}={...n(),...e.components};return t?o.jsx(t,{...e,children:o.jsx(i,{...e})}):i(e)}export{M as default};
