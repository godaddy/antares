import{i as e}from"./preload-helper-HTw_Lvtv.js";import{F as t}from"./iframe-DuSz9zC3.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-oFxifGoG.js";import{t as c}from"./mdx-react-shim-DhE-A3Zz.js";import{Alignment as l,Default as u,Direction as d,Gap as f,Navbar as p,Props as m,Sidebar as h,Wrap as g,n as _,t as v}from"./flex.stories-D79-369S.js";function y(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`flex`,children:`Flex`}),`
`,(0,x.jsx)(t.p,{children:`One-dimensional layout component for arranging children in rows or columns with alignment and spacing control`}),`
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.code,{children:`Flex`}),` is a one-dimensional layout component for arranging children in rows or columns with alignment and spacing control. It extends `,(0,x.jsx)(t.code,{children:`Box`}),`, inheriting all `,(0,x.jsx)(t.code,{children:`Box`}),` capabilities (padding, elevation, rounding, self-alignment, and polymorphic `,(0,x.jsx)(t.code,{children:`as`}),` prop).`]}),`
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.strong,{children:`Recommended default`}),`: Use `,(0,x.jsx)(t.code,{children:`Flex`}),` for most layouts. Since it extends `,(0,x.jsx)(t.code,{children:`Box`}),`, you get all `,(0,x.jsx)(t.code,{children:`Box`}),` capabilities without needing to nest components.`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`scale-sizes`,children:`Scale Sizes`}),`
`,(0,x.jsxs)(t.p,{children:[`We use the same scale sizes as the `,(0,x.jsx)(t.code,{children:`Box`}),` component. For more information, see the `,(0,x.jsx)(t.a,{href:`../box/README.mdx#scale-sizes`,children:(0,x.jsx)(t.strong,{children:`Box component documentation`})}),`.`]}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`Basic horizontal flex layout with gap.`}),`
`,(0,x.jsx)(i,{of:u,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex, type FlexProps } from '@godaddy/antares';

export function DefaultExample(props: FlexProps) {
  return (
    <Flex gap="sm" {...props}>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 1
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 2
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 3
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`direction`,children:`Direction`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`direction`}),` prop controls the main axis orientation.`]}),`
`,(0,x.jsx)(i,{of:d,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex } from '@godaddy/antares';

export function DirectionExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">Row (default)</Flex>
        <Flex gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">Column</Flex>
        <Flex direction="column" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">Row Reverse</Flex>
        <Flex direction="row-reverse" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`justifyContent`}),` for main-axis distribution and `,(0,x.jsx)(t.code,{children:`alignItems`}),` for cross-axis alignment.`]}),`
`,(0,x.jsx)(i,{of:l,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: space-between</Flex>
        <Flex justifyContent="space-between">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Start
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Middle
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: center</Flex>
        <Flex justifyContent="center" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyContent: end</Flex>
        <Flex justifyContent="end" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: center (with varying heights)</Flex>
        <Flex alignItems="center" gap="sm" style={{ height: '100px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Short
          </Flex>
          <Flex padding="lg" style={{ background: '#e0e0e0' }}>
            Tall
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Short
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: stretch (default)</Flex>
        <Flex alignItems="stretch" gap="sm" style={{ height: '100px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`gap`,children:`Gap`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`gap`}),` prop controls spacing between children. Use `,(0,x.jsx)(t.code,{children:`rowGap`}),` and `,(0,x.jsx)(t.code,{children:`columnGap`}),` for independent control.`]}),`
`,(0,x.jsx)(i,{of:f,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex } from '@godaddy/antares';

export function GapExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xs</Flex>
        <Flex gap="xs">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: sm</Flex>
        <Flex gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: md</Flex>
        <Flex gap="md">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: lg</Flex>
        <Flex gap="lg">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xl</Flex>
        <Flex gap="xl">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">rowGap + columnGap (with wrap)</Flex>
        <Flex wrap="wrap" rowGap="lg" columnGap="xs" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`wrap`,children:`Wrap`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`wrap`}),` prop controls whether items wrap to multiple lines.`]}),`
`,(0,x.jsx)(i,{of:g,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex } from '@godaddy/antares';

export function WrapExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">wrap: nowrap (default)</Flex>
        <Flex wrap="nowrap" gap="sm" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">wrap: wrap</Flex>
        <Flex wrap="wrap" gap="sm" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">wrap: wrap-reverse</Flex>
        <Flex wrap="wrap-reverse" gap="sm" style={{ width: '200px' }}>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 1
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 2
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 3
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 4
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`navbar`,children:`Navbar`}),`
`,(0,x.jsx)(t.p,{children:`A common navigation bar pattern using space-between and nested Flex containers.`}),`
`,(0,x.jsx)(i,{of:p,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex, LinkButton, Button } from '@godaddy/antares';

export function NavbarExample() {
  return (
    <Flex as="nav" alignItems="center" justifyContent="space-between" padding="xs">
      <Flex as="h1">Logo</Flex>

      <Flex gap="sm">
        <LinkButton href="#">Home</LinkButton>
        <LinkButton href="#">About</LinkButton>
        <LinkButton href="#">Contact</LinkButton>
      </Flex>

      <Flex gap="sm">
        <Button variant="primary">Sign In</Button>
        <Button variant="secondary">Sign Up</Button>
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`sidebar`,children:`Sidebar`}),`
`,(0,x.jsxs)(t.p,{children:[`A sidebar layout demonstrating Flex child props (`,(0,x.jsx)(t.code,{children:`flexShrink`}),`, `,(0,x.jsx)(t.code,{children:`flexGrow`}),`).`]}),`
`,(0,x.jsx)(i,{of:h,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Flex, LinkButton } from '@godaddy/antares';

export function SidebarExample() {
  return (
    <Flex rounding="reduced">
      <Flex as="aside" direction="column" gap="sm" padding="xs" flexShrink="0" style={{ width: '200px' }}>
        <Flex as="h3">Navigation</Flex>
        <LinkButton href="#">Dashboard</LinkButton>
        <LinkButton href="#">Settings</LinkButton>
        <LinkButton href="#">Profile</LinkButton>
      </Flex>

      <Flex as="main" direction="column" padding="md" flexGrow="1">
        <Flex as="h2">Main Content</Flex>
        <Flex as="p">
          This main content area uses flexGrow="1" to fill the remaining space. The sidebar uses flexShrink="0" to
          maintain its fixed width.
        </Flex>
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`rtl-support`,children:`RTL Support`}),`
`,(0,x.jsxs)(t.p,{children:[`Flex uses CSS logical properties which automatically adapt to RTL layouts. The `,(0,x.jsx)(t.code,{children:`direction`}),` prop values (`,(0,x.jsx)(t.code,{children:`row`}),`, `,(0,x.jsx)(t.code,{children:`row-reverse`}),`) respect the document direction.`]}),`
`,(0,x.jsx)(t.h2,{id:`design-tokens`,children:`Design Tokens`}),`
`,(0,x.jsx)(t.p,{children:`All gap and padding values are derived from the theme. If no theme is provided, default values are used. This ensures consistency across the design system.`}),`
`,(0,x.jsx)(t.h2,{id:`migration-from-uxbox`,children:`Migration from @ux/box`}),`
`,(0,x.jsxs)(t.table,{children:[(0,x.jsx)(t.thead,{children:(0,x.jsxs)(t.tr,{children:[(0,x.jsxs)(t.th,{children:[`Current `,(0,x.jsx)(t.code,{children:`@ux/box`})]}),(0,x.jsx)(t.th,{children:`New Pattern`})]})}),(0,x.jsxs)(t.tbody,{children:[(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Box orientation="horizontal">`})}),(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Flex direction="row" >`})})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Box orientation="vertical">`})}),(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Flex direction="column" >`})})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Box blockAlignChildren="center">`})}),(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Flex justifyContent="center">`})})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Box inlineAlignChildren="center">`})}),(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`<Flex alignItems="center">`})})]})]})]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`Flex`}),` component accepts the following props:`]}),`
`,(0,x.jsx)(a,{of:m})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),c(),s(),_()}))();export{b as default};