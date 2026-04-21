import{j as e}from"./iframe-Clok5Bx-.js";import{useMDXComponents as r}from"./index-BXyXduwM.js";import{M as s,A as a,S as c,a as i}from"./blocks-bQ4FPMfX.js";import{S as p,R as l,M as d}from"./props.stories-CfigBcxE.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CM3iraos.js";import"./index-CTAzx9Qf.js";import"./index-DV5RLouH.js";import"./index-DrFu-skq.js";import"./index-gOKs7A38.js";import"./index-B31DMB2m.js";import"./mergeProps-prYHiKid.js";import"./clsx-uTABAIa2.js";import"./slots-CJX-VgFE.js";import"./index-CLj43KZG.js";import"./index-B6JalmM2.js";const h=`/* v8 ignore next */
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
`;function t(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p,name:"Concepts"}),`
`,e.jsx(n.h1,{id:"render-props",children:"Render Props"}),`
`,e.jsxs(n.p,{children:["Render props allows you to define ",e.jsx(n.strong,{children:"any prop as a function"}),`. The Bento based
component will execute this function and the return value will be used as the
prop value. Render props are a powerful technique to customize the rendering of
a component. They allow you to take control over the rendering of a component
without the need to extend the component using slots or creating a custom
component.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// Fat arrow only for illustration purposes, see best practises below
<ExampleComponent className={({ state }) => state.active ? 'active' : 'inactive' } />
`})}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsxs(n.p,{children:[`Bento is built on React ARIA, which has a different render-prop approach. In
`,e.jsx(n.a,{href:"https://react-spectrum.adobe.com/react-aria/styling.html#render-props",rel:"nofollow",children:"React ARIA"})," only the ",e.jsx(n.code,{children:"style"})," and ",e.jsx(n.code,{children:"className"}),` props can accept
a function as prop. These render props only receive the state object as an
argument to the function and should render the return value.`]}),`
`,e.jsxs(n.p,{children:[`In Bento, all props can accept a function as a render-prop. Any property you
define on a Bento-based component is considered an override. If you pass a
`,e.jsx(n.code,{children:"className"}),` prop to a Bento component, the component will drop its default
`,e.jsx(n.code,{children:"className"}),` and use the one you provided. With render props, you can take
control of the merge strategy of the default and the provided value.`]}),`
`,e.jsx(n.p,{children:"The render prop function receives an object with the following properties:"}),`
`,e.jsx(a,{of:l}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(n.p,{children:`React will re-render a component if the props passed to it change. This can
cause performance issues if the function passed to a render prop is re-created
on each render.`}),`
`,e.jsx(n.p,{children:`A lot of functions don't need to access any variables declared in the component
scope. In these cases, you can declare the function outside of the component
scope and pass it as a prop. This ensures that the function is only created once
and the prop is not considered a new prop on each render:`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`function aria({ state }) {
  return state.open ? 'true' : 'false';
}

function YourApplicationOrComponent() {
  return <ExampleComponent aria-expanded={aria} />
}
`})}),`
`,e.jsxs(n.p,{children:[`For components where you cannot declare the function outside of your component
scope, you can use the `,e.jsx(n.code,{children:"React.useCallback"})," hook. The ",e.jsx(n.a,{href:"https://react.dev/reference/react/useCallback",rel:"nofollow",children:"useCallback"}),` hook caches
the function definition between re-renders. Given that your function references
variables declared in the components function scope, you must include them in the
dependencies array:`]}),`
`,e.jsx(c,{language:"tsx",code:h}),`
`,e.jsx(n.p,{children:"The above example results in the following output:"}),`
`,e.jsx(i,{of:d,inline:!0})]})}function A(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{A as default};
