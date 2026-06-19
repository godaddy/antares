import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-CRgdf9dv.js";import{S as n,s as r,u as i}from"./blocks-GFy_nu_3.js";import{t as a}from"./mdx-react-shim-onz8FZyT.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Portal`}),`
`,(0,c.jsx)(t.h1,{id:`primitive-design-review-pdr-portal`,children:`Primitive Design Review (PDR): Portal`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsxs)(t.p,{children:[`Render children into a target DOM container (default `,(0,c.jsx)(t.code,{children:`document.body`}),`) to avoid
clipping and establish consistent layering for overlays, drawers, popovers,
toasts, etc.`]}),`
`,(0,c.jsx)(t.h2,{id:`requirements`,children:`Requirements`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Headless placement utility using React portals`}),`
`,(0,c.jsxs)(t.li,{children:[`Default container is `,(0,c.jsx)(t.code,{children:`document.body`}),` but can be overridden to allow custom container`]}),`
`,(0,c.jsxs)(t.li,{children:[`SSR-safe: avoid accessing `,(0,c.jsx)(t.code,{children:`document`}),` before mount`]}),`
`,(0,c.jsxs)(t.li,{children:[`Works with slots, `,(0,c.jsx)(t.code,{children:`use-props`}),`, and `,(0,c.jsx)(t.code,{children:`data-attributes`})]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`integration`,children:`Integration`}),`
`,(0,c.jsx)(t.p,{children:`This primitive could be consumed by the following components:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Overlay components (modals, dialogs, drawers)`}),`
`,(0,c.jsx)(t.li,{children:`Positioning-dependent components (tooltips, popovers, dropdown menus)`}),`
`,(0,c.jsx)(t.li,{children:`Notification systems (toasts, alerts)`}),`
`,(0,c.jsx)(t.li,{children:`Any component requiring rendering outside its parent hierarchy`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`In MFE scenarios, the host orchestrator provides the container Element to
`,(0,c.jsx)(t.code,{children:`Portal`}),`; clients should not assume `,(0,c.jsx)(t.code,{children:`document.body`}),`. In no-host P2P scenarios,
the elected leader creates and exposes `,(0,c.jsx)(t.code,{children:`Stack`}),` roots; MFEs should resolve the
container via orchestrator bus before rendering`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsx)(t.p,{children:`The Portal primitive is built using:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`React DOM's `,(0,c.jsx)(t.code,{children:`createPortal`})]}),`: Core API for rendering outside the component tree`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.code,{children:`withSlots`})}),`: Bento's slot system for composability`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.code,{children:`useProps`})}),`: Bento's prop handling with render prop support`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React hooks`}),`: `,(0,c.jsx)(t.code,{children:`useEffect`}),`, `,(0,c.jsx)(t.code,{children:`useState`}),` for mount detection and lifecycle management`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The primitive does not handle:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Focus management (delegated to FocusLock primitive)`}),`
`,(0,c.jsx)(t.li,{children:`Scroll prevention (delegated to other primitives)`}),`
`,(0,c.jsx)(t.li,{children:`Backdrop rendering (delegated to Underlay primitive)`}),`
`,(0,c.jsx)(t.li,{children:`Positioning logic (delegated to positioning utilities)`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`This separation ensures Portal remains a minimal, reusable building block.`}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-portalprovider-integration`,children:`React Aria PortalProvider integration`}),`
`,(0,c.jsxs)(t.p,{children:[`The Portal primitive `,(0,c.jsxs)(t.strong,{children:[`integrates with React ARIA's `,(0,c.jsx)(t.code,{children:`UNSAFE_PortalProvider`})]}),` while remaining independent and flexible.
`,(0,c.jsx)(t.strong,{children:`Reference:`}),` `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/PortalProvider.html`,rel:`nofollow`,children:`React ARIA PortalProvider`})]}),`
`,(0,c.jsx)(t.h3,{id:`portalprovider-integration`,children:`PortalProvider Integration`}),`
`,(0,c.jsxs)(t.p,{children:[`Portal checks for React ARIA's `,(0,c.jsx)(t.code,{children:`UNSAFE_PortalProvider`}),` and uses it when available:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`const portalContext = useUNSAFE_PortalContext();
const portalContainer = portalContext?.getContainer?.();
const container = containerProp || portalContainer || document.body;
`})}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Container Priority:`})}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Explicit `,(0,c.jsx)(t.code,{children:`container`}),` prop (highest priority)`]}),`
`,(0,c.jsxs)(t.li,{children:[`React ARIA's `,(0,c.jsx)(t.code,{children:`UNSAFE_PortalProvider`}),` container (via `,(0,c.jsx)(t.code,{children:`useUNSAFE_PortalContext`}),`)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`document.body`}),` (fallback)`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`why-this-matters`,children:`Why This Matters`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`With UNSAFE_PortalProvider:`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { UNSAFE_PortalProvider } from 'react-aria';
import { Portal } from '@bento/portal';
import { useRef } from 'react';

function App() {
  const containerRef = useRef(null);

  return (
    <>
      <UNSAFE_PortalProvider getContainer={() => containerRef.current}>
        <YourApp>
          {/* Portal automatically uses PortalProvider's container */}
          <Portal>
            <Container>
              <Text>This renders in the custom container</Text>
            </Container>
          </Portal>
        </YourApp>
      </UNSAFE_PortalProvider>

      <Container ref={containerRef} className="portal-container" />
    </>
  );
}
`})}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Benefits:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Stacking context`}),`: All overlays share the same stacking context`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Custom location`}),`: Control where overlays render in DOM`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Multiple overlays`}),`: Proper stacking when multiple portals/overlays are open`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React ARIA compatibility`}),`: Works seamlessly with React ARIA components`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Without PortalProvider:`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<App>
  {/* Portal works standalone */}
  <Portal>
    <Container>
      <Text>This renders to document.body</Text>
    </Container>
  </Portal>
</App>
`})}),`
`,(0,c.jsx)(t.p,{children:`Portal remains fully functional without PortalProvider, falling back to document.body, or a provided container.`}),`
`,(0,c.jsx)(t.h3,{id:`compatibility-with-react-aria-hooks`,children:`Compatibility with React ARIA Hooks`}),`
`,(0,c.jsxs)(t.p,{children:[`Portal works seamlessly with React ARIA's overlay hooks and `,(0,c.jsx)(t.code,{children:`UNSAFE_PortalProvider`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { useModalOverlay } from 'react-aria';
import { UNSAFE_PortalProvider } from 'react-aria';
import { Portal } from '@bento/portal';
import { Container } from '@bento/container';
import { useRef } from 'react';

function App() {
  const portalContainerRef = useRef(null);

  return (
    <>
      <UNSAFE_PortalProvider getContainer={() => portalContainerRef.current}>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Container>
            <Text>Modal content</Text>
          </Container>
        </Modal>
      </UNSAFE_PortalProvider>

      <Container ref={portalContainerRef} className="overlay-container" />
    </>
  );
}

function Modal({ isOpen, onClose, children }) {
  const ref = useRef();
  const { modalProps, underlayProps } = useModalOverlay(
    { isOpen, onClose },
    { isOpen },
    ref
  );

  return (
    <Portal>
      {/* React ARIA hooks work correctly */}
      {/* Portal uses PortalProvider's container */}
      <Container {...underlayProps}>
        <Container {...modalProps} ref={ref}>
          {children}
        </Container>
      </Container>
    </Portal>
  );
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Key Point`}),`: Portal does not interfere with React ARIA's overlay behavior. It only changes the render location.`]}),`
`,(0,c.jsx)(t.h3,{id:`props-interface`,children:`Props Interface`}),`
`,(0,c.jsx)(t.p,{children:`We expect the following props to be passed to the Portal component:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface PortalProps extends Slots {
  /**
   * The container to render the portal content into.
   */
  container?: Element;

  /**
   * Should the portal content be mounted, false by default for server-side rendering compatibility
   * Should not render children if not mounted.
   */
  mounted: boolean;

  /**
   * The content to render inside the portal.
   */
  children?: ReactNode;
}
`})}),`
`,(0,c.jsxs)(t.h3,{id:`expected-data--attributes`,children:[`Expected `,(0,c.jsx)(t.code,{children:`data-*`}),` Attributes`]}),`
`,(0,c.jsx)(t.p,{children:`The Portal component itself does not render any DOM elements by default, so data attributes apply to content customized via slots:`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-portal`})}),(0,c.jsx)(t.td,{children:`Marks content rendered via portal`}),(0,c.jsx)(t.td,{children:`"true"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-mounted`})}),(0,c.jsx)(t.td,{children:`Whether portal content has mounted`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]})]})]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};