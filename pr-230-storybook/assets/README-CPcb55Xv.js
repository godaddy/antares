import{i as e}from"./preload-helper-BnI5NLmJ.js";import{y as t}from"./iframe-C5VV6mQm.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-CzsvrrKm.js";import{t as s}from"./mdx-react-shim-P60IlG4z.js";import{RadioGroupProps as c,RadioProps as l,n as u,t as d}from"./radio.stories-DYkW4Hca.js";var f,p=e((()=>{f=`import { Radio, RadioGroup } from '@bento/radio';
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
`})),m,h=e((()=>{m=`/* v8 ignore next */
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
`})),g,_=e((()=>{g=`import { Radio, RadioGroup } from '@bento/radio';
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
`}));function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(a,{of:u,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`radio`,children:`Radio`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`@bento/radio`}),` package provides accessible, customizable radio controls. It exports the `,(0,b.jsx)(t.strong,{children:`RadioGroup`}),` and `,(0,b.jsx)(t.strong,{children:`Radio`}),` primitives, enabling you to build groups of radio options with consistent keyboard navigation, focus management, and ARIA support.`]}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`RadioGroup`}),` allows a user to select a single item from a list of `,(0,b.jsx)(t.code,{children:`Radio`}),` components.`]}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`Radio`}),` is a single radio option that can be selected by the user.`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/radio
`})}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,b.jsx)(t.code,{children:`RadioGroup`}),` and `,(0,b.jsx)(t.code,{children:`Radio`}),` primitives:`]}),`
`,(0,b.jsx)(t.h3,{id:`radiogroup`,children:`RadioGroup`}),`
`,(0,b.jsx)(i,{of:c}),`
`,(0,b.jsx)(t.h3,{id:`radio-1`,children:`Radio`}),`
`,(0,b.jsx)(i,{of:l}),`
`,(0,b.jsx)(t.h2,{id:`data-attributes-slot-map-and-props`,children:`Data Attributes, Slot Map and Props`}),`
`,(0,b.jsxs)(t.p,{children:[`The data attributes, slot map and props can be used to style and customize the `,(0,b.jsx)(t.code,{children:`RadioGroup`}),` and `,(0,b.jsx)(t.code,{children:`Radio`}),` primitives.`]}),`
`,(0,b.jsxs)(t.h3,{id:`radiogroup-data-attributes`,children:[(0,b.jsx)(t.code,{children:`RadioGroup`}),` Data Attributes`]}),`
`,(0,b.jsxs)(t.table,{children:[(0,b.jsx)(t.thead,{children:(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.th,{children:`Attribute`}),(0,b.jsx)(t.th,{children:`Description`}),(0,b.jsx)(t.th,{children:`Example Values`})]})}),(0,b.jsxs)(t.tbody,{children:[(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-disabled`})}),(0,b.jsx)(t.td,{children:`Indicates the group is disabled`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-readonly`})}),(0,b.jsx)(t.td,{children:`Indicates the group is readonly`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-required`})}),(0,b.jsx)(t.td,{children:`Indicates the group is required`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-invalid`})}),(0,b.jsx)(t.td,{children:`Indicates the group is invalid`}),(0,b.jsx)(t.td,{children:`"true"`})]})]})]}),`
`,(0,b.jsxs)(t.h3,{id:`radio-data-attributes`,children:[(0,b.jsx)(t.code,{children:`Radio`}),` Data Attributes`]}),`
`,(0,b.jsxs)(t.table,{children:[(0,b.jsx)(t.thead,{children:(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.th,{children:`Attribute`}),(0,b.jsx)(t.th,{children:`Description`}),(0,b.jsx)(t.th,{children:`Example Values`})]})}),(0,b.jsxs)(t.tbody,{children:[(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-pressed`})}),(0,b.jsx)(t.td,{children:`Indicates the radio is being pressed`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-hovered`})}),(0,b.jsx)(t.td,{children:`Indicates the radio is hovered`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-focused`})}),(0,b.jsx)(t.td,{children:`Indicates the radio has focus`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-focus-visible`})}),(0,b.jsx)(t.td,{children:`Indicates focus should be visible`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-selected`})}),(0,b.jsx)(t.td,{children:`Indicates the radio is selected`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-disabled`})}),(0,b.jsx)(t.td,{children:`Indicates the radio is disabled`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-readonly`})}),(0,b.jsx)(t.td,{children:`Indicates the radio is readonly`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-invalid`})}),(0,b.jsx)(t.td,{children:`Indicates the radio is invalid`}),(0,b.jsx)(t.td,{children:`"true"`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`data-required`})}),(0,b.jsx)(t.td,{children:`Indicates the radio is required`}),(0,b.jsx)(t.td,{children:`"true"`})]})]})]}),`
`,(0,b.jsxs)(t.h3,{id:`radiogroup-slot-map`,children:[(0,b.jsx)(t.code,{children:`RadioGroup`}),` Slot Map`]}),`
`,(0,b.jsxs)(t.table,{children:[(0,b.jsx)(t.thead,{children:(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.th,{children:`Slot Name`}),(0,b.jsx)(t.th,{children:`Description`})]})}),(0,b.jsxs)(t.tbody,{children:[(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`label`})}),(0,b.jsx)(t.td,{children:`Label for radio group`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`description`})}),(0,b.jsx)(t.td,{children:`Description for radio group`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`error`})}),(0,b.jsx)(t.td,{children:`Error for radio group`})]})]})]}),`
`,(0,b.jsxs)(t.h3,{id:`radio-slot-map`,children:[(0,b.jsx)(t.code,{children:`Radio`}),` Slot Map`]}),`
`,(0,b.jsxs)(t.table,{children:[(0,b.jsx)(t.thead,{children:(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.th,{children:`Slot Name`}),(0,b.jsx)(t.th,{children:`Description`})]})}),(0,b.jsxs)(t.tbody,{children:[(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`icon-checked`})}),(0,b.jsx)(t.td,{children:`Icon for checked radio`})]}),(0,b.jsxs)(t.tr,{children:[(0,b.jsx)(t.td,{children:(0,b.jsx)(t.code,{children:`icon-unchecked`})}),(0,b.jsx)(t.td,{children:`Icon for unchecked radio`})]})]})]}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`uncontrolled`,children:`Uncontrolled`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`RadioGroup`}),` is uncontrolled by default.`]}),`
`,(0,b.jsx)(r,{language:`tsx`,code:f}),`
`,(0,b.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,b.jsxs)(t.p,{children:[`The `,(0,b.jsx)(t.code,{children:`RadioGroup`}),` can be controlled by passing a `,(0,b.jsx)(t.code,{children:`value`}),` and `,(0,b.jsx)(t.code,{children:`onChange`}),` prop.`]}),`
`,(0,b.jsx)(r,{language:`tsx`,code:m}),`
`,(0,b.jsx)(t.h3,{id:`single-radio`,children:`Single Radio`}),`
`,(0,b.jsxs)(t.p,{children:[`Even if you only have one radio option, it must always be placed inside a `,(0,b.jsx)(t.code,{children:`RadioGroup`}),`.`]}),`
`,(0,b.jsx)(r,{language:`tsx`,code:g})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),s(),o(),d(),p(),h(),_()}))();export{y as default};