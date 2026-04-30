import{j as e}from"./iframe-CXq8dscT.js";import{useMDXComponents as r}from"./index-DeJayPHI.js";import{M as i,A as a,a as l,S as t}from"./blocks-CsMHUZB-.js";import{S as d,P as x,D as c,a as m,A as p,G as g,W as F,N as u,b as h}from"./flex.stories-CX_GRGLV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6mFRbdBS.js";import"./index-CSZn66pI.js";import"./index-DqyoxfBT.js";import"./index-BZYddRPU.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-0EmXUKHn.js";import"./index-csxMhZ-S.js";import"./Button-D6D2Bh4j.js";import"./Text-y2HQxSdE.js";import"./mergeProps-CioQwTky.js";import"./SSRProvider-MXfK5wd5.js";import"./useObjectRef-Dd0hiFt9.js";import"./Hidden-MXRSykvl.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-bH__ECVU.js";import"./usePress-BgtTyQlT.js";import"./utils-WKJzbNAt.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CbTlJmRM.js";import"./useHover-CDGikqBt.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-94V3crGD.js";import"./useFocusWithin-IcZsLXPi.js";import"./index-D2Ir4QQ_.js";import"./index-BxNZtEH0.js";import"./index-IA4gOyr6.js";import"./slots-CY9pdvpn.js";import"./index-gE1I4wOJ.js";import"./index-CLj43KZG.js";import"./index-YnYe-Usd.js";import"./index-BIR_jmoc.js";import"./create-external-store-TtP3UJpK.js";import"./index-BHOheNy1.js";import"./client-CoLWouX6.js";import"./index-D0G7Jurk.js";const j=`import { Flex, type FlexProps } from '@godaddy/antares';

export function DefaultExample(props: FlexProps) {
  return (
    <Flex gap="sm" {...props}>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 1
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 2
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 3
      </Flex>
    </Flex>
  );
}
`,y=`import { Flex } from '@godaddy/antares';

export function DirectionExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">Row (default)</Flex>
        <Flex gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">Column</Flex>
        <Flex direction="column" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">Row Reverse</Flex>
        <Flex direction="row-reverse" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
`,b=`import { Flex } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: space-between</Flex>
        <Flex justifyContent="space-between">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Start
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Middle
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: center</Flex>
        <Flex justifyContent="center" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: end</Flex>
        <Flex justifyContent="end" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: center (with varying heights)</Flex>
        <Flex alignItems="center" gap="sm" style={{ height: '100px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Short
          </Flex>
          <Flex padding="lg" style={{ background: '#e0e0e0' }}>
            Tall
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Short
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: stretch (default)</Flex>
        <Flex alignItems="stretch" gap="sm" style={{ height: '100px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
`,f=`import { Flex } from '@godaddy/antares';

export function GapExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xs</Flex>
        <Flex gap="xs">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: sm</Flex>
        <Flex gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: md</Flex>
        <Flex gap="md">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: lg</Flex>
        <Flex gap="lg">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xl</Flex>
        <Flex gap="xl">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">rowGap + columnGap (with wrap)</Flex>
        <Flex wrap="wrap" rowGap="lg" columnGap="xs" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
`,k=`import { Flex } from '@godaddy/antares';

export function WrapExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">wrap: nowrap (default)</Flex>
        <Flex wrap="nowrap" gap="sm" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">wrap: wrap</Flex>
        <Flex wrap="wrap" gap="sm" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">wrap: wrap-reverse</Flex>
        <Flex wrap="wrap-reverse" gap="sm" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
`,I=`import { Flex, LinkButton, Button } from '@godaddy/antares';

export function NavbarExample() {
  return (
    <Flex as="nav" alignItems="center" justifyContent="space-between" padding="xs">
      <Flex as="h1">Logo</Flex>

      <Flex gap="sm">
        <LinkButton href="#">Home</LinkButton>
        <LinkButton href="#">About</LinkButton>
        <LinkButton href="#">Contact</LinkButton>
      </Flex>

      <Flex gap="sm">
        <Button variant="primary">Sign In</Button>
        <Button variant="secondary">Sign Up</Button>
      </Flex>
    </Flex>
  );
}
`,w=`import { Flex, LinkButton } from '@godaddy/antares';

export function SidebarExample() {
  return (
    <Flex rounding="reduced">
      <Flex as="aside" direction="column" gap="sm" padding="xs" flexShrink="0" style={{ width: '200px' }}>
        <Flex as="h3">Navigation</Flex>
        <LinkButton href="#">Dashboard</LinkButton>
        <LinkButton href="#">Settings</LinkButton>
        <LinkButton href="#">Profile</LinkButton>
      </Flex>

      <Flex as="main" direction="column" padding="md" flexGrow="1">
        <Flex as="h2">Main Content</Flex>
        <Flex as="p">
          This main content area uses flexGrow="1" to fill the remaining space. The sidebar uses flexShrink="0" to
          maintain its fixed width.
        </Flex>
      </Flex>
    </Flex>
  );
}
`;function o(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"flex",children:"Flex"}),`
`,e.jsx(n.p,{children:"One-dimensional layout component for arranging children in rows or columns with alignment and spacing control"}),`
`,e.jsxs(n.p,{children:["Flex is a one-dimensional layout component for arranging children in rows or columns with alignment and spacing control. It extends ",e.jsx(n.a,{href:"../box/README.mdx",children:e.jsx(n.code,{children:"Box"})}),", inheriting all Box capabilities (padding, elevation, rounding, self-alignment, and polymorphic ",e.jsx(n.code,{children:"as"})," prop)."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Recommended default"}),": Use Flex for most layouts. Since it extends Box, you get all Box capabilities without needing to nest components."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Flex"})," component accepts the following props:"]}),`
`,e.jsx(a,{of:x}),`
`,e.jsx(n.h2,{id:"scale-sizes",children:"Scale Sizes"}),`
`,e.jsxs(n.p,{children:["We use the same scale sizes as the ",e.jsx(n.code,{children:"Box"})," component. For more information, see the ",e.jsx(n.a,{href:"../box/README.mdx#scale-sizes",children:e.jsx(n.strong,{children:"Box component documentation"})}),"."]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"default",children:"Default"}),`
`,e.jsx(n.p,{children:"Basic horizontal flex layout with gap."}),`
`,e.jsx(l,{of:c,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:j}),`
`,e.jsx(n.h3,{id:"direction",children:"Direction"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"direction"})," prop controls the main axis orientation."]}),`
`,e.jsx(l,{of:m,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:y}),`
`,e.jsx(n.h3,{id:"alignment",children:"Alignment"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"justifyContent"})," for main-axis distribution and ",e.jsx(n.code,{children:"alignItems"})," for cross-axis alignment."]}),`
`,e.jsx(l,{of:p,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:b}),`
`,e.jsx(n.h3,{id:"gap",children:"Gap"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"gap"})," prop controls spacing between children. Use ",e.jsx(n.code,{children:"rowGap"})," and ",e.jsx(n.code,{children:"columnGap"})," for independent control."]}),`
`,e.jsx(l,{of:g,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:f}),`
`,e.jsx(n.h3,{id:"wrap",children:"Wrap"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"wrap"})," prop controls whether items wrap to multiple lines."]}),`
`,e.jsx(l,{of:F,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:k}),`
`,e.jsx(n.h3,{id:"navbar",children:"Navbar"}),`
`,e.jsx(n.p,{children:"A common navigation bar pattern using space-between and nested Flex containers."}),`
`,e.jsx(l,{of:u,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:I}),`
`,e.jsx(n.h3,{id:"sidebar",children:"Sidebar"}),`
`,e.jsxs(n.p,{children:["A sidebar layout demonstrating Flex child props (",e.jsx(n.code,{children:"flexShrink"}),", ",e.jsx(n.code,{children:"flexGrow"}),")."]}),`
`,e.jsx(l,{of:h,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:w}),`
`,e.jsx(n.h2,{id:"rtl-support",children:"RTL Support"}),`
`,e.jsxs(n.p,{children:["Flex uses CSS logical properties which automatically adapt to RTL layouts. The ",e.jsx(n.code,{children:"direction"})," prop values (",e.jsx(n.code,{children:"row"}),", ",e.jsx(n.code,{children:"row-reverse"}),") respect the document direction."]}),`
`,e.jsx(n.h2,{id:"design-tokens",children:"Design Tokens"}),`
`,e.jsx(n.p,{children:"All gap and padding values are derived from the theme. If no theme is provided, default values are used. This ensures consistency across the design system."}),`
`,e.jsx(n.h2,{id:"migration-from-uxbox",children:"Migration from @ux/box"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsxs(n.th,{children:["Current ",e.jsx(n.code,{children:"@ux/box"})]}),e.jsx(n.th,{children:"New Pattern"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box orientation="horizontal">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex direction="row" >'})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box orientation="vertical">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex direction="column" >'})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box blockAlignChildren="center">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex justifyContent="center">'})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box inlineAlignChildren="center">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex alignItems="center">'})})]})]})]})]})}function me(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{me as default};
