import{j as e}from"./iframe-Du6PjlSZ.js";import{useMDXComponents as i}from"./index-PW5r9cRf.js";import{M as o}from"./blocks-F0Y6jiat.js";import"./preload-helper-PPVm8Dsz.js";import"./index-niWSmtgG.js";import"./index-BtT7aVaE.js";import"./index-c3mBs9B0.js";function r(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Architecture/PDRs/Popover"}),`
`,e.jsx(n.h1,{id:"popover-primitive",children:"Popover primitive"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.code,{children:"Popover"})," is an overlay element positioned relative to a trigger. It is used to reveal additional information or functionality without taking the user away from their current context."]}),`
`,e.jsx(n.p,{children:"Common use cases include:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Action Menus"}),": Presenting a list of actions related to a specific object."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Contextual Help"}),": Providing explanations or guidance for a specific UI element."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pickers"}),": Selectors like color pickers or date pickers that appear near an input."]}),`
`]}),`
`,e.jsx(n.h3,{id:"core-primitive-packages",children:"Core Primitive Packages"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/popover"}),": The coordinator component that integrates positioning logic with the Overlay primitive."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"@bento/overlay"}),": The container primitive that handles portal rendering, focus management, and outside interactions. These are achieved via Overlay composition with the usage of its ",e.jsx(n.a,{href:"./overlay-primitive.mdx#core-primitive-packages",children:"core primitive packages"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"react-aria-integration",children:"React Aria Integration"}),`
`,e.jsx(n.p,{children:"The Popover primitive heavily relies on React Aria for accessibility and behavior:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"usePopover"}),": Used for positioning the popover relative to the trigger and managing its lifecycle (open/close). It handles:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Positioning"}),": Calculates the position of the popover based on the trigger's location and preferred placement (top, bottom, left, right)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arrow Positioning"}),": Calculates the position of the arrow to point correctly at the trigger."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Adaptivity"}),": Adjusts placement to fit within the viewport (flipping, shifting)."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useOverlayTriggerState"}),": Manages the state of the Popover"]}),`
`]}),`
`,e.jsx(n.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsxs(n.p,{children:["The Popover serves as a specialized configuration of the ",e.jsx(n.strong,{children:"Overlay"})," primitive. It leverages ",e.jsx(n.code,{children:"Overlay"})," for the heavy lifting of portaling and focus containment, while injecting the specific positioning logic provided by ",e.jsx(n.code,{children:"usePopover"}),". Also, provides the necessary slots with data and accessibility features to both the trigger and arrow components."]}),`
`,e.jsx(n.h3,{id:"component-structure",children:"Component Structure"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`Popover (State, Positioning Logic)
└─ Overlay (Container)
  ├─ Trigger (slot="trigger")
  ├─ Arrow (slot="arrow")
  └─ Content (slot="content", user-provided content)
`})}),`
`,e.jsx(n.h2,{id:"foundations-and-requirements",children:"Foundations and Requirements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MUST"})," use ",e.jsx(n.code,{children:"@bento/overlay"})," as the underlying container implementation."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MUST"})," support ",e.jsx(n.code,{children:"placement"})," prop (top, bottom, left, right) with RTL support."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MUST"})," support an ",e.jsx(n.code,{children:"arrow"})," element that aligns correctly with the trigger."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MUST"})," support custom trigger element from outside the Popover component."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MUST"})," support controlled/uncontrolled handling."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MUST"})," support RTL positioning."]}),`
`]}),`
`,e.jsx(n.h2,{id:"integration-approach",children:"Integration Approach"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Popover"})," component will act as a wrapper that:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Accepts ",e.jsx(n.code,{children:"placement"}),", ",e.jsx(n.code,{children:"offset"}),", and other positioning props."]}),`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:"usePopover"})," to calculate the styles and attributes required for the popover and arrow."]}),`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:"useLocale"})," to calculate the correct direction."]}),`
`,e.jsxs(n.li,{children:["Passes these calculated props down to the ",e.jsx(n.code,{children:"Overlay"})," and its children via slots."]}),`
`]}),`
`,e.jsx(n.h3,{id:"props-interface",children:"Props Interface"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { AriaPopoverProps } from 'react-aria';

interface PopoverProps extends AriaPopoverProps {
  /**
   * The placement of the popover relative to the trigger.
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * The visual offset from the trigger.
   */
  offset?: number;

  /**
   * The ref for the element which the popover positions itself with respect to.
   */
  triggerRef?: RefObject<Element | null>;

  /**
   * Whether the popover is open (controlled). Pass this prop to control the open state.
   */
  isOpen?: boolean;

  /**
   * Whether the popover is open by default (uncontrolled). Use this for uncontrolled usage.
   */
  defaultOpen?: boolean;

  /** Handler that is called when the popover's open state changes. */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * The user provided content
   */
  children?: React.ReactNode;
}
`})}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsx(n.p,{children:"The Popover follows the Bento composition model. It exposes slots for consumers."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`function DefaultExample() {
  return (
    <Popover>
      <Button slot="trigger">Open Popover</Button>

      <Icon slot="arrow">{/* ... */}</Icon>

      <Container slot="content">
        <Text as="h3">Popover Title</Text>
        <Text>This is the popover content.</Text>
      </Container>
    </Popover>
  );
}
`})}),`
`,e.jsxs(n.p,{children:["When the ",e.jsx(n.code,{children:"trigger"})," is outside the ",e.jsx(n.code,{children:"Popover"}),", you can use ",e.jsx(n.code,{children:"triggerRef"})," prop to pass the ref to the component the popover should be positioned relative to."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`function CustomTriggerControlled() {
  let [isOpen, setOpen] = React.useState(false);
  let triggerRef = React.useRef(null);

  return (
    <>
      <span ref={triggerRef}>Popover will be positioned relative to me</span>

      <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen}>
        <Text slot="content">I'm over here!</Text>
      </Popover>
    </>
  );
}
`})}),`
`,e.jsx(n.h2,{id:"slot-map",children:"Slot map"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot"}),e.jsx(n.th,{children:"Purpose"}),e.jsx(n.th,{children:"Required"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"content"})}),e.jsx(n.td,{children:"The main content of the popover."}),e.jsx(n.td,{children:"Yes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"trigger"})}),e.jsx(n.td,{children:"The element that toggles the popover."}),e.jsx(n.td,{children:"No"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"arrow"})}),e.jsx(n.td,{children:"The arrow visual indicator"}),e.jsx(n.td,{children:"No"})]})]})]}),`
`,e.jsx(n.h2,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-placement"})}),e.jsx(n.td,{children:"The actual placement of the popover (after flip)"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"top"}),", ",e.jsx(n.code,{children:"bottom"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-state"})}),e.jsx(n.td,{children:"Open/closed state (provided by Overlay)"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"open"}),", ",e.jsx(n.code,{children:"closed"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-entering"})}),e.jsx(n.td,{children:"Indicates if popover is entering (for animation)"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-exiting"})}),e.jsx(n.td,{children:"Indicates if popover is exiting (for animation)"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"true"})})]})]})]}),`
`,e.jsx(n.h2,{id:"internationalization-rtl-and-mobile",children:"Internationalization, RTL, and Mobile"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"RTL"}),": ",e.jsx(n.code,{children:"usePopover"})," automatically handles RTL flipping for placement (e.g., ",e.jsx(n.code,{children:"left"})," becomes ",e.jsx(n.code,{children:"right"}),")."]}),`
`]}),`
`,e.jsx(n.h2,{id:"resources",children:"Resources"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/usePopover.html",rel:"nofollow",children:"usePopover"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Popover.tsx",rel:"nofollow",children:"React Aria's Implementation"})}),`
`]})]})}function x(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{x as default};
