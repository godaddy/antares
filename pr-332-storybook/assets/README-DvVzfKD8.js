import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _}from"./structure.stories-tWUPjHCi.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s,{of:f,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`structure-primitives`,children:`Structure primitives`}),`
`,(0,b.jsx)(t.p,{children:`Generic structural containers for composing a component's interior.`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.strong,{children:`Shared structural containers.`}),` These generic, layout-only components are the building blocks for composing a component's interior (a `,(0,b.jsx)(t.code,{children:`Modal`}),`, a card, a panel). They are semantic containers built on `,(0,b.jsx)(t.code,{children:`Flex`}),`, so they accept the same layout props (`,(0,b.jsx)(t.code,{children:`direction`}),`, `,(0,b.jsx)(t.code,{children:`gap`}),`, `,(0,b.jsx)(t.code,{children:`alignItems`}),`, `,(0,b.jsx)(t.code,{children:`justifyContent`}),`, `,(0,b.jsx)(t.code,{children:`padding`}),`, ...).`]}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:(0,b.jsx)(t.code,{children:`Content`})}),` — the primary body region (a `,(0,b.jsx)(t.code,{children:`<section>`}),`, a column that grows to fill).`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:(0,b.jsx)(t.code,{children:`Header`})}),` — the top region: title area and optional trailing close (a `,(0,b.jsx)(t.code,{children:`<header>`}),` row that spaces its contents apart).`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:(0,b.jsx)(t.code,{children:`Footer`})}),` — the bottom region: secondary content and/or actions (a `,(0,b.jsx)(t.code,{children:`<footer>`}),` row that spaces its contents apart).`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:(0,b.jsx)(t.code,{children:`ButtonGroup`})}),` — a cluster of related actions, typically inside a `,(0,b.jsx)(t.code,{children:`Footer`}),` (an end-aligned, wrapping row with `,(0,b.jsx)(t.code,{children:`role="group"`}),`).`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:(0,b.jsx)(t.code,{children:`Group`})}),` — semantic grouping container for field item controls. A parent field injects the box chrome.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`hybrid-styling`,children:`Hybrid styling`}),`
`,(0,b.jsx)(t.p,{children:`Each container works in two modes:`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Standalone`}),` - with no parent context it renders with its own structural defaults and looks the same everywhere.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.strong,{children:`Adopted`}),` - inside a parent that provides its context (e.g. `,(0,b.jsx)(t.code,{children:`Modal`}),`), it picks up that parent's styling and spacing automatically. Consumer props still win over the adopted defaults.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsxs)(t.p,{children:[`The shared structural containers composed together into a card-like layout. Each is a
plain semantic region here; inside a parent that provides their contexts (e.g. `,(0,b.jsx)(t.code,{children:`Modal`}),`)
they adopt that parent's spacing automatically.`]}),`
`,(0,b.jsx)(a,{of:h,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Flex, Header, Content, Footer, ButtonGroup, Text, Button } from '@godaddy/antares';

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
`,(0,b.jsx)(t.h3,{id:`group`,children:`Group`}),`
`,(0,b.jsx)(t.p,{children:`Group is the bordered field box. Size and invalid/disabled chrome apply here.`}),`
`,(0,b.jsx)(a,{of:l,inline:!0}),`
`,(0,b.jsx)(i,{code:`import { Group, Input, Label, TextField } from '@godaddy/antares';

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
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`Content`}),`, `,(0,b.jsx)(t.code,{children:`Header`}),`, `,(0,b.jsx)(t.code,{children:`Footer`}),`, and `,(0,b.jsx)(t.code,{children:`ButtonGroup`}),` each accept all `,(0,b.jsx)(t.code,{children:`Flex`}),` layout props.`]}),`
`,(0,b.jsx)(t.h3,{id:`content`,children:`Content`}),`
`,(0,b.jsx)(o,{of:p}),`
`,(0,b.jsx)(t.h3,{id:`header`,children:`Header`}),`
`,(0,b.jsx)(o,{of:g}),`
`,(0,b.jsx)(t.h3,{id:`footer`,children:`Footer`}),`
`,(0,b.jsx)(o,{of:d}),`
`,(0,b.jsx)(t.h3,{id:`buttongroup`,children:`ButtonGroup`}),`
`,(0,b.jsx)(o,{of:_}),`
`,(0,b.jsx)(t.h3,{id:`group-1`,children:`Group`}),`
`,(0,b.jsx)(o,{of:m})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=t(),n(),c(),u()})))()}x();export{y as default};