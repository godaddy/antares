import{j as n}from"./iframe-CIBIW4ex.js";import{useMDXComponents as o}from"./index-CMkHWPaH.js";import{M as r}from"./blocks-DzyFoVCN.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BiSUdrHj.js";import"./index-dDwP_zAP.js";import"./index-CVygNudP.js";import"./index-DrFu-skq.js";function t(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Architecture/Guides/Customization"}),`
`,n.jsx(e.h1,{id:"customization",children:"Customization"}),`
`,n.jsx(e.p,{children:"Bento primitives are headless—they provide behavior and accessibility without cosmetic styling. Your design system adds the visual layer on top."}),`
`,n.jsx(e.h2,{id:"choosing-an-approach",children:"Choosing an Approach"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"Approach"}),n.jsx(e.th,{children:"Use When"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"Wrapper"})}),n.jsx(e.td,{children:"Adding styling, tokens, or variants to a primitive"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"Slots"})}),n.jsx(e.td,{children:"Replacing an internal part (like an icon) without forking"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.strong,{children:"Environment"})}),n.jsx(e.td,{children:"Swapping a primitive globally across a subtree"})]})]})]}),`
`,n.jsx(e.h2,{id:"wrappers",children:"Wrappers"}),`
`,n.jsxs(e.p,{children:["The most common pattern. Wrap a Bento primitive with your own component that adds styling and design tokens. Use ",n.jsx(e.code,{children:"withSlots"})," and ",n.jsx(e.code,{children:"useProps"})," so your wrapper follows the same conventions as Bento primitives—enabling render props, slots, and composition."]}),`
`,n.jsxs(e.p,{children:["This example uses ",n.jsx(e.a,{href:"https://cva.style",rel:"nofollow",children:"CVA (Class Variance Authority)"})," to manage variants:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button, type ButtonProps } from '@bento/button';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { cva, type VariantProps } from 'cva';

const button = cva({
  base: 'sushi-button',
  variants: {
    intent: {
      primary: 'sushi-button--primary',
      secondary: 'sushi-button--secondary',
      danger: 'sushi-button--danger'
    },
    size: {
      sm: 'sushi-button--sm',
      md: 'sushi-button--md',
      lg: 'sushi-button--lg'
    }
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md'
  }
});

interface SushiButtonProps extends ButtonProps, VariantProps<typeof button> {}

export const SushiButton = withSlots('SushiButton', function SushiButton(
  ...args: [SushiButtonProps, React.ForwardedRef<HTMLButtonElement>?]
) {
  const { apply, props } = useProps(args);
  const { intent, size } = props;

  return <Button {...apply({ className: button({ intent, size }) }, ['intent', 'size'])} />;
});
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.sushi-button {
  border-radius: var(--radius-md);
}

.sushi-button--primary { background: var(--color-primary); }
.sushi-button--secondary { background: var(--color-secondary); }
.sushi-button--danger { background: var(--color-danger); }

.sushi-button--sm { padding: var(--space-1) var(--space-2); }
.sushi-button--md { padding: var(--space-2) var(--space-4); }
.sushi-button--lg { padding: var(--space-3) var(--space-6); }

.sushi-button[data-pressed='true'] {
  transform: scale(0.98);
}
`})}),`
`,n.jsxs(e.p,{children:["By using ",n.jsx(e.code,{children:"withSlots"})," and ",n.jsx(e.code,{children:"useProps"}),", your wrapper:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Supports render props on any prop (className, style, aria-*, etc.)"}),`
`,n.jsx(e.li,{children:"Can be slotted into other components"}),`
`,n.jsx(e.li,{children:"Can define its own slots for further customization"}),`
`,n.jsx(e.li,{children:"Follows the same composition patterns as Bento primitives"}),`
`]}),`
`,n.jsxs(e.p,{children:["For styling patterns (data attributes, Tailwind, CSS Modules), see the ",n.jsx(e.a,{href:"/docs/architecture-guides-styling--docs",children:"Styling guide"}),"."]}),`
`,n.jsx(e.h2,{id:"slots",children:"Slots"}),`
`,n.jsx(e.p,{children:"When you need to replace an internal part of a primitive without copying the whole implementation."}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"@bento/checkbox"})," exposes slots for its icons: ",n.jsx(e.code,{children:"icon-checked"}),", ",n.jsx(e.code,{children:"icon-unchecked"}),", ",n.jsx(e.code,{children:"icon-indeterminate"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Checkbox, type CheckboxProps } from '@bento/checkbox';
import { Icon } from '@bento/icon';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

export const WasabiCheckbox = withSlots('WasabiCheckbox', function WasabiCheckbox(
  ...args: [CheckboxProps, React.ForwardedRef<HTMLLabelElement>?]
) {
  const { apply } = useProps(args);

  return (
    <Checkbox
      {...apply({ className: 'wasabi-checkbox' })}
      slots={{
        'icon-checked': ({ props: iconProps }) => (
          <Icon {...iconProps} icon="checkmark" />
        ),
        'icon-unchecked': ({ props: iconProps }) => (
          <Icon {...iconProps} icon="square-outline" />
        )
      }}
    />
  );
});
`})}),`
`,n.jsxs(e.p,{children:["Each component documents which slots it exposes. For the full slot model, see ",n.jsx(e.a,{href:"/docs/higher-order-components-slots--overview",children:"withSlots"}),"."]}),`
`,n.jsx(e.h2,{id:"environment",children:"Environment"}),`
`,n.jsx(e.p,{children:"When you need to replace a primitive everywhere within a subtree."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Environment } from '@bento/environment';

<Environment components={{ BentoButton: SushiButton }}>
  <App />
</Environment>
`})}),`
`,n.jsxs(e.p,{children:["Every ",n.jsx(e.code,{children:"Button"})," inside ",n.jsx(e.code,{children:"<App />"})," renders as ",n.jsx(e.code,{children:"SushiButton"})," instead. Useful for:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Rolling out wrappers incrementally"}),`
`,n.jsx(e.li,{children:"A/B testing component variants"}),`
`,n.jsx(e.li,{children:"Migrations between implementations"}),`
`]}),`
`,n.jsxs(e.p,{children:["See ",n.jsx(e.a,{href:"/docs/components-environment--overview",children:"Environment"})," for details."]})]})}function m(s={}){const{wrapper:e}={...o(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(t,{...s})}):t(s)}export{m as default};
