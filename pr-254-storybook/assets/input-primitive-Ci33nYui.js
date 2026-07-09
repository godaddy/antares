import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-LcJrgWsB.js";import{S as n,s as r,u as i}from"./blocks-BcTTWRq2.js";import{t as a}from"./mdx-react-shim-CcBquH60.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Input`}),`
`,(0,c.jsx)(t.h1,{id:`input-primitive`,children:`Input Primitive`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsx)(t.p,{children:`The Input primitive provides a headless, foundational, reusable input component built on React Aria's form field implementations. It serves as the universal base for all HTML input types in Bento, offering consistent accessibility, interaction behaviors, and styling capabilities across text inputs, checkboxes, radio buttons, and more.`}),`
`,(0,c.jsx)(t.p,{children:`This primitive solves the common need for accessible form inputs across applications while providing the flexibility for custom styling and behavior through Bento's slot system. It handles standard input interactions including hover states and focus management for any HTML input type.`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Use cases:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Foundation for all HTML input types (text, email, password, checkbox, radio, etc.).`}),`
`,(0,c.jsx)(t.li,{children:`Base component for search fields, toggle inputs, and form controls.`}),`
`,(0,c.jsx)(t.li,{children:`Building custom input variations while maintaining accessibility.`}),`
`,(0,c.jsx)(t.li,{children:`Creating consistent input experiences across applications regardless of input type.`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Consuming components:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Custom form libraries and components.`}),`
`,(0,c.jsxs)(t.li,{children:[`Design systems with specific input components (TextField, Checkbox, RadioGroup, etc.).`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Input is intended to replace the HTML input element in the Bento Control primitive, used in Checkbox and Radio primitives.`}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Universal Input Support`}),`: Works seamlessly with all HTML `,(0,c.jsx)(t.code,{children:`input`}),` types through a single component interface.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Headless Design`}),`: Provides a headless API for building custom input components without sacrificing accessibility.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Slot-Based Architecture`}),`: Uses Bento's `,(0,c.jsx)(t.code,{children:`@bento/slots`}),` system for customization of input structure and styling across all input types, allowing for flexibility in use with other Bento primitives.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Comprehensive State Management`}),`: Exposes all input states (hover, focus-visible, disabled, invalid, checked, etc.) via data attributes.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Cross-Platform Normalization`}),`: Handles browser inconsistencies in hover and focus behavior across devices and input types with `,(0,c.jsx)(t.code,{children:`useHover`}),` and `,(0,c.jsx)(t.code,{children:`useFocusRing`}),` from React Aria.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsx)(t.p,{children:`This is a UI primitive that combines accessibility state hooks with rendering logic to create a complete input component system supporting all HTML input types.`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Core React Aria hooks used:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`mergeRefs`}),` - Utility for combining multiple refs into one for proper ref forwarding`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useHover`}),` - Handles pointer hover interactions with proper touch device support (all types)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useFocusRing`}),` - Manages focus visibility states for keyboard navigation (all types)`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Bento packages integrated:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/slots`}),` - Enables component customization through the slot system`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/use-props`}),` - Provides prop merging and data attribute management`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/use-data-attributes`}),` - Manages consistent application of data attributes based on input state`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`implementation-patterns`,children:`Implementation Patterns`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Concept`}),(0,c.jsx)(t.th,{children:`Implementation`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsxs)(t.td,{children:[`Uses React Aria hooks for accessibility and interaction (`,(0,c.jsx)(t.code,{children:`mergeRefs`}),`, `,(0,c.jsx)(t.code,{children:`useHover`}),`, `,(0,c.jsx)(t.code,{children:`useFocusRing`}),`)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Slots`}),(0,c.jsxs)(t.td,{children:[`withSlots with adaptive `,(0,c.jsx)(t.code,{children:`input`}),` slot, meant to be targetable in other slottable components and by itself`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Render Props`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`className`}),` and `,(0,c.jsx)(t.code,{children:`style`}),` as functions receiving state metadata for any input type, memoized for performance.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-* Attributes`}),(0,c.jsx)(t.td,{children:`data-hovered, data-focus-visible, data-disabled, data-invalid, data-checked, data-readonly, data-empty`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-override`}),(0,c.jsx)(t.td,{children:`Applied when slots or render props customize behavior`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-version`}),(0,c.jsx)(t.td,{children:`Component version tracking in development`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Prop Filtering`}),(0,c.jsx)(t.td,{children:`Type-specific prop filtering to avoid irrelevant attributes, meant to prevent warnings and DOM clutter.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`ARIA forwarding`}),(0,c.jsx)(t.td,{children:`Passes through appropriate ARIA attributes based on input type and state`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Ref Forwarding`}),(0,c.jsx)(t.td,{children:`Forwards ref to the underlying input element for direct access`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`State Management`}),(0,c.jsxs)(t.td,{children:[`Controlled and uncontrolled modes native to `,(0,c.jsx)(t.code,{children:`input`}),` elements`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Prop Validation`}),(0,c.jsx)(t.td,{children:`Validates props based on input type to ensure correct usage, dev-time warnings issued for common mistakes and irrelevant props ignored.`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsx)(t.p,{children:`The Input primitive can be broken down into several reusable parts:`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Extractable behaviors:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Input validation utilities`}),` - Reusable validation helpers for all form component types.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus management patterns`}),` - Can be applied to other interactive components across input types.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Ref & imperative API:`}),` The component forwards and merges refs (mergeRefs) to expose the underlying HTMLInputElement. Consumers can rely on the forwarded ref for imperative calls such as focus().`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Prop filtering:`}),` The Input primitive only applies attributes valid for the chosen HTML input `,(0,c.jsx)(t.code,{children:`type`}),` (for example, `,(0,c.jsx)(t.code,{children:`checked`}),`/`,(0,c.jsx)(t.code,{children:`defaultChecked`}),` only for `,(0,c.jsx)(t.code,{children:`checkbox`}),`/`,(0,c.jsx)(t.code,{children:`radio`}),`; `,(0,c.jsx)(t.code,{children:`min`}),`/`,(0,c.jsx)(t.code,{children:`max`}),`/`,(0,c.jsx)(t.code,{children:`step`}),` only for `,(0,c.jsx)(t.code,{children:`number`}),`/`,(0,c.jsx)(t.code,{children:`range`}),`; `,(0,c.jsx)(t.code,{children:`multiple`}),`/`,(0,c.jsx)(t.code,{children:`accept`}),` only for `,(0,c.jsx)(t.code,{children:`file`}),`). Irrelevant props are ignored to prevent React warnings and DOM clutter; in development builds the primitive may emit dev-only warnings for obvious mismatches (e.g., `,(0,c.jsx)(t.code,{children:`checked`}),` on `,(0,c.jsx)(t.code,{children:`type="text"`}),`).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ARIA implementation:`}),` The primitive forwards all received aria-* props and role to the underlying input (aria-label, aria-labelledby, aria-describedby, aria-invalid, etc.).`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Shared logic with other primitives:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`State data attribute patterns (shared across all interactive components)`}),`
`,(0,c.jsx)(t.li,{children:`Slot architecture (consistent across all Bento components, adapts to input type structure)`}),`
`,(0,c.jsx)(t.li,{children:`React Aria integration patterns (template for other form and interactive primitives)`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Minimal reusable unit:`}),` This primitive represents the minimal unit for universal HTML input functionality while maintaining full accessibility and customization capabilities.`]}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Direct React Aria dependencies:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useHover`}),` - Normalized hover interactions across devices (all input types)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useFocusRing`}),` - Keyboard focus visibility management (all input types)`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Coverage gaps addressed:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Consistent data attribute naming for styling across different input behaviors`}),`
`,(0,c.jsx)(t.li,{children:`Integration with Bento's slot system for all input type customization needs`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`architecture--features`,children:`Architecture & Features`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Core architectural decisions:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Slot-based architecture allows complete customization of input structure`}),`
`,(0,c.jsx)(t.li,{children:`Data attributes provide styling hooks without requiring CSS-in-JS`}),`
`,(0,c.jsx)(t.li,{children:`Ref forwarding enables direct input element access`}),`
`,(0,c.jsx)(t.li,{children:`Type-specific prop filtering ensures only relevant props are passed to each input type, preventing React warnings and maintaining clean DOM output`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Props interface (essentially an extended form of HTMLInputElement):`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-typescript`,children:`export interface InputRenderProps {
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
`,(0,c.jsxs)(t.p,{children:[`All other native HTMLInputElement attributes are supported and passed through to the underlying input element depending on the `,(0,c.jsx)(t.code,{children:`type`}),` attribute value. For instance, `,(0,c.jsx)(t.code,{children:`size`}),` is only available for `,(0,c.jsx)(t.code,{children:`text`}),`, `,(0,c.jsx)(t.code,{children:`password`}),`, `,(0,c.jsx)(t.code,{children:`email`}),`, `,(0,c.jsx)(t.code,{children:`search`}),`, `,(0,c.jsx)(t.code,{children:`tel`}),`, and `,(0,c.jsx)(t.code,{children:`url`}),` input types so it will be filtered out for other types and reflected in the full type definition.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Rendered DOM structure (adapts based on input type):`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<!-- Checkbox example -->
<input type="checkbox" name="checkbox-name" value="checkbox-value" />

<!-- Empty Focused Text input example -->
<input type="text" name="text-name" value="" placeholder="Enter text" />
`})}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`State management:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Controlled`}),`: Value managed by parent component via native `,(0,c.jsx)(t.code,{children:`value`}),` and `,(0,c.jsx)(t.code,{children:`onChange`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Uncontrolled`}),`: Internal state with optional `,(0,c.jsx)(t.code,{children:`defaultValue`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Validation`}),`: Supports both native HTML validation and custom validation functions across all input types.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Type-specific prop filtering`}),`: Only relevant props are applied based on the input type (e.g., `,(0,c.jsx)(t.code,{children:`checked`}),` only for checkbox/radio, `,(0,c.jsx)(t.code,{children:`min`}),`/`,(0,c.jsx)(t.code,{children:`max`}),`/`,(0,c.jsx)(t.code,{children:`step`}),` only for number/range, `,(0,c.jsx)(t.code,{children:`multiple`}),` only for file inputs), preventing React warnings and keeping the DOM clean.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Styling via data attributes:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Generic: `,(0,c.jsx)(t.code,{children:`data-disabled`}),`, `,(0,c.jsx)(t.code,{children:`data-invalid`}),`, `,(0,c.jsx)(t.code,{children:`data-readonly`}),`, `,(0,c.jsx)(t.code,{children:`data-required`}),`, `,(0,c.jsx)(t.code,{children:`data-hovered`}),`, `,(0,c.jsx)(t.code,{children:`data-focus-visible`}),`, `,(0,c.jsx)(t.code,{children:`data-focused`})]}),`
`,(0,c.jsxs)(t.li,{children:[`Type-specific: `,(0,c.jsx)(t.code,{children:`data-checked`}),` (checkbox/radio), `,(0,c.jsx)(t.code,{children:`data-pressed`}),` (buttons)`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Nesting/compound support:`}),` Due to the simplicity of the primitive, it can be easily nested or composed within larger form structures since it relies on parent components for all attributes and state handling. The user is expected to provide these attributes themselves either directly or via higher-level form components or hooks. This primitive will work within other Bento primitives since they rely on React Aria state management hooks.`]}),`
`,(0,c.jsx)(t.h2,{id:`accessibility-information`,children:`Accessibility Information`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`ARIA implementation:`}),` This primitive is very low-level and relies heavily on passed down props to manage ARIA attributes appropriately for each input type. This is due to the fact that it is agnostic of higher-level form field structures that are typically built on top of it, like external labels or descriptive text.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Keyboard interactions:`}),` Keyboard interactions are innately handled by using the native HTML `,(0,c.jsx)(t.code,{children:`input`}),`, which has built-in keyboard support for all input types in every major browser.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Focus management:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useFocusRing`}),` provides keyboard-only focus visibility`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`data-focus-visible`}),` enables CSS focus styling`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`data-focused`}),` indicates current focus state`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`AutoFocus support:`}),` Controlled via `,(0,c.jsx)(t.code,{children:`autoFocus`}),` prop with proper timing and focus management.`]}),`
`,(0,c.jsx)(t.h2,{id:`internationalization-rtl-and-mobile-considerations`,children:`Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsx)(t.p,{children:`Most aspects of internationalization, RTL, and mobile considerations are inherently handled by using native HTML input elements and React Aria's hooks.`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Mobile Considerations:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useHover`}),` properly handles touch devices`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useFocusRing`}),` manages focus visibility on mobile`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes-and-slot-map`,children:`Data Attributes and Slot Map`}),`
`,(0,c.jsxs)(t.h3,{id:`expected-data--attributes`,children:[`Expected `,(0,c.jsx)(t.code,{children:`data-*`}),` Attributes`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-hovered`})}),(0,c.jsx)(t.td,{children:`Indicates hover state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focus-visible`})}),(0,c.jsx)(t.td,{children:`Whether focus ring should be shown`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focused`})}),(0,c.jsx)(t.td,{children:`Current focus state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-disabled`})}),(0,c.jsx)(t.td,{children:`Indicates disabled state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-readonly`})}),(0,c.jsx)(t.td,{children:`Indicates read-only state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-invalid`})}),(0,c.jsx)(t.td,{children:`Indicates validation error`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-required`})}),(0,c.jsx)(t.td,{children:`Indicates required field`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-empty`})}),(0,c.jsx)(t.td,{children:`Whether input has no value`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-checked`})}),(0,c.jsx)(t.td,{children:`For checkbox/radio inputs`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-override`})}),(0,c.jsx)(t.td,{children:`Mark for locally overridden logic/UI`}),(0,c.jsx)(t.td,{children:`"true"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-version`})}),(0,c.jsx)(t.td,{children:`Component version in dev only`}),(0,c.jsx)(t.td,{children:`"input@1.0"`})]})]})]}),`
`,(0,c.jsx)(t.h3,{id:`slot-map`,children:`Slot Map`}),`
`,(0,c.jsxs)(t.p,{children:[`This primitive is `,(0,c.jsx)(t.strong,{children:`slottable`}),` but does `,(0,c.jsx)(t.strong,{children:`not`}),` define its slot name itself. The component renders a single `,(0,c.jsx)(t.code,{children:`input`}),`, whose slot name is determined by its usage context. For example, when used within a form field component, the form field would assign the appropriate slot name to the input, which allows multiple instances to coexist.`]}),`
`,(0,c.jsx)(t.h2,{id:`competitive-research`,children:`Competitive Research`}),`
`,(0,c.jsx)(t.p,{children:`While formulating my approach I considered the following libraries and frameworks that provide input primitives or components that offer varying levels of accessibility, customization, and features:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Input.tsx`,rel:`nofollow`,children:`React Aria`})}),`: Provides a comprehensive input primitive built on top of React Aria hooks, offering robust accessibility features through its hooks. Does not include Bento's slot-based customization system and requires composition with other React Aria components for complete form field functionality.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://www.radix-ui.com/primitives/docs/components/form#control`,rel:`nofollow`,children:`Radix UI`})}),`: Offers a Control primitive for form inputs that can be adapted for different input types. However, it requires the user to define their own input and lacks a universal input primitive. It also doesn't expose state via data attributes as comprehensively as Bento's approach.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://ark-ui.com/docs/components/field#input`,rel:`nofollow`,children:`Ark UI`})}),`: Ark UI provides a `,(0,c.jsx)(t.code,{children:`Field`}),` component that can be used to build an input field within the root with `,(0,c.jsx)(t.code,{children:`Field.Input`}),`. This requires the user to wrap the input in a `,(0,c.jsx)(t.code,{children:`Field`}),` component for proper context, which adds additional structure and complexity while limiting flexibility. Bento's Input primitive aims to be more flexible and reusable on its own without requiring additional wrappers.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://headlessui.com/react/input`,rel:`nofollow`,children:`Headless UI`})}),`: Headless UI provides a flexible input component that can be used within or without a context. Bento's implementation took inspiration from their approach, with the addition of comprehensive data attributes and slot support for enhanced customization.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://chakra-ui.com/docs/components/input`,rel:`nofollow`,children:`Chakra UI`})}),`: Provides styled input components with accessibility features. However, this component is tightly coupled to Chakra's styling system and doesn't separate primitive functionality from styling concerns.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`This Bento primitive would provide the best blend of accessibility, customization, and universal input support across all HTML input types for our use case, since it is meant to be a foundational primitive with slot and data attribute support.`}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h3,{id:`uncontrolled-input-example`,children:`Uncontrolled Input Example`}),`
`,(0,c.jsx)(t.p,{children:`The following example shows an uncontrolled text input with a default value and placeholder.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Input type="text" defaultValue="Hello" placeholder="Uncontrolled input" />
`})}),`
`,(0,c.jsx)(t.p,{children:`Rendered as HTML:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<input type="text" value="Hello" placeholder="Uncontrolled input" />
`})}),`
`,(0,c.jsx)(t.h3,{id:`controlled-input-example`,children:`Controlled Input Example`}),`
`,(0,c.jsx)(t.p,{children:`The following example shows a controlled text input with a value and placeholder.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`function ControlledInputExample() {
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
`,(0,c.jsx)(t.p,{children:`Rendered as HTML:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<input type="text" value="" placeholder="Controlled input" />
`})}),`
`,(0,c.jsx)(t.h3,{id:`filtered-props-example`,children:`Filtered Props Example`}),`
`,(0,c.jsxs)(t.p,{children:[`The following example shows a number input with type-specific props like `,(0,c.jsx)(t.code,{children:`min`}),`, `,(0,c.jsx)(t.code,{children:`max`}),`, and `,(0,c.jsx)(t.code,{children:`step`}),`. The `,(0,c.jsx)(t.code,{children:`checked`}),` prop is ignored since it is not relevant for number inputs. A dev-time warning will be issued if irrelevant props like this are passed.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Input
  type="number"
  min={0}
  max={100}
  step={1}
  defaultValue={50}
  checked={true}  // This prop will be ignored for number inputs
/>
`})}),`
`,(0,c.jsx)(t.p,{children:`Rendered as HTML:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<input
  type="number"
  min="0"
  max="100"
  step="1"
  value="50"
/>
`})}),`
`,(0,c.jsx)(t.h3,{id:`visible-label-example`,children:`Visible label example`}),`
`,(0,c.jsxs)(t.p,{children:[`The following example shows an email input with an associated visible label. The label is linked to the input via the `,(0,c.jsx)(t.code,{children:`htmlFor`}),` and `,(0,c.jsx)(t.code,{children:`id`}),` attributes, supporting accessibility.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<label htmlFor="email">Email</label>
<Input id="email" type="email" />
`})}),`
`,(0,c.jsx)(t.p,{children:`Rendered as HTML:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<label for="email">Email</label>
<input id="email" type="email" />
`})}),`
`,(0,c.jsx)(t.h3,{id:`non-visible-label-example`,children:`Non-visible label example`}),`
`,(0,c.jsxs)(t.p,{children:[`The following example shows a password input with an associated non-visible label for screen readers. The label is linked to the input via the `,(0,c.jsx)(t.code,{children:`aria-label`}),` attribute.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Input type="password" aria-label="Password" />
`})}),`
`,(0,c.jsx)(t.p,{children:`Rendered as HTML:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<input type="password" aria-label="Password" />
`})}),`
`,(0,c.jsx)(t.h2,{id:`notes`,children:`Notes`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Labels`}),`: In order to keep this primitive maximally reusable by itself and in other Bento components, we avoid coupling it directly with label rendering. Instead, we allow labels to be passed in via props or slots, enabling flexible usage patterns. This allows the Input primitive to be used both as a standalone input and within more complex form field components that handle label rendering.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Validation`}),`: There is no special form validation logic implemented directly in this primitive beyond what is provided by HTML. Validation handling is expected to be managed by higher-level form components or via custom validation functions passed in as props.`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};