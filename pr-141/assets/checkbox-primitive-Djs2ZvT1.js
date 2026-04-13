import{j as e}from"./iframe-COe6gShG.js";import{useMDXComponents as s}from"./index-B_Eou4BZ.js";import{M as c}from"./blocks-CI_p2CkW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-ovp4-BAv.js";import"./index-CAkzvbPH.js";import"./index-Cic7qCE0.js";import"./index-DrFu-skq.js";function i(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Architecture/PDRs/Checkbox"}),`
`,e.jsx(n.h1,{id:"checkbox-primitive-pdr",children:"Checkbox Primitive PDR"}),`
`,e.jsx(n.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(n.p,{children:["In order to provide a consistent and accessible way to handle checkbox inputs in Bento, we are introducing the ",e.jsx(n.code,{children:"Checkbox"})," and ",e.jsx(n.code,{children:"CheckboxGroup"})," primitives. These primitives will encapsulate the behavior of checkboxes, including single selection, multiple selections, disabled, and indeterminate states, while ensuring compliance with accessibility standards."]}),`
`,e.jsx(n.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Checkbox"})," and ",e.jsx(n.code,{children:"CheckboxGroup"})," primitives are unique in that they provide a standardized way to manage checkbox inputs."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Checkbox"}),": Represents a single checkbox input with or without a label that can be checked, unchecked, or in an indeterminate state. It supports both controlled and uncontrolled modes, allowing developers to manage its state through props or internal state. It is flexible enough to be used in various contexts, such as forms, settings, or preferences, and can be customized with slots for labels and icons."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CheckboxGroup"}),": Represents a group of checkboxes that can be used for multi-selection scenarios. It manages the state of multiple checkboxes, allowing for collective control over their selection states with contextual state management."]}),`
`]}),`
`,e.jsx(n.h2,{id:"primitive-compositions",children:"Primitive Compositions"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Checkbox"})," and ",e.jsx(n.code,{children:"CheckboxGroup"})," primitives will be composed using a combination of Bento and React ARIA hooks and components to ensure flexibility, accessibility, and ease of use. The ",e.jsx(n.code,{children:"Checkbox"})," group is the base primitive, which can be rendered with or without a label. If there is no label then no ",e.jsx(n.code,{children:"<label>"})," element will be rendered. The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive builds on the ",e.jsx(n.code,{children:"Checkbox"})," primitive by allowing them as children whose state is controlled through context to manage multiple checkbox inputs in a group."]}),`
`,e.jsx(n.p,{children:"The following sections outline the composition of each primitive."}),`
`,e.jsx(n.h3,{id:"checkbox-primitive",children:"Checkbox Primitive"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Checkbox"})," primitive will be built using the following hooks and components:"]}),`
`,e.jsx(n.h4,{id:"component-composition",children:"Component composition"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Control"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will use the ",e.jsx(n.code,{children:"Control"})," component (as defined in the ",e.jsx(n.a,{href:"/docs/pdrs/radio-primitive.mdx#control-primitive",children:"Radio and RadioGroup PDR"}),") from Bento to render the checkbox input. This component will handle the basic input functionality and accessibility features."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Icon"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will use the ",e.jsx(n.code,{children:"Icon"})," primitive to render the visual representation of the checkbox state (checked, unchecked, indeterminate). These icons are entirely customizable by the user, and there will be no default icons provided."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useDataAttributes"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will use the ",e.jsx(n.code,{children:"useDataAttributes"})," utility to manage the visual styles and states of the checkbox, allowing developers to apply custom styles based on the state of the checkbox."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"withSlots"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will use the ",e.jsx(n.code,{children:"withSlots"})," utility to allow for flexible slot-based composition, enabling developers to customize the checkbox's appearance and behavior by providing custom components for the icon slots."]}),`
`]}),`
`,e.jsx(n.h4,{id:"state-management",children:"State management"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckbox"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will utilize the ",e.jsx(n.code,{children:"useCheckbox"})," hook from React Aria to manage the checkbox's state and behavior when it is not within the React context of a ",e.jsx(n.code,{children:"CheckboxGroup"}),". A user can pass in the ",e.jsx(n.code,{children:"checked"})," and ",e.jsx(n.code,{children:"onChange"})," props to control the checkbox state, or it can be used in an uncontrolled mode where the state is managed internally by the hook."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useToggleState"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will use the ",e.jsx(n.code,{children:"useToggleState"})," hook to manage the checked state of the checkbox, allowing for both controlled and uncontrolled modes. This hook will be used for checkboxes that are not part of a group."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckboxGroupItem"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will use the ",e.jsx(n.code,{children:"useCheckboxGroupItem"})," hook to manage the checkbox's state and behavior when it is within the context of a ",e.jsx(n.code,{children:"CheckboxGroup"}),". This hook will provide the necessary props and state management for the checkbox to function correctly within the group."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useId"}),": The ",e.jsx(n.code,{children:"Checkbox"})," primitive will use the ",e.jsx(n.code,{children:"useId"})," hook to generate a unique ID for the checkbox input, ensuring that it can be correctly associated with its label for accessibility purposes."]}),`
`]}),`
`,e.jsx(n.h4,{id:"pseudocode",children:"Pseudocode"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.code,{children:"Checkbox"})," without a label will render without a text label or ",e.jsx(n.code,{children:"<label>"})," element, unlike a ",e.jsx(n.code,{children:"Checkbox"})," with a label."]}),`
`,e.jsx(n.h5,{id:"checkbox-pseudocode",children:"Checkbox Pseudocode"}),`
`,e.jsxs(n.p,{children:["A basic example of what a ",e.jsx(n.code,{children:"Checkbox"})," would look like in JSX is as follows:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Control slot="control" props={{ labelProps, inputProps, label, ref }}>
  <Icon slot="icon" aria-selected={ state.isSelected } data-selected={ state.isSelected }icon={ icon } />
</Control>
`})}),`
`,e.jsxs(n.p,{children:[`:::note
React ARIA already uses their version of the `,e.jsx(n.code,{children:"Pressable"})," primitive internally in their checkbox state hooks, which handles the press state and visual feedback. Therefore, we do not need to wrap the ",e.jsx(n.code,{children:"Checkbox"})," primitive in a ",e.jsx(n.code,{children:"Pressable"}),` component.
:::`]}),`
`,e.jsx(n.h3,{id:"checkboxgroup-primitive",children:"CheckboxGroup Primitive"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive will be built using the following hooks and components:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ControlGroup"}),": The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive will use the ",e.jsx(n.code,{children:"ControlGroup"})," component (as defined in the ",e.jsx(n.a,{href:"/docs/pdrs/radio-primitive.mdx#controlgroup-primitive",children:"Radio and RadioGroup PDR"}),") from Bento to render the group of checkbox inputs. This component will handle the basic input functionality and accessibility features as well as the layout of the checkbox group."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckboxGroup"}),": The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive will use the ",e.jsx(n.code,{children:"useCheckboxGroup"})," hook to manage the state of multiple checkboxes within a group."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckboxGroupState"}),": The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive will use the ",e.jsx(n.code,{children:"useCheckboxGroupState"})," hook to manage the state of multiple checkboxes, allowing for collective control over their selection states."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useDataAttributes"}),": The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive will use the ",e.jsx(n.code,{children:"useDataAttributes"})," utility to manage the visual styles and states of the checkbox group, allowing developers to apply custom styles based on the state of the group."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"withSlots"}),": The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive will use the ",e.jsx(n.code,{children:"withSlots"})," utility to allow for flexible slot-based composition, enabling developers to customize the checkbox group's appearance and behavior by providing custom components for slots like label, icon, and the visible checkbox input."]}),`
`]}),`
`,e.jsx(n.h4,{id:"pseudocode-1",children:"Pseudocode"}),`
`,e.jsx(n.p,{children:"A very basic outline of what this could look like in JSX is as follows:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<ControlGroup slot="group" props={{ groupProps, isInvalid, descriptionProps, errorMessageProps, validationErrors, label, description }}>
  <CheckboxGroupStateContext.Provider value={state}>{children}</CheckboxGroupStateContext.Provider>
</ControlGroup>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"groupProps"}),", ",e.jsx(n.code,{children:"labelProps"}),", ",e.jsx(n.code,{children:"descriptionProps"}),", and ",e.jsx(n.code,{children:"errorMessageProps"})," are all derived from the ",e.jsx(n.code,{children:"useCheckboxGroup"})," hook, which provides the necessary ARIA attributes and event handlers for the checkbox group. ",e.jsx(n.code,{children:"isInvalid"})," and ",e.jsx(n.code,{children:"validationErrors"})," are also derived from the hook and can be used to manage the checkbox group's validation state. ",e.jsx(n.code,{children:"description"})," is an optional prop that can be passed to the ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive to provide additional context."]}),`
`,e.jsx(n.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Checkbox"})," and ",e.jsx(n.code,{children:"CheckboxGroup"})," primitives are designed to be flexible and reusable across various components and layouts. They can be used in different contexts, such as:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Single ",e.jsx(n.code,{children:"Checkbox"})," inputs for forms, settings, or preferences."]}),`
`,e.jsxs(n.li,{children:["Single ",e.jsx(n.code,{children:"Checkbox"})," inputs for selecting rows in a table or list."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Checkbox"}),"s that allow for custom labels and icons."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"CheckboxGroup"}),"s for multi-selection scenarios, such as selecting multiple options from a list."]}),`
`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Checkbox"})," can be reused within the Bento ecosystem if we decide to add selectable rows or columns in tables, or if we want to create a list of selectable items."]}),`
`,e.jsx(n.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckbox"})," - Provides the necessary state and behavior for a single checkbox input, including handling checked, unchecked, and indeterminate states. It also manages accessibility attributes like ",e.jsx(n.code,{children:"aria-checked"}),", ",e.jsx(n.code,{children:"aria-disabled"}),", and ",e.jsx(n.code,{children:"aria-required"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckboxGroup"})," - Manages the state and behavior of a group of checkboxes, allowing for collective control over their selection states. It provides the necessary ARIA attributes and event handlers for the checkbox group."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckboxGroupState"})," - Manages the state of a group of checkboxes, including their collective checked and indeterminate states."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useCheckboxGroupItem"})," - Manages the state and behavior of a single checkbox within a group, allowing it to participate in the group's collective state management."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"useToggleState"})," - Provides a simple way to manage the toggled state of a ",e.jsx(n.code,{children:"Checkbox"})," that is not a part of a group context."]}),`
`]}),`
`,e.jsx(n.h2,{id:"accessibility-internationalization-rtl-and-mobile-considerations",children:"Accessibility, Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsx(n.p,{children:"The Checkbox primitive is designed with accessibility in mind to ensure that it meets ARIA standards for checkbox inputs. Key accessibility features include:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic HTML"}),": The input within the Checkbox primitive is rendered as a native ",e.jsx(n.code,{children:'<input type="checkbox">'}),", which provides built-in accessibility features and ensures compatibility with assistive technologies. Although this input is visually hidden, it is still part of the DOM and accessible to screen readers."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA Attributes"}),": All ARIA attributes are supplied by the the ",e.jsx(n.code,{children:"Control"})," and ",e.jsx(n.code,{children:"ControlGroup"})," primitives."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": The ",e.jsx(n.code,{children:"<input>"})," element is the focusable element and ensures that the checkbox responds to keyboard interactions, including spacebar activation."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus Management"}),": The React ARIA hook ",e.jsx(n.code,{children:"useCheckbox"})," correctly applies the ",e.jsx(n.code,{children:"tabIndex='0'"})," to Checkbox instances, allowing them to be focusable. We will also add data-attributes for pressability and focusability, such as ",e.jsx(n.code,{children:"data-focus-visible"})," attribute."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen Reader Support"}),": The ",e.jsx(n.code,{children:"aria-label"})," and ",e.jsx(n.code,{children:"aria-labelledby"})," attributes are used to provide accessible labels for the checkbox, ensuring that screen readers can announce the checkbox state correctly. The ",e.jsx(n.code,{children:"aria-required"})," attribute is also applied when necessary, and the visually hidden input is still part of the DOM and accessible to screen readers."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"RTL Support"}),": The Checkbox primitive supports right-to-left (RTL) layouts innately. When the directionality of the component should not be set to browser default, developers can use the ",e.jsx(n.code,{children:"dir"})," prop to explicitly set the directionality of the checkbox on any parent element. This ensures that the checkbox label is correctly positioned on the right or left depending on the correct directionality."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mobile Considerations"}),": The Checkbox primitive is designed to be touch-friendly, with appropriate padding and hit area sizes to ensure usability on mobile devices. The internals of ",e.jsx(n.code,{children:"useCheckbox"})," handles touch interactions and provides a framework for visual feedback on press with the data attributes it provides."]}),`
`]}),`
`,e.jsx(n.h2,{id:"data-attributes-prop-map-and-slot-map",children:"Data Attributes, Prop Map, and Slot Map"}),`
`,e.jsx(n.h3,{id:"expected-data-attributes",children:"Expected Data Attributes"}),`
`,e.jsxs(n.p,{children:["The following ",e.jsx(n.code,{children:"data-*"})," attributes are provided by the ",e.jsx(n.code,{children:"Icon"})," primitive itself to help developers manage the visibility and styling of the icons used in the ",e.jsx(n.code,{children:"Checkbox"})," primitive:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-icon"})}),e.jsx(n.td,{children:"The icon name or type"}),e.jsx(n.td,{children:'"checked" / "unchecked" / "indeterminate"'})]})})]}),`
`,e.jsxs(n.p,{children:["The following ",e.jsx(n.code,{children:"data-*"})," attributes are provided by the ",e.jsx(n.code,{children:"Checkbox"})," primitive itself to help developers manage the visual styles and states of their checkbox implementation:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-disabled"})}),e.jsx(n.td,{children:"Indicates disabled state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-invalid"})}),e.jsx(n.td,{children:"Indicates invalid state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-required"})}),e.jsx(n.td,{children:"Indicates required state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-indeterminate"})}),e.jsx(n.td,{children:"Indicates indeterminate state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-checked"})}),e.jsx(n.td,{children:"Indicates checked state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-override"})}),e.jsx(n.td,{children:"Mark for locally overridden logic/UI"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-version"})}),e.jsx(n.td,{children:"Component version in dev only"}),e.jsx(n.td,{children:'"checkbox@1.0"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-pressed"})}),e.jsx(n.td,{children:"Indicates pressed state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-hovered"})}),e.jsx(n.td,{children:"Indicates hovered state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focused"})}),e.jsx(n.td,{children:"Indicates focused state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focus-visible"})}),e.jsx(n.td,{children:"Whether focus ring should be shown"}),e.jsx(n.td,{children:'"true" / "false"'})]})]})]}),`
`,e.jsxs(n.p,{children:["The following ",e.jsx(n.code,{children:"data-*"})," attributes are provided by the ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive itself to help developers manage the visual styles and states of their checkbox group implementation:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-override"})}),e.jsx(n.td,{children:"Mark for locally overridden logic/UI"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-invalid"})}),e.jsx(n.td,{children:"Indicates invalid state"}),e.jsx(n.td,{children:'"true" / "false"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-version"})}),e.jsx(n.td,{children:"Component version in dev only"}),e.jsx(n.td,{children:'"checkbox-group@1.0"'})]})]})]}),`
`,e.jsx(n.h3,{id:"prop-map",children:"Prop Map"}),`
`,e.jsxs(n.p,{children:["The following table describes the props available for the ",e.jsx(n.code,{children:"Checkbox"})," primitive."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop Name"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Default Value"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"id"})}),e.jsx(n.td,{children:"Unique identifier for the checkbox"}),e.jsx(n.td,{children:"string"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"Generated"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:"Custom CSS class to apply to the checkbox"}),e.jsx(n.td,{children:"string"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"undefined"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isChecked"})}),e.jsx(n.td,{children:"Whether the checkbox is checked"}),e.jsx(n.td,{children:"boolean"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onChange"})}),e.jsx(n.td,{children:"Callback when the checkbox state changes"}),e.jsx(n.td,{children:"(checked: boolean) => void"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"undefined"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isDisabled"})}),e.jsx(n.td,{children:"Whether the checkbox is disabled"}),e.jsx(n.td,{children:"boolean"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isRequired"})}),e.jsx(n.td,{children:"Whether the checkbox is required"}),e.jsx(n.td,{children:"boolean"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"false"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"isIndeterminate"})}),e.jsx(n.td,{children:"Whether the checkbox is in an indeterminate state"}),e.jsx(n.td,{children:"boolean"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"false"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"label"})}),e.jsx(n.td,{children:"Accessible label for the checkbox"}),e.jsx(n.td,{children:"string"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"undefined"})]})]})]}),`
`,e.jsxs(n.p,{children:["The following table describes the props available for the ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop Name"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Default Value"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"id"})}),e.jsx(n.td,{children:"Unique identifier for the checkbox group"}),e.jsx(n.td,{children:"string"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"Generated"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"className"})}),e.jsx(n.td,{children:"Custom CSS class to apply to the checkbox group"}),e.jsx(n.td,{children:"string"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"undefined"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"label"})}),e.jsx(n.td,{children:"Accessible label for the checkbox group"}),e.jsx(n.td,{children:"string"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"undefined"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"description"})}),e.jsx(n.td,{children:"Optional description for the checkbox group"}),e.jsx(n.td,{children:"string"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"undefined"})]})]})]}),`
`,e.jsx(n.h3,{id:"slot-map",children:"Slot Map"}),`
`,e.jsxs(n.p,{children:["The following table describes the slots available for the ",e.jsx(n.code,{children:"Checkbox"})," primitive."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot Name"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Default Fallback"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"control.label"})}),e.jsx(n.td,{children:"Accessible label"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"No"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"control.icon"})}),e.jsx(n.td,{children:"Optional visual icon inside item"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"No"})]})]})]}),`
`,e.jsxs(n.p,{children:["The following table describes the slots available for the ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Slot Name"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Required"}),e.jsx(n.th,{children:"Default Fallback"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"group.label"})}),e.jsx(n.td,{children:"Accessible label"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"No"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"group.description"})}),e.jsx(n.td,{children:"Optional description for the checkbox group"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"No"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"group.error"})}),e.jsx(n.td,{children:"Error message for validation errors"}),e.jsx(n.td,{children:"No"}),e.jsx(n.td,{children:"No"})]})]})]}),`
`,e.jsx(n.h2,{id:"rationale",children:"Rationale"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Why not split up the ",e.jsx(n.code,{children:"Checkbox"}),"?"]}),": It is much simpler to conditionally render the label based on the presence of children rather than splitting the ",e.jsx(n.code,{children:"Checkbox"})," primitive into two separate primitives due to extra state management that would be necessary otherwise. If we expected users to be able to pass in ",e.jsx(n.code,{children:"isChecked"})," and ",e.jsx(n.code,{children:"onChange"})," to both primitives, we would need to manage the group state, toggle state (when not in a group), controllability, and the passing of state between the two individually which would get messy. Also, having two primitives rather than three aligns better with the ",e.jsx(n.code,{children:"Radio"})," and ",e.jsx(n.code,{children:"RadioGroup"})," compositions."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Why use React ARIA hooks?"}),": React ARIA hooks provide a standardized way to manage accessibility and state for form controls. They align with the WAI-ARIA specifications and ensure that the components are accessible to users with disabilities."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Why visually hide the native checkbox input?"}),": The native checkbox input is visually hidden to allow for custom styling and behavior while still being accessible to screen readers. Native checkboxes also vary style-wise browser to browser, so visually hiding the ",e.jsx(n.code,{children:"<input>"})," and allowing users to style the ",e.jsx(n.code,{children:"Icon"})," allows for a consistent look and feel across all browsers."]}),`
`]}),`
`,e.jsx(n.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsxs(n.p,{children:[`:::note
For simplicity, the data attributes are shortened in the rendered HTML examples below. The full data attributes will be present in the actual implementation, and are available to browse `,e.jsx(n.a,{href:"#expected-data-attributes",children:"here"}),`.
:::`]}),`
`,e.jsx(n.h3,{id:"default-uncontrolled-unlabelled-checkbox",children:"Default Uncontrolled, Unlabelled Checkbox"}),`
`,e.jsxs(n.p,{children:["The following is a simple example of an uncontrolled, unlabelled ",e.jsx(n.code,{children:"Checkbox"}),", which is the default state management of the base component. The ",e.jsx(n.code,{children:"Checkbox"})," primitive uses React ARIA's ",e.jsx(n.code,{children:"useCheckbox"})," and ",e.jsx(n.code,{children:"useCheckboxGroup"})," hooks to manage the checkbox state internally, allowing it to be used without any additional state management."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`function DefaultUncontrolledCheckbox() {
  return (
    <Checkbox />
  );
}
`})}),`
`,e.jsx(n.p,{children:"This JSX would render in the DOM as follows:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<label class="checkbox-wrapper" data-pressable-attributes>
  <div style="visually-hidden-pseudocode-styles: true;">
    <input type="checkbox" id="use-id-autogenerated-id" aria-label="Checkbox" />
  </div>
  <svg role="presentation" data-icon="unchecked">
    <path d="..."></path>
  </svg>
</label>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"data-icon"})," attribute will be set to ",e.jsx(n.code,{children:"unchecked"})," by default, indicating that the checkbox is not checked based on the state."]}),`
`,e.jsx(n.h3,{id:"controlled-checkbox-example",children:"Controlled Checkbox Example"}),`
`,e.jsxs(n.p,{children:["The following is an example of a controlled ",e.jsx(n.code,{children:"Checkbox"}),", where the state is managed externally. The ",e.jsx(n.code,{children:"isChecked"})," and ",e.jsx(n.code,{children:"onChange"})," props are used to control the checkbox state."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { useState } from 'react';

function ControlledCheckboxExample() {
  const [checked, setChecked] = useState(false);

  const handleChange = (newChecked) => {
    setChecked(newChecked);
  };

  return (
    <Checkbox
      isChecked={checked}
      onChange={handleChange}
    />
  );
}
`})}),`
`,e.jsxs(n.p,{children:["The JSX will render identically to the uncontrolled example, but the ",e.jsx(n.code,{children:"isChecked"})," state will be managed by the ",e.jsx(n.code,{children:"useState"})," hook in React. The ",e.jsx(n.code,{children:"onChange"})," callback will update the state when the checkbox is toggled."]}),`
`,e.jsx(n.h3,{id:"labelled-checkbox-example",children:"Labelled Checkbox Example"}),`
`,e.jsxs(n.p,{children:["The following example demonstrates how to use the labelled ",e.jsx(n.code,{children:"Checkbox"})," primitive with slots to customize the label and icon. This allows for a more flexible and tailored ",e.jsx(n.code,{children:"Checkbox"})," implementation while maintaining accessibility."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { Checkbox, CheckboxGroup } from 'bento-checkbox';

function CheckboxSlotsExample() {
  return (
    <CheckboxGroup label="Slots Example">
      <Checkbox
        label="Checkbox Label"
        name="checkbox-example"
      />
    </CheckboxGroup>
  );
}
`})}),`
`,e.jsx(n.h3,{id:"checkbox-icon-slot-override-example",children:"Checkbox Icon Slot Override Example"}),`
`,e.jsxs(n.p,{children:["The following example demonstrates how to use the ",e.jsx(n.code,{children:"Checkbox"})," primitive with slots to customize the icon conditionally, so that the icon changes based on the checked state using ",e.jsx(n.code,{children:"useState"})," to manage the checked state."]}),`
`,e.jsxs(n.p,{children:[`:::note
All slots are optional and both primitives can use slots, as detailed in the `,e.jsx(n.a,{href:"#slot-map",children:"Slot Map section"}),` above.
:::`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { useState } from 'react';
import { Checkbox } from 'bento-checkbox';
import { set } from 'bento-icon';

// Set the icons for the checkbox
// Icons do not use the 'checked' or 'unchecked' names, but rather custom names for the alternate icons
// This allows for the 'checked' and 'unchecked' icons to be used in other contexts without confusion
set({
  'checked-alternate': alternateCheckedSvg,
  'unchecked-alternate': alternateUncheckedSvg,
  ...rest
});

function CheckboxSlotOverrideExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox Label"
      slots={{
        'control.icon': { icon: checked ? 'checked-alternate' : 'unchecked-alternate' } // Custom icon slot
      }}
    />
  );
}
`})}),`
`,e.jsx(n.h3,{id:"checkbox-indeterminate-group-example",children:"Checkbox Indeterminate Group Example"}),`
`,e.jsx(n.p,{children:"The following example demonstrates how to create a checkbox group with a parent checkbox that can be in an indeterminate state, along with child checkboxes that can be checked or unchecked. The parent checkbox will reflect the state of its children, allowing for collective control over their selection states."}),`
`,e.jsxs(n.p,{children:["This is a common pattern that showcases the primitives' ability to handle state in complex scenarios, group checkboxes, and manage indeterminate states effectively. The ",e.jsx(n.code,{children:"CheckboxGroup"})," primitive is used to manage the state of multiple checkboxes, while the ",e.jsx(n.code,{children:"Checkbox"})," primitive is used for individual checkboxes within the group."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { useState } from 'react';
import { Checkbox, CheckboxGroup } from 'bento-checkbox';

const CHILDREN = [
  { label: 'Child Checkbox 1', name: 'child-checkbox-1' },
  { label: 'Child Checkbox 2', name: 'child-checkbox-2' },
  { label: 'Child Checkbox 3', name: 'child-checkbox-3' },
];

function IndeterminateCheckboxGroupExample() {
  const [checkedValues, setCheckedValues] = useState([]);
  const allNames = CHILDREN.map(child => child.name);
  const totalCount = allNames.length;
  const checkedCount = checkedValues.length;
  const parentChecked = checkedCount === totalCount;
  const parentIndeterminate = checkedCount > 0 && checkedCount < totalCount;

  // Handles CheckboxGroup change
  const handleGroupChange = useCallback((newCheckedValues) => {
    setCheckedValues(newCheckedValues);
  }, []);

  // Handles parent checkbox change
  const handleParentChange = useCallback((checked) => {
    setCheckedValues(checked ? allNames : []);
  }, [allNames]);

  // Handles child checkbox change
  const handleChildChange = useCallback((childName, checked) => {
    setCheckedValues(prevValues =>
      checked ? [...prevValues, childName] : prevValues.filter(name => name !== childName)
    );
  }, []);

  return (
    <CheckboxGroup
      label='Group Example'
      name='checkbox-group-example'
      value={ checkedValues }
      onChange={ handleGroupChange }
    >
      <Checkbox
        label='Parent Checkbox'
        name='parent-checkbox'
        isChecked={ parentChecked }
        isIndeterminate={ parentIndeterminate }
        onChange={ handleParentChange }
      />
      <div role='group' style={{ marginLeft: 20 }}>
        {CHILDREN.map((child, idx) => (
          <Checkbox
            key={ child.name }
            label={ child.label }
            name={ child.name }
            isChecked={ checkedValues.includes(child.name) }
            onChange={ (checked) => handleChildChange(child.name, checked) }
          />
        )) }
      </div>
    </CheckboxGroup>
  );
}
`})})]})}function p(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{p as default};
