import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-jdtv006j.js";import{S as n,s as r,u as i}from"./blocks-mL7pNE1K.js";import{t as a}from"./mdx-react-shim-BfOCEV2Z.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/Guides/Composition`}),`
`,(0,c.jsx)(t.h1,{id:`composition`,children:`Composition`}),`
`,(0,c.jsxs)(t.p,{children:[`Bento components are built using a composition model. Instead of monolithic components with dozens of props, you compose smaller primitives together, with an `,(0,c.jsx)(t.strong,{children:`orchestrator`}),` component coordinating behavior through the `,(0,c.jsx)(t.a,{href:`/docs/higher-order-components-slots--overview`,children:`slot system`}),`.`]}),`
`,(0,c.jsx)(t.h2,{id:`the-orchestrator-pattern`,children:`The Orchestrator Pattern`}),`
`,(0,c.jsx)(t.p,{children:`An orchestrator is a component that:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Manages state and behavior (often via React Aria hooks)`}),`
`,(0,c.jsx)(t.li,{children:`Passes props, handlers, and state to its children through slots`}),`
`,(0,c.jsx)(t.li,{children:`Doesn't render much DOM itself—it coordinates`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`The children are composable primitives that receive functionality from their parent orchestrator via their `,(0,c.jsx)(t.code,{children:`slot`}),` prop.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<BentoBox>
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
`,(0,c.jsx)(t.p,{children:`In this example:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`BentoBox`}),` is the orchestrator—it manages state and distributes behavior`]}),`
`,(0,c.jsx)(t.li,{children:`The child primitives receive functionality through their slot assignments`}),`
`,(0,c.jsx)(t.li,{children:`The component names are arbitrary—any primitive can fill any slot. What matters is the slot assignment.`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`This pattern lets you:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Reuse primitives`}),` across different orchestrators`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Customize structure`}),` by swapping which primitive fills a slot`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Add your own elements`}),` between the slotted children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Style each part independently`}),` without fighting component internals`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`building-an-orchestrator`,children:`Building an Orchestrator`}),`
`,(0,c.jsx)(t.p,{children:`An orchestrator component typically:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Creates state`}),` using React Aria/Stately hooks`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Calls `,(0,c.jsx)(t.code,{children:`useProps`})]}),` to enable render props and slot processing`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Calls `,(0,c.jsx)(t.code,{children:`useDataAttributes`})]}),` to expose state for styling`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Passes behavior via `,(0,c.jsx)(t.code,{children:`slots`})]}),` to distribute props to children`]}),`
`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { withSlots } from '@bento/slots';
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
`,(0,c.jsx)(t.p,{children:`The orchestrator doesn't know or care what component fills each slot. It just passes the right props. Consumers decide the structure.`}),`
`,(0,c.jsx)(t.h3,{id:`using-the-slot-component`,children:`Using the Slot Component`}),`
`,(0,c.jsxs)(t.p,{children:[`Most orchestrators render a `,(0,c.jsx)(t.code,{children:`Container`}),` and pass `,(0,c.jsx)(t.code,{children:`slots`}),` as a prop. But if your orchestrator shouldn't render any wrapping DOM element, use the `,(0,c.jsx)(t.code,{children:`Slot`}),` component from `,(0,c.jsx)(t.code,{children:`@bento/box`}),` to provide slots via context:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Slot } from '@bento/box';

export const MinimalOrchestrator = withSlots('MinimalOrchestrator', function MinimalOrchestrator(...args) {
  const { props } = useProps(args);

  return (
    <Slot slots={{ trigger: { onClick: handleClick }, content: { role: 'dialog' } }}>
      {props.children}
    </Slot>
  );
});
`})}),`
`,(0,c.jsxs)(t.p,{children:[`This is how `,(0,c.jsx)(t.code,{children:`Overlay`}),` works—it coordinates children without adding DOM.`]}),`
`,(0,c.jsxs)(t.p,{children:[`For details on how slots receive and merge props, see the `,(0,c.jsx)(t.a,{href:`/docs/higher-order-components-slots--overview`,children:`slot system documentation`}),`.`]}),`
`,(0,c.jsx)(t.h2,{id:`choosing-what-to-render`,children:`Choosing What to Render`}),`
`,(0,c.jsx)(t.p,{children:`When building components, always use Bento primitives or Container:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Existing Bento Primitives`}),` — If one exists for what you need, use it. Primitives come with accessibility, keyboard handling, and slot support built in.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Container`}),` — For everything else. It's polymorphic (supports `,(0,c.jsx)(t.code,{children:`as`}),`), integrates with `,(0,c.jsx)(t.code,{children:`useProps`}),`, and participates in the slot system.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Raw HTML elements (`,(0,c.jsx)(t.code,{children:`<button>`}),`, `,(0,c.jsx)(t.code,{children:`<input>`}),`, etc.) should only appear inside primitive implementations themselves—not in orchestrators or consumer code. Using raw HTML bypasses the slot system, render props, and ref handling.`]}),`
`,(0,c.jsx)(t.h2,{id:`slot-naming`,children:`Slot Naming`}),`
`,(0,c.jsxs)(t.p,{children:[`Name slots by `,(0,c.jsx)(t.strong,{children:`semantic purpose`}),`, not implementation:`]}),`
`,(0,c.jsxs)(t.p,{children:[`Good: `,(0,c.jsx)(t.code,{children:`trigger`}),`, `,(0,c.jsx)(t.code,{children:`content`}),`, `,(0,c.jsx)(t.code,{children:`title`}),`, `,(0,c.jsx)(t.code,{children:`description`}),`, `,(0,c.jsx)(t.code,{children:`close`}),`, `,(0,c.jsx)(t.code,{children:`icon`})]}),`
`,(0,c.jsxs)(t.p,{children:[`Avoid: `,(0,c.jsx)(t.code,{children:`button`}),`, `,(0,c.jsx)(t.code,{children:`div`}),`, `,(0,c.jsx)(t.code,{children:`wrapper`}),`, `,(0,c.jsx)(t.code,{children:`span`})]}),`
`,(0,c.jsx)(t.h3,{id:`nested-slots`,children:`Nested Slots`}),`
`,(0,c.jsx)(t.p,{children:`For complex components, use dot-separated namespaces:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`trigger`}),` — the trigger element`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`trigger.icon`}),` — icon inside the trigger`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`panel.title`}),` — title inside the panel`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`panel.footer`}),` — footer inside the panel`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`common-slot-names`,children:`Common Slot Names`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot`}),(0,c.jsx)(t.th,{children:`Purpose`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`trigger`})}),(0,c.jsx)(t.td,{children:`Element that activates something`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`content`})}),(0,c.jsx)(t.td,{children:`Main content area`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`title`})}),(0,c.jsx)(t.td,{children:`Heading/title element`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`description`})}),(0,c.jsx)(t.td,{children:`Help or body text`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`close`})}),(0,c.jsx)(t.td,{children:`Dismiss/close action`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`icon`})}),(0,c.jsx)(t.td,{children:`Visual icon`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`header`}),` / `,(0,c.jsx)(t.code,{children:`footer`})]}),(0,c.jsx)(t.td,{children:`Section containers`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`when-slots-are-needed`,children:`When Slots Are Needed`}),`
`,(0,c.jsx)(t.p,{children:`Slot assignments are only needed for children that don't receive the orchestrator's spread props directly.`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`No slot needed:`}),` The root element receives `,(0,c.jsx)(t.code,{children:`{...processedProps}`}),`, so any `,(0,c.jsx)(t.code,{children:`className`}),`, `,(0,c.jsx)(t.code,{children:`style`}),`, or other props passed to the orchestrator go directly to it. No slot assignment required.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Container receives spread props — no slot needed
<Container {...processedProps} {...dataAttributes} slots={{...}}>
  {children}
</Container>
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Slot needed:`}),` Child components don't receive the spread props. They need a slot assignment so the orchestrator can pass behavior to them via the `,(0,c.jsx)(t.code,{children:`slots`}),` object.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Children need slots to receive props from the orchestrator
<Lid slot="trigger">Open</Lid>
<Nori slot="overlay">...</Nori>
`})}),`
`,(0,c.jsx)(t.h2,{id:`summary`,children:`Summary`}),`
`,(0,c.jsx)(t.p,{children:`The composition model in Bento:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Orchestrators`}),` manage state and distribute behavior through slots`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Primitives`}),` receive functionality via their `,(0,c.jsx)(t.code,{children:`slot`}),` prop`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Consumers`}),` compose the structure they need using existing primitives`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Slots`}),` are named semantically`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`For the full slot API (object slots, function slots, slot merging), see `,(0,c.jsx)(t.a,{href:`/docs/higher-order-components-slots--overview`,children:`withSlots`}),`.`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};