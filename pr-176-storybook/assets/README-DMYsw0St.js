import{j as e}from"./iframe-B4Nw7FJe.js";import{u as d,M as r,A as a,a as i,S as s}from"./blocks-_qyMzwgH.js";import{S as l,P as c,a as p,E as x,R as m,A as h,b as g}from"./box.stories-CBYeP59U.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BCz66L0m.js";import"./index-DhvjJc79.js";import"./index-DnzQElaE.js";import"./index-B6dGqv0q.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-CUuL9TT_.js";const u=`import { Box, Flex, type BoxProps } from '@godaddy/antares';

export function PaddingExample(attrs: BoxProps) {
  return (
    <Flex direction="column" gap="md">
      <Box padding="md" elevation="card" {...attrs}>
        Padding: md
      </Box>
      <Box blockPadding="lg" elevation="card">
        Block Padding: lg
      </Box>
      <Box inlinePadding="xl" elevation="card">
        Inline Padding: xl
      </Box>
      <Box blockPaddingStart="sm" blockPaddingEnd="lg" elevation="card">
        Block Padding Start: sm, End: lg
      </Box>
    </Flex>
  );
}
`,f=`import { Box, Flex } from '@godaddy/antares';

export function ElevationExample() {
  return (
    <Flex direction="column" gap="lg" padding="md">
      <Box padding="md" elevation="base">
        Elevation: base
      </Box>

      <Box padding="md" elevation="card">
        Elevation: card
      </Box>

      <Box padding="md" elevation="raised">
        Elevation: raised
      </Box>

      <Box padding="md" elevation="overlay">
        Elevation: overlay
      </Box>
    </Flex>
  );
}
`,B=`import { Box, Flex } from '@godaddy/antares';

export function RoundingExample() {
  return (
    <Flex wrap="wrap" direction="column" gap="md">
      <Box padding="md" rounding="xs" elevation="card">
        xs
      </Box>
      <Box padding="md" rounding="sm" elevation="card">
        sm
      </Box>
      <Box padding="md" rounding="md" elevation="card">
        md
      </Box>
      <Box padding="md" rounding="lg" elevation="card">
        lg
      </Box>
      <Box padding="md" rounding="xl" elevation="card">
        xl
      </Box>
      <Box padding="md" rounding="2xl" elevation="card">
        2xl
      </Box>
      <Box padding="md" rounding="full" elevation="card" style={{ width: '80px', height: '80px' }}>
        full
      </Box>
      <Box padding="md" rounding="full" elevation="card" style={{ width: '200px', height: '80px' }}>
        pill
      </Box>
    </Flex>
  );
}
`,j=`import { useRef } from 'react';
import { Box, Flex, type BoxProps } from '@godaddy/antares';

export function AsExample() {
  return (
    <Flex direction="column" gap="md">
      <AsSemanticElements />
      <AsInteractiveElements />
      <AsWithTypedRefs />
      <AsCustomComponent />
    </Flex>
  );
}

function AsSemanticElements() {
  return (
    <Flex direction="column" gap="sm">
      <Box padding="sm" elevation="base">
        Default (div)
      </Box>
      <Box as="section" padding="sm" elevation="base">
        As section
      </Box>
      <Box as="article" padding="sm" elevation="base">
        As article
      </Box>
      <Box as="span" padding="sm" elevation="base">
        As span
      </Box>
    </Flex>
  );
}

/** Interactive elements with their specific props. */
function AsInteractiveElements() {
  return (
    <Flex direction="column" gap="sm">
      <Box as="button" padding="sm" elevation="base" type="button">
        As button (click me)
      </Box>

      {/* Anchor with href - TypeScript enforces anchor-specific props */}
      <Box as="a" padding="sm" elevation="base" href="https://example.com" target="_blank" rel="noopener noreferrer">
        As anchor (link)
      </Box>

      {/* Input element */}
      <Box as="input" padding="sm" elevation="base" type="text" placeholder="As input element" />
    </Flex>
  );
}

/** Demonstrating typed refs for different elements. */
function AsWithTypedRefs() {
  // Each ref is typed to match the "as" element
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="column" gap="sm">
      <Box as="button" ref={buttonRef} padding="sm" elevation="base">
        Button with typed ref
      </Box>

      <Box as="a" ref={anchorRef} href="#" padding="sm" elevation="base">
        Anchor with typed ref
      </Box>

      <Box ref={divRef} padding="sm" elevation="base">
        Div with typed ref (default)
      </Box>
    </Flex>
  );
}

/** Using Box with a custom component. */
function AsCustomComponent() {
  return (
    <Flex direction="column" gap="sm">
      <Box as={Card} type="A">
        Custom Card
      </Box>

      <Box as={Card} type="B">
        Custom Card
      </Box>
    </Flex>
  );
}

/** Custom component to demonstrate polymorphism with custom components. */
function Card(props: BoxProps & { type?: 'A' | 'B' }) {
  return (
    <Box {...props}>
      {props.type === 'A' ? 'type A! ' : 'type B! '}
      {props.children}
    </Box>
  );
}
`,v=`import { Box, Flex } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex gap="md" style={{ height: '150px' }}>
      <Box padding="sm" alignSelf="start" elevation="card">
        align-self: start
      </Box>
      <Box padding="sm" alignSelf="center" elevation="card">
        align-self: center
      </Box>
      <Box padding="sm" alignSelf="end" elevation="card">
        align-self: end
      </Box>
      <Box padding="sm" alignSelf="stretch" elevation="card">
        align-self: stretch
      </Box>
    </Flex>
  );
}
`;function t(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...d(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l,name:"Overview"}),`
`,e.jsx(n.h1,{id:"box",children:"Box"}),`
`,e.jsx(n.p,{children:"Polymorphic layout component providing consistent spacing, elevation, rounding, and self-alignment"}),`
`,e.jsxs(n.p,{children:["Box is a polymorphic layout component that renders as any HTML element or custom component via the ",e.jsx(n.code,{children:"as"})," prop. It provides consistent spacing, elevation, rounding, and self-alignment within flex or grid containers."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important"}),": Since ",e.jsx(n.code,{children:"Flex"})," and ",e.jsx(n.code,{children:"Grid"})," extend ",e.jsx(n.code,{children:"Box"}),", prefer them for layouts. Use ",e.jsx(n.code,{children:"Box"})," only when you need a non-flex, non-grid container."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Box"})," component accepts the following props:"]}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(n.h2,{id:"scale-sizes",children:"Scale Sizes"}),`
`,e.jsx(n.p,{children:"The spacing props use semantic t-shirt sizes for padding, gap, and other spacing properties:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"xs"})," - Extra small spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"sm"})," - Small spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"md"})," - Medium spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"lg"})," - Large spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"xl"})," - Extra large spacing"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"2xl"})," - 2x extra large spacing"]}),`
`]}),`
`,e.jsx(n.p,{children:"Custom CSS values are also supported for edge cases."}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"padding",children:"Padding"}),`
`,e.jsx(n.p,{children:"The padding props support t-shirt sizes and CSS logical properties for RTL support."}),`
`,e.jsx(i,{of:p,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:u}),`
`,e.jsx(n.h3,{id:"elevation",children:"Elevation"}),`
`,e.jsx(n.p,{children:"The elevation prop adds visual depth using box-shadow."}),`
`,e.jsx(i,{of:x,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:f}),`
`,e.jsx(n.h3,{id:"rounding",children:"Rounding"}),`
`,e.jsxs(n.p,{children:["The rounding prop sets border-radius. Use ",e.jsx(n.code,{children:"full"})," for fully rounded corners."]}),`
`,e.jsx(i,{of:m,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:B}),`
`,e.jsxs(n.h3,{id:"polymorphic-as-prop",children:["Polymorphic ",e.jsx(n.code,{children:"as"})," Prop"]}),`
`,e.jsxs(n.p,{children:["Box is fully polymorphic - the ",e.jsx(n.code,{children:"as"})," prop allows rendering as any HTML element or custom component while preserving type-safe props."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"HTML Elements:"})," When using ",e.jsx(n.code,{children:'as="button"'}),", TypeScript enforces button-specific props like ",e.jsx(n.code,{children:"type"}),", ",e.jsx(n.code,{children:"disabled"}),", and ",e.jsx(n.code,{children:"onClick"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Custom Components:"})," When using ",e.jsx(n.code,{children:"as={MyComponent}"}),", Box accepts that component's props. If there's a prop name conflict, Box's props take priority."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Typed Refs:"})," Refs are correctly typed based on the ",e.jsx(n.code,{children:"as"})," value - ",e.jsx(n.code,{children:"useRef<HTMLButtonElement>"})," works with ",e.jsx(n.code,{children:'as="button"'}),"."]}),`
`,e.jsx(i,{of:h,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:j}),`
`,e.jsx(n.h3,{id:"alignment",children:"Alignment"}),`
`,e.jsx(n.p,{children:"Self-alignment props allow Box to position itself within flex or grid containers."}),`
`,e.jsx(i,{of:g,inline:!0}),`
`,e.jsx(s,{language:"tsx",code:v}),`
`,e.jsx(n.h2,{id:"rtl-support",children:"RTL Support"}),`
`,e.jsxs(n.p,{children:["Box uses CSS logical properties (",e.jsx(n.code,{children:"padding-inline-start"}),", ",e.jsx(n.code,{children:"padding-block-end"}),", etc.) which automatically adapt to RTL layouts. No additional configuration is needed."]}),`
`,e.jsx(n.h2,{id:"design-tokens",children:"Design Tokens"}),`
`,e.jsx(n.p,{children:"All spacing, elevation, and rounding values are derived from the theme. If no theme is provided, default values are used. This ensures consistency across the design system."})]})}function k(o={}){const{wrapper:n}={...d(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{k as default};
