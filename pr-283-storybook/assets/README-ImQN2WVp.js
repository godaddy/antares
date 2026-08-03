import{i as e}from"./preload-helper-DEA0MoIu.js";import{y as t}from"./iframe-6dN5ykcy.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-D7s3Oofc.js";import{t as c}from"./mdx-react-shim-B2hW9wl5.js";import{AvatarButtonProps as l,Button as u,ButtonDisabled as d,ButtonSelected as f,Default as p,Emphasis as m,IconFallback as h,Image as g,ImageFallback as _,Props as v,Shapes as y,n as b,t as x}from"./avatar.stories-BRa9_RD4.js";var S,C=e((()=>{S=`import { Avatar, AvatarButton, Text } from '@godaddy/antares';

export function ButtonExample() {
  return (
    <AvatarButton aria-label="Account">
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </AvatarButton>
  );
}
`})),w,T=e((()=>{w=`import { Avatar, AvatarButton, Text } from '@godaddy/antares';

export interface ButtonDisabledExampleProps {
  onPress?: () => void;
}

export function ButtonDisabledExample({ onPress }: ButtonDisabledExampleProps) {
  return (
    <AvatarButton aria-label="Unavailable account" isDisabled onPress={onPress}>
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </AvatarButton>
  );
}
`})),E,D=e((()=>{E=`import { Avatar, AvatarButton, Flex, Text } from '@godaddy/antares';
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
              <Text>{account.initials}</Text>
            </Avatar>
          </AvatarButton>
        );
      })}
    </Flex>
  );
}
`})),O,k=e((()=>{O=`import { Avatar, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Avatar>
      <Text>UT</Text>
    </Avatar>
  );
}
`})),A,j=e((()=>{A=`import { Avatar, Flex, Text, type AvatarEmphasis } from '@godaddy/antares';

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
            <Text>{index < 2 ? emphasis.slice(0, 1).toUpperCase() : \`\${index - 2}\`}</Text>
          </Avatar>
        );
      })}
    </Flex>
  );
}
`})),M,N=e((()=>{M=`import { Avatar, Icon } from '@godaddy/antares';

export function IconFallbackExample() {
  return (
    <Avatar>
      <Icon icon="user" />
    </Avatar>
  );
}
`})),P,F=e((()=>{P=`import { Avatar, Image, Text } from '@godaddy/antares';

export function ImageFallbackExample() {
  return (
    <Avatar>
      <Image src="/missing-avatar-image.png" alt="" />
      <Text>UT</Text>
    </Avatar>
  );
}
`})),I,L=e((()=>{I=`import { Avatar, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%23145fa9%22/%3E%3Ctext x=%2264%22 y=%2274%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2252%22 text-anchor=%22middle%22%3EUT%3C/text%3E%3C/svg%3E';

export function ImageExample() {
  return (
    <Avatar>
      <Image src={image} alt="Uma Thurman" />
      <Text>UT</Text>
    </Avatar>
  );
}
`})),R,z=e((()=>{R=`import { Avatar, Flex, Text } from '@godaddy/antares';

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
                <Text>UT</Text>
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
                <Text>AC</Text>
              </Avatar>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
`}));function B(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(o,{of:x,name:`Overview`}),`
`,(0,H.jsx)(t.h1,{id:`avatar`,children:`Avatar`}),`
`,(0,H.jsx)(t.p,{children:`Compact visual identifiers for people, organizations, workspaces, and accounts.`}),`
`,(0,H.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsxs)(t.li,{children:[`Composable `,(0,H.jsx)(t.code,{children:`Avatar`}),`, `,(0,H.jsx)(t.code,{children:`Image`}),`, and `,(0,H.jsx)(t.code,{children:`Text`}),` parts`]}),`
`,(0,H.jsx)(t.li,{children:`Circle and rounded-square shapes at four named sizes`}),`
`,(0,H.jsx)(t.li,{children:`Image fallback handling through Image loading state`}),`
`,(0,H.jsx)(t.li,{children:`Primary, subtle, and 15 categorical figure emphases`}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.code,{children:`AvatarButton`}),` for accessible interactive avatar controls`]}),`
`]}),`
`,(0,H.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,H.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,H.jsx)(t.h3,{id:`avatar-1`,children:`Avatar`}),`
`,(0,H.jsx)(t.p,{children:`Configures the Avatar surface, including its shape, size, and color treatment.`}),`
`,(0,H.jsx)(a,{of:v}),`
`,(0,H.jsx)(t.h3,{id:`avatarbutton`,children:`AvatarButton`}),`
`,(0,H.jsx)(t.p,{children:`Makes an Avatar subtree interactive and adds selected, focus, hover, open, and disabled states.`}),`
`,(0,H.jsx)(a,{of:l}),`
`,(0,H.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,H.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,H.jsx)(t.p,{children:`Use an Avatar with a one- or two-character monogram when no image is available.`}),`
`,(0,H.jsx)(r,{language:`tsx`,code:O}),`
`,(0,H.jsx)(i,{of:p,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`image`,children:`Image`}),`
`,(0,H.jsxs)(t.p,{children:[`Place `,(0,H.jsx)(t.code,{children:`Image`}),` before `,(0,H.jsx)(t.code,{children:`Text`}),`. The Text fallback is visible until the image loads and after an image error.`]}),`
`,(0,H.jsx)(r,{language:`tsx`,code:I}),`
`,(0,H.jsx)(i,{of:g,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`image-fallback`,children:`Image Fallback`}),`
`,(0,H.jsx)(t.p,{children:`Use a Text fallback for every image Avatar so an unavailable photo never leaves an empty identity marker.`}),`
`,(0,H.jsx)(r,{language:`tsx`,code:P}),`
`,(0,H.jsx)(i,{of:_,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`shapes-and-sizes`,children:`Shapes and Sizes`}),`
`,(0,H.jsx)(t.p,{children:`Avatar supports circle and square shapes at every named size.`}),`
`,(0,H.jsx)(r,{language:`tsx`,code:R}),`
`,(0,H.jsx)(i,{of:y,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,H.jsxs)(t.p,{children:[`Use `,(0,H.jsx)(t.code,{children:`primary`}),` for the standard high-contrast treatment, `,(0,H.jsx)(t.code,{children:`subtle`}),` for a quieter treatment, and a `,(0,H.jsx)(t.code,{children:`figure0`}),` through `,(0,H.jsx)(t.code,{children:`figure14`}),` value to categorize entities.`]}),`
`,(0,H.jsx)(r,{language:`tsx`,code:A}),`
`,(0,H.jsx)(i,{of:m,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`icon-fallback`,children:`Icon Fallback`}),`
`,(0,H.jsx)(t.p,{children:`Use Icon directly when a monogram is not meaningful. Avatar applies the same fallback sizing and visibility behavior without a Text wrapper.`}),`
`,(0,H.jsx)(r,{language:`tsx`,code:M}),`
`,(0,H.jsx)(i,{of:h,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`avatarbutton-1`,children:`AvatarButton`}),`
`,(0,H.jsx)(t.p,{children:`Use AvatarButton when an avatar triggers an action.`}),`
`,(0,H.jsx)(r,{language:`tsx`,code:S}),`
`,(0,H.jsx)(i,{of:u,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`selected-avatarbutton`,children:`Selected AvatarButton`}),`
`,(0,H.jsxs)(t.p,{children:[`Use a controlled `,(0,H.jsx)(t.code,{children:`isSelected`}),` state when an AvatarButton represents the current selection.`]}),`
`,(0,H.jsx)(r,{language:`tsx`,code:E}),`
`,(0,H.jsx)(i,{of:f,inline:!0}),`
`,(0,H.jsx)(t.h3,{id:`disabled-avatarbutton`,children:`Disabled AvatarButton`}),`
`,(0,H.jsxs)(t.p,{children:[`Use `,(0,H.jsx)(t.code,{children:`isDisabled`}),` when the action is unavailable.`]}),`
`,(0,H.jsx)(r,{language:`tsx`,code:w}),`
`,(0,H.jsx)(i,{of:d,inline:!0}),`
`,(0,H.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,H.jsxs)(t.p,{children:[`Use Image native image props for responsive image sources. Choose a deterministic `,(0,H.jsx)(t.code,{children:`figure0`}),` through `,(0,H.jsx)(t.code,{children:`figure14`}),` emphasis in lists that categorize multiple entities.`]}),`
`,(0,H.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsxs)(t.li,{children:[`Give Image meaningful `,(0,H.jsx)(t.code,{children:`alt`}),` text when the image conveys an identity.`]}),`
`,(0,H.jsx)(t.li,{children:`Text remains available to assistive technology when no image loads.`}),`
`,(0,H.jsxs)(t.li,{children:[`Use `,(0,H.jsx)(t.code,{children:`alt=""`}),` or `,(0,H.jsx)(t.code,{children:`aria-hidden`}),` when an avatar is purely decorative.`]}),`
`,(0,H.jsxs)(t.li,{children:[`AvatarButton requires `,(0,H.jsx)(t.code,{children:`aria-label`}),` or `,(0,H.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,H.jsx)(t.li,{children:`AvatarButton supports keyboard activation and exposes the standard focus-visible state.`}),`
`]}),`
`,(0,H.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsx)(t.li,{children:`Use Avatar for informational identity; use AvatarButton only when the avatar is independently actionable.`}),`
`,(0,H.jsx)(t.li,{children:`Use circle for people and square for businesses, workspaces, and accounts.`}),`
`,(0,H.jsx)(t.li,{children:`Keep monograms to one or two uppercase characters.`}),`
`,(0,H.jsxs)(t.li,{children:[`Use the same `,(0,H.jsx)(t.code,{children:`figure*`}),` emphasis for the same entity wherever it appears.`]}),`
`]}),`
`,(0,H.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsx)(t.li,{children:`If an image is unavailable because of a bad URL or CORS policy, Text remains visible.`}),`
`,(0,H.jsx)(t.li,{children:`Long Text content is clipped to the avatar shape; provide a one- or two-character monogram or an icon.`}),`
`,(0,H.jsx)(t.li,{children:`Figure colors repeat after 15 values; assign a deterministic figure emphasis in the consuming application.`}),`
`]})]})}function V(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,H.jsx)(t,{...e,children:(0,H.jsx)(B,{...e})}):B(e)}var H;e((()=>{H=t(),c(),s(),C(),T(),D(),k(),j(),N(),F(),L(),z(),b()}))();export{V as default};