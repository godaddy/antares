import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-DGW9Ha8k.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bsyba9RX.js";import{t as c}from"./mdx-react-shim-mSeRT3c4.js";import{t as l}from"./runtime-CCpseHws.js";import{ButtonGroupProps as u,ContentProps as d,Default as f,FooterProps as p,Group as m,GroupProps as h,HeaderProps as g,n as _,t as v}from"./structure.stories-DYxH0cpf.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:_,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`structure-primitives`,children:`Structure primitives`}),`
`,(0,x.jsx)(t.p,{children:`Generic structural containers for composing a component's interior.`}),`
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.strong,{children:`Shared structural containers.`}),` These generic, layout-only components are the building blocks for composing a component's interior (a `,(0,x.jsx)(t.code,{children:`Modal`}),`, a card, a panel). They are semantic containers built on `,(0,x.jsx)(t.code,{children:`Flex`}),`, so they accept the same layout props (`,(0,x.jsx)(t.code,{children:`direction`}),`, `,(0,x.jsx)(t.code,{children:`gap`}),`, `,(0,x.jsx)(t.code,{children:`alignItems`}),`, `,(0,x.jsx)(t.code,{children:`justifyContent`}),`, `,(0,x.jsx)(t.code,{children:`padding`}),`, ...).`]}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:(0,x.jsx)(t.code,{children:`Content`})}),` — the primary body region (a `,(0,x.jsx)(t.code,{children:`<section>`}),`, a column that grows to fill).`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:(0,x.jsx)(t.code,{children:`Header`})}),` — the top region: title area and optional trailing close (a `,(0,x.jsx)(t.code,{children:`<header>`}),` row that spaces its contents apart).`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:(0,x.jsx)(t.code,{children:`Footer`})}),` — the bottom region: secondary content and/or actions (a `,(0,x.jsx)(t.code,{children:`<footer>`}),` row that spaces its contents apart).`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:(0,x.jsx)(t.code,{children:`ButtonGroup`})}),` — a cluster of related actions, typically inside a `,(0,x.jsx)(t.code,{children:`Footer`}),` (an end-aligned, wrapping row with `,(0,x.jsx)(t.code,{children:`role="group"`}),`).`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:(0,x.jsx)(t.code,{children:`Group`})}),` — semantic grouping container for field item controls. Layout and chrome come from the parent field's `,(0,x.jsx)(t.code,{children:`GroupContext`}),`.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`hybrid-styling`,children:`Hybrid styling`}),`
`,(0,x.jsx)(t.p,{children:`Each container works in two modes:`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Standalone`}),` - with no parent context it renders with its own structural defaults and looks the same everywhere.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Adopted`}),` - inside a parent that provides its context (e.g. `,(0,x.jsx)(t.code,{children:`Modal`}),`), it picks up that parent's styling and spacing automatically. Consumer props still win over the adopted defaults.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsxs)(t.p,{children:[`The shared structural containers composed together into a card-like layout. Each is a
plain semantic region here; inside a parent that provides their contexts (e.g. `,(0,x.jsx)(t.code,{children:`Modal`}),`)
they adopt that parent's spacing automatically.`]}),`
`,(0,x.jsx)(i,{of:f,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex, Header, Content, Footer, ButtonGroup, Text, Button } from '@godaddy/antares';

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
`,(0,x.jsx)(t.h3,{id:`group`,children:`Group`}),`
`,(0,x.jsx)(t.p,{children:`Group is the bordered field box. Size and invalid/disabled chrome apply here.`}),`
`,(0,x.jsx)(i,{of:m,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Group, Input, Label, TextField } from '@godaddy/antares';

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
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.code,{children:`Content`}),`, `,(0,x.jsx)(t.code,{children:`Header`}),`, `,(0,x.jsx)(t.code,{children:`Footer`}),`, and `,(0,x.jsx)(t.code,{children:`ButtonGroup`}),` each accept all `,(0,x.jsx)(t.code,{children:`Flex`}),` layout props.`]}),`
`,(0,x.jsx)(t.h3,{id:`content`,children:`Content`}),`
`,(0,x.jsx)(a,{of:d}),`
`,(0,x.jsx)(t.h3,{id:`header`,children:`Header`}),`
`,(0,x.jsx)(a,{of:g}),`
`,(0,x.jsx)(t.h3,{id:`footer`,children:`Footer`}),`
`,(0,x.jsx)(a,{of:p}),`
`,(0,x.jsx)(t.h3,{id:`buttongroup`,children:`ButtonGroup`}),`
`,(0,x.jsx)(a,{of:u}),`
`,(0,x.jsx)(t.h3,{id:`group-1`,children:`Group`}),`
`,(0,x.jsx)(a,{of:h})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),c(),s(),l(),v()}))();export{b as default};