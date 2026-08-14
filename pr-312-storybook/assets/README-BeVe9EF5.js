import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DHUUK51X.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./progress-steps.stories-CTRDrSqI.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`progresssteps`,children:`ProgressSteps`}),`
`,(0,x.jsx)(t.p,{children:`A multi-step progress indicator for wizard and onboarding flows.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Horizontal and vertical orientations`}),`
`,(0,x.jsxs)(t.li,{children:[`Four completion statuses (`,(0,x.jsx)(t.code,{children:`none`}),`, `,(0,x.jsx)(t.code,{children:`partial`}),`, `,(0,x.jsx)(t.code,{children:`complete`}),`, `,(0,x.jsx)(t.code,{children:`error`}),`) with status icons`]}),`
`,(0,x.jsxs)(t.li,{children:[`Timeline (past / current / future) derived from a single `,(0,x.jsx)(t.code,{children:`currentStep`}),` prop`]}),`
`,(0,x.jsxs)(t.li,{children:[`Auto-generated step numbers (opt out with `,(0,x.jsx)(t.code,{children:`hideStepNumbers`}),`)`]}),`
`,(0,x.jsx)(t.li,{children:`Interactive (navigable) and inert (display-only) steps`}),`
`,(0,x.jsx)(t.li,{children:`Title truncation and RTL support`}),`
`,(0,x.jsxs)(t.li,{children:[`Rendered as a `,(0,x.jsx)(t.code,{children:`<nav>`}),` landmark with an ordered list for assistive technology`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsxs)(t.p,{children:[`A horizontal stepper. `,(0,x.jsx)(t.code,{children:`currentStep`}),` marks the active step; earlier steps are `,(0,x.jsx)(t.code,{children:`past`}),`, later are `,(0,x.jsx)(t.code,{children:`future`}),`. Each `,(0,x.jsx)(t.code,{children:`status`}),` sets the step's icon, and an `,(0,x.jsx)(t.code,{children:`error`}),` step turns its accent bar red.`]}),`
`,(0,x.jsx)(a,{of:_,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1}>
      <ProgressStep status="complete">Cart</ProgressStep>
      <ProgressStep status="partial">Shipping</ProgressStep>
      <ProgressStep status="error">Payment</ProgressStep>
      <ProgressStep>Review</ProgressStep>
    </ProgressSteps>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`not-started`,children:`Not started`}),`
`,(0,x.jsxs)(t.p,{children:[`No `,(0,x.jsx)(t.code,{children:`currentStep`}),`: the flow hasn't started, so every step is `,(0,x.jsx)(t.code,{children:`future`}),` and none is marked current.`]}),`
`,(0,x.jsx)(a,{of:l,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

export function NotStartedExample() {
  return (
    <ProgressSteps aria-label="Checkout">
      <ProgressStep>Cart</ProgressStep>
      <ProgressStep>Shipping</ProgressStep>
      <ProgressStep>Payment</ProgressStep>
      <ProgressStep>Review</ProgressStep>
    </ProgressSteps>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`vertical`,children:`Vertical`}),`
`,(0,x.jsx)(t.p,{children:`Vertical orientation: accent bar on the leading edge, steps stacked in a column.`}),`
`,(0,x.jsx)(a,{of:u,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

export function VerticalExample() {
  return (
    <ProgressSteps aria-label="Onboarding" orientation="vertical" currentStep={1}>
      <ProgressStep status="complete">Create account</ProgressStep>
      <ProgressStep status="partial">Verify email</ProgressStep>
      <ProgressStep>Add payment method</ProgressStep>
      <ProgressStep>Invite your team</ProgressStep>
    </ProgressSteps>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`interactive`,children:`Interactive`}),`
`,(0,x.jsxs)(t.p,{children:[`Interactive steps: each `,(0,x.jsx)(t.code,{children:`onPress`}),` navigates the wizard by updating `,(0,x.jsx)(t.code,{children:`currentStep`}),`.`]}),`
`,(0,x.jsx)(a,{of:d,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { ProgressSteps, ProgressStep } from '@godaddy/antares';
import { useState } from 'react';

const steps = ['Cart', 'Shipping', 'Payment', 'Review'];

export function InteractiveExample() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <ProgressSteps aria-label="Checkout" currentStep={currentStep}>
      {steps.map((label, index) => (
        <ProgressStep
          key={label}
          status={index < currentStep ? 'complete' : index === currentStep ? 'partial' : 'none'}
          onPress={() => setCurrentStep(index)}
        >
          {label}
        </ProgressStep>
      ))}
    </ProgressSteps>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,x.jsx)(t.p,{children:`A disabled interactive step is muted, not focusable, and cannot be activated.`}),`
`,(0,x.jsx)(a,{of:p,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1}>
      <ProgressStep status="complete" onPress={() => undefined}>
        Cart
      </ProgressStep>
      <ProgressStep status="partial" onPress={() => undefined}>
        Shipping
      </ProgressStep>
      <ProgressStep onPress={() => undefined} isDisabled>
        Payment
      </ProgressStep>
      <ProgressStep onPress={() => undefined} isDisabled>
        Review
      </ProgressStep>
    </ProgressSteps>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`hide-step-numbers`,children:`Hide Step Numbers`}),`
`,(0,x.jsxs)(t.p,{children:[`Step numbers are shown by default; `,(0,x.jsx)(t.code,{children:`hideStepNumbers`}),` omits the "N. " prefix.`]}),`
`,(0,x.jsx)(a,{of:h,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

export function HideStepNumbersExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1} hideStepNumbers>
      <ProgressStep status="complete">Cart</ProgressStep>
      <ProgressStep status="partial">Shipping</ProgressStep>
      <ProgressStep>Payment</ProgressStep>
    </ProgressSteps>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Step numbers (`,(0,x.jsx)(t.code,{children:`"N. "`}),`) are prepended automatically — keep them where possible, as user testing shows people recognize the component better with them. Set `,(0,x.jsx)(t.code,{children:`hideStepNumbers`}),` to omit them.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`orientation`}),` switches between `,(0,x.jsx)(t.code,{children:`horizontal`}),` (accent bar on top) and `,(0,x.jsx)(t.code,{children:`vertical`}),` (accent bar on the leading edge).`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`currentStep`}),` is the single source of truth for the timeline. Omit it for a not-yet-started flow where every step is `,(0,x.jsx)(t.code,{children:`future`}),`; pass the step count for a fully completed flow where every step is `,(0,x.jsx)(t.code,{children:`past`}),`.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`status`}),` is independent of timeline and only controls the status icon and (for `,(0,x.jsx)(t.code,{children:`error`}),`) the accent bar color.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Pass `,(0,x.jsx)(t.code,{children:`className`}),` to the container or an individual step to extend the styles.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`The container renders a `,(0,x.jsx)(t.code,{children:`<nav>`}),` landmark; set `,(0,x.jsx)(t.code,{children:`aria-label`}),` to name it (defaults to `,(0,x.jsx)(t.code,{children:`"Progress"`}),`).`]}),`
`,(0,x.jsxs)(t.li,{children:[`Steps are an ordered list (`,(0,x.jsx)(t.code,{children:`<ol>`}),`/`,(0,x.jsx)(t.code,{children:`<li>`}),`) so assistive technology conveys position and count.`]}),`
`,(0,x.jsxs)(t.li,{children:[`The current step is marked with `,(0,x.jsx)(t.code,{children:`aria-current="step"`}),`.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Interactive steps are real buttons: focusable in the natural `,(0,x.jsx)(t.strong,{children:`Tab`}),` order and activated with `,(0,x.jsx)(t.strong,{children:`Enter`}),` or `,(0,x.jsx)(t.strong,{children:`Space`}),`. Status icons are decorative (`,(0,x.jsx)(t.code,{children:`aria-hidden`}),`).`]}),`
`,(0,x.jsxs)(t.li,{children:[`Focus is shown with a visible outline; disabled steps use `,(0,x.jsx)(t.code,{children:`0.4`}),` opacity and are not focusable.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Drive the timeline from `,(0,x.jsx)(t.code,{children:`currentStep`}),` rather than styling individual steps.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Provide `,(0,x.jsx)(t.code,{children:`onPress`}),` only for steps a user can actually navigate to; leave it off for display-only steps.`]}),`
`,(0,x.jsx)(t.li,{children:`Keep titles short — they truncate with an ellipsis when space is tight.`}),`
`,(0,x.jsxs)(t.li,{children:[`Always give the container an `,(0,x.jsx)(t.code,{children:`aria-label`}),` that describes the flow (e.g. `,(0,x.jsx)(t.code,{children:`"Checkout progress"`}),`).`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`No step is highlighted:`}),` `,(0,x.jsx)(t.code,{children:`currentStep`}),` is omitted, negative, or out of range. Set it to the active step's 0-based index.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`A step isn't clickable:`}),` it has no `,(0,x.jsx)(t.code,{children:`onPress`}),`, so it's inert by design. Add `,(0,x.jsx)(t.code,{children:`onPress`}),` to make it interactive.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Titles overflow:`}),` that's expected — titles truncate. Shorten the title.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`ProgressSteps`}),` component has the following props:`]}),`
`,(0,x.jsx)(o,{of:g}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`ProgressStep`}),` component has the following props:`]}),`
`,(0,x.jsx)(o,{of:m})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=t(),n(),c(),f()})))()}S();export{b as default};