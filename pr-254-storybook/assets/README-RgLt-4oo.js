import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-pb48vIri.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-bWsTpwpW.js";import{t as c}from"./mdx-react-shim-qUc2OckC.js";import{Basic as l,Props as u,n as d,t as f}from"./tooltip-dismiss-strip.stories-B_7yxaeJ.js";var p,m=e((()=>{p=`import { TooltipContext, TooltipProvider } from '@visx/xychart';
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
`}));function h(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:d,name:`Overview`}),`
`,(0,_.jsx)(t.h1,{id:`tooltipdismissstrip`,children:`TooltipDismissStrip`}),`
`,(0,_.jsx)(t.p,{children:`Internal visx XYChart helper that closes the tooltip when the pointer enters a leading-edge strip over scroll-synced axis chrome`}),`
`,(0,_.jsx)(t.h2,{id:`internal-component`,children:`Internal Component`}),`
`,(0,_.jsxs)(t.p,{children:[`This component is `,(0,_.jsx)(t.strong,{children:`internal-only`}),` and not exported from the package. It is designed for use within chart components.`]}),`
`,(0,_.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,_.jsxs)(t.p,{children:[`The `,(0,_.jsx)(t.code,{children:`TooltipDismissStrip`}),` component accepts the following props:`]}),`
`,(0,_.jsx)(a,{of:u}),`
`,(0,_.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,_.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,_.jsx)(t.p,{children:`Tooltip provider, relative container, optional controls to open the visx tooltip and the dismiss strip on the leading edge.`}),`
`,(0,_.jsx)(i,{of:l,inline:!0}),`
`,(0,_.jsx)(r,{language:`tsx`,code:p})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),f(),m()}))();export{g as default};