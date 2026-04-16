import{j as e}from"./iframe-ikStBiWE.js";import{useMDXComponents as t}from"./index-B1azrVMk.js";import{M as r}from"./blocks-D4l97m0v.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DfAhu-k8.js";import"./index-OxG4j95y.js";import"./index-CSaoBq0f.js";import"./index-DrFu-skq.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Architecture/PDRs/VisuallyHidden"}),`
`,e.jsx(n.h1,{id:"visuallyhidden-primitive-pdr",children:"VisuallyHidden Primitive PDR"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(n.p,{children:"The VisuallyHidden primitive provides content that is accessible to screen readers and other assistive technologies while being visually hidden from sighted users. This is a fundamental accessibility primitive that enables developers to provide additional context, instructions, or navigation aids without cluttering the visual interface."}),`
`,e.jsx(n.p,{children:"This primitive is essential for implementing accessible patterns like skip links, screen reader-only form labels, additional context for interactive elements, and descriptive text that supplements visual cues. It serves as a building block for other accessible components throughout the Bento ecosystem and is consumed by form components, navigation systems, and any component requiring accessible hidden content."}),`
`,e.jsx(n.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsx(n.p,{children:"The VisuallyHidden primitive is unique in its simplicity and critical importance:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React Aria foundation"}),": Built directly on React Aria's proven VisuallyHidden implementation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Zero visual interference"}),": Uses battle-tested CSS techniques to hide content visually while maintaining accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen reader preservation"}),": Ensures content remains available to assistive technologies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Universal applicability"}),": Can be used with any content type (text, interactive elements, etc.)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Slot-based customization"}),": Adds Bento's flexible customization system on top of React Aria's solid foundation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Performance optimized"}),": Minimal runtime overhead with CSS-based hiding"]}),`
`]}),`
`,e.jsx(n.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsx(n.p,{children:"The VisuallyHidden primitive is built using:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React Aria's VisuallyHidden"})," - The core foundation providing proven accessibility behavior"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"withSlots"})," and ",e.jsx(n.strong,{children:"useProps"})," - For slot-based composition and customization following Bento patterns"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { VisuallyHidden as AriaVisuallyHidden } from 'react-aria';
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
`,e.jsxs(n.p,{children:["This is a ",e.jsx(n.strong,{children:"UI primitive"})," that renders HTML elements with specific styling to achieve visual hiding while maintaining accessibility."]}),`
`,e.jsx(n.h2,{id:"implementation-patterns",children:"Implementation Patterns"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Concept"}),e.jsx(n.th,{children:"Implementation"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"React Aria"}),e.jsx(n.td,{children:"Uses React Aria's VisuallyHidden component directly"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Slots"}),e.jsx(n.td,{children:"withSlots with 'BentoVisuallyHidden', supports slot prop"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Render Props"}),e.jsx(n.td,{children:"children, className, style as functions with render prop data"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"data-* Attributes"}),e.jsx(n.td,{children:"data-override, data-version for dev debugging"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"data-override"}),e.jsx(n.td,{children:"Set when className/style props override default behavior"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Composability"}),e.jsxs(n.td,{children:["Supports any children content, ",e.jsx(n.code,{children:"as"})," prop for element types"]})]})]})]}),`
`,e.jsx(n.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsx(n.p,{children:"This is already the minimal reusable unit for visual hiding functionality. The primitive:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Highly reusable"}),": Used across form components, navigation, buttons, and accessibility patterns"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Atomic responsibility"}),": Only handles visual hiding, delegates to React Aria for implementation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Foundation for patterns"}),": Skip links, screen reader labels, accessible descriptions, form enhancements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Shared behavior"}),": The React Aria foundation ensures consistent behavior across all Bento components"]}),`
`]}),`
`,e.jsx(n.p,{children:"The component is intentionally simple and focused, making it perfect for composition in larger components without introducing complexity. It serves as a foundational building block that other Bento components can rely on for accessible hidden content."}),`
`,e.jsx(n.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsx(n.p,{children:"The primitive is built directly on React Aria's accessibility utilities:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React Aria's VisuallyHidden"}),": Uses their complete implementation with proven CSS hiding techniques"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Full compatibility"}),": Maintains all React Aria's accessibility features and browser compatibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No gaps in coverage"}),": React Aria provides complete coverage for this use case"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consistent behavior"}),": Follows established patterns for assistive technology support"]}),`
`]}),`
`,e.jsx(n.p,{children:"React Aria's implementation handles all edge cases, cross-browser concerns, and accessibility requirements, so no additional logic is required."}),`
`,e.jsx(n.h2,{id:"architecture--features",children:"Architecture & Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default element"}),": Renders as ",e.jsx(n.code,{children:"<span>"})," by default for inline content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom elements"}),": Supports ",e.jsx(n.code,{children:"as"})," prop (community standard) and ",e.jsx(n.code,{children:"elementType"})," (React Aria compatibility) for semantic HTML elements"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Children support"}),": Accepts any React children content"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React Aria foundation"}),": Uses React Aria's battle-tested hiding implementation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No custom CSS"}),": Relies entirely on React Aria's proven hiding technique"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Slot composition"}),": Adds Bento's customization layer on top of React Aria's foundation"]}),`
`]}),`
`,e.jsx(n.h3,{id:"dom-structure",children:"DOM Structure"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<span class="react-aria-VisuallyHidden">Screen reader only content</span>
`})}),`
`,e.jsx(n.h3,{id:"api-interface",children:"API Interface"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Community standard (preferred)
  elementType?: keyof JSX.IntrinsicElements; // React Aria compatibility
  // All other props passed through to React Aria's VisuallyHidden
}
`})}),`
`,e.jsx(n.h2,{id:"accessibility-highlights",children:"Accessibility Highlights"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen reader accessible"}),": Content remains available to assistive technologies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visually hidden"}),": Completely hidden from sighted users using React Aria's CSS technique"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus management"}),": Interactive children can still receive focus appropriately"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic preservation"}),": Maintains proper HTML semantics for assistive technologies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"WCAG compliance"}),": Follows WCAG guidelines for hidden content through React Aria's implementation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cross-browser compatibility"}),": React Aria handles browser inconsistencies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No interference"}),": Doesn't affect keyboard navigation or other accessibility features"]}),`
`]}),`
`,e.jsx(n.h2,{id:"internationalization-rtl-and-mobile-considerations",children:"Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"RTL support"}),": Works identically in RTL layouts since content is visually hidden"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mobile accessibility"}),": Functions correctly with mobile screen readers and assistive technologies"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Internationalization"}),": Content can be localized normally since it's still accessible to screen readers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No layout concerns"}),": Visual hiding eliminates layout-related RTL or mobile issues"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React Aria compatibility"}),": Inherits React Aria's international and mobile support"]}),`
`]}),`
`,e.jsx(n.h2,{id:"data-attributes-and-slot-map",children:"Data Attributes and Slot Map"}),`
`,e.jsxs(n.h3,{id:"expected-data--attributes",children:["Expected ",e.jsx(n.code,{children:"data-*"})," Attributes"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-override"})}),e.jsx(n.td,{children:"Indicates customization via props/slots"}),e.jsx(n.td,{children:'"style" / "className"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-version"})}),e.jsx(n.td,{children:"Component version in dev only"}),e.jsx(n.td,{children:'"visually-hidden@1.0"'})]})]})]}),`
`,e.jsx(n.h2,{id:"competitive-research",children:"Competitive Research"}),`
`,e.jsx(n.h3,{id:"react-aria",children:"React Aria"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implementation"}),": Uses proven CSS clipping technique with ",e.jsx(n.code,{children:"position: absolute"})," and ",e.jsx(n.code,{children:"clip: rect(0, 0, 0, 0)"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"API"}),": Simple ",e.jsx(n.code,{children:'<VisuallyHidden elementType="span">'})," interface"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customization"}),": Limited to element type and standard HTML props"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bundle"}),": Part of larger React Aria ecosystem"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Thoroughly tested across screen readers and browsers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props"}),":",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  elementType?: keyof JSX.IntrinsicElements; // default: 'span'
  // + all standard HTML props
}
`})}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"reach-ui",children:"Reach UI"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implementation"}),": Similar CSS approach but with slightly different clipping values"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"API"}),": ",e.jsx(n.code,{children:"<VisuallyHidden>"})," with children only"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customization"}),": No element type customization, always renders as ",e.jsx(n.code,{children:"<span>"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bundle"}),": Standalone package, smaller footprint"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Good but less comprehensive testing than React Aria"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props"}),":",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  // + standard HTML span props only
}
`})}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"chakra-ui",children:"Chakra UI"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implementation"}),": Uses ",e.jsx(n.code,{children:"position: absolute"})," with ",e.jsx(n.code,{children:"height: 1px"})," and ",e.jsx(n.code,{children:"overflow: hidden"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"API"}),": ",e.jsx(n.code,{children:"<VisuallyHidden>"})," with additional styling props support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customization"}),": Supports Chakra's styling system (sx, etc.)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bundle"}),": Integrated with Chakra's theming system"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Solid implementation but focused on Chakra ecosystem"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props"}),":",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface VisuallyHiddenProps extends HTMLChakraProps<'span'> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Chakra's polymorphic prop
  // + Chakra styling props (sx, color, etc.)
}
`})}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"headless-ui",children:"Headless UI"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implementation"}),": Doesn't provide this primitive directly"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Approach"}),": Expects developers to implement their own or use CSS utilities"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Alternative"}),": Recommends using Tailwind's ",e.jsx(n.code,{children:"sr-only"})," utility class"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Philosophy"}),": Focuses on interactive components, not utility primitives"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props"}),": N/A - No component provided"]}),`
`]}),`
`,e.jsx(n.h3,{id:"radix-ui",children:"Radix UI"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implementation"}),": CSS-based hiding with ",e.jsx(n.code,{children:"position: absolute"})," and clipping"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"API"}),": ",e.jsx(n.code,{children:"<VisuallyHidden>"})," with ",e.jsx(n.code,{children:"asChild"})," prop for composition"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customization"}),": Supports ",e.jsx(n.code,{children:"asChild"})," for polymorphic rendering"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bundle"}),": Part of Radix primitives collection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Well-tested implementation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props"}),":",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface VisuallyHiddenProps {
  children: React.ReactNode;
  asChild?: boolean; // renders as child element instead of span
  // + standard HTML props
}
`})}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"bentos-approach",children:"Bento's Approach"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Implementation"}),": Built directly on React Aria's proven foundation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"API"}),": Combines React Aria's reliability with Bento's slot system"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customization"}),": Slot-based overrides, render props, and React Aria's element types"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bundle"}),": Minimal wrapper around React Aria"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Inherits React Aria's comprehensive testing plus Bento's patterns"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Unique"}),": Only implementation that combines React Aria's reliability with advanced slot-based customization"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Props"}),":",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface VisuallyHiddenProps {
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
`,e.jsx(n.h3,{id:"key-differences-summary",children:"Key Differences Summary"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Feature"}),e.jsx(n.th,{children:"React Aria"}),e.jsx(n.th,{children:"Reach UI"}),e.jsx(n.th,{children:"Chakra UI"}),e.jsx(n.th,{children:"Radix UI"}),e.jsx(n.th,{children:"Bento"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"CSS Technique"}),e.jsx(n.td,{children:"Clipping"}),e.jsx(n.td,{children:"Clipping"}),e.jsx(n.td,{children:"Height + Overflow"}),e.jsx(n.td,{children:"Clipping"}),e.jsx(n.td,{children:"React Aria's"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Element Types"}),e.jsx(n.td,{children:"✅"}),e.jsx(n.td,{children:"❌"}),e.jsx(n.td,{children:"❌"}),e.jsx(n.td,{children:"❌ (uses asChild)"}),e.jsx(n.td,{children:"✅"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Customization"}),e.jsx(n.td,{children:"Basic"}),e.jsx(n.td,{children:"None"}),e.jsx(n.td,{children:"Styling system"}),e.jsx(n.td,{children:"asChild"}),e.jsx(n.td,{children:"Slots + Render Props"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Accessibility"}),e.jsx(n.td,{children:"Excellent"}),e.jsx(n.td,{children:"Good"}),e.jsx(n.td,{children:"Good"}),e.jsx(n.td,{children:"Good"}),e.jsx(n.td,{children:"Excellent (React Aria)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Ecosystem"}),e.jsx(n.td,{children:"React Aria"}),e.jsx(n.td,{children:"Standalone"}),e.jsx(n.td,{children:"Chakra"}),e.jsx(n.td,{children:"Radix"}),e.jsx(n.td,{children:"Bento"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Props API"}),e.jsx(n.td,{children:"Simple"}),e.jsx(n.td,{children:"Minimal"}),e.jsx(n.td,{children:"Styling-rich"}),e.jsx(n.td,{children:"Polymorphic"}),e.jsx(n.td,{children:"Comprehensive"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Bento's Advantage"}),": Combines React Aria's battle-tested accessibility implementation with Bento's flexible slot-based customization system, providing the most reliable foundation with the most customization options. The props API is the most comprehensive, supporting everything from basic usage to advanced slot-based overrides."]}),`
`,e.jsx(n.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<VisuallyHidden>
  This text is hidden visually but available to screen readers
</VisuallyHidden>
`})}),`
`,e.jsx(n.h3,{id:"skip-link-pattern",children:"Skip link pattern"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<VisuallyHidden as="a" href="#main-content">
  Skip to main content
</VisuallyHidden>
`})})]})}function j(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{j as default};
