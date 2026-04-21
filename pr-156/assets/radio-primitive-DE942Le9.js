import{j as e}from"./iframe-CeWMyedw.js";import{useMDXComponents as s}from"./index-B5Uf_d-i.js";import{M as o}from"./blocks-sR0vlAsr.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DE7Rzj2e.js";import"./index-YasxdYFD.js";import"./index-YTKJTFBG.js";import"./index-DrFu-skq.js";function i(n){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Architecture/PDRs/Radio"}),`
`,e.jsx(r.h1,{id:"radio-and-radio-group-primitives",children:"Radio and Radio Group Primitives"}),`
`,e.jsx(r.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(r.p,{children:["We are introducing the ",e.jsx(r.code,{children:"Radio"})," and ",e.jsx(r.code,{children:"RadioGroup"})," primitives to provide a consistent and accessible way to build radio components."]}),`
`,e.jsxs(r.p,{children:["These primitives provide core behavior and accessibility for radio and radio group components, managing single-selection state across mutually exclusive options. Built on React Aria's ",e.jsx(r.code,{children:"useRadio"})," and ",e.jsx(r.code,{children:"useRadioGroup"})," hooks, it handles selection management, keyboard navigation, ARIA attributes, and focus handling."]}),`
`,e.jsx(r.p,{children:"Radio components are essential for form interactions requiring single-choice selection from predefined options. These primitives ensures consistent, accessible radio behavior across the design system, automatically supporting screen readers, keyboard navigation, and proper ARIA semantics. Components that consume these primitives include form controls, settings panels, and preference selectors."}),`
`,e.jsx(r.h2,{id:"radio-and-checkbox",children:"Radio and Checkbox"}),`
`,e.jsx(r.p,{children:"Although checkboxes and radios often share a similar DOM structure and visual style, their purposes and state management requirements are fundamentally different. Checkboxes represent independent binary choices: each can be selected or deselected on its own, and multiple checkboxes in a group can be selected simultaneously. Additionally, checkboxes can have an indeterminate state, representing a partially selected or mixed state — something radios do not support. Radios, on the other hand, are designed for mutually exclusive selection: only one option in a group can be selected at a time."}),`
`,e.jsxs(r.p,{children:["Despite these behavioral differences, they share the same structural foundation. To better capture this shared structure while preserving their unique state logic, we plan to introduce two new primitives: ",e.jsx(r.code,{children:"Control"})," and ",e.jsx(r.code,{children:"ControlGroup"}),"."]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"Control"})," will serve as the foundational primitive for both checkboxes and radios, while ",e.jsx(r.code,{children:"ControlGroup"})," will provide a shared group structure for their respective groups. By abstracting the common structure into these primitives, we can create a consistent, reusable base not only for checkboxes and radios, but also for other components such as ",e.jsx(r.code,{children:"Switch"}),". This approach promotes consistency, makes the codebase easier to maintain, and reduces duplication across form components."]}),`
`,e.jsx(r.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsx(r.p,{children:"The following primitives will be introduced:"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"Control"})," is a foundational primitive that supplies the shared structural base for checkboxes, radios, and potentially other form components. It encapsulates common elements—such as the native input and label—used by these controls. Importantly, ",e.jsx(r.code,{children:"Control"})," is unopinionated about state management: it is solely responsible for providing the shared structure, leaving state logic to be handled externally."]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"ControlGroup"})," is a primitive that provides a unified group structure for both checkboxes and radios. It consolidates shared elements such as the control, label, description, and error message into a single component. Like ",e.jsx(r.code,{children:"Control"}),", ",e.jsx(r.code,{children:"ControlGroup"})," is designed to be flexible, allowing for custom state logic and composition to be managed with state externally as needed."]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"Radio"})," represents an individual radio option that participates in a mutually exclusive group, ensuring that only one option can be selected at a time. It supports both controlled and uncontrolled usage, allowing developers to manage selection state externally or let the component handle it internally via its group. The primitive is built to be accessible out of the box, with proper ARIA roles, keyboard navigation, and support for visually hidden native inputs to enable custom styling without sacrificing accessibility. ",e.jsx(r.code,{children:"Radio"})," will be built on top of the ",e.jsx(r.code,{children:"Control"})," primitive, inheriting its shared structure and extensibility."]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"RadioGroup"})," acts as the container and state manager for a set of ",e.jsx(r.code,{children:"Radio"})," options. It enforces single selection, provides group-level labeling and description for assistive technology, and manages keyboard navigation between options. The group also handles disabled and error states, propagating them to its children and ensuring correct ARIA attributes are applied. ",e.jsx(r.code,{children:"RadioGroup"})," will be built on top of the ",e.jsx(r.code,{children:"ControlGroup"})," primitive, leveraging its shared group structure and composition patterns."]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"FieldError"})," is a primitive for displaying error messages in control groups, following the same behavior as React Aria's ",e.jsx(r.a,{href:"https://react-spectrum.adobe.com/react-aria/forms.html#built-in-validation",rel:"nofollow",children:e.jsx(r.code,{children:"FieldError"})})," component."]}),`
`]}),`
`]}),`
`,e.jsx(r.h2,{id:"primitive-compositions",children:"Primitive Compositions"}),`
`,e.jsxs(r.h3,{id:"control-primitive",children:[e.jsx(r.code,{children:"Control"})," primitive"]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"Control"})," primitive defines the shared structure used by both ",e.jsx(r.code,{children:"Radio"})," and other controls like ",e.jsx(r.code,{children:"Checkbox"}),". It consists of a ",e.jsx(r.code,{children:"VisuallyHidden"})," element that wraps the native input, followed by the component's children, and an optional ",e.jsx(r.code,{children:"Text"})," element for the label."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<Text as="label" {...labelProps}>
  <VisuallyHidden elementType="span">
    <input {...inputProps} ref={ref} />
  </VisuallyHidden>
  {children}
  {label && <Text slot="label">{label}</Text>}
</Text>
`})}),`
`,e.jsxs(r.h3,{id:"controlgroup-primitive",children:[e.jsx(r.code,{children:"ControlGroup"})," primitive"]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"ControlGroup"})," primitive defines the shared structure used by both ",e.jsx(r.code,{children:"RadioGroup"})," and other groups like ",e.jsx(r.code,{children:"CheckboxGroup"}),". It consists of a ",e.jsx(r.code,{children:"div"})," element that wraps the group's children, label, description, and error message."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<div {...groupProps}>
  <Text slot="label">{label}</Text>
  {children}

  {description && (
    <Text slot="description" {...descriptionProps}>
      {description}
    </Text>
  )}

  {isInvalid && (
    <FieldError slot="error" {...errorMessageProps}>
      {validationErrors}
    </FieldError>
  )}
</div>
`})}),`
`,e.jsxs(r.h3,{id:"radio-primitive",children:[e.jsx(r.code,{children:"Radio"})," primitive"]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"Radio"})," primitive defines the structure for a single radio option within a mutually exclusive group. It consists of a ",e.jsx(r.code,{children:"Control"})," component that wraps the icon used to visually indicate the selected state of the radio."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`const state = React.useContext(RadioGroupStateContext);
const { labelProps, inputProps, ref } = useRadio(props);

<Control slot="control" props={{ labelProps, inputProps, label, ref }}>
  <Icon slot="icon" data-selected={state.isSelected} />
</Control>;
`})}),`
`,e.jsxs(r.h3,{id:"radiogroup-primitive",children:[e.jsx(r.code,{children:"RadioGroup"})," primitive"]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"RadioGroup"})," primitive defines a set of radio controls (children). It consists of a ",e.jsx(r.code,{children:"ControlGroup"})," component that wraps the group's children, label, description and error message."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`const state = useRadioGroupState(props);
const { radioGroupProps: groupProps, isInvalid, descriptionProps, errorMessageProps, validationErrors } = useRadioGroup(props, state);

<ControlGroup slot="group" props={{ groupProps, isInvalid, descriptionProps, errorMessageProps, validationErrors, label, description }}>
  <RadioGroupStateContext.Provider value={state}>{children}</RadioGroupStateContext.Provider>
</ControlGroup>;
`})}),`
`,e.jsxs(r.h3,{id:"control-and-controlgroup-primitives-with-state-management",children:[e.jsx(r.code,{children:"Control"})," and ",e.jsx(r.code,{children:"ControlGroup"})," primitives with state management"]}),`
`,e.jsxs("details",{children:[e.jsx("summary",{children:e.jsx(r.p,{children:"State management abstraction"})}),e.jsxs(r.p,{children:["Alternative strategies for abstracting state management in the ",e.jsx(r.code,{children:"Control"})," and ",e.jsx(r.code,{children:"ControlGroup"})," primitives were explored. However, these approaches often increased complexity, primarily because the required hooks—such as ",e.jsx(r.code,{children:"useControl"})," and ",e.jsx(r.code,{children:"useGroup"})," (eg. ",e.jsx(r.code,{children:"useRadio"}),", ",e.jsx(r.code,{children:"useCheckbox"}),", ",e.jsx(r.code,{children:"useSwitch"}),", etc.)—and ",e.jsx(r.code,{children:"useGroupState"})," (eg. ",e.jsx(r.code,{children:"useRadioGroupState"}),", ",e.jsx(r.code,{children:"useCheckboxGroupState"}),", etc.) differ between primitives and do not always return a consistent set of props."]}),e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`//
// Control implementation
//

const state = React.useContext(groupStateContext);
const { labelProps, inputProps, ref } = useControl(props);

<Text as="label" {...labelProps}>
  <VisuallyHidden elementType="span">
    <input {...inputProps} ref={ref} />
  </VisuallyHidden>
  {children({ state, props })}
  {label && <Text slot="label">{label}</Text>}
</Text>;

//
// Radio implementation
//

<Control slot="control" props={{ useControl: useRadio, label, groupStateContext: RadioGroupStateContext }}>
  {({ state, props }) => <Icon slot="icon" data-selected={state.isSelected} />}
</Control>;

//
// ControlGroup implementation
//

const state = useGroupState(props);
// groupProps can be radioGroupProps/checkboxGroupProps, also assuming return value are the same for all useGroup hooks
const { groupProps, isInvalid, descriptionProps, errorMessageProps, validationErrors } = useGroup(props, state);

<div {...groupProps}>
  <Text slot="label">{label}</Text>
  <Provider value={state}>{children({ state, props })}</Provider>

  {description && (
    <Text slot="description" {...descriptionProps}>
      {description}
    </Text>
  )}

  {isInvalid && (
    <FieldError slot="error" {...errorMessageProps}>
      {validationErrors}
    </FieldError>
  )}
</div>;

//
// RadioGroup implementation
//

<ControlGroup
  slot="group"
  props={{ useGroup: useRadioGroup, useGroupState: useRadioGroupState, Provider: RadioGroupStateContext.Provider, props }}
>
  {children}
  {/* or */}
  {/* {({ state, props }) => children} */}
</ControlGroup>;
`})})]}),`
`,e.jsx(r.h2,{id:"accessibility-highlights",children:"Accessibility Highlights"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Roles"}),": ",e.jsx(r.a,{href:"https://www.w3.org/TR/wai-aria-1.2/#radiogroup",rel:"nofollow",children:e.jsx(r.code,{children:"radiogroup"})}),", ",e.jsx(r.a,{href:"https://www.w3.org/TR/wai-aria-1.2/#radio",rel:"nofollow",children:e.jsx(r.code,{children:"radio"})})]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Attributes"}),":"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["Note: ARIA attributes like ",e.jsx(r.code,{children:"aria-readonly"})," or ",e.jsx(r.code,{children:"aria-disabled"})," are ",e.jsx(r.strong,{children:"required"})," for accessibility in the ",e.jsx(r.code,{children:"ControlGroup"})," primitive. Data attributes (",e.jsx(r.code,{children:"data-readonly"}),", ",e.jsx(r.code,{children:"data-disabled"}),") are additional hooks for styling and should not replace ARIA attributes."]}),`
`]}),`
`]}),`
`,e.jsxs(r.li,{children:[`
`,e.jsxs(r.p,{children:[e.jsx(r.strong,{children:"Keyboard Support"}),": (",e.jsx(r.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/radio/#keyboard-interaction-6",rel:"nofollow",children:"Full keyboard interaction details"}),")"]}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Arrow keys for navigation"}),`
`,e.jsx(r.li,{children:"Home/End to jump to first/last radio option"}),`
`,e.jsx(r.li,{children:"Space/Enter to select current radio option"}),`
`,e.jsx(r.li,{children:"Tab to move focus out of the group"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(r.h2,{id:"data-attributes-slot-map-and-props",children:"Data Attributes, Slot Map and Props"}),`
`,e.jsxs(r.h3,{id:"radio-data-attributes",children:[e.jsx(r.code,{children:"Radio"})," Data Attributes"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Attribute"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-pressed"})}),e.jsx(r.td,{children:"Indicates the radio is being pressed"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-hovered"})}),e.jsx(r.td,{children:"Indicates the radio is hovered"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-focused"})}),e.jsx(r.td,{children:"Indicates the radio has focus"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-focus-visible"})}),e.jsx(r.td,{children:"Indicates focus should be visible"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-selected"})}),e.jsx(r.td,{children:"Indicates the radio is selected"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-disabled"})}),e.jsx(r.td,{children:"Indicates the radio is disabled"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-readonly"})}),e.jsx(r.td,{children:"Indicates the radio is readonly"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-invalid"})}),e.jsx(r.td,{children:"Indicates the radio is invalid"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-required"})}),e.jsx(r.td,{children:"Indicates the radio is required"})]})]})]}),`
`,e.jsxs(r.h3,{id:"radiogroup-data-attributes",children:[e.jsx(r.code,{children:"RadioGroup"})," Data Attributes"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Attribute"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-disabled"})}),e.jsx(r.td,{children:"Indicates the group is disabled"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-readonly"})}),e.jsx(r.td,{children:"Indicates the group is readonly"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-required"})}),e.jsx(r.td,{children:"Indicates the group is required"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-invalid"})}),e.jsx(r.td,{children:"Indicates the group is invalid"})]})]})]}),`
`,e.jsxs(r.h3,{id:"radio-slot-map",children:[e.jsx(r.code,{children:"Radio"})," Slot Map"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Slot Name"}),e.jsx(r.th,{children:"Description"}),e.jsx(r.th,{children:"Required"}),e.jsx(r.th,{children:"Default Fallback"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"control.icon"})}),e.jsx(r.td,{children:"Icon for radio"}),e.jsx(r.td,{children:"No"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"<Icon>"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"control.label"})}),e.jsx(r.td,{children:"Text for radio"}),e.jsx(r.td,{children:"No"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"<Text>"})})]})]})]}),`
`,e.jsxs(r.h3,{id:"radiogroup-slot-map",children:[e.jsx(r.code,{children:"RadioGroup"})," Slot Map"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Slot Name"}),e.jsx(r.th,{children:"Description"}),e.jsx(r.th,{children:"Required"}),e.jsx(r.th,{children:"Default Fallback"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"group.label"})}),e.jsx(r.td,{children:"Label for radiogroup"}),e.jsx(r.td,{children:"No"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"<Text>"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"group.description"})}),e.jsx(r.td,{children:"Description for radiogroup"}),e.jsx(r.td,{children:"No"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"<Text>"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"group.error"})}),e.jsx(r.td,{children:"Error message for radiogroup"}),e.jsx(r.td,{children:"No"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"<Text>"})})]})]})]}),`
`,e.jsxs(r.h3,{id:"radio-props",children:[e.jsx(r.code,{children:"Radio"})," Props"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"children"})}),e.jsx(r.td,{children:"The label or content to display for the radio option."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"value"})}),e.jsx(r.td,{children:"The value for this radio option."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"isDisabled"})}),e.jsx(r.td,{children:"Whether the radio is disabled."})]})]})]}),`
`,e.jsxs(r.h3,{id:"radiogroup-props",children:[e.jsx(r.code,{children:"RadioGroup"})," Props"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Prop"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"children"})}),e.jsxs(r.td,{children:["The ",e.jsx(r.code,{children:"<Radio>"})," primitives to render within the group."]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"label"})}),e.jsx(r.td,{children:"Accessible label for the radio group."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"description"})}),e.jsx(r.td,{children:"Additional description text for the radio group."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"value"})}),e.jsx(r.td,{children:"The currently selected value (controlled mode)."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"defaultValue"})}),e.jsx(r.td,{children:"The initial selected value."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"name"})}),e.jsx(r.td,{children:"Name for the underlying input elements, used for form submission."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"isDisabled"})}),e.jsx(r.td,{children:"Whether all radios in the group are disabled."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"isReadOnly"})}),e.jsx(r.td,{children:"Whether the group is read-only (cannot be changed by the user)."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"isRequired"})}),e.jsx(r.td,{children:"Whether selection of a value is required."})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"onChange"})}),e.jsx(r.td,{children:"Callback fired when the selected value changes."})]})]})]}),`
`,e.jsx(r.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(r.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<RadioGroup label="Favorite fruit">
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange">Orange</Radio>
</RadioGroup>
`})}),`
`,e.jsx(r.h3,{id:"default-value",children:"Default Value"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<RadioGroup defaultValue="apple">
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange">Orange</Radio>
</RadioGroup>
`})}),`
`,e.jsx(r.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`const [value, setValue] = useState(null);

// add the value prop to make it controlled
<RadioGroup value={value} onChange={setValue}>
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange">Orange</Radio>
</RadioGroup>;
`})}),`
`,e.jsx(r.h3,{id:"uncontrolled",children:"Uncontrolled"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<RadioGroup>
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange" isDisabled>
    Orange
  </Radio>
</RadioGroup>
`})}),`
`,e.jsx(r.h3,{id:"single-radio",children:"Single Radio"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`// Radios are always required to be in a group
<RadioGroup>
  <Radio value="apple">Apple</Radio>
</RadioGroup>
`})}),`
`,e.jsx(r.h3,{id:"customization-with-slots",children:"Customization with slots"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`<RadioGroup
  slots={{
    // Override the label slot to show a span with a custom label instead of the default label
    label: function CustomLabel({ state, props }) {
      return <span>My Custom Label</span>;
    },
    // Pass props to the description slot to add a color gray to the description
    'group.description': {
      style: { color: 'gray' }
    },
    // Pass props to the error message slot to add a color red to the error message
    'group.error': {
      style: { color: 'red' }
    }
  }}
>
  <Radio
    value="apple"
    slots={{
      // Override the icon slot to show a span with a checkmark or a dash instead of the default icon
      'control.icon': function CustomIcon({ state, props }) {
        return <span>{props['aria-selected'] ? '✓' : '-'}</span>;
      },
      // Override the label slot to add a blue color to the label
      'control.label': {
        style: {
          color: 'blue'
        }
      }
    }}
  >
    Apple
  </Radio>
</RadioGroup>
`})}),`
`,e.jsx(r.h2,{id:"appendix",children:"Appendix"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://react-spectrum.adobe.com/react-aria/useRadioGroup.html",rel:"nofollow",children:"React Aria Radio Group"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://www.radix-ui.com/primitives/docs/components/radio-group",rel:"nofollow",children:"Radix UI Radio Group"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://mui.com/material-ui/react-radio-button/#radio-group",rel:"nofollow",children:"Material-UI Radio Group"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://ant.design/components/radio/#components-radio-demo-radiogroup",rel:"nofollow",children:"Ant Design Radio Group"})}),`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"https://chakra-ui.com/docs/components/radio/usage",rel:"nofollow",children:"Chakra UI Radio Group"})}),`
`]})]})}function u(n={}){const{wrapper:r}={...s(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(i,{...n})}):i(n)}export{u as default};
