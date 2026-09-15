import{i as e,s as t}from"./preload-helper-m4Fz4Gr4.js";import{F as n,st as r}from"./iframe-Cq05_Fvo.js";import{S as i,l as a,s as o,u as s}from"./blocks-BNR48Xc-.js";import{t as c}from"./mdx-react-shim-D-bhgtRg.js";import{r as l,t as u}from"./src-mBPDtaur.js";import{n as d,t as f,vn as p,wn as m}from"./antares-DesBQIfZ.js";import{t as h}from"./src-C0jbfUh-.js";import{r as g}from"./runtime-CsXkwVwJ.js";import{n as _,t as v}from"./storybook-runtime-DpnVyNFe.js";import{Preview as y,t as b}from"./sign-in-form.stories-BdZ8Eor8.js";function x({children:e}){return(0,w.jsx)(l,{as:`main`,blockPadding:`2xl`,inlinePadding:`xl`,children:(0,w.jsxs)(u,{as:`section`,direction:`column`,alignItems:`center`,gap:`2xl`,children:[(0,w.jsxs)(d,{align:`center`,size:`xl`,children:[(0,w.jsx)(h,{slot:`eyebrow`,children:`Antares blocks`}),(0,w.jsx)(m,{slot:`title`,level:1,children:`Build product experiences with Antares.`}),(0,w.jsx)(h,{slot:`body`,children:`Discover complete UI patterns, inspect how they are built, and use them as a foundation for your product.`})]}),C.Children.count(e)>0?(0,w.jsx)(p,{as:`section`,alignSelf:`stretch`,columns:`repeat(auto-fit, minmax(min(100%, 24rem), 1fr))`,gap:`xl`,inlinePadding:`md`,children:e}):(0,w.jsx)(h,{as:`p`,children:`No blocks are available yet.`})]})})}function S({children:e}){return(0,w.jsx)(l,{as:`article`,elevation:`base`,rounding:`md`,children:e})}var C,w,T=e((()=>{C=t(r(),1),f(),w=n()}));function E(e){return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(o,{title:`Blocks`,id:`blocks`}),`
`,(0,O.jsx)(x,{children:(0,O.jsx)(S,{children:(0,O.jsx)(v,{block:{id:`sign-in-form`,title:`Sign-in form`,description:`A simple Antares sign-in experience.`,files:[{path:`index.tsx`,language:`tsx`,source:`export { SignInForm } from './components/sign-in-form.tsx';
`},{path:`components/sign-in-form.tsx`,language:`tsx`,source:`import { Box, Button, Flex, Heading, Text } from '@godaddy/antares';
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
`},{path:`components/sign-in-fields.tsx`,language:`tsx`,source:`import { Flex, Input, Label, TextField } from '@godaddy/antares';
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
`},{path:`data/copy.ts`,language:`ts`,source:`export const signInCopy = {
  title: 'Sign in to your account',
  description: 'Use your email and password to continue.',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitLabel: 'Sign in'
} as const;
`}]},children:(0,O.jsx)(a,{of:y,inline:!0})})})})]})}function D(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,O.jsx)(t,{...e,children:(0,O.jsx)(E,{...e})}):E(e)}var O;e((()=>{O=n(),c(),_(),s(),g(),T(),b()}))();export{D as default};