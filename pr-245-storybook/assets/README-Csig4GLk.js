import{i as e}from"./preload-helper-DclfrFfH.js";import{y as t}from"./iframe-CcqQYSmm.js";import{S as n,c as r,s as i,u as a}from"./blocks-CNm111Di.js";import{t as o}from"./mdx-react-shim-B0Q8Qr5Z.js";import{n as s,t as c}from"./forward.stories-C6map_mr.js";var l,u=e((()=>{l=`import { withForwardRef } from '@bento/forward';
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
`})),d,f=e((()=>{d=`import { withForwardRef } from '@bento/forward';
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
`})),p,m=e((()=>{p=`import { withForwardRef } from '@bento/forward';
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
`})),h,g=e((()=>{h=`import { withForwardRef } from '@bento/forward';
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
`}));function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(i,{of:c,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`forward`,children:`Forward`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`@bento/forward`}),` package provides the `,(0,y.jsx)(t.code,{children:`withForwardRef`}),` utility for React 19-compatible ref forwarding. It automatically detects whether your component needs `,(0,y.jsx)(t.code,{children:`forwardRef`}),` wrapping and applies it only when necessary.`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/forward
`})}),`
`,(0,y.jsx)(t.h2,{id:`how-it-works`,children:`How It Works`}),`
`,(0,y.jsxs)(t.p,{children:[`The `,(0,y.jsx)(t.code,{children:`withForwardRef`}),` utility wraps functional components with `,(0,y.jsx)(t.code,{children:`forwardRef`}),` in React 18 when they might accept a ref parameter.`]}),`
`,(0,y.jsx)(t.p,{children:(0,y.jsxs)(t.strong,{children:[`Wrapping occurs when `,(0,y.jsx)(t.code,{children:`Component.length !== 1`}),`:`]})}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`length === 0`}),` - Rest parameters: `,(0,y.jsx)(t.code,{children:`function Component(...args)`}),` - Wrapped`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`length === 2`}),` - Explicit ref: `,(0,y.jsx)(t.code,{children:`function Component(props, ref)`}),` - Wrapped`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`length === 1`}),` - Props only: `,(0,y.jsx)(t.code,{children:`function Component(props)`}),` - Not wrapped`]}),`
`]}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`React 19`}),`: No wrapping needed - refs are passed as props natively.`]}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Component Pattern`}),(0,y.jsx)(t.th,{children:`React 18`}),(0,y.jsx)(t.th,{children:`React 19`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`function Component(props, ref)`})}),(0,y.jsx)(t.td,{children:(0,y.jsx)(t.strong,{children:`Wrapped`})}),(0,y.jsx)(t.td,{children:`Unchanged`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`function Component(...args)`})}),(0,y.jsx)(t.td,{children:(0,y.jsx)(t.strong,{children:`Wrapped`})}),(0,y.jsx)(t.td,{children:`Unchanged`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`function Component(props)`})}),(0,y.jsx)(t.td,{children:`Unchanged`}),(0,y.jsx)(t.td,{children:`Unchanged`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.td,{children:(0,y.jsx)(t.code,{children:`React.forwardRef(Component)`})}),(0,y.jsx)(t.td,{children:`Unchanged`}),(0,y.jsx)(t.td,{children:`Unchanged`})]})]})]}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,y.jsx)(t.p,{children:`Component with 2 parameters will be automatically wrapped in React 18:`}),`
`,(0,y.jsx)(r,{language:`tsx`,code:l}),`
`,(0,y.jsx)(t.h3,{id:`rest-parameters-spread`,children:`Rest Parameters (Spread)`}),`
`,(0,y.jsxs)(t.p,{children:[`Component using rest parameters for the future `,(0,y.jsx)(t.code,{children:`useProps(...args)`}),` API:`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:h}),`
`,(0,y.jsx)(t.h3,{id:`already-using-forwardref`,children:`Already Using forwardRef`}),`
`,(0,y.jsxs)(t.p,{children:[`Components already wrapped with `,(0,y.jsx)(t.code,{children:`forwardRef`}),` are returned unchanged:`]}),`
`,(0,y.jsx)(r,{language:`tsx`,code:d}),`
`,(0,y.jsx)(t.h3,{id:`component-without-ref`,children:`Component Without Ref`}),`
`,(0,y.jsx)(t.p,{children:`Components that don't accept a ref parameter are returned unchanged:`}),`
`,(0,y.jsx)(r,{language:`tsx`,code:p}),`
`,(0,y.jsx)(t.h2,{id:`migration-from-react-18-to-react-19`,children:`Migration from React 18 to React 19`}),`
`,(0,y.jsxs)(t.p,{children:[`Components using `,(0,y.jsx)(t.code,{children:`withForwardRef`}),` will work seamlessly when upgrading from React 18 to React 19 with no code changes required. The utility handles the difference automatically.`]}),`
`,(0,y.jsx)(t.h2,{id:`api`,children:`API`}),`
`,(0,y.jsx)(t.h3,{id:`withforwardrefpropscomponent`,children:(0,y.jsx)(t.code,{children:`withForwardRef<Props>(Component)`})}),`
`,(0,y.jsxs)(t.p,{children:[`Wraps a component with `,(0,y.jsx)(t.code,{children:`forwardRef`}),` if needed for React 18 compatibility.`]}),`
`,(0,y.jsx)(t.p,{children:(0,y.jsx)(t.strong,{children:`Parameters:`})}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`Component: React.ComponentType<Props>`}),` - The component to wrap`]}),`
`]}),`
`,(0,y.jsx)(t.p,{children:(0,y.jsx)(t.strong,{children:`Returns:`})}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`React.ComponentType<Props>`}),` - The component, optionally wrapped with `,(0,y.jsx)(t.code,{children:`forwardRef`})]}),`
`]})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),o(),a(),s(),u(),f(),m(),g()}))();export{v as default};