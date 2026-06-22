import{i as e}from"./preload-helper-CNDr7-K1.js";import{y as t}from"./iframe-DcehxJvJ.js";import{S as n,s as r,u as i}from"./blocks-hPIBcDZI.js";import{t as a}from"./mdx-react-shim-nOkTKOG3.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/Guides/Styling`}),`
`,(0,c.jsx)(t.h1,{id:`styling`,children:`Styling`}),`
`,(0,c.jsx)(t.p,{children:`The components in Bento are unstyled by default, this however does not mean that you are not able to style the components. Every aspect of the component can be styled. We believe in giving you the freedom to style them as you see fit, with frameworks like Tailwind, CSS Modules, or CSS-in-JS.`}),`
`,(0,c.jsx)(t.p,{children:`It's worth noting that when we say "unstyled" we are referring to cosmetic styles that are not part of the component's accessibility or behavior. Functional styles e.g. positional, or accessibility related styles can still be part of the component's styling contract.`}),`
`,(0,c.jsx)(t.p,{children:`While Bento does not prescribe a specific styling solution, we do provide a few hooks that you can use to style the Primitives. As you style the Primitives, you should expect that your styles will interact with Bento's internals.`}),`
`,(0,c.jsx)(t.h2,{id:`the-styling-contract`,children:`The Styling Contract`}),`
`,(0,c.jsxs)(t.p,{children:[`Our components do not assign classNames, but as previously mentioned they might provide behavior, functional or accessibility related styles. When you pass `,(0,c.jsx)(t.code,{children:`className`}),` or `,(0,c.jsx)(t.code,{children:`style`}),` to a Bento component, your value may `,(0,c.jsx)(t.strong,{children:`overwrite`}),` whatever the component applied internally. This is intentional, it gives you as the developer full control over the component's styling.`]}),`
`,(0,c.jsx)(t.p,{children:`It's up to you to decided if you want to merge your styles with the component's internal styles, or completely overwrite them,
only your application knows the right strategy—ordering, deduplication, conditional classes, CSS-in-JS precedence, Tailwind class merging, etc. Bento won't guess.`}),`
`,(0,c.jsx)(t.h2,{id:`style-hooks`,children:`Style Hooks`}),`
`,(0,c.jsx)(t.h3,{id:`classname`,children:`className`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`className`}),` can be a string or a render function.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Simple override:`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Divider className="my-divider" />
`})}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Merge with original:`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Divider
  className={({ original }) => ['my-divider', original].filter(Boolean).join(' ')}
/>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`original`}),` value is whatever class the component applied internally. For example, if the `,(0,c.jsx)(t.code,{children:`Divider`}),` component applies a baseline class that normalizes the `,(0,c.jsx)(t.code,{children:`<hr>`}),` element, the `,(0,c.jsx)(t.code,{children:`original`}),` value will be that class. When you merge with `,(0,c.jsx)(t.code,{children:`original`}),`, you preserve those styles while adding your own. If a component doesn't set an internal class, `,(0,c.jsx)(t.code,{children:`original`}),` will be `,(0,c.jsx)(t.code,{children:`undefined`}),` (which `,(0,c.jsx)(t.code,{children:`.filter(Boolean)`}),` handles safely).`]}),`
`,(0,c.jsx)(t.h3,{id:`style`,children:`style`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`style`}),` works the same way—an object for override, or a render function for merge:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<MyComponent
  style={({ original }) => ({ ...original, opacity: 0.5 })}
/>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Most Bento primitives don't set internal inline styles, so `,(0,c.jsx)(t.code,{children:`original`}),` will typically be `,(0,c.jsx)(t.code,{children:`undefined`}),`. The render-function form is still useful when you want to compute styles based on component state (see below).`]}),`
`,(0,c.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,c.jsxs)(t.p,{children:[`Bento exposes internal state via `,(0,c.jsx)(t.code,{children:`data-*`}),` attributes. Use these for state-based styling without coupling to implementation details:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`.my-button[data-pressed='true'] {
  transform: scale(0.98);
}

.my-button[data-focus-visible='true'] {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Components like `,(0,c.jsx)(t.code,{children:`Button`}),` (via `,(0,c.jsx)(t.code,{children:`Pressable`}),`) expose: `,(0,c.jsx)(t.code,{children:`data-pressed`}),`, `,(0,c.jsx)(t.code,{children:`data-hovered`}),`, `,(0,c.jsx)(t.code,{children:`data-focused`}),`, `,(0,c.jsx)(t.code,{children:`data-focus-visible`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`Components like `,(0,c.jsx)(t.code,{children:`Checkbox`}),` expose: `,(0,c.jsx)(t.code,{children:`data-selected`}),`, `,(0,c.jsx)(t.code,{children:`data-pressed`}),`, `,(0,c.jsx)(t.code,{children:`data-hovered`}),`, `,(0,c.jsx)(t.code,{children:`data-focused`}),`, `,(0,c.jsx)(t.code,{children:`data-focus-visible`}),`, `,(0,c.jsx)(t.code,{children:`data-disabled`}),`, `,(0,c.jsx)(t.code,{children:`data-readonly`}),`, `,(0,c.jsx)(t.code,{children:`data-invalid`}),`, `,(0,c.jsx)(t.code,{children:`data-required`}),`, `,(0,c.jsx)(t.code,{children:`data-indeterminate`}),`.`]}),`
`,(0,c.jsx)(t.p,{children:`Each component's documentation page lists the specific data attributes it exposes.`}),`
`,(0,c.jsx)(t.h2,{id:`common-styling-approaches`,children:`Common Styling Approaches`}),`
`,(0,c.jsx)(t.h3,{id:`tailwind--utility-classes`,children:`Tailwind / Utility Classes`}),`
`,(0,c.jsxs)(t.p,{children:[`Pass class names directly and use Tailwind's `,(0,c.jsx)(t.code,{children:`data-*`}),` variant selectors for state:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Button
  className={[
    'inline-flex items-center rounded-md px-3 py-2',
    'data-[pressed=true]:scale-[0.98]',
    'data-[focus-visible=true]:outline data-[focus-visible=true]:outline-2',
  ].join(' ')}
>
  Save
</Button>
`})}),`
`,(0,c.jsx)(t.h3,{id:`css-modules`,children:`CSS Modules`}),`
`,(0,c.jsxs)(t.p,{children:[`Define scoped classes and use `,(0,c.jsx)(t.code,{children:`data-*`}),` attribute selectors for state:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import styles from './button.module.css';

<Button className={styles.root}>Save</Button>
`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`.root[data-pressed='true'] {
  transform: scale(0.98);
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`css-in-js`,children:`CSS-in-JS`}),`
`,(0,c.jsx)(t.p,{children:`Wrap Bento primitives with a "design-system component" layer. The wrapper owns the merge strategy:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`function DsButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return <Button {...props} className={['ds-button', className].filter(Boolean).join(' ')} />;
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[`See the `,(0,c.jsx)(t.a,{href:`/docs/bento-architecture-guides-customization--docs`,children:`Customization guide`}),` for more on the wrapper pattern.`]}),`
`,(0,c.jsx)(t.h2,{id:`debugging-data-override`,children:`Debugging: data-override`}),`
`,(0,c.jsxs)(t.p,{children:[`Bento adds a `,(0,c.jsx)(t.code,{children:`data-override`}),` attribute when a component has been overridden through `,(0,c.jsx)(t.code,{children:`className`}),`, `,(0,c.jsx)(t.code,{children:`style`}),`, slots, or environment replacement. The value lists what was overridden (e.g., `,(0,c.jsx)(t.code,{children:`data-override="className slot"`}),`). This helps you identify instances that may need attention during upgrades.`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};