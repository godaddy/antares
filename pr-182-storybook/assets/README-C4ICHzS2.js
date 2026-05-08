import{j as e}from"./iframe-DG3Ay5l6.js";import{useMDXComponents as s}from"./index-kiLheNkG.js";import{M as c,A as l,a as n,S as i}from"./blocks-BrTOzewo.js";import{S as a,P as d,B as h,I as x,G as u,C as p,H as b,D as m,R as k,a as j}from"./checkbox.stories-CvlQsQG5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-aIEYDSX2.js";import"./index-CAibReNU.js";import"./index-BC4nUMpV.js";import"./RSPContexts-C21p4uNp.js";import"./Text-o_ffsxuH.js";import"./mergeProps-jw9f8g2-.js";import"./SSRProvider-CSccm5Hk.js";import"./clsx-B-dksMZM.js";import"./useObjectRef-Bt7AoTYy.js";import"./FieldError-CidozLFW.js";import"./Hidden-Cv0KDwMz.js";import"./filterDOMProps-BNnC3YgW.js";import"./Form-BxbBj_ut.js";import"./useCheckboxGroupState-PFJk0Pib.js";import"./useField-CtubyTdr.js";import"./useFocusable-BKJHOq_P.js";import"./useHover-Dxf8G8v1.js";import"./utils-DAMIA-d-.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./useLabel-VQr0nPfd.js";import"./useLabels-D6yUodzK.js";import"./useFocusWithin-CZtRim9f.js";import"./usePress-uzsrfJ-c.js";import"./useToggleState-4yttYVDr.js";import"./useControlledState-km3iKmG6.js";import"./useFocusRing-BuYVPqFf.js";import"./VisuallyHidden-BIHtrsfH.js";import"./index-Cb4ao8WG.js";import"./index-BtlUOAdW.js";import"./index-dMgh0xEH.js";import"./index-1osl4Qgs.js";import"./index-CUmQUz9T.js";import"./index-CUP1lm4b.js";import"./slots-B2G1OXBw.js";import"./index-BiMXcAtJ.js";import"./index-CLj43KZG.js";import"./index-DoDl_Hk-.js";import"./index-DdtYI0mb.js";import"./create-external-store-TtP3UJpK.js";import"./index-CfNyJ-c3.js";import"./client-BYFtKW75.js";import"./index-oK3OtEve.js";import"./index-D00NLFGA.js";const g=`import { Checkbox } from '@godaddy/antares';

export function CheckboxBasic() {
  return <Checkbox>One checkbox</Checkbox>;
}
`,C=`import { Checkbox } from '@godaddy/antares';

export function CheckboxIndeterminate() {
  return <Checkbox isIndeterminate>Option 1</Checkbox>;
}
`,v=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupBasic() {
  return (
    <CheckboxGroup label="Favorite colors">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
`,f=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupHorizontal() {
  return (
    <CheckboxGroup label="Favorite colors" direction="row">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
`,y=`import { useState } from 'react';
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
`,S=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

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
`,G=`import { useState } from 'react';
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
`,w=`import { Checkbox, CheckboxGroup } from '@godaddy/antares';

export function CheckboxGroupInvalid() {
  return (
    <CheckboxGroup label="Favorite colors" isInvalid description="Choose your favorite color">
      <Checkbox value="blue">Blue</Checkbox>
      <Checkbox value="red">Red</Checkbox>
      <Checkbox value="green">Green</Checkbox>
    </CheckboxGroup>
  );
}
`;function t(r){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:a,name:"Overview"}),`
`,e.jsx(o.h1,{id:"checkbox",children:"Checkbox"}),`
`,e.jsx(o.p,{children:"Accessible checkbox component for multi-select options with support for indeterminate states, validation, keyboard navigation, and flexible group layouts."}),`
`,e.jsx(o.h1,{id:"checkbox-1",children:"Checkbox"}),`
`,e.jsx(o.p,{children:"Accessible checkbox component for multi-select options with support for indeterminate states, validation, keyboard navigation, and flexible group layouts."}),`
`,e.jsx(o.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(o.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(o.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(o.h3,{id:"basic",children:"Basic"}),`
`,e.jsx(o.p,{children:"A single checkbox with a label."}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:g}),`
`,e.jsx(o.h3,{id:"indeterminate",children:"Indeterminate"}),`
`,e.jsxs(o.p,{children:["Checkboxes can display an indeterminate state (neither checked nor unchecked), with the use of the ",e.jsx(o.code,{children:"isIndeterminate"}),' prop, commonly used for "select all" functionality when some but not all child items are selected.']}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:C}),`
`,e.jsx(o.h3,{id:"checkbox-group",children:"Checkbox Group"}),`
`,e.jsx(o.p,{children:"Group multiple checkboxes together with a shared label and description."}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:v}),`
`,e.jsx(o.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsx(o.p,{children:"Manage checkbox group state programmatically with controlled component pattern."}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:y}),`
`,e.jsx(o.h3,{id:"horizontal-layout",children:"Horizontal Layout"}),`
`,e.jsx(o.p,{children:"Display checkboxes in a horizontal row instead of vertical stack."}),`
`,e.jsx(n,{of:b,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:f}),`
`,e.jsx(o.h3,{id:"disabled-states",children:"Disabled States"}),`
`,e.jsx(o.p,{children:"Individual checkboxes within a group can be disabled while others remain interactive."}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:G}),`
`,e.jsx(o.h3,{id:"required-indicator",children:"Required Indicator"}),`
`,e.jsx(o.p,{children:"Mark a checkbox group as required with visual indicator and validation."}),`
`,e.jsx(n,{of:k,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:S}),`
`,e.jsx(o.h3,{id:"invalid-state",children:"Invalid State"}),`
`,e.jsx(o.p,{children:"Display error state and error message for validation feedback."}),`
`,e.jsx(n,{of:j,inline:!0}),`
`,e.jsx(i,{language:"tsx",code:w}),`
`,e.jsx(o.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(o.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(o.p,{children:"Components automatically add data attributes for styling different states:"}),`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"CheckboxGroup Container:"})," ",e.jsx(o.code,{children:"data-invalid"}),", ",e.jsx(o.code,{children:"data-disabled"}),", ",e.jsx(o.code,{children:"data-required"}),", ",e.jsx(o.code,{children:"data-readonly"}),", ",e.jsx(o.code,{children:"data-orientation"})]}),`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Checkbox:"})," ",e.jsx(o.code,{children:"data-selected"}),", ",e.jsx(o.code,{children:"data-indeterminate"}),", ",e.jsx(o.code,{children:"data-hovered"}),", ",e.jsx(o.code,{children:"data-pressed"}),", ",e.jsx(o.code,{children:"data-focused"}),", ",e.jsx(o.code,{children:"data-disabled"})]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-css",children:`.my-checkbox-group [data-selected] {
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
`,e.jsx(o.h3,{id:"component-customization",children:"Component Customization"}),`
`,e.jsxs(o.p,{children:["Individual components can be styled by passing ",e.jsx(o.code,{children:"className"})," props:"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<CheckboxGroup label="Select options" className="custom-checkbox-group">
  <Checkbox value="option1" className="custom-checkbox">
    Option 1
  </Checkbox>
  <Checkbox value="option2" className="highlighted-checkbox">
    Option 2
  </Checkbox>
</CheckboxGroup>
`})}),`
`,e.jsx(o.h2,{id:"key-features",children:"Key Features"}),`
`,e.jsx(o.h3,{id:"indeterminate-state",children:"Indeterminate State"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"isIndeterminate"}),' prop displays a minus icon to represent a partial selection state. This is useful for "select all" checkboxes when only some items in a collection are selected.']}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<Checkbox isIndeterminate onChange={handleSelectAll}>
  Select All
</Checkbox>
`})}),`
`,e.jsx(o.h3,{id:"group-validation",children:"Group Validation"}),`
`,e.jsx(o.p,{children:"CheckboxGroup supports validation states and error messages:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"isRequired"}),": Marks the group as required with visual indicator"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"isInvalid"}),": Shows error state styling"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"errorMessage"}),": Displays validation error text below the group"]}),`
`]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<CheckboxGroup
  label="Required selection"
  isRequired
  isInvalid={!hasSelection}
  errorMessage="At least one option must be selected"
>
  <Checkbox value="a">Option A</Checkbox>
  <Checkbox value="b">Option B</Checkbox>
</CheckboxGroup>
`})}),`
`,e.jsx(o.h3,{id:"direction",children:"Direction"}),`
`,e.jsxs(o.p,{children:["Control the layout direction with the ",e.jsx(o.code,{children:"direction"})," prop:"]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"column"})," (default): Stacks checkboxes vertically"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"row"}),": Arranges checkboxes in a horizontal row"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"column-reverse"}),": Stacks checkboxes vertically in reverse order"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"row-reverse"}),": Arranges checkboxes in reverse order in a horizontal row"]}),`
`]}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(o.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Tab"}),": Moves focus to the next/previous checkbox"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Space"}),": Toggles the focused checkbox"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Shift + Tab"}),": Moves focus to the previous checkbox"]}),`
`]}),`
`,e.jsx(o.h3,{id:"aria-support",children:"ARIA Support"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"aria-disabled"})," for disabled checkboxes"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"aria-required"})," when selection is required"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"aria-invalid"})," for validation errors"]}),`
`,e.jsxs(o.li,{children:["Proper labeling with ",e.jsx(o.code,{children:"aria-labelledby"})," and ",e.jsx(o.code,{children:"aria-describedby"})]}),`
`]}),`
`,e.jsx(o.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(o.h3,{id:"selection-not-updating",children:"Selection Not Updating"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`// ❌ Wrong: Using both value and defaultValue
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
`,e.jsx(o.h3,{id:"indeterminate-state-not-updating",children:"Indeterminate State Not Updating"}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"isIndeterminate"})," prop must be explicitly managed - it doesn't automatically reflect parent-child relationships:"]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`// ✅ Correct: Manually manage indeterminate state
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
`,e.jsx(o.h3,{id:"styling-overrides-not-applying",children:"Styling Overrides Not Applying"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-css",children:`/* ❌ May not have enough specificity */
.my-custom-checkbox {
  color: red;
}

/* ✅ Use data attributes with className for higher specificity */
.my-checkbox-group [data-selected] {
  color: red;
  font-weight: 600;
}
`})}),`
`,e.jsx(o.h3,{id:"keyboard-navigation-not-working",children:"Keyboard Navigation Not Working"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-css",children:`/* ❌ Don't remove focus outlines without replacement */
[data-focused] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-checkbox-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,e.jsx(o.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(o.h3,{id:"when-to-use-checkboxes",children:"When to Use Checkboxes"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"✅ For selecting multiple independent options"}),`
`,e.jsx(o.li,{children:"✅ When users can select zero, one, or many items"}),`
`,e.jsx(o.li,{children:"✅ For toggling settings or features on/off"}),`
`,e.jsx(o.li,{children:"✅ When all available options should be visible"}),`
`,e.jsx(o.li,{children:"❌ For mutually exclusive options (use Radio instead)"}),`
`,e.jsx(o.li,{children:"❌ For simple on/off toggles without labels (use Toggle/Switch instead)"}),`
`]}),`
`,e.jsx(o.h3,{id:"label-guidelines",children:"Label Guidelines"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"Use clear, concise labels that describe what selecting the option means"}),`
`,e.jsx(o.li,{children:"Keep labels short (1-5 words when possible)"}),`
`,e.jsx(o.li,{children:"Ensure labels are descriptive without being verbose"}),`
`,e.jsx(o.li,{children:"Place the most commonly selected options first in groups"}),`
`]}),`
`,e.jsx(o.h3,{id:"validation",children:"Validation"}),`
`,e.jsx(o.p,{children:"Always provide clear error messages and use appropriate validation states:"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-jsx",children:`<CheckboxGroup
  label="Terms and conditions"
  isRequired
  isInvalid={!agreedToTerms}
  errorMessage="You must agree to the terms to continue"
>
  <Checkbox value="terms">I agree to the terms and conditions</Checkbox>
  <Checkbox value="privacy">I agree to the privacy policy</Checkbox>
</CheckboxGroup>
`})}),`
`,e.jsx(o.h3,{id:"group-organization",children:"Group Organization"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"Limit checkbox groups to 7-10 options for better usability"}),`
`,e.jsx(o.li,{children:"Use logical ordering (alphabetical, frequency of use, or importance)"}),`
`,e.jsx(o.li,{children:"Consider using CheckboxGroup for related options, even if there are only 2-3"}),`
`,e.jsx(o.li,{children:"Provide a group label that clearly describes the choice being made"}),`
`]})]})}function fe(r={}){const{wrapper:o}={...s(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(t,{...r})}):t(r)}export{fe as default};
