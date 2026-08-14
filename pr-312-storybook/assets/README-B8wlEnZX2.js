import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DHUUK51X.js";import{a as l,c as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./box.stories-lJZAI7sU.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:h,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`box`,children:`Box`}),`
`,(0,y.jsx)(t.p,{children:`Polymorphic layout component providing consistent spacing, elevation, rounding, and self-alignment`}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.code,{children:`Box`}),` is a polymorphic layout component that renders as any HTML element or custom component via the `,(0,y.jsx)(t.code,{children:`as`}),` prop. It provides consistent spacing, elevation, rounding, and self-alignment within flex or grid containers.`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`Important`}),`: Since `,(0,y.jsx)(t.code,{children:`Flex`}),` and `,(0,y.jsx)(t.code,{children:`Grid`}),` extend `,(0,y.jsx)(t.code,{children:`Box`}),`, prefer them for layouts. Use `,(0,y.jsx)(t.code,{children:`Box`}),` only when you need a non-flex, non-grid container.`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`scale-sizes`,children:`Scale Sizes`}),`
`,(0,y.jsx)(t.p,{children:`The spacing props use semantic t-shirt sizes for padding, gap, and other spacing properties:`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`xs`}),` - Extra small spacing`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`sm`}),` - Small spacing`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`md`}),` - Medium spacing`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`lg`}),` - Large spacing`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`xl`}),` - Extra large spacing`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`2xl`}),` - 2x extra large spacing`]}),`
`]}),`
`,(0,y.jsx)(t.p,{children:`Custom CSS values are also supported for edge cases.`}),`
`,(0,y.jsxs)(t.h2,{id:`polymorphic-as-details`,children:[`Polymorphic `,(0,y.jsx)(t.code,{children:`as`}),` details`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`HTML Elements:`}),` When using `,(0,y.jsx)(t.code,{children:`as="button"`}),`, TypeScript enforces button-specific props like `,(0,y.jsx)(t.code,{children:`type`}),`, `,(0,y.jsx)(t.code,{children:`disabled`}),`, and `,(0,y.jsx)(t.code,{children:`onClick`}),`.`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`Custom Components:`}),` When using `,(0,y.jsx)(t.code,{children:`as={MyComponent}`}),`, Box accepts that component's props. If there's a prop name conflict, Box's props take priority.`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`Typed Refs:`}),` Refs are correctly typed based on the `,(0,y.jsx)(t.code,{children:`as`}),` value - `,(0,y.jsx)(t.code,{children:`useRef<HTMLButtonElement>`}),` works with `,(0,y.jsx)(t.code,{children:`as="button"`}),`.`]}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`padding`,children:`Padding`}),`
`,(0,y.jsx)(t.p,{children:`The padding props support t-shirt sizes and CSS logical properties for RTL support.`}),`
`,(0,y.jsx)(a,{of:d,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Box, Flex, type BoxProps } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`elevation`,children:`Elevation`}),`
`,(0,y.jsx)(t.p,{children:`The elevation prop adds visual depth using box-shadow.`}),`
`,(0,y.jsx)(a,{of:m,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Box, Flex } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`rounding`,children:`Rounding`}),`
`,(0,y.jsxs)(t.p,{children:[`The rounding prop sets border-radius. Use `,(0,y.jsx)(t.code,{children:`full`}),` for fully rounded corners.`]}),`
`,(0,y.jsx)(a,{of:p,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Box, Flex } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`polymorphic-as-prop`,children:`Polymorphic as Prop`}),`
`,(0,y.jsxs)(t.p,{children:[`Box is fully polymorphic - the `,(0,y.jsx)(t.code,{children:`as`}),` prop allows rendering as any HTML element or custom component while preserving type-safe props.`]}),`
`,(0,y.jsx)(a,{of:f,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { useRef } from 'react';
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
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,y.jsx)(t.p,{children:`Self-alignment props allow Box to position itself within flex or grid containers.`}),`
`,(0,y.jsx)(a,{of:g,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Box, Flex } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`rtl-support`,children:`RTL Support`}),`
`,(0,y.jsxs)(t.p,{children:[`Box uses CSS logical properties (`,(0,y.jsx)(t.code,{children:`padding-inline-start`}),`, `,(0,y.jsx)(t.code,{children:`padding-block-end`}),`, etc.) which automatically adapt to RTL layouts. No additional configuration is needed.`]}),`
`,(0,y.jsx)(t.h2,{id:`design-tokens`,children:`Design Tokens`}),`
`,(0,y.jsx)(t.p,{children:`All spacing, elevation, and rounding values are derived from the theme. If no theme is provided, default values are used. This ensures consistency across the design system.`}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`Box`}),` component accepts the following props:`]}),`
`,(0,y.jsx)(o,{of:l})]})}function v(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;function b(){return(b=e((()=>{y=t(),n(),c(),u()})))()}b();export{v as default};