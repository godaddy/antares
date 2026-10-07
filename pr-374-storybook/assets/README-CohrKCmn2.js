import{i as e}from"./preload-helper-BQYduWLY.js";import{F as t}from"./iframe-sIOyKfBf.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-W0KTKXaF.js";import{t as c}from"./mdx-react-shim-C3dn18VX.js";import{t as l}from"./runtime-CIW6ieeJ.js";import{ComposedNavigation as u,ControlledValidation as d,Default as f,DialogTriggerProps as p,Items as m,Lifecycle as h,Navigation as g,Props as _,WizardStepProps as v,WizardStepsProps as y,n as b,t as x}from"./wizard.stories-CVllK4mH.js";function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(o,{of:b,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`wizard`,children:`Wizard`}),`
`,(0,w.jsx)(t.p,{children:`A full-screen dialog with an ordered collection of named steps.`}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsx)(t.li,{children:`Full-screen modal with React Aria focus and dismissal behavior`}),`
`,(0,w.jsxs)(t.li,{children:[`Static or `,(0,w.jsx)(t.code,{children:`items`}),`/render-function collections with stable step IDs and labels`]}),`
`,(0,w.jsx)(t.li,{children:`Optional Footer, visited-step menu, navigation slots, and close controls`}),`
`,(0,w.jsx)(t.li,{children:`Controlled or uncontrolled overlay opening and step navigation`}),`
`,(0,w.jsxs)(t.li,{children:[`Optional app-owned `,(0,w.jsx)(t.code,{children:`onFinish`}),` action for the final step`]}),`
`,(0,w.jsx)(t.li,{children:`Empty collections supported`}),`
`,(0,w.jsx)(t.li,{children:`Actual step changes focus the newly active named region; rejected controlled navigation leaves focus in place`}),`
`,(0,w.jsxs)(t.li,{children:[`Each new opening starts with fresh visit history and the current default step (unless `,(0,w.jsx)(t.code,{children:`activeStep`}),` is app-owned)`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsx)(t.p,{children:`Open a full-screen workflow with one step collection and optional consumer-composed navigation.`}),`
`,(0,w.jsx)(i,{of:f,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useContext, useState } from 'react';
import {
  Button,
  ButtonGroup,
  CloseButton,
  DialogTrigger,
  Footer,
  Heading,
  Input,
  Label,
  TextField,
  Wizard,
  WizardStateContext,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

function NextButton() {
  const state = useContext(WizardStateContext);
  return <Button slot="next">{state?.canFinish ? 'Finish' : 'Next'}</Button>;
}

export function DefaultExample() {
  const [isOpen, setOpen] = useState(false);
  const [finished, setFinished] = useState(false);

  return (
    <>
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <Button>Start setup</Button>
        <Wizard
          onFinish={function finishSetup() {
            setFinished(true);
            setOpen(false);
          }}
        >
          <Heading slot="title">Setup</Heading>
          <CloseButton />
          <WizardSteps>
            <WizardStep id="details" label="Details">
              <Heading>Details</Heading>
              <TextField>
                <Label>Account name</Label>
                <Input />
              </TextField>
            </WizardStep>
            <WizardStep id="review" label="Review">
              <Heading>Review</Heading>
              <p>Review your account</p>
            </WizardStep>
          </WizardSteps>
          <Footer>
            <WizardStepsMenu />
            <ButtonGroup>
              <Button slot="previous">Previous</Button>
              <NextButton />
            </ButtonGroup>
          </Footer>
        </Wizard>
      </DialogTrigger>
      {finished && <p role="status">Setup finished</p>}
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`composed-navigation`,children:`Composed Navigation`}),`
`,(0,w.jsx)(t.p,{children:`Consumer-composed navigation, menu, and close controls.`}),`
`,(0,w.jsx)(i,{of:u,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useContext } from 'react';
import {
  Button,
  ButtonGroup,
  CloseButton,
  DialogTrigger,
  Footer,
  Wizard,
  WizardStateContext,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

function CustomControl() {
  const state = useContext(WizardStateContext);
  if (!state) throw new Error('Missing Wizard state');
  return <Button onPress={() => state.goToStep('review')}>Revisit review</Button>;
}

export function ComposedNavigationExample({
  footerElevation,
  onNextPress,
  onFinish
}: {
  footerElevation?: 'base';
  onNextPress?: () => void;
  onFinish?: () => void;
} = {}) {
  return (
    <DialogTrigger>
      <Button>Open composed wizard</Button>
      <Wizard aria-label="Composed workflow" onFinish={onFinish}>
        <CloseButton />
        <WizardSteps>
          <WizardStep id="details" label="Details">
            Account details
          </WizardStep>
          <WizardStep id="review" label="Review">
            Review account
          </WizardStep>
          <WizardStep id="confirm" label="Confirm">
            Confirm account
          </WizardStep>
        </WizardSteps>
        <Footer data-testid="wizard-footer" elevation={footerElevation}>
          <WizardStepsMenu />
          <ButtonGroup>
            <Button slot="next" onPress={onNextPress}>
              Next
            </Button>
            <Button slot="previous">Previous</Button>
            <CustomControl />
            <Button slot="close">Cancel</Button>
          </ButtonGroup>
        </Footer>
      </Wizard>
    </DialogTrigger>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controlled-validation`,children:`Controlled Validation`}),`
`,(0,w.jsx)(t.p,{children:`Validate in the application before accepting navigation; submit through the final action.`}),`
`,(0,w.jsx)(i,{of:d,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  DialogTrigger,
  Footer,
  Heading,
  Input,
  Label,
  TextField,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu,
  type WizardProps
} from '@godaddy/antares';

export function ControlledValidationExample() {
  const [isOpen, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<NonNullable<WizardProps['activeStep']>>('details');
  const [accountName, setAccountName] = useState('');
  const [error, setError] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  function requestStep(step: NonNullable<WizardProps['activeStep']>) {
    if (step === 'review' && !accountName.trim()) {
      setError('Enter an account name to continue.');
      return;
    }
    setError('');
    setActiveStep(step);
  }

  return (
    <>
      <DialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
        <Button>Create account</Button>
        <Wizard
          activeStep={activeStep}
          onStepChange={requestStep}
          onFinish={function createAccount() {
            setSubmittedName(accountName);
            setOpen(false);
          }}
        >
          <Heading slot="title">Create an account</Heading>
          <WizardSteps>
            <WizardStep id="details" label="Account details">
              <Heading>Account details</Heading>
              <TextField>
                <Label>Account name</Label>
                <Input value={accountName} onChange={(event) => setAccountName(event.target.value)} />
              </TextField>
              {error && <p role="alert">{error}</p>}
            </WizardStep>
            <WizardStep id="review" label="Review">
              <Heading>Review</Heading>
              <p>Account: {accountName}</p>
            </WizardStep>
          </WizardSteps>
          <Footer>
            <WizardStepsMenu />
            <ButtonGroup>
              <Button slot="previous">Previous</Button>
              <Button slot="next">{activeStep === 'review' ? 'Finish' : 'Next'}</Button>
              <Button slot="close">Cancel</Button>
            </ButtonGroup>
          </Footer>
        </Wizard>
      </DialogTrigger>
      {submittedName && <p role="status">Account created for {submittedName}</p>}
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`items`,children:`Items`}),`
`,(0,w.jsx)(t.p,{children:`Render steps from keyed items. Reorder and insert while the dialog is open without losing surviving field values.`}),`
`,(0,w.jsx)(i,{of:m,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useState } from 'react';
import {
  Button,
  DialogTrigger,
  Footer,
  Input,
  Label,
  TextField,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu
} from '@godaddy/antares';

export function ItemsExample() {
  const [items, setItems] = useState([
    { id: 'details', label: 'Details' },
    { id: 'review', label: 'Review' }
  ]);

  return (
    <DialogTrigger>
      <Button>Open items workflow</Button>
      <Wizard aria-label="Items workflow">
        <Button
          onPress={() =>
            setItems((current) =>
              current.some((item) => item.id === 'confirm')
                ? current
                : [...current.slice().reverse(), { id: 'confirm', label: 'Confirm' }]
            )
          }
        >
          Reorder and add step
        </Button>
        <WizardSteps items={items}>
          {(item) => (
            <WizardStep id={item.id} label={item.label}>
              <TextField>
                <Label>{item.label} notes</Label>
                <Input />
              </TextField>
            </WizardStep>
          )}
        </WizardSteps>
        <Footer>
          <WizardStepsMenu />
          <Button slot="previous">Previous</Button>
          <Button slot="next">Next</Button>
          <Button slot="close">Close</Button>
        </Footer>
      </Wizard>
    </DialogTrigger>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`lifecycle`,children:`Lifecycle`}),`
`,(0,w.jsx)(t.p,{children:`App-managed dismissal and optional app-managed navigation in a reusable workflow.`}),`
`,(0,w.jsx)(i,{of:h,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useState } from 'react';
import {
  Button,
  DialogTrigger,
  Footer,
  Wizard,
  WizardStep,
  WizardSteps,
  WizardStepsMenu,
  type WizardProps
} from '@godaddy/antares';

export function LifecycleExample({
  allowClose = true,
  allowNavigation = true,
  controlled = false,
  defaultActiveStep,
  isKeyboardDismissDisabled = false
}: {
  allowClose?: boolean;
  allowNavigation?: boolean;
  controlled?: boolean;
  defaultActiveStep?: WizardProps['defaultActiveStep'];
  isKeyboardDismissDisabled?: boolean;
} = {}) {
  const [isOpen, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<WizardProps['activeStep']>('details');

  return (
    <>
      <Button>Outside workflow</Button>
      <DialogTrigger isOpen={isOpen} onOpenChange={(open) => (open || allowClose) && setOpen(open)}>
        <Button>Open lifecycle</Button>
        <Wizard
          aria-label="Lifecycle workflow"
          defaultActiveStep={defaultActiveStep}
          activeStep={controlled ? activeStep : undefined}
          onStepChange={controlled ? (key) => allowNavigation && setActiveStep(key) : undefined}
          isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        >
          <WizardSteps>
            <WizardStep id="details" label="Details">
              <input aria-label="Details entry" />
            </WizardStep>
            <WizardStep id="review" label="Review">
              <input aria-label="Review entry" />
            </WizardStep>
            <WizardStep id="confirm" label="Confirm">
              <input aria-label="Confirm entry" />
            </WizardStep>
          </WizardSteps>
          <Footer>
            <WizardStepsMenu />
            <Button slot="previous">Previous</Button>
            <Button slot="next">Next</Button>
            <Button slot="close">Close workflow</Button>
          </Footer>
        </Wizard>
      </DialogTrigger>
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`navigation`,children:`Navigation`}),`
`,(0,w.jsx)(t.p,{children:`Navigate through a static collection with custom controls.`}),`
`,(0,w.jsx)(i,{of:g,inline:!0}),`
`,(0,w.jsx)(r,{code:`import { useContext } from 'react';
import {
  Button,
  DialogTrigger,
  Wizard,
  WizardStateContext,
  WizardStep,
  WizardSteps,
  type WizardProps
} from '@godaddy/antares';

function Controls() {
  const state = useContext(WizardStateContext);
  if (!state) throw new Error('Missing Wizard state');

  return (
    <>
      <output aria-label="Current step">{String(state.activeStep)}</output>
      <output aria-label="Position">{state.activePosition}</output>
      <output aria-label="Visited steps">{[...state.visitedSteps].join(', ')}</output>
      <output aria-label="Step order">{state.collection.join(', ')}</output>
      <Button onPress={state.previous} isDisabled={!state.canPrevious}>
        Previous
      </Button>
      <Button onPress={state.next} isDisabled={!state.canNext}>
        Next
      </Button>
      <Button onPress={() => state.goToStep('review')}>Review directly</Button>
    </>
  );
}

export function NavigationExample({
  defaultActiveStep,
  activeStep,
  onStepChange
}: Pick<WizardProps, 'defaultActiveStep' | 'activeStep' | 'onStepChange'> = {}) {
  return (
    <DialogTrigger>
      <Button>Open navigation</Button>
      <Wizard
        aria-label="Navigation"
        defaultActiveStep={defaultActiveStep}
        activeStep={activeStep}
        onStepChange={onStepChange}
      >
        <WizardSteps>
          <WizardStep id="details" label="Details">
            <Controls />
          </WizardStep>
          <WizardStep id="review" label="Review">
            <Controls />
          </WizardStep>
          <WizardStep id="confirm" label="Confirm">
            <Controls />
          </WizardStep>
        </WizardSteps>
      </Wizard>
    </DialogTrigger>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,w.jsxs)(t.p,{children:[`The backdrop uses the shared `,(0,w.jsx)(t.code,{children:`--modal-overlay-bg`}),` property, with the same fallback as `,(0,w.jsx)(t.code,{children:`Modal`}),`.`]}),`
`,(0,w.jsxs)(t.p,{children:[`Compose exactly one `,(0,w.jsx)(t.code,{children:`WizardSteps`}),` inside `,(0,w.jsx)(t.code,{children:`Wizard`}),`. Each `,(0,w.jsx)(t.code,{children:`WizardStep`}),` needs a stable `,(0,w.jsx)(t.code,{children:`id`}),` and a `,(0,w.jsx)(t.code,{children:`label`}),`; the label names its menu entry and step region. Place your own headings, fields, and other content inside each step. An empty collection is valid. For dynamic steps, pass `,(0,w.jsx)(t.code,{children:`items`}),` and a render function to `,(0,w.jsx)(t.code,{children:`WizardSteps`}),` as shown in the Items example. Surviving keyed steps keep their local state across reorders while the dialog is open.`]}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`Wizard`}),` supplies a full-screen modal and dialog; the ordinary `,(0,w.jsx)(t.code,{children:`Button`}),` inside `,(0,w.jsx)(t.code,{children:`DialogTrigger`}),` opens it. Use `,(0,w.jsx)(t.code,{children:`DialogTrigger`}),`'s `,(0,w.jsx)(t.code,{children:`isOpen`}),`, `,(0,w.jsx)(t.code,{children:`defaultOpen`}),`, and `,(0,w.jsx)(t.code,{children:`onOpenChange`}),` to manage opening. Use `,(0,w.jsx)(t.code,{children:`activeStep`}),`, `,(0,w.jsx)(t.code,{children:`defaultActiveStep`}),`, and `,(0,w.jsx)(t.code,{children:`onStepChange`}),` on `,(0,w.jsx)(t.code,{children:`Wizard`}),` to manage navigation independently. The callback receives `,(0,w.jsx)(t.code,{children:`(destination, { previousStep, reason })`}),`, where `,(0,w.jsx)(t.code,{children:`reason`}),` is `,(0,w.jsx)(t.code,{children:`next`}),`, `,(0,w.jsx)(t.code,{children:`previous`}),`, or `,(0,w.jsx)(t.code,{children:`menu`}),`. In controlled mode it is a `,(0,w.jsx)(t.strong,{children:`request`}),`: the displayed step changes only after the app updates `,(0,w.jsx)(t.code,{children:`activeStep`}),`. The Controlled Validation example checks its own field before doing so. Supply `,(0,w.jsx)(t.code,{children:`onFinish`}),` to enable the final step's next-slot action; the callback decides whether to submit or close the dialog. Without `,(0,w.jsx)(t.code,{children:`onFinish`}),`, the next-slot button remains disabled on the last step.`]}),`
`,(0,w.jsxs)(t.p,{children:[`Compose `,(0,w.jsx)(t.code,{children:`Footer`}),`, `,(0,w.jsx)(t.code,{children:`WizardStepsMenu`}),`, and `,(0,w.jsx)(t.code,{children:`Button slot="previous"`}),` / `,(0,w.jsx)(t.code,{children:`Button slot="next"`}),` where you need them. Slot buttons are disabled when their action is unavailable and keep their authored position. The next slot invokes `,(0,w.jsx)(t.code,{children:`onFinish`}),` on the final step when supplied; you choose its label (for example, "Finish") in your composed button. The menu only permits previously displayed destinations; visits are recorded on activation, not on a rejected request. `,(0,w.jsx)(t.code,{children:`Footer`}),` receives raised elevation by default and can be overridden with its own `,(0,w.jsx)(t.code,{children:`elevation`}),`. `,(0,w.jsx)(t.code,{children:`Button slot="close"`}),` and `,(0,w.jsx)(t.code,{children:`CloseButton`}),` use the dialog's close action. To build other navigation controls, read `,(0,w.jsx)(t.code,{children:`WizardStateContext`}),` with React's `,(0,w.jsx)(t.code,{children:`useContext`}),` and use `,(0,w.jsx)(t.code,{children:`previous`}),`, `,(0,w.jsx)(t.code,{children:`next`}),`, `,(0,w.jsx)(t.code,{children:`finish`}),`, or `,(0,w.jsx)(t.code,{children:`goToStep`}),` (the latter permits visited destinations only). `,(0,w.jsx)(t.code,{children:`canFinish`}),` identifies an available final action; `,(0,w.jsx)(t.code,{children:`useWizardState`}),` creates state, not a context reader.`]}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsxs)(t.p,{children:[`Give the dialog a name with a composed `,(0,w.jsx)(t.code,{children:`Heading slot="title"`}),` or an `,(0,w.jsx)(t.code,{children:`aria-label`}),`. Each step's `,(0,w.jsx)(t.code,{children:`label`}),` names its content region. Compose a `,(0,w.jsx)(t.code,{children:`CloseButton`}),` or `,(0,w.jsx)(t.code,{children:`Button slot="close"`}),` when a visible exit is needed. Escape closes by default; backdrop clicks do not.`]}),`
`,(0,w.jsxs)(t.p,{children:[`Set `,(0,w.jsx)(t.code,{children:`isKeyboardDismissDisabled`}),` to prevent Escape dismissal. React Aria contains focus while open and restores it to the trigger after closing. A controlled `,(0,w.jsx)(t.code,{children:`onOpenChange`}),` may decline a close request without resetting the active step or visits.`]}),`
`,(0,w.jsx)(t.p,{children:`Inactive steps remain mounted but are hidden and inert. Their local field values survive navigation within an opening; a new opening resets uncontrolled step selection and visit history. An actual step change focuses its named region. Controlled invalid keys show no active step until the app selects a valid key.`}),`
`,(0,w.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,w.jsxs)(t.p,{children:[`Keep validation and submission in the consuming app. Check the requested step and navigation reason before accepting controlled navigation; do not rely on a button's local `,(0,w.jsx)(t.code,{children:`onPress`}),` to cancel the navigation slot's handler. Supply `,(0,w.jsx)(t.code,{children:`onFinish`}),` for the app's final action; it does not automatically close the dialog. Use a stable item ID rather than a position for steps that can move or be removed. Add a visible exit control when users need to leave without using Escape.`]}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`<DialogTrigger>
  <Button />
  <Wizard>
    <Heading slot="title" />
    <WizardSteps>
      <WizardStep id="first" label="First" />
    </WizardSteps>
    <Footer>
      <WizardStepsMenu />
      <ButtonGroup>
        <Button slot="previous" />
        <Button slot="next" />
      </ButtonGroup>
    </Footer>
    {/* ... */}
  </Wizard>
</DialogTrigger>
`})}),`
`,(0,w.jsx)(a,{of:_}),`
`,(0,w.jsx)(a,{of:p}),`
`,(0,w.jsx)(a,{of:y}),`
`,(0,w.jsx)(a,{of:v})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),c(),s(),l(),x()}))();export{C as default};