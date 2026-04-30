import{j as e}from"./iframe-DY2JU6yu.js";import{useMDXComponents as r}from"./index-vMp9Gci6.js";import{S as s}from"./error.stories-BnL-pb0I.js";import{M as i}from"./blocks-DR5RAoBv.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CLj43KZG.js";import"./index-B6XwFIy4.js";import"./index-DOyM4hZy.js";import"./index-CwLu9-2K.js";function t(o){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:s,name:"Errors"}),`
`,e.jsx(n.h1,{id:"errors",children:"Errors"}),`
`,e.jsx(n.p,{children:`Our framework is currently throwing the following errors, each error
comes with a unique hash that can be used to link to the documentation page
that explains the error in more detail.`}),`
`,e.jsx(n.p,{children:`If you are still having trouble understanding the error, please reach out to
our support channel.`}),`
`,e.jsx(n.h2,{id:"the-supplied-component-s-has-already-been-registered",children:"The supplied component %s has already been registered."}),`
`,e.jsx("a",{name:"A6D28"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/slots"}),` component requires unique names when the component is being
created in the `,e.jsx(n.code,{children:"withSlots"}),` function. The reason for this is that we want each
component within the system to be able to be targeted with a global slot
override. To find those items, we need to know their names.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { withSlots } from '@bento/slots';

const YourComponentDeclaration = withSlots(/* This is where the error comes from */, function Component() {
  // Your component logic
});
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Error message format"}),`: The actual error will show the specific component name, for example:
`,e.jsx(n.code,{children:"@bento/slots(withSlots): The supplied component MyComponent has already been registered."})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The first argument of the ",e.jsx(n.code,{children:"withSlots"}),` function should be a unique string,
the resulting component stored as `,e.jsx(n.code,{children:"const"})," can be named anything."]}),`
`,e.jsx(n.li,{children:"You may be loading the same component twice from different sources."}),`
`,e.jsxs(n.li,{children:[`SharedComponents might use the same name as the component you are trying to
create. So be mindful of the names you are using, and avoid using generic names
, like `,e.jsx(n.code,{children:"button"}),", ",e.jsx(n.code,{children:"input"}),", ",e.jsx(n.code,{children:"container"}),`, etc. You can always prefix or suffix the
name with your package name. For example: `,e.jsx(n.code,{children:"BentoButton"}),"."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`NOTE: This error will only be thrown in non-production environments, this
does not mean that the error is not important.`}),`
`]}),`
`,e.jsx(n.h2,{id:"the-supplied-component-modifier-is-not-a-function",children:"The supplied component modifier is not a function."}),`
`,e.jsx("a",{name:"C1D3A4"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/slots"}),` component allows you to use special modifiers as the third argument
when using the `,e.jsx(n.code,{children:"withSlots"}),` function. One of the items that is currently supplied
to the array is not a `,e.jsx(n.code,{children:"function"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { withSlots } from '@bento/slots';

const YourComponentDeclaration = withSlots('your-component', function Component() {
  // Your component logic
}, [ /* This is where your error is coming from */ ]);
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Double check that you've spelled the name of your modifier correctly"}),`
`,e.jsx(n.li,{children:"You may have an additional comma at the end of the array that introduces an item."}),`
`,e.jsxs(n.li,{children:["Iterate through all the items and ",e.jsx(n.code,{children:"console.log"})," them to see which item breaks."]}),`
`]}),`
`,e.jsx(n.h2,{id:"missing-required-slot-assignment-overlay-requires-a-child-with-slotcontent",children:'Missing required slot assignment. Overlay requires a child with slot="content".'}),`
`,e.jsx("a",{name:"33A6A2"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/overlay"})," component requires a child with the ",e.jsx(n.code,{children:'slot="content"'}),` property.
This is because the overlay component needs to display content when it is open.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { Container } from '@bento/container';
import { Overlay } from '@bento/overlay';

<Overlay>
  <Container slot="content">Content</Container>
</Overlay>
`})}),`
`,e.jsxs(n.p,{children:["If you do have a ",e.jsx(n.code,{children:'slot="content"'}),` property, but you are still getting this error,
it is likely because you are not using a Bento based component. You can use the
`,e.jsx(n.code,{children:"withSlots"})," function from ",e.jsx(n.code,{children:"@bento/slots"}),` to wrap the component and read the
received props using the `,e.jsx(n.code,{children:"useProps"})," function from ",e.jsx(n.code,{children:"@bento/use-props"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Overlay } from '@bento/overlay';

const Content = withSlots('Content', function Content(...args) {
  const { apply } = useProps(args);

  return <Container { ...apply({ className: 'my-content-container' })} />;
});

<Overlay>
  <Content slot="content">Content</Content>
</Overlay>
`})}),`
`,e.jsx(n.p,{children:"In summary check the following:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The child must be a component that is wrapped with the ",e.jsx(n.code,{children:"withSlots"})," function."]}),`
`,e.jsxs(n.li,{children:["The child must be a Bento based component that has the ",e.jsx(n.code,{children:'slot="content"'})," property."]}),`
`]})]})}function j(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{j as default};
