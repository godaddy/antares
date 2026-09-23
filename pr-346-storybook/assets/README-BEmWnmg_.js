import{i as e}from"./preload-helper-BUun7Ttb.js";import{F as t}from"./iframe-qk3g-ITd.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-D4vbdfoL.js";import{t as c}from"./mdx-react-shim-C0QneIxA.js";import{t as l}from"./runtime-cfuOSczO.js";import{ButtonGroupProps as u,ContentProps as d,CornerActions as f,CornerActionsProps as p,Default as m,FooterProps as h,Group as g,GroupProps as _,HeaderProps as v,n as y,t as b}from"./structure.stories-J_JsKLC3.js";function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:y,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`structure-primitives`,children:`Structure primitives`}),`
`,(0,C.jsx)(t.p,{children:`Generic structural containers for composing a component's interior.`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.strong,{children:`Shared structural containers.`}),` These generic, layout-only components are the building blocks for composing a component's interior (a `,(0,C.jsx)(t.code,{children:`Modal`}),`, a card, a panel). They are semantic containers built on `,(0,C.jsx)(t.code,{children:`Flex`}),`, so they accept the same layout props (`,(0,C.jsx)(t.code,{children:`direction`}),`, `,(0,C.jsx)(t.code,{children:`gap`}),`, `,(0,C.jsx)(t.code,{children:`alignItems`}),`, `,(0,C.jsx)(t.code,{children:`justifyContent`}),`, `,(0,C.jsx)(t.code,{children:`padding`}),`, ...).`]}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:(0,C.jsx)(t.code,{children:`Content`})}),` — the primary body region (a `,(0,C.jsx)(t.code,{children:`<section>`}),`, a column that grows to fill).`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:(0,C.jsx)(t.code,{children:`Header`})}),` — the top region: title area and optional trailing close (a `,(0,C.jsx)(t.code,{children:`<header>`}),` row that spaces its contents apart).`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:(0,C.jsx)(t.code,{children:`Footer`})}),` — the bottom region: secondary content and/or actions (a `,(0,C.jsx)(t.code,{children:`<footer>`}),` row that spaces its contents apart).`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:(0,C.jsx)(t.code,{children:`ButtonGroup`})}),` - a cluster of related actions (a wrapping row with `,(0,C.jsx)(t.code,{children:`role="group"`}),`). Overlay parents like `,(0,C.jsx)(t.code,{children:`Modal`}),` adopt it with end alignment and padding.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:(0,C.jsx)(t.code,{children:`Group`})}),` — semantic grouping container for field item controls. A parent field injects the box chrome.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:(0,C.jsx)(t.code,{children:`CornerActions`})}),` - an always-visible structural row for actions placed at a surface corner.`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`hybrid-styling`,children:`Hybrid styling`}),`
`,(0,C.jsx)(t.p,{children:`Each container works in two modes:`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Standalone`}),` - with no parent context it renders with its own structural defaults and looks the same everywhere.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Adopted`}),` - inside a parent that provides its context (e.g. `,(0,C.jsx)(t.code,{children:`Modal`}),`), it picks up that parent's styling and spacing automatically. Consumer props still win over the adopted defaults.`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,C.jsxs)(t.p,{children:[`The shared structural containers composed together into a card-like layout. Each is a
plain semantic region here; inside a parent that provides their contexts (e.g. `,(0,C.jsx)(t.code,{children:`Modal`}),`)
they adopt that parent's spacing automatically.`]}),`
`,(0,C.jsx)(i,{of:m,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Flex, Header, Content, Footer, ButtonGroup, Text, Button } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Flex
      direction="column"
      gap="md"
      padding="md"
      style={{ border: '1px solid var(--ux-gray-300, #ccc)', borderRadius: 8 }}
    >
      <Header>
        <Text>Delete file?</Text>
        <Button variant="secondary">Close</Button>
      </Header>
      <Content>
        <Text>This action cannot be undone.</Text>
      </Content>
      <Footer>
        <ButtonGroup flexGrow={1}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="critical">Delete</Button>
        </ButtonGroup>
      </Footer>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`group`,children:`Group`}),`
`,(0,C.jsx)(t.p,{children:`Group is the bordered field box. Size and invalid/disabled chrome apply here.`}),`
`,(0,C.jsx)(i,{of:g,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Group, Input, Label, TextField } from '@godaddy/antares';

export function GroupExample() {
  return (
    <TextField>
      <Label>Name</Label>
      <Group>
        <Input placeholder="Enter your name" />
      </Group>
    </TextField>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`corner-actions`,children:`Corner Actions`}),`
`,(0,C.jsx)(t.p,{children:`CornerActions is an always-visible structural region. Compose any actions inside it and use
layout props to reserve room beside the surrounding content.`}),`
`,(0,C.jsx)(i,{of:f,inline:!0}),`
`,(0,C.jsx)(r,{code:`import { Button, CornerActions, Flex, Text } from '@godaddy/antares';

export function CornerActionsExample() {
  return (
    <Flex direction="row" alignItems="center" justifyContent="space-between" gap="md">
      <Text>Card content</Text>
      <CornerActions>
        <Button variant="secondary">More actions</Button>
        <Button variant="secondary">Share</Button>
      </CornerActions>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(t.h3,{id:`content`,children:`Content`}),`
`,(0,C.jsx)(a,{of:d}),`
`,(0,C.jsx)(t.h3,{id:`header`,children:`Header`}),`
`,(0,C.jsx)(a,{of:v}),`
`,(0,C.jsx)(t.h3,{id:`footer`,children:`Footer`}),`
`,(0,C.jsx)(a,{of:h}),`
`,(0,C.jsx)(t.h3,{id:`buttongroup`,children:`ButtonGroup`}),`
`,(0,C.jsx)(a,{of:u}),`
`,(0,C.jsx)(t.h3,{id:`group-1`,children:`Group`}),`
`,(0,C.jsx)(a,{of:_}),`
`,(0,C.jsx)(t.h3,{id:`corneractions`,children:`CornerActions`}),`
`,(0,C.jsx)(a,{of:p})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),l(),b()}))();export{S as default};