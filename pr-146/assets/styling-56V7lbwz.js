import{j as e}from"./iframe-6GaXOUaT.js";import{useMDXComponents as i}from"./index-Cf9r2Gk8.js";import{M as o}from"./blocks-6xSex4GH.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bj9gKbGQ.js";import"./index-CMgpeNKa.js";import"./index-D8j4FsKY.js";import"./index-DrFu-skq.js";function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Architecture/Guides/Styling"}),`
`,e.jsx(n.h1,{id:"styling",children:"Styling"}),`
`,e.jsx(n.p,{children:"The components in Bento are unstyled by default, this however does not mean that you are not able to style the components. Every aspect of the component can be styled. We believe in giving you the freedom to style them as you see fit, with frameworks like Tailwind, CSS Modules, or CSS-in-JS."}),`
`,e.jsx(n.p,{children:`It's worth noting that when we say "unstyled" we are referring to cosmetic styles that are not part of the component's accessibility or behavior. Functional styles e.g. positional, or accessibility related styles can still be part of the component's styling contract.`}),`
`,e.jsx(n.p,{children:"While Bento does not prescribe a specific styling solution, we do provide a few hooks that you can use to style the Primitives. As you style the Primitives, you should expect that your styles will interact with Bento's internals."}),`
`,e.jsx(n.h2,{id:"the-styling-contract",children:"The Styling Contract"}),`
`,e.jsxs(n.p,{children:["Our components do not assign classNames, but as previously mentioned they might provide behavior, functional or accessibility related styles. When you pass ",e.jsx(n.code,{children:"className"})," or ",e.jsx(n.code,{children:"style"})," to a Bento component, your value may ",e.jsx(n.strong,{children:"overwrite"})," whatever the component applied internally. This is intentional, it gives you as the developer full control over the component's styling."]}),`
`,e.jsx(n.p,{children:`It's up to you to decided if you want to merge your styles with the component's internal styles, or completely overwrite them,
only your application knows the right strategy—ordering, deduplication, conditional classes, CSS-in-JS precedence, Tailwind class merging, etc. Bento won't guess.`}),`
`,e.jsx(n.h2,{id:"style-hooks",children:"Style Hooks"}),`
`,e.jsx(n.h3,{id:"classname",children:"className"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"className"})," can be a string or a render function."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Simple override:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Divider className="my-divider" />
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Merge with original:"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Divider
  className={({ original }) => ['my-divider', original].filter(Boolean).join(' ')}
/>
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"original"})," value is whatever class the component applied internally. For example, if the ",e.jsx(n.code,{children:"Divider"})," component applies a baseline class that normalizes the ",e.jsx(n.code,{children:"<hr>"})," element, the ",e.jsx(n.code,{children:"original"})," value will be that class. When you merge with ",e.jsx(n.code,{children:"original"}),", you preserve those styles while adding your own. If a component doesn't set an internal class, ",e.jsx(n.code,{children:"original"})," will be ",e.jsx(n.code,{children:"undefined"})," (which ",e.jsx(n.code,{children:".filter(Boolean)"})," handles safely)."]}),`
`,e.jsx(n.h3,{id:"style",children:"style"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"style"})," works the same way—an object for override, or a render function for merge:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<MyComponent
  style={({ original }) => ({ ...original, opacity: 0.5 })}
/>
`})}),`
`,e.jsxs(n.p,{children:["Most Bento primitives don't set internal inline styles, so ",e.jsx(n.code,{children:"original"})," will typically be ",e.jsx(n.code,{children:"undefined"}),". The render-function form is still useful when you want to compute styles based on component state (see below)."]}),`
`,e.jsx(n.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsxs(n.p,{children:["Bento exposes internal state via ",e.jsx(n.code,{children:"data-*"})," attributes. Use these for state-based styling without coupling to implementation details:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.my-button[data-pressed='true'] {
  transform: scale(0.98);
}

.my-button[data-focus-visible='true'] {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
`})}),`
`,e.jsxs(n.p,{children:["Components like ",e.jsx(n.code,{children:"Button"})," (via ",e.jsx(n.code,{children:"Pressable"}),") expose: ",e.jsx(n.code,{children:"data-pressed"}),", ",e.jsx(n.code,{children:"data-hovered"}),", ",e.jsx(n.code,{children:"data-focused"}),", ",e.jsx(n.code,{children:"data-focus-visible"}),"."]}),`
`,e.jsxs(n.p,{children:["Components like ",e.jsx(n.code,{children:"Checkbox"})," expose: ",e.jsx(n.code,{children:"data-selected"}),", ",e.jsx(n.code,{children:"data-pressed"}),", ",e.jsx(n.code,{children:"data-hovered"}),", ",e.jsx(n.code,{children:"data-focused"}),", ",e.jsx(n.code,{children:"data-focus-visible"}),", ",e.jsx(n.code,{children:"data-disabled"}),", ",e.jsx(n.code,{children:"data-readonly"}),", ",e.jsx(n.code,{children:"data-invalid"}),", ",e.jsx(n.code,{children:"data-required"}),", ",e.jsx(n.code,{children:"data-indeterminate"}),"."]}),`
`,e.jsx(n.p,{children:"Each component's documentation page lists the specific data attributes it exposes."}),`
`,e.jsx(n.h2,{id:"common-styling-approaches",children:"Common Styling Approaches"}),`
`,e.jsx(n.h3,{id:"tailwind--utility-classes",children:"Tailwind / Utility Classes"}),`
`,e.jsxs(n.p,{children:["Pass class names directly and use Tailwind's ",e.jsx(n.code,{children:"data-*"})," variant selectors for state:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Button
  className={[
    'inline-flex items-center rounded-md px-3 py-2',
    'data-[pressed=true]:scale-[0.98]',
    'data-[focus-visible=true]:outline data-[focus-visible=true]:outline-2',
  ].join(' ')}
>
  Save
</Button>
`})}),`
`,e.jsx(n.h3,{id:"css-modules",children:"CSS Modules"}),`
`,e.jsxs(n.p,{children:["Define scoped classes and use ",e.jsx(n.code,{children:"data-*"})," attribute selectors for state:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import styles from './button.module.css';

<Button className={styles.root}>Save</Button>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.root[data-pressed='true'] {
  transform: scale(0.98);
}
`})}),`
`,e.jsx(n.h3,{id:"css-in-js",children:"CSS-in-JS"}),`
`,e.jsx(n.p,{children:'Wrap Bento primitives with a "design-system component" layer. The wrapper owns the merge strategy:'}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`function DsButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button {...props} className={['ds-button', className].filter(Boolean).join(' ')} />;
}
`})}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.a,{href:"/docs/architecture-guides-customization--docs",children:"Customization guide"})," for more on the wrapper pattern."]}),`
`,e.jsx(n.h2,{id:"debugging-data-override",children:"Debugging: data-override"}),`
`,e.jsxs(n.p,{children:["Bento adds a ",e.jsx(n.code,{children:"data-override"})," attribute when a component has been overridden through ",e.jsx(n.code,{children:"className"}),", ",e.jsx(n.code,{children:"style"}),", slots, or environment replacement. The value lists what was overridden (e.g., ",e.jsx(n.code,{children:'data-override="className slot"'}),"). This helps you identify instances that may need attention during upgrades."]})]})}function m(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{m as default};
