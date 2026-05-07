import{j as o}from"./iframe-Du6PjlSZ.js";import{useMDXComponents as n}from"./index-PW5r9cRf.js";import{M as r,A as s,a as p,S as l}from"./blocks-F0Y6jiat.js";import{S as a,P as m,B as c}from"./tooltip-dismiss-strip.stories-xC3BcOeD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-niWSmtgG.js";import"./index-BtT7aVaE.js";import"./index-c3mBs9B0.js";import"./index-WazE8AbX.js";import"./debounce-C_rRD5jc.js";import"./useTooltip-BLWYpRD6.js";import"./index-CxNDvpBG.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-CQAGP5rC.js";import"./index-5OOocN8b.js";import"./Text-DLOk33e2.js";import"./mergeProps-x388wjyq.js";import"./SSRProvider-Ne4r0eXS.js";import"./useObjectRef-Cr5IrlI4.js";const x=`import { TooltipContext, TooltipProvider } from '@visx/xychart';
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
