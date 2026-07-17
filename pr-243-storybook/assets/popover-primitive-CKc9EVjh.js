import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-CdiC1iam.js";import{S as n,s as r,u as i}from"./blocks-DpQ4n8sJ.js";import{t as a}from"./mdx-react-shim-CS7Sz8tJ.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Popover`}),`
`,(0,c.jsx)(t.h1,{id:`popover-primitive`,children:`Popover primitive`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsxs)(t.p,{children:[`A `,(0,c.jsx)(t.code,{children:`Popover`}),` is an overlay element positioned relative to a trigger. It is used to reveal additional information or functionality without taking the user away from their current context.`]}),`
`,(0,c.jsx)(t.p,{children:`Common use cases include:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Action Menus`}),`: Presenting a list of actions related to a specific object.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Contextual Help`}),`: Providing explanations or guidance for a specific UI element.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Pickers`}),`: Selectors like color pickers or date pickers that appear near an input.`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`core-primitive-packages`,children:`Core Primitive Packages`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/popover`}),`: The coordinator component that integrates positioning logic with the Overlay primitive.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`@bento/overlay`}),`: The container primitive that handles portal rendering, focus management, and outside interactions. These are achieved via Overlay composition with the usage of its `,(0,c.jsx)(t.a,{href:`./overlay-primitive.mdx#core-primitive-packages`,children:`core primitive packages`}),`.`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`react-aria-integration`,children:`React Aria Integration`}),`
`,(0,c.jsx)(t.p,{children:`The Popover primitive heavily relies on React Aria for accessibility and behavior:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`usePopover`}),`: Used for positioning the popover relative to the trigger and managing its lifecycle (open/close). It handles:`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Positioning`}),`: Calculates the position of the popover based on the trigger's location and preferred placement (top, bottom, left, right).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Arrow Positioning`}),`: Calculates the position of the arrow to point correctly at the trigger.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Adaptivity`}),`: Adjusts placement to fit within the viewport (flipping, shifting).`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useOverlayTriggerState`}),`: Manages the state of the Popover`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsxs)(t.p,{children:[`The Popover serves as a specialized configuration of the `,(0,c.jsx)(t.strong,{children:`Overlay`}),` primitive. It leverages `,(0,c.jsx)(t.code,{children:`Overlay`}),` for the heavy lifting of portaling and focus containment, while injecting the specific positioning logic provided by `,(0,c.jsx)(t.code,{children:`usePopover`}),`. Also, provides the necessary slots with data and accessibility features to both the trigger and arrow components.`]}),`
`,(0,c.jsx)(t.h3,{id:`component-structure`,children:`Component Structure`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`Popover (State, Positioning Logic)
└─ Overlay (Container)
  ├─ Trigger (slot="trigger")
  ├─ Arrow (slot="arrow")
  └─ Content (slot="content", user-provided content)
`})}),`
`,(0,c.jsx)(t.h2,{id:`foundations-and-requirements`,children:`Foundations and Requirements`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`MUST`}),` use `,(0,c.jsx)(t.code,{children:`@bento/overlay`}),` as the underlying container implementation.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`MUST`}),` support `,(0,c.jsx)(t.code,{children:`placement`}),` prop (top, bottom, left, right) with RTL support.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`MUST`}),` support an `,(0,c.jsx)(t.code,{children:`arrow`}),` element that aligns correctly with the trigger.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`MUST`}),` support custom trigger element from outside the Popover component.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`MUST`}),` support controlled/uncontrolled handling.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`MUST`}),` support RTL positioning.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`integration-approach`,children:`Integration Approach`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Popover`}),` component will act as a wrapper that:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Accepts `,(0,c.jsx)(t.code,{children:`placement`}),`, `,(0,c.jsx)(t.code,{children:`offset`}),`, and other positioning props.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Uses `,(0,c.jsx)(t.code,{children:`usePopover`}),` to calculate the styles and attributes required for the popover and arrow.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Uses `,(0,c.jsx)(t.code,{children:`useLocale`}),` to calculate the correct direction.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Passes these calculated props down to the `,(0,c.jsx)(t.code,{children:`Overlay`}),` and its children via slots.`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`props-interface`,children:`Props Interface`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { AriaPopoverProps } from 'react-aria';

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
`,(0,c.jsx)(t.h2,{id:`composition`,children:`Composition`}),`
`,(0,c.jsx)(t.p,{children:`The Popover follows the Bento composition model. It exposes slots for consumers.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`function DefaultExample() {
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
`,(0,c.jsxs)(t.p,{children:[`When the `,(0,c.jsx)(t.code,{children:`trigger`}),` is outside the `,(0,c.jsx)(t.code,{children:`Popover`}),`, you can use `,(0,c.jsx)(t.code,{children:`triggerRef`}),` prop to pass the ref to the component the popover should be positioned relative to.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`function CustomTriggerControlled() {
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
`,(0,c.jsx)(t.h2,{id:`slot-map`,children:`Slot map`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot`}),(0,c.jsx)(t.th,{children:`Purpose`}),(0,c.jsx)(t.th,{children:`Required`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`content`})}),(0,c.jsx)(t.td,{children:`The main content of the popover.`}),(0,c.jsx)(t.td,{children:`Yes`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`trigger`})}),(0,c.jsx)(t.td,{children:`The element that toggles the popover.`}),(0,c.jsx)(t.td,{children:`No`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`arrow`})}),(0,c.jsx)(t.td,{children:`The arrow visual indicator`}),(0,c.jsx)(t.td,{children:`No`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-placement`})}),(0,c.jsx)(t.td,{children:`The actual placement of the popover (after flip)`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`top`}),`, `,(0,c.jsx)(t.code,{children:`bottom`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-state`})}),(0,c.jsx)(t.td,{children:`Open/closed state (provided by Overlay)`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`open`}),`, `,(0,c.jsx)(t.code,{children:`closed`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-entering`})}),(0,c.jsx)(t.td,{children:`Indicates if popover is entering (for animation)`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`true`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-exiting`})}),(0,c.jsx)(t.td,{children:`Indicates if popover is exiting (for animation)`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`true`})})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`internationalization-rtl-and-mobile`,children:`Internationalization, RTL, and Mobile`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`RTL`}),`: `,(0,c.jsx)(t.code,{children:`usePopover`}),` automatically handles RTL flipping for placement (e.g., `,(0,c.jsx)(t.code,{children:`left`}),` becomes `,(0,c.jsx)(t.code,{children:`right`}),`).`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`resources`,children:`Resources`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/usePopover.html`,rel:`nofollow`,children:`usePopover`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Popover.tsx`,rel:`nofollow`,children:`React Aria's Implementation`})}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};