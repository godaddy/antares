import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-C1U0XjdE.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-J1guKep0.js";import{t as c}from"./mdx-react-shim-Dw8Dqmvo.js";import{t as l}from"./runtime-CCpseHws.js";import{CheckboxGroupBasic as u,CheckboxGroupControlled as d,CheckboxGroupDisabled as f,CheckboxGroupHorizontal as p,CheckboxGroupInvalid as m,CheckboxGroupRequired as h,CheckboxIndeterminate as g,Composed as _,Default as v,GroupProps as y,Props as b,n as x,t as S}from"./checkbox.stories-D5BOOP99.js";function C(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{of:S,name:`Overview`}),`
`,(0,T.jsx)(t.h1,{id:`checkbox`,children:`Checkbox`}),`
`,(0,T.jsx)(t.p,{children:`Accessible checkbox component for multi-select options with support for indeterminate states, validation, keyboard navigation, and flexible group layouts.`}),`
`,(0,T.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,T.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,T.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,T.jsx)(t.p,{children:`A single checkbox with a label.`}),`
`,(0,T.jsx)(i,{of:v,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Checkbox } from '@godaddy/antares';

export function DefaultExample() {
  return <Checkbox>One checkbox</Checkbox>;
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,T.jsxs)(t.p,{children:[`Checkboxes can display an indeterminate state (neither checked nor unchecked), with the use of the `,(0,T.jsx)(t.code,{children:`isIndeterminate`}),` prop, commonly used for "select all" functionality when some but not all child items are selected.`]}),`
`,(0,T.jsx)(i,{of:g,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Checkbox } from '@godaddy/antares';

export function CheckboxIndeterminateExample() {
  return <Checkbox isIndeterminate>Option 1</Checkbox>;
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`checkbox-group`,children:`Checkbox Group`}),`
`,(0,T.jsx)(t.p,{children:`Group multiple checkboxes together with a shared label and description.`}),`
`,(0,T.jsx)(i,{of:u,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupBasicExample() {
  return (
    <CheckboxGroup label="Favorite colors">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,T.jsx)(t.p,{children:`Manage checkbox group state programmatically with controlled component pattern.`}),`
`,(0,T.jsx)(i,{of:d,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupControlledExample() {
  const [selected, setSelected] = useState<string[]>(['baseball', 'tennis']);

  return (
    <CheckboxGroup
      label="Favorite sports"
      description="Select your favorite sports"
      value={selected}
      onChange={setSelected}
    >
      <Checkbox value="basketball">Basketball</Checkbox>
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="tennis">Tennis</Checkbox>
    </CheckboxGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`horizontal-layout`,children:`Horizontal Layout`}),`
`,(0,T.jsx)(t.p,{children:`Display checkboxes in a horizontal row instead of vertical stack.`}),`
`,(0,T.jsx)(i,{of:p,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupHorizontalExample() {
  return (
    <CheckboxGroup label="Favorite colors" orientation="horizontal">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,T.jsx)(t.p,{children:`Individual checkboxes within a group can be disabled while others remain interactive.`}),`
`,(0,T.jsx)(i,{of:f,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupDisabledExample() {
  const [selected, setSelected] = useState<string[]>(['purple', 'red']);

  return (
    <CheckboxGroup
      label="Favorite colors"
      value={selected}
      onChange={setSelected}
      errorMessage="At least one color must be selected"
      description="Choose your favorite color"
      isDisabled
    >
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
      <Checkbox value="purple">Purple</Checkbox>
    </CheckboxGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`required-indicator`,children:`Required Indicator`}),`
`,(0,T.jsx)(t.p,{children:`Mark a checkbox group as required with visual indicator and validation.`}),`
`,(0,T.jsx)(i,{of:h,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupRequiredExample() {
  return (
    <CheckboxGroup
      label="Favorite colors"
      errorMessage="At least one color must be selected"
      description="Choose your favorite color"
      isRequired
    >
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`invalid-state`,children:`Invalid State`}),`
`,(0,T.jsx)(t.p,{children:`Display error state and error message for validation feedback.`}),`
`,(0,T.jsx)(i,{of:m,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupInvalidExample() {
  return (
    <CheckboxGroup label="Favorite colors" isInvalid description="Choose your favorite color">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,T.jsx)(t.p,{children:`Compose the interior when the default layout is not enough.`}),`
`,(0,T.jsx)(i,{of:_,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Checkbox, CheckboxGroup, FieldError, Flex, Label, Text } from '@godaddy/antares';

export function ComposedExample() {
  return (
    <CheckboxGroup defaultValue={['blue']}>
      <Label>Favorite colors</Label>
      <Flex direction="column" gap="md">
        <Checkbox value="blue">Blue</Checkbox>
        <Checkbox value="red">Red</Checkbox>
        <Checkbox value="green">Green</Checkbox>
      </Flex>
      <Text slot="description">Pick all that apply</Text>
      <FieldError />
    </CheckboxGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,T.jsxs)(t.p,{children:[`Pass `,(0,T.jsx)(t.code,{children:`children`}),` to compose `,(0,T.jsx)(t.code,{children:`Label`}),`, `,(0,T.jsx)(t.code,{children:`Text`}),`, `,(0,T.jsx)(t.code,{children:`FieldError`}),`, and item checkboxes instead of the default group layout. Each `,(0,T.jsx)(t.code,{children:`Checkbox`}),` still takes label text next to the indicator.`]}),`
`,(0,T.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,T.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,T.jsxs)(t.p,{children:[(0,T.jsx)(t.strong,{children:`CheckboxGroup Container:`}),` `,(0,T.jsx)(t.code,{children:`data-invalid`}),`, `,(0,T.jsx)(t.code,{children:`data-disabled`}),`, `,(0,T.jsx)(t.code,{children:`data-required`}),`, `,(0,T.jsx)(t.code,{children:`data-readonly`}),`, `,(0,T.jsx)(t.code,{children:`data-orientation`})]}),`
`,(0,T.jsxs)(t.p,{children:[(0,T.jsx)(t.strong,{children:`Checkbox:`}),` `,(0,T.jsx)(t.code,{children:`data-selected`}),`, `,(0,T.jsx)(t.code,{children:`data-indeterminate`}),`, `,(0,T.jsx)(t.code,{children:`data-hovered`}),`, `,(0,T.jsx)(t.code,{children:`data-pressed`}),`, `,(0,T.jsx)(t.code,{children:`data-focused`}),`, `,(0,T.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-css`,children:`.my-checkbox-group [data-selected] {
  color: #09757a;
  font-weight: 500;
}

.my-checkbox-group[data-invalid] {
  border-color: #db1802;
}

.my-checkbox-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

.my-checkbox-group [data-indeterminate] {
  background-color: #1976d2;
}

.my-checkbox-group [data-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}
`})}),`
`,(0,T.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,T.jsxs)(t.p,{children:[`Pass `,(0,T.jsx)(t.code,{children:`className`}),` or `,(0,T.jsx)(t.code,{children:`style`}),` to customize a checkbox field container. Use descendant data-attribute selectors to style the interactive checkbox state:`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`<CheckboxGroup label="Select options" className="custom-checkbox-group">
  <Checkbox value="option1" className="custom-checkbox">
    Option 1
  </Checkbox>
  <Checkbox value="option2" className="highlighted-checkbox">
    Option 2
  </Checkbox>
</CheckboxGroup>
`})}),`
`,(0,T.jsx)(t.h2,{id:`key-features`,children:`Key Features`}),`
`,(0,T.jsx)(t.h3,{id:`indeterminate-state`,children:`Indeterminate State`}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`isIndeterminate`}),` prop displays a minus icon to represent a partial selection state. This is useful for "select all" checkboxes when only some items in a collection are selected.`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`<Checkbox isIndeterminate onChange={handleSelectAll}>
  Select All
</Checkbox>
`})}),`
`,(0,T.jsx)(t.h3,{id:`group-validation`,children:`Group Validation`}),`
`,(0,T.jsx)(t.p,{children:`CheckboxGroup supports validation states and error messages:`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`isRequired`}),`: Marks the group as required with visual indicator`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`isInvalid`}),`: Shows error state styling`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`errorMessage`}),`: Displays validation error text below the group`]}),`
`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`<CheckboxGroup
  label="Required selection"
  isRequired
  isInvalid={!hasSelection}
  errorMessage="At least one option must be selected"
>
  <Checkbox value="a">Option A</Checkbox>
  <Checkbox value="b">Option B</Checkbox>
</CheckboxGroup>
`})}),`
`,(0,T.jsx)(t.h3,{id:`orientation`,children:`Orientation`}),`
`,(0,T.jsxs)(t.p,{children:[`Control the layout with the `,(0,T.jsx)(t.code,{children:`orientation`}),` prop (matching `,(0,T.jsx)(t.code,{children:`RadioGroup`}),`):`]}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`vertical`}),` (default): Stacks checkboxes vertically`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`horizontal`}),`: Arranges checkboxes in a horizontal row`]}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,T.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Tab`}),`: Moves focus to the next/previous checkbox`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Space`}),`: Toggles the focused checkbox`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Shift + Tab`}),`: Moves focus to the previous checkbox`]}),`
`]}),`
`,(0,T.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`aria-disabled`}),` for disabled checkboxes`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`aria-required`}),` when selection is required`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`aria-invalid`}),` for validation errors`]}),`
`,(0,T.jsxs)(t.li,{children:[`Proper labeling with `,(0,T.jsx)(t.code,{children:`aria-labelledby`}),` and `,(0,T.jsx)(t.code,{children:`aria-describedby`})]}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,T.jsx)(t.h3,{id:`selection-not-updating`,children:`Selection Not Updating`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both value and defaultValue
<CheckboxGroup value={value} defaultValue={["a"]}>
  <Checkbox value="a">Option A</Checkbox>
</CheckboxGroup>

// ✅ Controlled mode
<CheckboxGroup value={value} onChange={setValue}>
  <Checkbox value="a">Option A</Checkbox>
</CheckboxGroup>

// ✅ Uncontrolled mode
<CheckboxGroup defaultValue={["a"]}>
  <Checkbox value="a">Option A</Checkbox>
</CheckboxGroup>
`})}),`
`,(0,T.jsx)(t.h3,{id:`indeterminate-state-not-updating`,children:`Indeterminate State Not Updating`}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`isIndeterminate`}),` prop must be explicitly managed - it doesn't automatically reflect parent-child relationships:`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`// ✅ Correct: Manually manage indeterminate state
const [childSelections, setChildSelections] = React.useState([]);
const allSelected = childSelections.length === totalChildren;
const someSelected = childSelections.length > 0 && !allSelected;

<Checkbox
  isSelected={allSelected}
  isIndeterminate={someSelected}
  onChange={handleSelectAll}
>
  Select All
</Checkbox>
`})}),`
`,(0,T.jsx)(t.h3,{id:`styling-overrides-not-applying`,children:`Styling Overrides Not Applying`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.my-custom-checkbox {
  color: red;
}

/* ✅ Use data attributes with className for higher specificity */
.my-checkbox-group [data-selected] {
  color: red;
  font-weight: 600;
}
`})}),`
`,(0,T.jsx)(t.h3,{id:`keyboard-navigation-not-working`,children:`Keyboard Navigation Not Working`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-css`,children:`/* ❌ Don't remove focus outlines without replacement */
[data-focused] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-checkbox-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,(0,T.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,T.jsx)(t.h3,{id:`when-to-use-checkboxes`,children:`When to Use Checkboxes`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsx)(t.li,{children:`✅ For selecting multiple independent options`}),`
`,(0,T.jsx)(t.li,{children:`✅ When users can select zero, one, or many items`}),`
`,(0,T.jsx)(t.li,{children:`✅ For toggling settings or features on/off`}),`
`,(0,T.jsx)(t.li,{children:`✅ When all available options should be visible`}),`
`,(0,T.jsx)(t.li,{children:`❌ For mutually exclusive options (use Radio instead)`}),`
`,(0,T.jsx)(t.li,{children:`❌ For simple on/off toggles without labels (use Toggle/Switch instead)`}),`
`]}),`
`,(0,T.jsx)(t.h3,{id:`label-guidelines`,children:`Label Guidelines`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsx)(t.li,{children:`Use clear, concise labels that describe what selecting the option means`}),`
`,(0,T.jsx)(t.li,{children:`Keep labels short (1-5 words when possible)`}),`
`,(0,T.jsx)(t.li,{children:`Ensure labels are descriptive without being verbose`}),`
`,(0,T.jsx)(t.li,{children:`Place the most commonly selected options first in groups`}),`
`]}),`
`,(0,T.jsx)(t.h3,{id:`validation`,children:`Validation`}),`
`,(0,T.jsx)(t.p,{children:`Always provide clear error messages and use appropriate validation states:`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`<CheckboxGroup
  label="Terms and conditions"
  isRequired
  isInvalid={!agreedToTerms}
  errorMessage="You must agree to the terms to continue"
>
  <Checkbox value="terms">I agree to the terms and conditions</Checkbox>
  <Checkbox value="privacy">I agree to the privacy policy</Checkbox>
</CheckboxGroup>
`})}),`
`,(0,T.jsx)(t.h3,{id:`group-organization`,children:`Group Organization`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsx)(t.li,{children:`Limit checkbox groups to 7-10 options for better usability`}),`
`,(0,T.jsx)(t.li,{children:`Use logical ordering (alphabetical, frequency of use, or importance)`}),`
`,(0,T.jsx)(t.li,{children:`Consider using CheckboxGroup for related options, even if there are only 2-3`}),`
`,(0,T.jsx)(t.li,{children:`Provide a group label that clearly describes the choice being made`}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`Checkbox`}),` component has the following props:`]}),`
`,(0,T.jsx)(a,{of:b}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`CheckboxGroup`}),` component has the following props:`]}),`
`,(0,T.jsx)(a,{of:y})]})}function w(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,T.jsx)(t,{...e,children:(0,T.jsx)(C,{...e})}):C(e)}var T;e((()=>{T=t(),c(),s(),l(),x()}))();export{w as default};