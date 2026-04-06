import{j as e}from"./iframe-Ch56BMwv.js";import{useMDXComponents as i}from"./index-BkL-YMPO.js";import{M as t}from"./blocks-hhx9c-hw.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BE802ufj.js";import"./index-DxjdSSN5.js";import"./index-RYYsr_gc.js";import"./index-DrFu-skq.js";function r(s){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Architecture/PDRs/Container"}),`
`,e.jsx(n.h1,{id:"container-primitive-pdr",children:"Container Primitive PDR"}),`
`,e.jsx(n.h2,{id:"summary",children:"Summary"}),`
`,e.jsxs(n.p,{children:["Container is the ",e.jsx(n.strong,{children:"atomic building block"})," for polymorphic rendering + slot composition + prop spreading. Zero styling, zero layout logic - just the infrastructure that Text, Box, and all future Bento components build upon."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"What it provides:"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Polymorphic rendering via ",e.jsx(n.code,{children:"as"})," prop"]}),`
`,e.jsxs(n.li,{children:["Slot-based composition via ",e.jsx(n.code,{children:"@bento/slots"})]}),`
`,e.jsxs(n.li,{children:["Prop spreading and override tracking via ",e.jsx(n.code,{children:"@bento/use-props"})]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"What it is NOT:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Not a layout component (no flex/grid/spacing)"}),`
`,e.jsx(n.li,{children:"Not styled (no CSS, no appearance)"}),`
`,e.jsx(n.li,{children:"Not interactive (no behavior, no state)"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Target users:"})," Component authors building primitives and design systems, not end-user developers writing apps."]}),`
`,e.jsx(n.h2,{id:"comparison-to-text",children:"Comparison to Text"}),`
`,e.jsx(n.p,{children:"Container is Text without the text-specific opinions:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Feature"}),e.jsx(n.th,{children:"Container"}),e.jsx(n.th,{children:"Text"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:["Polymorphic (",e.jsx(n.code,{children:"as"}),")"]}),e.jsxs(n.td,{children:["✅ ",e.jsx(n.code,{children:"div"})," default"]}),e.jsxs(n.td,{children:["✅ ",e.jsx(n.code,{children:"span"})," default"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Slots + prop spreading"}),e.jsx(n.td,{children:"✅"}),e.jsx(n.td,{children:"✅ (same)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Domain props"}),e.jsx(n.td,{children:"❌"}),e.jsxs(n.td,{children:["✅ ",e.jsx(n.code,{children:"align"}),", ",e.jsx(n.code,{children:"maxLines"}),", ",e.jsx(n.code,{children:"wrap"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"CSS module"}),e.jsx(n.td,{children:"❌"}),e.jsx(n.td,{children:"✅ Text styles"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Future"}),": Text can refactor to extend Container, eliminating duplication."]}),`
`,e.jsx(n.h2,{id:"props-interface",children:"Props Interface"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface ContainerProps extends Slots, React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML element to render.
   * @default 'div'
   */
  as?: string;

  /**
   * The content to render inside the container.
   */
  children?: ReactNode;
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Type safety"}),": The ",e.jsx(n.code,{children:"as"})," prop uses a simple ",e.jsx(n.code,{children:"string"})," type, accepting any HTML element name. This matches Text's current implementation and keeps the API straightforward. In the future, we could add TypeScript generics (e.g., ",e.jsx(n.code,{children:"Container<'button'>"}),") to provide element-specific prop types, but that's an additive enhancement that wouldn't break existing usage."]}),`
`,e.jsx(n.h2,{id:"react-aria-analysis",children:"React Aria Analysis"}),`
`,e.jsxs(n.p,{children:["Container is a ",e.jsx(n.strong,{children:"composition primitive"}),", not a behavioral component. React Aria doesn't have a direct equivalent because:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No hooks needed"})," - Container provides no behavior (no ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useButton.html",rel:"nofollow",children:e.jsx(n.code,{children:"useButton"})}),", ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useFocusRing.html",rel:"nofollow",children:e.jsx(n.code,{children:"useFocusRing"})}),", etc.)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pure infrastructure"})," - Only handles polymorphic rendering and prop spreading"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Below React Aria's abstraction level"})," - React Aria components would build ",e.jsx(n.em,{children:"on top"})," of Container"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Relationship to React Aria:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Bento components like Button/Checkbox use React Aria hooks for behavior"}),`
`,e.jsx(n.li,{children:"Those components can internally use Container for polymorphic rendering"}),`
`,e.jsxs(n.li,{children:["Container is the layer ",e.jsx(n.em,{children:"beneath"})," React Aria's behavioral hooks"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Why no React Aria equivalent exists:"})}),`
`,e.jsxs(n.p,{children:["React Aria Components focus on ",e.jsx(n.strong,{children:"behavior and accessibility"}),", not composition infrastructure. Their ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/components.html",rel:"nofollow",children:"component architecture"})," provides components like ",e.jsx(n.code,{children:"<Button>"}),", ",e.jsx(n.code,{children:"<Checkbox>"}),", etc. that render as specific HTML elements with ARIA semantics built-in."]}),`
`,e.jsx(n.p,{children:"For polymorphic rendering, React Aria uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Button.tsx#L130-L136",rel:"nofollow",children:[e.jsx(n.code,{children:"elementType"})," prop"]})," on individual components (not a shared primitive)"]}),`
`,e.jsxs(n.li,{children:["Internal utilities like ",e.jsx(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx#L99-L107",rel:"nofollow",children:e.jsx(n.code,{children:"createLeafComponent"})})," (not part of public API)"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Container fills the gap by providing a ",e.jsx(n.strong,{children:"shared, reusable primitive"})," for polymorphic rendering that all Bento components can build upon, rather than each component reimplementing this pattern."]}),`
`,e.jsx(n.h2,{id:"usage-examples",children:"Usage Examples"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Basic polymorphic rendering
<Container as="article">
  <h1>Article Title</h1>
</Container>

// Building design system components
function Box({ padding, elevation, children, ...props }) {
  return (
    <Container
      {...props}
      className={cn(styles.box, styles[elevation])}
      style={{ padding: tokens.spacing[padding], ...props.style }}
    >
      {children}
    </Container>
  );
}
`})}),`
`,e.jsx(n.h2,{id:"implementation",children:"Implementation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// packages/container/src/index.tsx
import { withSlots, type Slots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import React, { type ReactNode } from 'react';

export interface ContainerProps extends Slots, React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML element to render.
   * @default 'div'
   */
  as?: string;

  /**
   * The content to render inside the container.
   */
  children?: ReactNode;
}

export const Container = withSlots('BentoContainer', function Container(args: ContainerProps) {
  const { props, apply } = useProps(args);
  const { children, as = 'div' } = props;

  if (children == null) return null;

  return React.createElement(as, apply({}, ['as']), children);
});
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Key patterns:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"No CSS module (truly unstyled)"}),`
`,e.jsxs(n.li,{children:["Only filters ",e.jsx(n.code,{children:"as"})," prop (everything else passes through)"]}),`
`,e.jsxs(n.li,{children:["Returns ",e.jsx(n.code,{children:"null"})," when ",e.jsx(n.code,{children:"children == null"})," (avoids empty DOM nodes)"]}),`
`,e.jsxs(n.li,{children:["Default element: ",e.jsx(n.code,{children:"div"})," (more generic than ",e.jsx(n.code,{children:"span"}),")"]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Data attributes"})," (automatically added by ",e.jsx(n.a,{href:"../../packages/use-props/",children:e.jsx(n.code,{children:"@bento/use-props"})}),"):"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-override"})," - Tracks when ",e.jsx(n.code,{children:"className"}),"/",e.jsx(n.code,{children:"style"}),"/slots are customized (see ",e.jsx(n.a,{href:"../../packages/text/src/index.tsx",children:"Text implementation"})," for this pattern)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-version"})," - Component version (dev builds only)"]}),`
`]}),`
`,e.jsx(n.h2,{id:"testing",children:"Testing"}),`
`,e.jsx(n.p,{children:"Key test coverage:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Renders as ",e.jsx(n.code,{children:"div"})," by default, custom element via ",e.jsx(n.code,{children:"as"})]}),`
`,e.jsxs(n.li,{children:["Passes through ",e.jsx(n.code,{children:"className"}),", ",e.jsx(n.code,{children:"style"}),", ARIA attributes, event handlers"]}),`
`,e.jsxs(n.li,{children:["Returns ",e.jsx(n.code,{children:"null"})," when no children passed (avoids empty DOM nodes)"]}),`
`,e.jsxs(n.li,{children:["Tracks overrides via ",e.jsx(n.code,{children:"data-override"})]}),`
`,e.jsx(n.li,{children:"Supports slot composition"}),`
`]}),`
`,e.jsx(n.h2,{id:"competitive-analysis",children:"Competitive Analysis"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Library"}),e.jsx(n.th,{children:"Approach"}),e.jsx(n.th,{children:"Limitation"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/radix-ui/primitives/tree/main/packages/react/primitive",rel:"nofollow",children:"Radix UI"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://www.radix-ui.com/primitives/docs/utilities/primitive",rel:"nofollow",children:e.jsx(n.code,{children:"Primitive.div/span"})})}),e.jsxs(n.td,{children:["Verbose API (",e.jsx(n.code,{children:"Primitive.div"})," vs ",e.jsx(n.code,{children:'as="div"'}),"), no slots"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://chakra-ui.com/docs/components/box",rel:"nofollow",children:"Chakra UI"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/layout/src/box.tsx",rel:"nofollow",children:"Box with style props"})}),e.jsx(n.td,{children:"Not unstyled, theme-coupled"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-spectrum/View.html",rel:"nofollow",children:"React Spectrum"})}),e.jsx(n.td,{children:e.jsx(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/view/src/View.tsx",rel:"nofollow",children:"View with spacing"})}),e.jsx(n.td,{children:"Design system-coupled"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.a,{href:"https://ark-ui.com/react/docs/utilities/ark",rel:"nofollow",children:"Ark UI"})}),e.jsx(n.td,{children:e.jsxs(n.a,{href:"https://github.com/chakra-ui/ark/blob/main/packages/react/src/factory.tsx",rel:"nofollow",children:[e.jsx(n.code,{children:"asChild"})," pattern"]})}),e.jsx(n.td,{children:"Different composition model (slot merging)"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Bento's edge"}),": Truly unstyled, minimal API, slot system, design system-agnostic."]})]})}function j(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{j as default};
