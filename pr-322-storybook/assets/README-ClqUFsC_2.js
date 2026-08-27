import{i as e}from"./preload-helper-BPzpAaEy.js";import{F as t}from"./iframe-2WOHVFsL.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks--TtDj5YA.js";import{t as c}from"./mdx-react-shim-Bc_yXaGU.js";import{AccountMenu as l,AvatarButton as u,Default as d,Emphasis as f,Image as p,ImageFallback as m,Props as h,Shapes as g,n as _,t as v}from"./avatar.stories-sn3neyfZ.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`avatar`,children:`Avatar`}),`
`,(0,x.jsx)(t.p,{children:`A visual representation of a user or entity, shown as a photo or a monogram of their initials.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Composable `,(0,x.jsx)(t.code,{children:`Avatar`}),`, `,(0,x.jsx)(t.code,{children:`Image`}),`, and `,(0,x.jsx)(t.code,{children:`Text`}),` parts`]}),`
`,(0,x.jsx)(t.li,{children:`Circle and rounded-square shapes at four named sizes`}),`
`,(0,x.jsx)(t.li,{children:`Automatic image loading with a Text monogram fallback`}),`
`,(0,x.jsx)(t.li,{children:`Primary, subtle, and 15 categorical figure emphases`}),`
`,(0,x.jsx)(t.li,{children:`Avatar Button and Account Menu compositions built with Pressable`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`Use an Avatar with a one- or two-character monogram when no image is available.`}),`
`,(0,x.jsx)(i,{of:d,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Avatar, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Avatar>
      <Text>UT</Text>
    </Avatar>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`image`,children:`Image`}),`
`,(0,x.jsx)(t.p,{children:`Place Image before Text so the monogram is available while the image loads or if it fails.`}),`
`,(0,x.jsx)(i,{of:p,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Avatar, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%2302242a%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2251%22 fill=%22%2309757a%22/%3E%3Cpath d=%22M13 72c18-18 34-26 51-26s33 8 51 26v43H13z%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%2264%22 cy=%2253%22 r=%2220%22 fill=%22%23f5f7f8%22/%3E%3Cpath d=%22M35 106c4-17 15-26 29-26s25 9 29 26%22 fill=%22%23f5f7f8%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2251%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%22.35%22 stroke-width=%224%22/%3E%3C/svg%3E';

export function ImageExample() {
  return (
    <Avatar>
      <Image src={image} alt="Uma Thurman" />
      <Text>UT</Text>
    </Avatar>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`image-fallback`,children:`Image Fallback`}),`
`,(0,x.jsx)(t.p,{children:`Include a Text fallback so an unavailable photo never leaves an empty identity marker.`}),`
`,(0,x.jsx)(i,{of:m,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Avatar, Image, Text } from '@godaddy/antares';

export function ImageFallbackExample() {
  return (
    <Avatar>
      <Image src="/missing-avatar-image.png" alt="" />
      <Text>UT</Text>
    </Avatar>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`shapes-and-sizes`,children:`Shapes and sizes`}),`
`,(0,x.jsx)(t.p,{children:`Use circular Avatars for people and square Avatars for organizations, workspaces, and accounts.`}),`
`,(0,x.jsx)(i,{of:g,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Avatar, Flex, Text } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,x.jsx)(t.p,{children:`Use primary or subtle for standard treatments, and a deterministic figure emphasis to categorize entities in a list.`}),`
`,(0,x.jsx)(i,{of:f,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Avatar, Flex, Text, type AvatarEmphasis } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`avatar-button`,children:`Avatar Button`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`Pressable`}),` to add accessible interaction to an Avatar while preserving its shape.`]}),`
`,(0,x.jsx)(i,{of:u,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Avatar, Pressable, Text } from '@godaddy/antares';

export function AvatarButtonExample() {
  return (
    <Pressable aria-label="Account">
      <Avatar shape="circle" role="button">
        <Text>UT</Text>
      </Avatar>
    </Pressable>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`account-menu`,children:`Account Menu`}),`
`,(0,x.jsx)(t.p,{children:`Wrap an Avatar in a Pressable inside MenuTrigger for an account or profile menu.`}),`
`,(0,x.jsx)(i,{of:l,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Avatar, Menu, MenuItem, MenuTrigger, Pressable, Text } from '@godaddy/antares';

export function AccountMenuExample() {
  return (
    <MenuTrigger>
      <Pressable aria-label="Account menu">
        <Avatar role="button">
          <Text>UT</Text>
        </Avatar>
      </Pressable>
      <Menu>
        <MenuItem id="profile">Profile</MenuItem>
        <MenuItem id="settings">Settings</MenuItem>
        <MenuItem id="sign-out">Sign out</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsxs)(t.p,{children:[`Use Image native image props for responsive image sources. Choose a deterministic `,(0,x.jsx)(t.code,{children:`figure0`}),` through `,(0,x.jsx)(t.code,{children:`figure14`}),` emphasis in lists that categorize multiple entities.`]}),`
`,(0,x.jsxs)(t.p,{children:[`When an Avatar triggers an action, compose it with `,(0,x.jsx)(t.code,{children:`Pressable`}),` so the Avatar keeps its own shape and receives the interaction behavior directly. Use this pattern for an Avatar Button, or place it inside `,(0,x.jsx)(t.code,{children:`MenuTrigger`}),` for an Account Menu:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<Pressable aria-label="Account menu" onPress={openAccountMenu}>
  <Avatar role="button">
    <Text>UT</Text>
  </Avatar>
</Pressable>
`})}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Give Image meaningful `,(0,x.jsx)(t.code,{children:`alt`}),` text when the image conveys an identity.`]}),`
`,(0,x.jsx)(t.li,{children:`Text remains available to assistive technology when no image loads.`}),`
`,(0,x.jsxs)(t.li,{children:[`Use `,(0,x.jsx)(t.code,{children:`alt=""`}),` on the Image and `,(0,x.jsx)(t.code,{children:`aria-hidden="true"`}),` on the Avatar when the entire avatar is purely decorative.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Give an Avatar Button or Account Menu an accessible name with `,(0,x.jsx)(t.code,{children:`aria-label`}),` or `,(0,x.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,x.jsxs)(t.li,{children:[`When using `,(0,x.jsx)(t.code,{children:`Pressable`}),`, provide an interactive role for the non-semantic Avatar child.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Use Avatar for informational identity; compose it with `,(0,x.jsx)(t.code,{children:`Pressable`}),` for an Avatar Button or Account Menu when it is independently actionable.`]}),`
`,(0,x.jsx)(t.li,{children:`Use circle for people and square for businesses, workspaces, and accounts.`}),`
`,(0,x.jsx)(t.li,{children:`Keep monograms to one or two uppercase characters.`}),`
`,(0,x.jsxs)(t.li,{children:[`Use the same `,(0,x.jsx)(t.code,{children:`figure*`}),` emphasis for the same entity wherever it appears.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`If an image is unavailable because of a bad URL or CORS policy, Text remains visible.`}),`
`,(0,x.jsx)(t.li,{children:`Long Text content is clipped to the avatar shape; provide a one- or two-character monogram.`}),`
`,(0,x.jsx)(t.li,{children:`Figure colors repeat after 15 values; assign a deterministic figure emphasis in the consuming application.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<Avatar>
  <Image />
  <Text />
</Avatar>
`})}),`
`,(0,x.jsx)(a,{of:h})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),c(),s(),_()}))();export{b as default};