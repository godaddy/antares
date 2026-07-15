import{i as e}from"./preload-helper-B8AU2ICh.js";import{y as t}from"./iframe-fzqFkTCq.js";import{S as n,c as r,i,l as a,n as o,s,u as c}from"./blocks-CJsVh20i.js";import{t as l}from"./mdx-react-shim-DVkZGdsY.js";import{BasicForm as u,Controlled as d,Props as f,Uncontrolled as p,n as m,t as h}from"./input.stories-B90zh_Zn.js";var g,_=e((()=>{g=`/* v8 ignore next */
import React, { useState } from 'react';
import { Input } from '@bento/input';

export function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      onChange={function ChangeEvent(e) {
        setValue(e.target.value);
      }}
      type="text"
    />
  );
}
`})),v,y=e((()=>{v=`/* v8 ignore next */
import type React from 'react';
import { useState } from 'react';
import { Container } from '@bento/container';
import { Input } from '@bento/input';
import { Text } from '@bento/text';

export function BasicFormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  function handleChange(field: string) {
    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
    return onInputChange;
  }

  return (
    <Container as="form">
      <Text as="h2">Basic Form</Text>

      <Container as="div">
        <Container as="label" htmlFor="name">
          Name
        </Container>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Enter your name"
        />
      </Container>

      <Container as="div">
        <Container as="label" htmlFor="email">
          Email
        </Container>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          required
        />
      </Container>

      <Container as="div">
        <Input
          type="submit"
          onClick={function HandleClick(e) {
            e.preventDefault();
          }}
          value="Submit"
        />
      </Container>

      <Container as="div">
        <Text as="h3">Form Data (live preview):</Text>
        <Container as="pre">{JSON.stringify(formData, null, 2)}</Container>
      </Container>
    </Container>
  );
}
`})),b,x=e((()=>{b=`/* v8 ignore next */
import React from 'react';
import { Input } from '@bento/input';

export function UncontrolledInput() {
  return <Input defaultValue="" type="text" />;
}
`}));function S(e){let t={br:`br`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{of:m,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`input`,children:`Input`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/input`}),` package provides a universal input primitive component that renders an `,(0,w.jsx)(t.code,{children:`<input>`}),` element with React Aria interactions. It supports all HTML input types with proper accessibility, hover, and focus management.`]}),`
`,(0,w.jsx)(t.p,{children:`This primitive is built with accessibility and flexibility in mind, providing state-based render props, comprehensive data attributes, and integration with React Aria's focus and hover hooks. It can be used for text inputs, checkboxes, radio buttons, file uploads, and any other input type supported by HTML.`}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/input
`})}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/input`}),` package exports the `,(0,w.jsx)(t.code,{children:`Input`}),` component:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`import { Input } from '@bento/input';

<Input type="text" placeholder="Enter text" />
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,w.jsx)(t.code,{children:`Input`}),` component:`]}),`
`,(0,w.jsx)(o,{of:f}),`
`,(0,w.jsxs)(t.p,{children:[`For all other properties specified on the `,(0,w.jsx)(t.code,{children:`Input`}),` component, the component
will pass them down to the underlying `,(0,w.jsx)(t.code,{children:`<input>`}),` element. This includes properties
such as `,(0,w.jsx)(t.code,{children:`id`}),`, `,(0,w.jsx)(t.code,{children:`data-*`}),` attributes, or additional ARIA attributes that you might
need for specialized use cases.`]}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`controlled-input`,children:`Controlled Input`}),`
`,(0,w.jsxs)(t.p,{children:[`The most common pattern for the `,(0,w.jsx)(t.code,{children:`Input`}),` component is to use it as a controlled component, where the value is managed by React state. This allows you to easily read and update the input value.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(a,{of:d,inline:!0}),`
`,(0,w.jsx)(i,{of:d}),`
`,(0,w.jsxs)(t.p,{children:[`In this example, the input value is stored in state and updated via the `,(0,w.jsx)(t.code,{children:`onChange`}),` handler. This is the recommended pattern for most use cases where you need to read or validate the input value.`]}),`
`,(0,w.jsx)(t.h3,{id:`uncontrolled-input`,children:`Uncontrolled Input`}),`
`,(0,w.jsxs)(t.p,{children:[`For simpler use cases where you don't need to track the input value in React state, you can use an uncontrolled input with a `,(0,w.jsx)(t.code,{children:`defaultValue`}),`. The DOM will manage the input's value internally.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:b}),`
`,(0,w.jsx)(a,{of:p,inline:!0}),`
`,(0,w.jsx)(i,{of:p}),`
`,(0,w.jsx)(t.p,{children:`Uncontrolled inputs are useful when you only need to read the value on form submission, or when integrating with form libraries that manage values through refs.`}),`
`,(0,w.jsx)(t.h3,{id:`form-example`,children:`Form Example`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Input`}),` component supports all HTML input types, making it versatile for building complete forms. This example demonstrates multiple input types working together in a single form.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v}),`
`,(0,w.jsx)(a,{of:u,inline:!0,collapsed:!0}),`
`,(0,w.jsx)(i,{of:u}),`
`,(0,w.jsxs)(t.p,{children:[`The component intelligently handles type-specific props, ensuring that only relevant attributes are applied to each input type. For example, `,(0,w.jsx)(t.code,{children:`min`}),` and `,(0,w.jsx)(t.code,{children:`max`}),` are only applied to number and range inputs, while `,(0,w.jsx)(t.code,{children:`checked`}),` is only applied to checkbox and radio inputs.`]}),`
`,(0,w.jsx)(t.h2,{id:`usage-guidelines`,children:`Usage Guidelines`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Input`}),` component is a low-level primitive that provides the foundation for building input fields. Understanding when and how to use it will help you create accessible, user-friendly forms.`]}),`
`,(0,w.jsx)(t.h3,{id:`supported-input-types`,children:`Supported Input Types`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Input`}),` component supports all HTML input types:`]}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.strong,{children:`Text-based inputs:`}),` `,(0,w.jsx)(t.code,{children:`text`}),`, `,(0,w.jsx)(t.code,{children:`email`}),`, `,(0,w.jsx)(t.code,{children:`password`}),`, `,(0,w.jsx)(t.code,{children:`url`}),`, `,(0,w.jsx)(t.code,{children:`tel`}),`, `,(0,w.jsx)(t.code,{children:`search`}),(0,w.jsx)(t.br,{}),`
`,(0,w.jsx)(t.strong,{children:`Numeric inputs:`}),` `,(0,w.jsx)(t.code,{children:`number`}),`, `,(0,w.jsx)(t.code,{children:`range`}),(0,w.jsx)(t.br,{}),`
`,(0,w.jsx)(t.strong,{children:`Date/time inputs:`}),` `,(0,w.jsx)(t.code,{children:`date`}),`, `,(0,w.jsx)(t.code,{children:`datetime-local`}),`, `,(0,w.jsx)(t.code,{children:`time`}),`, `,(0,w.jsx)(t.code,{children:`month`}),`, `,(0,w.jsx)(t.code,{children:`week`}),(0,w.jsx)(t.br,{}),`
`,(0,w.jsx)(t.strong,{children:`Choice inputs:`}),` `,(0,w.jsx)(t.code,{children:`checkbox`}),`, `,(0,w.jsx)(t.code,{children:`radio`}),(0,w.jsx)(t.br,{}),`
`,(0,w.jsx)(t.strong,{children:`File input:`}),` `,(0,w.jsx)(t.code,{children:`file`}),(0,w.jsx)(t.br,{}),`
`,(0,w.jsx)(t.strong,{children:`Color input:`}),` `,(0,w.jsx)(t.code,{children:`color`}),(0,w.jsx)(t.br,{}),`
`,(0,w.jsx)(t.strong,{children:`Hidden input:`}),` `,(0,w.jsx)(t.code,{children:`hidden`})]}),`
`,(0,w.jsx)(t.p,{children:`Each input type receives appropriate type-specific props automatically. You don't need to worry about which props are valid for which types—the component handles this for you.`}),`
`,(0,w.jsx)(t.h3,{id:`accessibility-best-practices`,children:`Accessibility Best Practices`}),`
`,(0,w.jsxs)(t.p,{children:[`Always provide labels for your inputs using the `,(0,w.jsx)(t.code,{children:`<label>`}),` element with a matching `,(0,w.jsx)(t.code,{children:`htmlFor`}),` attribute, or by using `,(0,w.jsx)(t.code,{children:`aria-label`}),` or `,(0,w.jsx)(t.code,{children:`aria-labelledby`}),`. Never rely solely on `,(0,w.jsx)(t.code,{children:`placeholder`}),` text for labeling, as it disappears when the user starts typing.`]}),`
`,(0,w.jsxs)(t.p,{children:[`For invalid inputs, set `,(0,w.jsx)(t.code,{children:`aria-invalid`}),` to provide semantic meaning to assistive technologies. Combine this with `,(0,w.jsx)(t.code,{children:`aria-describedby`}),` to reference error messages that explain what went wrong.`]}),`
`,(0,w.jsxs)(t.p,{children:[`Use appropriate input types to enable better mobile keyboards and native browser features. For example, `,(0,w.jsx)(t.code,{children:`type="email"`}),` shows an email-optimized keyboard on mobile devices, while `,(0,w.jsx)(t.code,{children:`type="date"`}),` shows a native date picker.`]}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Input`}),` component is built with accessibility as a core requirement. It provides comprehensive keyboard support, ARIA attributes, and integration with React Aria's focus management system.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Keyboard Navigation`})}),`
`,(0,w.jsxs)(t.p,{children:[`All input types are fully keyboard accessible. Text inputs can be focused with Tab and navigated with arrow keys. Checkboxes and radio buttons can be toggled with Space. The component integrates with React Aria's `,(0,w.jsx)(t.code,{children:`useFocusRing`}),` hook to provide intelligent focus indicators that only appear during keyboard navigation, not mouse clicks.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`Focus Management`})}),`
`,(0,w.jsxs)(t.p,{children:[`The component distinguishes between mouse focus and keyboard focus through the `,(0,w.jsx)(t.code,{children:`isFocused`}),` and `,(0,w.jsx)(t.code,{children:`isFocusVisible`}),` states. This allows you to style focus rings appropriately—showing them only when the user is navigating with a keyboard, which reduces visual noise for mouse users while maintaining accessibility for keyboard users.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`ARIA Support`})}),`
`,(0,w.jsxs)(t.p,{children:[`The component passes through all ARIA attributes you provide, including `,(0,w.jsx)(t.code,{children:`aria-label`}),`, `,(0,w.jsx)(t.code,{children:`aria-labelledby`}),`, `,(0,w.jsx)(t.code,{children:`aria-describedby`}),`, and `,(0,w.jsx)(t.code,{children:`aria-invalid`}),`. These attributes are essential for screen reader users to understand the purpose and state of form fields.`]}),`
`,(0,w.jsx)(t.p,{children:(0,w.jsx)(t.strong,{children:`State Communication`})}),`
`,(0,w.jsx)(t.p,{children:`The component provides comprehensive data attributes that communicate its state to both CSS selectors and assistive technologies. These attributes make it easy to style inputs based on their state and ensure consistent visual feedback.`}),`
`,(0,w.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Input`}),` component is built using the `,(0,w.jsx)(t.code,{children:`@bento/slots`}),` package, allowing you to customize styling based on component state through render props, slots, and data attributes.`]}),`
`,(0,w.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,w.jsx)(t.p,{children:`The component automatically applies data attributes that correspond to its state, allowing you to style with CSS selectors:`}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Attribute`}),(0,w.jsx)(t.th,{children:`Description`}),(0,w.jsx)(t.th,{children:`Example Values`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-focused`})}),(0,w.jsx)(t.td,{children:`Whether the input is focused`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-focus-visible`})}),(0,w.jsx)(t.td,{children:`Whether keyboard focus ring should be visible`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-hovered`})}),(0,w.jsx)(t.td,{children:`Whether the input is hovered`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-disabled`})}),(0,w.jsx)(t.td,{children:`Whether the input is disabled`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-invalid`})}),(0,w.jsx)(t.td,{children:`Whether the input is invalid`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-readonly`})}),(0,w.jsx)(t.td,{children:`Whether the input is read-only`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-required`})}),(0,w.jsx)(t.td,{children:`Whether the input is required`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-empty`})}),(0,w.jsx)(t.td,{children:`Whether the input has no value`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-checked`})}),(0,w.jsx)(t.td,{children:`Whether checkbox/radio is checked`}),(0,w.jsx)(t.td,{children:`"true" / "false"`})]})]})]}),`
`,(0,w.jsx)(t.h3,{id:`slots`,children:`Slots`}),`
`,(0,w.jsxs)(t.p,{children:[`The component is registered as `,(0,w.jsx)(t.code,{children:`BentoInput`}),` in the slots system. While the base Input component doesn't introduce additional slots, it can be extended with slot-based composition for building higher-level components.`]})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),l(),c(),h(),_(),y(),x()}))();export{C as default};