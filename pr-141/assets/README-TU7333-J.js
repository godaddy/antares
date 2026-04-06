import{j as e}from"./iframe-D2-EpC0g.js";import{useMDXComponents as c}from"./index-DvmY9G4Q.js";import{M as h,A as p,S as i,a as s,f as r}from"./blocks-txxGaFmm.js";import{S as u,P as x,C as o,U as a,B as d}from"./input.stories-DQJOMHaP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8b_sUIU.js";import"./index-COy0Rrls.js";import"./index-bC-EB4tx.js";import"./index-DrFu-skq.js";import"./index-B_kAZNNN.js";import"./slots-BIrwkHM9.js";import"./index-CFXSv1UZ.js";import"./index-CLj43KZG.js";import"./index-DCDGKp71.js";import"./mergeProps-WX8tHxEq.js";import"./clsx-Cdd8U6Z_.js";import"./index-DrDAPgxE.js";import"./index-DlcmEPaU.js";import"./useFocusRing-BUcI9zsp.js";import"./DOMFunctions-DY9RYDsQ.js";import"./useFocusWithin-BnthygDU.js";import"./platform-BULRNHlZ.js";import"./index-DIIcELIU.js";const m=`/* v8 ignore next */
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
`,j=`/* v8 ignore next */
import React, { useState } from 'react';
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
`,b=`/* v8 ignore next */
import React from 'react';
import { Input } from '@bento/input';

export function UncontrolledInput() {
  return <Input defaultValue="" type="text" />;
}
`;function l(n){const t={br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...c(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(h,{of:u,name:"Overview"}),`
`,e.jsx(t.h1,{id:"input",children:"Input"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/input"})," package provides a universal input primitive component that renders an ",e.jsx(t.code,{children:"<input>"})," element with React Aria interactions. It supports all HTML input types with proper accessibility, hover, and focus management."]}),`
`,e.jsx(t.p,{children:"This primitive is built with accessibility and flexibility in mind, providing state-based render props, comprehensive data attributes, and integration with React Aria's focus and hover hooks. It can be used for text inputs, checkboxes, radio buttons, file uploads, and any other input type supported by HTML."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-shell",children:`npm install --save @bento/input
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/input"})," package exports the ",e.jsx(t.code,{children:"Input"})," component:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`import { Input } from '@bento/input';

<Input type="text" placeholder="Enter text" />
`})}),`
`,e.jsxs(t.p,{children:["The following properties are available to be used on the ",e.jsx(t.code,{children:"Input"})," component:"]}),`
`,e.jsx(p,{of:x}),`
`,e.jsxs(t.p,{children:["For all other properties specified on the ",e.jsx(t.code,{children:"Input"}),` component, the component
will pass them down to the underlying `,e.jsx(t.code,{children:"<input>"}),` element. This includes properties
such as `,e.jsx(t.code,{children:"id"}),", ",e.jsx(t.code,{children:"data-*"}),` attributes, or additional ARIA attributes that you might
need for specialized use cases.`]}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"controlled-input",children:"Controlled Input"}),`
`,e.jsxs(t.p,{children:["The most common pattern for the ",e.jsx(t.code,{children:"Input"})," component is to use it as a controlled component, where the value is managed by React state. This allows you to easily read and update the input value."]}),`
`,e.jsx(i,{language:"tsx",code:m}),`
`,e.jsx(s,{of:o,inline:!0}),`
`,e.jsx(r,{of:o}),`
`,e.jsxs(t.p,{children:["In this example, the input value is stored in state and updated via the ",e.jsx(t.code,{children:"onChange"})," handler. This is the recommended pattern for most use cases where you need to read or validate the input value."]}),`
`,e.jsx(t.h3,{id:"uncontrolled-input",children:"Uncontrolled Input"}),`
`,e.jsxs(t.p,{children:["For simpler use cases where you don't need to track the input value in React state, you can use an uncontrolled input with a ",e.jsx(t.code,{children:"defaultValue"}),". The DOM will manage the input's value internally."]}),`
`,e.jsx(i,{language:"tsx",code:b}),`
`,e.jsx(s,{of:a,inline:!0}),`
`,e.jsx(r,{of:a}),`
`,e.jsx(t.p,{children:"Uncontrolled inputs are useful when you only need to read the value on form submission, or when integrating with form libraries that manage values through refs."}),`
`,e.jsx(t.h3,{id:"form-example",children:"Form Example"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Input"})," component supports all HTML input types, making it versatile for building complete forms. This example demonstrates multiple input types working together in a single form."]}),`
`,e.jsx(i,{language:"tsx",code:j}),`
`,e.jsx(s,{of:d,inline:!0,collapsed:!0}),`
`,e.jsx(r,{of:d}),`
`,e.jsxs(t.p,{children:["The component intelligently handles type-specific props, ensuring that only relevant attributes are applied to each input type. For example, ",e.jsx(t.code,{children:"min"})," and ",e.jsx(t.code,{children:"max"})," are only applied to number and range inputs, while ",e.jsx(t.code,{children:"checked"})," is only applied to checkbox and radio inputs."]}),`
`,e.jsx(t.h2,{id:"usage-guidelines",children:"Usage Guidelines"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Input"})," component is a low-level primitive that provides the foundation for building input fields. Understanding when and how to use it will help you create accessible, user-friendly forms."]}),`
`,e.jsx(t.h3,{id:"supported-input-types",children:"Supported Input Types"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Input"})," component supports all HTML input types:"]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Text-based inputs:"})," ",e.jsx(t.code,{children:"text"}),", ",e.jsx(t.code,{children:"email"}),", ",e.jsx(t.code,{children:"password"}),", ",e.jsx(t.code,{children:"url"}),", ",e.jsx(t.code,{children:"tel"}),", ",e.jsx(t.code,{children:"search"}),e.jsx(t.br,{}),`
`,e.jsx(t.strong,{children:"Numeric inputs:"})," ",e.jsx(t.code,{children:"number"}),", ",e.jsx(t.code,{children:"range"}),e.jsx(t.br,{}),`
`,e.jsx(t.strong,{children:"Date/time inputs:"})," ",e.jsx(t.code,{children:"date"}),", ",e.jsx(t.code,{children:"datetime-local"}),", ",e.jsx(t.code,{children:"time"}),", ",e.jsx(t.code,{children:"month"}),", ",e.jsx(t.code,{children:"week"}),e.jsx(t.br,{}),`
`,e.jsx(t.strong,{children:"Choice inputs:"})," ",e.jsx(t.code,{children:"checkbox"}),", ",e.jsx(t.code,{children:"radio"}),e.jsx(t.br,{}),`
`,e.jsx(t.strong,{children:"File input:"})," ",e.jsx(t.code,{children:"file"}),e.jsx(t.br,{}),`
`,e.jsx(t.strong,{children:"Color input:"})," ",e.jsx(t.code,{children:"color"}),e.jsx(t.br,{}),`
`,e.jsx(t.strong,{children:"Hidden input:"})," ",e.jsx(t.code,{children:"hidden"})]}),`
`,e.jsx(t.p,{children:"Each input type receives appropriate type-specific props automatically. You don't need to worry about which props are valid for which types—the component handles this for you."}),`
`,e.jsx(t.h3,{id:"accessibility-best-practices",children:"Accessibility Best Practices"}),`
`,e.jsxs(t.p,{children:["Always provide labels for your inputs using the ",e.jsx(t.code,{children:"<label>"})," element with a matching ",e.jsx(t.code,{children:"htmlFor"})," attribute, or by using ",e.jsx(t.code,{children:"aria-label"})," or ",e.jsx(t.code,{children:"aria-labelledby"}),". Never rely solely on ",e.jsx(t.code,{children:"placeholder"})," text for labeling, as it disappears when the user starts typing."]}),`
`,e.jsxs(t.p,{children:["For invalid inputs, set ",e.jsx(t.code,{children:"aria-invalid"})," to provide semantic meaning to assistive technologies. Combine this with ",e.jsx(t.code,{children:"aria-describedby"})," to reference error messages that explain what went wrong."]}),`
`,e.jsxs(t.p,{children:["Use appropriate input types to enable better mobile keyboards and native browser features. For example, ",e.jsx(t.code,{children:'type="email"'})," shows an email-optimized keyboard on mobile devices, while ",e.jsx(t.code,{children:'type="date"'})," shows a native date picker."]}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Input"})," component is built with accessibility as a core requirement. It provides comprehensive keyboard support, ARIA attributes, and integration with React Aria's focus management system."]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Keyboard Navigation"})}),`
`,e.jsxs(t.p,{children:["All input types are fully keyboard accessible. Text inputs can be focused with Tab and navigated with arrow keys. Checkboxes and radio buttons can be toggled with Space. The component integrates with React Aria's ",e.jsx(t.code,{children:"useFocusRing"})," hook to provide intelligent focus indicators that only appear during keyboard navigation, not mouse clicks."]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Focus Management"})}),`
`,e.jsxs(t.p,{children:["The component distinguishes between mouse focus and keyboard focus through the ",e.jsx(t.code,{children:"isFocused"})," and ",e.jsx(t.code,{children:"isFocusVisible"})," states. This allows you to style focus rings appropriately—showing them only when the user is navigating with a keyboard, which reduces visual noise for mouse users while maintaining accessibility for keyboard users."]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"ARIA Support"})}),`
`,e.jsxs(t.p,{children:["The component passes through all ARIA attributes you provide, including ",e.jsx(t.code,{children:"aria-label"}),", ",e.jsx(t.code,{children:"aria-labelledby"}),", ",e.jsx(t.code,{children:"aria-describedby"}),", and ",e.jsx(t.code,{children:"aria-invalid"}),". These attributes are essential for screen reader users to understand the purpose and state of form fields."]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"State Communication"})}),`
`,e.jsx(t.p,{children:"The component provides comprehensive data attributes that communicate its state to both CSS selectors and assistive technologies. These attributes make it easy to style inputs based on their state and ensure consistent visual feedback."}),`
`,e.jsx(t.h2,{id:"customization",children:"Customization"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Input"})," component is built using the ",e.jsx(t.code,{children:"@bento/slots"})," package, allowing you to customize styling based on component state through render props, slots, and data attributes."]}),`
`,e.jsx(t.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(t.p,{children:"The component automatically applies data attributes that correspond to its state, allowing you to style with CSS selectors:"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Attribute"}),e.jsx(t.th,{children:"Description"}),e.jsx(t.th,{children:"Example Values"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-focused"})}),e.jsx(t.td,{children:"Whether the input is focused"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-focus-visible"})}),e.jsx(t.td,{children:"Whether keyboard focus ring should be visible"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-hovered"})}),e.jsx(t.td,{children:"Whether the input is hovered"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-disabled"})}),e.jsx(t.td,{children:"Whether the input is disabled"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-invalid"})}),e.jsx(t.td,{children:"Whether the input is invalid"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-readonly"})}),e.jsx(t.td,{children:"Whether the input is read-only"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-required"})}),e.jsx(t.td,{children:"Whether the input is required"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-empty"})}),e.jsx(t.td,{children:"Whether the input has no value"}),e.jsx(t.td,{children:'"true" / "false"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-checked"})}),e.jsx(t.td,{children:"Whether checkbox/radio is checked"}),e.jsx(t.td,{children:'"true" / "false"'})]})]})]}),`
`,e.jsx(t.h3,{id:"slots",children:"Slots"}),`
`,e.jsxs(t.p,{children:["The component is registered as ",e.jsx(t.code,{children:"BentoInput"})," in the slots system. While the base Input component doesn't introduce additional slots, it can be extended with slot-based composition for building higher-level components."]})]})}function z(n={}){const{wrapper:t}={...c(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(l,{...n})}):l(n)}export{z as default};
