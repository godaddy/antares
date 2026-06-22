import{i as e}from"./preload-helper-CLVkNUVT.js";import{y as t}from"./iframe-CkigS-hY.js";import{S as n,s as r,u as i}from"./blocks-CsGU0cD8.js";import{t as a}from"./mdx-react-shim-CC_KIf4k.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Radio`}),`
`,(0,c.jsx)(t.h1,{id:`radio-and-radio-group-primitives`,children:`Radio and Radio Group Primitives`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsxs)(t.p,{children:[`We are introducing the `,(0,c.jsx)(t.code,{children:`Radio`}),` and `,(0,c.jsx)(t.code,{children:`RadioGroup`}),` primitives to provide a consistent and accessible way to build radio components.`]}),`
`,(0,c.jsxs)(t.p,{children:[`These primitives provide core behavior and accessibility for radio and radio group components, managing single-selection state across mutually exclusive options. Built on React Aria's `,(0,c.jsx)(t.code,{children:`useRadio`}),` and `,(0,c.jsx)(t.code,{children:`useRadioGroup`}),` hooks, it handles selection management, keyboard navigation, ARIA attributes, and focus handling.`]}),`
`,(0,c.jsx)(t.p,{children:`Radio components are essential for form interactions requiring single-choice selection from predefined options. These primitives ensures consistent, accessible radio behavior across the design system, automatically supporting screen readers, keyboard navigation, and proper ARIA semantics. Components that consume these primitives include form controls, settings panels, and preference selectors.`}),`
`,(0,c.jsx)(t.h2,{id:`radio-and-checkbox`,children:`Radio and Checkbox`}),`
`,(0,c.jsx)(t.p,{children:`Although checkboxes and radios often share a similar DOM structure and visual style, their purposes and state management requirements are fundamentally different. Checkboxes represent independent binary choices: each can be selected or deselected on its own, and multiple checkboxes in a group can be selected simultaneously. Additionally, checkboxes can have an indeterminate state, representing a partially selected or mixed state — something radios do not support. Radios, on the other hand, are designed for mutually exclusive selection: only one option in a group can be selected at a time.`}),`
`,(0,c.jsxs)(t.p,{children:[`Despite these behavioral differences, they share the same structural foundation. To better capture this shared structure while preserving their unique state logic, we plan to introduce two new primitives: `,(0,c.jsx)(t.code,{children:`Control`}),` and `,(0,c.jsx)(t.code,{children:`ControlGroup`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`Control`}),` will serve as the foundational primitive for both checkboxes and radios, while `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` will provide a shared group structure for their respective groups. By abstracting the common structure into these primitives, we can create a consistent, reusable base not only for checkboxes and radios, but also for other components such as `,(0,c.jsx)(t.code,{children:`Switch`}),`. This approach promotes consistency, makes the codebase easier to maintain, and reduces duplication across form components.`]}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsx)(t.p,{children:`The following primitives will be introduced:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`Control`}),` is a foundational primitive that supplies the shared structural base for checkboxes, radios, and potentially other form components. It encapsulates common elements—such as the native input and label—used by these controls. Importantly, `,(0,c.jsx)(t.code,{children:`Control`}),` is unopinionated about state management: it is solely responsible for providing the shared structure, leaving state logic to be handled externally.`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`ControlGroup`}),` is a primitive that provides a unified group structure for both checkboxes and radios. It consolidates shared elements such as the control, label, description, and error message into a single component. Like `,(0,c.jsx)(t.code,{children:`Control`}),`, `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` is designed to be flexible, allowing for custom state logic and composition to be managed with state externally as needed.`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`Radio`}),` represents an individual radio option that participates in a mutually exclusive group, ensuring that only one option can be selected at a time. It supports both controlled and uncontrolled usage, allowing developers to manage selection state externally or let the component handle it internally via its group. The primitive is built to be accessible out of the box, with proper ARIA roles, keyboard navigation, and support for visually hidden native inputs to enable custom styling without sacrificing accessibility. `,(0,c.jsx)(t.code,{children:`Radio`}),` will be built on top of the `,(0,c.jsx)(t.code,{children:`Control`}),` primitive, inheriting its shared structure and extensibility.`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`RadioGroup`}),` acts as the container and state manager for a set of `,(0,c.jsx)(t.code,{children:`Radio`}),` options. It enforces single selection, provides group-level labeling and description for assistive technology, and manages keyboard navigation between options. The group also handles disabled and error states, propagating them to its children and ensuring correct ARIA attributes are applied. `,(0,c.jsx)(t.code,{children:`RadioGroup`}),` will be built on top of the `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` primitive, leveraging its shared group structure and composition patterns.`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`FieldError`}),` is a primitive for displaying error messages in control groups, following the same behavior as React Aria's `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/forms.html#built-in-validation`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`FieldError`})}),` component.`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-compositions`,children:`Primitive Compositions`}),`
`,(0,c.jsxs)(t.h3,{id:`control-primitive`,children:[(0,c.jsx)(t.code,{children:`Control`}),` primitive`]}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Control`}),` primitive defines the shared structure used by both `,(0,c.jsx)(t.code,{children:`Radio`}),` and other controls like `,(0,c.jsx)(t.code,{children:`Checkbox`}),`. It consists of a `,(0,c.jsx)(t.code,{children:`VisuallyHidden`}),` element that wraps the native input, followed by the component's children, and an optional `,(0,c.jsx)(t.code,{children:`Text`}),` element for the label.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Text as="label" {...labelProps}>
  <VisuallyHidden elementType="span">
    <input {...inputProps} ref={ref} />
  </VisuallyHidden>
  {children}
  {label && <Text slot="label">{label}</Text>}
</Text>
`})}),`
`,(0,c.jsxs)(t.h3,{id:`controlgroup-primitive`,children:[(0,c.jsx)(t.code,{children:`ControlGroup`}),` primitive`]}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` primitive defines the shared structure used by both `,(0,c.jsx)(t.code,{children:`RadioGroup`}),` and other groups like `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),`. It consists of a `,(0,c.jsx)(t.code,{children:`div`}),` element that wraps the group's children, label, description, and error message.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<div {...groupProps}>
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
`,(0,c.jsxs)(t.h3,{id:`radio-primitive`,children:[(0,c.jsx)(t.code,{children:`Radio`}),` primitive`]}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Radio`}),` primitive defines the structure for a single radio option within a mutually exclusive group. It consists of a `,(0,c.jsx)(t.code,{children:`Control`}),` component that wraps the icon used to visually indicate the selected state of the radio.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`const state = React.useContext(RadioGroupStateContext);
const { labelProps, inputProps, ref } = useRadio(props);

<Control slot="control" props={{ labelProps, inputProps, label, ref }}>
  <Icon slot="icon" data-selected={state.isSelected} />
</Control>;
`})}),`
`,(0,c.jsxs)(t.h3,{id:`radiogroup-primitive`,children:[(0,c.jsx)(t.code,{children:`RadioGroup`}),` primitive`]}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`RadioGroup`}),` primitive defines a set of radio controls (children). It consists of a `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` component that wraps the group's children, label, description and error message.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`const state = useRadioGroupState(props);
const { radioGroupProps: groupProps, isInvalid, descriptionProps, errorMessageProps, validationErrors } = useRadioGroup(props, state);

<ControlGroup slot="group" props={{ groupProps, isInvalid, descriptionProps, errorMessageProps, validationErrors, label, description }}>
  <RadioGroupStateContext.Provider value={state}>{children}</RadioGroupStateContext.Provider>
</ControlGroup>;
`})}),`
`,(0,c.jsxs)(t.h3,{id:`control-and-controlgroup-primitives-with-state-management`,children:[(0,c.jsx)(t.code,{children:`Control`}),` and `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` primitives with state management`]}),`
`,(0,c.jsxs)(`details`,{children:[(0,c.jsx)(`summary`,{children:(0,c.jsx)(t.p,{children:`State management abstraction`})}),(0,c.jsxs)(t.p,{children:[`Alternative strategies for abstracting state management in the `,(0,c.jsx)(t.code,{children:`Control`}),` and `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` primitives were explored. However, these approaches often increased complexity, primarily because the required hooks—such as `,(0,c.jsx)(t.code,{children:`useControl`}),` and `,(0,c.jsx)(t.code,{children:`useGroup`}),` (eg. `,(0,c.jsx)(t.code,{children:`useRadio`}),`, `,(0,c.jsx)(t.code,{children:`useCheckbox`}),`, `,(0,c.jsx)(t.code,{children:`useSwitch`}),`, etc.)—and `,(0,c.jsx)(t.code,{children:`useGroupState`}),` (eg. `,(0,c.jsx)(t.code,{children:`useRadioGroupState`}),`, `,(0,c.jsx)(t.code,{children:`useCheckboxGroupState`}),`, etc.) differ between primitives and do not always return a consistent set of props.`]}),(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`//
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
`,(0,c.jsx)(t.h2,{id:`accessibility-highlights`,children:`Accessibility Highlights`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Roles`}),`: `,(0,c.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-1.2/#radiogroup`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`radiogroup`})}),`, `,(0,c.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-1.2/#radio`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`radio`})})]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Attributes`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Note: ARIA attributes like `,(0,c.jsx)(t.code,{children:`aria-readonly`}),` or `,(0,c.jsx)(t.code,{children:`aria-disabled`}),` are `,(0,c.jsx)(t.strong,{children:`required`}),` for accessibility in the `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` primitive. Data attributes (`,(0,c.jsx)(t.code,{children:`data-readonly`}),`, `,(0,c.jsx)(t.code,{children:`data-disabled`}),`) are additional hooks for styling and should not replace ARIA attributes.`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Keyboard Support`}),`: (`,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/radio/#keyboard-interaction-6`,rel:`nofollow`,children:`Full keyboard interaction details`}),`)`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Arrow keys for navigation`}),`
`,(0,c.jsx)(t.li,{children:`Home/End to jump to first/last radio option`}),`
`,(0,c.jsx)(t.li,{children:`Space/Enter to select current radio option`}),`
`,(0,c.jsx)(t.li,{children:`Tab to move focus out of the group`}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes-slot-map-and-props`,children:`Data Attributes, Slot Map and Props`}),`
`,(0,c.jsxs)(t.h3,{id:`radio-data-attributes`,children:[(0,c.jsx)(t.code,{children:`Radio`}),` Data Attributes`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-pressed`})}),(0,c.jsx)(t.td,{children:`Indicates the radio is being pressed`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-hovered`})}),(0,c.jsx)(t.td,{children:`Indicates the radio is hovered`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focused`})}),(0,c.jsx)(t.td,{children:`Indicates the radio has focus`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focus-visible`})}),(0,c.jsx)(t.td,{children:`Indicates focus should be visible`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-selected`})}),(0,c.jsx)(t.td,{children:`Indicates the radio is selected`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-disabled`})}),(0,c.jsx)(t.td,{children:`Indicates the radio is disabled`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-readonly`})}),(0,c.jsx)(t.td,{children:`Indicates the radio is readonly`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-invalid`})}),(0,c.jsx)(t.td,{children:`Indicates the radio is invalid`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-required`})}),(0,c.jsx)(t.td,{children:`Indicates the radio is required`})]})]})]}),`
`,(0,c.jsxs)(t.h3,{id:`radiogroup-data-attributes`,children:[(0,c.jsx)(t.code,{children:`RadioGroup`}),` Data Attributes`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-disabled`})}),(0,c.jsx)(t.td,{children:`Indicates the group is disabled`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-readonly`})}),(0,c.jsx)(t.td,{children:`Indicates the group is readonly`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-required`})}),(0,c.jsx)(t.td,{children:`Indicates the group is required`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-invalid`})}),(0,c.jsx)(t.td,{children:`Indicates the group is invalid`})]})]})]}),`
`,(0,c.jsxs)(t.h3,{id:`radio-slot-map`,children:[(0,c.jsx)(t.code,{children:`Radio`}),` Slot Map`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Fallback`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`control.icon`})}),(0,c.jsx)(t.td,{children:`Icon for radio`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<Icon>`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`control.label`})}),(0,c.jsx)(t.td,{children:`Text for radio`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<Text>`})})]})]})]}),`
`,(0,c.jsxs)(t.h3,{id:`radiogroup-slot-map`,children:[(0,c.jsx)(t.code,{children:`RadioGroup`}),` Slot Map`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Fallback`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`group.label`})}),(0,c.jsx)(t.td,{children:`Label for radiogroup`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<Text>`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`group.description`})}),(0,c.jsx)(t.td,{children:`Description for radiogroup`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<Text>`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`group.error`})}),(0,c.jsx)(t.td,{children:`Error message for radiogroup`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<Text>`})})]})]})]}),`
`,(0,c.jsxs)(t.h3,{id:`radio-props`,children:[(0,c.jsx)(t.code,{children:`Radio`}),` Props`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Prop`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`children`})}),(0,c.jsx)(t.td,{children:`The label or content to display for the radio option.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`value`})}),(0,c.jsx)(t.td,{children:`The value for this radio option.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isDisabled`})}),(0,c.jsx)(t.td,{children:`Whether the radio is disabled.`})]})]})]}),`
`,(0,c.jsxs)(t.h3,{id:`radiogroup-props`,children:[(0,c.jsx)(t.code,{children:`RadioGroup`}),` Props`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Prop`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`children`})}),(0,c.jsxs)(t.td,{children:[`The `,(0,c.jsx)(t.code,{children:`<Radio>`}),` primitives to render within the group.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`label`})}),(0,c.jsx)(t.td,{children:`Accessible label for the radio group.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`description`})}),(0,c.jsx)(t.td,{children:`Additional description text for the radio group.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`value`})}),(0,c.jsx)(t.td,{children:`The currently selected value (controlled mode).`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`defaultValue`})}),(0,c.jsx)(t.td,{children:`The initial selected value.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`name`})}),(0,c.jsx)(t.td,{children:`Name for the underlying input elements, used for form submission.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isDisabled`})}),(0,c.jsx)(t.td,{children:`Whether all radios in the group are disabled.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isReadOnly`})}),(0,c.jsx)(t.td,{children:`Whether the group is read-only (cannot be changed by the user).`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isRequired`})}),(0,c.jsx)(t.td,{children:`Whether selection of a value is required.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`onChange`})}),(0,c.jsx)(t.td,{children:`Callback fired when the selected value changes.`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<RadioGroup label="Favorite fruit">
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange">Orange</Radio>
</RadioGroup>
`})}),`
`,(0,c.jsx)(t.h3,{id:`default-value`,children:`Default Value`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<RadioGroup defaultValue="apple">
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange">Orange</Radio>
</RadioGroup>
`})}),`
`,(0,c.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`const [value, setValue] = useState(null);

// add the value prop to make it controlled
<RadioGroup value={value} onChange={setValue}>
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange">Orange</Radio>
</RadioGroup>;
`})}),`
`,(0,c.jsx)(t.h3,{id:`uncontrolled`,children:`Uncontrolled`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<RadioGroup>
  <Radio value="apple">Apple</Radio>
  <Radio value="banana">Banana</Radio>
  <Radio value="orange" isDisabled>
    Orange
  </Radio>
</RadioGroup>
`})}),`
`,(0,c.jsx)(t.h3,{id:`single-radio`,children:`Single Radio`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Radios are always required to be in a group
<RadioGroup>
  <Radio value="apple">Apple</Radio>
</RadioGroup>
`})}),`
`,(0,c.jsx)(t.h3,{id:`customization-with-slots`,children:`Customization with slots`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<RadioGroup
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
`,(0,c.jsx)(t.h2,{id:`appendix`,children:`Appendix`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useRadioGroup.html`,rel:`nofollow`,children:`React Aria Radio Group`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://www.radix-ui.com/primitives/docs/components/radio-group`,rel:`nofollow`,children:`Radix UI Radio Group`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://mui.com/material-ui/react-radio-button/#radio-group`,rel:`nofollow`,children:`Material-UI Radio Group`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://ant.design/components/radio/#components-radio-demo-radiogroup`,rel:`nofollow`,children:`Ant Design Radio Group`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://chakra-ui.com/docs/components/radio/usage`,rel:`nofollow`,children:`Chakra UI Radio Group`})}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};