import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-Bbn45V8j.js";import{S as n,s as r,u as i}from"./blocks-B3r1oyEE.js";import{t as a}from"./mdx-react-shim-BMnED-6x.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Button`}),`
`,(0,c.jsx)(t.h1,{id:`button-primitive-pdr`,children:`Button Primitive PDR`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsx)(t.p,{children:`The Button Primitive provides a standardized foundation for interactive elements in our Bento library. It consists of two parts: a reusable pressable primitive and a button component built on top of it. Built on React Aria's useButton hook, it ensures consistent, accessible behavior across all devices and input methods.`}),`
`,(0,c.jsx)(t.p,{children:`This primitive will serve as the foundation for other interactive elements like menu buttons, list items and any other interactive elements used in our Bento library, maintaining consistent behavior and accessibility patterns throughout the library.`}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsx)(t.p,{children:`The Button Primitive consists of two main parts:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`<Pressable />`}),` - A behavioral primitive that provides consistent press interactions and accessibility features:`]}),`
`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Built on React Aria's `,(0,c.jsx)(t.code,{children:`useButton`}),` hook`]}),`
`,(0,c.jsx)(t.li,{children:`Handles keyboard interactions (Enter, Space, Tab)`}),`
`,(0,c.jsx)(t.li,{children:`Manages focus states and focus rings`}),`
`,(0,c.jsx)(t.li,{children:`Provides press state management`}),`
`,(0,c.jsx)(t.li,{children:`Handles touch interactions`}),`
`]}),`
`,(0,c.jsxs)(t.ol,{start:`2`,children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`<Button />`}),` - A complete button component built on top of `,(0,c.jsx)(t.code,{children:`<Pressable />`}),`:`]}),`
`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Renders as a native `,(0,c.jsx)(t.code,{children:`<button>`}),` element`]}),`
`,(0,c.jsxs)(t.li,{children:[`Inherits all accessibility and interaction features from `,(0,c.jsx)(t.code,{children:`<Pressable />`})]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`This combination allows developers to either use the complete `,(0,c.jsx)(t.code,{children:`<Button />`}),` component or build custom interactive elements using the `,(0,c.jsx)(t.code,{children:`<Pressable />`}),` primitive while maintaining consistent behavior and accessibility.`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsx)(t.p,{children:`The pressable primitive will be built using:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`React Aria's `,(0,c.jsx)(t.code,{children:`useButton`}),`, `,(0,c.jsx)(t.code,{children:`useFocusRing`}),`, and `,(0,c.jsx)(t.code,{children:`useHover`}),` hooks for behavior and accessibility`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`withSlots`}),` and `,(0,c.jsx)(t.code,{children:`useRenderProps`}),` for slot-based composition and customization`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useDataAttributes`}),` for exposing internal states as data attributes`]}),`
`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Pressable primitive
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
`,(0,c.jsxs)(t.p,{children:[`The Button component will be built using the pressable primitive and will render a native `,(0,c.jsx)(t.code,{children:`<button>`}),` element.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Button component
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
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsx)(t.p,{children:`The Button implementation is built on top of a more generic Pressable primitive that can be used with any element. This separation allows us to:`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsx)(t.li,{children:`Reuse pressable behavior across different elements (buttons, links, divs, menu items, etc.)`}),`
`,(0,c.jsx)(t.li,{children:`Maintain consistent accessibility and interaction patterns`}),`
`,(0,c.jsx)(t.li,{children:`Share state management and event handling logic`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`The Button component itself is a thin wrapper around the Pressable primitive that renders a native `,(0,c.jsx)(t.code,{children:`<button>`}),` element. This approach provides:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`A convenient, pre-configured button component for common use cases`}),`
`,(0,c.jsx)(t.li,{children:`The flexibility to use pressable behavior with other elements when needed`}),`
`,(0,c.jsx)(t.li,{children:`Consistent behavior and accessibility across all pressable elements`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The Pressable primitive handles all the core functionality:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`State management (pressed, hovered, focused)`}),`
`,(0,c.jsx)(t.li,{children:`Event handling and normalization`}),`
`,(0,c.jsx)(t.li,{children:`Accessibility attributes`}),`
`,(0,c.jsx)(t.li,{children:`Data attribute generation for styling`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`This separation of concerns allows us to maintain a minimal, reusable unit while providing a convenient API for common button use cases.`}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsx)(t.p,{children:`The Button primitive leverages React Aria's hooks to provide consistent behavior and accessibility:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useButton`}),`: Handles core button behavior including press events, keyboard interactions, and ARIA attributes`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useHover`}),`: Manages hover state and events consistently across devices`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useFocusRing`}),`: Controls focus visibility and keyboard focus behavior`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`These hooks are used directly without modification, as they already provide comprehensive coverage for button interactions and accessibility requirements. The primitive simply composes these hooks together and exposes their states via data attributes for styling.`}),`
`,(0,c.jsx)(t.p,{children:`No additional logic was needed to fill gaps, as React Aria's implementation handles all edge cases for button behavior across devices and input methods.`}),`
`,(0,c.jsx)(t.h2,{id:`architecture--features`,children:`Architecture & Features`}),`
`,(0,c.jsx)(t.h3,{id:`accessibility`,children:`Accessibility`}),`
`,(0,c.jsx)(t.p,{children:`The Button primitive must be fully accessible, supporting keyboard navigation, screen readers, and all WCAG requirements.
For these, we will adhere to the following accessibility guidelines:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Use the native `,(0,c.jsx)(t.code,{children:`<button>`}),` element to ensure proper keyboard navigation and screen reader support`]}),`
`,(0,c.jsx)(t.li,{children:`Implement consistent hover, press and focus states`}),`
`,(0,c.jsxs)(t.li,{children:[`Include appropriate ARIA attributes as needed (provided by React Aria's `,(0,c.jsx)(t.code,{children:`useButton`}),` hook)`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`behavior-and-states`,children:`Behavior and States`}),`
`,(0,c.jsxs)(t.p,{children:[`There are some inconsistencies in how buttons behave across devices, especially touch devices. For example, the `,(0,c.jsx)(t.code,{children:`onClick`}),` event may not be triggered on touch devices if the user moves their finger slightly after pressing the button, or the `,(0,c.jsx)(t.code,{children:`onPress`}),` event may not be triggered if the user lifts their finger too quickly.`]}),`
`,(0,c.jsxs)(t.p,{children:[`These inconsistencies can lead to confusion and frustration for users, as they may not understand why their button press didn't register. All these edge cases are handled and normalized by the `,(0,c.jsx)(t.code,{children:`useButton`}),` hook.`]}),`
`,(0,c.jsxs)(t.p,{children:[`A comprehensive list of these scenarios can be found in this `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/blog/building-a-button-part-1.html`,rel:`nofollow`,children:`React Aria blog post`}),` which explains how they provide a consistent solution across devices with the `,(0,c.jsx)(t.code,{children:`usePress`}),` hook, which is internally used by the `,(0,c.jsx)(t.code,{children:`useButton`}),` hook.`]}),`
`,(0,c.jsxs)(t.p,{children:[`Other button states such as hover and focus are also important for accessibility and usability, and they present inconsistencies across browsers and devices as well `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/blog/building-a-button-part-2.html`,rel:`nofollow`,children:`[1]`}),` `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/blog/building-a-button-part-3.html`,rel:`nofollow`,children:`[2]`}),`. To address this, we will expose the following states as data attributes on the button element so that we can consistently style the button based on its current state regardless of the device:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`data-pressed
data-hovered
data-focused
data-focus-visible
`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`.button[data-pressed='true'] {
  /* styles */
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`composition-and-customization`,children:`Composition and Customization`}),`
`,(0,c.jsx)(t.p,{children:`The button should support composition with other components (like icons) to create common button patterns and also be highly customizable in terms of appearance while maintaining its accessibility and behavior.`}),`
`,(0,c.jsxs)(t.p,{children:[`We expect implementers of this primitive to have the freedom to compose their `,(0,c.jsx)(t.code,{children:`Button`}),` components as they wish. We will offer the flexibility of `,(0,c.jsx)(t.code,{children:`@bento/slots`}),` and allow props to be passed down to this primitive without restrictions.`]}),`
`,(0,c.jsx)(t.h3,{id:`api`,children:`API`}),`
`,(0,c.jsxs)(t.p,{children:[`The API for the Bento `,(0,c.jsx)(t.code,{children:`Button`}),` will be composed of the `,(0,c.jsx)(t.code,{children:`AriaButtonProps`}),` provided by React Aria and the Native DOM `,(0,c.jsx)(t.code,{children:`<button>`}),` Props. This approach is necessary because `,(0,c.jsx)(t.code,{children:`AriaButtonProps`}),` makes slight modifications to the `,(0,c.jsx)(t.code,{children:`onPress`}),`, `,(0,c.jsx)(t.code,{children:`onHover`}),`, `,(0,c.jsx)(t.code,{children:`onClick`}),`, and `,(0,c.jsx)(t.code,{children:`onFocus`}),` handlers in order to comply with its consistent behavior approach using `,(0,c.jsx)(t.code,{children:`useButton`}),`. Additionally, other handlers such as `,(0,c.jsx)(t.code,{children:`onDoubleClick`}),`, `,(0,c.jsx)(t.code,{children:`onClickCapture`}),`, etc., are not available in `,(0,c.jsx)(t.code,{children:`AriaButtonProps`}),` but we want them to be accessible in our `,(0,c.jsx)(t.code,{children:`Props`}),` interface for more flexible use cases.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface ButtonProps
  extends AriaButtonProps,
    Omit<ComponentProps<'button'>, keyof AriaButtonProps> {}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`For the `,(0,c.jsx)(t.code,{children:`<Pressable />`}),` primitive, we will use the same approach but will not limit it to button elements. The API will be similar, but we will need to ensure that the props are compatible with any element that can be made pressable.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface PressableProps
  extends AriaButtonProps,
    Omit<ComponentProps<HTMLElement>, keyof AriaButtonProps> {}
`})}),`
`,(0,c.jsx)(t.h2,{id:`competitive-research`,children:`Competitive Research`}),`
`,(0,c.jsx)(t.p,{children:`Some comparisons between React Aria, Radix, and HeadlessUI libraries were made to see how they approach the creation of a Button primitive.`}),`
`,(0,c.jsx)(t.h3,{id:`react-aria`,children:`React Aria`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/Button.html`,rel:`nofollow`,children:`Button component`})}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`React Aria provides a Primitive Button that internally uses a `,(0,c.jsx)(t.code,{children:`useButton`}),` hook that handles button behavior, states, and accessibility. It provides press, hover, and focus states, and handles keyboard interactions properly. Our proposed implementation also leverages the `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useButton.html`,rel:`nofollow`,children:`useButton`}),` for its core functionality.`]}),`
`,(0,c.jsx)(t.p,{children:`Notable features:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Styleable – Hover, press, and keyboard focus states are provided for easy styling. These states only apply when interacting with an appropriate input device, unlike CSS pseudo classes.`}),`
`,(0,c.jsxs)(t.li,{children:[`Accessible – Uses a native `,(0,c.jsx)(`button`,{}),` element under the hood, with support for the Space and Enter keys.`]}),`
`,(0,c.jsx)(t.li,{children:`Cross-browser – Mouse, touch, keyboard, and focus interactions are normalized to ensure consistency across browsers and devices.`}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`radix-ui`,children:`Radix UI`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://www.radix-ui.com/themes/docs/components/button`,rel:`nofollow`,children:`Button component`})}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`Radix UI does not provide a button primitive per se, but it addresses all of the features covered in React Aria. The component is more readily prepared to be used in a "themes" or design system implementation.`}),`
`,(0,c.jsx)(t.h3,{id:`headless-ui`,children:`Headless UI`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://headlessui.com/react/button`,rel:`nofollow`,children:`Button component`})}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Headless UI takes a similar approach to React Aria, providing an unstyled button with behavior and accessibility built-in. HeadlessUI also provides a `,(0,c.jsxs)(t.a,{href:`https://headlessui.com/react/button#using-render-props`,rel:`nofollow`,children:[(0,c.jsx)(t.code,{children:`render props`}),` approach`]}),` allowing you to pass a function that receives the button state as an argument for more fine-grained customization. In our assessment, this approach seems a bit excessive for a button component.`]}),`
`,(0,c.jsx)(t.p,{children:`Notable features:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`State-based rendering`}),`
`,(0,c.jsx)(t.li,{children:`State management`}),`
`,(0,c.jsx)(t.li,{children:`Render props approach`}),`
`,(0,c.jsx)(t.li,{children:`Keyboard navigation`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h3,{id:`button-component`,children:`Button component`}),`
`,(0,c.jsx)(t.p,{children:`The Button comopnent would be the most straightforward approach. We can then create design system specific components that inherit from the Button component and add additional functionality or styling.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`//
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
`,(0,c.jsx)(t.h3,{id:`pressable-primitive`,children:`Pressable Primitive`}),`
`,(0,c.jsxs)(t.p,{children:[`For even greater flexibility, we could use the `,(0,c.jsx)(t.code,{children:`<Pressable />`}),` primitive that can wrap any element or component to provide pressable behavior. This approach would extend beyond traditional buttons, allowing pressable functionality to be applied to a wider range of UI elements, such as anchors `,(0,c.jsx)(t.code,{children:`<a />`}),` or form input buttons `,(0,c.jsx)(t.code,{children:`<input type="button" />`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Pressable {...props}>
  <button>Native button</button>
</Pressable>

<Pressable {...props}>
  <a href="#">link</a>
</Pressable>

// this will make the div element pressable (not recommended though)
<Pressable {...props}>
  <div>hola</div>
</Pressable>
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};