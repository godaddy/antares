import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-DngYp88K.js";import{S as n,s as r,u as i}from"./blocks-xvnfn_hA.js";import{t as a}from"./mdx-react-shim-CAuTOnCQ.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,img:`img`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Divider`}),`
`,(0,c.jsx)(t.h1,{id:`divider-primitive`,children:`Divider Primitive`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsx)(t.p,{children:`The purpose of the Divider primitive is to provide a visual separator between sections of content in a user interface. It helps to organize content and improve readability by creating clear visual and semantic distinctions between different areas of the UI.`}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsx)(t.p,{children:`The Divider primitive exists primarily as a visual separator. Its ability to be set vertically or horizontally makes it unique and adaptable to many different layouts. This primitive does not require any additional interaction logic.`}),`
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsxs)(t.p,{children:[`The following is the proposed implementation of the Divider primitive, which is a simple component that renders a horizontal or vertical line to separate content. It uses the `,(0,c.jsx)(t.code,{children:`<hr>`}),` element and applies the appropriate styles based on the `,(0,c.jsx)(t.code,{children:`orientation`}),` prop, which affects the `,(0,c.jsx)(t.code,{children:`aria-orientation`}),` directly. `,(0,c.jsx)(t.code,{children:`useId`}),` is also used to generate a unique identifier for the divider, which is useful to ensure there are no conflicts with other elements in the DOM. The user may override the id if they wish to provide their own unique identifier with the `,(0,c.jsx)(t.code,{children:`id`}),` prop spread with the `,(0,c.jsx)(t.code,{children:`rest`}),` props.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import React, { useId } from 'react';

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
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`.divider[aria-orientation='horizontal'] {
  /* styles for horizontal divider */
}

.divider[aria-orientation='vertical'] {
  /* styles for vertical divider */
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`api`,children:`API`}),`
`,(0,c.jsxs)(t.p,{children:[`The API for the Bento `,(0,c.jsx)(t.code,{children:`Divider`}),` will be composed of the Native DOM `,(0,c.jsx)(t.code,{children:`hr`}),` props as well as the `,(0,c.jsx)(t.code,{children:`orientation`}),` prop, allowing the user to customize the divider's behavior and appearance.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`interface DividerProps extends ComponentProps<'hr'> {
  orientation?: 'horizontal' | 'vertical';
}
`})}),`
`,(0,c.jsx)(t.h4,{id:`props`,children:`Props`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Prop`}),(0,c.jsx)(t.th,{children:`Type`}),(0,c.jsx)(t.th,{children:`Default`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`orientation`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`'horizontal', 'vertical'`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`'horizontal'`})}),(0,c.jsx)(t.td,{children:`Controls the visual orientation of the divider.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`className`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`string`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`undefined`})}),(0,c.jsx)(t.td,{children:`Custom CSS class to apply to the divider.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`id`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`string`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`undefined`})}),(0,c.jsx)(t.td,{children:`Unique identifier for the divider element.`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsxs)(t.p,{children:[`The Divider primitive is a simple yet versatile component that is primarily composed of a single `,(0,c.jsx)(t.code,{children:`<hr>`}),` HTML element. It can be styled and extended to fit various design requirements, but the basic styles applied will ensure the `,(0,c.jsx)(t.code,{children:`orientation`}),` of the divider with the help of the `,(0,c.jsx)(t.code,{children:`aria-orientation`}),` attribute.`]}),`
`,(0,c.jsx)(t.p,{children:`The Divider primitive is designed to be flexible and reusable across various components and layouts. It can be used in different contexts, such as:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Between the area code and phone number in a telephone input.`}),`
`,(0,c.jsx)(t.li,{children:`As a menu list separator.`}),`
`,(0,c.jsx)(t.li,{children:`Between the rows in tables or lists.`}),`
`,(0,c.jsxs)(t.li,{children:[`For visual separation of content areas beyond our components.`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[`The following is an example of two form fields with a divider between them. This form field also demonstrates the use case of a `,(0,c.jsx)(t.code,{children:`Divider`}),` being used as a primitive in a separator composition to indicate that either one or the other of the form fields is required, but not both. To create this composition, a user should wrap two `,(0,c.jsx)(t.code,{children:`Divider`}),`s in a div with a `,(0,c.jsx)(t.code,{children:`role=separator`}),` attribute on it (since the whole composition would be used as a visual separator), and include the content between the two `,(0,c.jsx)(t.code,{children:`Divider`}),`s This example comes from the Geeks for Geeks website.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.img,{src:`/docs/assets/divider-children.png`,alt:`Children form field example`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<div role="separator" className="form-field-separator">
  <Divider />
  <span>or</span>
  <Divider />
</div>
`})}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsx)(t.p,{children:`As a separator between large sections of content, such as between the body and footer of a page.`}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsxs)(t.p,{children:[`The Divider primitive does not leverage React Aria, more specifically React Aria's `,(0,c.jsx)(t.code,{children:`useSeparator`}),` hook, to handle separator behavior because it does not support vertical `,(0,c.jsx)(t.code,{children:`hr`}),` dividers. Vertical `,(0,c.jsx)(t.code,{children:`hr`}),` elements are semantically correct when given the correct `,(0,c.jsx)(t.code,{children:`aria-orientation`}),` attribute, as described in this `,(0,c.jsx)(t.a,{href:`https://www.sarasoueidan.com/blog/horizontal-rules/#styling-with-css`,rel:`nofollow`,children:`article on accessible horizontal rules by Sara Soueidan`}),`. I am following the accessibility guidance provided in that article to ensure that the Divider primitive meets ARIA standards for separators and is as simple as possible.`]}),`
`,(0,c.jsx)(t.h2,{id:`architecture--features`,children:`Architecture & Features`}),`
`,(0,c.jsx)(t.h3,{id:`accessibility-highlights`,children:`Accessibility Highlights`}),`
`,(0,c.jsx)(t.p,{children:`The Divider primitive is designed with accessibility in mind to ensure that it meets ARIA standards for separators. Key accessibility features include:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Semantic HTML`}),`: The element type used in the `,(0,c.jsx)(t.code,{children:`Divider`}),` composition is `,(0,c.jsx)(t.code,{children:`<hr>`}),`, which is semantically appropriate for horizontal dividers or vertical dividers with `,(0,c.jsx)(t.code,{children:`aria-orientation='vertical'`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ARIA Attributes`}),`: The attribute `,(0,c.jsx)(t.code,{children:`aria-orientation`}),` is always applied to communicate the divider's orientation to assistive technologies. The attribute `,(0,c.jsx)(t.code,{children:`role="separator"`}),` is not necessary when using the `,(0,c.jsx)(t.code,{children:`<hr>`}),` element, as it is already recognized as a separator by assistive technologies.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Keyboard Navigation`}),`: The divider does not interfere with keyboard navigation, as it is a non-interactive element. It can be used in conjunction with other interactive components without disrupting focus management.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus Management`}),`: Since the divider is not an interactive element, it does not receive focus. However, it can be used in conjunction with focusable elements without affecting their behavior.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Screen Reader Support`}),`: The `,(0,c.jsx)(t.code,{children:`aria-orientation`}),` attribute ensures that screen readers announce the divider correctly, providing context to users with visual impairments.`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`internationalization-rtl-and-mobile-considerations`,children:`Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsx)(t.p,{children:`The following considerations are made for internationalization, RTL support, and mobile responsiveness:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Internationalization`}),`: This is a non-text component, so there's no need to worry about text direction.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`RTL Support`}),`: This component is not text-based, so there's no need to worry about text direction.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Mobile Responsiveness`}),`: Dividers should maintain their visual appearance on mobile devices. There are possible styling considerations for sufficient thickness and contrast to be visible on smaller screens however. This can be achieved either by allowing style variants to this component, or by simply allowing the user to pass in a custom className to apply their own styles.`]}),`
`]}),`
`,(0,c.jsx)(t.h3,{id:`attributes`,children:`Attributes`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Applied When`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsx)(t.tbody,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-orientation`})}),(0,c.jsx)(t.td,{children:`Always.`}),(0,c.jsxs)(t.td,{children:[`Communicates the orientation to assistive technologies. Matches the `,(0,c.jsx)(t.code,{children:`orientation`}),` prop value (`,(0,c.jsx)(t.code,{children:`horizontal`}),` or `,(0,c.jsx)(t.code,{children:`vertical`}),`, defaulting to `,(0,c.jsx)(t.code,{children:`horizontal`}),`).`]})]})})]}),`
`,(0,c.jsx)(t.h3,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h4,{id:`default`,children:`Default`}),`
`,(0,c.jsxs)(t.p,{children:[`The following example shows a basic horizontal divider using the default element type `,(0,c.jsx)(t.code,{children:`hr`}),`, which renders horizontally by default.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`function DefaultDivider(props: DividerProps) {
  return (
    <Divider {...props} />
  );
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`This will render as an `,(0,c.jsx)(t.code,{children:`<hr>`}),` element, which is semantically appropriate for horizontal dividers. The `,(0,c.jsx)(t.code,{children:`aria-orientation`}),` attribute is not necessary but allows us to target it specifically in our styles.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<hr aria-orientation="horizontal" className="divider" />
`})}),`
`,(0,c.jsx)(t.h4,{id:`vertical-divider`,children:`Vertical Divider`}),`
`,(0,c.jsxs)(t.p,{children:[`The following example shows how to create a vertical divider by setting the `,(0,c.jsx)(t.code,{children:`orientation`}),` prop to `,(0,c.jsx)(t.code,{children:`vertical`}),`.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`function VerticalDivider(props: DividerProps) {
  return (
    <Divider {...props} orientation="vertical" />
  );
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`This will render the divider as `,(0,c.jsx)(t.code,{children:`hr`}),` component with a vertical line, with the aria attribute `,(0,c.jsx)(t.code,{children:`aria-orientation="vertical"`}),`. Since it renders as a `,(0,c.jsx)(t.code,{children:`hr`}),`, it does not need to include the `,(0,c.jsx)(t.code,{children:`role="separator"`}),` attribute for accessibility. The `,(0,c.jsx)(t.code,{children:`aria-orientation`}),` attribute is sufficient to indicate the orientation to assistive technologies and allows us to target it in our styles.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<hr aria-orientation="vertical" className="divider" />
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};