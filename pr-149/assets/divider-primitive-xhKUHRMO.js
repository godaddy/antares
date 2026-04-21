import{j as e}from"./iframe-DsdbgEAN.js";import{useMDXComponents as r}from"./index-D4CwabMa.js";import{M as s}from"./blocks-B4KeIAem.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CWBbxuIh.js";import"./index-CkUPM2qk.js";import"./index-uRl_K3Uj.js";import"./index-DrFu-skq.js";function t(n){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Architecture/PDRs/Divider"}),`
`,e.jsx(i.h1,{id:"divider-primitive",children:"Divider Primitive"}),`
`,e.jsx(i.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsx(i.p,{children:"The purpose of the Divider primitive is to provide a visual separator between sections of content in a user interface. It helps to organize content and improve readability by creating clear visual and semantic distinctions between different areas of the UI."}),`
`,e.jsx(i.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsx(i.p,{children:"The Divider primitive exists primarily as a visual separator. Its ability to be set vertically or horizontally makes it unique and adaptable to many different layouts. This primitive does not require any additional interaction logic."}),`
`,e.jsx(i.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsxs(i.p,{children:["The following is the proposed implementation of the Divider primitive, which is a simple component that renders a horizontal or vertical line to separate content. It uses the ",e.jsx(i.code,{children:"<hr>"})," element and applies the appropriate styles based on the ",e.jsx(i.code,{children:"orientation"})," prop, which affects the ",e.jsx(i.code,{children:"aria-orientation"})," directly. ",e.jsx(i.code,{children:"useId"})," is also used to generate a unique identifier for the divider, which is useful to ensure there are no conflicts with other elements in the DOM. The user may override the id if they wish to provide their own unique identifier with the ",e.jsx(i.code,{children:"id"})," prop spread with the ",e.jsx(i.code,{children:"rest"})," props."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`import React, { useId } from 'react';

export default function Divider(props: DividerProps) {
  const { orientation = 'horizontal', className, ...rest } = props;
  const id = useId();

  return (
    <hr
      id={ id }
      className={['divider', className].filter(Boolean).join(' ')}
      aria-orientation={ orientation === 'vertical' ? orientation : 'horizontal' }
      { ...rest }
    />
  );
}
`})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-css",children:`.divider[aria-orientation='horizontal'] {
  /* styles for horizontal divider */
}

.divider[aria-orientation='vertical'] {
  /* styles for vertical divider */
}
`})}),`
`,e.jsx(i.h3,{id:"api",children:"API"}),`
`,e.jsxs(i.p,{children:["The API for the Bento ",e.jsx(i.code,{children:"Divider"})," will be composed of the Native DOM ",e.jsx(i.code,{children:"hr"})," props as well as the ",e.jsx(i.code,{children:"orientation"})," prop, allowing the user to customize the divider's behavior and appearance."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`interface DividerProps extends ComponentProps<'hr'> {
  orientation?: 'horizontal' | 'vertical';
}
`})}),`
`,e.jsx(i.h4,{id:"props",children:"Props"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Prop"}),e.jsx(i.th,{children:"Type"}),e.jsx(i.th,{children:"Default"}),e.jsx(i.th,{children:"Description"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"orientation"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"'horizontal', 'vertical'"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"'horizontal'"})}),e.jsx(i.td,{children:"Controls the visual orientation of the divider."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"className"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"string"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"undefined"})}),e.jsx(i.td,{children:"Custom CSS class to apply to the divider."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"id"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"string"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"undefined"})}),e.jsx(i.td,{children:"Unique identifier for the divider element."})]})]})]}),`
`,e.jsx(i.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsxs(i.p,{children:["The Divider primitive is a simple yet versatile component that is primarily composed of a single ",e.jsx(i.code,{children:"<hr>"})," HTML element. It can be styled and extended to fit various design requirements, but the basic styles applied will ensure the ",e.jsx(i.code,{children:"orientation"})," of the divider with the help of the ",e.jsx(i.code,{children:"aria-orientation"})," attribute."]}),`
`,e.jsx(i.p,{children:"The Divider primitive is designed to be flexible and reusable across various components and layouts. It can be used in different contexts, such as:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Between the area code and phone number in a telephone input."}),`
`,e.jsx(i.li,{children:"As a menu list separator."}),`
`,e.jsx(i.li,{children:"Between the rows in tables or lists."}),`
`,e.jsxs(i.li,{children:["For visual separation of content areas beyond our components.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["The following is an example of two form fields with a divider between them. This form field also demonstrates the use case of a ",e.jsx(i.code,{children:"Divider"})," being used as a primitive in a separator composition to indicate that either one or the other of the form fields is required, but not both. To create this composition, a user should wrap two ",e.jsx(i.code,{children:"Divider"}),"s in a div with a ",e.jsx(i.code,{children:"role=separator"})," attribute on it (since the whole composition would be used as a visual separator), and include the content between the two ",e.jsx(i.code,{children:"Divider"}),"s This example comes from the Geeks for Geeks website."]}),`
`,e.jsx(i.p,{children:e.jsx(i.img,{src:"/docs/assets/divider-children.png",alt:"Children form field example"})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<div role="separator" className="form-field-separator">
  <Divider />
  <span>or</span>
  <Divider />
</div>
`})}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"As a separator between large sections of content, such as between the body and footer of a page."}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(i.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsxs(i.p,{children:["The Divider primitive does not leverage React Aria, more specifically React Aria's ",e.jsx(i.code,{children:"useSeparator"})," hook, to handle separator behavior because it does not support vertical ",e.jsx(i.code,{children:"hr"})," dividers. Vertical ",e.jsx(i.code,{children:"hr"})," elements are semantically correct when given the correct ",e.jsx(i.code,{children:"aria-orientation"})," attribute, as described in this ",e.jsx(i.a,{href:"https://www.sarasoueidan.com/blog/horizontal-rules/#styling-with-css",rel:"nofollow",children:"article on accessible horizontal rules by Sara Soueidan"}),". I am following the accessibility guidance provided in that article to ensure that the Divider primitive meets ARIA standards for separators and is as simple as possible."]}),`
`,e.jsx(i.h2,{id:"architecture--features",children:"Architecture & Features"}),`
`,e.jsx(i.h3,{id:"accessibility-highlights",children:"Accessibility Highlights"}),`
`,e.jsx(i.p,{children:"The Divider primitive is designed with accessibility in mind to ensure that it meets ARIA standards for separators. Key accessibility features include:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Semantic HTML"}),": The element type used in the ",e.jsx(i.code,{children:"Divider"})," composition is ",e.jsx(i.code,{children:"<hr>"}),", which is semantically appropriate for horizontal dividers or vertical dividers with ",e.jsx(i.code,{children:"aria-orientation='vertical'"}),"."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"ARIA Attributes"}),": The attribute ",e.jsx(i.code,{children:"aria-orientation"})," is always applied to communicate the divider's orientation to assistive technologies. The attribute ",e.jsx(i.code,{children:'role="separator"'})," is not necessary when using the ",e.jsx(i.code,{children:"<hr>"})," element, as it is already recognized as a separator by assistive technologies."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Keyboard Navigation"}),": The divider does not interfere with keyboard navigation, as it is a non-interactive element. It can be used in conjunction with other interactive components without disrupting focus management."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Focus Management"}),": Since the divider is not an interactive element, it does not receive focus. However, it can be used in conjunction with focusable elements without affecting their behavior."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Screen Reader Support"}),": The ",e.jsx(i.code,{children:"aria-orientation"})," attribute ensures that screen readers announce the divider correctly, providing context to users with visual impairments."]}),`
`]}),`
`,e.jsx(i.h3,{id:"internationalization-rtl-and-mobile-considerations",children:"Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsx(i.p,{children:"The following considerations are made for internationalization, RTL support, and mobile responsiveness:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Internationalization"}),": This is a non-text component, so there's no need to worry about text direction."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"RTL Support"}),": This component is not text-based, so there's no need to worry about text direction."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Mobile Responsiveness"}),": Dividers should maintain their visual appearance on mobile devices. There are possible styling considerations for sufficient thickness and contrast to be visible on smaller screens however. This can be achieved either by allowing style variants to this component, or by simply allowing the user to pass in a custom className to apply their own styles."]}),`
`]}),`
`,e.jsx(i.h3,{id:"attributes",children:"Attributes"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Attribute"}),e.jsx(i.th,{children:"Applied When"}),e.jsx(i.th,{children:"Description"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"aria-orientation"})}),e.jsx(i.td,{children:"Always."}),e.jsxs(i.td,{children:["Communicates the orientation to assistive technologies. Matches the ",e.jsx(i.code,{children:"orientation"})," prop value (",e.jsx(i.code,{children:"horizontal"})," or ",e.jsx(i.code,{children:"vertical"}),", defaulting to ",e.jsx(i.code,{children:"horizontal"}),")."]})]})})]}),`
`,e.jsx(i.h3,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(i.h4,{id:"default",children:"Default"}),`
`,e.jsxs(i.p,{children:["The following example shows a basic horizontal divider using the default element type ",e.jsx(i.code,{children:"hr"}),", which renders horizontally by default."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`function DefaultDivider(props: DividerProps) {
  return (
    <Divider {...props} />
  );
}
`})}),`
`,e.jsxs(i.p,{children:["This will render as an ",e.jsx(i.code,{children:"<hr>"})," element, which is semantically appropriate for horizontal dividers. The ",e.jsx(i.code,{children:"aria-orientation"})," attribute is not necessary but allows us to target it specifically in our styles."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<hr aria-orientation="horizontal" className="divider" />
`})}),`
`,e.jsx(i.h4,{id:"vertical-divider",children:"Vertical Divider"}),`
`,e.jsxs(i.p,{children:["The following example shows how to create a vertical divider by setting the ",e.jsx(i.code,{children:"orientation"})," prop to ",e.jsx(i.code,{children:"vertical"}),"."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`function VerticalDivider(props: DividerProps) {
  return (
    <Divider {...props} orientation="vertical" />
  );
}
`})}),`
`,e.jsxs(i.p,{children:["This will render the divider as ",e.jsx(i.code,{children:"hr"})," component with a vertical line, with the aria attribute ",e.jsx(i.code,{children:'aria-orientation="vertical"'}),". Since it renders as a ",e.jsx(i.code,{children:"hr"}),", it does not need to include the ",e.jsx(i.code,{children:'role="separator"'})," attribute for accessibility. The ",e.jsx(i.code,{children:"aria-orientation"})," attribute is sufficient to indicate the orientation to assistive technologies and allows us to target it in our styles."]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<hr aria-orientation="vertical" className="divider" />
`})})]})}function u(n={}){const{wrapper:i}={...r(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{u as default};
