import{j as e}from"./iframe-Cf4veHW5.js";import{useMDXComponents as s}from"./index-BtVMlOOr.js";import{M as i,S as a,a as p,f as l}from"./blocks-DmuR8dZ_.js";import{S as c,D as o}from"./internal-props.stories-CJr2hK0z.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DNjwxWKM.js";import"./index-DToc6jV2.js";import"./index-CuIGtFSl.js";import"./index-DrFu-skq.js";import"./index-DFe4wYDr.js";import"./index-CI0_ybol.js";import"./mergeProps-B0NeEK8c.js";import"./SSRProvider-BfECjNvX.js";import"./clsx-B-dksMZM.js";import"./slots-CFYHZr56.js";import"./index-CLj43KZG.js";import"./index-CcH4lrSI.js";const m=`import { toInternalProps } from '@bento/internal-props';
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
`;function r(t){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c,name:"Overview"}),`
`,e.jsx(n.h1,{id:"internalprops",children:"InternalProps"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/internal-props"})," package provides internal utilities and components used across the Bento project to bypass restrictions, filtering of props, or triggering of data-override props within the Bento ecosystem. This package is strictly for internal use by @bento-based components or those who use Bento to create design system components."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["⚠️ ",e.jsx(n.strong,{children:"Warning"}),": This package is not intended for public consumption and is subject to change without notice. It should only be used by internal Bento components or design system implementations."]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"To install the package, use your preferred package manager:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install @bento/internal-props
`})}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(n.p,{children:"The package exports two main functions:"}),`
`,e.jsx(n.h3,{id:"useinternalprops",children:"useInternalProps"}),`
`,e.jsx(n.p,{children:"Extracts internal properties from a set of properties by removing the specified prefix."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useInternalProps } from '@bento/internal-props';

const [props, internal] = useInternalProps({
  '$$bento-internal-1-foo': 'bar',
  '$$bento-internal-1-baz': 'qux',
  regular: 'prop'
});

console.log(props);   // { regular: 'prop' }
console.log(internal); // { foo: 'bar', baz: 'qux' }
`})}),`
`,e.jsx(n.p,{children:"The function accepts two arguments:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"props"}),": The properties to extract from"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"prefix"}),": (Optional) The prefix to remove from the properties. Defaults to ",e.jsx(n.code,{children:"$$bento-internal-{major}-"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"tointernalprops",children:"toInternalProps"}),`
`,e.jsx(n.p,{children:"Converts a set of properties to internal properties by prefixing them with the specified namespace."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { toInternalProps } from '@bento/internal-props';

const internal = toInternalProps({
  foo: 'bar',
  baz: 'qux'
});

console.log(internal); // { '$$bento-internal-1-foo': 'bar', '$$bento-internal-1-baz': 'qux' }
`})}),`
`,e.jsx(n.p,{children:"The function accepts two arguments:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"props"}),": The properties to convert"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"prefix"}),": (Optional) The prefix to use for the internal properties. Defaults to ",e.jsx(n.code,{children:"$$bento-internal-{major}-"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"example",children:"Example"}),`
`,e.jsx(a,{language:"tsx",code:m}),`
`,e.jsx(p,{of:o,inline:!0}),`
`,e.jsx(l,{of:o})]})}function $(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{$ as default};
