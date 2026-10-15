import{i as e}from"./preload-helper-BSXjzSsi.js";import{F as t}from"./iframe-CTyuNJwX.js";import{S as n,c as r,l as i,s as a,u as o}from"./blocks-D9NPDDJO.js";import{t as s}from"./mdx-react-shim-CLDDLcor.js";import{t as c}from"./runtime-rTOu_ZMc.js";import{Default as l,n as u,t as d}from"./use-overlay-container.stories-Dbe-0Vay.js";function f(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a,{of:u,name:`Overview`}),`
`,(0,m.jsx)(t.h1,{id:`useoverlaycontainer`,children:`useOverlayContainer`}),`
`,(0,m.jsx)(t.p,{children:`Internal container selection for responsive overlays.`}),`
`,(0,m.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,m.jsxs)(t.ul,{children:[`
`,(0,m.jsxs)(t.li,{children:[`Chooses a drawer below `,(0,m.jsx)(t.code,{children:`40rem`}),` and a popover at or above it.`]}),`
`,(0,m.jsxs)(t.li,{children:[`Accepts the effective `,(0,m.jsx)(t.code,{children:`isOpen`}),` state and an optional `,(0,m.jsx)(t.code,{children:`overlay="popover"`}),` override.`]}),`
`,(0,m.jsx)(t.li,{children:`Holds the choice until the next opening, including while the current overlay exits.`}),`
`,(0,m.jsx)(t.li,{children:`Uses a popover during server rendering and initial hydration. An initially open overlay keeps that
choice until it closes.`}),`
`]}),`
`,(0,m.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,m.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,m.jsx)(t.p,{children:`Resize while open: the container changes only on the next opening.`}),`
`,(0,m.jsx)(i,{of:l,inline:!0}),`
`,(0,m.jsx)(r,{code:`import { useState } from 'react';
import { Button, Text } from '@godaddy/antares';
import { useOverlayContainer, type UseOverlayContainerOptions } from '#components/_internal/use-overlay-container';

interface DefaultExampleProps extends Pick<UseOverlayContainerOptions, 'overlay'> {
  /** Whether the example begins open. */
  defaultOpen?: boolean;
}

export function DefaultExample({ defaultOpen = false, overlay }: DefaultExampleProps) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const container = useOverlayContainer({ isOpen, overlay });

  return (
    <>
      <Button onPress={() => setOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'}</Button>
      <Text role="status">{container}</Text>
    </>
  );
}`,language:`tsx`})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(f,{...e})}):f(e)}var m;e((()=>{m=t(),s(),o(),c(),d()}))();export{p as default};