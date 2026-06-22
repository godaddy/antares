import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-Uo2KdkBJ.js";import{S as n,s as r,u as i}from"./blocks-D71N2sol.js";import{t as a}from"./mdx-react-shim-BBYy9xSA.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/Guides/Customization`}),`
`,(0,c.jsx)(t.h1,{id:`customization`,children:`Customization`}),`
`,(0,c.jsx)(t.p,{children:`Bento primitives are headless—they provide behavior and accessibility without cosmetic styling. Your design system adds the visual layer on top.`}),`
`,(0,c.jsx)(t.h2,{id:`choosing-an-approach`,children:`Choosing an Approach`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Approach`}),(0,c.jsx)(t.th,{children:`Use When`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.strong,{children:`Wrapper`})}),(0,c.jsx)(t.td,{children:`Adding styling, tokens, or variants to a primitive`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.strong,{children:`Slots`})}),(0,c.jsx)(t.td,{children:`Replacing an internal part (like an icon) without forking`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.strong,{children:`Environment`})}),(0,c.jsx)(t.td,{children:`Swapping a primitive globally across a subtree`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`wrappers`,children:`Wrappers`}),`
`,(0,c.jsxs)(t.p,{children:[`The most common pattern. Wrap a Bento primitive with your own component that adds styling and design tokens. Use `,(0,c.jsx)(t.code,{children:`withSlots`}),` and `,(0,c.jsx)(t.code,{children:`useProps`}),` so your wrapper follows the same conventions as Bento primitives—enabling render props, slots, and composition.`]}),`
`,(0,c.jsxs)(t.p,{children:[`This example uses `,(0,c.jsx)(t.a,{href:`https://cva.style`,rel:`nofollow`,children:`CVA (Class Variance Authority)`}),` to manage variants:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Button, type ButtonProps } from '@bento/button';
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
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`.sushi-button {
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
`,(0,c.jsxs)(t.p,{children:[`By using `,(0,c.jsx)(t.code,{children:`withSlots`}),` and `,(0,c.jsx)(t.code,{children:`useProps`}),`, your wrapper:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Supports render props on any prop (className, style, aria-*, etc.)`}),`
`,(0,c.jsx)(t.li,{children:`Can be slotted into other components`}),`
`,(0,c.jsx)(t.li,{children:`Can define its own slots for further customization`}),`
`,(0,c.jsx)(t.li,{children:`Follows the same composition patterns as Bento primitives`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`For styling patterns (data attributes, Tailwind, CSS Modules), see the `,(0,c.jsx)(t.a,{href:`/docs/bento-architecture-guides-styling--docs`,children:`Styling guide`}),`.`]}),`
`,(0,c.jsx)(t.h2,{id:`slots`,children:`Slots`}),`
`,(0,c.jsx)(t.p,{children:`When you need to replace an internal part of a primitive without copying the whole implementation.`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`@bento/checkbox`}),` exposes slots for its icons: `,(0,c.jsx)(t.code,{children:`icon-checked`}),`, `,(0,c.jsx)(t.code,{children:`icon-unchecked`}),`, `,(0,c.jsx)(t.code,{children:`icon-indeterminate`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Checkbox, type CheckboxProps } from '@bento/checkbox';
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
`,(0,c.jsxs)(t.p,{children:[`Each component documents which slots it exposes. For the full slot model, see `,(0,c.jsx)(t.a,{href:`/docs/higher-order-components-slots--overview`,children:`withSlots`}),`.`]}),`
`,(0,c.jsx)(t.h2,{id:`environment`,children:`Environment`}),`
`,(0,c.jsx)(t.p,{children:`When you need to replace a primitive everywhere within a subtree.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Environment } from '@bento/environment';

<Environment components={{ BentoButton: SushiButton }}>
  <App />
</Environment>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Every `,(0,c.jsx)(t.code,{children:`Button`}),` inside `,(0,c.jsx)(t.code,{children:`<App />`}),` renders as `,(0,c.jsx)(t.code,{children:`SushiButton`}),` instead. Useful for:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Rolling out wrappers incrementally`}),`
`,(0,c.jsx)(t.li,{children:`A/B testing component variants`}),`
`,(0,c.jsx)(t.li,{children:`Migrations between implementations`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`See `,(0,c.jsx)(t.a,{href:`/docs/components-environment--overview`,children:`Environment`}),` for details.`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};