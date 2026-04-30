import{j as e}from"./iframe-CXq8dscT.js";import{useMDXComponents as s}from"./index-DeJayPHI.js";import{M as a,S as t}from"./blocks-CsMHUZB-.js";import{S as i}from"./forward.stories-CWR3zbzZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-6mFRbdBS.js";import"./index-CSZn66pI.js";import"./index-DqyoxfBT.js";import"./index-YnYe-Usd.js";const d=`import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface BasicExampleProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Basic example showing withForwardRef with a component that has 2 parameters.
 * In React 18, this will be automatically wrapped with forwardRef.
 * In React 19, it returns the component unchanged (refs are passed as props).
 *
 * @public
 */
export const BasicExample = withForwardRef<BasicExampleProps>(function BasicExample(
  props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  );
});
`,c=`import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface AlreadyWrappedProps {
  children?: React.ReactNode;
}

/**
 * Example showing withForwardRef with a component already using React.forwardRef.
 * The component is returned unchanged since it's already wrapped.
 *
 * @public
 */
export const AlreadyWrapped = withForwardRef(
  React.forwardRef<HTMLDivElement, AlreadyWrappedProps>(function AlreadyWrapped(props, ref) {
    return <div ref={ref}>{props.children}</div>;
  })
);
`,p=`import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface NoRefProps {
  children?: React.ReactNode;
}

/**
 * Example showing withForwardRef with a component that doesn't accept a ref.
 * The component is returned unchanged since it doesn't need ref forwarding.
 *
 * @public
 */
export const NoRef = withForwardRef<NoRefProps>(function NoRef(props) {
  return <div>{props.children}</div>;
});
`,h=`import { withForwardRef } from '@bento/forward';
/* v8 ignore next */
import React from 'react';

interface RestParamsProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Example showing withForwardRef with rest parameters (...args).
 * This pattern is useful for the future useProps(...args) API.
 * In React 18, this will be automatically wrapped with forwardRef.
 *
 * @public
 */
export const RestParams = withForwardRef<RestParamsProps>(function RestParams(...args: any[]) {
  // Future API pattern: const { props, ref } = useProps(args, state);
  // For now, just demonstrate the pattern
  const [props, ref] = args;

  return (
    <div ref={ref} className={props?.className}>
      {props?.children}
    </div>
  );
});
`;function o(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:i,name:"Overview"}),`
`,e.jsx(n.h1,{id:"forward",children:"Forward"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/forward"})," package provides the ",e.jsx(n.code,{children:"withForwardRef"})," utility for React 19-compatible ref forwarding. It automatically detects whether your component needs ",e.jsx(n.code,{children:"forwardRef"})," wrapping and applies it only when necessary."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/forward
`})}),`
`,e.jsx(n.h2,{id:"how-it-works",children:"How It Works"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"withForwardRef"})," utility wraps functional components with ",e.jsx(n.code,{children:"forwardRef"})," in React 18 when they might accept a ref parameter."]}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["Wrapping occurs when ",e.jsx(n.code,{children:"Component.length !== 1"}),":"]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"length === 0"})," - Rest parameters: ",e.jsx(n.code,{children:"function Component(...args)"})," - Wrapped"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"length === 2"})," - Explicit ref: ",e.jsx(n.code,{children:"function Component(props, ref)"})," - Wrapped"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"length === 1"})," - Props only: ",e.jsx(n.code,{children:"function Component(props)"})," - Not wrapped"]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"React 19"}),": No wrapping needed - refs are passed as props natively."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Component Pattern"}),e.jsx(n.th,{children:"React 18"}),e.jsx(n.th,{children:"React 19"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"function Component(props, ref)"})}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"Wrapped"})}),e.jsx(n.td,{children:"Unchanged"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"function Component(...args)"})}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"Wrapped"})}),e.jsx(n.td,{children:"Unchanged"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"function Component(props)"})}),e.jsx(n.td,{children:"Unchanged"}),e.jsx(n.td,{children:"Unchanged"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"React.forwardRef(Component)"})}),e.jsx(n.td,{children:"Unchanged"}),e.jsx(n.td,{children:"Unchanged"})]})]})]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.p,{children:"Component with 2 parameters will be automatically wrapped in React 18:"}),`
`,e.jsx(t,{language:"tsx",code:d}),`
`,e.jsx(n.h3,{id:"rest-parameters-spread",children:"Rest Parameters (Spread)"}),`
`,e.jsxs(n.p,{children:["Component using rest parameters for the future ",e.jsx(n.code,{children:"useProps(...args)"})," API:"]}),`
`,e.jsx(t,{language:"tsx",code:h}),`
`,e.jsx(n.h3,{id:"already-using-forwardref",children:"Already Using forwardRef"}),`
`,e.jsxs(n.p,{children:["Components already wrapped with ",e.jsx(n.code,{children:"forwardRef"})," are returned unchanged:"]}),`
`,e.jsx(t,{language:"tsx",code:c}),`
`,e.jsx(n.h3,{id:"component-without-ref",children:"Component Without Ref"}),`
`,e.jsx(n.p,{children:"Components that don't accept a ref parameter are returned unchanged:"}),`
`,e.jsx(t,{language:"tsx",code:p}),`
`,e.jsx(n.h2,{id:"migration-from-react-18-to-react-19",children:"Migration from React 18 to React 19"}),`
`,e.jsxs(n.p,{children:["Components using ",e.jsx(n.code,{children:"withForwardRef"})," will work seamlessly when upgrading from React 18 to React 19 with no code changes required. The utility handles the difference automatically."]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.h3,{id:"withforwardrefpropscomponent",children:e.jsx(n.code,{children:"withForwardRef<Props>(Component)"})}),`
`,e.jsxs(n.p,{children:["Wraps a component with ",e.jsx(n.code,{children:"forwardRef"})," if needed for React 18 compatibility."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Parameters:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Component: React.ComponentType<Props>"})," - The component to wrap"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Returns:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"React.ComponentType<Props>"})," - The component, optionally wrapped with ",e.jsx(n.code,{children:"forwardRef"})]}),`
`]})]})}function y(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(o,{...r})}):o(r)}export{y as default};
