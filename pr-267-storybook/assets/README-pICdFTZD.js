import{i as e}from"./preload-helper-CVMZaHhc.js";import{y as t}from"./iframe-DQVBBl49.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-D1Tfyi-l.js";import{t as c}from"./mdx-react-shim-BAPWDE8r.js";import{Basic as l,Controlled as u,Disabled as d,Group as f,GroupProps as p,Horizontal as m,Indeterminate as h,Invalid as g,Props as _,Required as v,n as y,t as b}from"./checkbox.stories-9IvLrVQ1.js";var x,S=e((()=>{x=`import { Checkbox } from '@godaddy/antares';

export function CheckboxBasic() {
  return <Checkbox>One checkbox</Checkbox>;
}
`})),C,w=e((()=>{C=`import { Checkbox } from '@godaddy/antares';

export function CheckboxIndeterminate() {
  return <Checkbox isIndeterminate>Option 1</Checkbox>;
}
`})),T,E=e((()=>{T=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupBasic() {
  return (
    <CheckboxGroup label="Favorite colors">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
`})),D,O=e((()=>{D=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupHorizontal() {
  return (
    <CheckboxGroup label="Favorite colors" orientation="horizontal">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
`})),k,A=e((()=>{k=`import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupControlled() {
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
}
`})),j,M=e((()=>{j=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupRequired() {
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
}
`})),N,P=e((()=>{N=`import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupDisabled() {
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
}
`})),F,I=e((()=>{F=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupInvalid() {
  return (
    <CheckboxGroup label="Favorite colors" isInvalid description="Choose your favorite color">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
`}));function L(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(o,{of:b,name:`Overview`}),`
`,(0,z.jsx)(t.h1,{id:`checkbox`,children:`Checkbox`}),`
`,(0,z.jsx)(t.p,{children:`Accessible checkbox component for multi-select options with support for indeterminate states, validation, keyboard navigation, and flexible group layouts.`}),`
`,(0,z.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,z.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,z.jsxs)(t.p,{children:[`The `,(0,z.jsx)(t.code,{children:`Checkbox`}),` component has the following props:`]}),`
`,(0,z.jsx)(a,{of:_}),`
`,(0,z.jsxs)(t.p,{children:[`The `,(0,z.jsx)(t.code,{children:`CheckboxGroup`}),` component has the following props:`]}),`
`,(0,z.jsx)(a,{of:p}),`
`,(0,z.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,z.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,z.jsx)(t.p,{children:`A single checkbox with a label.`}),`
`,(0,z.jsx)(i,{of:l,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:x}),`
`,(0,z.jsx)(t.h3,{id:`indeterminate`,children:`Indeterminate`}),`
`,(0,z.jsxs)(t.p,{children:[`Checkboxes can display an indeterminate state (neither checked nor unchecked), with the use of the `,(0,z.jsx)(t.code,{children:`isIndeterminate`}),` prop, commonly used for "select all" functionality when some but not all child items are selected.`]}),`
`,(0,z.jsx)(i,{of:h,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:C}),`
`,(0,z.jsx)(t.h3,{id:`checkbox-group`,children:`Checkbox Group`}),`
`,(0,z.jsx)(t.p,{children:`Group multiple checkboxes together with a shared label and description.`}),`
`,(0,z.jsx)(i,{of:f,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:T}),`
`,(0,z.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,z.jsx)(t.p,{children:`Manage checkbox group state programmatically with controlled component pattern.`}),`
`,(0,z.jsx)(i,{of:u,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:k}),`
`,(0,z.jsx)(t.h3,{id:`horizontal-layout`,children:`Horizontal Layout`}),`
`,(0,z.jsx)(t.p,{children:`Display checkboxes in a horizontal row instead of vertical stack.`}),`
`,(0,z.jsx)(i,{of:m,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:D}),`
`,(0,z.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,z.jsx)(t.p,{children:`Individual checkboxes within a group can be disabled while others remain interactive.`}),`
`,(0,z.jsx)(i,{of:d,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:N}),`
`,(0,z.jsx)(t.h3,{id:`required-indicator`,children:`Required Indicator`}),`
`,(0,z.jsx)(t.p,{children:`Mark a checkbox group as required with visual indicator and validation.`}),`
`,(0,z.jsx)(i,{of:v,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:j}),`
`,(0,z.jsx)(t.h3,{id:`invalid-state`,children:`Invalid State`}),`
`,(0,z.jsx)(t.p,{children:`Display error state and error message for validation feedback.`}),`
`,(0,z.jsx)(i,{of:g,inline:!0}),`
`,(0,z.jsx)(r,{language:`tsx`,code:F}),`
`,(0,z.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,z.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,z.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,z.jsxs)(t.p,{children:[(0,z.jsx)(t.strong,{children:`CheckboxGroup Container:`}),` `,(0,z.jsx)(t.code,{children:`data-invalid`}),`, `,(0,z.jsx)(t.code,{children:`data-disabled`}),`, `,(0,z.jsx)(t.code,{children:`data-required`}),`, `,(0,z.jsx)(t.code,{children:`data-readonly`}),`, `,(0,z.jsx)(t.code,{children:`data-orientation`})]}),`
`,(0,z.jsxs)(t.p,{children:[(0,z.jsx)(t.strong,{children:`Checkbox:`}),` `,(0,z.jsx)(t.code,{children:`data-selected`}),`, `,(0,z.jsx)(t.code,{children:`data-indeterminate`}),`, `,(0,z.jsx)(t.code,{children:`data-hovered`}),`, `,(0,z.jsx)(t.code,{children:`data-pressed`}),`, `,(0,z.jsx)(t.code,{children:`data-focused`}),`, `,(0,z.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-css`,children:`.my-checkbox-group [data-selected] {
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
`,(0,z.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,z.jsxs)(t.p,{children:[`Individual components can be styled by passing `,(0,z.jsx)(t.code,{children:`className`}),` props:`]}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-jsx`,children:`<CheckboxGroup label="Select options" className="custom-checkbox-group">
  <Checkbox value="option1" className="custom-checkbox">
    Option 1
  </Checkbox>
  <Checkbox value="option2" className="highlighted-checkbox">
    Option 2
  </Checkbox>
</CheckboxGroup>
`})}),`
`,(0,z.jsx)(t.h2,{id:`key-features`,children:`Key Features`}),`
`,(0,z.jsx)(t.h3,{id:`indeterminate-state`,children:`Indeterminate State`}),`
`,(0,z.jsxs)(t.p,{children:[`The `,(0,z.jsx)(t.code,{children:`isIndeterminate`}),` prop displays a minus icon to represent a partial selection state. This is useful for "select all" checkboxes when only some items in a collection are selected.`]}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-jsx`,children:`<Checkbox isIndeterminate onChange={handleSelectAll}>
  Select All
</Checkbox>
`})}),`
`,(0,z.jsx)(t.h3,{id:`group-validation`,children:`Group Validation`}),`
`,(0,z.jsx)(t.p,{children:`CheckboxGroup supports validation states and error messages:`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`isRequired`}),`: Marks the group as required with visual indicator`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`isInvalid`}),`: Shows error state styling`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`errorMessage`}),`: Displays validation error text below the group`]}),`
`]}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-jsx`,children:`<CheckboxGroup
  label="Required selection"
  isRequired
  isInvalid={!hasSelection}
  errorMessage="At least one option must be selected"
>
  <Checkbox value="a">Option A</Checkbox>
  <Checkbox value="b">Option B</Checkbox>
</CheckboxGroup>
`})}),`
`,(0,z.jsx)(t.h3,{id:`orientation`,children:`Orientation`}),`
`,(0,z.jsxs)(t.p,{children:[`Control the layout with the `,(0,z.jsx)(t.code,{children:`orientation`}),` prop (matching `,(0,z.jsx)(t.code,{children:`RadioGroup`}),`):`]}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.code,{children:`vertical`}),` (default): Stacks checkboxes vertically`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.code,{children:`horizontal`}),`: Arranges checkboxes in a horizontal row`]}),`
`]}),`
`,(0,z.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,z.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`Tab`}),`: Moves focus to the next/previous checkbox`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`Space`}),`: Toggles the focused checkbox`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.strong,{children:`Shift + Tab`}),`: Moves focus to the previous checkbox`]}),`
`]}),`
`,(0,z.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.code,{children:`aria-disabled`}),` for disabled checkboxes`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.code,{children:`aria-required`}),` when selection is required`]}),`
`,(0,z.jsxs)(t.li,{children:[(0,z.jsx)(t.code,{children:`aria-invalid`}),` for validation errors`]}),`
`,(0,z.jsxs)(t.li,{children:[`Proper labeling with `,(0,z.jsx)(t.code,{children:`aria-labelledby`}),` and `,(0,z.jsx)(t.code,{children:`aria-describedby`})]}),`
`]}),`
`,(0,z.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,z.jsx)(t.h3,{id:`selection-not-updating`,children:`Selection Not Updating`}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both value and defaultValue
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
`,(0,z.jsx)(t.h3,{id:`indeterminate-state-not-updating`,children:`Indeterminate State Not Updating`}),`
`,(0,z.jsxs)(t.p,{children:[`The `,(0,z.jsx)(t.code,{children:`isIndeterminate`}),` prop must be explicitly managed - it doesn't automatically reflect parent-child relationships:`]}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-jsx`,children:`// ✅ Correct: Manually manage indeterminate state
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
`,(0,z.jsx)(t.h3,{id:`styling-overrides-not-applying`,children:`Styling Overrides Not Applying`}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.my-custom-checkbox {
  color: red;
}

/* ✅ Use data attributes with className for higher specificity */
.my-checkbox-group [data-selected] {
  color: red;
  font-weight: 600;
}
`})}),`
`,(0,z.jsx)(t.h3,{id:`keyboard-navigation-not-working`,children:`Keyboard Navigation Not Working`}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-css`,children:`/* ❌ Don't remove focus outlines without replacement */
[data-focused] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-checkbox-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,(0,z.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,z.jsx)(t.h3,{id:`when-to-use-checkboxes`,children:`When to Use Checkboxes`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsx)(t.li,{children:`✅ For selecting multiple independent options`}),`
`,(0,z.jsx)(t.li,{children:`✅ When users can select zero, one, or many items`}),`
`,(0,z.jsx)(t.li,{children:`✅ For toggling settings or features on/off`}),`
`,(0,z.jsx)(t.li,{children:`✅ When all available options should be visible`}),`
`,(0,z.jsx)(t.li,{children:`❌ For mutually exclusive options (use Radio instead)`}),`
`,(0,z.jsx)(t.li,{children:`❌ For simple on/off toggles without labels (use Toggle/Switch instead)`}),`
`]}),`
`,(0,z.jsx)(t.h3,{id:`label-guidelines`,children:`Label Guidelines`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsx)(t.li,{children:`Use clear, concise labels that describe what selecting the option means`}),`
`,(0,z.jsx)(t.li,{children:`Keep labels short (1-5 words when possible)`}),`
`,(0,z.jsx)(t.li,{children:`Ensure labels are descriptive without being verbose`}),`
`,(0,z.jsx)(t.li,{children:`Place the most commonly selected options first in groups`}),`
`]}),`
`,(0,z.jsx)(t.h3,{id:`validation`,children:`Validation`}),`
`,(0,z.jsx)(t.p,{children:`Always provide clear error messages and use appropriate validation states:`}),`
`,(0,z.jsx)(t.pre,{children:(0,z.jsx)(t.code,{className:`language-jsx`,children:`<CheckboxGroup
  label="Terms and conditions"
  isRequired
  isInvalid={!agreedToTerms}
  errorMessage="You must agree to the terms to continue"
>
  <Checkbox value="terms">I agree to the terms and conditions</Checkbox>
  <Checkbox value="privacy">I agree to the privacy policy</Checkbox>
</CheckboxGroup>
`})}),`
`,(0,z.jsx)(t.h3,{id:`group-organization`,children:`Group Organization`}),`
`,(0,z.jsxs)(t.ul,{children:[`
`,(0,z.jsx)(t.li,{children:`Limit checkbox groups to 7-10 options for better usability`}),`
`,(0,z.jsx)(t.li,{children:`Use logical ordering (alphabetical, frequency of use, or importance)`}),`
`,(0,z.jsx)(t.li,{children:`Consider using CheckboxGroup for related options, even if there are only 2-3`}),`
`,(0,z.jsx)(t.li,{children:`Provide a group label that clearly describes the choice being made`}),`
`]})]})}function R(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,z.jsx)(t,{...e,children:(0,z.jsx)(L,{...e})}):L(e)}var z;e((()=>{z=t(),c(),s(),S(),w(),E(),O(),A(),M(),P(),I(),y()}))();export{R as default};