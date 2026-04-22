import{j as e}from"./iframe-DNXmVt2J.js";import{useMDXComponents as s}from"./index-C5SBtMP2.js";import{M as n,A as t,S as i}from"./blocks-iX0Kt9Jr.js";import{S as a,R as l,a as c}from"./radio.stories-UsWDBgJd.js";import"./preload-helper-PPVm8Dsz.js";import"./index-pRJuJIwn.js";import"./index-Th8k5VBP.js";import"./index-DdBMv_Jd.js";import"./index-DrFu-skq.js";import"./radio-group-B6i6rXZr.js";import"./index-C8Xis9_Q.js";import"./slots-LmwQCJh-.js";import"./index-CqxNEkWc.js";import"./index-CLj43KZG.js";import"./index-BNBzX1QM.js";import"./mergeProps-C7R8qOWs.js";import"./SSRProvider-BijP3zDE.js";import"./clsx-B-dksMZM.js";import"./index-Dy9sFdiU.js";import"./index-BfCgNV45.js";import"./index-CRsPzxF-.js";import"./create-external-store-TtP3UJpK.js";import"./index-9GqdfinS.js";import"./client-Kzy-00Zf.js";import"./index-DPcynlzp.js";import"./useFocusRing-CyRuR0as.js";import"./useHover-BhJO288J.js";import"./utils-C2NRQJ9A.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-BULRNHlZ.js";import"./useFocusWithin-CaHO3xef.js";import"./index-2RjO8yjZ.js";import"./VisuallyHidden-C1sHbcj6.js";import"./useObjectRef-DwTlAagJ.js";import"./useRadioGroupState-Bbh9IIY9.js";import"./filterDOMProps-BNnC3YgW.js";import"./useField-Bh0kNJ1W.js";import"./useFocusable-BQzQBPUa.js";import"./useLabel-e-eE0nBm.js";import"./useLabels-CTDx30gH.js";import"./usePress-Qty7P0C8.js";import"./FocusScope-134kfVFb.js";import"./context-2eYSJNgG.js";import"./useControlledState-Bdw8djY9.js";import"./index-C_khdgIJ.js";import"./index-BC4APsIv.js";const h=`import { Radio, RadioGroup } from '@bento/radio';
import { Text } from '@bento/text';
/* v8 ignore next */
import React from 'react';

export function UncontrolledExample() {
  return (
    <RadioGroup onChange={(value: string) => console.log('selected', value)}>
      <Text slot="label">Favorite fruit</Text>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="orange" isDisabled>
        Orange
      </Radio>
    </RadioGroup>
  );
}
`,x=`/* v8 ignore next */
import React, { useState } from 'react';
import { RadioGroup, Radio } from '@bento/radio';
import { Text } from '@bento/text';

export function ControlledExample() {
  const [value, setValue] = useState<string>();
  return (
    <RadioGroup value={value} onChange={setValue}>
      <Text slot="label">Favorite fruit</Text>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="orange">Orange</Radio>
    </RadioGroup>
  );
}
`,p=`import { Radio, RadioGroup } from '@bento/radio';
import { Text } from '@bento/text';
/* v8 ignore next */
import React, { type ComponentProps } from 'react';

export function SingleRadioExample(props: {
  groupProps?: Partial<ComponentProps<typeof RadioGroup>>;
  radioProps?: Partial<ComponentProps<typeof Radio>>;
}) {
  return (
    // Radios are always required to be in a group
    <RadioGroup name="fruit" {...props.groupProps}>
      <Text slot="label">Favorite fruit (single radio)</Text>
      <Radio value="apple" {...props.radioProps}>
        Apple
      </Radio>
      <Text slot="description">This is the description</Text>
    </RadioGroup>
  );
}
`;function o(d){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:a,name:"Overview"}),`
`,e.jsx(r.h1,{id:"radio",children:"Radio"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"@bento/radio"})," package provides accessible, customizable radio controls. It exports the ",e.jsx(r.strong,{children:"RadioGroup"})," and ",e.jsx(r.strong,{children:"Radio"})," primitives, enabling you to build groups of radio options with consistent keyboard navigation, focus management, and ARIA support."]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"RadioGroup"})," allows a user to select a single item from a list of ",e.jsx(r.code,{children:"Radio"})," components."]}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"Radio"})," is a single radio option that can be selected by the user."]}),`
`,e.jsx(r.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-bash",children:`npm install --save @bento/radio
`})}),`
`,e.jsx(r.h2,{id:"props",children:"Props"}),`
`,e.jsxs(r.p,{children:["The following properties are available to be used on the ",e.jsx(r.code,{children:"RadioGroup"})," and ",e.jsx(r.code,{children:"Radio"})," primitives:"]}),`
`,e.jsx(r.h3,{id:"radiogroup",children:"RadioGroup"}),`
`,e.jsx(t,{of:l}),`
`,e.jsx(r.h3,{id:"radio-1",children:"Radio"}),`
`,e.jsx(t,{of:c}),`
`,e.jsx(r.h2,{id:"data-attributes-slot-map-and-props",children:"Data Attributes, Slot Map and Props"}),`
`,e.jsxs(r.p,{children:["The data attributes, slot map and props can be used to style and customize the ",e.jsx(r.code,{children:"RadioGroup"})," and ",e.jsx(r.code,{children:"Radio"})," primitives."]}),`
`,e.jsxs(r.h3,{id:"radiogroup-data-attributes",children:[e.jsx(r.code,{children:"RadioGroup"})," Data Attributes"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Attribute"}),e.jsx(r.th,{children:"Description"}),e.jsx(r.th,{children:"Example Values"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-disabled"})}),e.jsx(r.td,{children:"Indicates the group is disabled"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-readonly"})}),e.jsx(r.td,{children:"Indicates the group is readonly"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-required"})}),e.jsx(r.td,{children:"Indicates the group is required"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-invalid"})}),e.jsx(r.td,{children:"Indicates the group is invalid"}),e.jsx(r.td,{children:'"true"'})]})]})]}),`
`,e.jsxs(r.h3,{id:"radio-data-attributes",children:[e.jsx(r.code,{children:"Radio"})," Data Attributes"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Attribute"}),e.jsx(r.th,{children:"Description"}),e.jsx(r.th,{children:"Example Values"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-pressed"})}),e.jsx(r.td,{children:"Indicates the radio is being pressed"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-hovered"})}),e.jsx(r.td,{children:"Indicates the radio is hovered"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-focused"})}),e.jsx(r.td,{children:"Indicates the radio has focus"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-focus-visible"})}),e.jsx(r.td,{children:"Indicates focus should be visible"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-selected"})}),e.jsx(r.td,{children:"Indicates the radio is selected"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-disabled"})}),e.jsx(r.td,{children:"Indicates the radio is disabled"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-readonly"})}),e.jsx(r.td,{children:"Indicates the radio is readonly"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-invalid"})}),e.jsx(r.td,{children:"Indicates the radio is invalid"}),e.jsx(r.td,{children:'"true"'})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"data-required"})}),e.jsx(r.td,{children:"Indicates the radio is required"}),e.jsx(r.td,{children:'"true"'})]})]})]}),`
`,e.jsxs(r.h3,{id:"radiogroup-slot-map",children:[e.jsx(r.code,{children:"RadioGroup"})," Slot Map"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Slot Name"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"label"})}),e.jsx(r.td,{children:"Label for radio group"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"description"})}),e.jsx(r.td,{children:"Description for radio group"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"error"})}),e.jsx(r.td,{children:"Error for radio group"})]})]})]}),`
`,e.jsxs(r.h3,{id:"radio-slot-map",children:[e.jsx(r.code,{children:"Radio"})," Slot Map"]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Slot Name"}),e.jsx(r.th,{children:"Description"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"icon-checked"})}),e.jsx(r.td,{children:"Icon for checked radio"})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:e.jsx(r.code,{children:"icon-unchecked"})}),e.jsx(r.td,{children:"Icon for unchecked radio"})]})]})]}),`
`,e.jsx(r.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(r.h3,{id:"uncontrolled",children:"Uncontrolled"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"RadioGroup"})," is uncontrolled by default."]}),`
`,e.jsx(i,{language:"tsx",code:h}),`
`,e.jsx(r.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"RadioGroup"})," can be controlled by passing a ",e.jsx(r.code,{children:"value"})," and ",e.jsx(r.code,{children:"onChange"})," prop."]}),`
`,e.jsx(i,{language:"tsx",code:x}),`
`,e.jsx(r.h3,{id:"single-radio",children:"Single Radio"}),`
`,e.jsxs(r.p,{children:["Even if you only have one radio option, it must always be placed inside a ",e.jsx(r.code,{children:"RadioGroup"}),"."]}),`
`,e.jsx(i,{language:"tsx",code:p})]})}function se(d={}){const{wrapper:r}={...s(),...d.components};return r?e.jsx(r,{...d,children:e.jsx(o,{...d})}):o(d)}export{se as default};
