import{i as e}from"./preload-helper-DEA0MoIu.js";import{F as t}from"./iframe-Bi_P0iNi.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Dgr3PjZX.js";import{t as c}from"./mdx-react-shim-D_cD1TVv.js";import{CloseButtonProps as l,Critical as u,Default as d,Disabled as f,Icon as p,Inline as m,LinkButtonProps as h,Minimal as g,Primary as _,Props as v,Secondary as y,Sizes as b,Tertiary as x,n as S,t as C}from"./button.stories-D-8Jnj61.js";function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:C,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`button`,children:`Button`}),`
`,(0,E.jsx)(t.p,{children:`The Button component allows users to initiate actions or submit forms with a single click`}),`
`,(0,E.jsxs)(t.p,{children:[`Use the `,(0,E.jsx)(t.code,{children:`LinkButton`}),` component instead when you need navigation functionality with a button-like appearance.`]}),`
`,(0,E.jsxs)(t.p,{children:[`Use the `,(0,E.jsx)(t.code,{children:`CloseButton`}),` preset to dismiss an overlay (such as a `,(0,E.jsx)(t.code,{children:`Modal`}),`). It defaults to `,(0,E.jsx)(t.code,{children:`slot="close"`}),`, so it picks up the overlay's close behavior with no wiring, and always renders an `,(0,E.jsx)(t.code,{children:`x`}),` icon with `,(0,E.jsx)(t.code,{children:`aria-label="Close"`}),`. For a labelled dismiss action (e.g. "Cancel"), use a raw `,(0,E.jsx)(t.code,{children:`<Button slot="close">Cancel</Button>`}),`.`]}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,E.jsx)(t.p,{children:`The default/tertiary button is the base for all other buttons in the system. It provides no significant visual treatment other than to provide indication for the user to take a common action.`}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function DefaultExample() {
  return <Button>Click me!</Button>;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`primary`,children:`Primary`}),`
`,(0,E.jsx)(t.p,{children:`The primary button should be used to indicate the most important action for the user to take in their current experience.`}),`
`,(0,E.jsx)(i,{of:_,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, type ButtonProps } from '@godaddy/antares';

export function PrimaryExample(props: ButtonProps) {
  return (
    <Button {...props} variant="primary">
      Primary Button
    </Button>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`secondary`,children:`Secondary`}),`
`,(0,E.jsx)(t.p,{children:`The secondary button indicates an action of secondary importance.`}),`
`,(0,E.jsx)(i,{of:y,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function SecondaryExample() {
  return <Button variant="secondary">Secondary Button</Button>;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`tertiary`,children:`Tertiary`}),`
`,(0,E.jsx)(t.p,{children:`The tertiary button is the default, low-emphasis style used for common, non-critical actions.`}),`
`,(0,E.jsx)(i,{of:x,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function TertiaryExample() {
  return <Button variant="tertiary">Tertiary Button</Button>;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`critical`,children:`Critical`}),`
`,(0,E.jsx)(t.p,{children:`The critical button signifies to the user a destructive action will take place.`}),`
`,(0,E.jsx)(i,{of:u,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button } from '@godaddy/antares';

export function CriticalExample() {
  return <Button variant="critical">Critical Button</Button>;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,E.jsx)(t.p,{children:`Any button variant can be disabled to prevent interaction, communicated with reduced opacity and a not-allowed cursor.`}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, Flex, LinkButton } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h3,{id:`icon`,children:`Icon`}),`
`,(0,E.jsxs)(t.p,{children:[`You may provide an optional `,(0,E.jsx)(t.code,{children:`Icon`}),` component to the button. If you do not include text, you must provide an aria-label attribute to identify the purpose of the button. This will produce a square button.`]}),`
`,(0,E.jsx)(i,{of:p,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h3,{id:`inline`,children:`Inline`}),`
`,(0,E.jsx)(t.p,{children:`The inline button sits within a run of text, styled like a link while retaining button semantics.`}),`
`,(0,E.jsx)(i,{of:m,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, Text } from '@godaddy/antares';

export function InlineExample() {
  return (
    <Text>
      I am an <Button variant="inline">inline button</Button> surrounded by text!
    </Text>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`minimal`,children:`Minimal`}),`
`,(0,E.jsx)(t.p,{children:`The minimal button is an icon-only button that's used when space is limited and/or when the action is universally understood.`}),`
`,(0,E.jsx)(i,{of:g,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, Flex, Icon } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,E.jsx)(t.p,{children:`Buttons come in small and medium sizes to fit different layout densities.`}),`
`,(0,E.jsx)(i,{of:b,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

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
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsxs)(t.p,{children:[`The `,(0,E.jsx)(t.code,{children:`Button`}),` component accepts the following props:`]}),`
`,(0,E.jsx)(a,{of:v}),`
`,(0,E.jsxs)(t.p,{children:[`The `,(0,E.jsx)(t.code,{children:`LinkButton`}),` component accepts the following props:`]}),`
`,(0,E.jsx)(a,{of:h}),`
`,(0,E.jsxs)(t.p,{children:[`The `,(0,E.jsx)(t.code,{children:`CloseButton`}),` component accepts the following props:`]}),`
`,(0,E.jsx)(a,{of:l})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),S()}))();export{T as default};