import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-DewfvHrx.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-B7CBngPy.js";import{t as s}from"./mdx-react-shim-ChO7TP6O.js";import{Props as c,n as l,t as u}from"./portal.stories-BIoBcU4_.js";var d,f=e((()=>{d=`import { Portal } from '@bento/portal';
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
`})),p,m=e((()=>{p=`import { Portal } from '@bento/portal';
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
`})),h,g=e((()=>{h=`import { Portal } from '@bento/portal';
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
`}));function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a,{of:l,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`portal`,children:`Portal`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`@bento/portal`}),` package exports the `,(0,y.jsx)(t.strong,{children:`Portal`}),` component, which renders
children into a target DOM container outside the normal React component
hierarchy. Portal solves common UI challenges like z-index conflicts, clipping
issues, and overlay stacking by rendering content to `,(0,y.jsx)(t.code,{children:`document.body`}),` or a custom
container.`]}),`
`,(0,y.jsxs)(t.p,{children:[`Portal integrates seamlessly with React ARIA's `,(0,y.jsx)(t.code,{children:`UNSAFE_PortalProvider`}),` while
remaining fully independent and functional without it.`]}),`
`,(0,y.jsx)(t.h2,{id:`use-cases`,children:`Use Cases`}),`
`,(0,y.jsx)(t.p,{children:`Portal is essential for UI elements that need to escape their parent container's boundaries:`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Overlays and Modals`}),`: Prevent clipping and z-index conflicts`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Dropdown Menus`}),`: Render above all other content regardless of parent constraints`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Tooltips`}),`: Position freely without overflow hidden issues`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Toast Notifications`}),`: Display at the application level`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Popovers and Dialogs`}),`: Ensure proper stacking and positioning`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/portal
`})}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`@bento/portal`}),` package exports the `,(0,y.jsx)(t.code,{children:`Portal`}),` component:`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:d}),`
`,(0,y.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,y.jsx)(t.code,{children:`Portal`}),` component:`]}),`
`,(0,y.jsx)(i,{of:c}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,y.jsxs)(t.p,{children:[`Basic portal usage that renders content to `,(0,y.jsx)(t.code,{children:`document.body`}),`:`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:d}),`
`,(0,y.jsx)(t.h3,{id:`custom-container`,children:`Custom Container`}),`
`,(0,y.jsxs)(t.p,{children:[`Portal can render to a custom container instead of `,(0,y.jsx)(t.code,{children:`document.body`}),`. This is
useful when you need to control the exact DOM location where portal content
appears:`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:p}),`
`,(0,y.jsx)(t.h2,{id:`react-aria-integration`,children:`React ARIA Integration`}),`
`,(0,y.jsxs)(t.p,{children:[`Portal optionally integrates with React ARIA's `,(0,y.jsx)(t.code,{children:`UNSAFE_PortalProvider`}),` to
provide consistent portal container management across your application. This
example demonstrates how Portal automatically detects and uses the
PortalProvider's container:`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:h}),`
`,(0,y.jsx)(t.p,{children:(0,y.jsx)(t.strong,{children:`Container priority:`})}),`
`,(0,y.jsxs)(t.ol,{children:[`
`,(0,y.jsxs)(t.li,{children:[`Explicit `,(0,y.jsx)(t.code,{children:`container`}),` prop (highest priority)`]}),`
`,(0,y.jsxs)(t.li,{children:[`React ARIA's `,(0,y.jsx)(t.code,{children:`UNSAFE_PortalProvider`}),` container (via `,(0,y.jsx)(t.code,{children:`useUNSAFE_PortalContext`}),`)`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`document.body`}),` (fallback)`]}),`
`]}),`
`,(0,y.jsx)(t.p,{children:(0,y.jsx)(t.strong,{children:`Benefits:`})}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Stacking context`}),`: All overlays share the same stacking context`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Custom location`}),`: Control where overlays render in DOM`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Multiple overlays`}),`: Proper stacking when multiple portals/overlays are open`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`React ARIA compatibility`}),`: Works seamlessly with React ARIA components`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Graceful degradation`}),`: Works without React ARIA installed`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`ssr-safety`,children:`SSR Safety`}),`
`,(0,y.jsxs)(t.p,{children:[`Portal is SSR-safe and will not render content on the server. The `,(0,y.jsx)(t.code,{children:`mounted`}),` prop
should be set to `,(0,y.jsx)(t.code,{children:`true`}),` only after the component has mounted on the client:`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-tsx`,children:`function MyComponent() {
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
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.p,{children:`Portal is designed with accessibility in mind:`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Semantic HTML`}),`: Portal doesn't interfere with semantic HTML structure`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Screen Reader Support`}),`: Content rendered through Portal remains accessible to screen readers`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Focus Management`}),`: Portal doesn't trap or redirect focus - implement your own focus management as needed for modals/dialogs`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Keyboard Navigation`}),`: Portal preserves keyboard navigation of its content`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`ARIA Support`}),`: All ARIA attributes applied to portal content are preserved`]}),`
`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`Note`}),`: Portal is a rendering utility and doesn't provide built-in focus
*trapping or modal behavior. For accessible modals and dialogs, combine Portal
*with proper focus management and ARIA attributes.`]}),`
`,(0,y.jsx)(t.h2,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,y.jsx)(t.p,{children:`Portal applies the following data attributes to portal content:`}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Attribute`}),(0,y.jsx)(t.th,{children:`Description`}),(0,y.jsx)(t.th,{children:`Example Values`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`data-portal`})}),(0,y.jsx)(t.td,{children:`Marks content rendered via portal`}),(0,y.jsx)(t.td,{children:`"true"`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`data-mounted`})}),(0,y.jsx)(t.td,{children:`Whether portal content has mounted`}),(0,y.jsx)(t.td,{children:`"true" / "false"`})]})]})]}),`
`,(0,y.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,y.jsxs)(t.p,{children:[`Portal is a rendering utility component that doesn't render its own DOM
elements. Instead, it renders children into a target container using React's
`,(0,y.jsx)(t.code,{children:`createPortal`}),`. Because of this, Portal doesn't introduce internal slots like
other Bento components.`]}),`
`,(0,y.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,y.jsxs)(t.p,{children:[`Portal is created using the `,(0,y.jsx)(t.code,{children:`@bento/slots`}),` package via `,(0,y.jsx)(t.code,{children:`withSlots('BentoPortal', ...)`}),`, which means it supports the standard `,(0,y.jsx)(t.code,{children:`slot`}),` and `,(0,y.jsx)(t.code,{children:`slots`}),` props for
integration with parent components. However, Portal itself doesn't define any
internal slot assignments since it acts as a transparent rendering boundary.`]}),`
`,(0,y.jsxs)(t.p,{children:[`See the `,(0,y.jsx)(t.code,{children:`@bento/slots`}),` package for more information on how to use the `,(0,y.jsx)(t.code,{children:`slot`}),` and
`,(0,y.jsx)(t.code,{children:`slots`}),` properties.`]}),`
`,(0,y.jsx)(t.h3,{id:`styling`,children:`Styling`}),`
`,(0,y.jsxs)(t.p,{children:[`Portal applies data attributes to the children it renders, making it possible to
style portal content based on its state. Since Portal doesn't render wrapper
elements, you should apply `,(0,y.jsx)(t.code,{children:`className`}),` or `,(0,y.jsx)(t.code,{children:`style`}),` props directly to the children
you pass to Portal.`]}),`
`,(0,y.jsx)(t.p,{children:`The data attributes Portal applies can be used in your CSS selectors:`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-css`,children:`/* Target all portal content */
[data-portal="true"] {
  /* Styles for content rendered through Portal */
}

/* Target mounted portal content */
[data-portal="true"][data-mounted="true"] {
  /* Styles for mounted portal content */
  animation: fadeIn 200ms ease-in;
}
`})}),`
`,(0,y.jsxs)(t.p,{children:[`When using Portal with other Bento components like `,(0,y.jsx)(t.code,{children:`Container`}),`, you can apply
styling through those components:`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-tsx`,children:`<Portal mounted={mounted}>
  <Container className="my-overlay">
    <Text>Styled portal content</Text>
  </Container>
</Portal>
`})}),`
`,(0,y.jsx)(t.p,{children:`The data attributes will be applied to the Container element, allowing you to
target it:`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-css`,children:`.my-overlay[data-portal="true"] {
  /* Your custom styles */
}
`})})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),s(),o(),u(),f(),m(),g()}))();export{v as default};