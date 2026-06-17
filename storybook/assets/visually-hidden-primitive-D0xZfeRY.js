import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-BUTRWgTW.js";import{S as n,s as r,u as i}from"./blocks-124SZwKx.js";import{t as a}from"./mdx-react-shim-DtCzPOAa.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/VisuallyHidden`}),`
`,(0,c.jsx)(t.h1,{id:`visuallyhidden-primitive-pdr`,children:`VisuallyHidden Primitive PDR`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsx)(t.p,{children:`The VisuallyHidden primitive provides content that is accessible to screen readers and other assistive technologies while being visually hidden from sighted users. This is a fundamental accessibility primitive that enables developers to provide additional context, instructions, or navigation aids without cluttering the visual interface.`}),`
`,(0,c.jsx)(t.p,{children:`This primitive is essential for implementing accessible patterns like skip links, screen reader-only form labels, additional context for interactive elements, and descriptive text that supplements visual cues. It serves as a building block for other accessible components throughout the Bento ecosystem and is consumed by form components, navigation systems, and any component requiring accessible hidden content.`}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsx)(t.p,{children:`The VisuallyHidden primitive is unique in its simplicity and critical importance:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React Aria foundation`}),`: Built directly on React Aria's proven VisuallyHidden implementation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Zero visual interference`}),`: Uses battle-tested CSS techniques to hide content visually while maintaining accessibility`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Screen reader preservation`}),`: Ensures content remains available to assistive technologies`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Universal applicability`}),`: Can be used with any content type (text, interactive elements, etc.)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Slot-based customization`}),`: Adds Bento's flexible customization system on top of React Aria's solid foundation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Performance optimized`}),`: Minimal runtime overhead with CSS-based hiding`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsx)(t.p,{children:`The VisuallyHidden primitive is built using:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React Aria's VisuallyHidden`}),` - The core foundation providing proven accessibility behavior`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`withSlots`}),` and `,(0,c.jsx)(t.strong,{children:`useProps`}),` - For slot-based composition and customization following Bento patterns`]}),`
`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { VisuallyHidden as AriaVisuallyHidden } from 'react-aria';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

export const VisuallyHidden = withSlots(
  'BentoVisuallyHidden',
  function VisuallyHidden(args) {
    const { props, apply } = useProps(args);
    const { children, as, elementType, ...rest } = props;

    // Support both \`as\` (community standard) and \`elementType\` (React Aria)
    const element = as || elementType;

    return (
      <AriaVisuallyHidden
        {...apply(rest)}
        elementType={element}
      >
        {children}
      </AriaVisuallyHidden>
    );
  }
);
`})}),`
`,(0,c.jsxs)(t.p,{children:[`This is a `,(0,c.jsx)(t.strong,{children:`UI primitive`}),` that renders HTML elements with specific styling to achieve visual hiding while maintaining accessibility.`]}),`
`,(0,c.jsx)(t.h2,{id:`implementation-patterns`,children:`Implementation Patterns`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Concept`}),(0,c.jsx)(t.th,{children:`Implementation`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsx)(t.td,{children:`Uses React Aria's VisuallyHidden component directly`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Slots`}),(0,c.jsx)(t.td,{children:`withSlots with 'BentoVisuallyHidden', supports slot prop`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Render Props`}),(0,c.jsx)(t.td,{children:`children, className, style as functions with render prop data`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-* Attributes`}),(0,c.jsx)(t.td,{children:`data-override, data-version for dev debugging`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-override`}),(0,c.jsx)(t.td,{children:`Set when className/style props override default behavior`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Composability`}),(0,c.jsxs)(t.td,{children:[`Supports any children content, `,(0,c.jsx)(t.code,{children:`as`}),` prop for element types`]})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsx)(t.p,{children:`This is already the minimal reusable unit for visual hiding functionality. The primitive:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Highly reusable`}),`: Used across form components, navigation, buttons, and accessibility patterns`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Atomic responsibility`}),`: Only handles visual hiding, delegates to React Aria for implementation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Foundation for patterns`}),`: Skip links, screen reader labels, accessible descriptions, form enhancements`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Shared behavior`}),`: The React Aria foundation ensures consistent behavior across all Bento components`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The component is intentionally simple and focused, making it perfect for composition in larger components without introducing complexity. It serves as a foundational building block that other Bento components can rely on for accessible hidden content.`}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsx)(t.p,{children:`The primitive is built directly on React Aria's accessibility utilities:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React Aria's VisuallyHidden`}),`: Uses their complete implementation with proven CSS hiding techniques`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Full compatibility`}),`: Maintains all React Aria's accessibility features and browser compatibility`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No gaps in coverage`}),`: React Aria provides complete coverage for this use case`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Consistent behavior`}),`: Follows established patterns for assistive technology support`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`React Aria's implementation handles all edge cases, cross-browser concerns, and accessibility requirements, so no additional logic is required.`}),`
`,(0,c.jsx)(t.h2,{id:`architecture--features`,children:`Architecture & Features`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Default element`}),`: Renders as `,(0,c.jsx)(t.code,{children:`<span>`}),` by default for inline content`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Custom elements`}),`: Supports `,(0,c.jsx)(t.code,{children:`as`}),` prop (community standard) and `,(0,c.jsx)(t.code,{children:`elementType`}),` (React Aria compatibility) for semantic HTML elements`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Children support`}),`: Accepts any React children content`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React Aria foundation`}),`: Uses React Aria's battle-tested hiding implementation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No custom CSS`}),`: Relies entirely on React Aria's proven hiding technique`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Slot composition`}),`: Adds Bento's customization layer on top of React Aria's foundation`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`dom-structure`,children:`DOM Structure`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<span class="react-aria-VisuallyHidden">Screen reader only content</span>
`})}),`
`,(0,c.jsx)(t.h3,{id:`api-interface`,children:`API Interface`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Community standard (preferred)
  elementType?: keyof JSX.IntrinsicElements; // React Aria compatibility
  // All other props passed through to React Aria's VisuallyHidden
}
`})}),`
`,(0,c.jsx)(t.h2,{id:`accessibility-highlights`,children:`Accessibility Highlights`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Screen reader accessible`}),`: Content remains available to assistive technologies`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Visually hidden`}),`: Completely hidden from sighted users using React Aria's CSS technique`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus management`}),`: Interactive children can still receive focus appropriately`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Semantic preservation`}),`: Maintains proper HTML semantics for assistive technologies`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`WCAG compliance`}),`: Follows WCAG guidelines for hidden content through React Aria's implementation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Cross-browser compatibility`}),`: React Aria handles browser inconsistencies`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No interference`}),`: Doesn't affect keyboard navigation or other accessibility features`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`internationalization-rtl-and-mobile-considerations`,children:`Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`RTL support`}),`: Works identically in RTL layouts since content is visually hidden`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Mobile accessibility`}),`: Functions correctly with mobile screen readers and assistive technologies`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Internationalization`}),`: Content can be localized normally since it's still accessible to screen readers`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`No layout concerns`}),`: Visual hiding eliminates layout-related RTL or mobile issues`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React Aria compatibility`}),`: Inherits React Aria's international and mobile support`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes-and-slot-map`,children:`Data Attributes and Slot Map`}),`
`,(0,c.jsxs)(t.h3,{id:`expected-data--attributes`,children:[`Expected `,(0,c.jsx)(t.code,{children:`data-*`}),` Attributes`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-override`})}),(0,c.jsx)(t.td,{children:`Indicates customization via props/slots`}),(0,c.jsx)(t.td,{children:`"style" / "className"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-version`})}),(0,c.jsx)(t.td,{children:`Component version in dev only`}),(0,c.jsx)(t.td,{children:`"visually-hidden@1.0"`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`competitive-research`,children:`Competitive Research`}),`
`,(0,c.jsx)(t.h3,{id:`react-aria`,children:`React Aria`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Implementation`}),`: Uses proven CSS clipping technique with `,(0,c.jsx)(t.code,{children:`position: absolute`}),` and `,(0,c.jsx)(t.code,{children:`clip: rect(0, 0, 0, 0)`})]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`API`}),`: Simple `,(0,c.jsx)(t.code,{children:`<VisuallyHidden elementType="span">`}),` interface`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Customization`}),`: Limited to element type and standard HTML props`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Bundle`}),`: Part of larger React Aria ecosystem`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Accessibility`}),`: Thoroughly tested across screen readers and browsers`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Props`}),`:`,`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  elementType?: keyof JSX.IntrinsicElements; // default: 'span'
  // + all standard HTML props
}
`})}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`reach-ui`,children:`Reach UI`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Implementation`}),`: Similar CSS approach but with slightly different clipping values`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`API`}),`: `,(0,c.jsx)(t.code,{children:`<VisuallyHidden>`}),` with children only`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Customization`}),`: No element type customization, always renders as `,(0,c.jsx)(t.code,{children:`<span>`})]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Bundle`}),`: Standalone package, smaller footprint`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Accessibility`}),`: Good but less comprehensive testing than React Aria`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Props`}),`:`,`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  // + standard HTML span props only
}
`})}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`chakra-ui`,children:`Chakra UI`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Implementation`}),`: Uses `,(0,c.jsx)(t.code,{children:`position: absolute`}),` with `,(0,c.jsx)(t.code,{children:`height: 1px`}),` and `,(0,c.jsx)(t.code,{children:`overflow: hidden`})]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`API`}),`: `,(0,c.jsx)(t.code,{children:`<VisuallyHidden>`}),` with additional styling props support`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Customization`}),`: Supports Chakra's styling system (sx, etc.)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Bundle`}),`: Integrated with Chakra's theming system`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Accessibility`}),`: Solid implementation but focused on Chakra ecosystem`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Props`}),`:`,`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface VisuallyHiddenProps extends HTMLChakraProps<'span'> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Chakra's polymorphic prop
  // + Chakra styling props (sx, color, etc.)
}
`})}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`headless-ui`,children:`Headless UI`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Implementation`}),`: Doesn't provide this primitive directly`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Approach`}),`: Expects developers to implement their own or use CSS utilities`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Alternative`}),`: Recommends using Tailwind's `,(0,c.jsx)(t.code,{children:`sr-only`}),` utility class`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Philosophy`}),`: Focuses on interactive components, not utility primitives`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Props`}),`: N/A - No component provided`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`radix-ui`,children:`Radix UI`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Implementation`}),`: CSS-based hiding with `,(0,c.jsx)(t.code,{children:`position: absolute`}),` and clipping`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`API`}),`: `,(0,c.jsx)(t.code,{children:`<VisuallyHidden>`}),` with `,(0,c.jsx)(t.code,{children:`asChild`}),` prop for composition`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Customization`}),`: Supports `,(0,c.jsx)(t.code,{children:`asChild`}),` for polymorphic rendering`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Bundle`}),`: Part of Radix primitives collection`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Accessibility`}),`: Well-tested implementation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Props`}),`:`,`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  asChild?: boolean; // renders as child element instead of span
  // + standard HTML props
}
`})}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`bentos-approach`,children:`Bento's Approach`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Implementation`}),`: Built directly on React Aria's proven foundation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`API`}),`: Combines React Aria's reliability with Bento's slot system`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Customization`}),`: Slot-based overrides, render props, and React Aria's element types`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Bundle`}),`: Minimal wrapper around React Aria`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Accessibility`}),`: Inherits React Aria's comprehensive testing plus Bento's patterns`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Unique`}),`: Only implementation that combines React Aria's reliability with advanced slot-based customization`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Props`}),`:`,`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Community standard (preferred)
  elementType?: keyof JSX.IntrinsicElements; // React Aria compatibility
  className?: string | ((data: RenderPropData) => string); // render prop
  style?: CSSProperties | ((data: RenderPropData) => CSSProperties); // render prop
  // + all standard HTML props
}
`})}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`key-differences-summary`,children:`Key Differences Summary`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Feature`}),(0,c.jsx)(t.th,{children:`React Aria`}),(0,c.jsx)(t.th,{children:`Reach UI`}),(0,c.jsx)(t.th,{children:`Chakra UI`}),(0,c.jsx)(t.th,{children:`Radix UI`}),(0,c.jsx)(t.th,{children:`Bento`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`CSS Technique`}),(0,c.jsx)(t.td,{children:`Clipping`}),(0,c.jsx)(t.td,{children:`Clipping`}),(0,c.jsx)(t.td,{children:`Height + Overflow`}),(0,c.jsx)(t.td,{children:`Clipping`}),(0,c.jsx)(t.td,{children:`React Aria's`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Element Types`}),(0,c.jsx)(t.td,{children:`✅`}),(0,c.jsx)(t.td,{children:`❌`}),(0,c.jsx)(t.td,{children:`❌`}),(0,c.jsx)(t.td,{children:`❌ (uses asChild)`}),(0,c.jsx)(t.td,{children:`✅`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Customization`}),(0,c.jsx)(t.td,{children:`Basic`}),(0,c.jsx)(t.td,{children:`None`}),(0,c.jsx)(t.td,{children:`Styling system`}),(0,c.jsx)(t.td,{children:`asChild`}),(0,c.jsx)(t.td,{children:`Slots + Render Props`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Accessibility`}),(0,c.jsx)(t.td,{children:`Excellent`}),(0,c.jsx)(t.td,{children:`Good`}),(0,c.jsx)(t.td,{children:`Good`}),(0,c.jsx)(t.td,{children:`Good`}),(0,c.jsx)(t.td,{children:`Excellent (React Aria)`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Ecosystem`}),(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsx)(t.td,{children:`Standalone`}),(0,c.jsx)(t.td,{children:`Chakra`}),(0,c.jsx)(t.td,{children:`Radix`}),(0,c.jsx)(t.td,{children:`Bento`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Props API`}),(0,c.jsx)(t.td,{children:`Simple`}),(0,c.jsx)(t.td,{children:`Minimal`}),(0,c.jsx)(t.td,{children:`Styling-rich`}),(0,c.jsx)(t.td,{children:`Polymorphic`}),(0,c.jsx)(t.td,{children:`Comprehensive`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Bento's Advantage`}),`: Combines React Aria's battle-tested accessibility implementation with Bento's flexible slot-based customization system, providing the most reliable foundation with the most customization options. The props API is the most comprehensive, supporting everything from basic usage to advanced slot-based overrides.`]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h3,{id:`basic-usage`,children:`Basic usage`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<VisuallyHidden>
  This text is hidden visually but available to screen readers
</VisuallyHidden>
`})}),`
`,(0,c.jsx)(t.h3,{id:`skip-link-pattern`,children:`Skip link pattern`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<VisuallyHidden as="a" href="#main-content">
  Skip to main content
</VisuallyHidden>
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};