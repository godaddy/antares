import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-rqmcBZiQ.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CvDsPpKC.js";import{t as c}from"./mdx-react-shim-ExQ0cklr.js";import{Alignment as l,Areas as u,Columns as d,Default as f,Form as p,Gap as m,Props as h,Responsive as g,n as _,t as v}from"./grid.stories-C74ZNb89.js";var y,b=e((()=>{y=`import { Grid, Flex, type GridProps } from '@godaddy/antares';

export function DefaultExample(props: GridProps) {
  return (
    <Grid columns="repeat(3, 1fr)" gap="sm" {...props}>
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
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 5
      </Flex>
      <Flex padding="sm" style={{ background: '#e0e0e0' }}>
        Item 6
      </Flex>
    </Grid>
  );
}
`})),x,S=e((()=>{x=`import { Grid, Flex } from '@godaddy/antares';

export function ColumnsExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">columns: repeat(2, 1fr)</Flex>
        <Grid columns="repeat(2, 1fr)" gap="sm">
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
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">columns: 1fr 2fr 1fr</Flex>
        <Grid columns="1fr 2fr 1fr" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Narrow
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Wide
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Narrow
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">columns: auto 1fr auto</Flex>
        <Grid columns="auto 1fr auto" gap="sm">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Auto
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Flexible
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Auto
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
}
`})),C,w=e((()=>{C=`import { Grid, Flex } from '@godaddy/antares';

export function GapExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xs</Flex>
        <Grid columns="repeat(3, 1fr)" gap="xs">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: md</Flex>
        <Grid columns="repeat(3, 1fr)" gap="md">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">gap: xl</Flex>
        <Grid columns="repeat(3, 1fr)" gap="xl">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">rowGap: lg, columnGap: xs</Flex>
        <Grid columns="repeat(3, 1fr)" rowGap="lg" columnGap="xs">
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
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 5
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Item 6
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
}
`})),T,E=e((()=>{T=`import { Grid, Flex } from '@godaddy/antares';

export function AreasExample() {
  return (
    <Grid
      areas={['header header header', 'sidebar main main', 'footer footer footer']}
      columns="200px 1fr 1fr"
      rows="auto 1fr auto"
      gap="sm"
      style={{ height: '300px' }}
    >
      <Flex gridArea="header" padding="sm" style={{ background: '#c0c0c0' }}>
        Header
      </Flex>
      <Flex gridArea="sidebar" padding="sm" style={{ background: '#d0d0d0' }}>
        Sidebar
      </Flex>
      <Flex gridArea="main" padding="sm" style={{ background: '#e0e0e0' }}>
        Main Content
      </Flex>
      <Flex gridArea="footer" padding="sm" style={{ background: '#c0c0c0' }}>
        Footer
      </Flex>
    </Grid>
  );
}
`})),D,O=e((()=>{D=`import { Grid, Flex } from '@godaddy/antares';

export function ResponsiveExample() {
  return (
    <Grid columns="repeat(auto-fill, minmax(150px, 1fr))" gap="sm">
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 1
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 2
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 3
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 4
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 5
      </Flex>
      <Flex padding="md" style={{ background: '#e0e0e0' }}>
        Card 6
      </Flex>
    </Grid>
  );
}
`})),k,A=e((()=>{k=`import { Grid, Flex } from '@godaddy/antares';

export function AlignmentExample() {
  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyItems: center</Flex>
        <Grid columns="repeat(3, 1fr)" gap="sm" justifyItems="center" elevation="base">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">alignItems: center (with fixed row height)</Flex>
        <Grid columns="repeat(3, 1fr)" rows="100px" gap="sm" alignItems="center" elevation="base">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            Centered
          </Flex>
        </Grid>
      </Flex>

      <Flex direction="column" gap="sm">
        <Flex as="strong">justifyItems: end, alignItems: end</Flex>
        <Grid columns="repeat(3, 1fr)" rows="80px" gap="sm" justifyItems="end" alignItems="end" elevation="base">
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
          <Flex padding="sm" style={{ background: '#e0e0e0' }}>
            End
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
}
`})),j,M=e((()=>{j=`import { Grid, Flex } from '@godaddy/antares';

export function FormExample() {
  return (
    <Grid columns="auto 1fr" gap="md" alignItems="center" style={{ width: '400px' }}>
      <Flex as="label">Name</Flex>
      <Flex padding="sm" style={{ background: '#f5f5f5' }}>
        Input placeholder
      </Flex>

      <Flex as="label">Email</Flex>
      <Flex padding="sm" style={{ background: '#f5f5f5' }}>
        Input placeholder
      </Flex>

      <Flex as="label">Message</Flex>
      <Flex padding="sm" style={{ background: '#f5f5f5' }}>
        Textarea placeholder
      </Flex>
    </Grid>
  );
}
`}));function N(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(o,{of:v,name:`Overview`}),`
`,(0,F.jsx)(t.h1,{id:`grid`,children:`Grid`}),`
`,(0,F.jsx)(t.p,{children:`Two-dimensional CSS Grid layout component for complex grid-based layouts with rows and columns`}),`
`,(0,F.jsxs)(t.p,{children:[`Grid is a two-dimensional CSS Grid layout component for complex grid-based layouts. It extends `,(0,F.jsx)(t.a,{href:`../box/README.mdx`,children:(0,F.jsx)(t.code,{children:`Box`})}),`, inheriting all Box capabilities (padding, elevation, rounding, self-alignment, and polymorphic `,(0,F.jsx)(t.code,{children:`as`}),` prop).`]}),`
`,(0,F.jsxs)(t.p,{children:[(0,F.jsx)(t.strong,{children:`Use Grid when`}),`: You need explicit two-dimensional layouts with rows and columns, named grid areas, or responsive auto-fill patterns.`]}),`
`,(0,F.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,F.jsx)(t.pre,{children:(0,F.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,F.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`Grid`}),` component accepts the following props:`]}),`
`,(0,F.jsx)(a,{of:h}),`
`,(0,F.jsx)(t.h2,{id:`scale-sizes`,children:`Scale Sizes`}),`
`,(0,F.jsxs)(t.p,{children:[`We use the same scale sizes as the `,(0,F.jsx)(t.code,{children:`Box`}),` component. For more information, see the `,(0,F.jsx)(t.a,{href:`../box/README.mdx#scale-sizes`,children:(0,F.jsx)(t.strong,{children:`Box component documentation`})}),`.`]}),`
`,(0,F.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,F.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,F.jsx)(t.p,{children:`Basic 3-column grid layout with gap.`}),`
`,(0,F.jsx)(i,{of:f,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:y}),`
`,(0,F.jsx)(t.h3,{id:`columns`,children:`Columns`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`columns`}),` prop defines grid column tracks using CSS grid-template-columns syntax.`]}),`
`,(0,F.jsx)(i,{of:d,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:x}),`
`,(0,F.jsx)(t.h3,{id:`gap`,children:`Gap`}),`
`,(0,F.jsxs)(t.p,{children:[`The `,(0,F.jsx)(t.code,{children:`gap`}),` prop controls spacing between grid cells. Use `,(0,F.jsx)(t.code,{children:`rowGap`}),` and `,(0,F.jsx)(t.code,{children:`columnGap`}),` for independent control.`]}),`
`,(0,F.jsx)(i,{of:m,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:C}),`
`,(0,F.jsx)(t.h3,{id:`named-areas`,children:`Named Areas`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`areas`}),` to define named grid regions. Children use `,(0,F.jsx)(t.code,{children:`gridArea`}),` prop for placement.`]}),`
`,(0,F.jsx)(i,{of:u,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:T}),`
`,(0,F.jsx)(t.h3,{id:`responsive-grid`,children:`Responsive Grid`}),`
`,(0,F.jsxs)(t.p,{children:[`Use CSS `,(0,F.jsx)(t.code,{children:`auto-fill`}),` and `,(0,F.jsx)(t.code,{children:`minmax()`}),` for responsive column counts without media queries.`]}),`
`,(0,F.jsx)(i,{of:g,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:D}),`
`,(0,F.jsx)(t.h3,{id:`alignment`,children:`Alignment`}),`
`,(0,F.jsxs)(t.p,{children:[`Use `,(0,F.jsx)(t.code,{children:`justifyItems`}),` and `,(0,F.jsx)(t.code,{children:`alignItems`}),` to control default alignment of all grid children.`]}),`
`,(0,F.jsx)(i,{of:l,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:k}),`
`,(0,F.jsx)(t.h3,{id:`form-layout`,children:`Form Layout`}),`
`,(0,F.jsx)(t.p,{children:`A common two-column form pattern with auto-sized label column.`}),`
`,(0,F.jsx)(i,{of:p,inline:!0}),`
`,(0,F.jsx)(r,{language:`tsx`,code:j}),`
`,(0,F.jsx)(t.h2,{id:`rtl-support`,children:`RTL Support`}),`
`,(0,F.jsx)(t.p,{children:`Grid uses CSS logical properties which automatically adapt to RTL layouts. Grid areas and alignment respect the document direction.`}),`
`,(0,F.jsx)(t.h2,{id:`grid-vs-flex`,children:`Grid vs Flex`}),`
`,(0,F.jsxs)(t.table,{children:[(0,F.jsx)(t.thead,{children:(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.th,{children:`Use Case`}),(0,F.jsx)(t.th,{children:`Recommended`})]})}),(0,F.jsxs)(t.tbody,{children:[(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Single row/column of items`}),(0,F.jsx)(t.td,{children:`Flex`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Two-dimensional layouts`}),(0,F.jsx)(t.td,{children:`Grid`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Named layout regions`}),(0,F.jsx)(t.td,{children:`Grid`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Auto-wrapping cards`}),(0,F.jsx)(t.td,{children:`Grid (auto-fill)`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Navigation bars`}),(0,F.jsx)(t.td,{children:`Flex`})]}),(0,F.jsxs)(t.tr,{children:[(0,F.jsx)(t.td,{children:`Form layouts`}),(0,F.jsx)(t.td,{children:`Grid`})]})]})]})]})}function P(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,F.jsx)(t,{...e,children:(0,F.jsx)(N,{...e})}):N(e)}var F;e((()=>{F=t(),c(),s(),_(),b(),S(),w(),E(),O(),A(),M()}))();export{P as default};