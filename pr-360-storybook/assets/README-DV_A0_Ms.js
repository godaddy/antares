import{i as e}from"./preload-helper-BbaScr5H.js";import{F as t}from"./iframe-BgG2rnzj.js";import{S as n,c as r,l as i,s as a,u as o}from"./blocks-CRqfD2JA.js";import{t as s}from"./mdx-react-shim-DqcGW9bU.js";import{t as c}from"./runtime-BXfE7Pk1.js";import{ContainerLayout as l,Default as u,Form as d,ResponsiveSize as f,ViewportLayout as p,n as m,t as h}from"./responsive.stories-BM9ZpIWe.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(a,{of:m,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`responsive`,children:`Responsive`}),`
`,(0,v.jsx)(t.p,{children:`How Antares components adapt, and how to build responsive layouts around them with native CSS.`}),`
`,(0,v.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsx)(t.li,{children:`Components adapt to the space they are given with intrinsic CSS and container queries.`}),`
`,(0,v.jsx)(t.li,{children:`Page layout stays in your CSS, with your own media queries and breakpoints.`}),`
`,(0,v.jsxs)(t.li,{children:[`Component sizes can follow `,(0,v.jsx)(t.code,{children:`--antares-size`}),`, so your CSS can change them at any breakpoint.`]}),`
`,(0,v.jsx)(t.li,{children:`Responsive styles are plain CSS, so server rendering needs no viewport guess.`}),`
`]}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`intrinsic-layout`,children:`Intrinsic layout`}),`
`,(0,v.jsxs)(t.p,{children:[`Hosting plans wrap into as many columns as fit, with no breakpoint. `,(0,v.jsx)(t.code,{children:`auto-fill`}),` and `,(0,v.jsx)(t.code,{children:`minmax()`}),`
pick the column count from the available width. Start here before reaching for a query.`]}),`
`,(0,v.jsx)(i,{of:u,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Button, Flex, Grid, Heading, Text } from '@godaddy/antares';

const plans = [
  { name: 'Economy', summary: 'One website with 25 GB of storage.' },
  { name: 'Deluxe', summary: 'Ten websites with 50 GB of storage.' },
  { name: 'Ultimate', summary: 'Twenty-five websites with 75 GB of storage.' }
];

export function DefaultExample() {
  return (
    <Grid as="section" aria-label="Hosting plans" columns="repeat(auto-fill, minmax(min(16rem, 100%), 1fr))" gap="md">
      {plans.map(function plan({ name, summary }) {
        return (
          <Flex key={name} direction="column" alignItems="start" gap="sm" padding="md" elevation="card">
            <Heading level={3}>{name}</Heading>
            <Text>{summary}</Text>
            <Button variant="secondary">Choose {name}</Button>
          </Flex>
        );
      })}
    </Grid>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`container-query`,children:`Container query`}),`
`,(0,v.jsx)(t.p,{children:`The same domain card sits in a narrow sidebar and a wide main area. It stacks in the sidebar and
lines up in the main area at the same viewport width, because it queries its own container. The
28rem threshold belongs to the card. Its CSS owns the direction and alignment, so those props stay
unset.`}),`
`,(0,v.jsx)(i,{of:l,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Box, Button, Flex, Heading, Text } from '@godaddy/antares';

interface DomainCardProps {
  domain: string;
  renewal: string;
}

function DomainCard({ domain, renewal }: DomainCardProps) {
  return (
    <Box as="article" aria-label={domain} padding="md" elevation="card" className="responsive-domain-card">
      <Flex gap="sm" className="responsive-domain-card-body">
        <Flex direction="column" gap="xs">
          <Heading level={3}>{domain}</Heading>
          <Text>{renewal}</Text>
        </Flex>
        <Flex wrap="wrap" gap="sm">
          <Button variant="secondary">Manage DNS</Button>
          <Button>Renew</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export function ContainerLayoutExample() {
  return (
    <>
      <style>{\`
        .responsive-container-example-sidebar {
          flex: 1 1 14rem;
        }

        .responsive-container-example-main {
          flex: 3 1 28rem;
        }

        .responsive-domain-card {
          container: domain-card / inline-size;
        }

        .responsive-domain-card-body {
          flex-direction: column;
        }

        @container domain-card (min-width: 28rem) {
          .responsive-domain-card-body {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      \`}</style>
      <Flex wrap="wrap" gap="md">
        <Box as="aside" aria-label="Sidebar" className="responsive-container-example-sidebar">
          <DomainCard domain="shop.example" renewal="Renews on March 2, 2027" />
        </Box>
        <Box as="main" aria-label="Domains" className="responsive-container-example-main">
          <DomainCard domain="example.com" renewal="Renews on January 12, 2027" />
        </Box>
      </Flex>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`viewport-media-query`,children:`Viewport media query`}),`
`,(0,v.jsxs)(t.p,{children:[`Page layout belongs to the app, so its CSS picks the breakpoint. This settings page shows its
navigation beside the content from `,(0,v.jsx)(t.code,{children:`64rem`}),` and stacks it above the content below that. Leave
`,(0,v.jsx)(t.code,{children:`columns`}),` unset so it does not place a competing value in inline styles.`]}),`
`,(0,v.jsx)(i,{of:p,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Box, Flex, Grid, Heading, LinkButton, Text } from '@godaddy/antares';

const sections = [
  { name: 'Profile', href: '#profile' },
  { name: 'Security', href: '#security' },
  { name: 'Payment methods', href: '#payment-methods' },
  { name: 'Notifications', href: '#notifications' }
];

export function ViewportLayoutExample() {
  return (
    <>
      <style>{\`
        .responsive-viewport-example {
          grid-template-columns: minmax(0, 1fr);
        }

        @media (min-width: 64rem) {
          .responsive-viewport-example {
            grid-template-columns: 16rem minmax(0, 1fr);
          }
        }
      \`}</style>
      <Grid as="section" aria-label="Account settings" gap="lg" className="responsive-viewport-example">
        <Box as="nav" aria-label="Settings">
          <Flex direction="column" alignItems="start" gap="xs">
            {sections.map(function section({ name, href }) {
              return (
                <LinkButton key={name} variant="minimal" href={href}>
                  {name}
                </LinkButton>
              );
            })}
          </Flex>
        </Box>
        <Flex as="section" aria-label="Profile" direction="column" gap="sm" padding="md" elevation="card">
          <Heading level={2}>Profile</Heading>
          <Text>Update the name and contact details on your account.</Text>
        </Flex>
      </Grid>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`form-reflow`,children:`Form reflow`}),`
`,(0,v.jsxs)(t.p,{children:[`Billing details in one column on small screens and two from `,(0,v.jsx)(t.code,{children:`64rem`}),`. Type into a field and resize:
CSS reflows the same inputs, preserving their values, focus, and selection. Let CSS own the columns
and allow long descriptions to wrap.`]}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Grid, Input, Label, Text, TextField } from '@godaddy/antares';

interface FormExampleProps {
  /** Help text that can wrap onto multiple lines. */
  description?: string;

  /** Reading direction of the form. */
  dir?: 'ltr' | 'rtl';
}

export function FormExample({ description = 'Use the name on your payment card.', dir }: FormExampleProps) {
  return (
    <>
      <style>{\`
        .responsive-form-example {
          grid-template-columns: minmax(0, 1fr);
        }

        .responsive-form-example-field {
          min-inline-size: 0;
          overflow-wrap: anywhere;
        }

        @media (min-width: 64rem) {
          .responsive-form-example {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .responsive-form-example-wide {
            grid-column: 1 / -1;
          }
        }
      \`}</style>
      <Grid as="form" aria-label="Billing details" dir={dir} gap="md" className="responsive-form-example">
        <TextField name="name" autoComplete="name" className="responsive-form-example-field">
          <Label>Full name</Label>
          <Input />
          <Text slot="description">{description}</Text>
        </TextField>
        <TextField name="email" type="email" autoComplete="email" className="responsive-form-example-field">
          <Label>Email</Label>
          <Input />
        </TextField>
        <TextField
          name="address"
          autoComplete="street-address"
          className="responsive-form-example-field responsive-form-example-wide"
        >
          <Label>Street address</Label>
          <Input />
        </TextField>
        <TextField name="city" autoComplete="address-level2" className="responsive-form-example-field">
          <Label>City</Label>
          <Input />
        </TextField>
        <TextField name="postalCode" autoComplete="postal-code" className="responsive-form-example-field">
          <Label>Postal code</Label>
          <Input />
        </TextField>
      </Grid>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`responsive-size`,children:`Responsive size`}),`
`,(0,v.jsxs)(t.p,{children:[`A `,(0,v.jsx)(t.code,{children:`TextLockup`}),` without `,(0,v.jsx)(t.code,{children:`size`}),` follows `,(0,v.jsx)(t.code,{children:`--antares-size`}),` from a parent, so the app's CSS can change it
at its own breakpoint. This dashboard greeting is `,(0,v.jsx)(t.code,{children:`md`}),` on small screens and `,(0,v.jsx)(t.code,{children:`xl`}),` from `,(0,v.jsx)(t.code,{children:`80rem`}),`.
Browsers without container style queries keep the lockup's JSX size.`]}),`
`,(0,v.jsx)(i,{of:f,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { Box, Heading, Text, TextLockup } from '@godaddy/antares';

export function ResponsiveSizeExample() {
  return (
    <>
      <style>{\`
        .responsive-size-example {
          --antares-size: md;
        }

        @media (min-width: 80rem) {
          .responsive-size-example {
            --antares-size: xl;
          }
        }
      \`}</style>
      <Box as="header" className="responsive-size-example">
        <TextLockup>
          <Text slot="eyebrow">Dashboard</Text>
          <Heading slot="title" level={1}>
            Welcome back, Ada
          </Heading>
          <Text slot="body">Two domains renew this month. Review them to keep your sites online.</Text>
        </TextLockup>
      </Box>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,v.jsx)(t.p,{children:`Antares publishes no viewport breakpoints. Components don't change by viewport width, except overlays
such as Modal and Drawer, which document their own thresholds. Choose the breakpoints your layout needs,
and write them in your own media or container queries.`}),`
`,(0,v.jsxs)(t.p,{children:[`The examples include their CSS in `,(0,v.jsx)(t.code,{children:`<style>`}),` blocks so the complete code is visible. Applications can
place those rules in their own stylesheets. Layout props such as `,(0,v.jsx)(t.code,{children:`columns`}),` and `,(0,v.jsx)(t.code,{children:`gap`}),` write inline styles,
which beat stylesheet rules. When your CSS changes a property across a query, set it in CSS for every
width and leave the prop unset.`]}),`
`,(0,v.jsxs)(t.p,{children:[`A container can't take its width from its content, so give it one from its parent, as the container
example does with the `,(0,v.jsx)(t.code,{children:`flex`}),` basis of its sidebar and main area. Otherwise it collapses in flex rows and
other shrink-to-fit layouts. Portaled content is outside the container, so it needs a container in its
own DOM ancestry.`]}),`
`,(0,v.jsxs)(t.p,{children:[`In media queries, `,(0,v.jsx)(t.code,{children:`rem`}),` uses the browser's initial font size.`]}),`
`,(0,v.jsx)(t.h3,{id:`responsive-size-1`,children:`Responsive size`}),`
`,(0,v.jsxs)(t.p,{children:[`Component props, including `,(0,v.jsx)(t.code,{children:`size`}),`, take a single value. For a size that changes with the layout, leave
`,(0,v.jsx)(t.code,{children:`size`}),` unset and set `,(0,v.jsx)(t.code,{children:`--antares-size`}),` in your CSS on a parent, as the responsive size example does. A
component can't read the variable from its own element. The nearest value wins, and an explicit `,(0,v.jsx)(t.code,{children:`size`}),` beats it. Without the variable, components
follow the surrounding `,(0,v.jsx)(t.code,{children:`SizeProvider`}),`. Browsers without container style queries ignore the variable.`]}),`
`,(0,v.jsxs)(t.p,{children:[`These components follow `,(0,v.jsx)(t.code,{children:`--antares-size`}),`:`]}),`
`,(0,v.jsxs)(t.table,{children:[(0,v.jsx)(t.thead,{children:(0,v.jsxs)(t.tr,{children:[(0,v.jsx)(t.th,{children:`Component`}),(0,v.jsx)(t.th,{children:`Values`}),(0,v.jsx)(t.th,{children:`Notes`})]})}),(0,v.jsx)(t.tbody,{children:(0,v.jsxs)(t.tr,{children:[(0,v.jsx)(t.td,{children:(0,v.jsx)(t.code,{children:`TextLockup`})}),(0,v.jsxs)(t.td,{children:[(0,v.jsx)(t.code,{children:`xs`}),`-`,(0,v.jsx)(t.code,{children:`2xl`})]}),(0,v.jsxs)(t.td,{children:[`A `,(0,v.jsx)(t.code,{children:`Tag`}),` eyebrow keeps its own size.`]})]})})]}),`
`,(0,v.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsx)(t.p,{children:`Preserve reading order, keyboard focus, and entered values as layouts change: reflow one DOM tree with
CSS instead of rendering different trees. Validate layouts with long text, RTL, narrow widths, text
enlargement, and browser zoom. Resizing the viewport alone does not test every effect of zoom. Use
pointer and hover media features to detect input capabilities, not widths.`})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),s(),o(),c(),h()}))();export{_ as default};