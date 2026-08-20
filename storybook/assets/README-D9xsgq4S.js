import{i as e}from"./preload-helper-B4cZKGJ2.js";import{F as t}from"./iframe-PmOoQ7OU.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-pZyRD4f8.js";import{t as c}from"./mdx-react-shim-Bn-F9Fr7.js";import{Critical as l,Default as u,Disabled as d,Icon as f,Inline as p,LinkButtonProps as m,Minimal as h,Primary as g,Props as _,Secondary as v,Sizes as y,Tertiary as b,n as x,t as S}from"./button.stories-AbAdm_ZG.js";function C(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{of:S,name:`Overview`}),`
`,(0,T.jsx)(t.h1,{id:`button`,children:`Button`}),`
`,(0,T.jsx)(t.p,{children:`The Button component allows users to initiate actions or submit forms with a single click`}),`
`,(0,T.jsxs)(t.p,{children:[`Use the `,(0,T.jsx)(t.code,{children:`LinkButton`}),` component instead when you need navigation functionality with a button-like appearance.`]}),`
`,(0,T.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,T.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,T.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,T.jsx)(t.p,{children:`The default/tertiary button is the base for all other buttons in the system. It provides no significant visual treatment other than to provide indication for the user to take a common action.`}),`
`,(0,T.jsx)(i,{of:u,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function DefaultExample() {
  return <Button>Click me!</Button>;
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`primary`,children:`Primary`}),`
`,(0,T.jsx)(t.p,{children:`The primary button should be used to indicate the most important action for the user to take in their current experience.`}),`
`,(0,T.jsx)(i,{of:g,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button, type ButtonProps } from '@godaddy/antares';

export function PrimaryExample(props: ButtonProps) {
  return (
    <Button {...props} variant="primary">
      Primary Button
    </Button>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`secondary`,children:`Secondary`}),`
`,(0,T.jsx)(t.p,{children:`The secondary button indicates an action of secondary importance.`}),`
`,(0,T.jsx)(i,{of:v,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function SecondaryExample() {
  return <Button variant="secondary">Secondary Button</Button>;
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`tertiary`,children:`Tertiary`}),`
`,(0,T.jsx)(t.p,{children:`The tertiary button is the default, low-emphasis style used for common, non-critical actions.`}),`
`,(0,T.jsx)(i,{of:b,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function TertiaryExample() {
  return <Button variant="tertiary">Tertiary Button</Button>;
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`critical`,children:`Critical`}),`
`,(0,T.jsx)(t.p,{children:`The critical button signifies to the user a destructive action will take place.`}),`
`,(0,T.jsx)(i,{of:l,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function CriticalExample() {
  return <Button variant="critical">Critical Button</Button>;
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,T.jsx)(t.p,{children:`Any button variant can be disabled to prevent interaction, communicated with reduced opacity and a not-allowed cursor.`}),`
`,(0,T.jsx)(i,{of:d,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button, Flex, LinkButton } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`icon`,children:`Icon`}),`
`,(0,T.jsxs)(t.p,{children:[`You may provide an optional `,(0,T.jsx)(t.code,{children:`Icon`}),` component to the button. If you do not include text, you must provide an aria-label attribute to identify the purpose of the button. This will produce a square button.`]}),`
`,(0,T.jsx)(i,{of:f,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`inline`,children:`Inline`}),`
`,(0,T.jsx)(t.p,{children:`The inline button sits within a run of text, styled like a link while retaining button semantics.`}),`
`,(0,T.jsx)(i,{of:p,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button, Text } from '@godaddy/antares';

export function InlineExample() {
  return (
    <Text>
      I am an <Button variant="inline">inline button</Button> surrounded by text!
    </Text>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`minimal`,children:`Minimal`}),`
`,(0,T.jsx)(t.p,{children:`The minimal button is an icon-only button that's used when space is limited and/or when the action is universally understood.`}),`
`,(0,T.jsx)(i,{of:h,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button, Flex, Icon } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,T.jsx)(t.p,{children:`Buttons come in small and medium sizes to fit different layout densities.`}),`
`,(0,T.jsx)(i,{of:y,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`Button`}),` component accepts the following props:`]}),`
`,(0,T.jsx)(a,{of:_}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`LinkButton`}),` component accepts the following props:`]}),`
`,(0,T.jsx)(a,{of:m})]})}function w(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,T.jsx)(t,{...e,children:(0,T.jsx)(C,{...e})}):C(e)}var T;e((()=>{T=t(),c(),s(),x()}))();export{w as default};