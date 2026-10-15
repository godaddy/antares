import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,l as r,n as i,s as a,u as o}from"./blocks-DrzUE4cn.js";import{i as s,r as c}from"./react-BXJ34t_g.js";import{i as l,n as u,r as d,t as f}from"./tooltip-dismiss-strip.stories-BJL5lfeJ.js";function p(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...s(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:l,name:`Overview`}),`
`,(0,h.jsx)(t.h1,{id:`tooltipdismissstrip`,children:`TooltipDismissStrip`}),`
`,(0,h.jsx)(t.p,{children:`Internal visx XYChart helper that closes the tooltip when the pointer enters a leading-edge strip over scroll-synced axis chrome`}),`
`,(0,h.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,h.jsxs)(t.p,{children:[`This component is `,(0,h.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,h.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,h.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,h.jsx)(t.p,{children:`Tooltip provider, relative container, optional controls to open the visx tooltip and the dismiss strip on the leading edge.`}),`
`,(0,h.jsx)(r,{of:f,inline:!0}),`
`,(0,h.jsx)(n,{code:`import { TooltipContext, TooltipProvider } from '@visx/xychart';
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
`,(0,h.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.code,{children:`TooltipDismissStrip`}),` component accepts the following props:`]}),`
`,(0,h.jsx)(i,{of:u})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),c(),o(),d()})))()}g();export{m as default};