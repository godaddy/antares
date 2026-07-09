import{i as e}from"./preload-helper-Cf5dhQLl.js";import{y as t}from"./iframe-DffglHDz.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Dfq91fiH.js";import{t as c}from"./mdx-react-shim-DexNOoLx.js";import{Critical as l,Default as u,Disabled as d,Icon as f,Inline as p,LinkButtonProps as m,Minimal as h,Primary as g,Props as _,Secondary as v,Sizes as y,n as b,t as x}from"./button.stories-CAIvbwFK.js";var S,C=e((()=>{S=`import { Button } from '@godaddy/antares';

export function DefaultExample() {
  return <Button>Click me!</Button>;
}
`})),w,T=e((()=>{w=`import { Button, type ButtonProps } from '@godaddy/antares';

export function PrimaryExample(props: ButtonProps) {
  return (
    <Button {...props} variant="primary">
      Primary Button
    </Button>
  );
}
`})),E,D=e((()=>{E=`import { Button } from '@godaddy/antares';

export function SecondaryExample() {
  return <Button variant="secondary">Secondary Button</Button>;
}
`})),O,k=e((()=>{O=`import { Button } from '@godaddy/antares';

export function CriticalExample() {
  return <Button variant="critical">Critical Button</Button>;
}
`})),A,j=e((()=>{A=`import { Button, Text } from '@godaddy/antares';

export function InlineExample() {
  return (
    <Text>
      I am an <Button variant="inline">inline button</Button> surrounded by text!
    </Text>
  );
}
`})),M,N=e((()=>{M=`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

export function IconExample() {
  return (
    <Flex direction="column" gap="md">
      <div>
        <Button variant="primary">
          <Icon icon="star" />
          <Text>With an icon!</Text>
        </Button>
      </div>

      <div>
        <LinkButton variant="secondary" href="#" isExternal>
          <Text>An external link!</Text>
        </LinkButton>
      </div>

      <Flex alignItems="center" gap="sm">
        <Text>Icon only button:</Text>
        <Button variant="primary" aria-label="Star">
          <Icon icon="star" />
        </Button>
      </Flex>

      <div>
        <Text>
          Hey look at me!{' '}
          <LinkButton href="#" variant="inline" isExternal>
            link button
          </LinkButton>{' '}
          I have an icon!
        </Text>
      </div>
    </Flex>
  );
}
`})),P,F=e((()=>{P=`import { Button, Flex, LinkButton } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex alignItems="center" gap="md" wrap="wrap">
      <Button variant="primary" isDisabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" isDisabled>
        Secondary Disabled
      </Button>
      <Button variant="tertiary" isDisabled>
        Tertiary Disabled
      </Button>
      <Button variant="critical" isDisabled>
        Critical Disabled
      </Button>
      <Button variant="inline" isDisabled>
        Inline Disabled
      </Button>
      <LinkButton variant="secondary" href="#" isDisabled>
        Link Disabled
      </LinkButton>
    </Flex>
  );
}
`})),I,L=e((()=>{I=`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex alignItems="center" gap="sm" wrap="wrap">
      <Button variant="primary" size="sm" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary" size="sm">
        Small
      </Button>

      <LinkButton href="#" variant="primary" size="sm" aria-label="Star">
        <Icon icon="star" />
        <Text>Link Small</Text>
      </LinkButton>

      <Button variant="primary" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary">Medium</Button>

      <LinkButton href="#" variant="primary">
        <Icon icon="star" />
        <Text>Link Medium</Text>
      </LinkButton>
    </Flex>
  );
}
`})),R,z=e((()=>{R=`import { Button, Flex, Icon } from '@godaddy/antares';

export function MinimalExample() {
  return (
    <table className="button-story-table">
      <thead>
        <tr>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Button Size
            </Flex>
          </th>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Gap Size
            </Flex>
          </th>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Example
            </Flex>
          </th>
          <th scope="col">
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Usage
            </Flex>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <Button variant="minimal" size="md" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="md" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="md" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Recommended
            </Flex>
          </td>
        </tr>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="sm">
              <Button variant="minimal" size="md" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="md" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="md" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Can be used, but not recommended.
            </Flex>
          </td>
        </tr>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>md</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <Button variant="minimal" size="sm" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Not recommended. The button may not be accessible at this size.
            </Flex>
          </td>
        </tr>
        <tr>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              <code>sm</code>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="sm">
              <Button variant="minimal" size="sm" aria-label="Star">
                <Icon icon="star" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="Edit">
                <Icon icon="edit" />
              </Button>
              <Button variant="minimal" size="sm" aria-label="More options" isDisabled>
                <Icon icon="ellipsis" />
              </Button>
            </Flex>
          </td>
          <td>
            <Flex blockPadding="md" inlinePadding="md" gap="md">
              Not recommended. The button may not be accessible at this size.
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
`}));function B(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(o,{of:x,name:`Overview`}),`
`,(0,H.jsx)(t.h1,{id:`button`,children:`Button`}),`
`,(0,H.jsx)(t.p,{children:`The Button component allows users to initiate actions or submit forms with a single click`}),`
`,(0,H.jsxs)(t.p,{children:[`Use the `,(0,H.jsx)(t.code,{children:`LinkButton`}),` component instead when you need navigation functionality with a button-like appearance.`]}),`
`,(0,H.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,H.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,H.jsxs)(t.p,{children:[`The `,(0,H.jsx)(t.code,{children:`Button`}),` component accepts the following props:`]}),`
`,(0,H.jsx)(a,{of:_}),`
`,(0,H.jsxs)(t.p,{children:[`The `,(0,H.jsx)(t.code,{children:`LinkButton`}),` component accepts the following props:`]}),`
`,(0,H.jsx)(a,{of:m}),`
`,(0,H.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,H.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,H.jsx)(t.p,{children:`The default/tertiary button is the base for all other buttons in the system. It provides no significant visual treatment other than to provide indication for the user to take a common action.`}),`
`,(0,H.jsx)(i,{of:u,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:S}),`
`,(0,H.jsx)(t.h3,{id:`primary`,children:`Primary`}),`
`,(0,H.jsx)(t.p,{children:`The primary button should be used to indicate the most important action for the user to take in their current experience.`}),`
`,(0,H.jsx)(i,{of:g,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:w}),`
`,(0,H.jsx)(t.h3,{id:`secondary`,children:`Secondary`}),`
`,(0,H.jsx)(t.p,{children:`The secondary button indicates an action of secondary importance.`}),`
`,(0,H.jsx)(i,{of:v,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:E}),`
`,(0,H.jsx)(t.h3,{id:`critical`,children:`Critical`}),`
`,(0,H.jsx)(t.p,{children:`The critical button signifies to the user a destructive action will take place.`}),`
`,(0,H.jsx)(i,{of:l,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:O}),`
`,(0,H.jsx)(t.h3,{id:`inline`,children:`Inline`}),`
`,(0,H.jsx)(i,{of:p,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:A}),`
`,(0,H.jsx)(t.h3,{id:`minimal`,children:`Minimal`}),`
`,(0,H.jsx)(t.p,{children:`The minimal button is an icon-only button that's used when space is limited and/or when the action is universally understood.`}),`
`,(0,H.jsx)(i,{of:h,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:R}),`
`,(0,H.jsx)(t.h3,{id:`icon`,children:`Icon`}),`
`,(0,H.jsxs)(t.p,{children:[`You may provide an optional `,(0,H.jsx)(t.a,{href:`../icon`,children:(0,H.jsx)(t.code,{children:`Icon`})}),` element to the button. If you do not include text, you must provide an aria-label attribute to identify the purpose of the button. This will produce a square button.`]}),`
`,(0,H.jsx)(i,{of:f,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:M}),`
`,(0,H.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,H.jsx)(i,{of:y,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:I}),`
`,(0,H.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,H.jsx)(i,{of:d,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:P})]})}function V(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,H.jsx)(t,{...e,children:(0,H.jsx)(B,{...e})}):B(e)}var H;e((()=>{H=t(),c(),s(),b(),C(),T(),D(),k(),j(),N(),F(),L(),z()}))();export{V as default};