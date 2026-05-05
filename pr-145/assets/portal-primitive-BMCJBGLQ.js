import{j as e}from"./iframe-COOHz61S.js";import{useMDXComponents as o}from"./index-DSxwjQyk.js";import{M as i}from"./blocks-ORDlmF0q.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8-rjpp1.js";import"./index-CL8R-hp8.js";import"./index-BgZMnLcl.js";import"./index-DrFu-skq.js";function t(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Architecture/PDRs/Portal"}),`
`,e.jsx(n.h1,{id:"primitive-design-review-pdr-portal",children:"Primitive Design Review (PDR): Portal"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(n.p,{children:["Render children into a target DOM container (default ",e.jsx(n.code,{children:"document.body"}),`) to avoid
clipping and establish consistent layering for overlays, drawers, popovers,
toasts, etc.`]}),`
`,e.jsx(n.h2,{id:"requirements",children:"Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Headless placement utility using React portals"}),`
`,e.jsxs(n.li,{children:["Default container is ",e.jsx(n.code,{children:"document.body"})," but can be overridden to allow custom container"]}),`
`,e.jsxs(n.li,{children:["SSR-safe: avoid accessing ",e.jsx(n.code,{children:"document"})," before mount"]}),`
`,e.jsxs(n.li,{children:["Works with slots, ",e.jsx(n.code,{children:"use-props"}),", and ",e.jsx(n.code,{children:"data-attributes"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"integration",children:"Integration"}),`
`,e.jsx(n.p,{children:"This primitive could be consumed by the following components:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Overlay components (modals, dialogs, drawers)"}),`
`,e.jsx(n.li,{children:"Positioning-dependent components (tooltips, popovers, dropdown menus)"}),`
`,e.jsx(n.li,{children:"Notification systems (toasts, alerts)"}),`
`,e.jsx(n.li,{children:"Any component requiring rendering outside its parent hierarchy"}),`
`]}),`
`,e.jsxs(n.p,{children:[`In MFE scenarios, the host orchestrator provides the container Element to
`,e.jsx(n.code,{children:"Portal"}),"; clients should not assume ",e.jsx(n.code,{children:"document.body"}),`. In no-host P2P scenarios,
the elected leader creates and exposes `,e.jsx(n.code,{children:"Stack"}),` roots; MFEs should resolve the
container via orchestrator bus before rendering`]}),`
`,e.jsx(n.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsx(n.p,{children:"The Portal primitive is built using:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["React DOM's ",e.jsx(n.code,{children:"createPortal"})]}),": Core API for rendering outside the component tree"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"withSlots"})}),": Bento's slot system for composability"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"useProps"})}),": Bento's prop handling with render prop support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React hooks"}),": ",e.jsx(n.code,{children:"useEffect"}),", ",e.jsx(n.code,{children:"useState"})," for mount detection and lifecycle management"]}),`
`]}),`
`,e.jsx(n.p,{children:"The primitive does not handle:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Focus management (delegated to FocusLock primitive)"}),`
`,e.jsx(n.li,{children:"Scroll prevention (delegated to other primitives)"}),`
`,e.jsx(n.li,{children:"Backdrop rendering (delegated to Underlay primitive)"}),`
`,e.jsx(n.li,{children:"Positioning logic (delegated to positioning utilities)"}),`
`]}),`
`,e.jsx(n.p,{children:"This separation ensures Portal remains a minimal, reusable building block."}),`
`,e.jsx(n.h2,{id:"react-aria-portalprovider-integration",children:"React Aria PortalProvider integration"}),`
`,e.jsxs(n.p,{children:["The Portal primitive ",e.jsxs(n.strong,{children:["integrates with React ARIA's ",e.jsx(n.code,{children:"UNSAFE_PortalProvider"})]}),` while remaining independent and flexible.
`,e.jsx(n.strong,{children:"Reference:"})," ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/PortalProvider.html",rel:"nofollow",children:"React ARIA PortalProvider"})]}),`
`,e.jsx(n.h3,{id:"portalprovider-integration",children:"PortalProvider Integration"}),`
`,e.jsxs(n.p,{children:["Portal checks for React ARIA's ",e.jsx(n.code,{children:"UNSAFE_PortalProvider"})," and uses it when available:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`const portalContext = useUNSAFE_PortalContext();
const portalContainer = portalContext?.getContainer?.();
const container = containerProp || portalContainer || document.body;
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Container Priority:"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Explicit ",e.jsx(n.code,{children:"container"})," prop (highest priority)"]}),`
`,e.jsxs(n.li,{children:["React ARIA's ",e.jsx(n.code,{children:"UNSAFE_PortalProvider"})," container (via ",e.jsx(n.code,{children:"useUNSAFE_PortalContext"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"document.body"})," (fallback)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"why-this-matters",children:"Why This Matters"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"With UNSAFE_PortalProvider:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { UNSAFE_PortalProvider } from 'react-aria';
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
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Benefits:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Stacking context"}),": All overlays share the same stacking context"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom location"}),": Control where overlays render in DOM"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multiple overlays"}),": Proper stacking when multiple portals/overlays are open"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React ARIA compatibility"}),": Works seamlessly with React ARIA components"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Without PortalProvider:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<App>
  {/* Portal works standalone */}
  <Portal>
    <Container>
      <Text>This renders to document.body</Text>
    </Container>
  </Portal>
</App>
`})}),`
`,e.jsx(n.p,{children:"Portal remains fully functional without PortalProvider, falling back to document.body, or a provided container."}),`
`,e.jsx(n.h3,{id:"compatibility-with-react-aria-hooks",children:"Compatibility with React ARIA Hooks"}),`
`,e.jsxs(n.p,{children:["Portal works seamlessly with React ARIA's overlay hooks and ",e.jsx(n.code,{children:"UNSAFE_PortalProvider"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useModalOverlay } from 'react-aria';
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
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Key Point"}),": Portal does not interfere with React ARIA's overlay behavior. It only changes the render location."]}),`
`,e.jsx(n.h3,{id:"props-interface",children:"Props Interface"}),`
`,e.jsx(n.p,{children:"We expect the following props to be passed to the Portal component:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface PortalProps extends Slots {
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
`,e.jsxs(n.h3,{id:"expected-data--attributes",children:["Expected ",e.jsx(n.code,{children:"data-*"})," Attributes"]}),`
`,e.jsx(n.p,{children:"The Portal component itself does not render any DOM elements by default, so data attributes apply to content customized via slots:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-portal"})}),e.jsx(n.td,{children:"Marks content rendered via portal"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-mounted"})}),e.jsx(n.td,{children:"Whether portal content has mounted"}),e.jsx(n.td,{children:'"true" / "false"'})]})]})]})]})}function j(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{j as default};
