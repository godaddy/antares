import{i as e}from"./preload-helper-DME-cQh5.js";import{F as t}from"./iframe-C1UZSB7R.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-D37rkUmk.js";import{t as c}from"./mdx-react-shim-DZKqMcgQ.js";import{t as l}from"./runtime-DcPfiwh5.js";import{Default as u,Props as d,n as f,t as p}from"./tooltip-dismiss-strip.stories-DyLER5kE.js";function m(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:f,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`tooltipdismissstrip`,children:`TooltipDismissStrip`}),`
`,(0,g.jsx)(t.p,{children:`Internal visx XYChart helper that closes the tooltip when the pointer enters a leading-edge strip over scroll-synced axis chrome`}),`
`,(0,g.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,g.jsxs)(t.p,{children:[`This component is `,(0,g.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,g.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,g.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,g.jsx)(t.p,{children:`Tooltip provider, relative container, optional controls to open the visx tooltip and the dismiss strip on the leading edge.`}),`
`,(0,g.jsx)(i,{of:u,inline:!0}),`
`,(0,g.jsx)(r,{code:`import { TooltipContext, TooltipProvider } from '@visx/xychart';
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

export function DefaultExample(props: Partial<TooltipDismissStripProps>) {
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
}`,language:`tsx`}),`
`,(0,g.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,g.jsxs)(t.p,{children:[`The `,(0,g.jsx)(t.code,{children:`TooltipDismissStrip`}),` component accepts the following props:`]}),`
`,(0,g.jsx)(a,{of:d})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),l(),p()}))();export{h as default};