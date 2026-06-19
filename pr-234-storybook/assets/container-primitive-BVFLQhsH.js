import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-wBcvNeCk.js";import{S as n,s as r,u as i}from"./blocks-C9uCMJg6.js";import{t as a}from"./mdx-react-shim-Du_DF1pu.js";function o(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Container`}),`
`,(0,c.jsx)(t.h1,{id:`container-primitive-pdr`,children:`Container Primitive PDR`}),`
`,(0,c.jsx)(t.h2,{id:`summary`,children:`Summary`}),`
`,(0,c.jsxs)(t.p,{children:[`Container is the `,(0,c.jsx)(t.strong,{children:`atomic building block`}),` for polymorphic rendering + slot composition + prop spreading. Zero styling, zero layout logic - just the infrastructure that Text, Box, and all future Bento components build upon.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`What it provides:`})}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Polymorphic rendering via `,(0,c.jsx)(t.code,{children:`as`}),` prop`]}),`
`,(0,c.jsxs)(t.li,{children:[`Slot-based composition via `,(0,c.jsx)(t.code,{children:`@bento/slots`})]}),`
`,(0,c.jsxs)(t.li,{children:[`Prop spreading and override tracking via `,(0,c.jsx)(t.code,{children:`@bento/use-props`})]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`What it is NOT:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Not a layout component (no flex/grid/spacing)`}),`
`,(0,c.jsx)(t.li,{children:`Not styled (no CSS, no appearance)`}),`
`,(0,c.jsx)(t.li,{children:`Not interactive (no behavior, no state)`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Target users:`}),` Component authors building primitives and design systems, not end-user developers writing apps.`]}),`
`,(0,c.jsx)(t.h2,{id:`comparison-to-text`,children:`Comparison to Text`}),`
`,(0,c.jsx)(t.p,{children:`Container is Text without the text-specific opinions:`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Feature`}),(0,c.jsx)(t.th,{children:`Container`}),(0,c.jsx)(t.th,{children:`Text`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[`Polymorphic (`,(0,c.jsx)(t.code,{children:`as`}),`)`]}),(0,c.jsxs)(t.td,{children:[`✅ `,(0,c.jsx)(t.code,{children:`div`}),` default`]}),(0,c.jsxs)(t.td,{children:[`✅ `,(0,c.jsx)(t.code,{children:`span`}),` default`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Slots + prop spreading`}),(0,c.jsx)(t.td,{children:`✅`}),(0,c.jsx)(t.td,{children:`✅ (same)`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Domain props`}),(0,c.jsx)(t.td,{children:`❌`}),(0,c.jsxs)(t.td,{children:[`✅ `,(0,c.jsx)(t.code,{children:`align`}),`, `,(0,c.jsx)(t.code,{children:`maxLines`}),`, `,(0,c.jsx)(t.code,{children:`wrap`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`CSS module`}),(0,c.jsx)(t.td,{children:`❌`}),(0,c.jsx)(t.td,{children:`✅ Text styles`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Future`}),`: Text can refactor to extend Container, eliminating duplication.`]}),`
`,(0,c.jsx)(t.h2,{id:`props-interface`,children:`Props Interface`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface ContainerProps extends Slots, React.HTMLAttributes<HTMLElement> {
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Type safety`}),`: The `,(0,c.jsx)(t.code,{children:`as`}),` prop uses a simple `,(0,c.jsx)(t.code,{children:`string`}),` type, accepting any HTML element name. This matches Text's current implementation and keeps the API straightforward. In the future, we could add TypeScript generics (e.g., `,(0,c.jsx)(t.code,{children:`Container<'button'>`}),`) to provide element-specific prop types, but that's an additive enhancement that wouldn't break existing usage.`]}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-analysis`,children:`React Aria Analysis`}),`
`,(0,c.jsxs)(t.p,{children:[`Container is a `,(0,c.jsx)(t.strong,{children:`composition primitive`}),`, not a behavioral component. React Aria doesn't have a direct equivalent because:`]}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No hooks needed`}),` - Container provides no behavior (no `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useButton.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useButton`})}),`, `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useFocusRing.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useFocusRing`})}),`, etc.)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Pure infrastructure`}),` - Only handles polymorphic rendering and prop spreading`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Below React Aria's abstraction level`}),` - React Aria components would build `,(0,c.jsx)(t.em,{children:`on top`}),` of Container`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Relationship to React Aria:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Bento components like Button/Checkbox use React Aria hooks for behavior`}),`
`,(0,c.jsx)(t.li,{children:`Those components can internally use Container for polymorphic rendering`}),`
`,(0,c.jsxs)(t.li,{children:[`Container is the layer `,(0,c.jsx)(t.em,{children:`beneath`}),` React Aria's behavioral hooks`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Why no React Aria equivalent exists:`})}),`
`,(0,c.jsxs)(t.p,{children:[`React Aria Components focus on `,(0,c.jsx)(t.strong,{children:`behavior and accessibility`}),`, not composition infrastructure. Their `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/components.html`,rel:`nofollow`,children:`component architecture`}),` provides components like `,(0,c.jsx)(t.code,{children:`<Button>`}),`, `,(0,c.jsx)(t.code,{children:`<Checkbox>`}),`, etc. that render as specific HTML elements with ARIA semantics built-in.`]}),`
`,(0,c.jsx)(t.p,{children:`For polymorphic rendering, React Aria uses:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Button.tsx#L130-L136`,rel:`nofollow`,children:[(0,c.jsx)(t.code,{children:`elementType`}),` prop`]}),` on individual components (not a shared primitive)`]}),`
`,(0,c.jsxs)(t.li,{children:[`Internal utilities like `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx#L99-L107`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`createLeafComponent`})}),` (not part of public API)`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Container fills the gap by providing a `,(0,c.jsx)(t.strong,{children:`shared, reusable primitive`}),` for polymorphic rendering that all Bento components can build upon, rather than each component reimplementing this pattern.`]}),`
`,(0,c.jsx)(t.h2,{id:`usage-examples`,children:`Usage Examples`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Basic polymorphic rendering
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
`,(0,c.jsx)(t.h2,{id:`implementation`,children:`Implementation`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// packages/container/src/index.tsx
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
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Key patterns:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`No CSS module (truly unstyled)`}),`
`,(0,c.jsxs)(t.li,{children:[`Only filters `,(0,c.jsx)(t.code,{children:`as`}),` prop (everything else passes through)`]}),`
`,(0,c.jsxs)(t.li,{children:[`Returns `,(0,c.jsx)(t.code,{children:`null`}),` when `,(0,c.jsx)(t.code,{children:`children == null`}),` (avoids empty DOM nodes)`]}),`
`,(0,c.jsxs)(t.li,{children:[`Default element: `,(0,c.jsx)(t.code,{children:`div`}),` (more generic than `,(0,c.jsx)(t.code,{children:`span`}),`)`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Data attributes`}),` (automatically added by `,(0,c.jsx)(t.a,{href:`../../packages/use-props/`,children:(0,c.jsx)(t.code,{children:`@bento/use-props`})}),`):`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`data-override`}),` - Tracks when `,(0,c.jsx)(t.code,{children:`className`}),`/`,(0,c.jsx)(t.code,{children:`style`}),`/slots are customized (see `,(0,c.jsx)(t.a,{href:`../../packages/text/src/index.tsx`,children:`Text implementation`}),` for this pattern)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`data-version`}),` - Component version (dev builds only)`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`testing`,children:`Testing`}),`
`,(0,c.jsx)(t.p,{children:`Key test coverage:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Renders as `,(0,c.jsx)(t.code,{children:`div`}),` by default, custom element via `,(0,c.jsx)(t.code,{children:`as`})]}),`
`,(0,c.jsxs)(t.li,{children:[`Passes through `,(0,c.jsx)(t.code,{children:`className`}),`, `,(0,c.jsx)(t.code,{children:`style`}),`, ARIA attributes, event handlers`]}),`
`,(0,c.jsxs)(t.li,{children:[`Returns `,(0,c.jsx)(t.code,{children:`null`}),` when no children passed (avoids empty DOM nodes)`]}),`
`,(0,c.jsxs)(t.li,{children:[`Tracks overrides via `,(0,c.jsx)(t.code,{children:`data-override`})]}),`
`,(0,c.jsx)(t.li,{children:`Supports slot composition`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`competitive-analysis`,children:`Competitive Analysis`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Library`}),(0,c.jsx)(t.th,{children:`Approach`}),(0,c.jsx)(t.th,{children:`Limitation`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`https://github.com/radix-ui/primitives/tree/main/packages/react/primitive`,rel:`nofollow`,children:`Radix UI`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`https://www.radix-ui.com/primitives/docs/utilities/primitive`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`Primitive.div/span`})})}),(0,c.jsxs)(t.td,{children:[`Verbose API (`,(0,c.jsx)(t.code,{children:`Primitive.div`}),` vs `,(0,c.jsx)(t.code,{children:`as="div"`}),`), no slots`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`https://chakra-ui.com/docs/components/box`,rel:`nofollow`,children:`Chakra UI`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/layout/src/box.tsx`,rel:`nofollow`,children:`Box with style props`})}),(0,c.jsx)(t.td,{children:`Not unstyled, theme-coupled`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-spectrum/View.html`,rel:`nofollow`,children:`React Spectrum`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/view/src/View.tsx`,rel:`nofollow`,children:`View with spacing`})}),(0,c.jsx)(t.td,{children:`Design system-coupled`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`https://ark-ui.com/react/docs/utilities/ark`,rel:`nofollow`,children:`Ark UI`})}),(0,c.jsx)(t.td,{children:(0,c.jsxs)(t.a,{href:`https://github.com/chakra-ui/ark/blob/main/packages/react/src/factory.tsx`,rel:`nofollow`,children:[(0,c.jsx)(t.code,{children:`asChild`}),` pattern`]})}),(0,c.jsx)(t.td,{children:`Different composition model (slot merging)`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Bento's edge`}),`: Truly unstyled, minimal API, slot system, design system-agnostic.`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};