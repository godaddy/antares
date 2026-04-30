import{j as e}from"./iframe-Cmkc_zNT.js";import{useMDXComponents as i}from"./index-e0NckJKE.js";import{M as a,S as o,A as l}from"./blocks-CCA1xv68.js";import{S as c,P as d}from"./portal.stories-tj4B5Rpk.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CNYGrzkj.js";import"./index-_sy_8S40.js";import"./index-zTpLJ-5v.js";import"./index-K6TagP66.js";import"./slots-CRAqpFQb.js";import"./index-DLl4a_pS.js";import"./index-CLj43KZG.js";import"./index-CvCxQCUq.js";import"./mergeProps-COV7KoS4.js";import"./SSRProvider-C-Mckw8c.js";import"./clsx-B-dksMZM.js";import"./PortalProvider-PXWhfH9G.js";import"./index-D9VeQ76N.js";import"./index-Nh_7LiZG.js";import"./index-ChJpH0wg.js";const r=`import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React, { useState, useEffect } from 'react';

export function BasicExample() {
  const [mounted, setMounted] = useState(false);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <Portal mounted={mounted}>
      <Container data-testid="basic-portal">
        <Text>Portal content</Text>
      </Container>
    </Portal>
  );
}
`,h=`import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React, { useState, useEffect, useRef } from 'react';

export function CustomContainerExample() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <>
      <div id="custom-portal-container" ref={containerRef} />
      <Portal container={containerRef.current || undefined} mounted={mounted}>
        <Container data-testid="custom-content">
          <Text>Custom container content</Text>
        </Container>
      </Portal>
    </>
  );
}
`,p=`import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
import { UNSAFE_PortalProvider } from '@react-aria/overlays';
/* v8 ignore next */
import React, { useState, useEffect, useRef } from 'react';

/**
 * Example demonstrating Portal with React ARIA's UNSAFE_PortalProvider.
 *
 * This shows how Portal automatically integrates with react-aria's
 * UNSAFE_PortalProvider to use a custom container for portal content.
 */
export function PortalProviderExample() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(function mount() {
    setMounted(true);
  }, []);

  return (
    <>
      <div ref={containerRef} data-testid="portal-container" />
      <UNSAFE_PortalProvider getContainer={() => containerRef.current}>
        <Portal mounted={mounted}>
          <Container data-testid="portal-provider-portal">
            <Text>Portal content using PortalProvider</Text>
            <Text>Container: {containerRef.current ? 'Custom via PortalProvider' : 'Default (document.body)'}</Text>
          </Container>
        </Portal>
      </UNSAFE_PortalProvider>
    </>
  );
}
`;function s(n){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c,name:"Overview"}),`
`,e.jsx(t.h1,{id:"portal",children:"Portal"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/portal"})," package exports the ",e.jsx(t.strong,{children:"Portal"}),` component, which renders
children into a target DOM container outside the normal React component
hierarchy. Portal solves common UI challenges like z-index conflicts, clipping
issues, and overlay stacking by rendering content to `,e.jsx(t.code,{children:"document.body"}),` or a custom
container.`]}),`
`,e.jsxs(t.p,{children:["Portal integrates seamlessly with React ARIA's ",e.jsx(t.code,{children:"UNSAFE_PortalProvider"}),` while
remaining fully independent and functional without it.`]}),`
`,e.jsx(t.h2,{id:"use-cases",children:"Use Cases"}),`
`,e.jsx(t.p,{children:"Portal is essential for UI elements that need to escape their parent container's boundaries:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Overlays and Modals"}),": Prevent clipping and z-index conflicts"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Dropdown Menus"}),": Render above all other content regardless of parent constraints"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Tooltips"}),": Position freely without overflow hidden issues"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Toast Notifications"}),": Display at the application level"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Popovers and Dialogs"}),": Ensure proper stacking and positioning"]}),`
`]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @bento/portal
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/portal"})," package exports the ",e.jsx(t.code,{children:"Portal"})," component:"]}),`
`,e.jsx(o,{language:"tsx",code:r}),`
`,e.jsxs(t.p,{children:["The following properties are available to be used on the ",e.jsx(t.code,{children:"Portal"})," component:"]}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic",children:"Basic"}),`
`,e.jsxs(t.p,{children:["Basic portal usage that renders content to ",e.jsx(t.code,{children:"document.body"}),":"]}),`
`,e.jsx(o,{language:"tsx",code:r}),`
`,e.jsx(t.h3,{id:"custom-container",children:"Custom Container"}),`
`,e.jsxs(t.p,{children:["Portal can render to a custom container instead of ",e.jsx(t.code,{children:"document.body"}),`. This is
useful when you need to control the exact DOM location where portal content
appears:`]}),`
`,e.jsx(o,{language:"tsx",code:h}),`
`,e.jsx(t.h2,{id:"react-aria-integration",children:"React ARIA Integration"}),`
`,e.jsxs(t.p,{children:["Portal optionally integrates with React ARIA's ",e.jsx(t.code,{children:"UNSAFE_PortalProvider"}),` to
provide consistent portal container management across your application. This
example demonstrates how Portal automatically detects and uses the
PortalProvider's container:`]}),`
`,e.jsx(o,{language:"tsx",code:p}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Container priority:"})}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["Explicit ",e.jsx(t.code,{children:"container"})," prop (highest priority)"]}),`
`,e.jsxs(t.li,{children:["React ARIA's ",e.jsx(t.code,{children:"UNSAFE_PortalProvider"})," container (via ",e.jsx(t.code,{children:"useUNSAFE_PortalContext"}),")"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"document.body"})," (fallback)"]}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Benefits:"})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Stacking context"}),": All overlays share the same stacking context"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Custom location"}),": Control where overlays render in DOM"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Multiple overlays"}),": Proper stacking when multiple portals/overlays are open"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"React ARIA compatibility"}),": Works seamlessly with React ARIA components"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Graceful degradation"}),": Works without React ARIA installed"]}),`
`]}),`
`,e.jsx(t.h2,{id:"ssr-safety",children:"SSR Safety"}),`
`,e.jsxs(t.p,{children:["Portal is SSR-safe and will not render content on the server. The ",e.jsx(t.code,{children:"mounted"}),` prop
should be set to `,e.jsx(t.code,{children:"true"})," only after the component has mounted on the client:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`function MyComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Portal mounted={mounted}>
      <Container>Content</Container>
    </Portal>
  );
}
`})}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.p,{children:"Portal is designed with accessibility in mind:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Semantic HTML"}),": Portal doesn't interfere with semantic HTML structure"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Screen Reader Support"}),": Content rendered through Portal remains accessible to screen readers"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Focus Management"}),": Portal doesn't trap or redirect focus - implement your own focus management as needed for modals/dialogs"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Keyboard Navigation"}),": Portal preserves keyboard navigation of its content"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"ARIA Support"}),": All ARIA attributes applied to portal content are preserved"]}),`
`]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note"}),`: Portal is a rendering utility and doesn't provide built-in focus
*trapping or modal behavior. For accessible modals and dialogs, combine Portal
*with proper focus management and ARIA attributes.`]}),`
`,e.jsx(t.h2,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(t.p,{children:"Portal applies the following data attributes to portal content:"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Attribute"}),e.jsx(t.th,{children:"Description"}),e.jsx(t.th,{children:"Example Values"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-portal"})}),e.jsx(t.td,{children:"Marks content rendered via portal"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-mounted"})}),e.jsx(t.td,{children:"Whether portal content has mounted"}),e.jsx(t.td,{children:'"true" / "false"'})]})]})]}),`
`,e.jsx(t.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(t.p,{children:[`Portal is a rendering utility component that doesn't render its own DOM
elements. Instead, it renders children into a target container using React's
`,e.jsx(t.code,{children:"createPortal"}),`. Because of this, Portal doesn't introduce internal slots like
other Bento components.`]}),`
`,e.jsx(t.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(t.p,{children:["Portal is created using the ",e.jsx(t.code,{children:"@bento/slots"})," package via ",e.jsx(t.code,{children:"withSlots('BentoPortal', ...)"}),", which means it supports the standard ",e.jsx(t.code,{children:"slot"})," and ",e.jsx(t.code,{children:"slots"}),` props for
integration with parent components. However, Portal itself doesn't define any
internal slot assignments since it acts as a transparent rendering boundary.`]}),`
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.code,{children:"@bento/slots"})," package for more information on how to use the ",e.jsx(t.code,{children:"slot"}),` and
`,e.jsx(t.code,{children:"slots"})," properties."]}),`
`,e.jsx(t.h3,{id:"styling",children:"Styling"}),`
`,e.jsxs(t.p,{children:[`Portal applies data attributes to the children it renders, making it possible to
style portal content based on its state. Since Portal doesn't render wrapper
elements, you should apply `,e.jsx(t.code,{children:"className"})," or ",e.jsx(t.code,{children:"style"}),` props directly to the children
you pass to Portal.`]}),`
`,e.jsx(t.p,{children:"The data attributes Portal applies can be used in your CSS selectors:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`/* Target all portal content */
[data-portal="true"] {
  /* Styles for content rendered through Portal */
}

/* Target mounted portal content */
[data-portal="true"][data-mounted="true"] {
  /* Styles for mounted portal content */
  animation: fadeIn 200ms ease-in;
}
`})}),`
`,e.jsxs(t.p,{children:["When using Portal with other Bento components like ",e.jsx(t.code,{children:"Container"}),`, you can apply
styling through those components:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`<Portal mounted={mounted}>
  <Container className="my-overlay">
    <Text>Styled portal content</Text>
  </Container>
</Portal>
`})}),`
`,e.jsx(t.p,{children:`The data attributes will be applied to the Container element, allowing you to
target it:`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`.my-overlay[data-portal="true"] {
  /* Your custom styles */
}
`})})]})}function I(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s(n)}export{I as default};
