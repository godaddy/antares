import{j as e}from"./iframe-CXq8dscT.js";import{useMDXComponents as s}from"./index-DeJayPHI.js";import{M as r}from"./blocks-CsMHUZB-.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6mFRbdBS.js";import"./index-CSZn66pI.js";import"./index-DqyoxfBT.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Architecture/PDRs/Input"}),`
`,e.jsx(n.h1,{id:"input-primitive",children:"Input Primitive"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(n.p,{children:"The Input primitive provides a headless, foundational, reusable input component built on React Aria's form field implementations. It serves as the universal base for all HTML input types in Bento, offering consistent accessibility, interaction behaviors, and styling capabilities across text inputs, checkboxes, radio buttons, and more."}),`
`,e.jsx(n.p,{children:"This primitive solves the common need for accessible form inputs across applications while providing the flexibility for custom styling and behavior through Bento's slot system. It handles standard input interactions including hover states and focus management for any HTML input type."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Use cases:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Foundation for all HTML input types (text, email, password, checkbox, radio, etc.)."}),`
`,e.jsx(n.li,{children:"Base component for search fields, toggle inputs, and form controls."}),`
`,e.jsx(n.li,{children:"Building custom input variations while maintaining accessibility."}),`
`,e.jsx(n.li,{children:"Creating consistent input experiences across applications regardless of input type."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Consuming components:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Custom form libraries and components."}),`
`,e.jsxs(n.li,{children:["Design systems with specific input components (TextField, Checkbox, RadioGroup, etc.).",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Input is intended to replace the HTML input element in the Bento Control primitive, used in Checkbox and Radio primitives."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Universal Input Support"}),": Works seamlessly with all HTML ",e.jsx(n.code,{children:"input"})," types through a single component interface."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Headless Design"}),": Provides a headless API for building custom input components without sacrificing accessibility."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Slot-Based Architecture"}),": Uses Bento's ",e.jsx(n.code,{children:"@bento/slots"})," system for customization of input structure and styling across all input types, allowing for flexibility in use with other Bento primitives."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Comprehensive State Management"}),": Exposes all input states (hover, focus-visible, disabled, invalid, checked, etc.) via data attributes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Cross-Platform Normalization"}),": Handles browser inconsistencies in hover and focus behavior across devices and input types with ",e.jsx(n.code,{children:"useHover"})," and ",e.jsx(n.code,{children:"useFocusRing"})," from React Aria."]}),`
`]}),`
`,e.jsx(n.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsx(n.p,{children:"This is a UI primitive that combines accessibility state hooks with rendering logic to create a complete input component system supporting all HTML input types."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Core React Aria hooks used:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"mergeRefs"})," - Utility for combining multiple refs into one for proper ref forwarding"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useHover"})," - Handles pointer hover interactions with proper touch device support (all types)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useFocusRing"})," - Manages focus visibility states for keyboard navigation (all types)"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Bento packages integrated:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@bento/slots"})," - Enables component customization through the slot system"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@bento/use-props"})," - Provides prop merging and data attribute management"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"@bento/use-data-attributes"})," - Manages consistent application of data attributes based on input state"]}),`
`]}),`
`,e.jsx(n.h2,{id:"implementation-patterns",children:"Implementation Patterns"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Concept"}),e.jsx(n.th,{children:"Implementation"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"React Aria"}),e.jsxs(n.td,{children:["Uses React Aria hooks for accessibility and interaction (",e.jsx(n.code,{children:"mergeRefs"}),", ",e.jsx(n.code,{children:"useHover"}),", ",e.jsx(n.code,{children:"useFocusRing"}),")"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Slots"}),e.jsxs(n.td,{children:["withSlots with adaptive ",e.jsx(n.code,{children:"input"})," slot, meant to be targetable in other slottable components and by itself"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Render Props"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"className"})," and ",e.jsx(n.code,{children:"style"})," as functions receiving state metadata for any input type, memoized for performance."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"data-* Attributes"}),e.jsx(n.td,{children:"data-hovered, data-focus-visible, data-disabled, data-invalid, data-checked, data-readonly, data-empty"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"data-override"}),e.jsx(n.td,{children:"Applied when slots or render props customize behavior"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"data-version"}),e.jsx(n.td,{children:"Component version tracking in development"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Prop Filtering"}),e.jsx(n.td,{children:"Type-specific prop filtering to avoid irrelevant attributes, meant to prevent warnings and DOM clutter."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"ARIA forwarding"}),e.jsx(n.td,{children:"Passes through appropriate ARIA attributes based on input type and state"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Ref Forwarding"}),e.jsx(n.td,{children:"Forwards ref to the underlying input element for direct access"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"State Management"}),e.jsxs(n.td,{children:["Controlled and uncontrolled modes native to ",e.jsx(n.code,{children:"input"})," elements"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Prop Validation"}),e.jsx(n.td,{children:"Validates props based on input type to ensure correct usage, dev-time warnings issued for common mistakes and irrelevant props ignored."})]})]})]}),`
`,e.jsx(n.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsx(n.p,{children:"The Input primitive can be broken down into several reusable parts:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Extractable behaviors:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Input validation utilities"})," - Reusable validation helpers for all form component types."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus management patterns"})," - Can be applied to other interactive components across input types."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ref & imperative API:"})," The component forwards and merges refs (mergeRefs) to expose the underlying HTMLInputElement. Consumers can rely on the forwarded ref for imperative calls such as focus()."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prop filtering:"})," The Input primitive only applies attributes valid for the chosen HTML input ",e.jsx(n.code,{children:"type"})," (for example, ",e.jsx(n.code,{children:"checked"}),"/",e.jsx(n.code,{children:"defaultChecked"})," only for ",e.jsx(n.code,{children:"checkbox"}),"/",e.jsx(n.code,{children:"radio"}),"; ",e.jsx(n.code,{children:"min"}),"/",e.jsx(n.code,{children:"max"}),"/",e.jsx(n.code,{children:"step"})," only for ",e.jsx(n.code,{children:"number"}),"/",e.jsx(n.code,{children:"range"}),"; ",e.jsx(n.code,{children:"multiple"}),"/",e.jsx(n.code,{children:"accept"})," only for ",e.jsx(n.code,{children:"file"}),"). Irrelevant props are ignored to prevent React warnings and DOM clutter; in development builds the primitive may emit dev-only warnings for obvious mismatches (e.g., ",e.jsx(n.code,{children:"checked"})," on ",e.jsx(n.code,{children:'type="text"'}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA implementation:"})," The primitive forwards all received aria-* props and role to the underlying input (aria-label, aria-labelledby, aria-describedby, aria-invalid, etc.)."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Shared logic with other primitives:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"State data attribute patterns (shared across all interactive components)"}),`
`,e.jsx(n.li,{children:"Slot architecture (consistent across all Bento components, adapts to input type structure)"}),`
`,e.jsx(n.li,{children:"React Aria integration patterns (template for other form and interactive primitives)"}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Minimal reusable unit:"})," This primitive represents the minimal unit for universal HTML input functionality while maintaining full accessibility and customization capabilities."]}),`
`,e.jsx(n.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Direct React Aria dependencies:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useHover"})," - Normalized hover interactions across devices (all input types)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useFocusRing"})," - Keyboard focus visibility management (all input types)"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Coverage gaps addressed:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Consistent data attribute naming for styling across different input behaviors"}),`
`,e.jsx(n.li,{children:"Integration with Bento's slot system for all input type customization needs"}),`
`]}),`
`,e.jsx(n.h2,{id:"architecture--features",children:"Architecture & Features"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Core architectural decisions:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Slot-based architecture allows complete customization of input structure"}),`
`,e.jsx(n.li,{children:"Data attributes provide styling hooks without requiring CSS-in-JS"}),`
`,e.jsx(n.li,{children:"Ref forwarding enables direct input element access"}),`
`,e.jsx(n.li,{children:"Type-specific prop filtering ensures only relevant props are passed to each input type, preventing React warnings and maintaining clean DOM output"}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Props interface (essentially an extended form of HTMLInputElement):"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`export interface InputRenderProps {
  isHovered: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  isEmpty: boolean;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'>,
    HoverEvents {
  // core styling render-props
  className?: ClassNameOrFunction<InputRenderProps>;
  style?: StyleOrFunction<InputRenderProps>;

  // Type narrowing hints (still compatible with native attributes)
  type?: InputHTMLAttributes<HTMLInputElement>['type'];

  // slotting helpers (optional)
  slot?: string;
  slots?: Record<string, any>;
}
`})}),`
`,e.jsxs(n.p,{children:["All other native HTMLInputElement attributes are supported and passed through to the underlying input element depending on the ",e.jsx(n.code,{children:"type"})," attribute value. For instance, ",e.jsx(n.code,{children:"size"})," is only available for ",e.jsx(n.code,{children:"text"}),", ",e.jsx(n.code,{children:"password"}),", ",e.jsx(n.code,{children:"email"}),", ",e.jsx(n.code,{children:"search"}),", ",e.jsx(n.code,{children:"tel"}),", and ",e.jsx(n.code,{children:"url"})," input types so it will be filtered out for other types and reflected in the full type definition."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Rendered DOM structure (adapts based on input type):"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- Checkbox example -->
<input type="checkbox" name="checkbox-name" value="checkbox-value" />

<!-- Empty Focused Text input example -->
<input type="text" name="text-name" value="" placeholder="Enter text" />
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"State management:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Controlled"}),": Value managed by parent component via native ",e.jsx(n.code,{children:"value"})," and ",e.jsx(n.code,{children:"onChange"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Uncontrolled"}),": Internal state with optional ",e.jsx(n.code,{children:"defaultValue"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Validation"}),": Supports both native HTML validation and custom validation functions across all input types."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type-specific prop filtering"}),": Only relevant props are applied based on the input type (e.g., ",e.jsx(n.code,{children:"checked"})," only for checkbox/radio, ",e.jsx(n.code,{children:"min"}),"/",e.jsx(n.code,{children:"max"}),"/",e.jsx(n.code,{children:"step"})," only for number/range, ",e.jsx(n.code,{children:"multiple"})," only for file inputs), preventing React warnings and keeping the DOM clean."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Styling via data attributes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Generic: ",e.jsx(n.code,{children:"data-disabled"}),", ",e.jsx(n.code,{children:"data-invalid"}),", ",e.jsx(n.code,{children:"data-readonly"}),", ",e.jsx(n.code,{children:"data-required"}),", ",e.jsx(n.code,{children:"data-hovered"}),", ",e.jsx(n.code,{children:"data-focus-visible"}),", ",e.jsx(n.code,{children:"data-focused"})]}),`
`,e.jsxs(n.li,{children:["Type-specific: ",e.jsx(n.code,{children:"data-checked"})," (checkbox/radio), ",e.jsx(n.code,{children:"data-pressed"})," (buttons)"]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Nesting/compound support:"})," Due to the simplicity of the primitive, it can be easily nested or composed within larger form structures since it relies on parent components for all attributes and state handling. The user is expected to provide these attributes themselves either directly or via higher-level form components or hooks. This primitive will work within other Bento primitives since they rely on React Aria state management hooks."]}),`
`,e.jsx(n.h2,{id:"accessibility-information",children:"Accessibility Information"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"ARIA implementation:"})," This primitive is very low-level and relies heavily on passed down props to manage ARIA attributes appropriately for each input type. This is due to the fact that it is agnostic of higher-level form field structures that are typically built on top of it, like external labels or descriptive text."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Keyboard interactions:"})," Keyboard interactions are innately handled by using the native HTML ",e.jsx(n.code,{children:"input"}),", which has built-in keyboard support for all input types in every major browser."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Focus management:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useFocusRing"})," provides keyboard-only focus visibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-focus-visible"})," enables CSS focus styling"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"data-focused"})," indicates current focus state"]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"AutoFocus support:"})," Controlled via ",e.jsx(n.code,{children:"autoFocus"})," prop with proper timing and focus management."]}),`
`,e.jsx(n.h2,{id:"internationalization-rtl-and-mobile-considerations",children:"Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsx(n.p,{children:"Most aspects of internationalization, RTL, and mobile considerations are inherently handled by using native HTML input elements and React Aria's hooks."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Mobile Considerations:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useHover"})," properly handles touch devices"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"useFocusRing"})," manages focus visibility on mobile"]}),`
`]}),`
`,e.jsx(n.h2,{id:"data-attributes-and-slot-map",children:"Data Attributes and Slot Map"}),`
`,e.jsxs(n.h3,{id:"expected-data--attributes",children:["Expected ",e.jsx(n.code,{children:"data-*"})," Attributes"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-hovered"})}),e.jsx(n.td,{children:"Indicates hover state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focus-visible"})}),e.jsx(n.td,{children:"Whether focus ring should be shown"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focused"})}),e.jsx(n.td,{children:"Current focus state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-disabled"})}),e.jsx(n.td,{children:"Indicates disabled state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-readonly"})}),e.jsx(n.td,{children:"Indicates read-only state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-invalid"})}),e.jsx(n.td,{children:"Indicates validation error"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-required"})}),e.jsx(n.td,{children:"Indicates required field"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-empty"})}),e.jsx(n.td,{children:"Whether input has no value"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-checked"})}),e.jsx(n.td,{children:"For checkbox/radio inputs"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-override"})}),e.jsx(n.td,{children:"Mark for locally overridden logic/UI"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-version"})}),e.jsx(n.td,{children:"Component version in dev only"}),e.jsx(n.td,{children:'"input@1.0"'})]})]})]}),`
`,e.jsx(n.h3,{id:"slot-map",children:"Slot Map"}),`
`,e.jsxs(n.p,{children:["This primitive is ",e.jsx(n.strong,{children:"slottable"})," but does ",e.jsx(n.strong,{children:"not"})," define its slot name itself. The component renders a single ",e.jsx(n.code,{children:"input"}),", whose slot name is determined by its usage context. For example, when used within a form field component, the form field would assign the appropriate slot name to the input, which allows multiple instances to coexist."]}),`
`,e.jsx(n.h2,{id:"competitive-research",children:"Competitive Research"}),`
`,e.jsx(n.p,{children:"While formulating my approach I considered the following libraries and frameworks that provide input primitives or components that offer varying levels of accessibility, customization, and features:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Input.tsx",rel:"nofollow",children:"React Aria"})}),": Provides a comprehensive input primitive built on top of React Aria hooks, offering robust accessibility features through its hooks. Does not include Bento's slot-based customization system and requires composition with other React Aria components for complete form field functionality."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.radix-ui.com/primitives/docs/components/form#control",rel:"nofollow",children:"Radix UI"})}),": Offers a Control primitive for form inputs that can be adapted for different input types. However, it requires the user to define their own input and lacks a universal input primitive. It also doesn't expose state via data attributes as comprehensively as Bento's approach."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://ark-ui.com/docs/components/field#input",rel:"nofollow",children:"Ark UI"})}),": Ark UI provides a ",e.jsx(n.code,{children:"Field"})," component that can be used to build an input field within the root with ",e.jsx(n.code,{children:"Field.Input"}),". This requires the user to wrap the input in a ",e.jsx(n.code,{children:"Field"})," component for proper context, which adds additional structure and complexity while limiting flexibility. Bento's Input primitive aims to be more flexible and reusable on its own without requiring additional wrappers."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://headlessui.com/react/input",rel:"nofollow",children:"Headless UI"})}),": Headless UI provides a flexible input component that can be used within or without a context. Bento's implementation took inspiration from their approach, with the addition of comprehensive data attributes and slot support for enhanced customization."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://chakra-ui.com/docs/components/input",rel:"nofollow",children:"Chakra UI"})}),": Provides styled input components with accessibility features. However, this component is tightly coupled to Chakra's styling system and doesn't separate primitive functionality from styling concerns."]}),`
`]}),`
`,e.jsx(n.p,{children:"This Bento primitive would provide the best blend of accessibility, customization, and universal input support across all HTML input types for our use case, since it is meant to be a foundational primitive with slot and data attribute support."}),`
`,e.jsx(n.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(n.h3,{id:"uncontrolled-input-example",children:"Uncontrolled Input Example"}),`
`,e.jsx(n.p,{children:"The following example shows an uncontrolled text input with a default value and placeholder."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Input type="text" defaultValue="Hello" placeholder="Uncontrolled input" />
`})}),`
`,e.jsx(n.p,{children:"Rendered as HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input type="text" value="Hello" placeholder="Uncontrolled input" />
`})}),`
`,e.jsx(n.h3,{id:"controlled-input-example",children:"Controlled Input Example"}),`
`,e.jsx(n.p,{children:"The following example shows a controlled text input with a value and placeholder."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`function ControlledInputExample() {
  const [value, setValue] = React.useState('');
  return (
    <Input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Controlled input"
    />
  );
}
`})}),`
`,e.jsx(n.p,{children:"Rendered as HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input type="text" value="" placeholder="Controlled input" />
`})}),`
`,e.jsx(n.h3,{id:"filtered-props-example",children:"Filtered Props Example"}),`
`,e.jsxs(n.p,{children:["The following example shows a number input with type-specific props like ",e.jsx(n.code,{children:"min"}),", ",e.jsx(n.code,{children:"max"}),", and ",e.jsx(n.code,{children:"step"}),". The ",e.jsx(n.code,{children:"checked"})," prop is ignored since it is not relevant for number inputs. A dev-time warning will be issued if irrelevant props like this are passed."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Input
  type="number"
  min={0}
  max={100}
  step={1}
  defaultValue={50}
  checked={true}  // This prop will be ignored for number inputs
/>
`})}),`
`,e.jsx(n.p,{children:"Rendered as HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input
  type="number"
  min="0"
  max="100"
  step="1"
  value="50"
/>
`})}),`
`,e.jsx(n.h3,{id:"visible-label-example",children:"Visible label example"}),`
`,e.jsxs(n.p,{children:["The following example shows an email input with an associated visible label. The label is linked to the input via the ",e.jsx(n.code,{children:"htmlFor"})," and ",e.jsx(n.code,{children:"id"})," attributes, supporting accessibility."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<label htmlFor="email">Email</label>
<Input id="email" type="email" />
`})}),`
`,e.jsx(n.p,{children:"Rendered as HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<label for="email">Email</label>
<input id="email" type="email" />
`})}),`
`,e.jsx(n.h3,{id:"non-visible-label-example",children:"Non-visible label example"}),`
`,e.jsxs(n.p,{children:["The following example shows a password input with an associated non-visible label for screen readers. The label is linked to the input via the ",e.jsx(n.code,{children:"aria-label"})," attribute."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Input type="password" aria-label="Password" />
`})}),`
`,e.jsx(n.p,{children:"Rendered as HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<input type="password" aria-label="Password" />
`})}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Labels"}),": In order to keep this primitive maximally reusable by itself and in other Bento components, we avoid coupling it directly with label rendering. Instead, we allow labels to be passed in via props or slots, enabling flexible usage patterns. This allows the Input primitive to be used both as a standalone input and within more complex form field components that handle label rendering."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Validation"}),": There is no special form validation logic implemented directly in this primitive beyond what is provided by HTML. Validation handling is expected to be managed by higher-level form components or via custom validation functions passed in as props."]}),`
`]})]})}function x(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{x as default};
