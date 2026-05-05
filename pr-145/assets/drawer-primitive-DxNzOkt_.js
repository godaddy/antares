import{j as e}from"./iframe-COOHz61S.js";import{useMDXComponents as s}from"./index-DSxwjQyk.js";import{M as i}from"./blocks-ORDlmF0q.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8-rjpp1.js";import"./index-CL8R-hp8.js";import"./index-BgZMnLcl.js";import"./index-DrFu-skq.js";function t(r){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Architecture/PDRs/Drawer"}),`
`,e.jsx(n.h1,{id:"drawer-primitive",children:"Drawer Primitive"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Drawer"})," primitive is a component that creates an expandable panel. It is meant to hold content and reveal it after some interaction."]}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Support sidebar navigation, where the drawer can be collapsed to show minimal navigation items and expand to show the full navigation."}),`
`,e.jsx(n.li,{children:"Support bottom sheet functionality, where the drawer can be expanded to show more options or content."}),`
`,e.jsx(n.li,{children:"Support disclosures, where the drawer can be expanded to show more information or content inline within a composition."}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[`[!NOTE]
The drawer `,e.jsx(n.em,{children:"could"}),` also support a modal-like behavior, where the drawer is expanded from the center of the parent container.
See the `,e.jsx(n.a,{href:"#composition",children:"Composition"})," section below for more information. This would require a component name change to indicate that this component handles this sort of behavior."]}),`
`]}),`
`,e.jsx(n.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsxs(n.p,{children:["We may explore using the Disclosure resources from React Aria, either the ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/Disclosure.html",rel:"nofollow",children:"component"})," or the ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useDisclosure.html",rel:"nofollow",children:"hook"}),". Though it's implementation may not aligned to our expectations below. Specifically the ability to ship the drawer without a trigger."]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(n.h3,{id:"placement",children:"placement"}),`
`,e.jsxs(n.p,{children:["From the ",e.jsxs(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html",rel:"nofollow",children:[e.jsx(n.code,{children:"useOverlayPosition"})," hook"]}),", the placement of the element with respect to its positioning parent. This will accept strings such as ",e.jsx(n.code,{children:"top"}),", ",e.jsx(n.code,{children:"bottom"}),", ",e.jsx(n.code,{children:"left"}),", ",e.jsx(n.code,{children:"right"}),". The use of left and right will flip in RTL contexts so that the implementation is consistent. See the ",e.jsx(n.a,{href:"#composition",children:"Composition"})," section for more information on other requirements for this to work."]}),`
`,e.jsx(n.h3,{id:"isexpanded",children:"isExpanded"}),`
`,e.jsxs(n.p,{children:["From the ",e.jsxs(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useDisclosure.html",rel:"nofollow",children:[e.jsx(n.code,{children:"useDisclosure"})," hook"]}),`, whether the drawer is expanded or collapsed.
If the `,e.jsx(n.code,{children:"animate"})," prop is provided, the drawer will animate expanded or collapsed based on this flag."]}),`
`,e.jsx(n.h3,{id:"defaultexpanded",children:"defaultExpanded"}),`
`,e.jsxs(n.p,{children:["From the ",e.jsxs(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useDisclosure.html",rel:"nofollow",children:[e.jsx(n.code,{children:"useDisclosure"})," hook"]}),", the ",e.jsx(n.code,{children:"defaultExpanded"}),` prop is a flag that determines if the drawer is expanded or collapsed by default.
If not provided, the drawer will be collapsed by default.`]}),`
`,e.jsx(n.h3,{id:"onexpandedchange",children:"onExpandedChange"}),`
`,e.jsxs(n.p,{children:["From the ",e.jsxs(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useDisclosure.html",rel:"nofollow",children:[e.jsx(n.code,{children:"useDisclosure"})," hook"]}),", this is a callback that is fired when the drawer is expanded or collapsed."]}),`
`,e.jsx(n.h3,{id:"shouldcloseonblur",children:"shouldCloseOnBlur"}),`
`,e.jsxs(n.p,{children:["From the ",e.jsxs(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlay.html",rel:"nofollow",children:[e.jsx(n.code,{children:"useOverlay"})," hook"]}),", whether the overlay should close when focus is lost or moves outside it."]}),`
`,e.jsx(n.h3,{id:"iskeyboarddismissdisabled",children:"isKeyboardDismissDisabled"}),`
`,e.jsxs(n.p,{children:["From the ",e.jsxs(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlay.html",rel:"nofollow",children:[e.jsx(n.code,{children:"useOverlay"})," hook"]}),", whether pressing the escape key to close the overlay should be disabled."]}),`
`,e.jsx(n.h3,{id:"shouldcloseoninteractoutside",children:"shouldCloseOnInteractOutside"}),`
`,e.jsxs(n.p,{children:["From the ",e.jsxs(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlay.html",rel:"nofollow",children:[e.jsx(n.code,{children:"useOverlay"})," hook"]}),", when user interacts with the argument element outside of the overlay ref, to return true if onClose should be called. This gives you a chance to filter out interaction with elements that should not dismiss the overlay. By default, onExpandedChange will always be called on interaction outside the overlay ref."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`<Drawer shouldCloseOnInteractOutside={ (element) => return mightClose(element) } />
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`[!NOTE]
The naming convention here coming from the hooks is a bit random in my opinion.
If we're able to deviate, I'd rather align these to use the words "should" and "dismiss" along with some other more descriptive names.`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"shouldCloseOnBlur"})," -> ",e.jsx(n.code,{children:"shouldDismissOnBlur"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"isKeyboardDismissDisabled"})," -> ",e.jsx(n.code,{children:"shouldDismissOnEscape"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"shouldCloseOnInteractOutside"})," -> ",e.jsx(n.code,{children:"shouldDismissOnElementInteract"})]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"maxwidthmaxheight",children:"maxWidth/maxHeight"}),`
`,e.jsxs(n.p,{children:[`The maximum width and height of the drawer in CSS units. Percentage is based on the parent.
When the drawer is `,e.jsx(n.strong,{children:"expanded"}),`, the drawer will be constrained to these values.
If not provided, when the drawer is expanded it will be the size of its contents.`]}),`
`,e.jsx(n.h3,{id:"minwidthminheight",children:"minWidth/minHeight"}),`
`,e.jsxs(n.p,{children:[`The minimum width and height of the drawer in CSS units. Percentage is based on the parent.
When the drawer is `,e.jsx(n.strong,{children:"collapsed"}),`, the drawer will be constrained to these values.
This allows for the possibility of the drawer showing a small amount of content when collapsed such as a button to expand the drawer.
If not provided, when the drawer is collapsed these values will be `,e.jsx(n.code,{children:"0"}),", causing the drawer to be visually hidden."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`[!NOTE]
If the drawer is an extension of the layout components then these props will be provided from the layout component.`}),`
`]}),`
`,e.jsx(n.h3,{id:"istouch",children:"isTouch"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"isTouch"}),` prop is a flag that determines if the drawer should allow touch gestures.
This will also include a handle on edges opposite of the attachment edge to indicate where the drawer can be swiped.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`<Drawer isTouch={ window.matchMedia('(pointer: coarse) and (hover: none)').matches } />
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Swiping a minimized drawer away from it's attached edge will expand the drawer."}),`
`,e.jsx(n.li,{children:"Swiping a maximized drawer toward it's attached edge will collapse the drawer."}),`
`]}),`
`,e.jsx(n.h3,{id:"animate",children:"animate"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"animate"}),` prop determines if and/or how the drawer should animate when it is expanded or collapsed from its minimum size to its maximum size.
If provided as the flag `,e.jsx(n.code,{children:"true"}),`, the drawer will animate with default settings.
Otherwise, you may provide a string that represents a CSS transition, specifically with the timing function and duration.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`<Drawer animate="0.3s ease-in-out" />
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[`[!NOTE]
Due to the examples provided by Adobe below, it is possible that we avoid the use of `,e.jsx(n.code,{children:"animate"})," and instead use Framer Motion to animate the drawer. This is an open question."]}),`
`]}),`
`,e.jsx(n.h2,{id:"relevant-examples-from-adobe",children:"Relevant Examples from Adobe"}),`
`,e.jsx(n.h3,{id:"gesture-driven-modal-sheet-desktop-swipe-gestures",children:"Gesture Driven Modal Sheet (desktop swipe gestures)"}),`
`,e.jsx(n.p,{children:"An iOS-style gesture driven modal sheet built with React Aria Components, Framer Motion, and Tailwind CSS."}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/examples/framer-modal-sheet.html#gesture-driven-modal-sheet",rel:"nofollow",children:"https://react-spectrum.adobe.com/react-aria/examples/framer-modal-sheet.html#gesture-driven-modal-sheet"})}),`
`,e.jsx(n.h3,{id:"swipeable-tabs-mobile-swipe-gestures",children:"Swipeable Tabs (mobile swipe gestures)"}),`
`,e.jsxs(n.p,{children:[`A swipeable Tabs component built with with React Aria Components, Framer Motion, Tailwind CSS, and CSS scroll snapping.
`,e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/examples/swipeable-tabs.html",rel:"nofollow",children:"https://react-spectrum.adobe.com/react-aria/examples/swipeable-tabs.html"})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`[!NOTE]
React Aria Components are wrapped in Framer Motion to support animation values.`}),`
`]}),`
`,e.jsx(n.h2,{id:"vaul",children:"Vaul"}),`
`,e.jsxs(n.p,{children:["An existing implementation of a drawer is ",e.jsx(n.a,{href:"https://vaul.emilkowal.ski/",rel:"nofollow",children:"Vaul"}),". One of the features of this library is ",e.jsx(n.a,{href:"https://vaul.emilkowal.ski/docs/features/snap-points",rel:"nofollow",children:"snap points"}),". These indicate where the drawer will snap to when it is opened."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`const snapPoints = ['148px', '355px', 1];
const [snap, setSnap] = useState(snapPoints[0]);
<Drawer.Root snapPoints={snapPoints} activeSnapPoint={snap} setActiveSnapPoint={setSnap}>
  <Drawer.Trigger>
    <Button>Open Drawer</Button>
  </Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content>
      <Drawer.Close>Close Drawer</Drawer.Close>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
`})}),`
`,e.jsxs(n.p,{children:["Vaul only supplies components and does not provide any hooks. It might be more beneficial to have hooks available to support the components instead. So we may consider acquiring ",e.jsx(n.a,{href:"https://github.com/emilkowalski/vaul/blob/main/src/use-snap-points.ts",rel:"nofollow",children:"the source code"})," and using it as a reference for our own hooks."]}),`
`,e.jsxs(n.p,{children:["Vaul provided other features such as ",e.jsx(n.a,{href:"https://github.com/emilkowalski/vaul/blob/main/src/index.tsx#L477-L533",rel:"nofollow",children:"adjusting the placement when a mobile keyboard is displayed"})," and ",e.jsx(n.a,{href:"https://github.com/emilkowalski/vaul/blob/main/src/index.tsx#L681-L706",rel:"nofollow",children:"nesting drawers"}),"."]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the drawer is meant to disrupt the user from other tasks, then it should be given a ",e.jsx(n.code,{children:'role="dialog"'})," and ",e.jsx(n.code,{children:'aria-modal="true"'}),". Otherwise, it should be given a ",e.jsx(n.code,{children:'role="region"'})," unless it is provided a more semantic HTML element (eg., ",e.jsx(n.code,{children:"<nav/>"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-expanded"})," will be used to indicate the expanded state of the drawer."]}),`
`,e.jsxs(n.li,{children:["If the drawer is meant to be completely hidden, then it should be given a ",e.jsx(n.code,{children:'aria-hidden="true"'})," or consider ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden#the_hidden_until_found_state",rel:"nofollow",children:e.jsx(n.code,{children:'hidden="until-found"'})}),"."]}),`
`,e.jsxs(n.li,{children:["We may consider making the use of ",e.jsx(n.code,{children:"id"})," required such that it can be given a connection to a ",e.jsx(n.code,{children:"aria-controls"})," attribute. Or we could consider some fun slot shenanigans to make it work with ",e.jsx(n.code,{children:"useId()"})," (maybe?)."]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Drawer id="drawer">
  <Button aria-controls="drawer">
    Close Drawer
  </Button>
</Drawer>
`})}),`
`,e.jsx(n.h2,{id:"focus-trapping",children:"Focus Trapping"}),`
`,e.jsxs(n.p,{children:[`If the composition is expecting focus to be trapped within the drawer,
then a `,e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/FocusScope.html",rel:"nofollow",children:e.jsx(n.code,{children:"<FocusScope/>"})})," must be provided."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`<Drawer>
  <FocusScope>
    <input type="text" />
  </FocusScope>
</Drawer>
`})}),`
`,e.jsx(n.h2,{id:"composition",children:"Composition"}),`
`,e.jsxs(n.p,{children:["Specifically in the case of potentionally replacing Application Sidebar, we'll need the ability for the drawer to change between affecting sibling content and appearing above it as a configuration. In React Aria, this is handled by providing a ",e.jsx(n.code,{children:"<Disclosure>"})," as the parent and a ",e.jsx(n.code,{children:"<DisclosurePanel>"})," as the panel. Other children to the parent are siblings to the panel."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Disclosure>
  <Heading>
    <Button slot="trigger">
      <ChevronRight size={18} />
      System Requirements
    </Button>
  </Heading>
  <DisclosurePanel>
    <p>Details about system requirements here.</p>
  </DisclosurePanel>
</Disclosure>
`})}),`
`,e.jsx(n.p,{children:"We could adopt this pattern directly with a different naming convention:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Drawer, DrawerParent } from '@bento/drawer';

function Chrome({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <DrawerParent>
      <Drawer placement="left" isExpanded={ isExpanded }>
        <Button onClick={ () => setIsExpanded(!isExpanded) }>Toggle Drawer</Button>
      </Drawer>
      { children }
    </DrawerParent>
  )
}
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"DrawerParent"})," component could then be given a ",e.jsx(n.code,{children:"portalContainer"})," (",e.jsx(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/Overlay.tsx#L26",rel:"nofollow",children:"name from React Aria"}),") prop to indicate that the parent is to be portaled. The parent should also include all of the relevant styles to support the drawer in either inline or overlay modes."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<DrawerParent portalContainer={ document.body }>
  <Drawer placement="bottom" isExpanded={ isExpanded }>
    <Button onClick={ () => setIsExpanded(false) }>Close Drawer</Button>
  </Drawer>
  { children }
</DrawerParent>
`})})]})}function u(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{u as default};
