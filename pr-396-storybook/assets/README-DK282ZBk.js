import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-DnUz_dMH.js";import{a as l,c as u,d,f,i as p,l as m,n as h,o as g,r as _,s as v,t as y,u as b}from"./skeleton.stories-DaGShK2-.js";function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(s,{of:f,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`skeleton`,children:`Skeleton`}),`
`,(0,C.jsx)(t.p,{children:`A placeholder that previews the layout of content while it loads.`}),`
`,(0,C.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[`Six height presets, from `,(0,C.jsx)(t.code,{children:`xs`}),` (0.75rem) to `,(0,C.jsx)(t.code,{children:`2xl`}),` (3.5rem)`]}),`
`,(0,C.jsx)(t.li,{children:`Custom width and height for media and other non-standard shapes`}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.code,{children:`default`}),`, `,(0,C.jsx)(t.code,{children:`full`}),`, and `,(0,C.jsx)(t.code,{children:`none`}),` rounding`]}),`
`,(0,C.jsx)(t.li,{children:`A subtle shimmer that reverses in right-to-left locales and stops when reduced motion is preferred`}),`
`,(0,C.jsx)(t.li,{children:`Composable into text blocks, avatars, cards, and other loading patterns`}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,C.jsxs)(t.p,{children:[`A Skeleton fills the width of its container at the `,(0,C.jsx)(t.code,{children:`md`}),` height.`]}),`
`,(0,C.jsx)(a,{of:_,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Skeleton, type SkeletonProps } from '@godaddy/antares';

export function DefaultExample(props: SkeletonProps) {
  return <Skeleton {...props} />;
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,C.jsxs)(t.p,{children:[`Size presets set the height, from `,(0,C.jsx)(t.code,{children:`xs`}),` (0.75rem) to `,(0,C.jsx)(t.code,{children:`2xl`}),` (3.5rem). They suit text and basic
controls such as inputs and buttons.`]}),`
`,(0,C.jsx)(a,{of:m,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Grid, Skeleton, Text } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h3,{id:`roundings`,children:`Roundings`}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.code,{children:`default`}),` follows the theme radius, `,(0,C.jsx)(t.code,{children:`full`}),` makes a pill or, with a matching width, a circle,
and `,(0,C.jsx)(t.code,{children:`none`}),` keeps square corners.`]}),`
`,(0,C.jsx)(a,{of:v,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h3,{id:`custom-size`,children:`Custom size`}),`
`,(0,C.jsxs)(t.p,{children:[`Set `,(0,C.jsx)(t.code,{children:`width`}),` and `,(0,C.jsx)(t.code,{children:`height`}),` for placeholders such as images. Numbers are pixels, and strings take
any CSS length. A custom `,(0,C.jsx)(t.code,{children:`height`}),` overrides `,(0,C.jsx)(t.code,{children:`size`}),`.`]}),`
`,(0,C.jsx)(a,{of:h,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

export function CustomSizeExample() {
  return (
    <Flex direction="column" gap="md">
      <Skeleton width={240} height={120} />
      <Skeleton width="50%" height="5rem" />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`avatar`,children:`Avatar`}),`
`,(0,C.jsxs)(t.p,{children:[`Match `,(0,C.jsx)(t.code,{children:`width`}),` to `,(0,C.jsx)(t.code,{children:`size`}),` for avatar placeholders. Use `,(0,C.jsx)(t.code,{children:`full`}),` rounding for people and the default
rounding for businesses and accounts.`]}),`
`,(0,C.jsx)(a,{of:y,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export function AvatarExample() {
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
`,(0,C.jsx)(t.h3,{id:`text-block`,children:`Text Block`}),`
`,(0,C.jsx)(t.p,{children:`Stack bars of varying widths so a paragraph reads like real sentences.`}),`
`,(0,C.jsx)(a,{of:b,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h3,{id:`media-card`,children:`Media card`}),`
`,(0,C.jsxs)(t.p,{children:[`Compose Skeletons inside a Card to preview media and text. Use `,(0,C.jsx)(t.code,{children:`height="auto"`}),` with an
`,(0,C.jsx)(t.code,{children:`aspectRatio`}),` style to keep media proportions.`]}),`
`,(0,C.jsx)(a,{of:l,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Card, Flex, Grid, Skeleton } from '@godaddy/antares';

export function MediaCardExample() {
  return (
    <Grid columns="repeat(auto-fit, minmax(min(100%, 16rem), 1fr))" gap="lg" alignItems="start">
      <Card>
        <Skeleton height="auto" style={{ aspectRatio: '16 / 9' }} />
        <Flex direction="column" gap="sm">
          <Skeleton size="lg" width="60%" />
          <Skeleton size="sm" />
          <Skeleton size="sm" width="80%" />
        </Flex>
      </Card>

      <Card>
        <Grid columns="6rem 1fr" gap="lg" alignItems="center">
          <Skeleton height="auto" style={{ aspectRatio: '1' }} />
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
`,(0,C.jsx)(t.h3,{id:`in-a-row`,children:`In a row`}),`
`,(0,C.jsxs)(t.p,{children:[`In a Flex row, a Skeleton with a `,(0,C.jsx)(t.code,{children:`width`}),` keeps its shape, and a default Skeleton fills the
remaining space.`]}),`
`,(0,C.jsx)(a,{of:u,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Flex, Skeleton } from '@godaddy/antares';

export function RowExample() {
  return (
    <Flex alignItems="center" gap="md">
      <Skeleton size="xl" width="xl" rounding="full" />
      <Skeleton />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,C.jsx)(t.h3,{id:`loading-region`,children:`Loading region`}),`
`,(0,C.jsxs)(t.p,{children:[`Skeletons are hidden from assistive technology. Mark the region they fill with `,(0,C.jsx)(t.code,{children:`role="status"`}),`,
`,(0,C.jsx)(t.code,{children:`aria-busy`}),`, and an `,(0,C.jsx)(t.code,{children:`aria-label`}),`, then set `,(0,C.jsx)(t.code,{children:`aria-busy`}),` to `,(0,C.jsx)(t.code,{children:`false`}),` when the content arrives.`]}),`
`,(0,C.jsx)(a,{of:p,inline:!0}),`
`,(0,C.jsx)(i,{code:`import { Flex, Grid, Skeleton } from '@godaddy/antares';

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
`,(0,C.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`Every Skeleton is hidden from assistive technology, so a page with many placeholders stays quiet.`}),`
`,(0,C.jsxs)(t.li,{children:[`Mark the region the Skeletons fill with `,(0,C.jsx)(t.code,{children:`role="status"`}),`, `,(0,C.jsx)(t.code,{children:`aria-busy="true"`}),`, and an `,(0,C.jsx)(t.code,{children:`aria-label`}),` that describes what is loading.`]}),`
`,(0,C.jsxs)(t.li,{children:[`Set `,(0,C.jsx)(t.code,{children:`aria-busy`}),` to `,(0,C.jsx)(t.code,{children:`false`}),`, or remove it, once the real content replaces the Skeletons.`]}),`
`,(0,C.jsx)(t.li,{children:`The shimmer stops when the user prefers reduced motion, and the shape gets an outline in forced colors mode.`}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsx)(t.li,{children:`Approximate the final layout; a skeleton doesn't need to be pixel-perfect.`}),`
`,(0,C.jsx)(t.li,{children:`Use size presets for text and basic controls, and custom dimensions for images and media.`}),`
`,(0,C.jsx)(t.li,{children:`Vary the widths of text bars so a paragraph reads like real sentences.`}),`
`,(0,C.jsxs)(t.li,{children:[`Match `,(0,C.jsx)(t.code,{children:`width`}),` to `,(0,C.jsx)(t.code,{children:`size`}),` with `,(0,C.jsx)(t.code,{children:`full`}),` rounding for circular avatars.`]}),`
`]}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(o,{of:g})]})}function S(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;function w(){return(w=e((()=>{C=t(),n(),c(),d()})))()}w();export{S as default};