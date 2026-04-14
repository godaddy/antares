import{j as e}from"./iframe-vAMiyBja.js";import{useMDXComponents as p}from"./index-BG9nnvlg.js";import{M as m,A as h,S as n,a as s,f as i}from"./blocks-h4P0AtdT.js";import{S as x,P as f,B as a,N as r,O as c,a as l,F as d}from"./focus-lock.stories-DhL4NM-e.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D9Gk02QT.js";import"./index-JJFMoKTb.js";import"./index-BKGFVB75.js";import"./index-DrFu-skq.js";import"./index-CPvDyKsG.js";import"./slots-Vsgw1zGL.js";import"./index-xxnvkfds.js";import"./index-CLj43KZG.js";import"./index-BYmEJmF6.js";import"./mergeProps-B2CMvf4u.js";import"./clsx-_25EvAcD.js";import"./useFocusWithin-DkmSGj3m.js";import"./DOMFunctions-DY9RYDsQ.js";import"./FocusScope-Bpk3ck-I.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-Be18mPLH.js";import"./useFocusable-Cq0J_mWa.js";import"./useObjectRef-CbGVWyKG.js";import"./index-BJWZXT6u.js";import"./index-8dRcBSXg.js";import"./index-CL2pSHVl.js";import"./useButton-CxPuSOFk.js";import"./filterDOMProps-BNnC3YgW.js";import"./index-CcV7lleO.js";import"./index-SzB_xNNt.js";import"./index-BpJPZ4Yc.js";import"./listbox-item-DlYImLAz.js";import"./Collection-CDYvWQzI.js";import"./keyboard-BlyT3oQC.js";import"./context-DdooUzfR.js";import"./useControlledState-mxjHgtzR.js";import"./useListState-CWL1gihr.js";import"./useLabel-DqYvFJAP.js";import"./radio-group-DvF_bJgA.js";import"./index-D5F7iiR-.js";import"./index-BDIzCXrw.js";import"./create-external-store-TtP3UJpK.js";import"./index-DnttwbzM.js";import"./client-fNWJtasY.js";import"./index-RSTHn7Aj.js";import"./index-DT1Rk9EX.js";import"./VisuallyHidden-BbsF5H_-.js";import"./useRadioGroupState-B-kUDyDx.js";import"./useField-CUAPk8Ar.js";const b=`import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
/* v8 ignore next */
import React, { useState } from 'react';

export function BasicExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="open-button">
        Open Modal
      </Button>

      {isOpen && (
        <Container className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            {/* Single child receives data-focus-contained attribute */}
            <Container as="dialog" className="modal-content" data-testid="basic-modal">
              <Heading level={2}>Modal Title</Heading>
              <Text>Modal content with contained focus.</Text>
              <Button onClick={() => setIsOpen(false)} data-testid="close-button">
                Close
              </Button>
            </Container>
          </FocusLock>
        </Container>
      )}
    </>
  );
}
`,g=`import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
/* v8 ignore next */
import React, { useState } from 'react';

export function NestedExample() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOuterOpen(true)} data-testid="open-outer-button">
        Open Outer Modal
      </Button>

      {outerOpen && (
        <Container className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            {/* Outer modal content */}
            <Container as="dialog" className="modal-content" data-testid="outer-modal">
              <Heading level={2}>Outer Modal</Heading>
              <Button onClick={() => setInnerOpen(true)} data-testid="open-inner-button">
                Open Inner Modal
              </Button>
              <Button onClick={() => setOuterOpen(false)} data-testid="close-outer-button">
                Close
              </Button>

              {innerOpen && (
                <Container className="modal-backdrop">
                  <FocusLock contain restoreFocus autoFocus>
                    {/* Inner modal content */}
                    <Container as="dialog" className="modal-content" data-testid="inner-modal">
                      <Heading level={2}>Inner Modal</Heading>
                      <Text>Focus is contained within this inner modal.</Text>
                      <Button onClick={() => setInnerOpen(false)} data-testid="close-inner-button">
                        Close Inner
                      </Button>
                    </Container>
                  </FocusLock>
                </Container>
              )}
            </Container>
          </FocusLock>
        </Container>
      )}
    </>
  );
}
`,j=`import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
/* v8 ignore next */
import React, { useState } from 'react';

export function OverlayExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-testid="open-overlay-button">
        Open Overlay
      </Button>

      {isOpen && (
        <Container className="overlay-root">
          {/* Backdrop - outside FocusLock so it renders */}
          <Container
            className="backdrop"
            data-slot="backdrop"
            onClick={() => setIsOpen(false)}
            data-testid="overlay-backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              cursor: 'pointer',
              zIndex: 1000
            }}
          >
            {/* Non-empty content so Container renders */}
            <span style={{ display: 'none' }}>backdrop</span>
          </Container>
          <FocusLock contain restoreFocus autoFocus>
            {/* Content - receives data-focus-contained attribute */}
            <Container
              as="dialog"
              className="content"
              data-slot="content"
              data-testid="overlay-content"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                zIndex: 1001,
                minWidth: '300px'
              }}
            >
              <Heading level={2}>Overlay with Multiple Children</Heading>
              <Text>This overlay demonstrates how FocusLock works with a backdrop and content.</Text>
              <Text>Focus is trapped within the dialog content.</Text>
              <Button>First Button</Button>
              <Button onClick={() => setIsOpen(false)} data-testid="close-overlay-button">
                Close
              </Button>
            </Container>
          </FocusLock>
        </Container>
      )}
    </>
  );
}
`,k=`import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Container } from '@bento/container';
import { ListBox, ListBoxItem } from '@bento/listbox';
/* v8 ignore next */
import React, { useState } from 'react';

export function SelectExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelectionChange = function handleSelectionChange(keys: 'all' | Set<React.Key>) {
    if (keys !== 'all' && keys.size > 0) {
      const selectedKey = Array.from(keys)[0] as string;
      setSelected(selectedKey);
      setIsOpen(false);
    }
  };

  return (
    <Container>
      <Button onClick={() => setIsOpen(!isOpen)}>{selected || 'Select an option...'}</Button>

      {isOpen && (
        <FocusLock contain restoreFocus autoFocus>
          {/* Single child - popover container receives data-focus-contained attribute */}
          <Container as="aside" className="popover" data-slot="popover" data-testid="select-popover">
            <ListBox
              aria-label="Fruit selection"
              selectionMode="single"
              selectedKeys={selected ? new Set([selected]) : new Set()}
              onSelectionChange={handleSelectionChange}
            >
              <ListBoxItem id="apple">Apple</ListBoxItem>
              <ListBoxItem id="orange">Orange</ListBoxItem>
              <ListBoxItem id="banana">Banana</ListBoxItem>
            </ListBox>
          </Container>
        </FocusLock>
      )}
    </Container>
  );
}
`,C=`import { FocusLock } from '@bento/focus-lock';
import { Button } from '@bento/button';
import { Heading } from '@bento/heading';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
import { RadioGroup, Radio } from '@bento/radio';
/* v8 ignore next */
import React, { useState } from 'react';

export function FormExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [accountType, setAccountType] = useState<string>();
  const [contactMethod, setContactMethod] = useState<string>();
  const steps = ['Account Type', 'Contact Preference', 'Review'];

  return (
    <Container as="section" className="form-wizard">
      <Container as="nav" className="step-indicator">
        {steps.map((step, index) => (
          <Container as="span" key={step} className={\`step \${index === currentStep ? 'active' : ''}\`}>
            {step}
          </Container>
        ))}
      </Container>

      <FocusLock
        contain={true}
        restoreFocus={false}
        autoFocus={true}
        key={currentStep} // Re-mount to reset focus
      >
        <Container as="form" className="step-content" data-testid={\`step-\${currentStep}\`}>
          {currentStep === 0 && (
            <Container as="fieldset">
              <Heading level={2}>Account Type</Heading>
              <RadioGroup value={accountType} onChange={setAccountType} isInvalid={false}>
                <Text slot="label">Select your account type</Text>
                <Radio value="personal">Personal</Radio>
                <Radio value="business">Business</Radio>
                <Radio value="enterprise">Enterprise</Radio>
              </RadioGroup>
              <Button onClick={() => setCurrentStep(1)}>Next</Button>
            </Container>
          )}

          {currentStep === 1 && (
            <Container as="fieldset">
              <Heading level={2}>Contact Preference</Heading>
              <RadioGroup value={contactMethod} onChange={setContactMethod} isInvalid={false}>
                <Text slot="label">How would you like to be contacted?</Text>
                <Radio value="email">Email</Radio>
                <Radio value="phone">Phone</Radio>
                <Radio value="sms">SMS</Radio>
              </RadioGroup>
              <Button onClick={() => setCurrentStep(0)}>Previous</Button>
              <Button onClick={() => setCurrentStep(2)}>Next</Button>
            </Container>
          )}

          {currentStep === 2 && (
            <Container as="fieldset">
              <Heading level={2}>Review</Heading>
              <Text>Account Type: {accountType || 'Not selected'}</Text>
              <Text>Contact Method: {contactMethod || 'Not selected'}</Text>
              <Button onClick={() => setCurrentStep(1)}>Previous</Button>
              <Button type="submit">Submit</Button>
            </Container>
          )}
        </Container>
      </FocusLock>
    </Container>
  );
}
`;function u(o){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...p(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(m,{of:x,name:"Overview"}),`
`,e.jsx(t.h1,{id:"focuslock",children:"FocusLock"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/focus-lock"}),` package provides focus management for containing and
controlling keyboard focus within specific areas of your application. Built on
top of React ARIA's FocusScope, it ensures focus remains trapped within
designated boundaries, making it essential for modals, dialogs, drawers, select
popovers, and other overlay components.`]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-shell",children:`npm install --save @bento/focus-lock
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The following properties are available to be used on the ",e.jsx(t.code,{children:"FocusLock"})," component:"]}),`
`,e.jsx(h,{of:f}),`
`,e.jsxs(t.p,{children:["For all other properties specified on the ",e.jsx(t.code,{children:"FocusLock"}),` component, they will be
passed down to the underlying React ARIA FocusScope component.`]}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsxs(t.p,{children:["The simplest use case is to wrap your modal or dialog content with ",e.jsx(t.code,{children:"FocusLock"}),`
and enable focus containment.`]}),`
`,e.jsx(n,{language:"tsx",code:b}),`
`,e.jsx(s,{of:a,inline:!0}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(t.p,{children:`Focus scopes can be nested, allowing you to have multiple layers of focus
containment. When a nested scope is active, focus is trapped within the
innermost scope.`}),`
`,e.jsx(n,{language:"tsx",code:g}),`
`,e.jsx(s,{of:r,inline:!0}),`
`,e.jsx(i,{of:r}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"FocusLock"}),` component applies data attributes directly to its children
without introducing a wrapper element. This example demonstrates multiple
children (backdrop and content).`]}),`
`,e.jsx(n,{language:"tsx",code:j}),`
`,e.jsx(s,{of:c,inline:!0}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(t.p,{children:"When used with a single child, the focus lock applies data attributes to that child element."}),`
`,e.jsx(n,{language:"tsx",code:k}),`
`,e.jsx(s,{of:l,inline:!0}),`
`,e.jsx(i,{of:l}),`
`,e.jsx(t.p,{children:"Focus lock is particularly useful for multi-step forms where you want to keep focus within the current step."}),`
`,e.jsx(n,{language:"tsx",code:C}),`
`,e.jsx(s,{of:d,inline:!0}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(t.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"FocusLock"})," component is created using the ",e.jsx(t.code,{children:"@bento/slots"}),` package and allows
assignment of the custom `,e.jsx(t.code,{children:"slot"}),` property for overrides. The component applies
props to the underlying React ARIA `,e.jsx(t.code,{children:"FocusScope"}),` component and data attributes to
its children.`]}),`
`,e.jsx(t.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/focus-lock"})," component is registered as ",e.jsx(t.code,{children:"BentoFocusLock"}),` and can be
customized using the slot system. See the `,e.jsx(t.code,{children:"@bento/slots"}),` package for more
information on how to use the `,e.jsx(t.code,{children:"slot"})," and ",e.jsx(t.code,{children:"slots"})," properties."]}),`
`,e.jsx(t.p,{children:"Render prop function receives a state object with the following properties:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`interface FocusLockState {
  hasFocus: boolean;      // Whether focus is currently within the scope
  isContained: boolean;   // Whether focus is contained (same as contain prop)
}
`})}),`
`,e.jsx(t.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsxs(t.p,{children:["The following data attributes are automatically applied to the children of the ",e.jsx(t.code,{children:"FocusLock"})," component:"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Attribute"}),e.jsx(t.th,{children:"Description"}),e.jsx(t.th,{children:"Example Values"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-focus-contained"})}),e.jsx(t.td,{children:"Indicates whether focus is contained"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-has-focus"})}),e.jsx(t.td,{children:"Indicates whether the scope currently has focus"}),e.jsx(t.td,{children:'"true" / "false"'})]})]})]}),`
`,e.jsx(t.p,{children:`These data attributes can be targeted using CSS selectors for styling. When
using data attributes for styling, ensure you scope them properly with a
className to avoid affecting unrelated elements:`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`.my-modal[data-focus-contained="true"] {
  outline: 2px solid blue;
}

.my-modal[data-has-focus="true"] {
  background-color: rgba(0, 0, 0, 0.05);
}
`})}),`
`,e.jsx(t.p,{children:"Apply the scoping className to your FocusLock children:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`<FocusLock contain restoreFocus autoFocus>
  <div className="my-modal">
    Modal content
  </div>
</FocusLock>
`})}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Focus management is crucial for accessibility. The ",e.jsx(t.code,{children:"FocusLock"}),` component ensures
that keyboard users can navigate within the focus scope using Tab and Shift+Tab,
focus is trapped within the scope when `,e.jsx(t.code,{children:"contain"}),` is enabled, focus is
automatically restored to the previously focused element when the scope is
removed (when `,e.jsx(t.code,{children:"restoreFocus"}),` is enabled), and the first focusable element is
automatically focused when the scope is mounted (when `,e.jsx(t.code,{children:"autoFocus"})," is enabled)."]}),`
`,e.jsx(t.p,{children:"When using focus lock, follow these accessibility guidelines:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Always provide a way to exit the focus scope (e.g., a close button or escape key handler)"}),`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.code,{children:"restoreFocus"})," to ensure users return to their previous location when the scope is closed"]}),`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.code,{children:"autoFocus"})," to immediately draw attention to important content like modals"]}),`
`,e.jsxs(t.li,{children:["Consider using ",e.jsx(t.code,{children:"aria-modal"})," on modal dialogs to provide additional context to screen readers"]}),`
`,e.jsx(t.li,{children:"Ensure all focusable elements within the scope are keyboard accessible"}),`
`]})]})}function be(o={}){const{wrapper:t}={...p(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(u,{...o})}):u(o)}export{be as default};
