import{i as e}from"./preload-helper-Dcqo6Rym.js";import{y as t}from"./iframe-RGFumGmR.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DQriG-CP.js";import{t as c}from"./mdx-react-shim-DjyMMXUm.js";import{MemoProps as l,RenderProps as u,n as d,t as f}from"./props.stories-BhcWF0pU.js";var p,m=e((()=>{p=`/* v8 ignore next */
import { useCallback } from 'react';
import { type UnknownObject } from '@bento/types';
import { Button } from './button.tsx';

/**
 * Memo component demonstrating class name composition with useCallback.
 *
 * @param {UnknownObject} props - The component props.
 * @returns {JSX.Element} The rendered button with composed class names.
 * @public
 */
export function Memo(props: UnknownObject) {
  const className = useCallback(
    function renderProps({ original }: { original: string }) {
      return [original, 'my-className', props.className].filter(Boolean).join(' ');
    },
    [props.className]
  );

  return (
    <Button className={className} as="a" href="https://example.com" target="_blank">
      This button has a different class Name
    </Button>
  );
}
`}));function h(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(o,{of:d,name:`Concepts`}),`
`,(0,_.jsx)(t.h1,{id:`render-props`,children:`Render Props`}),`
`,(0,_.jsxs)(t.p,{children:[`Render props allows you to define `,(0,_.jsx)(t.strong,{children:`any prop as a function`}),`. The Bento based
component will execute this function and the return value will be used as the
prop value. Render props are a powerful technique to customize the rendering of
a component. They allow you to take control over the rendering of a component
without the need to extend the component using slots or creating a custom
component.`]}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`// Fat arrow only for illustration purposes, see best practises below
<ExampleComponent className={({ state }) => state.active ? 'active' : 'inactive' } />
`})}),`
`,(0,_.jsx)(t.h2,{id:`api`,children:`API`}),`
`,(0,_.jsxs)(t.p,{children:[`Bento is built on React ARIA, which has a different render-prop approach. In
`,(0,_.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/styling.html#render-props`,rel:`nofollow`,children:`React ARIA`}),` only the `,(0,_.jsx)(t.code,{children:`style`}),` and `,(0,_.jsx)(t.code,{children:`className`}),` props can accept
a function as prop. These render props only receive the state object as an
argument to the function and should render the return value.`]}),`
`,(0,_.jsxs)(t.p,{children:[`In Bento, all props can accept a function as a render-prop. Any property you
define on a Bento-based component is considered an override. If you pass a
`,(0,_.jsx)(t.code,{children:`className`}),` prop to a Bento component, the component will drop its default
`,(0,_.jsx)(t.code,{children:`className`}),` and use the one you provided. With render props, you can take
control of the merge strategy of the default and the provided value.`]}),`
`,(0,_.jsx)(t.p,{children:`The render prop function receives an object with the following properties:`}),`
`,(0,_.jsx)(a,{of:u}),`
`,(0,_.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,_.jsx)(t.p,{children:`React will re-render a component if the props passed to it change. This can
cause performance issues if the function passed to a render prop is re-created
on each render.`}),`
`,(0,_.jsx)(t.p,{children:`A lot of functions don't need to access any variables declared in the component
scope. In these cases, you can declare the function outside of the component
scope and pass it as a prop. This ensures that the function is only created once
and the prop is not considered a new prop on each render:`}),`
`,(0,_.jsx)(t.pre,{children:(0,_.jsx)(t.code,{className:`language-jsx`,children:`function aria({ state }) {
  return state.open ? 'true' : 'false';
}

function YourApplicationOrComponent() {
  return <ExampleComponent aria-expanded={aria} />
}
`})}),`
`,(0,_.jsxs)(t.p,{children:[`For components where you cannot declare the function outside of your component
scope, you can use the `,(0,_.jsx)(t.code,{children:`React.useCallback`}),` hook. The `,(0,_.jsx)(t.a,{href:`https://react.dev/reference/react/useCallback`,rel:`nofollow`,children:`useCallback`}),` hook caches
the function definition between re-renders. Given that your function references
variables declared in the components function scope, you must include them in the
dependencies array:`]}),`
`,(0,_.jsx)(r,{language:`tsx`,code:p}),`
`,(0,_.jsx)(t.p,{children:`The above example results in the following output:`}),`
`,(0,_.jsx)(i,{of:l,inline:!0})]})}function g(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=t(),c(),s(),m(),f()}))();export{g as default};