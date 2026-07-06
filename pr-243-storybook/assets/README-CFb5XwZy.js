import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-De4EwHKN.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-C_nayckk.js";import{t as s}from"./mdx-react-shim-BMTn6U8D.js";import{Props as c,n as l,t as u}from"./scroll-lock.stories-DalZCSKd.js";var d,f=e((()=>{d=`import { ScrollLock } from '@bento/scroll-lock';
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
`})),p,m=e((()=>{p=`import { useScrollLock } from '@bento/scroll-lock';
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
`})),h,g=e((()=>{h=`import { ScrollLock } from '@bento/scroll-lock';
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
`}));function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a,{of:l,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`scrolllock`,children:`ScrollLock`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`@bento/scroll-lock`}),` package provides both a `,(0,y.jsx)(t.code,{children:`ScrollLock`}),` component and a
`,(0,y.jsx)(t.code,{children:`useScrollLock`}),` hook that prevent background scrolling while overlays, modals,
or other UI elements require user focus. This primitive wraps React Aria's
`,(0,y.jsx)(t.code,{children:`usePreventScroll`}),` hook, adding Bento-specific data attributes for debugging and
styling.`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/scroll-lock
`})}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,y.jsx)(t.code,{children:`ScrollLock`}),` component:`]}),`
`,(0,y.jsx)(i,{of:c}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,y.jsxs)(t.p,{children:[`The simplest usage is to render the `,(0,y.jsx)(t.code,{children:`ScrollLock`}),` component. It will prevent
scrolling while mounted.`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:d}),`
`,(0,y.jsx)(t.h3,{id:`using-the-hook`,children:`Using the Hook`}),`
`,(0,y.jsxs)(t.p,{children:[`For more control or when building custom components, use the `,(0,y.jsx)(t.code,{children:`useScrollLock`}),`
hook directly.`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:p}),`
`,(0,y.jsx)(t.h3,{id:`modal-integration`,children:`Modal Integration`}),`
`,(0,y.jsx)(t.p,{children:`ScrollLock is commonly used with modals and overlays to prevent background
scrolling while the overlay is active.`}),`
`,(0,y.jsx)(r,{language:`tsx`,code:h}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`ScrollLock`}),` component automatically handles accessibility features:`]}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Screen Reader Compatibility`}),`: Doesn't interfere with virtual cursor navigation`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Focus Management Integration`}),`: Works seamlessly with React Aria's `,(0,y.jsx)(t.code,{children:`useFocusScope`}),` and `,(0,y.jsx)(t.code,{children:`useModal`})]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Keyboard Support`}),`: Properly handles all keyboard-based scrolling methods`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.strong,{children:`Touch Accessibility`}),`: Maintains touch event handling on mobile devices while preventing scroll`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`react-aria-integration`,children:`React Aria Integration`}),`
`,(0,y.jsxs)(t.p,{children:[`ScrollLock wraps React Aria's `,(0,y.jsx)(t.code,{children:`usePreventScroll`}),` hook, which provides
comprehensive scroll prevention including scrollbar compensation, mobile
support, and proper cleanup. The Bento wrapper adds data attributes for
debugging and provides a consistent API with other Bento hooks and components.`]}),`
`,(0,y.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,y.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,y.jsxs)(t.p,{children:[`ScrollLock is created using the `,(0,y.jsx)(t.code,{children:`@bento/slots`}),` package and supports the standard
`,(0,y.jsx)(t.code,{children:`slot`}),` and `,(0,y.jsx)(t.code,{children:`slots`}),` props for integration with parent components. Since
ScrollLock doesn't render DOM elements, it doesn't define internal slot
assignments.`]}),`
`,(0,y.jsxs)(t.p,{children:[`See the `,(0,y.jsx)(t.code,{children:`@bento/slots`}),` package for more information on how to use the `,(0,y.jsx)(t.code,{children:`slot`}),` and
`,(0,y.jsx)(t.code,{children:`slots`}),` properties.`]}),`
`,(0,y.jsx)(t.h3,{id:`styling`,children:`Styling`}),`
`,(0,y.jsxs)(t.p,{children:[`Since ScrollLock doesn't render any DOM elements, styling is applied through the
data attributes it adds to `,(0,y.jsx)(t.code,{children:`document.body`}),`. You can use these attributes to
style your application based on scroll lock state.`]}),`
`,(0,y.jsxs)(t.p,{children:[`The following data attributes are applied to `,(0,y.jsx)(t.code,{children:`document.body`}),`:`]}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Attribute`}),(0,y.jsx)(t.th,{children:`Description`}),(0,y.jsx)(t.th,{children:`Example Values`})]})}),(0,y.jsx)(t.tbody,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`data-scroll-locked`})}),(0,y.jsx)(t.td,{children:`Indicates when scroll lock is active`}),(0,y.jsx)(t.td,{children:`"true"`})]})})]}),`
`,(0,y.jsx)(t.p,{children:`These data attributes can be targeted in your CSS:`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-css`,children:`body[data-scroll-locked="true"] {
  /* Styles when scroll is locked */
}
`})}),`
`,(0,y.jsx)(t.h2,{id:`server-side-rendering`,children:`Server-Side Rendering`}),`
`,(0,y.jsxs)(t.p,{children:[`ScrollLock is SSR-safe and will not execute scroll prevention logic on the
server. The component and hook check for the existence of `,(0,y.jsx)(t.code,{children:`document`}),` before
applying scroll prevention, ensuring compatibility with server-side rendering
environments.`]})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),s(),o(),u(),f(),m(),g()}))();export{v as default};