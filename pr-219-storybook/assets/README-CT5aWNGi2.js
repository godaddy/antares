import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-xMnMq0c1.js";import{S as n,c as r,i,l as a,n as o,s,u as c}from"./blocks-T9LBPeMM.js";import{t as l}from"./mdx-react-shim-By3kejgH.js";import{Basic as u,Form as d,Nested as f,Overlay as p,Props as m,Select as h,n as g,t as _}from"./focus-lock.stories-DUxWSmI_.js";var v,y=e((()=>{v=`import { FocusLock } from '@bento/focus-lock';
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
`})),b,x=e((()=>{b=`import { FocusLock } from '@bento/focus-lock';
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
`})),S,C=e((()=>{S=`import { FocusLock } from '@bento/focus-lock';
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
`})),w,T=e((()=>{w=`import { FocusLock } from '@bento/focus-lock';
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
`})),E,D=e((()=>{E=`import { FocusLock } from '@bento/focus-lock';
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
`}));function O(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(s,{of:_,name:`Overview`}),`
`,(0,A.jsx)(t.h1,{id:`focuslock`,children:`FocusLock`}),`
`,(0,A.jsxs)(t.p,{children:[`The `,(0,A.jsx)(t.code,{children:`@bento/focus-lock`}),` package provides focus management for containing and
controlling keyboard focus within specific areas of your application. Built on
top of React ARIA's FocusScope, it ensures focus remains trapped within
designated boundaries, making it essential for modals, dialogs, drawers, select
popovers, and other overlay components.`]}),`
`,(0,A.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/focus-lock
`})}),`
`,(0,A.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,A.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,A.jsx)(t.code,{children:`FocusLock`}),` component:`]}),`
`,(0,A.jsx)(o,{of:m}),`
`,(0,A.jsxs)(t.p,{children:[`For all other properties specified on the `,(0,A.jsx)(t.code,{children:`FocusLock`}),` component, they will be
passed down to the underlying React ARIA FocusScope component.`]}),`
`,(0,A.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,A.jsxs)(t.p,{children:[`The simplest use case is to wrap your modal or dialog content with `,(0,A.jsx)(t.code,{children:`FocusLock`}),`
and enable focus containment.`]}),`
`,(0,A.jsx)(r,{language:`tsx`,code:v}),`
`,(0,A.jsx)(a,{of:u,inline:!0}),`
`,(0,A.jsx)(i,{of:u}),`
`,(0,A.jsx)(t.p,{children:`Focus scopes can be nested, allowing you to have multiple layers of focus
containment. When a nested scope is active, focus is trapped within the
innermost scope.`}),`
`,(0,A.jsx)(r,{language:`tsx`,code:b}),`
`,(0,A.jsx)(a,{of:f,inline:!0}),`
`,(0,A.jsx)(i,{of:f}),`
`,(0,A.jsxs)(t.p,{children:[`The `,(0,A.jsx)(t.code,{children:`FocusLock`}),` component applies data attributes directly to its children
without introducing a wrapper element. This example demonstrates multiple
children (backdrop and content).`]}),`
`,(0,A.jsx)(r,{language:`tsx`,code:S}),`
`,(0,A.jsx)(a,{of:p,inline:!0}),`
`,(0,A.jsx)(i,{of:p}),`
`,(0,A.jsx)(t.p,{children:`When used with a single child, the focus lock applies data attributes to that child element.`}),`
`,(0,A.jsx)(r,{language:`tsx`,code:w}),`
`,(0,A.jsx)(a,{of:h,inline:!0}),`
`,(0,A.jsx)(i,{of:h}),`
`,(0,A.jsx)(t.p,{children:`Focus lock is particularly useful for multi-step forms where you want to keep focus within the current step.`}),`
`,(0,A.jsx)(r,{language:`tsx`,code:E}),`
`,(0,A.jsx)(a,{of:d,inline:!0}),`
`,(0,A.jsx)(i,{of:d}),`
`,(0,A.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,A.jsxs)(t.p,{children:[`The `,(0,A.jsx)(t.code,{children:`FocusLock`}),` component is created using the `,(0,A.jsx)(t.code,{children:`@bento/slots`}),` package and allows
assignment of the custom `,(0,A.jsx)(t.code,{children:`slot`}),` property for overrides. The component applies
props to the underlying React ARIA `,(0,A.jsx)(t.code,{children:`FocusScope`}),` component and data attributes to
its children.`]}),`
`,(0,A.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,A.jsxs)(t.p,{children:[`The `,(0,A.jsx)(t.code,{children:`@bento/focus-lock`}),` component is registered as `,(0,A.jsx)(t.code,{children:`BentoFocusLock`}),` and can be
customized using the slot system. See the `,(0,A.jsx)(t.code,{children:`@bento/slots`}),` package for more
information on how to use the `,(0,A.jsx)(t.code,{children:`slot`}),` and `,(0,A.jsx)(t.code,{children:`slots`}),` properties.`]}),`
`,(0,A.jsx)(t.p,{children:`Render prop function receives a state object with the following properties:`}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-typescript`,children:`interface FocusLockState {
  hasFocus: boolean;      // Whether focus is currently within the scope
  isContained: boolean;   // Whether focus is contained (same as contain prop)
}
`})}),`
`,(0,A.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,A.jsxs)(t.p,{children:[`The following data attributes are automatically applied to the children of the `,(0,A.jsx)(t.code,{children:`FocusLock`}),` component:`]}),`
`,(0,A.jsxs)(t.table,{children:[(0,A.jsx)(t.thead,{children:(0,A.jsxs)(t.tr,{children:[(0,A.jsx)(t.th,{children:`Attribute`}),(0,A.jsx)(t.th,{children:`Description`}),(0,A.jsx)(t.th,{children:`Example Values`})]})}),(0,A.jsxs)(t.tbody,{children:[(0,A.jsxs)(t.tr,{children:[(0,A.jsx)(t.td,{children:(0,A.jsx)(t.code,{children:`data-focus-contained`})}),(0,A.jsx)(t.td,{children:`Indicates whether focus is contained`}),(0,A.jsx)(t.td,{children:`"true" / "false"`})]}),(0,A.jsxs)(t.tr,{children:[(0,A.jsx)(t.td,{children:(0,A.jsx)(t.code,{children:`data-has-focus`})}),(0,A.jsx)(t.td,{children:`Indicates whether the scope currently has focus`}),(0,A.jsx)(t.td,{children:`"true" / "false"`})]})]})]}),`
`,(0,A.jsx)(t.p,{children:`These data attributes can be targeted using CSS selectors for styling. When
using data attributes for styling, ensure you scope them properly with a
className to avoid affecting unrelated elements:`}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-css`,children:`.my-modal[data-focus-contained="true"] {
  outline: 2px solid blue;
}

.my-modal[data-has-focus="true"] {
  background-color: rgba(0, 0, 0, 0.05);
}
`})}),`
`,(0,A.jsx)(t.p,{children:`Apply the scoping className to your FocusLock children:`}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-tsx`,children:`<FocusLock contain restoreFocus autoFocus>
  <div className="my-modal">
    Modal content
  </div>
</FocusLock>
`})}),`
`,(0,A.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,A.jsxs)(t.p,{children:[`Focus management is crucial for accessibility. The `,(0,A.jsx)(t.code,{children:`FocusLock`}),` component ensures
that keyboard users can navigate within the focus scope using Tab and Shift+Tab,
focus is trapped within the scope when `,(0,A.jsx)(t.code,{children:`contain`}),` is enabled, focus is
automatically restored to the previously focused element when the scope is
removed (when `,(0,A.jsx)(t.code,{children:`restoreFocus`}),` is enabled), and the first focusable element is
automatically focused when the scope is mounted (when `,(0,A.jsx)(t.code,{children:`autoFocus`}),` is enabled).`]}),`
`,(0,A.jsx)(t.p,{children:`When using focus lock, follow these accessibility guidelines:`}),`
`,(0,A.jsxs)(t.ul,{children:[`
`,(0,A.jsx)(t.li,{children:`Always provide a way to exit the focus scope (e.g., a close button or escape key handler)`}),`
`,(0,A.jsxs)(t.li,{children:[`Use `,(0,A.jsx)(t.code,{children:`restoreFocus`}),` to ensure users return to their previous location when the scope is closed`]}),`
`,(0,A.jsxs)(t.li,{children:[`Use `,(0,A.jsx)(t.code,{children:`autoFocus`}),` to immediately draw attention to important content like modals`]}),`
`,(0,A.jsxs)(t.li,{children:[`Consider using `,(0,A.jsx)(t.code,{children:`aria-modal`}),` on modal dialogs to provide additional context to screen readers`]}),`
`,(0,A.jsx)(t.li,{children:`Ensure all focusable elements within the scope are keyboard accessible`}),`
`]})]})}function k(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,A.jsx)(t,{...e,children:(0,A.jsx)(O,{...e})}):O(e)}var A;e((()=>{A=t(),l(),c(),g(),y(),x(),C(),T(),D()}))();export{k as default};