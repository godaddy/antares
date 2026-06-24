import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-C49Euc6_.js";import{S as n,s as r,u as i}from"./blocks-Cz1ydYzY.js";import{t as a}from"./mdx-react-shim-BB82_dfL.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,h5:`h5`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Checkbox`}),`
`,(0,c.jsx)(t.h1,{id:`checkbox-primitive-pdr`,children:`Checkbox Primitive PDR`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsxs)(t.p,{children:[`In order to provide a consistent and accessible way to handle checkbox inputs in Bento, we are introducing the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` and `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitives. These primitives will encapsulate the behavior of checkboxes, including single selection, multiple selections, disabled, and indeterminate states, while ensuring compliance with accessibility standards.`]}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` and `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitives are unique in that they provide a standardized way to manage checkbox inputs.`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Checkbox`}),`: Represents a single checkbox input with or without a label that can be checked, unchecked, or in an indeterminate state. It supports both controlled and uncontrolled modes, allowing developers to manage its state through props or internal state. It is flexible enough to be used in various contexts, such as forms, settings, or preferences, and can be customized with slots for labels and icons.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`CheckboxGroup`}),`: Represents a group of checkboxes that can be used for multi-selection scenarios. It manages the state of multiple checkboxes, allowing for collective control over their selection states with contextual state management.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-compositions`,children:`Primitive Compositions`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` and `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitives will be composed using a combination of Bento and React ARIA hooks and components to ensure flexibility, accessibility, and ease of use. The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` group is the base primitive, which can be rendered with or without a label. If there is no label then no `,(0,c.jsx)(t.code,{children:`<label>`}),` element will be rendered. The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive builds on the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive by allowing them as children whose state is controlled through context to manage multiple checkbox inputs in a group.`]}),`
`,(0,c.jsx)(t.p,{children:`The following sections outline the composition of each primitive.`}),`
`,(0,c.jsx)(t.h3,{id:`checkbox-primitive`,children:`Checkbox Primitive`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will be built using the following hooks and components:`]}),`
`,(0,c.jsx)(t.h4,{id:`component-composition`,children:`Component composition`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Control`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`Control`}),` component (as defined in the `,(0,c.jsx)(t.a,{href:`/docs/pdrs/radio-primitive.mdx#control-primitive`,children:`Radio and RadioGroup PDR`}),`) from Bento to render the checkbox input. This component will handle the basic input functionality and accessibility features.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Icon`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`Icon`}),` primitive to render the visual representation of the checkbox state (checked, unchecked, indeterminate). These icons are entirely customizable by the user, and there will be no default icons provided.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useDataAttributes`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`useDataAttributes`}),` utility to manage the visual styles and states of the checkbox, allowing developers to apply custom styles based on the state of the checkbox.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`withSlots`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`withSlots`}),` utility to allow for flexible slot-based composition, enabling developers to customize the checkbox's appearance and behavior by providing custom components for the icon slots.`]}),`
`]}),`
`,(0,c.jsx)(t.h4,{id:`state-management`,children:`State management`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckbox`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will utilize the `,(0,c.jsx)(t.code,{children:`useCheckbox`}),` hook from React Aria to manage the checkbox's state and behavior when it is not within the React context of a `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),`. A user can pass in the `,(0,c.jsx)(t.code,{children:`checked`}),` and `,(0,c.jsx)(t.code,{children:`onChange`}),` props to control the checkbox state, or it can be used in an uncontrolled mode where the state is managed internally by the hook.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useToggleState`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`useToggleState`}),` hook to manage the checked state of the checkbox, allowing for both controlled and uncontrolled modes. This hook will be used for checkboxes that are not part of a group.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckboxGroupItem`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`useCheckboxGroupItem`}),` hook to manage the checkbox's state and behavior when it is within the context of a `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),`. This hook will provide the necessary props and state management for the checkbox to function correctly within the group.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useId`}),`: The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`useId`}),` hook to generate a unique ID for the checkbox input, ensuring that it can be correctly associated with its label for accessibility purposes.`]}),`
`]}),`
`,(0,c.jsx)(t.h4,{id:`pseudocode`,children:`Pseudocode`}),`
`,(0,c.jsxs)(t.p,{children:[`A `,(0,c.jsx)(t.code,{children:`Checkbox`}),` without a label will render without a text label or `,(0,c.jsx)(t.code,{children:`<label>`}),` element, unlike a `,(0,c.jsx)(t.code,{children:`Checkbox`}),` with a label.`]}),`
`,(0,c.jsx)(t.h5,{id:`checkbox-pseudocode`,children:`Checkbox Pseudocode`}),`
`,(0,c.jsxs)(t.p,{children:[`A basic example of what a `,(0,c.jsx)(t.code,{children:`Checkbox`}),` would look like in JSX is as follows:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`<Control slot="control" props={{ labelProps, inputProps, label, ref }}>
  <Icon slot="icon" aria-selected={ state.isSelected } data-selected={ state.isSelected }icon={ icon } />
</Control>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`:::note
React ARIA already uses their version of the `,(0,c.jsx)(t.code,{children:`Pressable`}),` primitive internally in their checkbox state hooks, which handles the press state and visual feedback. Therefore, we do not need to wrap the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive in a `,(0,c.jsx)(t.code,{children:`Pressable`}),` component.
:::`]}),`
`,(0,c.jsx)(t.h3,{id:`checkboxgroup-primitive`,children:`CheckboxGroup Primitive`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive will be built using the following hooks and components:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ControlGroup`}),`: The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` component (as defined in the `,(0,c.jsx)(t.a,{href:`/docs/pdrs/radio-primitive.mdx#controlgroup-primitive`,children:`Radio and RadioGroup PDR`}),`) from Bento to render the group of checkbox inputs. This component will handle the basic input functionality and accessibility features as well as the layout of the checkbox group.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckboxGroup`}),`: The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`useCheckboxGroup`}),` hook to manage the state of multiple checkboxes within a group.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckboxGroupState`}),`: The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`useCheckboxGroupState`}),` hook to manage the state of multiple checkboxes, allowing for collective control over their selection states.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useDataAttributes`}),`: The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`useDataAttributes`}),` utility to manage the visual styles and states of the checkbox group, allowing developers to apply custom styles based on the state of the group.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`withSlots`}),`: The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive will use the `,(0,c.jsx)(t.code,{children:`withSlots`}),` utility to allow for flexible slot-based composition, enabling developers to customize the checkbox group's appearance and behavior by providing custom components for slots like label, icon, and the visible checkbox input.`]}),`
`]}),`
`,(0,c.jsx)(t.h4,{id:`pseudocode-1`,children:`Pseudocode`}),`
`,(0,c.jsx)(t.p,{children:`A very basic outline of what this could look like in JSX is as follows:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`<ControlGroup slot="group" props={{ groupProps, isInvalid, descriptionProps, errorMessageProps, validationErrors, label, description }}>
  <CheckboxGroupStateContext.Provider value={state}>{children}</CheckboxGroupStateContext.Provider>
</ControlGroup>
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`groupProps`}),`, `,(0,c.jsx)(t.code,{children:`labelProps`}),`, `,(0,c.jsx)(t.code,{children:`descriptionProps`}),`, and `,(0,c.jsx)(t.code,{children:`errorMessageProps`}),` are all derived from the `,(0,c.jsx)(t.code,{children:`useCheckboxGroup`}),` hook, which provides the necessary ARIA attributes and event handlers for the checkbox group. `,(0,c.jsx)(t.code,{children:`isInvalid`}),` and `,(0,c.jsx)(t.code,{children:`validationErrors`}),` are also derived from the hook and can be used to manage the checkbox group's validation state. `,(0,c.jsx)(t.code,{children:`description`}),` is an optional prop that can be passed to the `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive to provide additional context.`]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` and `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitives are designed to be flexible and reusable across various components and layouts. They can be used in different contexts, such as:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Single `,(0,c.jsx)(t.code,{children:`Checkbox`}),` inputs for forms, settings, or preferences.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Single `,(0,c.jsx)(t.code,{children:`Checkbox`}),` inputs for selecting rows in a table or list.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Checkbox`}),`s that allow for custom labels and icons.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`CheckboxGroup`}),`s for multi-selection scenarios, such as selecting multiple options from a list.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` can be reused within the Bento ecosystem if we decide to add selectable rows or columns in tables, or if we want to create a list of selectable items.`]}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckbox`}),` - Provides the necessary state and behavior for a single checkbox input, including handling checked, unchecked, and indeterminate states. It also manages accessibility attributes like `,(0,c.jsx)(t.code,{children:`aria-checked`}),`, `,(0,c.jsx)(t.code,{children:`aria-disabled`}),`, and `,(0,c.jsx)(t.code,{children:`aria-required`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckboxGroup`}),` - Manages the state and behavior of a group of checkboxes, allowing for collective control over their selection states. It provides the necessary ARIA attributes and event handlers for the checkbox group.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckboxGroupState`}),` - Manages the state of a group of checkboxes, including their collective checked and indeterminate states.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useCheckboxGroupItem`}),` - Manages the state and behavior of a single checkbox within a group, allowing it to participate in the group's collective state management.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`useToggleState`}),` - Provides a simple way to manage the toggled state of a `,(0,c.jsx)(t.code,{children:`Checkbox`}),` that is not a part of a group context.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`accessibility-internationalization-rtl-and-mobile-considerations`,children:`Accessibility, Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsx)(t.p,{children:`The Checkbox primitive is designed with accessibility in mind to ensure that it meets ARIA standards for checkbox inputs. Key accessibility features include:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Semantic HTML`}),`: The input within the Checkbox primitive is rendered as a native `,(0,c.jsx)(t.code,{children:`<input type="checkbox">`}),`, which provides built-in accessibility features and ensures compatibility with assistive technologies. Although this input is visually hidden, it is still part of the DOM and accessible to screen readers.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ARIA Attributes`}),`: All ARIA attributes are supplied by the the `,(0,c.jsx)(t.code,{children:`Control`}),` and `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` primitives.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Keyboard Navigation`}),`: The `,(0,c.jsx)(t.code,{children:`<input>`}),` element is the focusable element and ensures that the checkbox responds to keyboard interactions, including spacebar activation.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus Management`}),`: The React ARIA hook `,(0,c.jsx)(t.code,{children:`useCheckbox`}),` correctly applies the `,(0,c.jsx)(t.code,{children:`tabIndex='0'`}),` to Checkbox instances, allowing them to be focusable. We will also add data-attributes for pressability and focusability, such as `,(0,c.jsx)(t.code,{children:`data-focus-visible`}),` attribute.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Screen Reader Support`}),`: The `,(0,c.jsx)(t.code,{children:`aria-label`}),` and `,(0,c.jsx)(t.code,{children:`aria-labelledby`}),` attributes are used to provide accessible labels for the checkbox, ensuring that screen readers can announce the checkbox state correctly. The `,(0,c.jsx)(t.code,{children:`aria-required`}),` attribute is also applied when necessary, and the visually hidden input is still part of the DOM and accessible to screen readers.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`RTL Support`}),`: The Checkbox primitive supports right-to-left (RTL) layouts innately. When the directionality of the component should not be set to browser default, developers can use the `,(0,c.jsx)(t.code,{children:`dir`}),` prop to explicitly set the directionality of the checkbox on any parent element. This ensures that the checkbox label is correctly positioned on the right or left depending on the correct directionality.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Mobile Considerations`}),`: The Checkbox primitive is designed to be touch-friendly, with appropriate padding and hit area sizes to ensure usability on mobile devices. The internals of `,(0,c.jsx)(t.code,{children:`useCheckbox`}),` handles touch interactions and provides a framework for visual feedback on press with the data attributes it provides.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes-prop-map-and-slot-map`,children:`Data Attributes, Prop Map, and Slot Map`}),`
`,(0,c.jsx)(t.h3,{id:`expected-data-attributes`,children:`Expected Data Attributes`}),`
`,(0,c.jsxs)(t.p,{children:[`The following `,(0,c.jsx)(t.code,{children:`data-*`}),` attributes are provided by the `,(0,c.jsx)(t.code,{children:`Icon`}),` primitive itself to help developers manage the visibility and styling of the icons used in the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive:`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsx)(t.tbody,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-icon`})}),(0,c.jsx)(t.td,{children:`The icon name or type`}),(0,c.jsx)(t.td,{children:`"checked" / "unchecked" / "indeterminate"`})]})})]}),`
`,(0,c.jsxs)(t.p,{children:[`The following `,(0,c.jsx)(t.code,{children:`data-*`}),` attributes are provided by the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive itself to help developers manage the visual styles and states of their checkbox implementation:`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-disabled`})}),(0,c.jsx)(t.td,{children:`Indicates disabled state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-invalid`})}),(0,c.jsx)(t.td,{children:`Indicates invalid state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-required`})}),(0,c.jsx)(t.td,{children:`Indicates required state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-indeterminate`})}),(0,c.jsx)(t.td,{children:`Indicates indeterminate state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-checked`})}),(0,c.jsx)(t.td,{children:`Indicates checked state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-override`})}),(0,c.jsx)(t.td,{children:`Mark for locally overridden logic/UI`}),(0,c.jsx)(t.td,{children:`"true"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-version`})}),(0,c.jsx)(t.td,{children:`Component version in dev only`}),(0,c.jsx)(t.td,{children:`"checkbox@1.0"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-pressed`})}),(0,c.jsx)(t.td,{children:`Indicates pressed state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-hovered`})}),(0,c.jsx)(t.td,{children:`Indicates hovered state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focused`})}),(0,c.jsx)(t.td,{children:`Indicates focused state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focus-visible`})}),(0,c.jsx)(t.td,{children:`Whether focus ring should be shown`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`The following `,(0,c.jsx)(t.code,{children:`data-*`}),` attributes are provided by the `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive itself to help developers manage the visual styles and states of their checkbox group implementation:`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-override`})}),(0,c.jsx)(t.td,{children:`Mark for locally overridden logic/UI`}),(0,c.jsx)(t.td,{children:`"true"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-invalid`})}),(0,c.jsx)(t.td,{children:`Indicates invalid state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-version`})}),(0,c.jsx)(t.td,{children:`Component version in dev only`}),(0,c.jsx)(t.td,{children:`"checkbox-group@1.0"`})]})]})]}),`
`,(0,c.jsx)(t.h3,{id:`prop-map`,children:`Prop Map`}),`
`,(0,c.jsxs)(t.p,{children:[`The following table describes the props available for the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive.`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Prop Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Type`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Value`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`id`})}),(0,c.jsx)(t.td,{children:`Unique identifier for the checkbox`}),(0,c.jsx)(t.td,{children:`string`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`Generated`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`className`})}),(0,c.jsx)(t.td,{children:`Custom CSS class to apply to the checkbox`}),(0,c.jsx)(t.td,{children:`string`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`undefined`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isChecked`})}),(0,c.jsx)(t.td,{children:`Whether the checkbox is checked`}),(0,c.jsx)(t.td,{children:`boolean`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`onChange`})}),(0,c.jsx)(t.td,{children:`Callback when the checkbox state changes`}),(0,c.jsx)(t.td,{children:`(checked: boolean) => void`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`undefined`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isDisabled`})}),(0,c.jsx)(t.td,{children:`Whether the checkbox is disabled`}),(0,c.jsx)(t.td,{children:`boolean`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isRequired`})}),(0,c.jsx)(t.td,{children:`Whether the checkbox is required`}),(0,c.jsx)(t.td,{children:`boolean`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`false`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`isIndeterminate`})}),(0,c.jsx)(t.td,{children:`Whether the checkbox is in an indeterminate state`}),(0,c.jsx)(t.td,{children:`boolean`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`false`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`label`})}),(0,c.jsx)(t.td,{children:`Accessible label for the checkbox`}),(0,c.jsx)(t.td,{children:`string`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`undefined`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`The following table describes the props available for the `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive.`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Prop Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Type`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Value`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`id`})}),(0,c.jsx)(t.td,{children:`Unique identifier for the checkbox group`}),(0,c.jsx)(t.td,{children:`string`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`Generated`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`className`})}),(0,c.jsx)(t.td,{children:`Custom CSS class to apply to the checkbox group`}),(0,c.jsx)(t.td,{children:`string`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`undefined`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`label`})}),(0,c.jsx)(t.td,{children:`Accessible label for the checkbox group`}),(0,c.jsx)(t.td,{children:`string`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`undefined`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`description`})}),(0,c.jsx)(t.td,{children:`Optional description for the checkbox group`}),(0,c.jsx)(t.td,{children:`string`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`undefined`})]})]})]}),`
`,(0,c.jsx)(t.h3,{id:`slot-map`,children:`Slot Map`}),`
`,(0,c.jsxs)(t.p,{children:[`The following table describes the slots available for the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive.`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Fallback`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`control.label`})}),(0,c.jsx)(t.td,{children:`Accessible label`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`control.icon`})}),(0,c.jsx)(t.td,{children:`Optional visual icon inside item`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`The following table describes the slots available for the `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive.`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Fallback`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`group.label`})}),(0,c.jsx)(t.td,{children:`Accessible label`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`group.description`})}),(0,c.jsx)(t.td,{children:`Optional description for the checkbox group`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`group.error`})}),(0,c.jsx)(t.td,{children:`Error message for validation errors`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`rationale`,children:`Rationale`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Why not split up the `,(0,c.jsx)(t.code,{children:`Checkbox`}),`?`]}),`: It is much simpler to conditionally render the label based on the presence of children rather than splitting the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive into two separate primitives due to extra state management that would be necessary otherwise. If we expected users to be able to pass in `,(0,c.jsx)(t.code,{children:`isChecked`}),` and `,(0,c.jsx)(t.code,{children:`onChange`}),` to both primitives, we would need to manage the group state, toggle state (when not in a group), controllability, and the passing of state between the two individually which would get messy. Also, having two primitives rather than three aligns better with the `,(0,c.jsx)(t.code,{children:`Radio`}),` and `,(0,c.jsx)(t.code,{children:`RadioGroup`}),` compositions.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Why use React ARIA hooks?`}),`: React ARIA hooks provide a standardized way to manage accessibility and state for form controls. They align with the WAI-ARIA specifications and ensure that the components are accessible to users with disabilities.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Why visually hide the native checkbox input?`}),`: The native checkbox input is visually hidden to allow for custom styling and behavior while still being accessible to screen readers. Native checkboxes also vary style-wise browser to browser, so visually hiding the `,(0,c.jsx)(t.code,{children:`<input>`}),` and allowing users to style the `,(0,c.jsx)(t.code,{children:`Icon`}),` allows for a consistent look and feel across all browsers.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsxs)(t.p,{children:[`:::note
For simplicity, the data attributes are shortened in the rendered HTML examples below. The full data attributes will be present in the actual implementation, and are available to browse `,(0,c.jsx)(t.a,{href:`#expected-data-attributes`,children:`here`}),`.
:::`]}),`
`,(0,c.jsx)(t.h3,{id:`default-uncontrolled-unlabelled-checkbox`,children:`Default Uncontrolled, Unlabelled Checkbox`}),`
`,(0,c.jsxs)(t.p,{children:[`The following is a simple example of an uncontrolled, unlabelled `,(0,c.jsx)(t.code,{children:`Checkbox`}),`, which is the default state management of the base component. The `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive uses React ARIA's `,(0,c.jsx)(t.code,{children:`useCheckbox`}),` and `,(0,c.jsx)(t.code,{children:`useCheckboxGroup`}),` hooks to manage the checkbox state internally, allowing it to be used without any additional state management.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`function DefaultUncontrolledCheckbox() {
  return (
    <Checkbox />
  );
}
`})}),`
`,(0,c.jsx)(t.p,{children:`This JSX would render in the DOM as follows:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<label class="checkbox-wrapper" data-pressable-attributes>
  <div style="visually-hidden-pseudocode-styles: true;">
    <input type="checkbox" id="use-id-autogenerated-id" aria-label="Checkbox" />
  </div>
  <svg role="presentation" data-icon="unchecked">
    <path d="..."></path>
  </svg>
</label>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`data-icon`}),` attribute will be set to `,(0,c.jsx)(t.code,{children:`unchecked`}),` by default, indicating that the checkbox is not checked based on the state.`]}),`
`,(0,c.jsx)(t.h3,{id:`controlled-checkbox-example`,children:`Controlled Checkbox Example`}),`
`,(0,c.jsxs)(t.p,{children:[`The following is an example of a controlled `,(0,c.jsx)(t.code,{children:`Checkbox`}),`, where the state is managed externally. The `,(0,c.jsx)(t.code,{children:`isChecked`}),` and `,(0,c.jsx)(t.code,{children:`onChange`}),` props are used to control the checkbox state.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { useState } from 'react';

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
`,(0,c.jsxs)(t.p,{children:[`The JSX will render identically to the uncontrolled example, but the `,(0,c.jsx)(t.code,{children:`isChecked`}),` state will be managed by the `,(0,c.jsx)(t.code,{children:`useState`}),` hook in React. The `,(0,c.jsx)(t.code,{children:`onChange`}),` callback will update the state when the checkbox is toggled.`]}),`
`,(0,c.jsx)(t.h3,{id:`labelled-checkbox-example`,children:`Labelled Checkbox Example`}),`
`,(0,c.jsxs)(t.p,{children:[`The following example demonstrates how to use the labelled `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive with slots to customize the label and icon. This allows for a more flexible and tailored `,(0,c.jsx)(t.code,{children:`Checkbox`}),` implementation while maintaining accessibility.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { Checkbox, CheckboxGroup } from 'bento-checkbox';

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
`,(0,c.jsx)(t.h3,{id:`checkbox-icon-slot-override-example`,children:`Checkbox Icon Slot Override Example`}),`
`,(0,c.jsxs)(t.p,{children:[`The following example demonstrates how to use the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive with slots to customize the icon conditionally, so that the icon changes based on the checked state using `,(0,c.jsx)(t.code,{children:`useState`}),` to manage the checked state.`]}),`
`,(0,c.jsxs)(t.p,{children:[`:::note
All slots are optional and both primitives can use slots, as detailed in the `,(0,c.jsx)(t.a,{href:`#slot-map`,children:`Slot Map section`}),` above.
:::`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { useState } from 'react';
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
`,(0,c.jsx)(t.h3,{id:`checkbox-indeterminate-group-example`,children:`Checkbox Indeterminate Group Example`}),`
`,(0,c.jsx)(t.p,{children:`The following example demonstrates how to create a checkbox group with a parent checkbox that can be in an indeterminate state, along with child checkboxes that can be checked or unchecked. The parent checkbox will reflect the state of its children, allowing for collective control over their selection states.`}),`
`,(0,c.jsxs)(t.p,{children:[`This is a common pattern that showcases the primitives' ability to handle state in complex scenarios, group checkboxes, and manage indeterminate states effectively. The `,(0,c.jsx)(t.code,{children:`CheckboxGroup`}),` primitive is used to manage the state of multiple checkboxes, while the `,(0,c.jsx)(t.code,{children:`Checkbox`}),` primitive is used for individual checkboxes within the group.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { useState } from 'react';
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
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};