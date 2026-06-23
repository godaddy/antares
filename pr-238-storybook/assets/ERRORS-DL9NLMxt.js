import{i as e}from"./preload-helper-Dcqo6Rym.js";import{y as t}from"./iframe-RGFumGmR.js";import{S as n,s as r,u as i}from"./blocks-DQriG-CP.js";import{t as a}from"./mdx-react-shim-DjyMMXUm.js";import{n as o,t as s}from"./error.stories-CAcR2cNx.js";function c(e){let t={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(r,{of:s,name:`Errors`}),`
`,(0,u.jsx)(t.h1,{id:`errors`,children:`Errors`}),`
`,(0,u.jsx)(t.p,{children:`Our framework is currently throwing the following errors, each error
comes with a unique hash that can be used to link to the documentation page
that explains the error in more detail.`}),`
`,(0,u.jsx)(t.p,{children:`If you are still having trouble understanding the error, please reach out to
our support channel.`}),`
`,(0,u.jsx)(t.h2,{id:`the-supplied-component-s-has-already-been-registered`,children:`The supplied component %s has already been registered.`}),`
`,(0,u.jsx)(`a`,{name:`A6D28`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`@bento/slots`}),` component requires unique names when the component is being
created in the `,(0,u.jsx)(t.code,{children:`withSlots`}),` function. The reason for this is that we want each
component within the system to be able to be targeted with a global slot
override. To find those items, we need to know their names.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-javascript`,children:`import { withSlots } from '@bento/slots';

const YourComponentDeclaration = withSlots(/* This is where the error comes from */, function Component() {
  // Your component logic
});
`})}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.strong,{children:`Error message format`}),`: The actual error will show the specific component name, for example:
`,(0,u.jsx)(t.code,{children:`@bento/slots(withSlots): The supplied component MyComponent has already been registered.`})]}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`The first argument of the `,(0,u.jsx)(t.code,{children:`withSlots`}),` function should be a unique string,
the resulting component stored as `,(0,u.jsx)(t.code,{children:`const`}),` can be named anything.`]}),`
`,(0,u.jsx)(t.li,{children:`You may be loading the same component twice from different sources.`}),`
`,(0,u.jsxs)(t.li,{children:[`SharedComponents might use the same name as the component you are trying to
create. So be mindful of the names you are using, and avoid using generic names
, like `,(0,u.jsx)(t.code,{children:`button`}),`, `,(0,u.jsx)(t.code,{children:`input`}),`, `,(0,u.jsx)(t.code,{children:`container`}),`, etc. You can always prefix or suffix the
name with your package name. For example: `,(0,u.jsx)(t.code,{children:`BentoButton`}),`.`]}),`
`]}),`
`,(0,u.jsxs)(t.blockquote,{children:[`
`,(0,u.jsx)(t.p,{children:`NOTE: This error will only be thrown in non-production environments, this
does not mean that the error is not important.`}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`the-supplied-component-modifier-is-not-a-function`,children:`The supplied component modifier is not a function.`}),`
`,(0,u.jsx)(`a`,{name:`C1D3A4`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`@bento/slots`}),` component allows you to use special modifiers as the third argument
when using the `,(0,u.jsx)(t.code,{children:`withSlots`}),` function. One of the items that is currently supplied
to the array is not a `,(0,u.jsx)(t.code,{children:`function`}),`.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-javascript`,children:`import { withSlots } from '@bento/slots';

const YourComponentDeclaration = withSlots('your-component', function Component() {
  // Your component logic
}, [ /* This is where your error is coming from */ ]);
`})}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:`Double check that you've spelled the name of your modifier correctly`}),`
`,(0,u.jsx)(t.li,{children:`You may have an additional comma at the end of the array that introduces an item.`}),`
`,(0,u.jsxs)(t.li,{children:[`Iterate through all the items and `,(0,u.jsx)(t.code,{children:`console.log`}),` them to see which item breaks.`]}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`missing-required-slot-assignment-overlay-requires-a-child-with-slotcontent`,children:`Missing required slot assignment. Overlay requires a child with slot="content".`}),`
`,(0,u.jsx)(`a`,{name:`33A6A2`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`@bento/overlay`}),` component requires a child with the `,(0,u.jsx)(t.code,{children:`slot="content"`}),` property.
This is because the overlay component needs to display content when it is open.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-javascript`,children:`import { Container } from '@bento/container';
import { Overlay } from '@bento/overlay';

<Overlay>
  <Container slot="content">Content</Container>
</Overlay>
`})}),`
`,(0,u.jsxs)(t.p,{children:[`If you do have a `,(0,u.jsx)(t.code,{children:`slot="content"`}),` property, but you are still getting this error,
it is likely because you are not using a Bento based component. You can use the
`,(0,u.jsx)(t.code,{children:`withSlots`}),` function from `,(0,u.jsx)(t.code,{children:`@bento/slots`}),` to wrap the component and read the
received props using the `,(0,u.jsx)(t.code,{children:`useProps`}),` function from `,(0,u.jsx)(t.code,{children:`@bento/use-props`}),`:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-javascript`,children:`import { useProps } from '@bento/use-props';
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
`,(0,u.jsx)(t.p,{children:`In summary check the following:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[`The child must be a component that is wrapped with the `,(0,u.jsx)(t.code,{children:`withSlots`}),` function.`]}),`
`,(0,u.jsxs)(t.li,{children:[`The child must be a Bento based component that has the `,(0,u.jsx)(t.code,{children:`slot="content"`}),` property.`]}),`
`]})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;e((()=>{u=t(),a(),o(),i()}))();export{l as default};