import{j as e}from"./iframe-Dc_6Q7C6.js";import{useMDXComponents as i}from"./index-DDlWIZYj.js";import{M as o}from"./blocks-m73hDSoz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Du1nk1iD.js";import"./index-BVBVOTmy.js";import"./index-CNgkrjV0.js";import"./index-DrFu-skq.js";function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Architecture/PDRs/Button"}),`
`,e.jsx(n.h1,{id:"button-primitive-pdr",children:"Button Primitive PDR"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(n.p,{children:"The Button Primitive provides a standardized foundation for interactive elements in our Bento library. It consists of two parts: a reusable pressable primitive and a button component built on top of it. Built on React Aria's useButton hook, it ensures consistent, accessible behavior across all devices and input methods."}),`
`,e.jsx(n.p,{children:"This primitive will serve as the foundation for other interactive elements like menu buttons, list items and any other interactive elements used in our Bento library, maintaining consistent behavior and accessibility patterns throughout the library."}),`
`,e.jsx(n.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsx(n.p,{children:"The Button Primitive consists of two main parts:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<Pressable />"})," - A behavioral primitive that provides consistent press interactions and accessibility features:"]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Built on React Aria's ",e.jsx(n.code,{children:"useButton"})," hook"]}),`
`,e.jsx(n.li,{children:"Handles keyboard interactions (Enter, Space, Tab)"}),`
`,e.jsx(n.li,{children:"Manages focus states and focus rings"}),`
`,e.jsx(n.li,{children:"Provides press state management"}),`
`,e.jsx(n.li,{children:"Handles touch interactions"}),`
`]}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<Button />"})," - A complete button component built on top of ",e.jsx(n.code,{children:"<Pressable />"}),":"]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Renders as a native ",e.jsx(n.code,{children:"<button>"})," element"]}),`
`,e.jsxs(n.li,{children:["Inherits all accessibility and interaction features from ",e.jsx(n.code,{children:"<Pressable />"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["This combination allows developers to either use the complete ",e.jsx(n.code,{children:"<Button />"})," component or build custom interactive elements using the ",e.jsx(n.code,{children:"<Pressable />"})," primitive while maintaining consistent behavior and accessibility."]}),`
`,e.jsx(n.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsx(n.p,{children:"The pressable primitive will be built using:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["React Aria's ",e.jsx(n.code,{children:"useButton"}),", ",e.jsx(n.code,{children:"useFocusRing"}),", and ",e.jsx(n.code,{children:"useHover"})," hooks for behavior and accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"withSlots"})," and ",e.jsx(n.code,{children:"useRenderProps"})," for slot-based composition and customization"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useDataAttributes"})," for exposing internal states as data attributes"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Pressable primitive
export const Pressable = withSlots(
  'BentoPressable',
  function Pressable(args: PressableProps) {
    const ref = useRef<HTMLElement | null>(null);
    const { buttonProps, isPressed } = useButton(args, ref);
    const { hoverProps, isHovered } = useHover(args);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing(args);
    const child = React.Children.only(children);
    const dataAttributes = useDataAttributes({
      pressed: isPressed,
      hovered: isHovered,
      focused: isFocused,
      focusVisible: isFocusVisible,
    });

    const [props, apply] = useRenderProps(args);
    const { children, ...restProps } = props;

    return React.cloneElement(child, {
      ...mergeProps(
        restProps,
        buttonProps,
        focusProps,
        hoverProps,
        dataAttributes,
      ),
      ref: mergeRefs(childRef, ref),
    });
  },
);
`})}),`
`,e.jsxs(n.p,{children:["The Button component will be built using the pressable primitive and will render a native ",e.jsx(n.code,{children:"<button>"})," element."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Button component
export const Button = withSlots(
  'BentoButton',
  function Button(args: ButtonProps) {
    const [props, apply] = useRenderProps(args);
    const { children, ...restProps } = props;

    return (
      <Pressable {...restProps}>
        <button>
          {children}
        </button>
      </Pressable>
    );
  },
);
`})}),`
`,e.jsx(n.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsx(n.p,{children:"The Button implementation is built on top of a more generic Pressable primitive that can be used with any element. This separation allows us to:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Reuse pressable behavior across different elements (buttons, links, divs, menu items, etc.)"}),`
`,e.jsx(n.li,{children:"Maintain consistent accessibility and interaction patterns"}),`
`,e.jsx(n.li,{children:"Share state management and event handling logic"}),`
`]}),`
`,e.jsxs(n.p,{children:["The Button component itself is a thin wrapper around the Pressable primitive that renders a native ",e.jsx(n.code,{children:"<button>"})," element. This approach provides:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A convenient, pre-configured button component for common use cases"}),`
`,e.jsx(n.li,{children:"The flexibility to use pressable behavior with other elements when needed"}),`
`,e.jsx(n.li,{children:"Consistent behavior and accessibility across all pressable elements"}),`
`]}),`
`,e.jsx(n.p,{children:"The Pressable primitive handles all the core functionality:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"State management (pressed, hovered, focused)"}),`
`,e.jsx(n.li,{children:"Event handling and normalization"}),`
`,e.jsx(n.li,{children:"Accessibility attributes"}),`
`,e.jsx(n.li,{children:"Data attribute generation for styling"}),`
`]}),`
`,e.jsx(n.p,{children:"This separation of concerns allows us to maintain a minimal, reusable unit while providing a convenient API for common button use cases."}),`
`,e.jsx(n.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsx(n.p,{children:"The Button primitive leverages React Aria's hooks to provide consistent behavior and accessibility:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useButton"}),": Handles core button behavior including press events, keyboard interactions, and ARIA attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useHover"}),": Manages hover state and events consistently across devices"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useFocusRing"}),": Controls focus visibility and keyboard focus behavior"]}),`
`]}),`
`,e.jsx(n.p,{children:"These hooks are used directly without modification, as they already provide comprehensive coverage for button interactions and accessibility requirements. The primitive simply composes these hooks together and exposes their states via data attributes for styling."}),`
`,e.jsx(n.p,{children:"No additional logic was needed to fill gaps, as React Aria's implementation handles all edge cases for button behavior across devices and input methods."}),`
`,e.jsx(n.h2,{id:"architecture--features",children:"Architecture & Features"}),`
`,e.jsx(n.h3,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:`The Button primitive must be fully accessible, supporting keyboard navigation, screen readers, and all WCAG requirements.
For these, we will adhere to the following accessibility guidelines:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use the native ",e.jsx(n.code,{children:"<button>"})," element to ensure proper keyboard navigation and screen reader support"]}),`
`,e.jsx(n.li,{children:"Implement consistent hover, press and focus states"}),`
`,e.jsxs(n.li,{children:["Include appropriate ARIA attributes as needed (provided by React Aria's ",e.jsx(n.code,{children:"useButton"})," hook)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"behavior-and-states",children:"Behavior and States"}),`
`,e.jsxs(n.p,{children:["There are some inconsistencies in how buttons behave across devices, especially touch devices. For example, the ",e.jsx(n.code,{children:"onClick"})," event may not be triggered on touch devices if the user moves their finger slightly after pressing the button, or the ",e.jsx(n.code,{children:"onPress"})," event may not be triggered if the user lifts their finger too quickly."]}),`
`,e.jsxs(n.p,{children:["These inconsistencies can lead to confusion and frustration for users, as they may not understand why their button press didn't register. All these edge cases are handled and normalized by the ",e.jsx(n.code,{children:"useButton"})," hook."]}),`
`,e.jsxs(n.p,{children:["A comprehensive list of these scenarios can be found in this ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/blog/building-a-button-part-1.html",rel:"nofollow",children:"React Aria blog post"})," which explains how they provide a consistent solution across devices with the ",e.jsx(n.code,{children:"usePress"})," hook, which is internally used by the ",e.jsx(n.code,{children:"useButton"})," hook."]}),`
`,e.jsxs(n.p,{children:["Other button states such as hover and focus are also important for accessibility and usability, and they present inconsistencies across browsers and devices as well ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/blog/building-a-button-part-2.html",rel:"nofollow",children:"[1]"})," ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/blog/building-a-button-part-3.html",rel:"nofollow",children:"[2]"}),". To address this, we will expose the following states as data attributes on the button element so that we can consistently style the button based on its current state regardless of the device:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`data-pressed
data-hovered
data-focused
data-focus-visible
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.button[data-pressed='true'] {
  /* styles */
}
`})}),`
`,e.jsx(n.h3,{id:"composition-and-customization",children:"Composition and Customization"}),`
`,e.jsx(n.p,{children:"The button should support composition with other components (like icons) to create common button patterns and also be highly customizable in terms of appearance while maintaining its accessibility and behavior."}),`
`,e.jsxs(n.p,{children:["We expect implementers of this primitive to have the freedom to compose their ",e.jsx(n.code,{children:"Button"})," components as they wish. We will offer the flexibility of ",e.jsx(n.code,{children:"@bento/slots"})," and allow props to be passed down to this primitive without restrictions."]}),`
`,e.jsx(n.h3,{id:"api",children:"API"}),`
`,e.jsxs(n.p,{children:["The API for the Bento ",e.jsx(n.code,{children:"Button"})," will be composed of the ",e.jsx(n.code,{children:"AriaButtonProps"})," provided by React Aria and the Native DOM ",e.jsx(n.code,{children:"<button>"})," Props. This approach is necessary because ",e.jsx(n.code,{children:"AriaButtonProps"})," makes slight modifications to the ",e.jsx(n.code,{children:"onPress"}),", ",e.jsx(n.code,{children:"onHover"}),", ",e.jsx(n.code,{children:"onClick"}),", and ",e.jsx(n.code,{children:"onFocus"})," handlers in order to comply with its consistent behavior approach using ",e.jsx(n.code,{children:"useButton"}),". Additionally, other handlers such as ",e.jsx(n.code,{children:"onDoubleClick"}),", ",e.jsx(n.code,{children:"onClickCapture"}),", etc., are not available in ",e.jsx(n.code,{children:"AriaButtonProps"})," but we want them to be accessible in our ",e.jsx(n.code,{children:"Props"})," interface for more flexible use cases."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface ButtonProps
  extends AriaButtonProps,
    Omit<ComponentProps<'button'>, keyof AriaButtonProps> {}
`})}),`
`,e.jsxs(n.p,{children:["For the ",e.jsx(n.code,{children:"<Pressable />"})," primitive, we will use the same approach but will not limit it to button elements. The API will be similar, but we will need to ensure that the props are compatible with any element that can be made pressable."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`interface PressableProps
  extends AriaButtonProps,
    Omit<ComponentProps<HTMLElement>, keyof AriaButtonProps> {}
`})}),`
`,e.jsx(n.h2,{id:"competitive-research",children:"Competitive Research"}),`
`,e.jsx(n.p,{children:"Some comparisons between React Aria, Radix, and HeadlessUI libraries were made to see how they approach the creation of a Button primitive."}),`
`,e.jsx(n.h3,{id:"react-aria",children:"React Aria"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/Button.html",rel:"nofollow",children:"Button component"})}),`
`]}),`
`,e.jsxs(n.p,{children:["React Aria provides a Primitive Button that internally uses a ",e.jsx(n.code,{children:"useButton"})," hook that handles button behavior, states, and accessibility. It provides press, hover, and focus states, and handles keyboard interactions properly. Our proposed implementation also leverages the ",e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/useButton.html",rel:"nofollow",children:"useButton"})," for its core functionality."]}),`
`,e.jsx(n.p,{children:"Notable features:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Styleable – Hover, press, and keyboard focus states are provided for easy styling. These states only apply when interacting with an appropriate input device, unlike CSS pseudo classes."}),`
`,e.jsxs(n.li,{children:["Accessible – Uses a native ",e.jsx("button",{})," element under the hood, with support for the Space and Enter keys."]}),`
`,e.jsx(n.li,{children:"Cross-browser – Mouse, touch, keyboard, and focus interactions are normalized to ensure consistency across browsers and devices."}),`
`]}),`
`,e.jsx(n.h3,{id:"radix-ui",children:"Radix UI"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://www.radix-ui.com/themes/docs/components/button",rel:"nofollow",children:"Button component"})}),`
`]}),`
`,e.jsx(n.p,{children:'Radix UI does not provide a button primitive per se, but it addresses all of the features covered in React Aria. The component is more readily prepared to be used in a "themes" or design system implementation.'}),`
`,e.jsx(n.h3,{id:"headless-ui",children:"Headless UI"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://headlessui.com/react/button",rel:"nofollow",children:"Button component"})}),`
`]}),`
`,e.jsxs(n.p,{children:["Headless UI takes a similar approach to React Aria, providing an unstyled button with behavior and accessibility built-in. HeadlessUI also provides a ",e.jsxs(n.a,{href:"https://headlessui.com/react/button#using-render-props",rel:"nofollow",children:[e.jsx(n.code,{children:"render props"})," approach"]})," allowing you to pass a function that receives the button state as an argument for more fine-grained customization. In our assessment, this approach seems a bit excessive for a button component."]}),`
`,e.jsx(n.p,{children:"Notable features:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"State-based rendering"}),`
`,e.jsx(n.li,{children:"State management"}),`
`,e.jsx(n.li,{children:"Render props approach"}),`
`,e.jsx(n.li,{children:"Keyboard navigation"}),`
`]}),`
`,e.jsx(n.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(n.h3,{id:"button-component",children:"Button component"}),`
`,e.jsx(n.p,{children:"The Button comopnent would be the most straightforward approach. We can then create design system specific components that inherit from the Button component and add additional functionality or styling."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`//
// A button component that allows composition by leveraging the children component
//
function MyDesignButton1(props) {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
}

<MyDesignButton1 {...props}>
  <EditIcon />
  Edit
</Button>

//
// A button component that allows composition via props
//
function MyDesignButton2(props) {
  const { label, icon, ...rest } = props;

  return (
    <Button {...rest}>
      {icon}
      <span>{label}</span>
    </Button>
  );
}

<MyDesignButton2 label="Edit" icon={<EditIcon />} {...props} />
`})}),`
`,e.jsx(n.h3,{id:"pressable-primitive",children:"Pressable Primitive"}),`
`,e.jsxs(n.p,{children:["For even greater flexibility, we could use the ",e.jsx(n.code,{children:"<Pressable />"})," primitive that can wrap any element or component to provide pressable behavior. This approach would extend beyond traditional buttons, allowing pressable functionality to be applied to a wider range of UI elements, such as anchors ",e.jsx(n.code,{children:"<a />"})," or form input buttons ",e.jsx(n.code,{children:'<input type="button" />'}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Pressable {...props}>
  <button>Native button</button>
</Pressable>

<Pressable {...props}>
  <a href="#">link</a>
</Pressable>

// this will make the div element pressable (not recommended though)
<Pressable {...props}>
  <div>hola</div>
</Pressable>
`})})]})}function m(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{m as default};
