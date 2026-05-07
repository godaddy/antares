import{j as n}from"./iframe-Du6PjlSZ.js";import{useMDXComponents as s}from"./index-PW5r9cRf.js";import{M as c}from"./blocks-F0Y6jiat.js";import"./preload-helper-PPVm8Dsz.js";import"./index-niWSmtgG.js";import"./index-BtT7aVaE.js";import"./index-c3mBs9B0.js";function t(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",pre:"pre",...s(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(c,{title:"Architecture/PDRs/Focus Lock"}),`
`,n.jsx(e.h1,{id:"focus-lock-primitive-pdr",children:"Focus Lock Primitive PDR"}),`
`,n.jsx(e.h2,{id:"code-examples",children:"Code Examples"}),`
`,n.jsx(e.h3,{id:"basic-example",children:"Basic example"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { FocusLock } from '@bento/focus-lock';

function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      {isOpen && (
        <div className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            <div className="modal-content">
              <h2>Modal Title</h2>
              <p>Modal content with contained focus.</p>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </FocusLock>
        </div>
      )}
    </>
  );
}
`})}),`
`,n.jsx(e.h3,{id:"nested-focus-scopes",children:"Nested Focus Scopes"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { FocusLock } from '@bento/focus-lock';

function NestedModals() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOuterOpen(true)}>Open Outer Modal</button>

      {outerOpen && (
        <div className="modal-backdrop">
          <FocusLock contain restoreFocus autoFocus>
            <div className="modal-content">
              <h2>Outer Modal</h2>
              <button onClick={() => setInnerOpen(true)}>Open Inner Modal</button>
              <button onClick={() => setOuterOpen(false)}>Close</button>

              {innerOpen && (
                <div className="modal-backdrop">
                  <FocusLock contain restoreFocus autoFocus>
                    <div className="modal-content">
                      <h2>Inner Modal</h2>
                      <p>Focus is contained within this inner modal.</p>
                      <button onClick={() => setInnerOpen(false)}>Close Inner</button>
                    </div>
                  </FocusLock>
                </div>
              )}
            </div>
          </FocusLock>
        </div>
      )}
    </>
  );
}
`})}),`
`,n.jsx(e.h2,{id:"custom-focus-behavior-with-render-props",children:"Custom Focus Behavior with Render Props"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { FocusLock } from '@bento/focus-lock';

function CustomFocusExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Custom Modal</button>

      {isOpen && (
        <FocusLock
          contain={true}
          restoreFocus={true}
          autoFocus={true}
          className={({ isContained, hasFocus }) =>
            \`modal-content \${isContained ? 'focus-contained' : ''} \${hasFocus ? 'has-focus' : ''}\`
          }
          onFocusEnter={(event) => console.log('Focus entered scope')}
          onFocusLeave={(event) => console.log('Focus left scope')}
        >
          <div className="modal-content">
            <h2>Custom Focus Modal</h2>
            <p>This modal has custom focus behavior and styling.</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </FocusLock>
      )}
    </>
  );
}
`})}),`
`,n.jsx(e.h3,{id:"hook-usage-for-advanced-control",children:"Hook Usage for Advanced Control"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useFocusLock } from '@bento/focus-lock';

function AdvancedFocusControl() {
  const [isActive, setIsActive] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);

  const focusLock = useFocusLock({
    contain: isActive,
    restoreFocus: true,
    autoFocus: isActive,
    scopeRef,
    onFocusEnter: () => console.log('Focus entered'),
    onFocusLeave: () => console.log('Focus left')
  });

  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Deactivate' : 'Activate'} Focus Lock
      </button>

      <div
        ref={scopeRef}
        className={\`focus-area \${isActive ? 'active' : ''}\`}
      >
        <h3>Focus Area</h3>
        <button>Button 1</button>
        <button>Button 2</button>
        <input type="text" placeholder="Text input" />
      </div>
    </div>
  );
}
`})}),`
`,n.jsx(e.h3,{id:"form-section-with-focus-management",children:"Form Section with Focus Management"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { FocusLock } from '@bento/focus-lock';

function FormWithFocusManagement() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Personal', 'Contact', 'Review'];

  return (
    <div className="form-wizard">
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={step} className={\`step \${index === currentStep ? 'active' : ''}\`}>
            {step}
          </div>
        ))}
      </div>

      <FocusLock
        contain={true}
        restoreFocus={false}
        autoFocus={true}
        key={currentStep} // Re-mount to reset focus
      >
        <div className="step-content">
          {currentStep === 0 && (
            <div>
              <h2>Personal Information</h2>
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
              <button onClick={() => setCurrentStep(1)}>Next</button>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2>Contact Information</h2>
              <input type="email" placeholder="Email" />
              <input type="tel" placeholder="Phone" />
              <button onClick={() => setCurrentStep(0)}>Previous</button>
              <button onClick={() => setCurrentStep(2)}>Next</button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2>Review</h2>
              <p>Please review your information.</p>
              <button onClick={() => setCurrentStep(1)}>Previous</button>
              <button type="submit">Submit</button>
            </div>
          )}
        </div>
      </FocusLock>
    </div>
  );
}
`})}),`
`,n.jsx(e.h3,{id:"integration-with-slot-system",children:"Integration with Slot System"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { FocusLock } from '@bento/focus-lock';

function SlotBasedModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FocusLock
      contain={isOpen}
      restoreFocus={true}
      autoFocus={isOpen}
      slots={{
        root: ({ props, children }) => (
          <div
            {...props}
            className="custom-focus-container"
            data-modal-open={isOpen}
          >
            {children}
          </div>
        )
      }}
    >
      <div className="modal-content">
        <h2>Modal with Custom Slot</h2>
        <p>This modal uses the slot system for customization.</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </FocusLock>
  );
}\`\`\`
`})})]})}function m(o={}){const{wrapper:e}={...s(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(t,{...o})}):t(o)}export{m as default};
