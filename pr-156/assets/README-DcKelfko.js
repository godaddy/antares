import{j as e}from"./iframe-CDEIw4XQ.js";import{useMDXComponents as r}from"./index-BhEX0M0z.js";import{M as i,A as a,a as l,S as t}from"./blocks-BqVfQbPk.js";import{S as d,P as x,D as c,a as m,A as p,G as g,W as F,N as u,b as h}from"./flex.stories-Da1ig-dH.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DL9AzUUz.js";import"./index-CAtGzlAv.js";import"./index-MgdxWe3v.js";import"./index-DrFu-skq.js";import"./index-BEiGibEc.js";import"./index-BBkPFN0l.js";import"./clsx-cv3tFG8n.js";import"./index-mzfbLpYX.js";import"./mergeProps-UhpBswaF.js";import"./useObjectRef-Bd000wn7.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-B7RsTE87.js";import"./useFocusWithin-Cfw26kbT.js";import"./platform-BULRNHlZ.js";import"./useFocusable-Ch5kFV99.js";import"./Collection-DTcTBjbt.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-D6wbQ10T.js";import"./context-Dct8_FIu.js";import"./useControlledState-DKyeH0SE.js";import"./useOverlayTriggerState-DRycnfq0.js";import"./PortalProvider-Cvgv_26t.js";import"./usePreventScroll-CD_pawBF.js";import"./useLabel-C61zC6Ny.js";import"./VisuallyHidden-Dttb607n.js";import"./useField-wHib94lK.js";import"./useButton-C0pAqsFy.js";import"./index-BJJVFG9_.js";import"./index-Df3veLei.js";import"./slots-WDjn2eMq.js";import"./index-BYdXecjr.js";import"./index-CLj43KZG.js";import"./index-DXUnOUU7.js";import"./index-Kyvx58Pw.js";import"./create-external-store-TtP3UJpK.js";import"./index-CLF6pm69.js";import"./client-CXi_X_gK.js";import"./index--FoTXNkO.js";import"./index-5nQsLfNb.js";const j=`import { Flex, type FlexProps } from '@godaddy/antares';

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
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsxs(n.th,{children:["Current ",e.jsx(n.code,{children:"@ux/box"})]}),e.jsx(n.th,{children:"New Pattern"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box orientation="horizontal">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex direction="row" >'})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box orientation="vertical">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex direction="column" >'})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box blockAlignChildren="center">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex justifyContent="center">'})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:'<Box inlineAlignChildren="center">'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'<Flex alignItems="center">'})})]})]})]})]})}function ue(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{ue as default};
