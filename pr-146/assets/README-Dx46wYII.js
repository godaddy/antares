import{j as e}from"./iframe-6GaXOUaT.js";import{useMDXComponents as o}from"./index-Cf9r2Gk8.js";import{M as t,A as i,a as r,S as d}from"./blocks-6xSex4GH.js";import{S as a,P as x,D as m,C as c,G as p,A as g,R as u,a as F,F as h}from"./grid.stories-DsthwZqg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bj9gKbGQ.js";import"./index-CMgpeNKa.js";import"./index-D8j4FsKY.js";import"./index-DrFu-skq.js";import"./index-BZHpy5ln.js";import"./index-C_3Vx422.js";import"./clsx-CgyFOmLt.js";import"./index-D-r1tqzZ.js";import"./mergeProps-DIoepj2e.js";import"./useObjectRef-GZJVnHfU.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-CEGxrnOL.js";import"./useFocusWithin-Qx4aKUdm.js";import"./platform-BULRNHlZ.js";import"./useFocusable-DZQjtpTF.js";import"./Collection-D4gn1lMD.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-VoVYMqej.js";import"./context-45Edcitn.js";import"./useControlledState-B9NBlRKo.js";import"./useOverlayTriggerState-C348ZOJT.js";import"./PortalProvider-lDXbK3q3.js";import"./usePreventScroll-DuxZLyfb.js";import"./useLabel-_TylngYe.js";import"./VisuallyHidden-C2Ucj3xH.js";import"./useField-CjNNHvIE.js";import"./useButton-CudY5WVT.js";import"./index-F36OoBR6.js";import"./index-DEOF3SdA.js";import"./slots-BRJ0SIrG.js";import"./index-U4fMboO0.js";import"./index-CLj43KZG.js";import"./index-BPiTBM6K.js";import"./index-C1FmEf8O.js";import"./create-external-store-TtP3UJpK.js";import"./index-N-5CbV7O.js";import"./client-BKBN4TYK.js";import"./index-cr67a0mC.js";import"./index-RfYcw_2-.js";const f=`import { Grid, Flex, type GridProps } from '@godaddy/antares';

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
`,j=`import { Grid, Flex } from '@godaddy/antares';

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
`,y=`import { Grid, Flex } from '@godaddy/antares';

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
`,b=`import { Grid, Flex } from '@godaddy/antares';

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
`,G=`import { Grid, Flex } from '@godaddy/antares';

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
`,k=`import { Grid, Flex } from '@godaddy/antares';

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
`,I=`import { Grid, Flex } from '@godaddy/antares';

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
`;function s(l){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...o(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:a,name:"Overview"}),`
`,e.jsx(n.h1,{id:"grid",children:"Grid"}),`
`,e.jsx(n.p,{children:"Two-dimensional CSS Grid layout component for complex grid-based layouts with rows and columns"}),`
`,e.jsxs(n.p,{children:["Grid is a two-dimensional CSS Grid layout component for complex grid-based layouts. It extends ",e.jsx(n.a,{href:"../box/README.mdx",children:e.jsx(n.code,{children:"Box"})}),", inheriting all Box capabilities (padding, elevation, rounding, self-alignment, and polymorphic ",e.jsx(n.code,{children:"as"})," prop)."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Grid when"}),": You need explicit two-dimensional layouts with rows and columns, named grid areas, or responsive auto-fill patterns."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Grid"})," component accepts the following props:"]}),`
`,e.jsx(i,{of:x}),`
`,e.jsx(n.h2,{id:"scale-sizes",children:"Scale Sizes"}),`
`,e.jsxs(n.p,{children:["We use the same scale sizes as the ",e.jsx(n.code,{children:"Box"})," component. For more information, see the ",e.jsx(n.a,{href:"../box/README.mdx#scale-sizes",children:e.jsx(n.strong,{children:"Box component documentation"})}),"."]}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"default",children:"Default"}),`
`,e.jsx(n.p,{children:"Basic 3-column grid layout with gap."}),`
`,e.jsx(r,{of:m,inline:!0}),`
`,e.jsx(d,{language:"tsx",code:f}),`
`,e.jsx(n.h3,{id:"columns",children:"Columns"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"columns"})," prop defines grid column tracks using CSS grid-template-columns syntax."]}),`
`,e.jsx(r,{of:c,inline:!0}),`
`,e.jsx(d,{language:"tsx",code:j}),`
`,e.jsx(n.h3,{id:"gap",children:"Gap"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"gap"})," prop controls spacing between grid cells. Use ",e.jsx(n.code,{children:"rowGap"})," and ",e.jsx(n.code,{children:"columnGap"})," for independent control."]}),`
`,e.jsx(r,{of:p,inline:!0}),`
`,e.jsx(d,{language:"tsx",code:y}),`
`,e.jsx(n.h3,{id:"named-areas",children:"Named Areas"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"areas"})," to define named grid regions. Children use ",e.jsx(n.code,{children:"gridArea"})," prop for placement."]}),`
`,e.jsx(r,{of:g,inline:!0}),`
`,e.jsx(d,{language:"tsx",code:b}),`
`,e.jsx(n.h3,{id:"responsive-grid",children:"Responsive Grid"}),`
`,e.jsxs(n.p,{children:["Use CSS ",e.jsx(n.code,{children:"auto-fill"})," and ",e.jsx(n.code,{children:"minmax()"})," for responsive column counts without media queries."]}),`
`,e.jsx(r,{of:u,inline:!0}),`
`,e.jsx(d,{language:"tsx",code:G}),`
`,e.jsx(n.h3,{id:"alignment",children:"Alignment"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"justifyItems"})," and ",e.jsx(n.code,{children:"alignItems"})," to control default alignment of all grid children."]}),`
`,e.jsx(r,{of:F,inline:!0}),`
`,e.jsx(d,{language:"tsx",code:k}),`
`,e.jsx(n.h3,{id:"form-layout",children:"Form Layout"}),`
`,e.jsx(n.p,{children:"A common two-column form pattern with auto-sized label column."}),`
`,e.jsx(r,{of:h,inline:!0}),`
`,e.jsx(d,{language:"tsx",code:I}),`
`,e.jsx(n.h2,{id:"rtl-support",children:"RTL Support"}),`
`,e.jsx(n.p,{children:"Grid uses CSS logical properties which automatically adapt to RTL layouts. Grid areas and alignment respect the document direction."}),`
`,e.jsx(n.h2,{id:"grid-vs-flex",children:"Grid vs Flex"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Use Case"}),e.jsx(n.th,{children:"Recommended"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Single row/column of items"}),e.jsx(n.td,{children:"Flex"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Two-dimensional layouts"}),e.jsx(n.td,{children:"Grid"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Named layout regions"}),e.jsx(n.td,{children:"Grid"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Auto-wrapping cards"}),e.jsx(n.td,{children:"Grid (auto-fill)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Navigation bars"}),e.jsx(n.td,{children:"Flex"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Form layouts"}),e.jsx(n.td,{children:"Grid"})]})]})]})]})}function Fe(l={}){const{wrapper:n}={...o(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(s,{...l})}):s(l)}export{Fe as default};
