import{i as e}from"./preload-helper-MxSc4jeG.js";import{y as t}from"./iframe-CmcaxmL_.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-PlepvVJt.js";import{t as c}from"./mdx-react-shim-AP9rA09w.js";import{Default as l,Disabled as u,HideStepNumbers as d,Interactive as f,NotStarted as p,Props as m,Vertical as h,n as g,t as _}from"./progress-steps.stories-Ct9xr6io.js";var v,y=e((()=>{v=`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1}>
      <ProgressStep status="complete">Cart</ProgressStep>
      <ProgressStep status="partial">Shipping</ProgressStep>
      <ProgressStep status="error">Payment</ProgressStep>
      <ProgressStep>Review</ProgressStep>
    </ProgressSteps>
  );
}
`})),b,x=e((()=>{b=`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** No \`currentStep\`: the flow hasn't started, so every step is \`future\` and none is marked current. */
export function NotStartedExample() {
  return (
    <ProgressSteps aria-label="Checkout">
      <ProgressStep>Cart</ProgressStep>
      <ProgressStep>Shipping</ProgressStep>
      <ProgressStep>Payment</ProgressStep>
      <ProgressStep>Review</ProgressStep>
    </ProgressSteps>
  );
}
`})),S,C=e((()=>{S=`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** Vertical orientation: accent bar on the leading edge, steps stacked in a column. */
export function VerticalExample() {
  return (
    <ProgressSteps aria-label="Onboarding" orientation="vertical" currentStep={1}>
      <ProgressStep status="complete">Create account</ProgressStep>
      <ProgressStep status="partial">Verify email</ProgressStep>
      <ProgressStep>Add payment method</ProgressStep>
      <ProgressStep>Invite your team</ProgressStep>
    </ProgressSteps>
  );
}
`})),w,T=e((()=>{w=`import { ProgressSteps, ProgressStep } from '@godaddy/antares';
import { useState } from 'react';

const steps = ['Cart', 'Shipping', 'Payment', 'Review'];

/** Interactive steps: each \`onPress\` navigates the wizard by updating \`currentStep\`. */
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
}
`})),E,D=e((()=>{E=`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** A disabled interactive step is muted, not focusable, and cannot be activated. */
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
}
`})),O,k=e((()=>{O=`import { ProgressSteps, ProgressStep } from '@godaddy/antares';

/** Step numbers are shown by default; \`hideStepNumbers\` omits the "N. " prefix. */
export function HideStepNumbersExample() {
  return (
    <ProgressSteps aria-label="Checkout" currentStep={1} hideStepNumbers>
      <ProgressStep status="complete">Cart</ProgressStep>
      <ProgressStep status="partial">Shipping</ProgressStep>
      <ProgressStep>Payment</ProgressStep>
    </ProgressSteps>
  );
}
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:g,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`progresssteps`,children:`ProgressSteps`}),`
`,(0,M.jsx)(t.p,{children:`A multi-step progress indicator for wizard and onboarding flows.`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`Horizontal and vertical orientations`}),`
`,(0,M.jsxs)(t.li,{children:[`Four completion statuses (`,(0,M.jsx)(t.code,{children:`none`}),`, `,(0,M.jsx)(t.code,{children:`partial`}),`, `,(0,M.jsx)(t.code,{children:`complete`}),`, `,(0,M.jsx)(t.code,{children:`error`}),`) with status icons`]}),`
`,(0,M.jsxs)(t.li,{children:[`Timeline (past / current / future) derived from a single `,(0,M.jsx)(t.code,{children:`currentStep`}),` prop`]}),`
`,(0,M.jsxs)(t.li,{children:[`Auto-generated step numbers (opt out with `,(0,M.jsx)(t.code,{children:`hideStepNumbers`}),`)`]}),`
`,(0,M.jsx)(t.li,{children:`Interactive (navigable) and inert (display-only) steps`}),`
`,(0,M.jsx)(t.li,{children:`Title truncation and RTL support`}),`
`,(0,M.jsxs)(t.li,{children:[`Rendered as a `,(0,M.jsx)(t.code,{children:`<nav>`}),` landmark with an ordered list for assistive technology`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(a,{of:m}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,M.jsxs)(t.p,{children:[`A horizontal stepper. `,(0,M.jsx)(t.code,{children:`currentStep`}),` marks the active step; earlier steps are `,(0,M.jsx)(t.code,{children:`past`}),`, later are `,(0,M.jsx)(t.code,{children:`future`}),`. Each `,(0,M.jsx)(t.code,{children:`status`}),` sets the step's icon, and an `,(0,M.jsx)(t.code,{children:`error`}),` step turns its accent bar red.`]}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(t.h3,{id:`not-started`,children:`Not started`}),`
`,(0,M.jsxs)(t.p,{children:[`Omit `,(0,M.jsx)(t.code,{children:`currentStep`}),` for a flow that hasn't begun: every step is `,(0,M.jsx)(t.code,{children:`future`}),` and none is marked current.`]}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(t.h3,{id:`vertical`,children:`Vertical`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`orientation="vertical"`}),` to place the accent bar on the leading edge and stack steps in a column.`]}),`
`,(0,M.jsx)(i,{of:h,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(t.h3,{id:`interactive`,children:`Interactive`}),`
`,(0,M.jsxs)(t.p,{children:[`Give a step an `,(0,M.jsx)(t.code,{children:`onPress`}),` handler to make it navigable. Steps without `,(0,M.jsx)(t.code,{children:`onPress`}),` are inert.`]}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,M.jsx)(t.p,{children:`A disabled interactive step is muted, removed from the tab order, and cannot be activated.`}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(t.h3,{id:`hide-step-numbers`,children:`Hide step numbers`}),`
`,(0,M.jsxs)(t.p,{children:[`Step numbers are prepended automatically. Set `,(0,M.jsx)(t.code,{children:`hideStepNumbers`}),` to omit them.`]}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Step numbers (`,(0,M.jsx)(t.code,{children:`"N. "`}),`) are prepended automatically — keep them where possible, as user testing shows people recognize the component better with them. Set `,(0,M.jsx)(t.code,{children:`hideStepNumbers`}),` to omit them.`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`orientation`}),` switches between `,(0,M.jsx)(t.code,{children:`horizontal`}),` (accent bar on top) and `,(0,M.jsx)(t.code,{children:`vertical`}),` (accent bar on the leading edge).`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`currentStep`}),` is the single source of truth for the timeline. Omit it for a not-yet-started flow where every step is `,(0,M.jsx)(t.code,{children:`future`}),`; pass the step count for a fully completed flow where every step is `,(0,M.jsx)(t.code,{children:`past`}),`.`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`status`}),` is independent of timeline and only controls the status icon and (for `,(0,M.jsx)(t.code,{children:`error`}),`) the accent bar color.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Pass `,(0,M.jsx)(t.code,{children:`className`}),` to the container or an individual step to extend the styles.`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`The container renders a `,(0,M.jsx)(t.code,{children:`<nav>`}),` landmark; set `,(0,M.jsx)(t.code,{children:`aria-label`}),` to name it (defaults to `,(0,M.jsx)(t.code,{children:`"Progress"`}),`).`]}),`
`,(0,M.jsxs)(t.li,{children:[`Steps are an ordered list (`,(0,M.jsx)(t.code,{children:`<ol>`}),`/`,(0,M.jsx)(t.code,{children:`<li>`}),`) so assistive technology conveys position and count.`]}),`
`,(0,M.jsxs)(t.li,{children:[`The current step is marked with `,(0,M.jsx)(t.code,{children:`aria-current="step"`}),`.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Interactive steps are real buttons: focusable in the natural `,(0,M.jsx)(t.strong,{children:`Tab`}),` order and activated with `,(0,M.jsx)(t.strong,{children:`Enter`}),` or `,(0,M.jsx)(t.strong,{children:`Space`}),`. Status icons are decorative (`,(0,M.jsx)(t.code,{children:`aria-hidden`}),`).`]}),`
`,(0,M.jsxs)(t.li,{children:[`Focus is shown with a visible outline; disabled steps use `,(0,M.jsx)(t.code,{children:`0.4`}),` opacity and are not focusable.`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Drive the timeline from `,(0,M.jsx)(t.code,{children:`currentStep`}),` rather than styling individual steps.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Provide `,(0,M.jsx)(t.code,{children:`onPress`}),` only for steps a user can actually navigate to; leave it off for display-only steps.`]}),`
`,(0,M.jsx)(t.li,{children:`Keep titles short — they truncate with an ellipsis when space is tight.`}),`
`,(0,M.jsxs)(t.li,{children:[`Always give the container an `,(0,M.jsx)(t.code,{children:`aria-label`}),` that describes the flow (e.g. `,(0,M.jsx)(t.code,{children:`"Checkout progress"`}),`).`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`No step is highlighted:`}),` `,(0,M.jsx)(t.code,{children:`currentStep`}),` is omitted, negative, or out of range. Set it to the active step's 0-based index.`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`A step isn't clickable:`}),` it has no `,(0,M.jsx)(t.code,{children:`onPress`}),`, so it's inert by design. Add `,(0,M.jsx)(t.code,{children:`onPress`}),` to make it interactive.`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.strong,{children:`Titles overflow:`}),` that's expected — titles truncate. Shorten the title.`]}),`
`]})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),_(),y(),x(),C(),T(),D(),k()}))();export{j as default};