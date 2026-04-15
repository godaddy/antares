import{j as e}from"./iframe-gpas8HPj.js";import{useMDXComponents as i}from"./index-BO1cnAZt.js";import{M as s,A as l,S as t}from"./blocks-os_26gS0.js";import{S as c,P as a}from"./scroll-lock.stories-Div4AOD3.js";import"./preload-helper-PPVm8Dsz.js";import"./index-jOpBUq2T.js";import"./index-Cd_0CHer.js";import"./index-DK9wLoCf.js";import"./index-DrFu-skq.js";import"./index-BZHuXJvv.js";import"./slots-BfqWSziv.js";import"./index-DVowgfjg.js";import"./index-CLj43KZG.js";import"./index-BdfEQW-n.js";import"./mergeProps-BoSjtT4X.js";import"./clsx-BsewrBuq.js";import"./usePreventScroll-BvO-f65k.js";import"./DOMFunctions-DY9RYDsQ.js";import"./keyboard-BlyT3oQC.js";import"./platform-BULRNHlZ.js";import"./index-BBn-h_xa.js";import"./index-DEdfqYL7.js";import"./index-BuYRBRS2.js";const d=`import { ScrollLock } from '@bento/scroll-lock';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function BasicExample() {
  return (
    <>
      {/* Scrollable page content */}
      <Container style={{ padding: '1rem' }}>
        <Text as="h1">Page with Scroll Lock</Text>
        <Text>Try to scroll the page - scrolling is prevented when ScrollLock is active.</Text>

        {/* Create enough content to require scrolling */}
        {Array.from({ length: 50 }, (_, i) => (
          <Text key={i} style={{ marginBottom: '0.5rem' }} as="p">
            This is paragraph {i + 1}. The page has enough content to scroll, but the ScrollLock component prevents
            background scrolling.
          </Text>
        ))}
      </Container>

      {/* ScrollLock prevents scrolling of the above content */}
      <ScrollLock />
    </>
  );
}
`,h=`import { useScrollLock } from '@bento/scroll-lock';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function HookExample() {
  // Use the hook directly for more control
  useScrollLock({ isDisabled: false });

  return (
    <Container data-testid="hook-content" style={{ padding: '1rem' }}>
      <Text as="h1">Using useScrollLock Hook</Text>
      <Text>This component uses the useScrollLock hook directly.</Text>
      <Text>Background scrolling is prevented while this component is mounted.</Text>

      {/* Create enough content to require scrolling */}
      {Array.from({ length: 50 }, (_, i) => (
        <Text key={i} style={{ marginBottom: '0.5rem' }} as="p">
          This is paragraph {i + 1}. The useScrollLock hook prevents scrolling of this content.
        </Text>
      ))}
    </Container>
  );
}
`,p=`import { ScrollLock } from '@bento/scroll-lock';
import { Container } from '@bento/container';
import { Text } from '@bento/text';
/* v8 ignore next */
import React, { useState } from 'react';

export function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Scrollable page content */}
      <Container style={{ padding: '1rem' }}>
        <Text as="h1">Modal with Scroll Lock</Text>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Text>
          Click the button to open a modal. Notice how background scrolling is prevented when the modal is open.
        </Text>

        {/* Create enough content to require scrolling */}
        {Array.from({ length: 50 }, (_, i) => (
          <Text key={i} style={{ marginBottom: '0.5rem' }}>
            This is paragraph {i + 1}. This background content cannot be scrolled when the modal is open.
          </Text>
        ))}
      </Container>

      {/* Modal overlay - conditionally rendered */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <Container
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <span style={{ display: 'none' }}>backdrop</span>
          </Container>

          {/* Modal content */}
          <Container
            data-testid="modal-content"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
              zIndex: 1000,
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <Text as="h2" style={{ marginTop: 0 }}>
              Modal Dialog
            </Text>
            <Text>Scroll lock is active. Background scrolling is prevented.</Text>
            <Text>This modal content can still be scrolled if it overflows:</Text>

            {/* Scrollable content within modal */}
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i} style={{ marginBottom: '0.5rem' }}>
                Modal paragraph {i + 1}. This content can scroll within the modal.
              </Text>
            ))}

            <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '1rem' }}>
              Close Modal
            </button>
          </Container>

          {/* ScrollLock prevents background scrolling */}
          <ScrollLock />
        </>
      )}
    </>
  );
}
`;function r(n){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c,name:"Overview"}),`
`,e.jsx(o.h1,{id:"scrolllock",children:"ScrollLock"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"@bento/scroll-lock"})," package provides both a ",e.jsx(o.code,{children:"ScrollLock"}),` component and a
`,e.jsx(o.code,{children:"useScrollLock"}),` hook that prevent background scrolling while overlays, modals,
or other UI elements require user focus. This primitive wraps React Aria's
`,e.jsx(o.code,{children:"usePreventScroll"}),` hook, adding Bento-specific data attributes for debugging and
styling.`]}),`
`,e.jsx(o.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-bash",children:`npm install --save @bento/scroll-lock
`})}),`
`,e.jsx(o.h2,{id:"props",children:"Props"}),`
`,e.jsxs(o.p,{children:["The following properties are available to be used on the ",e.jsx(o.code,{children:"ScrollLock"})," component:"]}),`
`,e.jsx(l,{of:a}),`
`,e.jsx(o.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(o.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsxs(o.p,{children:["The simplest usage is to render the ",e.jsx(o.code,{children:"ScrollLock"}),` component. It will prevent
scrolling while mounted.`]}),`
`,e.jsx(t,{language:"tsx",code:d}),`
`,e.jsx(o.h3,{id:"using-the-hook",children:"Using the Hook"}),`
`,e.jsxs(o.p,{children:["For more control or when building custom components, use the ",e.jsx(o.code,{children:"useScrollLock"}),`
hook directly.`]}),`
`,e.jsx(t,{language:"tsx",code:h}),`
`,e.jsx(o.h3,{id:"modal-integration",children:"Modal Integration"}),`
`,e.jsx(o.p,{children:`ScrollLock is commonly used with modals and overlays to prevent background
scrolling while the overlay is active.`}),`
`,e.jsx(t,{language:"tsx",code:p}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"ScrollLock"})," component automatically handles accessibility features:"]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Screen Reader Compatibility"}),": Doesn't interfere with virtual cursor navigation"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Focus Management Integration"}),": Works seamlessly with React Aria's ",e.jsx(o.code,{children:"useFocusScope"})," and ",e.jsx(o.code,{children:"useModal"})]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Keyboard Support"}),": Properly handles all keyboard-based scrolling methods"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Touch Accessibility"}),": Maintains touch event handling on mobile devices while preventing scroll"]}),`
`]}),`
`,e.jsx(o.h2,{id:"react-aria-integration",children:"React Aria Integration"}),`
`,e.jsxs(o.p,{children:["ScrollLock wraps React Aria's ",e.jsx(o.code,{children:"usePreventScroll"}),` hook, which provides
comprehensive scroll prevention including scrollbar compensation, mobile
support, and proper cleanup. The Bento wrapper adds data attributes for
debugging and provides a consistent API with other Bento hooks and components.`]}),`
`,e.jsx(o.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(o.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(o.p,{children:["ScrollLock is created using the ",e.jsx(o.code,{children:"@bento/slots"}),` package and supports the standard
`,e.jsx(o.code,{children:"slot"})," and ",e.jsx(o.code,{children:"slots"}),` props for integration with parent components. Since
ScrollLock doesn't render DOM elements, it doesn't define internal slot
assignments.`]}),`
`,e.jsxs(o.p,{children:["See the ",e.jsx(o.code,{children:"@bento/slots"})," package for more information on how to use the ",e.jsx(o.code,{children:"slot"}),` and
`,e.jsx(o.code,{children:"slots"})," properties."]}),`
`,e.jsx(o.h3,{id:"styling",children:"Styling"}),`
`,e.jsxs(o.p,{children:[`Since ScrollLock doesn't render any DOM elements, styling is applied through the
data attributes it adds to `,e.jsx(o.code,{children:"document.body"}),`. You can use these attributes to
style your application based on scroll lock state.`]}),`
`,e.jsxs(o.p,{children:["The following data attributes are applied to ",e.jsx(o.code,{children:"document.body"}),":"]}),`
`,e.jsxs(o.table,{children:[e.jsx(o.thead,{children:e.jsxs(o.tr,{children:[e.jsx(o.th,{children:"Attribute"}),e.jsx(o.th,{children:"Description"}),e.jsx(o.th,{children:"Example Values"})]})}),e.jsx(o.tbody,{children:e.jsxs(o.tr,{children:[e.jsx(o.td,{children:e.jsx(o.code,{children:"data-scroll-locked"})}),e.jsx(o.td,{children:"Indicates when scroll lock is active"}),e.jsx(o.td,{children:'"true"'})]})})]}),`
`,e.jsx(o.p,{children:"These data attributes can be targeted in your CSS:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-css",children:`body[data-scroll-locked="true"] {
  /* Styles when scroll is locked */
}
`})}),`
`,e.jsx(o.h2,{id:"server-side-rendering",children:"Server-Side Rendering"}),`
`,e.jsxs(o.p,{children:[`ScrollLock is SSR-safe and will not execute scroll prevention logic on the
server. The component and hook check for the existence of `,e.jsx(o.code,{children:"document"}),` before
applying scroll prevention, ensuring compatibility with server-side rendering
environments.`]})]})}function P(n={}){const{wrapper:o}={...i(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(r,{...n})}):r(n)}export{P as default};
