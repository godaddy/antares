import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-BOALhIm0.js";import{a as l,c as u,d,f,i as p,l as m,m as h,n as g,o as _,p as v,r as y,s as b,t as x,u as S}from"./skeleton.stories-C_dN-njS.js";function C(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(s,{of:h,name:`Overview`}),`
`,(0,T.jsx)(t.h1,{id:`skeleton`,children:`Skeleton`}),`
`,(0,T.jsx)(t.p,{children:`A placeholder that previews the layout of content while it loads.`}),`
`,(0,T.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[`Height presets from `,(0,T.jsx)(t.code,{children:`xs`}),` to `,(0,T.jsx)(t.code,{children:`2xl`})]}),`
`,(0,T.jsx)(t.li,{children:`Aspect ratios for images and other media`}),`
`,(0,T.jsx)(t.li,{children:`Custom width and height for non-standard shapes`}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`default`}),`, `,(0,T.jsx)(t.code,{children:`full`}),`, and `,(0,T.jsx)(t.code,{children:`none`}),` rounding`]}),`
`,(0,T.jsx)(t.li,{children:`A subtle shimmer that reverses in right-to-left locales and stops when reduced motion is preferred`}),`
`,(0,T.jsx)(t.li,{children:`Composable into text blocks, avatars, cards, and other loading patterns`}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,T.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,T.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,T.jsxs)(t.p,{children:[`A Skeleton fills the width of its container at the `,(0,T.jsx)(t.code,{children:`md`}),` height.`]}),`
`,(0,T.jsx)(a,{of:y,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Skeleton, type SkeletonProps } from '@godaddy/antares';

export function DefaultExample(props: SkeletonProps) {
  return <Skeleton {...props} />;
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,T.jsx)(t.p,{children:`Size presets set the height. They suit text and basic controls such as inputs and buttons.`}),`
`,(0,T.jsx)(a,{of:d,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Grid, Skeleton, Text } from '@godaddy/antares';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export function SizesExample() {
  return (
    <Grid columns="2.5rem 1fr" alignItems="center" gap="md">
      {sizes.map(function renderSize(size) {
        return [<Text key={\`\${size}-label\`}>{size}</Text>, <Skeleton key={size} size={size} />];
      })}
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`roundings`,children:`Roundings`}),`
`,(0,T.jsxs)(t.p,{children:[(0,T.jsx)(t.code,{children:`default`}),` follows the theme radius, `,(0,T.jsx)(t.code,{children:`full`}),` makes a pill or, with a matching width, a circle,
and `,(0,T.jsx)(t.code,{children:`none`}),` keeps square corners.`]}),`
`,(0,T.jsx)(a,{of:u,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

export function RoundingsExample() {
  return (
    <Flex direction="column" gap="md">
      <Skeleton rounding="default" />
      <Skeleton rounding="full" />
      <Skeleton rounding="full" width="md" />
      <Skeleton rounding="none" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`custom-size`,children:`Custom size`}),`
`,(0,T.jsxs)(t.p,{children:[`Set `,(0,T.jsx)(t.code,{children:`width`}),` and `,(0,T.jsx)(t.code,{children:`height`}),` for placeholders with non-standard dimensions. Numbers are pixels, and
strings take any CSS length. A custom `,(0,T.jsx)(t.code,{children:`height`}),` overrides `,(0,T.jsx)(t.code,{children:`size`}),`.`]}),`
`,(0,T.jsx)(a,{of:g,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

export function CustomSizeExample() {
  return (
    <Flex direction="column" gap="md">
      <Skeleton width={240} height={120} />
      <Skeleton width="50%" height="5rem" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`aspect-ratio`,children:`Aspect ratio`}),`
`,(0,T.jsxs)(t.p,{children:[`Set `,(0,T.jsx)(t.code,{children:`aspectRatio`}),` for images and other media. The height follows the width, so the placeholder
keeps its proportions at any size.`]}),`
`,(0,T.jsx)(a,{of:x,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Grid, Skeleton } from '@godaddy/antares';

const ratios = ['16 / 9', '4 / 3', '1', '3 / 4', '9 / 16'] as const;

export function AspectRatioExample() {
  return (
    <Grid columns={\`repeat(\${ratios.length}, 1fr)\`} gap="md" alignItems="end">
      {ratios.map(function renderRatio(ratio) {
        return <Skeleton key={ratio} aspectRatio={ratio} />;
      })}
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`circles-and-squares`,children:`Circles and squares`}),`
`,(0,T.jsxs)(t.p,{children:[`Match `,(0,T.jsx)(t.code,{children:`width`}),` to `,(0,T.jsx)(t.code,{children:`size`}),` to make a square, and add `,(0,T.jsx)(t.code,{children:`full`}),` rounding to make a circle.`]}),`
`,(0,T.jsx)(a,{of:S,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;

export function ShapesExample() {
  return (
    <Flex direction="column" gap="md">
      <Flex alignItems="center" gap="md">
        {sizes.map(function renderCircle(size) {
          return <Skeleton key={size} size={size} width={size} rounding="full" />;
        })}
      </Flex>
      <Flex alignItems="center" gap="md">
        {sizes.map(function renderSquare(size) {
          return <Skeleton key={size} size={size} width={size} />;
        })}
      </Flex>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`text-block`,children:`Text Block`}),`
`,(0,T.jsx)(t.p,{children:`Stack bars of varying widths so a paragraph reads like real sentences.`}),`
`,(0,T.jsx)(a,{of:f,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

export function TextBlockExample() {
  return (
    <Flex direction="column" gap="sm">
      <Skeleton size="xs" width="25%" />
      <Skeleton size="lg" width="50%" />
      <Skeleton size="sm" width="95%" />
      <Skeleton size="sm" />
      <Skeleton size="sm" width="60%" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`media-card`,children:`Media card`}),`
`,(0,T.jsx)(t.p,{children:`Compose Skeletons inside a Card to preview media and text.`}),`
`,(0,T.jsx)(a,{of:l,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Card, Flex, Grid, Skeleton } from '@godaddy/antares';

export function MediaCardExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <Skeleton aspectRatio="16 / 9" />
        <Flex direction="column" gap="sm">
          <Skeleton size="lg" width="60%" />
          <Skeleton size="sm" />
          <Skeleton size="sm" width="80%" />
        </Flex>
      </Card>

      <Card>
        <Grid columns="6rem 1fr" gap="lg" alignItems="center">
          <Skeleton aspectRatio={1} />
          <Flex direction="column" gap="sm">
            <Skeleton size="lg" width="70%" />
            <Skeleton size="sm" />
            <Skeleton size="sm" width="50%" />
          </Flex>
        </Grid>
      </Card>
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`in-a-row`,children:`In a row`}),`
`,(0,T.jsxs)(t.p,{children:[`In a Flex row, a Skeleton with a `,(0,T.jsx)(t.code,{children:`width`}),` keeps its shape, and a default Skeleton fills the
remaining space.`]}),`
`,(0,T.jsx)(a,{of:m,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

export function RowExample() {
  return (
    <Flex alignItems="center" gap="md">
      <Skeleton size="xl" width="xl" rounding="full" />
      <Skeleton />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`loading-region`,children:`Loading region`}),`
`,(0,T.jsxs)(t.p,{children:[`Skeletons are hidden from assistive technology. Mark the region they fill with `,(0,T.jsx)(t.code,{children:`role="status"`}),`,
`,(0,T.jsx)(t.code,{children:`aria-busy`}),`, and an `,(0,T.jsx)(t.code,{children:`aria-label`}),`, then set `,(0,T.jsx)(t.code,{children:`aria-busy`}),` to `,(0,T.jsx)(t.code,{children:`false`}),` when the content arrives.`]}),`
`,(0,T.jsx)(a,{of:p,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Flex, Grid, Skeleton } from '@godaddy/antares';

export function LoadingRegionExample() {
  return (
    <Grid role="status" aria-busy="true" aria-label="Loading profile" columns="auto 1fr" gap="md" alignItems="center">
      <Skeleton size="xl" width="xl" rounding="full" />
      <Flex direction="column" gap="sm">
        <Skeleton size="sm" width="40%" />
        <Skeleton size="xs" width="25%" />
      </Flex>
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`rtl-direction`,children:`RTL direction`}),`
`,(0,T.jsxs)(t.p,{children:[`Skeleton follows the `,(0,T.jsx)(t.code,{children:`dir`}),` of the page or a parent element. In right-to-left layouts, bars align
to the right and the shimmer moves from right to left.`]}),`
`,(0,T.jsx)(a,{of:b,inline:!0}),`
`,(0,T.jsx)(i,{code:`import { Box } from '@godaddy/antares';
import { TextBlockExample } from './text-block.tsx';

export function RTLExample() {
  return (
    <Box dir="rtl">
      <TextBlockExample />
    </Box>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsx)(t.li,{children:`Every Skeleton is hidden from assistive technology, so a page with many placeholders stays quiet.`}),`
`,(0,T.jsxs)(t.li,{children:[`Mark the region the Skeletons fill with `,(0,T.jsx)(t.code,{children:`role="status"`}),`, `,(0,T.jsx)(t.code,{children:`aria-busy="true"`}),`, and an `,(0,T.jsx)(t.code,{children:`aria-label`}),` that describes what is loading.`]}),`
`,(0,T.jsxs)(t.li,{children:[`Set `,(0,T.jsx)(t.code,{children:`aria-busy`}),` to `,(0,T.jsx)(t.code,{children:`false`}),`, or remove it, once the real content replaces the Skeletons.`]}),`
`,(0,T.jsx)(t.li,{children:`The shimmer stops when the user prefers reduced motion, and the shape gets an outline in forced colors mode.`}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsx)(t.li,{children:`Approximate the final layout; a skeleton doesn't need to be pixel-perfect.`}),`
`,(0,T.jsxs)(t.li,{children:[`Use size presets for text and basic controls, and `,(0,T.jsx)(t.code,{children:`aspectRatio`}),` for images and media.`]}),`
`,(0,T.jsx)(t.li,{children:`Vary the widths of text bars so a paragraph reads like real sentences.`}),`
`,(0,T.jsxs)(t.li,{children:[`Match `,(0,T.jsx)(t.code,{children:`width`}),` to `,(0,T.jsx)(t.code,{children:`size`}),` for squares, and add `,(0,T.jsx)(t.code,{children:`full`}),` rounding for circles.`]}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[`If the shimmer doesn't reverse in a right-to-left app, set `,(0,T.jsx)(t.code,{children:`dir="rtl"`}),` on `,(0,T.jsx)(t.code,{children:`<html>`}),` or a parent element. Skeleton follows the `,(0,T.jsx)(t.code,{children:`dir`}),` attribute, and a locale set only through `,(0,T.jsx)(t.code,{children:`I18nProvider`}),` doesn't change it.`]}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,T.jsx)(o,{of:_})]})}function w(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,T.jsx)(t,{...e,children:(0,T.jsx)(C,{...e})}):C(e)}var T;function E(){return(E=e((()=>{T=t(),n(),c(),v()})))()}E();export{w as default};