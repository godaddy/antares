import{j as e}from"./iframe-DQtiMnD4.js";import{u as o,M as a,A as l,a as s,S as n}from"./blocks-DSKzAaNR.js";import{S as c,P as d,D as h,E as p,a as m,W as u}from"./alert.stories-RgaDrVos.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8ESIyvY.js";import"./index-BHKsHJgc.js";import"./index-C1rMZYLg.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./index-Bev7kiYO.js";import"./Button-BLDK2BFX.js";import"./Text-Djv1qJ7Q.js";import"./mergeProps-BK17a0NT.js";import"./SSRProvider-4V5OUdQ_.js";import"./useObjectRef-3ULd_UCN.js";import"./useButton-Crkm7MQj.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-hlG5yPvY.js";import"./useSyncRef-BdjWppPO.js";import"./useGlobalListeners-PVAUtQm1.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-CVHlp_m6.js";import"./platform-DTNzKOdA.js";import"./usePress-CDYq7JwZ.js";import"./Hidden-vCardlYD.js";import"./useFocusRing-DfFPK5xC.js";import"./useFocusWithin-Rxrks1Lt.js";import"./index-BJXFfBE1.js";import"./index-vHst8yXV.js";import"./index-XCZuqUC9.js";import"./slots-b4cYez9P.js";import"./index-DLp5lu2B.js";import"./index-CLj43KZG.js";import"./index-BO1jrNwT.js";import"./index-Cmv75o_0.js";import"./create-external-store-TtP3UJpK.js";import"./index-CQap6Ljs.js";import"./client-DNtVf5Zr.js";import"./index-CYP_grOC.js";import"./index-B503fc9a.js";import"./index-BEJocHLh.js";import"./index-B58YYUh3.js";const x=`import { Alert, type AlertProps } from '@godaddy/antares';

export function DefaultExample(props: Partial<AlertProps>) {
  return (
    <Alert emphasis="info" title="Your domain is ready" {...props}>
      You can now start building your website.
    </Alert>
  );
}
`,j=`import { Alert, type AlertProps, Button } from '@godaddy/antares';
import { useState } from 'react';

export function DismissibleExample(props?: Partial<AlertProps>) {
  const [visible, setVisible] = useState(true);

  if (!visible) return <Button onClick={() => setVisible(true)}>Show alert</Button>;

  return (
    <Alert emphasis="success" title="Your account's been verified" onClose={() => setVisible(false)} {...props}>
      We've successfully verified your identity.
    </Alert>
  );
}
`,f=`import { Alert, Button } from '@godaddy/antares';

export function WithActionExample() {
  return (
    <Alert
      emphasis="warning"
      title="Your payment method is expiring"
      actions={
        <Button variant="secondary" size="sm">
          Update Payment Method
        </Button>
      }
      onClose={() => undefined}
    >
      Please update your payment method before it expires.
    </Alert>
  );
}
`,b=`import { Alert } from '@godaddy/antares';

const emphases = ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal'] as const;

export function EmphasesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {emphases.map((emphasis) => (
        <Alert key={emphasis} emphasis={emphasis} title={\`This is a \${emphasis} alert\`}>
          Description for the {emphasis} emphasis variant.
        </Alert>
      ))}
    </div>
  );
}
`;function r(i){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c,name:"Overview"}),`
`,e.jsx(t.h1,{id:"alert",children:"Alert"}),`
`,e.jsx(t.p,{children:"In-page alerts are non-intrusive notifications within a webpage, providing users with timely information or feedback without disrupting their experience."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(t.p,{children:"A minimal alert with a title and body text."}),`
`,e.jsx(s,{of:h,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:x}),`
`,e.jsx(t.h3,{id:"emphasis-variants",children:"Emphasis Variants"}),`
`,e.jsx(t.p,{children:"All 7 emphasis categories. Each variant carries a distinct visual accent and semantic icon so the type of message is never communicated by color alone."}),`
`,e.jsx(s,{of:p,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:b}),`
`,e.jsx(t.h3,{id:"dismissible",children:"Dismissible"}),`
`,e.jsxs(t.p,{children:["When an ",e.jsx(t.code,{children:"onClose"})," callback is provided, a dismiss button is rendered. The component does not manage its own visibility — the parent is responsible for unmounting or hiding the alert when ",e.jsx(t.code,{children:"onClose"})," fires."]}),`
`,e.jsx(s,{of:m,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:j}),`
`,e.jsx(t.h3,{id:"with-action",children:"With Action"}),`
`,e.jsxs(t.p,{children:["Pass a ",e.jsx(t.code,{children:"Button"})," to the ",e.jsx(t.code,{children:"actions"})," slot to give the user a clear path to resolve the alert."]}),`
`,e.jsx(s,{of:u,inline:!0}),`
`,e.jsx(n,{language:"tsx",code:f}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"keyboard",children:"Keyboard"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Key"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"Tab"})}),e.jsx(t.td,{children:"Moves focus to the dismiss button or action button"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"Space"})}),e.jsx(t.td,{children:"Activates the focused button"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"Enter"})}),e.jsx(t.td,{children:"Activates the focused button"})]})]})]}),`
`,e.jsx(t.h3,{id:"screen-readers",children:"Screen readers"}),`
`,e.jsxs(t.p,{children:["The alert container uses ",e.jsx(t.code,{children:'role="alert"'}),", which creates an ARIA live region. When an alert is rendered or its content changes, screen readers announce the message automatically — the user does not need to navigate to the alert to hear it."]}),`
`,e.jsx(t.h3,{id:"dismiss-button-label",children:"Dismiss button label"}),`
`,e.jsxs(t.p,{children:["The dismiss button defaults to ",e.jsx(t.code,{children:'aria-label="Close"'}),". Override it via ",e.jsx(t.code,{children:"ariaLabels={{ close: '...' }}"})," to provide more specific context for screen readers (e.g. ",e.jsx(t.code,{children:'"Dismiss payment warning"'}),"). This is especially useful when multiple alerts are visible at the same time."]}),`
`,e.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Write alert content from the user's perspective: describe what happened and what they can do next, not the underlying technical error."}),`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.code,{children:"critical"})," only when the user truly cannot continue without resolving the issue. Overusing it reduces its impact."]}),`
`,e.jsxs(t.li,{children:["Always provide a ",e.jsx(t.code,{children:"title"})," when the alert includes a dismiss button — it improves the reading experience for screen reader users."]}),`
`,e.jsxs(t.li,{children:["When using ",e.jsx(t.code,{children:"actions"}),", prefer ",e.jsx(t.code,{children:"secondary"})," or ",e.jsx(t.code,{children:"tertiary"})," Button variants. Avoid placing a primary action inside an alert."]}),`
`,e.jsx(t.li,{children:"Do not stack multiple alerts of the same emphasis; consolidate the message into a single alert."}),`
`]})]})}function ae(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}export{ae as default};
