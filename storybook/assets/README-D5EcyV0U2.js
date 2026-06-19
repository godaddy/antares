import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-Bbn45V8j.js";import{S as n,c as r,i,l as a,s as o,u as s}from"./blocks-B3r1oyEE.js";import{t as c}from"./mdx-react-shim-BMnED-6x.js";import{Demo as l,n as u,t as d}from"./internal-props.stories-C_BY-TQR.js";var f,p=e((()=>{f=`import { toInternalProps } from '@bento/internal-props';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

/**
 * Simple button component that accepts internal props.
 *
 * @param {Record<string, any>} args - The component props.
 * @returns {JSX.Element} The rendered button element.
 * @public
 */
export const BentoButton = withSlots('InternalBentoButton', function ButtonComponent(args: Record<string, any>) {
  const { props, apply } = useProps(args);

  return <button {...apply({ className: 'bento-button-base' })}>{props.children}</button>;
});

/**
 * Example component demonstrating how to use toInternalProps for className overrides.
 *
 * @returns {JSX.Element} The rendered example with various button styles.
 * @public
 */
export const Example = withSlots('ClassNameOverrideExample', function ExampleComponent() {
  // Convert className to internal prop to avoid data-override
  const primaryButtonProps = toInternalProps({ className: 'primary-button large-button' });

  const customButtonProps = toInternalProps({
    className: ({ original }: { original: string }) => ['custom-button-class', original].join(' ')
  });

  return (
    <div>
      {/* Regular button with default className */}
      <BentoButton>Default Button</BentoButton>

      {/* Button with custom className that won't trigger data-override */}
      <BentoButton className="trigger-override">Triggers data-override</BentoButton>

      {/* Button with custom className that won't trigger data-override */}
      <BentoButton {...customButtonProps}>Custom Styled Button</BentoButton>

      {/* Button with multiple classNames */}
      <BentoButton {...primaryButtonProps}>Primary Large Button</BentoButton>
    </div>
  );
});
`}));function m(e){let t={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o,{of:u,name:`Overview`}),`
`,(0,g.jsx)(t.h1,{id:`internalprops`,children:`InternalProps`}),`
`,(0,g.jsxs)(t.p,{children:[`The `,(0,g.jsx)(t.code,{children:`@bento/internal-props`}),` package provides internal utilities and components used across the Bento project to bypass restrictions, filtering of props, or triggering of data-override props within the Bento ecosystem. This package is strictly for internal use by @bento-based components or those who use Bento to create design system components.`]}),`
`,(0,g.jsxs)(t.blockquote,{children:[`
`,(0,g.jsxs)(t.p,{children:[`⚠️ `,(0,g.jsx)(t.strong,{children:`Warning`}),`: This package is not intended for public consumption and is subject to change without notice. It should only be used by internal Bento components or design system implementations.`]}),`
`]}),`
`,(0,g.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,g.jsx)(t.p,{children:`To install the package, use your preferred package manager:`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-shell`,children:`npm install @bento/internal-props
`})}),`
`,(0,g.jsx)(t.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(t.p,{children:`The package exports two main functions:`}),`
`,(0,g.jsx)(t.h3,{id:`useinternalprops`,children:`useInternalProps`}),`
`,(0,g.jsx)(t.p,{children:`Extracts internal properties from a set of properties by removing the specified prefix.`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`import { useInternalProps } from '@bento/internal-props';

const [props, internal] = useInternalProps({
  '$$bento-internal-1-foo': 'bar',
  '$$bento-internal-1-baz': 'qux',
  regular: 'prop'
});

console.log(props);   // { regular: 'prop' }
console.log(internal); // { foo: 'bar', baz: 'qux' }
`})}),`
`,(0,g.jsx)(t.p,{children:`The function accepts two arguments:`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`props`}),`: The properties to extract from`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`prefix`}),`: (Optional) The prefix to remove from the properties. Defaults to `,(0,g.jsx)(t.code,{children:`$$bento-internal-{major}-`})]}),`
`]}),`
`,(0,g.jsx)(t.h3,{id:`tointernalprops`,children:`toInternalProps`}),`
`,(0,g.jsx)(t.p,{children:`Converts a set of properties to internal properties by prefixing them with the specified namespace.`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`import { toInternalProps } from '@bento/internal-props';

const internal = toInternalProps({
  foo: 'bar',
  baz: 'qux'
});

console.log(internal); // { '$$bento-internal-1-foo': 'bar', '$$bento-internal-1-baz': 'qux' }
`})}),`
`,(0,g.jsx)(t.p,{children:`The function accepts two arguments:`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`props`}),`: The properties to convert`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`prefix`}),`: (Optional) The prefix to use for the internal properties. Defaults to `,(0,g.jsx)(t.code,{children:`$$bento-internal-{major}-`})]}),`
`]}),`
`,(0,g.jsx)(t.h3,{id:`example`,children:`Example`}),`
`,(0,g.jsx)(r,{language:`tsx`,code:f}),`
`,(0,g.jsx)(a,{of:l,inline:!0}),`
`,(0,g.jsx)(i,{of:l})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;e((()=>{g=t(),c(),s(),d(),p()}))();export{h as default};