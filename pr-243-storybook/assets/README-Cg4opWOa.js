import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-BS49jQh-.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C_WNqlvD.js";import{t as c}from"./mdx-react-shim-DxZXVNH4.js";import{Controlled as l,Default as u,InlineDrawerPanelProps as d,Props as f,SidebarNav as p,n as m,t as h}from"./inline-drawer.stories-DjR4-U0N.js";var g,_=e((()=>{g=`import { InlineDrawer, InlineDrawerPanel, Button, Box, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Box style={{ maxInlineSize: 360 }}>
      <InlineDrawer>
        <Button slot="trigger">Toggle details</Button>
        <InlineDrawerPanel>
          <Box padding="md">
            <Text>Collapsible content goes here.</Text>
          </Box>
        </InlineDrawerPanel>
      </InlineDrawer>
    </Box>
  );
}
`})),v,y=e((()=>{v=`import { useState } from 'react';
import { InlineDrawer, Flex, ToggleButton, LinkButton, Icon, Text } from '@godaddy/antares';

const NAV = [
  { icon: 'grid', label: 'Dashboard', href: '#' },
  { icon: 'star', label: 'Favorites', href: '#' },
  { icon: 'comment', label: 'Messages', href: '#' }
] as const;

export function SidebarNavExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Flex direction="row">
      <InlineDrawer placement="left" isExpanded={expanded} onExpandedChange={setExpanded} minSize={35} maxSize={150}>
        <Flex direction="column" gap="xs" padding="xs">
          <ToggleButton isSelected={expanded} onChange={setExpanded} aria-label="Menu">
            <Icon icon="bulleted-list" />
          </ToggleButton>
          {NAV.map(function renderItem(item) {
            return (
              <LinkButton
                key={item.label}
                href={item.href}
                aria-label={!expanded ? item.label : undefined}
                variant="minimal"
                style={{ justifyContent: 'flex-start' }}
              >
                <Icon icon={item.icon} />
                {expanded ? item.label : null}
              </LinkButton>
            );
          })}
        </Flex>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1, borderInlineStart: '1px solid var(--bd-base)' }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
`})),b,x=e((()=>{b=`import { useState } from 'react';
import { InlineDrawer, InlineDrawerPanel, Button, Box, Text } from '@godaddy/antares';

export function ControlledExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setExpanded(!expanded)}>
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
      <Text>Expanded: {String(expanded)}</Text>
      <Box style={{ maxInlineSize: 360 }}>
        <InlineDrawer isExpanded={expanded} onExpandedChange={setExpanded}>
          <Button slot="trigger">Details</Button>
          <InlineDrawerPanel>
            <Box padding="md">
              <Text>Controlled panel content.</Text>
            </Box>
          </InlineDrawerPanel>
        </InlineDrawer>
      </Box>
    </>
  );
}
`}));function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:m,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`inlinedrawer`,children:`InlineDrawer`}),`
`,(0,w.jsx)(t.p,{children:`An in-flow collapsible built on RAC Disclosure. Compose a trigger and content to make an accordion or a sidebar rail.`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`InlineDrawerPanel`}),` is the collapsible content for the accordion pattern — a thin wrapper over RAC `,(0,w.jsx)(t.code,{children:`DisclosurePanel`}),` that hides when collapsed. The trigger is any component you slot in with `,(0,w.jsx)(t.code,{children:`slot="trigger"`}),` — there's no dedicated trigger component.`]}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[`In-flow collapsible built on RAC Disclosure — bring your own trigger via `,(0,w.jsx)(t.code,{children:`slot="trigger"`})]}),`
`,(0,w.jsxs)(t.li,{children:[`Animated by default; `,(0,w.jsx)(t.code,{children:`animate={false}`}),` disables the transition`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`placement`}),` selects the collapse axis (`,(0,w.jsx)(t.code,{children:`left`}),`/`,(0,w.jsx)(t.code,{children:`right`}),` → width, `,(0,w.jsx)(t.code,{children:`top`}),`/`,(0,w.jsx)(t.code,{children:`bottom`}),` → height)`]}),`
`,(0,w.jsxs)(t.li,{children:[`Controlled and uncontrolled modes (`,(0,w.jsx)(t.code,{children:`isExpanded`}),` / `,(0,w.jsx)(t.code,{children:`defaultExpanded`}),` / `,(0,w.jsx)(t.code,{children:`onExpandedChange`}),`)`]}),`
`,(0,w.jsxs)(t.li,{children:[`Accordion collapse uses the browser's `,(0,w.jsx)(t.code,{children:`hidden="until-found"`}),` for find-in-page`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`prefers-reduced-motion`}),` support`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsx)(a,{of:f}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`InlineDrawerPanel`}),` component accepts the following props:`]}),`
`,(0,w.jsx)(a,{of:d}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,w.jsxs)(t.p,{children:[`Put a `,(0,w.jsx)(t.code,{children:`<Button slot="trigger">`}),` and an `,(0,w.jsx)(t.code,{children:`<InlineDrawerPanel>`}),` inside `,(0,w.jsx)(t.code,{children:`InlineDrawer`}),`. The panel hides when collapsed and animates open.`]}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,w.jsxs)(t.p,{children:[`Use `,(0,w.jsx)(t.code,{children:`isExpanded`}),` and `,(0,w.jsx)(t.code,{children:`onExpandedChange`}),` to drive state externally.`]}),`
`,(0,w.jsx)(i,{of:l,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:b}),`
`,(0,w.jsx)(t.h3,{id:`sidebar-navigation`,children:`Sidebar Navigation`}),`
`,(0,w.jsxs)(t.p,{children:[`A rail whose content stays visible when collapsed is a composition, not a mode: drive `,(0,w.jsx)(t.code,{children:`isExpanded`}),` yourself, render always-visible children (no `,(0,w.jsx)(t.code,{children:`InlineDrawerPanel`}),`), and let `,(0,w.jsx)(t.code,{children:`minSize`}),`/`,(0,w.jsx)(t.code,{children:`maxSize`}),` size the rail. Use numeric (px) sizes so the width animates; intrinsic keywords like `,(0,w.jsx)(t.code,{children:`min-content`}),`/`,(0,w.jsx)(t.code,{children:`max-content`}),` fit the content exactly but don't animate.`]}),`
`,(0,w.jsx)(i,{of:p,inline:!0}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Key`}),(0,w.jsx)(t.th,{children:`Action`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsxs)(t.td,{children:[(0,w.jsx)(t.code,{children:`Enter`}),` / `,(0,w.jsx)(t.code,{children:`Space`})]}),(0,w.jsx)(t.td,{children:`Toggle via the slotted trigger`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`Tab`})}),(0,w.jsx)(t.td,{children:`Move focus through the content`})]})]})]}),`
`,(0,w.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[`A `,(0,w.jsx)(t.code,{children:`<Button slot="trigger">`}),` gets `,(0,w.jsx)(t.code,{children:`aria-expanded`}),` + `,(0,w.jsx)(t.code,{children:`aria-controls`}),` wired to the `,(0,w.jsx)(t.code,{children:`InlineDrawerPanel`}),` automatically (via RAC Disclosure).`]}),`
`,(0,w.jsxs)(t.li,{children:[`For the sidebar rail, the toggle is your own control (e.g. a `,(0,w.jsx)(t.code,{children:`ToggleButton`}),`) — give icon-only buttons an `,(0,w.jsx)(t.code,{children:`aria-label`}),`, and the content stays in the DOM and accessible since nothing is hidden.`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[`Accordion → `,(0,w.jsx)(t.code,{children:`Button slot="trigger"`}),` + `,(0,w.jsx)(t.code,{children:`InlineDrawerPanel`}),`. Sidebar rail → controlled state + always-visible children.`]}),`
`,(0,w.jsxs)(t.li,{children:[`For the rail, use numeric (px) `,(0,w.jsx)(t.code,{children:`minSize`}),`/`,(0,w.jsx)(t.code,{children:`maxSize`}),` so the width animates; `,(0,w.jsx)(t.code,{children:`min-content`}),`/`,(0,w.jsx)(t.code,{children:`max-content`}),` fit the content exactly but won't animate.`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`placement`}),` does not flip in RTL; the side is decided by document/flex order.`]}),`
`,(0,w.jsx)(t.li,{children:`Don't nest InlineDrawers.`}),`
`]})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),h(),_(),y(),x()}))();export{C as default};