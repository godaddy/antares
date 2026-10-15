import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,l as r,s as i,u as a}from"./blocks-DrzUE4cn.js";import{i as o,r as s}from"./react-BXJ34t_g.js";import{n as c,r as l,t as u}from"./use-overlay-container.stories-J8COOxH1.js";function d(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...o(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{of:l,name:`Overview`}),`
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
`,(0,p.jsx)(r,{of:u,inline:!0}),`
`,(0,p.jsx)(n,{code:`import { useState } from 'react';
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
}`,language:`tsx`})]})}function f(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;function m(){return(m=e((()=>{p=t(),s(),a(),c()})))()}m();export{f as default};