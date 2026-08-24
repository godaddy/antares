import{i as e}from"./preload-helper-BPzpAaEy.js";import{F as t}from"./iframe-CZQEDw37.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-BcxgJA08.js";import{t as c}from"./mdx-react-shim-DXGa81iN.js";import{ButtonGroupProps as l,ContentProps as u,Default as d,FooterProps as f,HeaderProps as p,n as m,t as h}from"./structure.stories-CatW5njT.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{of:m,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`structure-primitives`,children:`Structure primitives`}),`
`,(0,v.jsx)(t.p,{children:`Generic structural containers (Content, Header, Footer, ButtonGroup) for composing a component's interior.`}),`
`,(0,v.jsxs)(t.p,{children:[(0,v.jsx)(t.strong,{children:`Shared structural containers.`}),` These generic, layout-only components are the building blocks for composing a component's interior (a `,(0,v.jsx)(t.code,{children:`Modal`}),`, a card, a panel). They are semantic containers built on `,(0,v.jsx)(t.code,{children:`Flex`}),`, so they accept the same layout props (`,(0,v.jsx)(t.code,{children:`direction`}),`, `,(0,v.jsx)(t.code,{children:`gap`}),`, `,(0,v.jsx)(t.code,{children:`alignItems`}),`, `,(0,v.jsx)(t.code,{children:`justifyContent`}),`, `,(0,v.jsx)(t.code,{children:`padding`}),`, ...).`]}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:(0,v.jsx)(t.code,{children:`Content`})}),` — the primary body region (a `,(0,v.jsx)(t.code,{children:`<section>`}),`, a column that grows to fill).`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:(0,v.jsx)(t.code,{children:`Header`})}),` — the top region: title area and optional trailing close (a `,(0,v.jsx)(t.code,{children:`<header>`}),` row that spaces its contents apart).`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:(0,v.jsx)(t.code,{children:`Footer`})}),` — the bottom region: secondary content and/or actions (a `,(0,v.jsx)(t.code,{children:`<footer>`}),` row that spaces its contents apart).`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:(0,v.jsx)(t.code,{children:`ButtonGroup`})}),` — a cluster of related actions, typically inside a `,(0,v.jsx)(t.code,{children:`Footer`}),` (an end-aligned, wrapping row with `,(0,v.jsx)(t.code,{children:`role="group"`}),`).`]}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`hybrid-styling`,children:`Hybrid styling`}),`
`,(0,v.jsx)(t.p,{children:`Each container works in two modes:`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:`Standalone`}),` — with no parent context it renders with its own structural defaults and looks the same everywhere.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:`Adopted`}),` — placed inside a parent that provides its context (`,(0,v.jsx)(t.code,{children:`ContentContext`}),`, `,(0,v.jsx)(t.code,{children:`HeaderContext`}),`, `,(0,v.jsx)(t.code,{children:`FooterContext`}),`, `,(0,v.jsx)(t.code,{children:`ButtonGroupContext`}),`), it picks up that parent's styling and spacing automatically. Merge precedence is defaults < parent context < consumer props (`,(0,v.jsx)(t.code,{children:`className`}),` concatenates, handlers chain), via React Aria's `,(0,v.jsx)(t.code,{children:`useContextProps`}),`.`]}),`
`]}),`
`,(0,v.jsx)(t.p,{children:`A parent adopts them by providing the contexts around its children:`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-tsx`,children:`import { Provider } from 'react-aria-components';
import { ContentContext, FooterContext, HeaderContext, ButtonGroupContext } from '@godaddy/antares';

<Provider
  values={[
    [HeaderContext, { padding: 'md' }],
    [ContentContext, { padding: 'md' }],
    [FooterContext, { padding: 'md' }],
    [ButtonGroupContext, { justifyContent: 'end' }]
  ]}
>
  {children}
</Provider>;
`})}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,v.jsxs)(t.p,{children:[`The shared structural containers composed together into a card-like layout. Each is a
plain semantic region here; inside a parent that provides their contexts (e.g. `,(0,v.jsx)(t.code,{children:`Modal`}),`)
they adopt that parent's spacing automatically.`]}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Flex, Header, Content, Footer, ButtonGroup, Text, Button } from '@godaddy/antares';

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
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsxs)(t.p,{children:[(0,v.jsx)(t.code,{children:`Content`}),`, `,(0,v.jsx)(t.code,{children:`Header`}),`, `,(0,v.jsx)(t.code,{children:`Footer`}),`, and `,(0,v.jsx)(t.code,{children:`ButtonGroup`}),` each accept all `,(0,v.jsx)(t.code,{children:`Flex`}),` layout props.`]}),`
`,(0,v.jsx)(t.h3,{id:`content`,children:`Content`}),`
`,(0,v.jsx)(a,{of:u}),`
`,(0,v.jsx)(t.h3,{id:`header`,children:`Header`}),`
`,(0,v.jsx)(a,{of:p}),`
`,(0,v.jsx)(t.h3,{id:`footer`,children:`Footer`}),`
`,(0,v.jsx)(a,{of:f}),`
`,(0,v.jsx)(t.h3,{id:`buttongroup`,children:`ButtonGroup`}),`
`,(0,v.jsx)(a,{of:l})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),c(),s(),h()}))();export{_ as default};