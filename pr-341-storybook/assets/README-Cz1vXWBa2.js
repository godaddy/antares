import{i as e}from"./preload-helper-m4Fz4Gr4.js";import{F as t}from"./iframe-B-q3GRy0.js";import{S as n,l as r,s as i,u as a}from"./blocks-BcN6zGbO.js";import{t as o}from"./mdx-react-shim-BQosoJGS.js";import{r as s}from"./runtime-B_Wak706.js";import{n as c,t as l}from"./storybook-runtime-1Eclk-tY.js";import{Preview as u,n as d,t as f}from"./sign-in-form.stories-CCqyoIeP.js";function p(e){let t={h1:`h1`,p:`p`,...n(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{of:d,name:`Overview`,id:`blocks-sign-in-form`}),`
`,(0,h.jsx)(t.h1,{id:`sign-in-form`,children:`Sign-in form`}),`
`,(0,h.jsx)(t.p,{children:`A simple Antares sign-in experience.`}),`
`,(0,h.jsx)(l,{block:{id:`sign-in-form`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/sign-in-form`,files:[{path:`components/sign-in-fields.tsx`,language:`tsx`,source:`import { Flex, Input, Label, TextField } from '@godaddy/antares';
import { signInCopy } from '../data/copy';

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
import { signInCopy } from '../data/copy';
import { SignInFields } from './sign-in-fields';

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
`},{path:`index.tsx`,language:`tsx`,source:`export { SignInForm } from './components/sign-in-form';
`}]},children:(0,h.jsx)(r,{of:u,inline:!0})})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),o(),c(),a(),s(),f()}))();export{m as default};