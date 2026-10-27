import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-C9sJOEbE.js";import{_ as l,a as u,c as d,d as f,f as p,g as m,h,i as g,l as _,m as v,n as y,o as b,p as x,r as S,s as C,t as w,u as T,v as E}from"./button.stories-CXUfdLrN.js";function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...r(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(s,{of:l,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`button`,children:`Button`}),`
`,(0,k.jsx)(t.p,{children:`The Button component allows users to initiate actions or submit forms with a single click`}),`
`,(0,k.jsxs)(t.p,{children:[`Use the `,(0,k.jsx)(t.code,{children:`LinkButton`}),` component instead when you need navigation functionality with a button-like appearance.`]}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`target="_blank"`}),` to open a link in a new tab without an icon. `,(0,k.jsx)(t.code,{children:`isExternal`}),` adds an icon and defaults
to `,(0,k.jsx)(t.code,{children:`target="_blank"`}),` and `,(0,k.jsx)(t.code,{children:`rel="noopener noreferrer"`}),`; explicit `,(0,k.jsx)(t.code,{children:`target`}),` and `,(0,k.jsx)(t.code,{children:`rel`}),` override those defaults.
You can also compose an `,(0,k.jsx)(t.code,{children:`Icon`}),` as a child independently of navigation behavior.`]}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`isSelected`}),` to show a button as selected. It applies the pressed colors and sets `,(0,k.jsx)(t.code,{children:`aria-pressed`}),`.
Update it in `,(0,k.jsx)(t.code,{children:`onPress`}),`; the button does not toggle itself. For a set of exclusive options, use ToggleButtonGroup.`]}),`
`,(0,k.jsxs)(t.p,{children:[`Use the `,(0,k.jsx)(t.code,{children:`CloseButton`}),` preset to dismiss an overlay (such as a `,(0,k.jsx)(t.code,{children:`Modal`}),`). It defaults to `,(0,k.jsx)(t.code,{children:`slot="close"`}),`, so it picks up the overlay's close behavior with no wiring, and always renders an `,(0,k.jsx)(t.code,{children:`x`}),` icon with `,(0,k.jsx)(t.code,{children:`aria-label="Close"`}),`. For a labelled dismiss action (e.g. "Cancel"), use a raw `,(0,k.jsx)(t.code,{children:`<Button slot="close">Cancel</Button>`}),`.`]}),`
`,(0,k.jsxs)(t.p,{children:[`Inside a field `,(0,k.jsx)(t.code,{children:`Group`}),`, `,(0,k.jsx)(t.code,{children:`slot="control"`}),` and `,(0,k.jsx)(t.code,{children:`slot="trigger"`}),` pick up the matching look, size, and
disabled state from context. See TextField for control affixes, and Select or DatePicker for trigger faces.
The `,(0,k.jsx)(t.code,{children:`control`}),` variant also works standalone, with its own size and rounded corners; inside a field, the
field sizes it and joins its corners. The `,(0,k.jsx)(t.code,{children:`trigger`}),` variant is a field part, so use it only inside a field.`]}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,k.jsx)(t.p,{children:`The default/tertiary button is the base for all other buttons in the system. It provides no significant visual treatment other than to provide indication for the user to take a common action.`}),`
`,(0,k.jsx)(a,{of:g,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button } from '@godaddy/antares';

export function DefaultExample() {
  return <Button>Click me!</Button>;
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`primary`,children:`Primary`}),`
`,(0,k.jsx)(t.p,{children:`The primary button should be used to indicate the most important action for the user to take in their current experience.`}),`
`,(0,k.jsx)(a,{of:f,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, type ButtonProps } from '@godaddy/antares';

export function PrimaryExample(props: ButtonProps) {
  return (
    <Button {...props} variant="primary">
      Primary Button
    </Button>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`secondary`,children:`Secondary`}),`
`,(0,k.jsx)(t.p,{children:`The secondary button indicates an action of secondary importance.`}),`
`,(0,k.jsx)(a,{of:x,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button } from '@godaddy/antares';

export function SecondaryExample() {
  return <Button variant="secondary">Secondary Button</Button>;
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`tertiary`,children:`Tertiary`}),`
`,(0,k.jsx)(t.p,{children:`The tertiary button is the default, low-emphasis style used for common, non-critical actions.`}),`
`,(0,k.jsx)(a,{of:m,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button } from '@godaddy/antares';

export function TertiaryExample() {
  return <Button variant="tertiary">Tertiary Button</Button>;
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`control`,children:`Control`}),`
`,(0,k.jsx)(t.p,{children:`Control buttons work standalone, or as parts of a field that joins their corners.`}),`
`,(0,k.jsx)(a,{of:y,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Flex, Group, Input, Label, TextField } from '@godaddy/antares';

export function ControlExample() {
  return (
    <Flex direction="column" alignItems="start" gap="md">
      <Flex gap="sm" alignItems="center">
        <Button variant="control" size="sm">
          Small
        </Button>
        <Button variant="control">Standalone</Button>
        <Button variant="control" size="lg">
          Large
        </Button>
      </Flex>
      <TextField>
        <Label>Domain</Label>
        <Group>
          <Button slot="control">First</Button>
          <Input />
          <Button slot="control">Middle</Button>
          <Button slot="control">Last</Button>
        </Group>
      </TextField>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`critical`,children:`Critical`}),`
`,(0,k.jsx)(t.p,{children:`The critical button signifies to the user a destructive action will take place.`}),`
`,(0,k.jsx)(a,{of:S,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button } from '@godaddy/antares';

export function CriticalExample() {
  return <Button variant="critical">Critical Button</Button>;
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,k.jsx)(t.p,{children:`Any button variant can be disabled to prevent interaction, communicated with reduced opacity and a not-allowed cursor.`}),`
`,(0,k.jsx)(a,{of:u,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Flex, LinkButton } from '@godaddy/antares';

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
`,(0,k.jsx)(t.h3,{id:`icon`,children:`Icon`}),`
`,(0,k.jsxs)(t.p,{children:[`You may provide an optional `,(0,k.jsx)(t.code,{children:`Icon`}),` component to the button. Wrap the text beside an icon in a `,(0,k.jsx)(t.code,{children:`Text`}),`. If you do not include text, you must provide an aria-label attribute to identify the purpose of the button. This will produce a square button.`]}),`
`,(0,k.jsx)(a,{of:b,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

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
          An external link!
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
`,(0,k.jsx)(t.h3,{id:`icons-and-alignment`,children:`Icons And Alignment`}),`
`,(0,k.jsxs)(t.p,{children:[`Control navigation with `,(0,k.jsx)(t.code,{children:`target`}),` and `,(0,k.jsx)(t.code,{children:`rel`}),`, and compose icons independently. Stretched inline content follows the browser's default alignment; other variants stay centered.`]}),`
`,(0,k.jsx)(a,{of:C,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Flex, type FlexProps, Icon, LinkButton, Text } from '@godaddy/antares';

export function IconsAndAlignmentExample({ dir }: Pick<FlexProps, 'dir'> = {}) {
  return (
    <Flex direction="column" gap="md" dir={dir} style={{ width: '20rem' }}>
      <Button variant="inline">
        <Text>Inline action</Text>
      </Button>
      <LinkButton href="#report" variant="inline" target="_blank" rel="noopener noreferrer">
        <Text>View report</Text>
      </LinkButton>
      <LinkButton href="#help" variant="inline" isExternal target="_self" rel="external">
        Read help
      </LinkButton>
      <LinkButton href="#documentation" variant="inline">
        <Text>Read documentation</Text>
        <Icon icon="window-new" />
      </LinkButton>
      <Button variant="primary">
        <Text>Centered action</Text>
      </Button>
      <LinkButton href="#" variant="primary">
        <Text>Centered link</Text>
      </LinkButton>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`inline`,children:`Inline`}),`
`,(0,k.jsx)(t.p,{children:`The inline button sits within a run of text, styled like a link while retaining button semantics.`}),`
`,(0,k.jsx)(a,{of:d,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Text } from '@godaddy/antares';

export function InlineExample() {
  return (
    <Text>
      I am an <Button variant="inline">inline button</Button> surrounded by text!
    </Text>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`minimal`,children:`Minimal`}),`
`,(0,k.jsx)(t.p,{children:`The minimal button is an icon-only button that's used when space is limited and/or when the action is universally understood.`}),`
`,(0,k.jsx)(a,{of:T,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Flex, Icon } from '@godaddy/antares';

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
`,(0,k.jsx)(t.h3,{id:`selected`,children:`Selected`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`isSelected`}),` to show selection, and update it in `,(0,k.jsx)(t.code,{children:`onPress`}),`; the button does not toggle itself.`]}),`
`,(0,k.jsx)(a,{of:v,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { useState } from 'react';
import { Button, type ButtonProps } from '@godaddy/antares';

export function SelectedExample({ isDisabled }: Pick<ButtonProps, 'isDisabled'> = {}) {
  const [isSelected, setSelected] = useState(true);

  return (
    <Button variant="control" isSelected={isSelected} isDisabled={isDisabled} onPress={() => setSelected(!isSelected)}>
      Available
    </Button>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,k.jsxs)(t.p,{children:[`Buttons come in small, medium, and large sizes to fit different layout densities. Without
`,(0,k.jsx)(t.code,{children:`size`}),`, a button follows the surrounding size scope, and uses medium outside any scope. An
icon-only button is square and as tall as a text button of the same size.`]}),`
`,(0,k.jsx)(a,{of:h,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Flex, Icon, LinkButton, Text } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex alignItems="center" gap="sm" wrap="wrap">
      <Button variant="primary" size="sm" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary" size="sm">
        Small
      </Button>

      <Button variant="primary" size="sm">
        <Icon icon="star" />
        <Text>Small</Text>
      </Button>

      <LinkButton href="#" variant="primary" size="sm">
        <Icon icon="star" />
        <Text>Link Small</Text>
      </LinkButton>

      <Button variant="primary" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary">Medium</Button>

      <Button variant="primary">
        <Icon icon="star" />
        <Text>Medium</Text>
      </Button>

      <LinkButton href="#" variant="primary">
        <Icon icon="star" />
        <Text>Link Medium</Text>
      </LinkButton>

      <Button variant="primary" size="lg" aria-label="Star">
        <Icon icon="star" />
      </Button>

      <Button variant="primary" size="lg">
        Large
      </Button>

      <Button variant="primary" size="lg">
        <Icon icon="star" />
        <Text>Large</Text>
      </Button>

      <LinkButton href="#" variant="primary" size="lg">
        <Icon icon="star" />
        <Text>Link Large</Text>
      </LinkButton>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsx)(t.h3,{id:`button-1`,children:`Button`}),`
`,(0,k.jsx)(o,{of:p}),`
`,(0,k.jsx)(t.h3,{id:`linkbutton`,children:`LinkButton`}),`
`,(0,k.jsx)(o,{of:_}),`
`,(0,k.jsx)(t.h3,{id:`closebutton`,children:`CloseButton`}),`
`,(0,k.jsx)(o,{of:w})]})}function O(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;function A(){return(A=e((()=>{k=t(),n(),c(),E()})))()}A();export{O as default};