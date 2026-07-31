import{i as e}from"./preload-helper-DEA0MoIu.js";import{y as t}from"./iframe-CllodfFq.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CGfdTELn.js";import{t as c}from"./mdx-react-shim-BIjPV-6s.js";import{AvatarButtonProps as l,AvatarFallbackProps as u,AvatarImageProps as d,Button as f,ButtonDisabled as p,ButtonSelected as m,Default as h,Emphasis as g,IconFallback as _,Image as v,ImageFallback as y,Props as b,Shapes as x,n as S,t as C}from"./avatar.stories-Bv2z43Bb.js";var w,T=e((()=>{w=`import { Avatar, AvatarButton, AvatarFallback } from '@godaddy/antares';

export function ButtonExample() {
  return (
    <AvatarButton aria-label="Account">
      <Avatar>
        <AvatarFallback>UT</AvatarFallback>
      </Avatar>
    </AvatarButton>
  );
}
`})),E,D=e((()=>{E=`import { Avatar, AvatarButton, AvatarFallback } from '@godaddy/antares';

export interface ButtonDisabledExampleProps {
  onPress?: () => void;
}

export function ButtonDisabledExample({ onPress }: ButtonDisabledExampleProps) {
  return (
    <AvatarButton aria-label="Unavailable account" isDisabled onPress={onPress}>
      <Avatar>
        <AvatarFallback>UT</AvatarFallback>
      </Avatar>
    </AvatarButton>
  );
}
`})),O,k=e((()=>{O=`import { Avatar, AvatarButton, AvatarFallback, Flex } from '@godaddy/antares';
import { useState } from 'react';

const accounts = [
  { id: 'uma', initials: 'UT', label: 'Uma Thurman' },
  { id: 'acme', initials: 'AC', label: 'Acme' },
  { id: 'jamie', initials: 'JR', label: 'Jamie Rivera' }
];

export function ButtonSelectedExample() {
  const [selectedAccount, setSelectedAccount] = useState('uma');

  return (
    <Flex gap="md">
      {accounts.map(function renderAccount(account) {
        return (
          <AvatarButton
            key={account.id}
            aria-label={\`Switch to \${account.label}\`}
            isSelected={selectedAccount === account.id}
            onPress={function selectAccount() {
              setSelectedAccount(account.id);
            }}
          >
            <Avatar shape={account.id === 'acme' ? 'square' : 'circle'}>
              <AvatarFallback>{account.initials}</AvatarFallback>
            </Avatar>
          </AvatarButton>
        );
      })}
    </Flex>
  );
}
`})),A,j=e((()=>{A=`import { Avatar, AvatarFallback } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Avatar>
      <AvatarFallback>UT</AvatarFallback>
    </Avatar>
  );
}
`})),M,N=e((()=>{M=`import { Avatar, AvatarFallback, Flex, type AvatarEmphasis } from '@godaddy/antares';

const emphases: AvatarEmphasis[] = [
  'primary',
  'subtle',
  'figure0',
  'figure1',
  'figure2',
  'figure3',
  'figure4',
  'figure5',
  'figure6',
  'figure7',
  'figure8',
  'figure9',
  'figure10',
  'figure11',
  'figure12',
  'figure13',
  'figure14'
];

export function EmphasisExample() {
  return (
    <Flex gap="sm" wrap="wrap">
      {emphases.map(function renderAvatar(emphasis, index) {
        return (
          <Avatar key={emphasis} emphasis={emphasis}>
            <AvatarFallback>{index < 2 ? emphasis.slice(0, 1).toUpperCase() : \`\${index - 2}\`}</AvatarFallback>
          </Avatar>
        );
      })}
    </Flex>
  );
}
`})),P,F=e((()=>{P=`import { Avatar, AvatarFallback, Icon } from '@godaddy/antares';

export function IconFallbackExample() {
  return (
    <Avatar>
      <AvatarFallback>
        <Icon icon="user" />
      </AvatarFallback>
    </Avatar>
  );
}
`})),I,L=e((()=>{I=`import { Avatar, AvatarFallback, AvatarImage } from '@godaddy/antares';

export function ImageFallbackExample() {
  return (
    <Avatar>
      <AvatarImage src="/missing-avatar-image.png" alt="" />
      <AvatarFallback>UT</AvatarFallback>
    </Avatar>
  );
}
`})),R,z=e((()=>{R=`import { Avatar, AvatarFallback, AvatarImage } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%23145fa9%22/%3E%3Ctext x=%2264%22 y=%2274%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2252%22 text-anchor=%22middle%22%3EUT%3C/text%3E%3C/svg%3E';

export function ImageExample() {
  return (
    <Avatar>
      <AvatarImage src={image} alt="Uma Thurman" />
      <AvatarFallback>UT</AvatarFallback>
    </Avatar>
  );
}
`})),B,V=e((()=>{B=`import { Avatar, AvatarFallback, Flex, Text } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export function ShapesExample() {
  return (
    <Flex direction="column" gap="md">
      <Flex direction="column" gap="sm">
        <Text>Circle</Text>
        <Flex alignItems="center" gap="md">
          {sizes.map(function renderCircle(size) {
            return (
              <Avatar key={size} shape="circle" size={size}>
                <AvatarFallback>UT</AvatarFallback>
              </Avatar>
            );
          })}
        </Flex>
      </Flex>
      <Flex direction="column" gap="sm">
        <Text>Square</Text>
        <Flex alignItems="center" gap="md">
          {sizes.map(function renderSquare(size) {
            return (
              <Avatar key={size} shape="square" size={size}>
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
`}));function H(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(o,{of:C,name:`Overview`}),`
`,(0,W.jsx)(t.h1,{id:`avatar`,children:`Avatar`}),`
`,(0,W.jsx)(t.p,{children:`Compact visual identifiers for people, organizations, workspaces, and accounts.`}),`
`,(0,W.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,W.jsxs)(t.ul,{children:[`
`,(0,W.jsxs)(t.li,{children:[`Compound `,(0,W.jsx)(t.code,{children:`Avatar`}),`, `,(0,W.jsx)(t.code,{children:`AvatarImage`}),`, and `,(0,W.jsx)(t.code,{children:`AvatarFallback`}),` parts`]}),`
`,(0,W.jsx)(t.li,{children:`Circle and rounded-square shapes at four named sizes`}),`
`,(0,W.jsx)(t.li,{children:`Image fallback handling that works with server rendering`}),`
`,(0,W.jsx)(t.li,{children:`Primary, subtle, and 15 categorical figure emphases`}),`
`,(0,W.jsxs)(t.li,{children:[(0,W.jsx)(t.code,{children:`AvatarButton`}),` for accessible interactive avatar controls`]}),`
`]}),`
`,(0,W.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,W.jsx)(t.pre,{children:(0,W.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,W.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,W.jsx)(t.h3,{id:`avatar-1`,children:`Avatar`}),`
`,(0,W.jsx)(t.p,{children:`Configures the Avatar surface, including its shape, size, and color treatment.`}),`
`,(0,W.jsx)(a,{of:b}),`
`,(0,W.jsx)(t.h3,{id:`avatarimage`,children:`AvatarImage`}),`
`,(0,W.jsx)(t.p,{children:`Renders the image content and supports native image props.`}),`
`,(0,W.jsx)(a,{of:d}),`
`,(0,W.jsx)(t.h3,{id:`avatarfallback`,children:`AvatarFallback`}),`
`,(0,W.jsx)(t.p,{children:`Renders monogram, icon, or other fallback content while an image is unavailable.`}),`
`,(0,W.jsx)(a,{of:u}),`
`,(0,W.jsx)(t.h3,{id:`avatarbutton`,children:`AvatarButton`}),`
`,(0,W.jsx)(t.p,{children:`Makes an Avatar subtree interactive and adds selected, focus, hover, open, and disabled states.`}),`
`,(0,W.jsx)(a,{of:l}),`
`,(0,W.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,W.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,W.jsx)(t.p,{children:`Use an Avatar with a one- or two-character monogram when no image is available.`}),`
`,(0,W.jsx)(r,{language:`tsx`,code:A}),`
`,(0,W.jsx)(i,{of:h,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`image`,children:`Image`}),`
`,(0,W.jsxs)(t.p,{children:[`Place `,(0,W.jsx)(t.code,{children:`AvatarImage`}),` before `,(0,W.jsx)(t.code,{children:`AvatarFallback`}),`. The fallback is visible until the image loads and after an image error.`]}),`
`,(0,W.jsx)(r,{language:`tsx`,code:R}),`
`,(0,W.jsx)(i,{of:v,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`image-fallback`,children:`Image Fallback`}),`
`,(0,W.jsx)(t.p,{children:`Use a fallback for every image Avatar so an unavailable photo never leaves an empty identity marker.`}),`
`,(0,W.jsx)(r,{language:`tsx`,code:I}),`
`,(0,W.jsx)(i,{of:y,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`shapes-and-sizes`,children:`Shapes and Sizes`}),`
`,(0,W.jsx)(t.p,{children:`Avatar supports circle and square shapes at every named size.`}),`
`,(0,W.jsx)(r,{language:`tsx`,code:B}),`
`,(0,W.jsx)(i,{of:x,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,W.jsxs)(t.p,{children:[`Use `,(0,W.jsx)(t.code,{children:`primary`}),` for the standard high-contrast treatment, `,(0,W.jsx)(t.code,{children:`subtle`}),` for a quieter treatment, and a `,(0,W.jsx)(t.code,{children:`figure0`}),` through `,(0,W.jsx)(t.code,{children:`figure14`}),` value to categorize entities.`]}),`
`,(0,W.jsx)(r,{language:`tsx`,code:M}),`
`,(0,W.jsx)(i,{of:g,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`icon-fallback`,children:`Icon Fallback`}),`
`,(0,W.jsx)(t.p,{children:`Fallback content can be an icon when a monogram is not meaningful.`}),`
`,(0,W.jsx)(r,{language:`tsx`,code:P}),`
`,(0,W.jsx)(i,{of:_,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`avatarbutton-1`,children:`AvatarButton`}),`
`,(0,W.jsx)(t.p,{children:`Use AvatarButton when an avatar triggers an action.`}),`
`,(0,W.jsx)(r,{language:`tsx`,code:w}),`
`,(0,W.jsx)(i,{of:f,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`selected-avatarbutton`,children:`Selected AvatarButton`}),`
`,(0,W.jsxs)(t.p,{children:[`Use a controlled `,(0,W.jsx)(t.code,{children:`isSelected`}),` state when an AvatarButton represents the current selection.`]}),`
`,(0,W.jsx)(r,{language:`tsx`,code:O}),`
`,(0,W.jsx)(i,{of:m,inline:!0}),`
`,(0,W.jsx)(t.h3,{id:`disabled-avatarbutton`,children:`Disabled AvatarButton`}),`
`,(0,W.jsxs)(t.p,{children:[`Use `,(0,W.jsx)(t.code,{children:`isDisabled`}),` when the action is unavailable.`]}),`
`,(0,W.jsx)(r,{language:`tsx`,code:E}),`
`,(0,W.jsx)(i,{of:p,inline:!0}),`
`,(0,W.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,W.jsxs)(t.p,{children:[`Use AvatarImage native image props for responsive image sources. Choose a deterministic `,(0,W.jsx)(t.code,{children:`figure0`}),` through `,(0,W.jsx)(t.code,{children:`figure14`}),` emphasis in lists that categorize multiple entities.`]}),`
`,(0,W.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,W.jsxs)(t.ul,{children:[`
`,(0,W.jsxs)(t.li,{children:[`Give AvatarImage meaningful `,(0,W.jsx)(t.code,{children:`alt`}),` text when the image conveys an identity.`]}),`
`,(0,W.jsx)(t.li,{children:`AvatarFallback text remains available to assistive technology when no image loads.`}),`
`,(0,W.jsxs)(t.li,{children:[`Use `,(0,W.jsx)(t.code,{children:`alt=""`}),` or `,(0,W.jsx)(t.code,{children:`aria-hidden`}),` when an avatar is purely decorative.`]}),`
`,(0,W.jsxs)(t.li,{children:[`AvatarButton requires `,(0,W.jsx)(t.code,{children:`aria-label`}),` or `,(0,W.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,W.jsx)(t.li,{children:`AvatarButton supports keyboard activation and exposes the standard focus-visible state.`}),`
`]}),`
`,(0,W.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,W.jsxs)(t.ul,{children:[`
`,(0,W.jsx)(t.li,{children:`Use Avatar for informational identity; use AvatarButton only when the avatar is independently actionable.`}),`
`,(0,W.jsx)(t.li,{children:`Use circle for people and square for businesses, workspaces, and accounts.`}),`
`,(0,W.jsx)(t.li,{children:`Keep monograms to one or two uppercase characters.`}),`
`,(0,W.jsxs)(t.li,{children:[`Use the same `,(0,W.jsx)(t.code,{children:`figure*`}),` emphasis for the same entity wherever it appears.`]}),`
`]}),`
`,(0,W.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,W.jsxs)(t.ul,{children:[`
`,(0,W.jsx)(t.li,{children:`If an image is unavailable because of a bad URL or CORS policy, AvatarFallback remains visible.`}),`
`,(0,W.jsx)(t.li,{children:`Long fallback text is clipped to the avatar shape; provide a one- or two-character monogram or an icon.`}),`
`,(0,W.jsx)(t.li,{children:`Figure colors repeat after 15 values; assign a deterministic figure emphasis in the consuming application.`}),`
`]})]})}function U(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,W.jsx)(t,{...e,children:(0,W.jsx)(H,{...e})}):H(e)}var W;e((()=>{W=t(),c(),s(),T(),D(),k(),j(),N(),F(),L(),z(),V(),S()}))();export{U as default};