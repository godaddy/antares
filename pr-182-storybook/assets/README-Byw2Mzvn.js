import{j as e}from"./iframe-B2rswUNA.js";import{u as s,M as n,A as t,S as i}from"./blocks-QrW9PPQu.js";import{S as a,R as l,a as c}from"./radio.stories-DuhOWgT2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CUxjJQ4C.js";import"./index-D9q0_Ikz.js";import"./index-CLa44HDQ.js";import"./radio-group-BnjTl9jG.js";import"./index-DpHhNP0u.js";import"./slots-DSqAbleQ.js";import"./index-QSEzv4mT.js";import"./index-CLj43KZG.js";import"./index-CoYxMz83.js";import"./mergeProps-B0ruHaBt.js";import"./SSRProvider-WgX1OZpL.js";import"./clsx-B-dksMZM.js";import"./index-DNkdm6iH.js";import"./index-DU24aX_Y.js";import"./index-pmpj_g-s.js";import"./create-external-store-TtP3UJpK.js";import"./index-By1uWG84.js";import"./client-DMq6HEeJ.js";import"./index-ChKR0baO.js";import"./useFocusRing-DxbV7ayj.js";import"./useHover-CwbhPuzk.js";import"./utils-MOEt33io.js";import"./DOMFunctions-BADGQOBX.js";import"./platform-D4ZP5NBb.js";import"./useFocusWithin-liTmbOsT.js";import"./index-1Wd8D1lN.js";import"./VisuallyHidden-M4IaGOfd.js";import"./useObjectRef-CGprvKsc.js";import"./useRadioGroupState-8UaEwp7Q.js";import"./filterDOMProps-BNnC3YgW.js";import"./useField-Czytcxb7.js";import"./useFocusable-Bw2kAudK.js";import"./useLabel-DdxWw48v.js";import"./useLabels-DgQP2tFk.js";import"./usePress-CpojxGoK.js";import"./FocusScope-Cm1ZOHsy.js";import"./context-BNs4nZYM.js";import"./useControlledState-BVIXsyRA.js";import"./index-Cc8sBhDy.js";import"./index-DdZ9pbD_.js";const h=`import { Radio, RadioGroup } from '@bento/radio';
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
`,e.jsx(i,{language:"tsx",code:p})]})}function te(d={}){const{wrapper:r}={...s(),...d.components};return r?e.jsx(r,{...d,children:e.jsx(o,{...d})}):o(d)}export{te as default};
