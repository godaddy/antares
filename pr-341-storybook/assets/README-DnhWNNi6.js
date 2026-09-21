import{i as e}from"./preload-helper-m4Fz4Gr4.js";import{F as t}from"./iframe-CURluP8g.js";import{S as n,l as r,s as i,u as a}from"./blocks-BwniKQo7.js";import{t as o}from"./mdx-react-shim-BmR8UqKp.js";import{r as s}from"./runtime-CatCSGJx.js";import{n as c,t as l}from"./storybook-runtime-BFPZjbSF.js";import{Preview as u,t as d}from"./sign-in-form.stories-BOp0w4fH.js";function f(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i,{title:`Blocks`,id:`blocks`}),`
`,(0,m.jsx)(t.h1,{id:`build-product-experiences-with-antares`,children:`Build product experiences with Antares.`}),`
`,(0,m.jsx)(t.p,{children:`Discover complete UI patterns, inspect how they are built, and use them as a foundation for your product.`}),`
`,(0,m.jsx)(t.h2,{id:`install-a-block`,children:`Install a block`}),`
`,(0,m.jsx)(t.p,{children:`From the root of your application, run the command copied by the block's Install button:`}),`
`,(0,m.jsx)(t.pre,{children:(0,m.jsx)(t.code,{className:`language-bash`,children:`npx shadcn@latest add godaddy/antares/blocks/sign-in-form
`})}),`
`,(0,m.jsx)(t.h2,{id:`blocks`,children:`Blocks`}),`
`,(0,m.jsx)(t.h3,{id:`sign-in-form`,children:`Sign-in form`}),`
`,(0,m.jsx)(l,{block:{id:`sign-in-form`,description:`A simple Antares sign-in experience.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/sign-in-form`,files:[{path:`components/sign-in-fields.tsx`,language:`tsx`,source:`import { Flex, Input, Label, TextField } from '@godaddy/antares';
import { signInCopy } from '../data/copy.ts';

/** Groups the accessible fields used by the sign-in form block. */
export function SignInFields() {
  return (
    <Flex direction="column" gap="md">
      <TextField name="email" isRequired>
        <Label>{signInCopy.emailLabel}</Label>
        <Input type="email" autoComplete="email" placeholder="you@example.com" />
      </TextField>
      <TextField name="password" isRequired>
        <Label>{signInCopy.passwordLabel}</Label>
        <Input type="password" autoComplete="current-password" />
      </TextField>
    </Flex>
  );
}
`},{path:`components/sign-in-form.tsx`,language:`tsx`,source:`'use client';

import { Box, Button, Flex, Heading, Text } from '@godaddy/antares';
import { signInCopy } from '../data/copy.ts';
import { SignInFields } from './sign-in-fields.tsx';

/** Presents the shared sign-in form composition used in block documentation. */
export function SignInForm() {
  return (
    <Flex justifyContent="center">
      <Box flex="0 1 28rem" padding="xl" rounding="md" elevation="card">
        <Flex
          as="form"
          direction="column"
          gap="lg"
          onSubmit={function handleSubmit(event) {
            event.preventDefault();
          }}
        >
          <Heading level={2}>{signInCopy.title}</Heading>
          <Text>{signInCopy.description}</Text>
          <SignInFields />
          <Button type="submit" variant="primary">
            {signInCopy.submitLabel}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
`},{path:`data/copy.ts`,language:`ts`,source:`export const signInCopy = {
  title: 'Sign in to your account',
  description: 'Use your email and password to continue.',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitLabel: 'Sign in'
} as const;
`},{path:`index.tsx`,language:`tsx`,source:`export { SignInForm } from './components/sign-in-form.tsx';
`}]},children:(0,m.jsx)(r,{of:u,inline:!0})})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(f,{...e})}):f(e)}var m;e((()=>{m=t(),o(),c(),a(),s(),d()}))();export{p as default};