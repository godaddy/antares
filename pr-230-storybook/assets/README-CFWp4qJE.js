import{i as e}from"./preload-helper-BnI5NLmJ.js";import{y as t}from"./iframe-DWBYrjkr.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CvK_Sq38.js";import{t as c}from"./mdx-react-shim-C_ujhYFu.js";import{Alignment as l,As as u,Elevation as d,Padding as f,Props as p,Rounding as m,n as h,t as g}from"./box.stories-CZMrx0mh.js";var _,v=e((()=>{_=`import { Box, Flex, type BoxProps } from '@godaddy/antares';

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
`})),y,b=e((()=>{y=`import { Box, Flex } from '@godaddy/antares';

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
`})),x,S=e((()=>{x=`import { Box, Flex } from '@godaddy/antares';

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
`})),C,w=e((()=>{C=`import { useRef } from 'react';
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
`})),T,E=e((()=>{T=`import { Box, Flex } from '@godaddy/antares';

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
`}));function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(o,{of:g,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`box`,children:`Box`}),`
`,(0,k.jsx)(t.p,{children:`Polymorphic layout component providing consistent spacing, elevation, rounding, and self-alignment`}),`
`,(0,k.jsxs)(t.p,{children:[`Box is a polymorphic layout component that renders as any HTML element or custom component via the `,(0,k.jsx)(t.code,{children:`as`}),` prop. It provides consistent spacing, elevation, rounding, and self-alignment within flex or grid containers.`]}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.strong,{children:`Important`}),`: Since `,(0,k.jsx)(t.code,{children:`Flex`}),` and `,(0,k.jsx)(t.code,{children:`Grid`}),` extend `,(0,k.jsx)(t.code,{children:`Box`}),`, prefer them for layouts. Use `,(0,k.jsx)(t.code,{children:`Box`}),` only when you need a non-flex, non-grid container.`]}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsxs)(t.p,{children:[`The `,(0,k.jsx)(t.code,{children:`Box`}),` component accepts the following props:`]}),`
`,(0,k.jsx)(a,{of:p}),`
`,(0,k.jsx)(t.h2,{id:`scale-sizes`,children:`Scale Sizes`}),`
`,(0,k.jsx)(t.p,{children:`The spacing props use semantic t-shirt sizes for padding, gap, and other spacing properties:`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`xs`}),` - Extra small spacing`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`sm`}),` - Small spacing`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`md`}),` - Medium spacing`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`lg`}),` - Large spacing`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`xl`}),` - Extra large spacing`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`2xl`}),` - 2x extra large spacing`]}),`
`]}),`
`,(0,k.jsx)(t.p,{children:`Custom CSS values are also supported for edge cases.`}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`padding`,children:`Padding`}),`
`,(0,k.jsx)(t.p,{children:`The padding props support t-shirt sizes and CSS logical properties for RTL support.`}),`
`,(0,k.jsx)(i,{of:f,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:_}),`
`,(0,k.jsx)(t.h3,{id:`elevation`,children:`Elevation`}),`
`,(0,k.jsx)(t.p,{children:`The elevation prop adds visual depth using box-shadow.`}),`
`,(0,k.jsx)(i,{of:d,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:y}),`
`,(0,k.jsx)(t.h3,{id:`rounding`,children:`Rounding`}),`
`,(0,k.jsxs)(t.p,{children:[`The rounding prop sets border-radius. Use `,(0,k.jsx)(t.code,{children:`full`}),` for fully rounded corners.`]}),`
`,(0,k.jsx)(i,{of:m,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:x}),`
`,(0,k.jsxs)(t.h3,{id:`polymorphic-as-prop`,children:[`Polymorphic `,(0,k.jsx)(t.code,{children:`as`}),` Prop`]}),`
`,(0,k.jsxs)(t.p,{children:[`Box is fully polymorphic - the `,(0,k.jsx)(t.code,{children:`as`}),` prop allows rendering as any HTML element or custom component while preserving type-safe props.`]}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.strong,{children:`HTML Elements:`}),` When using `,(0,k.jsx)(t.code,{children:`as="button"`}),`, TypeScript enforces button-specific props like `,(0,k.jsx)(t.code,{children:`type`}),`, `,(0,k.jsx)(t.code,{children:`disabled`}),`, and `,(0,k.jsx)(t.code,{children:`onClick`}),`.`]}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.strong,{children:`Custom Components:`}),` When using `,(0,k.jsx)(t.code,{children:`as={MyComponent}`}),`, Box accepts that component's props. If there's a prop name conflict, Box's props take priority.`]}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.strong,{children:`Typed Refs:`}),` Refs are correctly typed based on the `,(0,k.jsx)(t.code,{children:`as`}),` value - `,(0,k.jsx)(t.code,{children:`useRef<HTMLButtonElement>`}),` works with `,(0,k.jsx)(t.code,{children:`as="button"`}),`.`]}),`
`,(0,k.jsx)(i,{of:u,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:C}),`
`,(0,k.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,k.jsx)(t.p,{children:`Self-alignment props allow Box to position itself within flex or grid containers.`}),`
`,(0,k.jsx)(i,{of:l,inline:!0}),`
`,(0,k.jsx)(r,{language:`tsx`,code:T}),`
`,(0,k.jsx)(t.h2,{id:`rtl-support`,children:`RTL Support`}),`
`,(0,k.jsxs)(t.p,{children:[`Box uses CSS logical properties (`,(0,k.jsx)(t.code,{children:`padding-inline-start`}),`, `,(0,k.jsx)(t.code,{children:`padding-block-end`}),`, etc.) which automatically adapt to RTL layouts. No additional configuration is needed.`]}),`
`,(0,k.jsx)(t.h2,{id:`design-tokens`,children:`Design Tokens`}),`
`,(0,k.jsx)(t.p,{children:`All spacing, elevation, and rounding values are derived from the theme. If no theme is provided, default values are used. This ensures consistency across the design system.`})]})}function O(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;e((()=>{k=t(),c(),s(),h(),v(),b(),S(),w(),E()}))();export{O as default};