import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,s as o,u as s}from"./blocks-D6BBvH5c.js";import{n as c,r as l,t as u}from"./use-overlay-container.stories-mQuahsV7.js";function d(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...r(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{of:l,name:`Overview`}),`
`,(0,p.jsx)(t.h1,{id:`useoverlaycontainer`,children:`useOverlayContainer`}),`
`,(0,p.jsx)(t.p,{children:`Internal container selection for responsive overlays.`}),`
`,(0,p.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,p.jsxs)(t.ul,{children:[`
`,(0,p.jsxs)(t.li,{children:[`Chooses a drawer below `,(0,p.jsx)(t.code,{children:`40rem`}),` and a popover at or above it.`]}),`
`,(0,p.jsxs)(t.li,{children:[`Accepts the effective `,(0,p.jsx)(t.code,{children:`isOpen`}),` state and an optional `,(0,p.jsx)(t.code,{children:`overlay="popover"`}),` override.`]}),`
`,(0,p.jsx)(t.li,{children:`Holds the choice until the next opening, including while the current overlay exits.`}),`
`,(0,p.jsx)(t.li,{children:`Uses a popover during server rendering and initial hydration. An initially open overlay keeps that
choice until it closes.`}),`
`]}),`
`,(0,p.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,p.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,p.jsx)(t.p,{children:`Resize while open: the container changes only on the next opening.`}),`
`,(0,p.jsx)(a,{of:u,inline:!0}),`
`,(0,p.jsx)(i,{code:`import { useState } from 'react';
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
}`,language:`tsx`})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;function m(){return(m=e((()=>{p=t(),n(),s(),c()})))()}m();export{f as default};