import{j as e}from"./iframe-Bb1NQHs5.js";import{useMDXComponents as r}from"./index-D4oHENfc.js";import{M as o}from"./blocks-DWBbPI5V.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DFII15ob.js";import"./index-DinWVzWV.js";import"./index-C2u_IMHF.js";import"./index-DrFu-skq.js";function t(n){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Architecture/Guides/Composition"}),`
`,e.jsx(s.h1,{id:"composition",children:"Composition"}),`
`,e.jsxs(s.p,{children:["Bento components are built using a composition model. Instead of monolithic components with dozens of props, you compose smaller primitives together, with an ",e.jsx(s.strong,{children:"orchestrator"})," component coordinating behavior through the ",e.jsx(s.a,{href:"/docs/higher-order-components-slots--overview",children:"slot system"}),"."]}),`
`,e.jsx(s.h2,{id:"the-orchestrator-pattern",children:"The Orchestrator Pattern"}),`
`,e.jsx(s.p,{children:"An orchestrator is a component that:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Manages state and behavior (often via React Aria hooks)"}),`
`,e.jsx(s.li,{children:"Passes props, handlers, and state to its children through slots"}),`
`,e.jsx(s.li,{children:"Doesn't render much DOM itself—it coordinates"}),`
`]}),`
`,e.jsxs(s.p,{children:["The children are composable primitives that receive functionality from their parent orchestrator via their ",e.jsx(s.code,{children:"slot"})," prop."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`<BentoBox>
  <Lid slot="trigger">Open</Lid>
  <Nori slot="overlay">
    <Rice slot="panel">
      <Miso slot="title">Confirm Action</Miso>
      <Edamame slot="description">Are you sure?</Edamame>
      <Wasabi slot="close">Cancel</Wasabi>
      <Ginger slot="confirm">OK</Ginger>
    </Rice>
  </Nori>
</BentoBox>
`})}),`
`,e.jsx(s.p,{children:"In this example:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"BentoBox"})," is the orchestrator—it manages state and distributes behavior"]}),`
`,e.jsx(s.li,{children:"The child primitives receive functionality through their slot assignments"}),`
`,e.jsx(s.li,{children:"The component names are arbitrary—any primitive can fill any slot. What matters is the slot assignment."}),`
`]}),`
`,e.jsx(s.p,{children:"This pattern lets you:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Reuse primitives"})," across different orchestrators"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Customize structure"})," by swapping which primitive fills a slot"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Add your own elements"})," between the slotted children"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Style each part independently"})," without fighting component internals"]}),`
`]}),`
`,e.jsx(s.h2,{id:"building-an-orchestrator",children:"Building an Orchestrator"}),`
`,e.jsx(s.p,{children:"An orchestrator component typically:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Creates state"})," using React Aria/Stately hooks"]}),`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:["Calls ",e.jsx(s.code,{children:"useProps"})]})," to enable render props and slot processing"]}),`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:["Calls ",e.jsx(s.code,{children:"useDataAttributes"})]})," to expose state for styling"]}),`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:["Passes behavior via ",e.jsx(s.code,{children:"slots"})]})," to distribute props to children"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { useDataAttributes } from '@bento/use-data-attributes';
import { Container } from '@bento/container';
import { useOverlayTriggerState } from 'react-stately';
import { useOverlayTrigger } from 'react-aria';

export const BentoBox = withSlots('BentoBox', function BentoBox(props, ref) {
  // 1. Create state
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state);

  // 2. Enable render props and slot processing
  const { apply } = useProps(props, { isOpen: state.isOpen }, ref);

  // 3. Expose state for styling
  const dataAttributes = useDataAttributes({ open: state.isOpen });

  // 4. Pass behavior via slots
  return (
    <Container
      {...apply()}
      {...dataAttributes}
      slots={{
        trigger: { ...triggerProps },
        overlay: state.isOpen ? { ...overlayProps } : null,
        close: { onPress: state.close }
      }}
    />
  );
});
`})}),`
`,e.jsx(s.p,{children:"The orchestrator doesn't know or care what component fills each slot. It just passes the right props. Consumers decide the structure."}),`
`,e.jsx(s.h3,{id:"using-the-slot-component",children:"Using the Slot Component"}),`
`,e.jsxs(s.p,{children:["Most orchestrators render a ",e.jsx(s.code,{children:"Container"})," and pass ",e.jsx(s.code,{children:"slots"})," as a prop. But if your orchestrator shouldn't render any wrapping DOM element, use the ",e.jsx(s.code,{children:"Slot"})," component from ",e.jsx(s.code,{children:"@bento/box"})," to provide slots via context:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { Slot } from '@bento/box';

export const MinimalOrchestrator = withSlots('MinimalOrchestrator', function MinimalOrchestrator(...args) {
  const { props } = useProps(args);

  return (
    <Slot slots={{ trigger: { onClick: handleClick }, content: { role: 'dialog' } }}>
      {props.children}
    </Slot>
  );
});
`})}),`
`,e.jsxs(s.p,{children:["This is how ",e.jsx(s.code,{children:"Overlay"})," works—it coordinates children without adding DOM."]}),`
`,e.jsxs(s.p,{children:["For details on how slots receive and merge props, see the ",e.jsx(s.a,{href:"/docs/higher-order-components-slots--overview",children:"slot system documentation"}),"."]}),`
`,e.jsx(s.h2,{id:"choosing-what-to-render",children:"Choosing What to Render"}),`
`,e.jsx(s.p,{children:"When building components, always use Bento primitives or Container:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Existing Bento Primitives"})," — If one exists for what you need, use it. Primitives come with accessibility, keyboard handling, and slot support built in."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Container"})," — For everything else. It's polymorphic (supports ",e.jsx(s.code,{children:"as"}),"), integrates with ",e.jsx(s.code,{children:"useProps"}),", and participates in the slot system."]}),`
`]}),`
`,e.jsxs(s.p,{children:["Raw HTML elements (",e.jsx(s.code,{children:"<button>"}),", ",e.jsx(s.code,{children:"<input>"}),", etc.) should only appear inside primitive implementations themselves—not in orchestrators or consumer code. Using raw HTML bypasses the slot system, render props, and ref handling."]}),`
`,e.jsx(s.h2,{id:"slot-naming",children:"Slot Naming"}),`
`,e.jsxs(s.p,{children:["Name slots by ",e.jsx(s.strong,{children:"semantic purpose"}),", not implementation:"]}),`
`,e.jsxs(s.p,{children:["Good: ",e.jsx(s.code,{children:"trigger"}),", ",e.jsx(s.code,{children:"content"}),", ",e.jsx(s.code,{children:"title"}),", ",e.jsx(s.code,{children:"description"}),", ",e.jsx(s.code,{children:"close"}),", ",e.jsx(s.code,{children:"icon"})]}),`
`,e.jsxs(s.p,{children:["Avoid: ",e.jsx(s.code,{children:"button"}),", ",e.jsx(s.code,{children:"div"}),", ",e.jsx(s.code,{children:"wrapper"}),", ",e.jsx(s.code,{children:"span"})]}),`
`,e.jsx(s.h3,{id:"nested-slots",children:"Nested Slots"}),`
`,e.jsx(s.p,{children:"For complex components, use dot-separated namespaces:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"trigger"})," — the trigger element"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"trigger.icon"})," — icon inside the trigger"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"panel.title"})," — title inside the panel"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"panel.footer"})," — footer inside the panel"]}),`
`]}),`
`,e.jsx(s.h3,{id:"common-slot-names",children:"Common Slot Names"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Slot"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"trigger"})}),e.jsx(s.td,{children:"Element that activates something"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"content"})}),e.jsx(s.td,{children:"Main content area"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"title"})}),e.jsx(s.td,{children:"Heading/title element"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"description"})}),e.jsx(s.td,{children:"Help or body text"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"close"})}),e.jsx(s.td,{children:"Dismiss/close action"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"icon"})}),e.jsx(s.td,{children:"Visual icon"})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"header"})," / ",e.jsx(s.code,{children:"footer"})]}),e.jsx(s.td,{children:"Section containers"})]})]})]}),`
`,e.jsx(s.h2,{id:"when-slots-are-needed",children:"When Slots Are Needed"}),`
`,e.jsx(s.p,{children:"Slot assignments are only needed for children that don't receive the orchestrator's spread props directly."}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"No slot needed:"})," The root element receives ",e.jsx(s.code,{children:"{...processedProps}"}),", so any ",e.jsx(s.code,{children:"className"}),", ",e.jsx(s.code,{children:"style"}),", or other props passed to the orchestrator go directly to it. No slot assignment required."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`// Container receives spread props — no slot needed
<Container {...processedProps} {...dataAttributes} slots={{...}}>
  {children}
</Container>
`})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Slot needed:"})," Child components don't receive the spread props. They need a slot assignment so the orchestrator can pass behavior to them via the ",e.jsx(s.code,{children:"slots"})," object."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`// Children need slots to receive props from the orchestrator
<Lid slot="trigger">Open</Lid>
<Nori slot="overlay">...</Nori>
`})}),`
`,e.jsx(s.h2,{id:"summary",children:"Summary"}),`
`,e.jsx(s.p,{children:"The composition model in Bento:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Orchestrators"})," manage state and distribute behavior through slots"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Primitives"})," receive functionality via their ",e.jsx(s.code,{children:"slot"})," prop"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Consumers"})," compose the structure they need using existing primitives"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Slots"})," are named semantically"]}),`
`]}),`
`,e.jsxs(s.p,{children:["For the full slot API (object slots, function slots, slot merging), see ",e.jsx(s.a,{href:"/docs/higher-order-components-slots--overview",children:"withSlots"}),"."]})]})}function j(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}export{j as default};
