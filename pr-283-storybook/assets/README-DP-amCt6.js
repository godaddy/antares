import{i as e}from"./preload-helper-DEA0MoIu.js";import{y as t}from"./iframe-BeXPvmnF.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CAMI8XW8.js";import{t as c}from"./mdx-react-shim-P2DZv09E.js";import{Button as l,ButtonDisabled as u,ButtonMenu as d,Default as f,Emphasis as p,Image as m,ImageFallback as h,Props as g,Shapes as _,n as v,t as y}from"./avatar.stories-Dp8r_TKF.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`avatar`,children:`Avatar`}),`
`,(0,S.jsx)(t.p,{children:`A visual representation of a user or entity, shown as a photo or a monogram of their initials.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Composable `,(0,S.jsx)(t.code,{children:`Avatar`}),`, `,(0,S.jsx)(t.code,{children:`Image`}),`, and `,(0,S.jsx)(t.code,{children:`Text`}),` parts`]}),`
`,(0,S.jsx)(t.li,{children:`Circle and rounded-square shapes at four named sizes`}),`
`,(0,S.jsx)(t.li,{children:`Automatic image loading with a Text monogram fallback`}),`
`,(0,S.jsx)(t.li,{children:`Primary, subtle, and 15 categorical figure emphases`}),`
`,(0,S.jsx)(t.li,{children:`Compose Avatar with Button when it is interactive`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`Use an Avatar with a one- or two-character monogram when no image is available.`}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Avatar>
      <Text>UT</Text>
    </Avatar>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`image`,children:`Image`}),`
`,(0,S.jsx)(t.p,{children:`Place Image before Text so the monogram is available while the image loads or if it fails.`}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%23145fa9%22/%3E%3Ctext x=%2264%22 y=%2274%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2252%22 text-anchor=%22middle%22%3EUT%3C/text%3E%3C/svg%3E';

export function ImageExample() {
  return (
    <Avatar>
      <Image src={image} alt="Uma Thurman" />
      <Text>UT</Text>
    </Avatar>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`image-fallback`,children:`Image Fallback`}),`
`,(0,S.jsx)(t.p,{children:`Include a Text fallback so an unavailable photo never leaves an empty identity marker.`}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Image, Text } from '@godaddy/antares';

export function ImageFallbackExample() {
  return (
    <Avatar>
      <Image src="/missing-avatar-image.png" alt="" />
      <Text>UT</Text>
    </Avatar>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`shapes-and-sizes`,children:`Shapes and sizes`}),`
`,(0,S.jsx)(t.p,{children:`Use circular Avatars for people and square Avatars for organizations, workspaces, and accounts.`}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Flex, Text } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h3,{id:`emphasis`,children:`Emphasis`}),`
`,(0,S.jsx)(t.p,{children:`Use primary or subtle for standard treatments, and a deterministic figure emphasis to categorize entities in a list.`}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Flex, Text, type AvatarEmphasis } from '@godaddy/antares';

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
`,(0,S.jsx)(t.h3,{id:`avatar-button`,children:`Avatar button`}),`
`,(0,S.jsxs)(t.p,{children:[`Turn an avatar into a clickable control by composing it with a `,(0,S.jsx)(t.code,{children:`ghost`}),` Button.
Match `,(0,S.jsx)(t.code,{children:`rounding`}),` to the avatar shape.`]}),`
`,(0,S.jsx)(i,{of:l,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Box, Button, Flex, Text } from '@godaddy/antares';

export function ButtonExample() {
  return (
    <Flex gap="sm">
      <Box as={Button} variant="ghost" aria-label="Account" rounding="full">
        <Avatar>
          <Text>UT</Text>
        </Avatar>
      </Box>
      <Box as={Button} variant="ghost" aria-label="Workspace" rounding="lg">
        <Avatar shape="square">
          <Text>UT</Text>
        </Avatar>
      </Box>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`account-menu`,children:`Account menu`}),`
`,(0,S.jsx)(t.p,{children:`Wrap an Avatar in a ghost Button inside MenuTrigger for an account or profile menu.`}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Box, Button, Menu, MenuItem, MenuTrigger, Text } from '@godaddy/antares';

export function ButtonMenuExample() {
  return (
    <MenuTrigger>
      <Box as={Button} variant="ghost" aria-label="Account menu" rounding="full">
        <Avatar>
          <Text>UT</Text>
        </Avatar>
      </Box>
      <Menu>
        <MenuItem id="profile">Profile</MenuItem>
        <MenuItem id="settings">Settings</MenuItem>
        <MenuItem id="sign-out">Sign out</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`disabled-avatar-button`,children:`Disabled avatar button`}),`
`,(0,S.jsx)(t.p,{children:`Use isDisabled when the avatar action is unavailable.`}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Avatar, Box, Button, Text } from '@godaddy/antares';

export interface ButtonDisabledExampleProps {
  onPress?: () => void;
}

export function ButtonDisabledExample({ onPress }: ButtonDisabledExampleProps) {
  return (
    <Box as={Button} variant="ghost" aria-label="Unavailable account" isDisabled onPress={onPress} rounding="full">
      <Avatar>
        <Text>UT</Text>
      </Avatar>
    </Box>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsxs)(t.p,{children:[`Use Image native image props for responsive image sources. Choose a deterministic `,(0,S.jsx)(t.code,{children:`figure0`}),` through `,(0,S.jsx)(t.code,{children:`figure14`}),` emphasis in lists that categorize multiple entities.`]}),`
`,(0,S.jsxs)(t.p,{children:[`When an Avatar triggers an action, wrap it in `,(0,S.jsx)(t.code,{children:`Button variant="ghost"`}),`. Compose the Button with `,(0,S.jsx)(t.code,{children:`Box`}),` to control its rounding:`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<Box as={Button} aria-label="Account menu" variant="ghost" rounding="full">
  <Avatar>
    <Text>UT</Text>
  </Avatar>
</Box>
`})}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Give Image meaningful `,(0,S.jsx)(t.code,{children:`alt`}),` text when the image conveys an identity.`]}),`
`,(0,S.jsx)(t.li,{children:`Text remains available to assistive technology when no image loads.`}),`
`,(0,S.jsxs)(t.li,{children:[`Use `,(0,S.jsx)(t.code,{children:`alt=""`}),` or `,(0,S.jsx)(t.code,{children:`aria-hidden`}),` when an avatar is purely decorative.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Give an interactive Button an accessible name with `,(0,S.jsx)(t.code,{children:`aria-label`}),` or `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`Use Avatar for informational identity; wrap it in a ghost Button only when it is independently actionable.`}),`
`,(0,S.jsx)(t.li,{children:`Use circle for people and square for businesses, workspaces, and accounts.`}),`
`,(0,S.jsx)(t.li,{children:`Keep monograms to one or two uppercase characters.`}),`
`,(0,S.jsxs)(t.li,{children:[`Use the same `,(0,S.jsx)(t.code,{children:`figure*`}),` emphasis for the same entity wherever it appears.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`If an image is unavailable because of a bad URL or CORS policy, Text remains visible.`}),`
`,(0,S.jsx)(t.li,{children:`Long Text content is clipped to the avatar shape; provide a one- or two-character monogram.`}),`
`,(0,S.jsx)(t.li,{children:`Figure colors repeat after 15 values; assign a deterministic figure emphasis in the consuming application.`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.h3,{id:`avatar-1`,children:`Avatar`}),`
`,(0,S.jsx)(t.p,{children:`Configures the Avatar surface, including its shape, size, and color treatment.`}),`
`,(0,S.jsx)(a,{of:g})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),v()}))();export{x as default};