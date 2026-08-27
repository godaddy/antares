import{i as e}from"./preload-helper-CUucOUc4.js";import{F as t}from"./iframe-BiVoOxyi.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Blemlnhj.js";import{t as c}from"./mdx-react-shim-C9VhnUFs.js";import{Default as l,Dismissible as u,Emphases as d,Props as f,WithAction as p,n as m,t as h}from"./alert.stories-KcaeMIYj.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{of:h,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`alert`,children:`Alert`}),`
`,(0,v.jsx)(t.p,{children:`In-page alerts are non-intrusive notifications within a webpage, providing users with timely information or feedback without disrupting their experience.`}),`
`,(0,v.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,v.jsx)(t.p,{children:`A minimal alert with a title and body text.`}),`
`,(0,v.jsx)(i,{of:l,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Alert, type AlertProps } from '@godaddy/antares';

export function DefaultExample(props: Partial<AlertProps>) {
  return (
    <Alert emphasis="info" title="Your domain is ready" {...props}>
      You can now start building your website.
    </Alert>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`emphasis-variants`,children:`Emphasis Variants`}),`
`,(0,v.jsx)(t.p,{children:`All 7 emphasis categories. Each variant carries a distinct visual accent and semantic icon so the type of message is never communicated by color alone.`}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Alert, Flex } from '@godaddy/antares';

const emphases = ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal'] as const;

export function EmphasesExample() {
  return (
    <Flex direction="column" gap="1rem">
      {emphases.map((emphasis) => (
        <Alert key={emphasis} emphasis={emphasis} title={\`This is a \${emphasis} alert\`}>
          Description for the {emphasis} emphasis variant.
        </Alert>
      ))}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`dismissible`,children:`Dismissible`}),`
`,(0,v.jsxs)(t.p,{children:[`When an `,(0,v.jsx)(t.code,{children:`onClose`}),` callback is provided, a dismiss button is rendered. The component does not manage its own visibility — the parent is responsible for unmounting or hiding the alert when `,(0,v.jsx)(t.code,{children:`onClose`}),` fires.`]}),`
`,(0,v.jsx)(i,{of:u,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Alert, type AlertProps, Button } from '@godaddy/antares';
import { useState } from 'react';

export function DismissibleExample(props?: Partial<AlertProps>) {
  const [visible, setVisible] = useState(true);

  if (!visible) return <Button onPress={() => setVisible(true)}>Show alert</Button>;

  return (
    <Alert emphasis="success" title="Your account's been verified" onClose={() => setVisible(false)} {...props}>
      We've successfully verified your identity.
    </Alert>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`with-action`,children:`With Action`}),`
`,(0,v.jsxs)(t.p,{children:[`Pass a `,(0,v.jsx)(t.code,{children:`Button`}),` to the `,(0,v.jsx)(t.code,{children:`actions`}),` slot to give the user a clear path to resolve the alert.`]}),`
`,(0,v.jsx)(i,{of:p,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Alert, Button } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,v.jsxs)(t.table,{children:[(0,v.jsx)(t.thead,{children:(0,v.jsxs)(t.tr,{children:[(0,v.jsx)(t.th,{children:`Key`}),(0,v.jsx)(t.th,{children:`Description`})]})}),(0,v.jsxs)(t.tbody,{children:[(0,v.jsxs)(t.tr,{children:[(0,v.jsx)(t.td,{children:(0,v.jsx)(t.code,{children:`Tab`})}),(0,v.jsx)(t.td,{children:`Moves focus to the dismiss button or action button`})]}),(0,v.jsxs)(t.tr,{children:[(0,v.jsxs)(t.td,{children:[(0,v.jsx)(t.code,{children:`Space`}),` / `,(0,v.jsx)(t.code,{children:`Enter`})]}),(0,v.jsx)(t.td,{children:`Activates the focused button`})]})]})]}),`
`,(0,v.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,v.jsxs)(t.p,{children:[`The alert container uses `,(0,v.jsx)(t.code,{children:`role="alert"`}),`, which creates an ARIA live region. When an alert is rendered or its content changes, screen readers announce the message automatically — the user does not need to navigate to the alert to hear it.`]}),`
`,(0,v.jsx)(t.h3,{id:`dismiss-button-label`,children:`Dismiss button label`}),`
`,(0,v.jsxs)(t.p,{children:[`The dismiss button defaults to `,(0,v.jsx)(t.code,{children:`aria-label="Close"`}),`. Override it via `,(0,v.jsx)(t.code,{children:`ariaLabels={{ close: '...' }}`}),` to provide more specific context for screen readers (e.g. `,(0,v.jsx)(t.code,{children:`"Dismiss payment warning"`}),`). This is especially useful when multiple alerts are visible at the same time.`]}),`
`,(0,v.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsx)(t.li,{children:`Write alert content from the user's perspective: describe what happened and what they can do next, not the underlying technical error.`}),`
`,(0,v.jsxs)(t.li,{children:[`Use `,(0,v.jsx)(t.code,{children:`critical`}),` only when the user truly cannot continue without resolving the issue. Overusing it reduces its impact.`]}),`
`,(0,v.jsxs)(t.li,{children:[`Always provide a `,(0,v.jsx)(t.code,{children:`title`}),` when the alert includes a dismiss button — it improves the reading experience for screen reader users.`]}),`
`,(0,v.jsxs)(t.li,{children:[`When using `,(0,v.jsx)(t.code,{children:`actions`}),`, prefer `,(0,v.jsx)(t.code,{children:`secondary`}),` or `,(0,v.jsx)(t.code,{children:`tertiary`}),` Button variants. Avoid placing a primary action inside an alert.`]}),`
`,(0,v.jsx)(t.li,{children:`Do not stack multiple alerts of the same emphasis; consolidate the message into a single alert.`}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsx)(a,{of:f})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),c(),s(),m()}))();export{_ as default};